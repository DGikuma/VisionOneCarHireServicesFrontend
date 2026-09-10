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

// API base URL from environment variables or default
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

// Default country from environment or fallback to Kenya (ke)
const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY || 'ke';

interface BookingFormData {
    // Client details (Step 1)
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
    idNumber: string;      
    idType: 'id' | 'passport';  
    // Rental details (Step 2)
    vehicle: string;
    pickupDate: string;
    returnDate: string;
    pickupLocation: string;
    deliveryAddress: string;
    notes: string;
    // Documents (Step 3)
    drivingLicense: FileList;
    idDocument: FileList;
    // Consent (Step 4)
    consent: boolean;
    accuracy: boolean;
}

// ✅ Exported so BookingPage can use it
export interface BookingFormRef {
    validateStep: () => Promise<boolean>;
    resetForm: () => void;
}

// ✅ Updated props to match what BookingPage passes
export interface BookingFormProps {
    activeStep: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    onComplete?: () => void;
}

const API_URL = `${API_BASE_URL}/api/bookings`;

// ✅ Updated: Vehicle options with rates matching HTML form
const vehicleOptions = [
    {
        value: 'Fielder',
        label: 'Fielder',
        rates: { r1: 4000, r2: 3500, r3: 3000 },
        displayRates: '1–7 days: KES 4,000/day\n7–20 days: KES 3,500/day\n20+ days: KES 3,000/day'
    },
    {
        value: 'Mazda CX-5',
        label: 'Mazda CX-5',
        rates: { r1: 7000, r2: 6500, r3: 6000 },
        displayRates: '1–7 days: KES 7,000/day\n7–20 days: KES 6,500/day\n20+ days: KES 6,000/day'
    },
    {
        value: 'Harrier',
        label: 'Harrier',
        rates: { r1: 8000, r2: 7500, r3: 7000 },
        displayRates: '1–7 days: KES 8,000/day\n7–20 days: KES 7,500/day\n20+ days: KES 7,000/day'
    },
    {
        value: 'Lexus',
        label: 'Lexus',
        rates: { r1: 9000, r2: 8500, r3: 8000 },
        displayRates: '1–7 days: KES 9,000/day\n7–20 days: KES 8,500/day\n20+ days: KES 8,000/day'
    },
    {
        value: 'Prado',
        label: 'Prado',
        rates: { r1: 12000, r2: 11000, r3: 10000 },
        displayRates: '1–7 days: KES 12,000/day\n7–20 days: KES 11,000/day\n20+ days: KES 10,000/day'
    },
];

// ✅ Pickup locations matching HTML form
const pickupLocations = [
    'Nairobi',
    'Jomo Kenyatta International Airport',
    'Wilson Airport',
    'Other / delivery requested',
];

// Define which fields belong to each step (UPDATED)
const stepFields: Record<number, (keyof BookingFormData)[]> = {
    1: ['fullName', 'email', 'phone', 'nationality', 'idNumber', 'idType'],
    2: ['vehicle', 'pickupDate', 'returnDate', 'pickupLocation', 'deliveryAddress', 'notes'],
    3: ['drivingLicense', 'idDocument'],
    4: [],
};

// List of all required fields (for submit button enablement) - UPDATED
const allRequiredFields: (keyof BookingFormData)[] = [
    'fullName', 'email', 'phone', 'idNumber', 'idType',
    'vehicle', 'pickupDate', 'returnDate', 'pickupLocation',
    'drivingLicense', 'idDocument', 'consent'
];

