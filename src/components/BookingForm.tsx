/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
const { useState, useRef, useEffect, forwardRef, useImperativeHandle } = React;
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY || 'ke';

type PeriodCategory = 'short' | 'medium' | 'long';

interface BookingFormData {
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
    idNumber: string;
    idType: 'id' | 'passport';
    vehicle: string;
    pickupDate: string;
    returnDate: string;
    pickupLocation: string;
    deliveryAddress: string;
    notes: string;
    drivingLicense: FileList;
    idDocument: FileList;
    depositProof: FileList;
    consent: boolean;
    accuracy: boolean;
}

export interface BookingFormRef {
    validateStep: () => Promise<boolean>;
    resetForm: () => void;
}

export interface BookingFormProps {
    activeStep: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    onComplete?: () => void;
}

const API_URL = `${API_BASE_URL}/api/bookings`;
const AMEND_API_URL = `${API_BASE_URL}/api/bookings/amend`;
const LOOKUP_API_URL = `${API_BASE_URL}/api/bookings/lookup`;

const vehicleOptions = [
    { value: 'Fielder', label: 'Fielder', rates: { short: 4000, medium: 3500, long: 3000 } },
    { value: 'Mazda CX-5', label: 'Mazda CX-5', rates: { short: 7000, medium: 6500, long: 6000 } },
    { value: 'Harrier', label: 'Harrier', rates: { short: 8000, medium: 7500, long: 7000 } },
    { value: 'Lexus', label: 'Lexus', rates: { short: 9000, medium: 8500, long: 8000 } },
    { value: 'Prado', label: 'Prado', rates: { short: 12000, medium: 11000, long: 10000 } },
];

const periodCategories: { value: PeriodCategory; label: string; minDays: number; maxDays: number }[] = [
    { value: 'short', label: '1–7 days', minDays: 1, maxDays: 7 },
    { value: 'medium', label: '7–20 days', minDays: 8, maxDays: 20 },
    { value: 'long', label: '20+ days', minDays: 21, maxDays: Infinity },
];

const pickupLocations = [
    'Nairobi',
    'Jomo Kenyatta International Airport',
    'Wilson Airport',
    'Other / delivery requested',
];

const stepFields: Record<number, (keyof BookingFormData)[]> = {
    1: ['fullName', 'email', 'phone', 'nationality', 'idNumber', 'idType'],
    2: ['vehicle', 'pickupDate', 'returnDate', 'pickupLocation', 'deliveryAddress', 'notes'],
    3: ['drivingLicense', 'idDocument', 'depositProof'],
    4: [],
};

const allRequiredFields: (keyof BookingFormData)[] = [
    'fullName', 'email', 'phone', 'idNumber', 'idType',
    'vehicle', 'pickupDate', 'returnDate', 'pickupLocation',
    'drivingLicense', 'idDocument', 'depositProof', 'consent'
];

const fileFields: (keyof BookingFormData)[] = ['drivingLicense', 'idDocument', 'depositProof'];

const getPeriodFromDays = (days: number): PeriodCategory => {
    if (days <= 7) return 'short';
    if (days <= 20) return 'medium';
    return 'long';
};