const BookingForm = forwardRef<BookingFormRef, BookingFormProps>(
    ({ activeStep, onNextStep, onPrevStep, onComplete }, ref) => {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [confirmed, setConfirmed] = useState(false);
        const [, setBookingData] = useState<any>(null);
        const formRef = useRef<HTMLFormElement>(null);
        const [phoneValue, setPhoneValue] = useState('');
        const [previewUrls, setPreviewUrls] = useState<{ drivingLicense: string | null; idDocument: string | null }>({
            drivingLicense: null,
            idDocument: null,
        });

        // ✅ Estimate calculation state
        const [estimate, setEstimate] = useState<{
            days: number | null;
            rate: number | null;
            total: number | null;
            error: string | null;
        }>({ days: null, rate: null, total: null, error: null });

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

        // Watch all required fields to determine if form is complete
        const watchedValues = watch();

        // Check if all required fields are filled
        const isFormComplete = allRequiredFields.every(field => {
            const value = watchedValues[field];
            if (field === 'drivingLicense' || field === 'idDocument') {
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

        // Set min dates for pickup and return
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        const todayStr = today.toISOString().slice(0, 10);

        // Update return date min when pickup changes
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

        // ✅ Calculate estimate when dates or vehicle change
        useEffect(() => {
            const newEstimate = { days: null as number | null, rate: null as number | null, total: null as number | null, error: null as string | null };

            if (!pickupDate || !returnDate || !vehicle) {
                setEstimate(newEstimate);
                return;
            }

            const p = new Date(pickupDate + 'T00:00:00');
            const d = new Date(returnDate + 'T00:00:00');
            const days = Math.ceil((d.getTime() - p.getTime()) / (1000 * 60 * 60 * 24));

            if (days <= 0) {
                setEstimate({ days: null, rate: null, total: null, error: 'Invalid dates' });
                return;
            }

            const selectedVehicle = vehicleOptions.find(v => v.value === vehicle);
            if (!selectedVehicle) {
                setEstimate(newEstimate);
                return;
            }

            let rate: number;
            if (days <= 7) rate = selectedVehicle.rates.r1;
            else if (days <= 20) rate = selectedVehicle.rates.r2;
            else rate = selectedVehicle.rates.r3;

            setEstimate({
                days,
                rate,
                total: rate * days,
                error: null,
            });
        }, [pickupDate, returnDate, vehicle]);

        // Generate preview URLs when files change
        useEffect(() => {
            const urls: { drivingLicense: string | null; idDocument: string | null } = {
                drivingLicense: null,
                idDocument: null,
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

            setPreviewUrls(urls);

            return () => {
                if (urls.drivingLicense) URL.revokeObjectURL(urls.drivingLicense);
                if (urls.idDocument) URL.revokeObjectURL(urls.idDocument);
            };
        }, [drivingLicenseFile, idDocumentFile]);

        // Validate file size and type
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

        // ------------------------------------------------
        // Expose methods to the parent via ref
        // ------------------------------------------------
        useImperativeHandle(ref, () => ({
            validateStep: async () => {
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
                setPreviewUrls({ drivingLicense: null, idDocument: null });
                setEstimate({ days: null, rate: null, total: null, error: null });
                toast.info('Form has been reset.');
            },
        }));

        // ------------------------------------------------
        // Form submission
        // ------------------------------------------------
        const onSubmit = async (data: BookingFormData) => {
            const dlFile = data.drivingLicense?.[0];
            const idFile = data.idDocument?.[0];

            if (!dlFile) {
                toast.error('Please upload your driving licence');
                return;
            }
            if (!idFile) {
                toast.error('Please upload your ID or passport');
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
                mappedData.append('idNumber', '');
                mappedData.append('idType', 'id');
                mappedData.append('termsAccepted', 'true');
                mappedData.append('drivingLicense', dlFile);
                mappedData.append('idDocument', idFile);

                const response = await axios.post(API_URL, mappedData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 30000,
                });

                if (response.status === 201) {
                    setBookingData(response.data.booking);
                    setConfirmed(true);
                    toast.success('✅ Booking confirmed! Check your email for the confirmation.');
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

        // ------------------------------------------------
        // Sub-components
        // ------------------------------------------------
        const HeroSection = () => (
            <div className="hero-section" style={styles.hero}>
                <div style={styles.heroLogo}>
                    <img
                        src="/assets/images/logo.png"
                        alt="Vision One Services Logo"
                        style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                    />
                </div>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>Vehicle Booking Form</h1>
                    <p style={styles.heroSubtitle}>
                        Complete the details below and attach the required identification documents.
                    </p>
                    <span style={styles.heroPill}>Special Offer Rates</span>
                </div>
            </div>
        );

        // ✅ Vehicle Selector Cards (matching HTML form)
        const VehicleSelector = () => (
            <div style={styles.vehicleGrid}>
                {vehicleOptions.map((option) => (
                    <label
                        key={option.value}
                        style={{
                            ...styles.vehicleCard,
                            ...(vehicle === option.value ? styles.vehicleCardSelected : {}),
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
                            {option.displayRates.split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    </label>
                ))}
            </div>
        );

        // ✅ Booking Estimate Component
        const BookingEstimate = () => {
            const formatNumber = (num: number) => num.toLocaleString('en-KE');

            return (
                <div style={styles.estimateCard}>
                    <h4 style={styles.estimateTitle}>📊 Booking Estimate</h4>
                    <div style={styles.estimateRow}>
                        <span style={styles.estimateLabel}>Vehicle</span>
                        <strong style={styles.estimateValue}>{vehicle || '—'}</strong>
                    </div>
                    <div style={styles.estimateRow}>
                        <span style={styles.estimateLabel}>Rental period</span>
                        <strong style={styles.estimateValue}>
                            {estimate.error
                                ? estimate.error
                                : estimate.days
                                    ? `${estimate.days} day${estimate.days === 1 ? '' : 's'}`
                                    : '—'}
                        </strong>
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
                </div>
            );
        };

        // Navigation buttons
        const NavigationButtons = ({ showSubmit = false }) => (
            <div style={styles.navigation}>
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
                        {isSubmitting ? 'Submitting…' : confirmed ? '✓ Booking Confirmed' : 'Submit Booking Request'}
                    </button>
                )}
            </div>
        );

        // ✅ Review Summary (used in Step 4)
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
            const formatNumber = (num: number) => num.toLocaleString('en-KE');

            return (
                <div style={styles.reviewContainer}>
                    {/* Success Banner */}
                    <div style={styles.reviewBanner}>
                        <div style={styles.reviewBannerIcon}>✓</div>
                        <div>
                            <h3 style={styles.reviewBannerTitle}>Almost There!</h3>
                            <p style={styles.reviewBannerText}>Review your details below before submitting your booking.</p>
                        </div>
                    </div>

                    {/* Client Details Card */}
                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>👤</span>
                            <h4 style={styles.reviewCardTitle}>Your Details</h4>
                        </div>
                        <div style={styles.reviewCardBody}>
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

                    {/* Rental Details Card */}
                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>🚗</span>
                            <h4 style={styles.reviewCardTitle}>Rental Details</h4>
                        </div>
                        <div style={styles.reviewCardBody}>
                            <div style={styles.reviewRow}>
                                <span style={styles.reviewLabel}>Vehicle</span>
                                <span style={styles.reviewValue}>{v.vehicle || '—'}</span>
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

                    {/* Estimate Card */}
                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>💰</span>
                            <h4 style={styles.reviewCardTitle}>Booking Estimate</h4>
                        </div>
                        <div style={styles.reviewCardBody}>
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

                    {/* Document Previews Card */}
                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>📎</span>
                            <h4 style={styles.reviewCardTitle}>Uploaded Documents</h4>
                        </div>
                        <div style={styles.reviewCardBody}>
                            <div style={styles.docPreviewGrid}>
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
                            </div>
                        </div>
                    </div>

                    {/* Consent Card */}
                    <div style={styles.reviewCard}>
                        <div style={styles.reviewCardHeader}>
                            <span style={styles.reviewCardIcon}>✅</span>
                            <h4 style={styles.reviewCardTitle}>Declaration</h4>
                        </div>
                        <div style={styles.reviewCardBody}>
                            <div style={styles.consentBox}>
                                <input
                                    id="consent"
                                    type="checkbox"
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

                    {/* Info Note */}
                    <div style={styles.reviewNote}>
                        <span style={styles.reviewNoteIcon}>ℹ️</span>
                        <p style={styles.reviewNoteText}>
                            By clicking <strong>Submit Booking Request</strong>, you agree to our{' '}
                            <a href="/terms" style={styles.reviewNoteLink}>Terms & Conditions</a> and{' '}
                            <a href="/privacy" style={styles.reviewNoteLink}>Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            );
        };

        // Render content based on activeStep
        const renderStepContent = () => {
            switch (activeStep) {
                // STEP 1: Your Details (matches HTML form step 1)
                case 1:
                    return (
                        <>
                            <section className="card" style={styles.card}>
                                <h2 style={styles.cardTitle}>Your details</h2>
                                <p style={styles.cardSubtitle}>Enter the primary driver's contact and identification information.</p>
                                <div style={styles.grid2}>
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
                                    {/* ✅ NEW: ID Type */}
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
                                    {/* ✅ NEW: ID Number */}
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

                // STEP 2: Rental Details (matches HTML form step 2)
                case 2:
                    return (
                        <>
                            <section className="card" style={styles.card}>
                                <h2 style={styles.cardTitle}>Rental details</h2>
                                <p style={styles.cardSubtitle}>Select dates and the vehicle you would like to book.</p>
                                <div style={styles.grid3}>
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

                                <div style={{ marginTop: '18px' }}>
                                    <label style={styles.label}>
                                        Vehicle <span style={styles.required}>*</span>
                                    </label>
                                    <VehicleSelector />
                                    {errors.vehicle && <p style={styles.errorText}>{errors.vehicle.message}</p>}
                                </div>

                                <div style={{ ...styles.grid2, marginTop: '18px' }}>
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

                                {/* Live Estimate */}
                                <div style={{ marginTop: '20px' }}>
                                    <BookingEstimate />
                                </div>
                            </section>
                            <NavigationButtons />
                        </>
                    );

                // STEP 3: Upload Documents (matches HTML form step 3)
                case 3:
                    return (
                        <>
                            <section className="card" style={styles.card}>
                                <h2 style={styles.cardTitle}>Upload documents</h2>
                                <p style={styles.cardSubtitle}>
                                    Upload a clear copy or photo of the primary driver's ID/passport and valid driving licence.
                                </p>
                                <div style={styles.noteBox}>
                                    Both documents are required. On most phones, tap <strong>Choose File</strong> and select the camera
                                    to photograph the document. Make sure the whole document is visible and readable.
                                </div>
                                <div style={{ ...styles.grid2, marginTop: '16px' }}>
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
                                </div>
                            </section>
                            <NavigationButtons />
                        </>
                    );

                // STEP 4: Review & Submit (matches HTML form step 4)
                case 4:
                    return (
                        <>
                            <section className="card" style={styles.card}>
                                <h2 style={styles.cardTitle}>Review & Submit</h2>
                                <p style={styles.cardSubtitle}>
                                    The estimate below is based on your selected dates and vehicle. Review everything before submitting.
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
            <div style={styles.container}>
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
    },
    heroContent: {
        flex: 1,
    },
    heroTitle: {
        margin: '0 0 8px',
        fontSize: 'clamp(26px, 5vw, 42px)',
        color: '#fff',
    },
    heroSubtitle: {
        margin: '0',
        color: 'rgba(255,255,255,0.95)',
        lineHeight: '1.5',
    },
    heroPill: {
        display: 'inline-block',
        marginTop: '10px',
        background: '#e6007e',
        color: 'white',
        fontWeight: 'bold',
        padding: '7px 14px',
        borderRadius: '999px',
        fontSize: '14px',
        boxShadow: '0 6px 16px rgba(230, 0, 126, 0.35)',
    },
    form: {
        marginTop: '18px',
    },
    card: {
        background: 'white',
        borderRadius: '18px',
        padding: '22px',
        margin: '18px 0',
        boxShadow: '0 7px 24px rgba(0,0,0,0.07)',
    },
    cardTitle: {
        margin: '0 0 6px',
        color: '#a80f0f',
        fontSize: '22px',
        fontWeight: 'bold',
    },
    cardSubtitle: {
        margin: '0 0 18px',
        color: '#6b7280',
        fontSize: '14px',
    },
    grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
    },
    grid3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
    },
    fullWidth: {
        gridColumn: '1 / -1',
    },
    label: {
        display: 'block',
        fontWeight: '700',
        marginBottom: '7px',
        fontSize: '14px',
    },
    required: {
        color: '#c40000',
    },
    input: {
        width: '100%',
        padding: '13px',
        border: '1px solid #d9dee7',
        borderRadius: '12px',
        font: 'inherit',
        background: '#fff',
        fontSize: '14px',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    select: {
        width: '100%',
        padding: '13px',
        border: '1px solid #d9dee7',
        borderRadius: '12px',
        font: 'inherit',
        background: '#fff',
        fontSize: '14px',
        boxSizing: 'border-box',
        outline: 'none',
    },
    textarea: {
        width: '100%',
        padding: '13px',
        border: '1px solid #d9dee7',
        borderRadius: '12px',
        font: 'inherit',
        background: '#fff',
        fontSize: '14px',
        resize: 'vertical',
        boxSizing: 'border-box',
        minHeight: '90px',
    },
    fileInput: {
        width: '100%',
        padding: '10px 0',
        fontSize: '14px',
        boxSizing: 'border-box',
    },
    helpText: {
        fontSize: '13px',
        color: '#667085',
        marginTop: '6px',
        lineHeight: '1.45',
    },
    errorText: {
        color: '#c40000',
        fontSize: '13px',
        marginTop: '5px',
    },
    noteBox: {
        background: '#fff4dc',
        borderLeft: '4px solid #ffb31a',
        padding: '12px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        lineHeight: '1.5',
    },

    // ✅ Vehicle selector cards
    vehicleGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
    },
    vehicleCard: {
        position: 'relative',
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        padding: '12px',
        cursor: 'pointer',
        background: '#fff',
        transition: 'all 0.2s',
        minHeight: '106px',
        display: 'block',
    },
    vehicleCardSelected: {
        border: '2px solid #e10b0b',
        background: '#fff7f7',
        boxShadow: '0 8px 18px rgba(225, 11, 11, 0.15)',
    },
    vehicleRadio: {
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
    },
    vehicleName: {
        fontWeight: '800',
        fontSize: '15px',
        marginBottom: '5px',
        color: '#1f2937',
    },
    vehicleRates: {
        fontSize: '12px',
        color: '#4b5563',
        lineHeight: '1.45',
    },

    // ✅ Estimate card
    estimateCard: {
        background: 'linear-gradient(135deg, #fff7ed, #fff1f2)',
        border: '1px solid #fed7aa',
        borderRadius: '16px',
        padding: '18px',
    },
    estimateTitle: {
        margin: '0 0 12px',
        fontSize: '16px',
        color: '#9f1239',
        fontWeight: '700',
    },
    estimateRow: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        padding: '8px 0',
        fontSize: '14px',
    },
    estimateLabel: {
        color: '#6b7280',
        fontWeight: '500',
    },
    estimateValue: {
        color: '#1f2937',
        fontWeight: '700',
        textAlign: 'right',
    },
    estimateTotal: {
        borderTop: '1px solid #fed7aa',
        marginTop: '6px',
        paddingTop: '12px',
    },
    estimateValueHighlight: {
        color: '#e10b0b',
        fontWeight: '800',
        fontSize: '16px',
        textAlign: 'right',
    },

    // Navigation
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        gap: '12px',
    },
    prevBtn: {
        padding: '12px 24px',
        background: '#e5e7eb',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '700',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        color: '#1f2328',
    },
    nextBtn: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #b70000, #e10b0b, #ff5a1f)',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '700',
        fontSize: '16px',
        cursor: 'pointer',
        color: '#fff',
        transition: 'opacity 0.2s',
        marginLeft: 'auto',
        boxShadow: '0 4px 14px rgba(225, 11, 11, 0.3)',
    },
    submitBtn: {
        padding: '14px 32px',
        background: 'linear-gradient(135deg, #b70000, #e10b0b, #ff5a1f)',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '800',
        fontSize: '16px',
        cursor: 'pointer',
        color: '#fff',
        transition: 'opacity 0.2s',
        marginLeft: 'auto',
        boxShadow: '0 4px 14px rgba(225, 11, 11, 0.35)',
    },
    submitBtnDisabled: {
        opacity: '0.5',
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    contactInfo: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '16px 0 4px',
        fontSize: '14px',
        color: '#667085',
    },

    // Review styles
    reviewContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '8px',
    },
    reviewBanner: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: 'linear-gradient(135deg, #e10b0b, #ff5a1f, #ff9a1f)',
        color: '#fff',
        padding: '20px 24px',
        borderRadius: '14px',
        boxShadow: '0 6px 20px rgba(225, 11, 11, 0.3)',
    },
    reviewBannerIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        flexShrink: 0,
    },
    reviewBannerTitle: {
        margin: '0 0 4px',
        fontSize: '18px',
        fontWeight: '700',
    },
    reviewBannerText: {
        margin: '0',
        fontSize: '14px',
        opacity: 0.95,
        lineHeight: '1.4',
    },
    reviewCard: {
        background: '#fff',
        borderRadius: '14px',
        border: '1px solid #e9ecef',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    },
    reviewCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 18px',
        background: 'linear-gradient(90deg, #fff8f3 0%, #fff 100%)',
        borderBottom: '2px solid #e10b0b',
    },
    reviewCardIcon: {
        fontSize: '20px',
    },
    reviewCardTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '700',
        color: '#a80f0f',
    },
    reviewCardBody: {
        padding: '16px 18px',
    },
    reviewRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '10px 0',
        borderBottom: '1px dashed #f1f3f5',
        fontSize: '14px',
        gap: '16px',
    },
    reviewLabel: {
        color: '#667085',
        fontWeight: '600',
        flexShrink: 0,
    },
    reviewValue: {
        color: '#1f2328',
        fontWeight: '500',
        textAlign: 'right',
        wordBreak: 'break-word',
    },
    reviewValueHighlight: {
        color: '#e10b0b',
        fontWeight: '700',
        textAlign: 'right',
    },
    reviewTotalRow: {
        borderTop: '2px solid #fed7aa',
        borderBottom: 'none',
        marginTop: '6px',
        paddingTop: '12px',
    },
    reviewTotalValue: {
        color: '#e10b0b',
        fontWeight: '800',
        fontSize: '16px',
        textAlign: 'right',
    },
    docPreviewGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
    },
    docPreviewItem: {
        background: '#f8f9fa',
        borderRadius: '10px',
        padding: '12px',
        border: '1px solid #e9ecef',
    },
    docPreviewLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#1f2328',
        gap: '8px',
        flexWrap: 'wrap',
    },
    docStatusOk: {
        color: '#10b981',
        fontSize: '12px',
        fontWeight: '700',
    },
    docStatusMissing: {
        color: '#ef4444',
        fontSize: '12px',
        fontWeight: '700',
    },
    docPreviewImage: {
        width: '100%',
        height: '160px',
        objectFit: 'cover',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
        background: '#fff',
    },
    docPreviewFile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '160px',
        background: '#fff',
        borderRadius: '8px',
        border: '2px dashed #d9dee7',
        padding: '16px',
        textAlign: 'center',
    },
    docPreviewFileIcon: {
        fontSize: '40px',
        marginBottom: '8px',
    },
    docPreviewFileName: {
        fontSize: '12px',
        color: '#667085',
        wordBreak: 'break-all',
        lineHeight: '1.4',
    },
    docPreviewEmpty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '160px',
        background: '#fff',
        borderRadius: '8px',
        border: '2px dashed #e9ecef',
        color: '#adb5bd',
        fontSize: '13px',
    },
    consentBox: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        background: '#f8f9fa',
        padding: '14px',
        borderRadius: '10px',
        border: '1px solid #e9ecef',
    },
    consentCheckbox: {
        width: '20px',
        height: '20px',
        minWidth: '20px',
        minHeight: '20px',
        marginTop: '2px',
        cursor: 'pointer',
        accentColor: '#e10b0b',
        flexShrink: 0,
    },
    consentLabel: {
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '1.5',
        cursor: 'pointer',
        color: '#1f2328',
    },
    reviewNote: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '10px',
        padding: '14px 16px',
    },
    reviewNoteIcon: {
        fontSize: '18px',
        flexShrink: 0,
        lineHeight: 1.4,
    },
    reviewNoteText: {
        margin: 0,
        fontSize: '13px',
        color: '#0c4a6e',
        lineHeight: '1.5',
    },
    reviewNoteLink: {
        color: '#e10b0b',
        fontWeight: '600',
        textDecoration: 'underline',
    },
};

export default BookingForm;