const BookingForm = forwardRef<BookingFormRef, BookingFormProps>(
    ({ activeStep, onNextStep, onPrevStep, onComplete }, ref) => {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [confirmed, setConfirmed] = useState(false);
        const [, setBookingData] = useState<any>(null);
        const formRef = useRef<HTMLFormElement>(null);
        const [phoneValue, setPhoneValue] = useState('');

        const [previewUrls, setPreviewUrls] = useState<{
            drivingLicense: string | null;
            idDocument: string | null;
            depositProof: string | null;
        }>({
            drivingLicense: null,
            idDocument: null,
            depositProof: null,
        });

        const [estimate, setEstimate] = useState<{
            days: number | null;
            rate: number | null;
            total: number | null;
            error: string | null;
            autoPeriod: PeriodCategory | null;
        }>({ days: null, rate: null, total: null, error: null, autoPeriod: null });

        // ✅ Amend mode — seeded from URL params, toggleable via UI
        const urlParams = new URLSearchParams(window.location.search);
        const [amendRequested, setAmendRequested] = useState<boolean>(
            !!(urlParams.get('amend') || urlParams.get('email'))
        );
        const [amendBookingId, setAmendBookingId] = useState<string>(
            urlParams.get('amend') || ''
        );
        const [amendEmail, setAmendEmail] = useState<string>(
            urlParams.get('email') || ''
        );

        // ✅ Lookup state
        const [lookupStatus, setLookupStatus] = useState<
            'idle' | 'loading' | 'found' | 'not_found' | 'error'
        >('idle');
        const [lookupMessage, setLookupMessage] = useState<string>('');
        const lookupAbortRef = useRef<AbortController | null>(null);
        const lastLookupKeyRef = useRef<string>('');

        // Amend mode is active only when requested AND at least one identifier is present
        const isAmendMode =
            amendRequested && (!!amendBookingId.trim() || !!amendEmail.trim());

        const {
            register,
            handleSubmit,
            watch,
            setValue,
            trigger,
            reset,
            formState: { errors },
        } = useForm<BookingFormData>({
            defaultValues: {
                consent: false,
                accuracy: false,
                phone: '',
                fullName: '',
                email: '',
                nationality: '',
                idNumber: '',
                idType: 'id',
                vehicle: '',
                pickupDate: '',
                returnDate: '',
                pickupLocation: '',
                deliveryAddress: '',
                notes: '',
            },
            mode: 'onChange',
        });

        const pickupDate = watch('pickupDate');
        const returnDate = watch('returnDate');
        const vehicle = watch('vehicle');
        const drivingLicenseFile = watch('drivingLicense');
        const idDocumentFile = watch('idDocument');
        const depositProofFile = watch('depositProof');

        const watchedValues = watch();

        // ✅ Prefill email when in amend mode
        useEffect(() => {
            if (isAmendMode && amendEmail && !watchedValues.email) {
                setValue('email', amendEmail, { shouldValidate: false });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isAmendMode, amendEmail]);

        // ✅ Look up booking and prefill fields
        useEffect(() => {
            if (!amendRequested) {
                setLookupStatus('idle');
                setLookupMessage('');
                lastLookupKeyRef.current = '';
                return;
            }

            const idTrim = amendBookingId.trim();
            const emailTrim = amendEmail.trim().toLowerCase();

            const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim);
            const idLooksValid = idTrim.length >= 6;

            if (!idLooksValid && !emailLooksValid) {
                setLookupStatus('idle');
                setLookupMessage('');
                return;
            }

            const lookupKey = `${idTrim}|${emailTrim}`;
            if (lookupKey === lastLookupKeyRef.current) return;

            const timer = setTimeout(async () => {
                if (lookupAbortRef.current) {
                    lookupAbortRef.current.abort();
                }
                const controller = new AbortController();
                lookupAbortRef.current = controller;

                setLookupStatus('loading');
                setLookupMessage('Looking up your booking…');

                try {
                    const { data } = await axios.post(
                        LOOKUP_API_URL,
                        {
                            bookingId: idLooksValid ? idTrim : undefined,
                            email: emailLooksValid ? emailTrim : undefined,
                        },
                        { signal: controller.signal, timeout: 15000 }
                    );

                    if (!data?.success || !data?.booking) {
                        setLookupStatus('not_found');
                        setLookupMessage(
                            'No booking found for that ID or email. You can still continue as a new booking.'
                        );
                        lastLookupKeyRef.current = lookupKey;
                        return;
                    }

                    const b = data.booking;

                    if (b.customerName) setValue('fullName', b.customerName);
                    if (b.email) setValue('email', b.email);
                    if (b.phone) {
                        setPhoneValue(String(b.phone).replace(/[^\d]/g, ''));
                        setValue('phone', b.phone);
                    }
                    if (b.nationality) setValue('nationality', b.nationality);
                    if (b.idNumber) setValue('idNumber', b.idNumber);
                    if (b.idType === 'id' || b.idType === 'passport') {
                        setValue('idType', b.idType);
                    }

                    if (b.carType) {
                        const match = vehicleOptions.find(
                            v =>
                                v.value.toLowerCase() ===
                                String(b.carType).toLowerCase()
                        );
                        if (match) setValue('vehicle', match.value);
                    }
                    if (b.pickupDate) {
                        setValue('pickupDate', String(b.pickupDate).slice(0, 10));
                    }
                    if (b.returnDate) {
                        setValue('returnDate', String(b.returnDate).slice(0, 10));
                    }
                    if (b.pickupLocation) setValue('pickupLocation', b.pickupLocation);
                    if (b.dropoffLocation) setValue('deliveryAddress', b.dropoffLocation);
                    if (b.additionalInfo) setValue('notes', b.additionalInfo);

                    setLookupStatus('found');
                    setLookupMessage(
                        '✓ Booking found — details loaded. Please re-attach your documents.'
                    );
                    lastLookupKeyRef.current = lookupKey;

                    toast.success('✓ Booking found — details loaded.');
                } catch (err: any) {
                    if (
                        err?.name === 'CanceledError' ||
                        err?.code === 'ERR_CANCELED'
                    ) {
                        return;
                    }
                    console.error('Lookup failed:', err);
                    setLookupStatus('error');
                    setLookupMessage(
                        "Couldn't reach the server to load your booking. You can still continue."
                    );
                }
            }, 600);

            return () => clearTimeout(timer);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [amendRequested, amendBookingId, amendEmail]);

        const isFormComplete = allRequiredFields.every(field => {
            const value = watchedValues[field];
            if (fileFields.includes(field)) {
                return value instanceof FileList && value.length > 0;
            }
            if (typeof value === 'boolean') {
                return value === true;
            }
            if (field === 'phone') {
                return phoneValue && phoneValue.replace(/[^0-9]/g, '').length >= 8;
            }
            return value && value.toString().trim().length > 0;
        });

        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        const todayStr = today.toISOString().slice(0, 10);

        useEffect(() => {
            if (pickupDate) {
                const pickup = new Date(pickupDate);
                pickup.setMinutes(pickup.getMinutes() - pickup.getTimezoneOffset());
                const pickupStr = pickup.toISOString().slice(0, 10);
                if (returnDate && returnDate < pickupStr) {
                    setValue('returnDate', pickupStr);
                }
            }
        }, [pickupDate, returnDate, setValue]);

        useEffect(() => {
            const newEstimate = {
                days: null as number | null,
                rate: null as number | null,
                total: null as number | null,
                error: null as string | null,
                autoPeriod: null as PeriodCategory | null,
            };

            if (!pickupDate || !returnDate || !vehicle) {
                setEstimate(newEstimate);
                return;
            }

            const p = new Date(pickupDate + 'T00:00:00');
            const d = new Date(returnDate + 'T00:00:00');
            const days = Math.ceil((d.getTime() - p.getTime()) / (1000 * 60 * 60 * 24));

            if (days <= 0) {
                setEstimate({ days: null, rate: null, total: null, error: 'Invalid dates', autoPeriod: null });
                return;
            }

            const selectedVehicle = vehicleOptions.find(v => v.value === vehicle);
            if (!selectedVehicle) {
                setEstimate(newEstimate);
                return;
            }

            const autoPeriod = getPeriodFromDays(days);
            const rate = selectedVehicle.rates[autoPeriod];

            setEstimate({
                days,
                rate,
                total: rate * days,
                error: null,
                autoPeriod,
            });
        }, [pickupDate, returnDate, vehicle]);

        useEffect(() => {
            const urls: {
                drivingLicense: string | null;
                idDocument: string | null;
                depositProof: string | null;
            } = {
                drivingLicense: null,
                idDocument: null,
                depositProof: null,
            };

            if (drivingLicenseFile?.[0]) {
                const file = drivingLicenseFile[0];
                if (file.type.startsWith('image/')) {
                    urls.drivingLicense = URL.createObjectURL(file);
                }
            }

            if (idDocumentFile?.[0]) {
                const file = idDocumentFile[0];
                if (file.type.startsWith('image/')) {
                    urls.idDocument = URL.createObjectURL(file);
                }
            }

            if (depositProofFile?.[0]) {
                const file = depositProofFile[0];
                if (file.type.startsWith('image/')) {
                    urls.depositProof = URL.createObjectURL(file);
                }
            }

            setPreviewUrls(urls);

            return () => {
                if (urls.drivingLicense) URL.revokeObjectURL(urls.drivingLicense);
                if (urls.idDocument) URL.revokeObjectURL(urls.idDocument);
                if (urls.depositProof) URL.revokeObjectURL(urls.depositProof);
            };
        }, [drivingLicenseFile, idDocumentFile, depositProofFile]);

        const validateFile = (file: File, maxSizeMB: number = 10): string | null => {
            const maxSize = maxSizeMB * 1024 * 1024;
            if (file.size > maxSize) {
                return `File "${file.name}" exceeds ${maxSizeMB}MB limit`;
            }
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                return `File "${file.name}" must be JPG, PNG, WEBP or PDF`;
            }
            return null;
        };

        useImperativeHandle(ref, () => ({
            validateStep: async () => {
                // ✅ Amend mode requires a booking ID or email on Step 1
                if (activeStep === 1 && amendRequested) {
                    if (!amendBookingId.trim() && !amendEmail.trim()) {
                        toast.error(
                            'Please enter your Booking ID or the email used for the original booking.'
                        );
                        return false;
                    }
                    if (lookupStatus === 'loading') {
                        toast.info(
                            'Still looking up your booking — please wait a moment…'
                        );
                        return false;
                    }
                }

                const fieldsToValidate = stepFields[activeStep] || [];
                if (fieldsToValidate.length === 0) {
                    return true;
                }
                const result = await trigger(fieldsToValidate as any);
                return result;
            },
            resetForm: () => {
                reset();
                setPhoneValue('');
                setConfirmed(false);
                setBookingData(null);
                setIsSubmitting(false);
                setPreviewUrls({ drivingLicense: null, idDocument: null, depositProof: null });
                setEstimate({ days: null, rate: null, total: null, error: null, autoPeriod: null });
                // ✅ Reset amend + lookup state
                setAmendRequested(false);
                setAmendBookingId('');
                setAmendEmail('');
                if (lookupAbortRef.current) {
                    lookupAbortRef.current.abort();
                    lookupAbortRef.current = null;
                }
                setLookupStatus('idle');
                setLookupMessage('');
                lastLookupKeyRef.current = '';
                toast.info('Form has been reset.');
            },
        }));

        const onSubmit = async (data: BookingFormData) => {
            const dlFile = data.drivingLicense?.[0];
            const idFile = data.idDocument?.[0];
            const proofFile = data.depositProof?.[0];

            if (!dlFile) {
                toast.error('Please upload your driving licence');
                return;
            }
            if (!idFile) {
                toast.error('Please upload your ID or passport');
                return;
            }
            if (!proofFile) {
                toast.error('Please upload proof of payment');
                return;
            }

            const dlError = validateFile(dlFile);
            if (dlError) {
                toast.error(dlError);
                return;
            }
            const idError = validateFile(idFile);
            if (idError) {
                toast.error(idError);
                return;
            }
            const proofError = validateFile(proofFile);
            if (proofError) {
                toast.error(proofError);
                return;
            }

            if (data.returnDate && data.pickupDate && data.returnDate < data.pickupDate) {
                toast.error('Return date cannot be before pickup date');
                return;
            }

            setIsSubmitting(true);

            try {
                const mappedData = new FormData();
                mappedData.append('customerName', data.fullName);
                mappedData.append('email', data.email);
                mappedData.append('phone', phoneValue);
                mappedData.append('pickupDate', data.pickupDate);
                mappedData.append('returnDate', data.returnDate);
                mappedData.append('carType', data.vehicle);
                mappedData.append('pickupLocation', data.pickupLocation);
                mappedData.append('dropoffLocation', data.deliveryAddress || data.pickupLocation);
                mappedData.append('additionalInfo', data.notes || '');
                mappedData.append('nationality', data.nationality || '');
                mappedData.append('idNumber', data.idNumber);
                mappedData.append('idType', data.idType);
                mappedData.append('termsAccepted', 'true');
                mappedData.append('drivingLicense', dlFile);
                mappedData.append('idDocument', idFile);
                mappedData.append('depositProof', proofFile);

                if (estimate.rate && estimate.autoPeriod) {
                    mappedData.append('periodCategory', estimate.autoPeriod);
                    mappedData.append('dailyRate', String(estimate.rate));
                    mappedData.append('estimatedTotal', String(estimate.total || 0));
                    mappedData.append('rentalDays', String(estimate.days || 0));
                }

                // ✅ Amend mode: attach original identifiers
                let endpoint = API_URL;
                if (isAmendMode) {
                    if (amendBookingId.trim()) {
                        mappedData.append('originalBookingId', amendBookingId.trim());
                    }
                    if (amendEmail.trim()) {
                        mappedData.append('originalEmail', amendEmail.trim().toLowerCase());
                    }
                    endpoint = AMEND_API_URL;
                }

                const response = await axios.post(endpoint, mappedData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 30000,
                });

                if (response.status === 201 || response.status === 200) {
                    setBookingData(response.data.booking);
                    setConfirmed(true);
                    toast.success(
                        isAmendMode
                            ? '✅ Booking amended! A new confirmation email has been sent.'
                            : '✅ Booking confirmed! Check your email for the confirmation.'
                    );
                    if (onComplete) {
                        setTimeout(onComplete, 3000);
                    }
                }
            } catch (error: any) {
                console.error('Booking error:', error);
                const errorMessage =
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    error.message ||
                    'Booking failed. Please try again.';
                toast.error(`❌ ${errorMessage}`);
            } finally {
                setIsSubmitting(false);
            }
        };

        const HeroSection = () => (
            <div className="bf-hero" style={styles.hero}>
                <div style={styles.heroLogo}>
                    <img
                        src="/assets/images/logo.png"
                        alt="Vision Wan Services Logo"
                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                    />
                </div>
                <div style={styles.heroContent}>
                    <h1 className="bf-hero-title" style={styles.heroTitle}>
                        {isAmendMode ? 'Amend Your Booking' : 'Vehicle Booking Form'}
                    </h1>
                    <p className="bf-hero-subtitle" style={styles.heroSubtitle}>
                        {isAmendMode
                            ? 'Update your reservation details below. Submitting will replace your previous booking.'
                            : 'Complete the details below and attach the required identification documents.'}
                    </p>
                    <span style={styles.heroPill}>
                        {isAmendMode ? 'Amend Mode' : 'Special Offer Rates'}
                    </span>
                </div>
            </div>
        );

        const PeriodCategoryDisplay = () => {
            return (
                <div className="bf-period-grid" style={styles.periodGrid}>
                    {periodCategories.map((period) => {
                        const isActive = estimate.autoPeriod === period.value;
                        const selectedVehicle = vehicleOptions.find(v => v.value === vehicle);
                        const rateForPeriod = selectedVehicle?.rates[period.value];

                        return (
                            <div
                                key={period.value}
                                style={{
                                    ...styles.periodCard,
                                    ...(isActive ? styles.periodCardSelected : {}),
                                    cursor: 'default',
                                    opacity: isActive ? 1 : 0.55,
                                }}
                            >
                                <div style={styles.periodLabel}>{period.label}</div>
                                {rateForPeriod !== undefined ? (
                                    <div style={styles.periodRate}>
                                        KES {rateForPeriod.toLocaleString()}/day
                                    </div>
                                ) : (
                                    <div style={styles.periodRateHint}>
                                        Select a vehicle to see rate
                                    </div>
                                )}
                                {isActive && (
                                    <div style={{
                                        marginTop: '6px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        color: '#10b981',
                                        letterSpacing: '0.5px',
                                    }}>
                                        ✓ AUTO-APPLIED
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        };

        const VehicleSelector = () => (
            <div className="bf-vehicle-grid" style={styles.vehicleGrid}>
                {vehicleOptions.map((option) => {
                    const isSelected = vehicle === option.value;
                    const activePeriod = estimate.autoPeriod || 'short';
                    const rateForPeriod = option.rates[activePeriod];
                    const periodLabel = periodCategories.find(p => p.value === activePeriod)?.label || '—';

                    return (
                        <label
                            key={option.value}
                            style={{
                                ...styles.vehicleCard,
                                ...(isSelected ? styles.vehicleCardSelected : {}),
                            }}
                        >
                            <input
                                type="radio"
                                value={option.value}
                                {...register('vehicle', { required: 'Please select a vehicle' })}
                                style={styles.vehicleRadio}
                            />
                            <div style={styles.vehicleName}>{option.label}</div>
                            <div style={styles.vehicleRates}>
                                <div style={styles.vehicleRatesHighlight}>
                                    <strong>KES {rateForPeriod.toLocaleString()}/day</strong>
                                </div>
                                <div style={{ fontSize: '11px', marginTop: '4px', color: '#6b7280' }}>
                                    {estimate.days
                                        ? `Based on ${estimate.days} day${estimate.days === 1 ? '' : 's'}`
                                        : `Rates for ${periodLabel}`}
                                </div>
                            </div>
                        </label>
                    );
                })}
            </div>
        );

        const BookingEstimate = () => {
            const formatNumber = (num: number) => num.toLocaleString('en-KE');
            const autoPeriodLabel = estimate.autoPeriod
                ? periodCategories.find(p => p.value === estimate.autoPeriod)?.label
                : '—';

            return (
                <div style={styles.estimateCard}>
                    <h4 style={styles.estimateTitle}>📊 Booking Estimate</h4>
                    <div style={styles.estimateRow}>
                        <span style={styles.estimateLabel}>Vehicle</span>
                        <strong style={styles.estimateValue}>{vehicle || '—'}</strong>
                    </div>
                    <div style={styles.estimateRow}>
                        <span style={styles.estimateLabel}>Rental days</span>
                        <strong style={styles.estimateValue}>
                            {estimate.error
                                ? estimate.error
                                : estimate.days
                                    ? `${estimate.days} day${estimate.days === 1 ? '' : 's'}`
                                    : '—'}
                        </strong>
                    </div>
                    <div style={styles.estimateRow}>
                        <span style={styles.estimateLabel}>Applicable tier</span>
                        <strong style={styles.estimateValue}>{autoPeriodLabel}</strong>
                    </div>
                    <div style={styles.estimateRow}>
                        <span style={styles.estimateLabel}>Daily rate</span>
                        <strong style={styles.estimateValue}>
                            {estimate.rate ? `KES ${formatNumber(estimate.rate)}/day` : '—'}
                        </strong>
                    </div>
                    <div style={{ ...styles.estimateRow, ...styles.estimateTotal }}>
                        <span style={styles.estimateLabel}>Estimated total</span>
                        <strong style={styles.estimateValueHighlight}>
                            {estimate.total ? `KES ${formatNumber(estimate.total)}` : '—'}
                        </strong>
                    </div>

                    {estimate.days && (
                        <div style={{
                            marginTop: '12px',
                            padding: '10px 12px',
                            background: 'rgba(255, 107, 53, 0.08)',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: '#7c2d12',
                            lineHeight: '1.5',
                        }}>
                            ℹ️ The daily rate is automatically determined by your rental duration:
                            1–7 days (short), 7–20 days (medium), 20+ days (long).
                        </div>
                    )}
                </div>
            );
        };

        const NavigationButtons = ({ showSubmit = false }) => (
            <div className="bf-navigation" style={styles.navigation}>
                {activeStep > 1 && (
                    <button
                        type="button"
                        onClick={onPrevStep}
                        style={styles.prevBtn}
                    >
                        ← Previous
                    </button>
                )}
                {!showSubmit ? (
                    <button
                        type="button"
                        onClick={onNextStep}
                        style={styles.nextBtn}
                    >
                        Next →
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={isSubmitting || confirmed || !isFormComplete}
                        style={{
                            ...styles.submitBtn,
                            ...((isSubmitting || confirmed || !isFormComplete) ? styles.submitBtnDisabled : {}),
                        }}
                    >
                        {isSubmitting
                            ? 'Submitting…'
                            : confirmed
                                ? (isAmendMode ? '✓ Booking Amended' : '✓ Booking Confirmed')
                                : (isAmendMode ? 'Submit Amendment' : 'Submit Booking Request')}
                    </button>
                )}
            </div>
        );

        const BookingSummary = () => {
            const v = watchedValues;
            const formatDate = (dateStr: string) => {
                if (!dateStr) return 'Not provided';
                const d = new Date(dateStr);
                return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            };

            const getFileName = (fileList: FileList) => {
                if (!fileList || fileList.length === 0) return null;
                return fileList[0].name;
            };

            const drivingLicenseName = getFileName(v.drivingLicense);
            const idDocumentName = getFileName(v.idDocument);
            const depositProofName = getFileName(v.depositProof);
            const formatNumber = (num: number) => num.toLocaleString('en-KE');
            const autoPeriodLabel = estimate.autoPeriod
                ? periodCategories.find(p => p.value === estimate.autoPeriod)?.label
                : '—';

            return (
                <div style={styles.reviewContainer}>
                    <div style={styles.reviewBanner}>
                        <div style={styles.reviewBannerIcon}>✓</div>
                        <div>
                            <h3 style={styles.reviewBannerTitle}>Almost There!</h3>
                            <p style={styles.reviewBannerText}>
                                {isAmendMode
                                    ? 'Review your updated details below. Submitting will replace your previous booking.'
                                    : 'Review your details below before submitting your booking.'}
                            </p>
                        </div>
                    </div>

                    {isAmendMode && (
                        <div style={styles.reviewCard}>
                            <div style={styles.reviewCardHeader}>
                                <span style={styles.reviewCardIcon}>🔄</span>
                                <h4 style={styles.reviewCardTitle}>Amending Existing Booking</h4>
                            </div>
                            <div className="bf-review-body" style={styles.reviewCardBody}>
                                {amendBookingId.trim() && (
                                    <div style={styles.reviewRow}>
                                        <span style={styles.reviewLabel}>Original Booking ID</span>
                                        <span style={styles.reviewValue}>{amendBookingId.trim()}</span>
                                    </div>
                                )}
                                {amendEmail.trim() && (
                                    <div style={styles.reviewRow}>
                                        <span style={styles.reviewLabel}>Original Email</span>
                                        <span style={styles.reviewValue}>{amendEmail.trim()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>👤</span>
                            <h4 style={styles.reviewCardTitle}>Your Details</h4>
                        </div>
                        <div className="bf-review-body" style={styles.reviewCardBody}>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Full Name</span>
                                <span style={styles.reviewValue}>{v.fullName || '—'}</span>
                            </div>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Email</span>
                                <span style={styles.reviewValue}>{v.email || '—'}</span>
                            </div>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Phone</span>
                                <span style={styles.reviewValue}>{phoneValue || '—'}</span>
                            </div>
                            {v.nationality && (
                                <div style={styles.reviewRow}>
                                    <span style={styles.reviewLabel}>Nationality</span>
                                    <span style={styles.reviewValue}>{v.nationality}</span>
                                </div>
                            )}
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>ID Type</span>
                                <span style={styles.reviewValue}>
                                    {v.idType === 'passport' ? 'Passport' : 'National ID'}
                                </span>
                            </div>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>ID Number</span>
                                <span style={styles.reviewValue}>{v.idNumber || '—'}</span>
                            </div>
                        </div>
                    </div>

                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>🚗</span>
                            <h4 style={styles.reviewCardTitle}>Rental Details</h4>
                        </div>
                        <div className="bf-review-body" style={styles.reviewCardBody}>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Vehicle</span>
                                <span style={styles.reviewValue}>{v.vehicle || '—'}</span>
                            </div>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Applicable Tier</span>
                                <span style={styles.reviewValue}>{autoPeriodLabel}</span>
                            </div>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Pickup Location</span>
                                <span style={styles.reviewValue}>{v.pickupLocation || '—'}</span>
                            </div>
                            {v.deliveryAddress && (
                                <div style={styles.reviewRow}>
                                    <span style={styles.reviewLabel}>Delivery Address</span>
                                    <span style={styles.reviewValue}>{v.deliveryAddress}</span>
                                </div>
                            )}
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Pickup Date</span>
                                <span style={styles.reviewValueHighlight}>{formatDate(v.pickupDate)}</span>
                            </div>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Return Date</span>
                                <span style={styles.reviewValueHighlight}>{formatDate(v.returnDate)}</span>
                            </div>
                            {v.notes && (
                                <div style={styles.reviewRow}>
                                    <span style={styles.reviewLabel}>Special Requests</span>
                                    <span style={styles.reviewValue}>{v.notes}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>💰</span>
                            <h4 style={styles.reviewCardTitle}>Booking Estimate</h4>
                        </div>
                        <div className="bf-review-body" style={styles.reviewCardBody}>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Applicable Tier</span>
                                <span style={styles.reviewValue}>{autoPeriodLabel}</span>
                            </div>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Rental Period</span>
                                <span style={styles.reviewValue}>
                                    {estimate.days ? `${estimate.days} day${estimate.days === 1 ? '' : 's'}` : '—'}
                                </span>
                            </div>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Daily Rate</span>
                                <span style={styles.reviewValue}>
                                    {estimate.rate ? `KES ${formatNumber(estimate.rate)}/day` : '—'}
                                </span>
                            </div>
                            <div style={{ ...styles.reviewRow, ...styles.reviewTotalRow }}>
                                <span style={styles.reviewLabel}>Estimated Total</span>
                                <span style={styles.reviewTotalValue}>
                                    {estimate.total ? `KES ${formatNumber(estimate.total)}` : '—'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>📎</span>
                            <h4 style={styles.reviewCardTitle}>Uploaded Documents</h4>
                        </div>
                        <div className="bf-review-body" style={styles.reviewCardBody}>
                            <div className="bf-doc-preview-grid" style={styles.docPreviewGrid}>
                                <div style={styles.docPreviewItem}>
                                    <div style={styles.docPreviewLabel}>
                                        <span>🪪 Driving Licence</span>
                                        {drivingLicenseName ? (
                                            <span style={styles.docStatusOk}>✓ Uploaded</span>
                                        ) : (
                                            <span style={styles.docStatusMissing}>✗ Missing</span>
                                        )}
                                    </div>
                                    {previewUrls.drivingLicense ? (
                                        <img
                                            src={previewUrls.drivingLicense}
                                            alt="Driving Licence Preview"
                                            style={styles.docPreviewImage}
                                        />
                                    ) : drivingLicenseName ? (
                                        <div style={styles.docPreviewFile}>
                                            <span style={styles.docPreviewFileIcon}>📄</span>
                                            <span style={styles.docPreviewFileName}>{drivingLicenseName}</span>
                                        </div>
                                    ) : (
                                        <div style={styles.docPreviewEmpty}>
                                            <span>No file uploaded</span>
                                        </div>
                                    )}
                                </div>

                                <div style={styles.docPreviewItem}>
                                    <div style={styles.docPreviewLabel}>
                                        <span>🆔 ID / Passport</span>
                                        {idDocumentName ? (
                                            <span style={styles.docStatusOk}>✓ Uploaded</span>
                                        ) : (
                                            <span style={styles.docStatusMissing}>✗ Missing</span>
                                        )}
                                    </div>
                                    {previewUrls.idDocument ? (
                                        <img
                                            src={previewUrls.idDocument}
                                            alt="ID Document Preview"
                                            style={styles.docPreviewImage}
                                        />
                                    ) : idDocumentName ? (
                                        <div style={styles.docPreviewFile}>
                                            <span style={styles.docPreviewFileIcon}>📄</span>
                                            <span style={styles.docPreviewFileName}>{idDocumentName}</span>
                                        </div>
                                    ) : (
                                        <div style={styles.docPreviewEmpty}>
                                            <span>No file uploaded</span>
                                        </div>
                                    )}
                                </div>

                                <div style={{ ...styles.docPreviewItem, gridColumn: '1 / -1' }}>
                                    <div style={styles.docPreviewLabel}>
                                        <span>💳 Proof of Payment</span>
                                        {depositProofName ? (
                                            <span style={styles.docStatusOk}>✓ Uploaded</span>
                                        ) : (
                                            <span style={styles.docStatusMissing}>✗ Missing</span>
                                        )}
                                    </div>
                                    {previewUrls.depositProof ? (
                                        <img
                                            src={previewUrls.depositProof}
                                            alt="Proof of Payment Preview"
                                            style={styles.docPreviewImage}
                                        />
                                    ) : depositProofName ? (
                                        <div style={styles.docPreviewFile}>
                                            <span style={styles.docPreviewFileIcon}>📄</span>
                                            <span style={styles.docPreviewFileName}>{depositProofName}</span>
                                        </div>
                                    ) : (
                                        <div style={styles.docPreviewEmpty}>
                                            <span>No file uploaded</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>✅</span>
                            <h4 style={styles.reviewCardTitle}>Declaration</h4>
                        </div>
                        <div className="bf-review-body" style={styles.reviewCardBody}>
                            <div className="bf-consent-box" style={styles.consentBox}>
                                <input
                                    id="consent"
                                    type="checkbox"
                                    className="bf-consent-checkbox"
                                    {...register('consent', { required: 'You must confirm accuracy' })}
                                    style={styles.consentCheckbox}
                                />
                                <label htmlFor="consent" style={styles.consentLabel}>
                                    I confirm that the information and documents provided are accurate, and I consent to their use for booking verification. <span style={styles.required}>*</span>
                                </label>
                            </div>
                            {errors.consent && <p style={styles.errorText}>{errors.consent.message}</p>}
                        </div>
                    </div>

                    <div style={styles.reviewNote}>
                        <span style={styles.reviewNoteIcon}>ℹ️</span>
                        <p style={styles.reviewNoteText}>
                            By clicking <strong>{isAmendMode ? 'Submit Amendment' : 'Submit Booking Request'}</strong>, you agree to our{' '}
                            <a href="/terms" style={styles.reviewNoteLink}>Terms & Conditions</a> and{' '}
                            <a href="/privacy" style={styles.reviewNoteLink}>Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            );
        };

        const renderStepContent = () => {
            switch (activeStep) {
                case 1:
                    return (
                        <>
                            {/* ✅ Amend mode toggle + identifier inputs */}
                            <div
                                style={{
                                    background: amendRequested ? '#ecfdf5' : '#f8f9fa',
                                    border: `1px solid ${amendRequested ? '#10b981' : '#e5e7eb'}`,
                                    borderRadius: '12px',
                                    padding: '14px 18px',
                                    marginBottom: '16px',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <label
                                    htmlFor="amendToggle"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: amendRequested ? '#065f46' : '#1f2328',
                                    }}
                                >
                                    <input
                                        id="amendToggle"
                                        type="checkbox"
                                        className="bf-consent-checkbox"
                                        checked={amendRequested}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setAmendRequested(checked);
                                            if (!checked) {
                                                setAmendBookingId('');
                                                setAmendEmail('');
                                            }
                                        }}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            minWidth: '20px',
                                            minHeight: '20px',
                                            maxWidth: '20px',
                                            maxHeight: '20px',
                                            flex: '0 0 20px',
                                            accentColor: '#10b981',
                                            cursor: 'pointer',
                                            appearance: 'auto',
                                            WebkitAppearance: 'checkbox',
                                            MozAppearance: 'checkbox',
                                        }}
                                    />
                                    <span>🔄 I'm amending an existing booking</span>
                                </label>

                                {amendRequested && (
                                    <>
                                        <p
                                            style={{
                                                margin: '10px 0 12px',
                                                fontSize: '13px',
                                                color: '#065f46',
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            Enter either your <strong>Booking ID</strong> or the{' '}
                                            <strong>email address</strong> used when you first booked.
                                            We'll use it to locate and replace your original booking.
                                        </p>

                                        <div
                                            className="bf-grid-2"
                                            style={{ ...styles.grid2, gap: '12px' }}
                                        >
                                            <div>
                                                <label
                                                    style={styles.label}
                                                    htmlFor="amendBookingId"
                                                >
                                                    Booking ID
                                                </label>
                                                <input
                                                    id="amendBookingId"
                                                    type="text"
                                                    placeholder="e.g. V1-12345678"
                                                    value={amendBookingId}
                                                    onChange={(e) =>
                                                        setAmendBookingId(e.target.value)
                                                    }
                                                    style={styles.input}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    style={styles.label}
                                                    htmlFor="amendEmail"
                                                >
                                                    OR — Booking email
                                                </label>
                                                <input
                                                    id="amendEmail"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={amendEmail}
                                                    onChange={(e) =>
                                                        setAmendEmail(e.target.value)
                                                    }
                                                    style={styles.input}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>

                                        {isAmendMode && (
                                            <div
                                                style={{
                                                    marginTop: '12px',
                                                    fontSize: '12.5px',
                                                    color: '#065f46',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                ✓ Amend mode active — submitting will replace
                                                booking{' '}
                                                <strong>
                                                    {amendBookingId.trim() ||
                                                        amendEmail.trim()}
                                                </strong>
                                                .
                                            </div>
                                        )}

                                        {/* ✅ Lookup status feedback */}
                                        {lookupStatus !== 'idle' && (
                                            <div
                                                role="status"
                                                style={{
                                                    marginTop: '10px',
                                                    padding: '10px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '13px',
                                                    lineHeight: 1.5,
                                                    display: 'flex',
                                                    gap: '8px',
                                                    alignItems: 'flex-start',
                                                    background:
                                                        lookupStatus === 'found'
                                                            ? '#ecfdf5'
                                                            : lookupStatus === 'loading'
                                                            ? '#eff6ff'
                                                            : lookupStatus === 'not_found'
                                                            ? '#fef2f2'
                                                            : '#fffbeb',
                                                    border: `1px solid ${
                                                        lookupStatus === 'found'
                                                            ? '#10b981'
                                                            : lookupStatus === 'loading'
                                                            ? '#3b82f6'
                                                            : lookupStatus === 'not_found'
                                                            ? '#ef4444'
                                                            : '#f59e0b'
                                                    }`,
                                                    color:
                                                        lookupStatus === 'found'
                                                            ? '#065f46'
                                                            : lookupStatus === 'loading'
                                                            ? '#1e3a8a'
                                                            : lookupStatus === 'not_found'
                                                            ? '#7f1d1d'
                                                            : '#78350f',
                                                }}
                                            >
                                                <span>
                                                    {lookupStatus === 'loading'
                                                        ? '⏳'
                                                        : lookupStatus === 'found'
                                                        ? '✅'
                                                        : '⚠️'}
                                                </span>
                                                <span>{lookupMessage}</span>
                                            </div>
                                        )}

                                        {/* Document re-upload reminder when a booking was found */}
                                        {lookupStatus === 'found' && (
                                            <div
                                                style={{
                                                    marginTop: '10px',
                                                    padding: '10px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '12.5px',
                                                    lineHeight: 1.5,
                                                    background: '#fffbeb',
                                                    border: '1px solid #f59e0b',
                                                    color: '#78350f',
                                                }}
                                            >
                                                📎 <strong>Please re-upload your documents.</strong>{' '}
                                                For security reasons, browsers cannot prefill
                                                file inputs — you'll need to attach your ID,
                                                driving licence, and proof of payment again.
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <section className="bf-card" style={styles.card}>
                                <h2 className="bf-card-title" style={styles.cardTitle}>Your details</h2>
                                <p className="bf-card-subtitle" style={styles.cardSubtitle}>Enter the primary driver's contact and identification information.</p>
                                <div className="bf-grid-2" style={styles.grid2}>
                                    <div>
                                        <label style={styles.label} htmlFor="fullName">
                                            Full name <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="fullName"
                                            type="text"
                                            placeholder="Enter your full name"
                                            {...register('fullName', { required: 'Full name is required' })}
                                            style={styles.input}
                                            autoComplete="name"
                                        />
                                        {errors.fullName && <p style={styles.errorText}>{errors.fullName.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="phone">
                                            Phone / WhatsApp <span style={styles.required}>*</span>
                                        </label>
                                        <PhoneInput
                                            country={DEFAULT_COUNTRY}
                                            value={phoneValue}
                                            onChange={(value: string) => {
                                                setPhoneValue(value);
                                                setValue('phone', value, { shouldValidate: true });
                                            }}
                                            containerClass="bf-phone-input"
                                            inputStyle={{
                                                width: '100%',
                                                height: '54px',
                                                fontSize: '14px',
                                                borderRadius: '10px',
                                                border: '1px solid #d9dee7',
                                                paddingLeft: '80px',
                                                background: '#fff',
                                            }}
                                            buttonStyle={{
                                                borderRadius: '10px 0 0 10px',
                                                border: '1px solid #d9dee7',
                                                background: '#f8f9fa',
                                                height: '54px',
                                            }}
                                            dropdownStyle={{
                                                borderRadius: '10px',
                                                border: '1px solid #d9dee7',
                                                maxHeight: '300px',
                                                overflowY: 'auto',
                                            }}
                                            searchPlaceholder="Search country..."
                                            placeholder="+254 700 000 000"
                                            enableSearch={true}
                                            searchNotFound="No country found"
                                            countryCodeEditable={false}
                                        />
                                        <div style={styles.helpText}>
                                            Enter your phone number with country code.
                                        </div>
                                        {errors.phone && <p style={styles.errorText}>{errors.phone.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="email">
                                            Email address <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address',
                                                },
                                            })}
                                            style={styles.input}
                                            autoComplete="off"
                                            data-form-type="other"
                                        />
                                        {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="nationality">
                                            Nationality
                                        </label>
                                        <input
                                            id="nationality"
                                            type="text"
                                            placeholder="e.g. Kenyan"
                                            {...register('nationality')}
                                            style={styles.input}
                                            autoComplete="country-name"
                                        />
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="idType">
                                            ID Type <span style={styles.required}>*</span>
                                        </label>
                                        <select
                                            id="idType"
                                            {...register('idType', { required: 'Please select ID type' })}
                                            style={styles.select}
                                        >
                                            <option value="id">National ID</option>
                                            <option value="passport">Passport</option>
                                        </select>
                                        {errors.idType && <p style={styles.errorText}>{errors.idType.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="idNumber">
                                            ID / Passport Number <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="idNumber"
                                            type="text"
                                            placeholder="Enter your ID or Passport number"
                                            {...register('idNumber', {
                                                required: 'ID/Passport number is required',
                                                minLength: {
                                                    value: 4,
                                                    message: 'Must be at least 4 characters'
                                                }
                                            })}
                                            style={styles.input}
                                            autoComplete="off"
                                            data-form-type="other"
                                        />
                                        {errors.idNumber && <p style={styles.errorText}>{errors.idNumber.message}</p>}
                                    </div>
                                </div>
                            </section>
                            <NavigationButtons />
                        </>
                    );

                case 2:
                    return (
                        <>
                            <section className="bf-card" style={styles.card}>
                                <h2 className="bf-card-title" style={styles.cardTitle}>Rental details</h2>
                                <p className="bf-card-subtitle" style={styles.cardSubtitle}>Select dates and the vehicle you would like to book.</p>

                                <div className="bf-grid-3" style={styles.grid3}>
                                    <div>
                                        <label style={styles.label} htmlFor="pickupDate">
                                            Pick-up date <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="pickupDate"
                                            type="date"
                                            {...register('pickupDate', {
                                                required: 'Pickup date is required',
                                                validate: value => value >= todayStr || 'Pickup date must be today or in the future',
                                            })}
                                            min={todayStr}
                                            style={styles.input}
                                        />
                                        {errors.pickupDate && <p style={styles.errorText}>{errors.pickupDate.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="returnDate">
                                            Return date <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="returnDate"
                                            type="date"
                                            {...register('returnDate', {
                                                required: 'Return date is required',
                                                validate: value => {
                                                    if (!pickupDate) return true;
                                                    return value >= pickupDate || 'Return date must be after pickup date';
                                                },
                                            })}
                                            min={pickupDate || todayStr}
                                            style={styles.input}
                                        />
                                        {errors.returnDate && <p style={styles.errorText}>{errors.returnDate.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="pickupLocation">
                                            Pick-up location <span style={styles.required}>*</span>
                                        </label>
                                        <select
                                            id="pickupLocation"
                                            {...register('pickupLocation', { required: 'Pickup location is required' })}
                                            style={styles.select}
                                        >
                                            <option value="">Select location</option>
                                            {pickupLocations.map((location) => (
                                                <option key={location} value={location}>
                                                    {location}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.pickupLocation && <p style={styles.errorText}>{errors.pickupLocation.message}</p>}
                                    </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                    <label style={styles.label}>Rental Period Category</label>
                                    <p style={{ ...styles.helpText, marginBottom: '10px' }}>
                                        Your rental tier is automatically determined by the number of days you selected.
                                        Pick dates to see the applicable rate.
                                    </p>
                                    <PeriodCategoryDisplay />
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                    <label style={styles.label}>
                                        Vehicle <span style={styles.required}>*</span>
                                    </label>
                                    <p style={{ ...styles.helpText, marginBottom: '10px' }}>
                                        {estimate.autoPeriod ? (
                                            <>
                                                Rates shown reflect your auto-detected tier:
                                                <strong> {periodCategories.find(p => p.value === estimate.autoPeriod)?.label}</strong>
                                                {estimate.days && ` (${estimate.days} day${estimate.days === 1 ? '' : 's'})`}
                                            </>
                                        ) : (
                                            'Select dates first to see applicable rates.'
                                        )}
                                    </p>
                                    <VehicleSelector />
                                    {errors.vehicle && <p style={styles.errorText}>{errors.vehicle.message}</p>}
                                </div>

                                <div className="bf-grid-2" style={{ ...styles.grid2, marginTop: '22px' }}>
                                    <div>
                                        <label style={styles.label} htmlFor="deliveryAddress">
                                            Delivery / exact pick-up address
                                        </label>
                                        <input
                                            id="deliveryAddress"
                                            type="text"
                                            placeholder="Optional"
                                            {...register('deliveryAddress')}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="notes">
                                            Special requests
                                        </label>
                                        <input
                                            id="notes"
                                            type="text"
                                            placeholder="Child seat, airport pickup, etc."
                                            {...register('notes')}
                                            style={styles.input}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                    <BookingEstimate />
                                </div>
                            </section>
                            <NavigationButtons />
                        </>
                    );

                case 3:
                    return (
                        <>
                            <section className="bf-card" style={styles.card}>
                                <h2 className="bf-card-title" style={styles.cardTitle}>Upload documents</h2>
                                <p className="bf-card-subtitle" style={styles.cardSubtitle}>
                                    Upload a clear copy or photo of the primary driver's ID/passport, valid driving licence, and proof of payment.
                                </p>
                                <div style={styles.noteBox}>
                                    All three documents are required. On most phones, tap <strong>Choose File</strong> and select the camera
                                    to photograph the document. Make sure the whole document is visible and readable.
                                </div>
                                {isAmendMode && lookupStatus === 'found' && (
                                    <div
                                        style={{
                                            marginTop: '14px',
                                            padding: '10px 12px',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            lineHeight: 1.5,
                                            background: '#fffbeb',
                                            border: '1px solid #f59e0b',
                                            color: '#78350f',
                                        }}
                                    >
                                        📎 Since you're amending booking{' '}
                                        <strong>
                                            {amendBookingId.trim() || amendEmail.trim()}
                                        </strong>
                                        , please re-upload your documents. Browsers can't
                                        prefill file inputs for security reasons.
                                    </div>
                                )}
                                <div className="bf-grid-2" style={{ ...styles.grid2, marginTop: '16px' }}>
                                    <div>
                                        <label style={styles.label} htmlFor="idDocument">
                                            National ID / Passport <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="idDocument"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,application/pdf"
                                            {...register('idDocument', {
                                                required: 'ID or passport is required',
                                                validate: {
                                                    filePresent: (value) => {
                                                        if (!value || value.length === 0) return 'ID or passport is required';
                                                        return true;
                                                    },
                                                },
                                            })}
                                            style={styles.fileInput}
                                        />
                                        <div style={styles.helpText}>JPG, PNG or PDF. Max 10 MB.</div>
                                        {errors.idDocument && <p style={styles.errorText}>{errors.idDocument.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="drivingLicense">
                                            Driving licence <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="drivingLicense"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,application/pdf"
                                            {...register('drivingLicense', {
                                                required: 'Driving licence is required',
                                                validate: {
                                                    filePresent: (value) => {
                                                        if (!value || value.length === 0) return 'Driving licence is required';
                                                        return true;
                                                    },
                                                },
                                            })}
                                            style={styles.fileInput}
                                        />
                                        <div style={styles.helpText}>JPG, PNG or PDF. Max 10 MB.</div>
                                        {errors.drivingLicense && <p style={styles.errorText}>{errors.drivingLicense.message}</p>}
                                    </div>

                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={styles.label} htmlFor="depositProof">
                                            Proof of Payment <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="depositProof"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,application/pdf"
                                            {...register('depositProof', {
                                                required: 'Proof of payment is required',
                                                validate: {
                                                    filePresent: (value) => {
                                                        if (!value || value.length === 0) return 'Proof of payment is required';
                                                        return true;
                                                    },
                                                },
                                            })}
                                            style={styles.fileInput}
                                        />
                                        <div style={styles.helpText}>
                                            Upload a receipt, bank transfer confirmation, M-Pesa screenshot, or deposit slip. JPG, PNG or PDF. Max 10 MB.
                                        </div>
                                        {errors.depositProof && <p style={styles.errorText}>{errors.depositProof.message}</p>}
                                    </div>
                                </div>
                            </section>
                            <NavigationButtons />
                        </>
                    );

                case 4:
                    return (
                        <>
                            <section className="bf-card" style={styles.card}>
                                <h2 className="bf-card-title" style={styles.cardTitle}>
                                    {isAmendMode ? 'Review Amendment' : 'Review & Submit'}
                                </h2>
                                <p className="bf-card-subtitle" style={styles.cardSubtitle}>
                                    The estimate below uses the daily rate automatically matched to your rental duration.
                                </p>
                                <BookingSummary />
                            </section>
                            <NavigationButtons showSubmit={true} />
                            <div style={styles.contactInfo}>
                                +254 705 336 311 / +44 7397 549 590 · visionwanservices@gmail.com
                            </div>
                        </>
                    );
                default:
                    return null;
            }
        };

        return (
            <>
                <style>{`
                    .bf-container {
                        max-width: 980px;
                        margin: 0 auto;
                        padding: 18px;
                        box-sizing: border-box;
                        width: 100%;
                    }
                    @media (max-width: 640px) {
                        .bf-container { padding: 12px; border-radius: 0; }
                    }
                    .bf-hero { display: flex; flex-direction: row; }
                    @media (max-width: 640px) {
                        .bf-hero {
                            flex-direction: column; text-align: center;
                            padding: 20px 14px !important; gap: 12px !important;
                        }
                        .bf-hero-title { font-size: 22px !important; }
                        .bf-hero-subtitle { font-size: 13px !important; }
                    }
                    .bf-card { padding: 22px; }
                    @media (max-width: 640px) {
                        .bf-card { padding: 16px 14px !important; border-radius: 14px !important; margin: 12px 0 !important; }
                        .bf-card-title { font-size: 18px !important; }
                        .bf-card-subtitle { font-size: 13px !important; margin-bottom: 14px !important; }
                    }
                    .bf-grid-2, .bf-grid-3 { display: grid; }
                    @media (max-width: 640px) {
                        .bf-grid-2, .bf-grid-3 { grid-template-columns: 1fr !important; gap: 12px !important; }
                    }
                    .bf-period-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
                    @media (max-width: 640px) {
                        .bf-period-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
                    }
                    .bf-vehicle-grid { display: grid; grid-template-columns: repeat(5, 1fr); }
                    @media (max-width: 900px) { .bf-vehicle-grid { grid-template-columns: repeat(3, 1fr) !important; } }
                    @media (max-width: 640px) { .bf-vehicle-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; } }
                    @media (max-width: 400px) { .bf-vehicle-grid { grid-template-columns: 1fr !important; } }
                    .bf-doc-preview-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
                    @media (max-width: 640px) {
                        .bf-doc-preview-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
                    }
                    .bf-navigation { display: flex; gap: 12px; }
                    @media (max-width: 640px) {
                        .bf-navigation { flex-direction: column-reverse !important; gap: 10px !important; }
                        .bf-navigation button {
                            width: 100% !important; justify-content: center !important;
                            padding: 14px 18px !important; font-size: 15px !important;
                        }
                    }
                    @media (max-width: 640px) {
                        .bf-phone-input .form-control {
                            font-size: 14px !important; height: 50px !important; padding-left: 70px !important;
                        }
                        .bf-phone-input .flag-dropdown { height: 50px !important; }
                    }
                    .bf-container * { max-width: 100%; box-sizing: border-box; }
                    .bf-container input:not([type="checkbox"]):not([type="radio"]),
                    .bf-container select,
                    .bf-container textarea {
                        width: 100% !important; max-width: 100% !important;
                    }

                    /* ===== Checkboxes & radios must keep native size everywhere ===== */
                    .bf-container input[type="checkbox"],
                    .bf-container input[type="radio"] {
                        width: 20px !important;
                        height: 20px !important;
                        min-width: 20px !important;
                        min-height: 20px !important;
                        max-width: 20px !important;
                        max-height: 20px !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        flex: 0 0 20px !important;
                        appearance: auto !important;
                        -webkit-appearance: checkbox !important;
                        -moz-appearance: checkbox !important;
                        border: 2px solid #d9dee7 !important;
                        border-radius: 4px !important;
                        background: #fff !important;
                        box-shadow: none !important;
                        outline: none !important;
                        transform: none !important;
                        cursor: pointer !important;
                        vertical-align: middle;
                        accent-color: #e10b0b;
                    }
                    .bf-container input[type="radio"] {
                        border-radius: 50% !important;
                        accent-color: #e10b0b;
                    }
                    .bf-container input[type="checkbox"]:focus,
                    .bf-container input[type="radio"]:focus {
                        outline: 2px solid rgba(225, 11, 11, 0.3) !important;
                        outline-offset: 2px !important;
                    }

                    @media (max-width: 640px) {
                        .bf-container input[type="checkbox"],
                        .bf-container input[type="radio"] {
                            width: 22px !important;
                            height: 22px !important;
                            min-width: 22px !important;
                            min-height: 22px !important;
                            max-width: 22px !important;
                            max-height: 22px !important;
                            flex-basis: 22px !important;
                        }
                    }
                    /* ===== Declaration checkbox — desktop + mobile ===== */
                    .bf-consent-box {
                        display: flex;
                        gap: 12px;
                        align-items: flex-start;
                        width: 100%;
                        max-width: 100%;
                        box-sizing: border-box;
                    }
                    .bf-consent-box input[type="checkbox"].bf-consent-checkbox {
                        appearance: auto;
                        -webkit-appearance: checkbox;
                        -moz-appearance: checkbox;
                        width: 20px;
                        height: 20px;
                        min-width: 20px;
                        min-height: 20px;
                        max-width: 20px;
                        max-height: 20px;
                        margin: 2px 0 0 0;
                        padding: 0;
                        border: 2px solid #d9dee7;
                        border-radius: 4px;
                        background: #fff;
                        cursor: pointer;
                        accent-color: #e10b0b;
                        flex: 0 0 20px;
                        box-shadow: none;
                        outline: none;
                        transform: none;
                    }
                    .bf-consent-box input[type="checkbox"].bf-consent-checkbox:focus {
                        outline: 2px solid rgba(225, 11, 11, 0.3);
                        outline-offset: 2px;
                    }
                    .bf-consent-box label {
                        flex: 1 1 auto;
                        min-width: 0;
                        word-break: break-word;
                        overflow-wrap: anywhere;
                        line-height: 1.5;
                        text-align: left;
                        font-weight: 500;
                        font-size: 14px;
                        cursor: pointer;
                        color: #1f2328;
                    }
                    @media (max-width: 640px) {
                        .bf-consent-box {
                            padding: 12px !important;
                            gap: 10px !important;
                            align-items: flex-start !important;
                        }
                        .bf-consent-box label {
                            font-size: 13px !important;
                            line-height: 1.5 !important;
                            text-align: left !important;
                        }
                        .bf-consent-box input[type="checkbox"].bf-consent-checkbox {
                            width: 22px !important;
                            height: 22px !important;
                            min-width: 22px !important;
                            min-height: 22px !important;
                            max-width: 22px !important;
                            max-height: 22px !important;
                            flex-basis: 22px !important;
                        }
                    }
                    @media (max-width: 640px) {
                        .bf-review-body { padding: 14px !important; }
                    }
                    .bf-container p, .bf-container h1, .bf-container h2, .bf-container h3,
                    .bf-container h4, .bf-container span, .bf-container label {
                        overflow-wrap: break-word; word-wrap: break-word;
                    }
                    .bf-container [style*="reviewBanner"] { flex-wrap: wrap; }
                `}</style>

                <div className="bf-container" style={styles.container}>
                    <HeroSection />
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit(onSubmit)}
                        style={styles.form}
                        encType="multipart/form-data"
                    >
                        {renderStepContent()}
                    </form>
                </div>
            </>
        );
    }
);

// ============================================================
// STYLES
// ============================================================
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '980px',
        margin: '0 auto',
        padding: '18px',
        fontFamily: 'Inter, Arial, Helvetica, sans-serif',
        color: '#1f2328',
        background: 'linear-gradient(180deg, #eaf9ff 0%, #ffffff 48%, #f6fbff 100%)',
        boxSizing: 'border-box',
        width: '100%',
    },
    hero: {
        background: 'linear-gradient(135deg, #d90000 0%, #ff1b0a 45%, #ff9a1f 100%)',
        borderRadius: '20px',
        padding: '28px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        color: '#fff',
        boxShadow: '0 12px 40px rgba(217, 0, 0, 0.25)',
        flexWrap: 'wrap',
    },
    heroLogo: {
        flexShrink: 0,
        background: '#fff',
        borderRadius: '50%',
        padding: '6px',
        border: '4px solid rgba(255,255,255,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroContent: { flex: 1, minWidth: 0 },
    heroTitle: { margin: '0 0 8px', fontSize: 'clamp(20px, 5vw, 42px)', color: '#fff' },
    heroSubtitle: { margin: '0', color: 'rgba(255,255,255,0.95)', lineHeight: '1.5', fontSize: 'clamp(13px, 2.5vw, 16px)' },
    heroPill: {
        display: 'inline-block', marginTop: '10px', background: '#e6007e', color: 'white',
        fontWeight: 'bold', padding: '7px 14px', borderRadius: '999px', fontSize: '13px',
        boxShadow: '0 6px 16px rgba(230, 0, 126, 0.35)',
    },
    form: { marginTop: '18px' },
    card: {
        background: 'white', borderRadius: '18px', padding: '22px',
        margin: '18px 0', boxShadow: '0 7px 24px rgba(0,0,0,0.07)',
    },
    cardTitle: { margin: '0 0 6px', color: '#a80f0f', fontSize: '22px', fontWeight: 'bold' },
    cardSubtitle: { margin: '0 0 18px', color: '#6b7280', fontSize: '14px' },
    grid2: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' },
    grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
    fullWidth: { gridColumn: '1 / -1' },
    label: { display: 'block', fontWeight: '700', marginBottom: '7px', fontSize: '14px' },
    required: { color: '#c40000' },
    input: {
        width: '100%', padding: '13px', border: '1px solid #d9dee7',
        borderRadius: '12px', font: 'inherit', background: '#fff', fontSize: '14px',
        boxSizing: 'border-box', outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    select: {
        width: '100%', padding: '13px', border: '1px solid #d9dee7',
        borderRadius: '12px', font: 'inherit', background: '#fff', fontSize: '14px',
        boxSizing: 'border-box', outline: 'none',
    },
    textarea: {
        width: '100%', padding: '13px', border: '1px solid #d9dee7',
        borderRadius: '12px', font: 'inherit', background: '#fff', fontSize: '14px',
        resize: 'vertical', boxSizing: 'border-box', minHeight: '90px',
    },
    fileInput: { width: '100%', padding: '10px 0', fontSize: '14px', boxSizing: 'border-box' },
    helpText: { fontSize: '13px', color: '#667085', marginTop: '6px', lineHeight: '1.45' },
    errorText: { color: '#c40000', fontSize: '13px', marginTop: '5px' },
    noteBox: {
        background: '#fff4dc', borderLeft: '4px solid #ffb31a',
        padding: '12px 14px', borderRadius: '8px', fontSize: '14px', lineHeight: '1.5',
    },
    periodGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
    periodCard: {
        position: 'relative', border: '2px solid #e5e7eb', borderRadius: '14px',
        padding: '16px 12px', cursor: 'pointer', background: '#fff',
        transition: 'all 0.2s', textAlign: 'center', display: 'block',
    },
    periodCardSelected: {
        border: '2px solid #e10b0b',
        background: 'linear-gradient(135deg, #fff7f7, #fff1f2)',
        boxShadow: '0 8px 18px rgba(225, 11, 11, 0.15)',
    },
    periodRadio: { position: 'absolute', opacity: 0, pointerEvents: 'none' },
    periodLabel: { fontWeight: '800', fontSize: '15px', marginBottom: '6px', color: '#1f2937' },
    periodRate: { fontSize: '13px', color: '#e10b0b', fontWeight: '700' },
    periodRateHint: { fontSize: '12px', color: '#9ca3af', fontStyle: 'italic' },
    vehicleGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' },
    vehicleCard: {
        position: 'relative', border: '1px solid #e5e7eb', borderRadius: '14px',
        padding: '12px', cursor: 'pointer', background: '#fff',
        transition: 'all 0.2s', minHeight: '106px', display: 'block',
    },
    vehicleCardSelected: {
        border: '2px solid #e10b0b', background: '#fff7f7',
        boxShadow: '0 8px 18px rgba(225, 11, 11, 0.15)',
    },
    vehicleRadio: { position: 'absolute', opacity: 0, pointerEvents: 'none' },
    vehicleName: { fontWeight: '800', fontSize: '15px', marginBottom: '5px', color: '#1f2937' },
    vehicleRates: { fontSize: '12px', color: '#4b5563', lineHeight: '1.45' },
    vehicleRatesHighlight: {
        background: 'rgba(255, 107, 53, 0.08)', padding: '6px 8px',
        borderRadius: '6px', fontSize: '12px', color: '#a80f0f', lineHeight: '1.4',
    },
    estimateCard: {
        background: 'linear-gradient(135deg, #fff7ed, #fff1f2)',
        border: '1px solid #fed7aa', borderRadius: '16px', padding: '18px',
    },
    estimateTitle: { margin: '0 0 12px', fontSize: '16px', color: '#9f1239', fontWeight: '700' },
    estimateRow: { display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '8px 0', fontSize: '14px', flexWrap: 'wrap' },
    estimateLabel: { color: '#6b7280', fontWeight: '500' },
    estimateValue: { color: '#1f2937', fontWeight: '700', textAlign: 'right' },
    estimateTotal: { borderTop: '1px solid #fed7aa', marginTop: '6px', paddingTop: '12px' },
    estimateValueHighlight: { color: '#e10b0b', fontWeight: '800', fontSize: '16px', textAlign: 'right' },
    navigation: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '12px' },
    prevBtn: {
        padding: '12px 24px', background: '#e5e7eb', border: 'none',
        borderRadius: '12px', fontWeight: '700', fontSize: '16px',
        cursor: 'pointer', transition: 'background 0.2s', color: '#1f2328',
    },
    nextBtn: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #b70000, #e10b0b, #ff5a1f)',
        border: 'none', borderRadius: '12px', fontWeight: '700',
        fontSize: '16px', cursor: 'pointer', color: '#fff',
        transition: 'opacity 0.2s', marginLeft: 'auto',
        boxShadow: '0 4px 14px rgba(225, 11, 11, 0.3)',
    },
    submitBtn: {
        padding: '14px 32px',
        background: 'linear-gradient(135deg, #b70000, #e10b0b, #ff5a1f)',
        border: 'none', borderRadius: '12px', fontWeight: '800',
        fontSize: '16px', cursor: 'pointer', color: '#fff',
        transition: 'opacity 0.2s', marginLeft: 'auto',
        boxShadow: '0 4px 14px rgba(225, 11, 11, 0.35)',
    },
    submitBtnDisabled: { opacity: '0.5', cursor: 'not-allowed', boxShadow: 'none' },
    contactInfo: {
        textAlign: 'center', fontWeight: 'bold', margin: '16px 0 4px',
        fontSize: '14px', color: '#667085', padding: '0 8px', wordBreak: 'break-word',
    },
    reviewContainer: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' },
    reviewBanner: {
        display: 'flex', alignItems: 'center', gap: '16px',
        background: 'linear-gradient(135deg, #e10b0b, #ff5a1f, #ff9a1f)',
        color: '#fff', padding: '20px 24px', borderRadius: '14px',
        boxShadow: '0 6px 20px rgba(225, 11, 11, 0.3)', flexWrap: 'wrap',
    },
    reviewBannerIcon: {
        width: '48px', height: '48px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', fontWeight: 'bold', flexShrink: 0,
    },
    reviewBannerTitle: { margin: '0 0 4px', fontSize: '18px', fontWeight: '700' },
    reviewBannerText: { margin: '0', fontSize: '14px', opacity: 0.95, lineHeight: '1.4' },
    reviewCard: {
        background: '#fff', borderRadius: '14px', border: '1px solid #e9ecef',
        overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    },
    reviewCardHeader: {
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '14px 18px',
        background: 'linear-gradient(90deg, #fff8f3 0%, #fff 100%)',
        borderBottom: '2px solid #e10b0b',
    },
    reviewCardIcon: { fontSize: '20px' },
    reviewCardTitle: { margin: 0, fontSize: '16px', fontWeight: '700', color: '#a80f0f' },
    reviewCardBody: { padding: '16px 18px' },
    reviewRow: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '10px 0', borderBottom: '1px dashed #f1f3f5',
        fontSize: '14px', gap: '12px', flexWrap: 'wrap',
    },
    reviewLabel: { color: '#667085', fontWeight: '600', flexShrink: 0 },
    reviewValue: {
        color: '#1f2328', fontWeight: '500', textAlign: 'right',
        wordBreak: 'break-word', maxWidth: '100%',
    },
    reviewValueHighlight: { color: '#e10b0b', fontWeight: '700', textAlign: 'right' },
    reviewTotalRow: {
        borderTop: '2px solid #fed7aa', borderBottom: 'none',
        marginTop: '6px', paddingTop: '12px',
    },
    reviewTotalValue: { color: '#e10b0b', fontWeight: '800', fontSize: '16px', textAlign: 'right' },
    docPreviewGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' },
    docPreviewItem: {
        background: '#f8f9fa', borderRadius: '10px',
        padding: '12px', border: '1px solid #e9ecef',
    },
    docPreviewLabel: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '10px', fontSize: '13px', fontWeight: '600',
        color: '#1f2328', gap: '8px', flexWrap: 'wrap',
    },
    docStatusOk: { color: '#10b981', fontSize: '12px', fontWeight: '700' },
    docStatusMissing: { color: '#ef4444', fontSize: '12px', fontWeight: '700' },
    docPreviewImage: {
        width: '100%', height: '160px', objectFit: 'cover',
        borderRadius: '8px', border: '1px solid #e9ecef', background: '#fff',
    },
    docPreviewFile: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '160px', background: '#fff',
        borderRadius: '8px', border: '2px dashed #d9dee7',
        padding: '16px', textAlign: 'center',
    },
    docPreviewFileIcon: { fontSize: '40px', marginBottom: '8px' },
    docPreviewFileName: {
        fontSize: '12px', color: '#667085',
        wordBreak: 'break-all', lineHeight: '1.4',
    },
    docPreviewEmpty: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '160px', background: '#fff', borderRadius: '8px',
        border: '2px dashed #e9ecef', color: '#adb5bd', fontSize: '13px',
    },
    consentBox: {
        display: 'flex', gap: '12px', alignItems: 'flex-start',
        background: '#f8f9fa', padding: '14px', borderRadius: '10px',
        border: '1px solid #e9ecef', flexWrap: 'wrap',
        width: '100%', boxSizing: 'border-box',
    },
    consentCheckbox: {
        width: '20px',
        height: '20px',
        minWidth: '20px',
        minHeight: '20px',
        maxWidth: '20px',
        maxHeight: '20px',
        marginTop: '2px',
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        padding: 0,
        cursor: 'pointer',
        accentColor: '#e10b0b',
        flexShrink: 0,
        appearance: 'auto' as any,
        WebkitAppearance: 'checkbox' as any,
        MozAppearance: 'checkbox' as any,
        border: '2px solid #d9dee7',
        borderRadius: '4px',
        background: '#fff',
        boxSizing: 'border-box',
    },
    consentLabel: {
        fontWeight: '500', fontSize: '14px', lineHeight: '1.5',
        cursor: 'pointer', color: '#1f2328', flex: 1, minWidth: 0,
        wordBreak: 'break-word', overflowWrap: 'anywhere', textAlign: 'left',
    },
    reviewNote: {
        display: 'flex', gap: '12px', alignItems: 'flex-start',
        background: '#f0f9ff', border: '1px solid #bae6fd',
        borderRadius: '10px', padding: '14px 16px',
    },
    reviewNoteIcon: { fontSize: '18px', flexShrink: 0, lineHeight: 1.4 },
    reviewNoteText: { margin: 0, fontSize: '13px', color: '#0c4a6e', lineHeight: '1.5' },
    reviewNoteLink: { color: '#e10b0b', fontWeight: '600', textDecoration: 'underline' },
};

export default BookingForm;