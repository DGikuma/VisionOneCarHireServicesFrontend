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
    fullName: string;
    email: string;
    phone: string;
    address: string;
    vehicle: string;
    pickupLocation: string;
    pickupDate: string;
    returnDate: string;
    pickupTime: string;
    returnLocation: string;
    notes: string;
    drivingLicense: FileList;
    idDocument: FileList;
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

const vehicleOptions = [
    { value: 'Fielder', label: 'Fielder' },
    { value: 'Mazda CX5', label: 'Mazda CX5' },
    { value: 'Harrier', label: 'Harrier' },
    { value: 'Lexus', label: 'Lexus' },
    { value: 'Prado', label: 'Prado' },
];

// Special offer rates data
const ratesData = [
    {
        name: 'Fielder',
        rates: [
            { label: '1–7 days', price: '4,000/=' },
            { label: '7–20 days', price: '3,500/=' },
            { label: '20+ days', price: '3,000/=' },
        ],
    },
    {
        name: 'Mazda CX5',
        rates: [
            { label: '1–7 days', price: '7,000/=' },
            { label: '7–20 days', price: '6,500/=' },
            { label: '20+ days', price: '6,000/=' },
        ],
    },
    {
        name: 'Harrier',
        rates: [
            { label: '1–7 days', price: '8,000/=' },
            { label: '7–20 days', price: '7,500/=' },
            { label: '20+ days', price: '7,000/=' },
        ],
    },
    {
        name: 'Lexus',
        rates: [
            { label: '1–7 days', price: '9,000/=' },
            { label: '7–20 days', price: '8,500/=' },
            { label: '20+ days', price: '8,000/=' },
        ],
    },
    {
        name: 'Prado',
        rates: [
            { label: '1–7 days', price: '12,000/=' },
            { label: '7–20 days', price: '11,000/=' },
            { label: '20+ days', price: '10,000/=' },
        ],
    },
];

// Define which fields belong to each step
const stepFields: Record<number, (keyof BookingFormData)[]> = {
    1: ['vehicle', 'pickupLocation', 'pickupDate', 'returnDate', 'pickupTime', 'returnLocation'],
    2: ['fullName', 'email', 'phone', 'address', 'consent', 'accuracy'],
    3: ['drivingLicense', 'idDocument'],
    4: [],
};

// List of all required fields (for submit button enablement)
const allRequiredFields: (keyof BookingFormData)[] = [
    'vehicle', 'pickupLocation', 'pickupDate', 'returnDate',
    'fullName', 'email', 'phone',
    'drivingLicense', 'idDocument', 'consent', 'accuracy'
];

const BookingForm = forwardRef<BookingFormRef, BookingFormProps>(
    ({ activeStep, onNextStep, onPrevStep, onComplete }, ref) => {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [confirmed, setConfirmed] = useState(false);
        const [, setBookingData] = useState<any>(null);
        const formRef = useRef<HTMLFormElement>(null);
        const [phoneValue, setPhoneValue] = useState('');

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
                address: '',
                vehicle: '',
                pickupLocation: '',
                pickupDate: '',
                returnDate: '',
                pickupTime: '',
                returnLocation: '',
                notes: '',
            },
            mode: 'onChange',
        });

        const pickupDate = watch('pickupDate');
        const returnDate = watch('returnDate');

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
                const formData = new FormData();

                // Add all form fields with phone value from phone input
                Object.entries(data).forEach(([key, value]) => {
                    if (key === 'drivingLicense' || key === 'idDocument') {
                        return;
                    }
                    if (key === 'phone') {
                        // Use the phoneValue from react-phone-input
                        formData.append(key, phoneValue);
                        return;
                    }
                    if (value !== undefined && value !== null) {
                        formData.append(key, value.toString());
                    }
                });

                formData.append('drivingLicense', dlFile);
                formData.append('idDocument', idFile);

                const mappedData = new FormData();
                mappedData.append('customerName', data.fullName);
                mappedData.append('email', data.email);
                mappedData.append('phone', phoneValue);
                mappedData.append('pickupDate', data.pickupDate);
                mappedData.append('returnDate', data.returnDate);
                mappedData.append('carType', data.vehicle);
                mappedData.append('pickupLocation', data.pickupLocation);
                mappedData.append('dropoffLocation', data.returnLocation || data.pickupLocation);
                mappedData.append('additionalInfo', data.notes || '');
                mappedData.append('idNumber', '');
                mappedData.append('idType', 'id');
                mappedData.append('termsAccepted', 'true');
                mappedData.append('drivingLicense', dlFile);
                mappedData.append('idDocument', idFile);
                const dummyBlob = new Blob(['dummy'], { type: 'text/plain' });
                const dummyFile = new File([dummyBlob], 'dummy.txt', { type: 'text/plain' });
                mappedData.append('depositProof', dummyFile);

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
        // Sub-components for each step
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

        const RatesSection = () => (
            <div className="card" style={styles.card}>
                <h2 style={styles.cardTitle}>Special offer rates</h2>
                <div style={styles.ratesGrid}>
                    {ratesData.map((item) => (
                        <div key={item.name} style={styles.rateCard}>
                            <div style={styles.rateHeader}>{item.name}</div>
                            <div style={styles.rateBody}>
                                {item.rates.map((r, idx) => (
                                    <div key={idx} style={styles.rateRow}>
                                        <span>{r.label}</span>
                                        <span style={styles.ratePrice}>{r.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

        // Summary component for step 4
        const BookingSummary = () => {
            const v = watchedValues;
            const formatDate = (dateStr: string) => {
                if (!dateStr) return 'Not provided';
                const d = new Date(dateStr);
                return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            };
            const getFileName = (fileList: FileList) => {
                if (!fileList || fileList.length === 0) return 'Not uploaded';
                return fileList[0].name;
            };

            return (
                <div style={styles.summaryGrid}>
                    <div style={styles.summarySection}>
                        <h4 style={styles.summaryTitle}>📋 Booking Details</h4>
                        <div style={styles.summaryRow}><span>Vehicle:</span><span>{v.vehicle || '—'}</span></div>
                        <div style={styles.summaryRow}><span>Pickup Location:</span><span>{v.pickupLocation || '—'}</span></div>
                        <div style={styles.summaryRow}><span>Pickup Date:</span><span>{formatDate(v.pickupDate)}</span></div>
                        <div style={styles.summaryRow}><span>Return Date:</span><span>{formatDate(v.returnDate)}</span></div>
                        <div style={styles.summaryRow}><span>Pickup Time:</span><span>{v.pickupTime || 'Not specified'}</span></div>
                        <div style={styles.summaryRow}><span>Return Location:</span><span>{v.returnLocation || 'Same as pickup'}</span></div>
                        {v.notes && <div style={styles.summaryRow}><span>Notes:</span><span>{v.notes}</span></div>}
                    </div>

                    <div style={styles.summarySection}>
                        <h4 style={styles.summaryTitle}>👤 Client Details</h4>
                        <div style={styles.summaryRow}><span>Full Name:</span><span>{v.fullName || '—'}</span></div>
                        <div style={styles.summaryRow}><span>Email:</span><span>{v.email || '—'}</span></div>
                        <div style={styles.summaryRow}><span>Phone:</span><span>{phoneValue || '—'}</span></div>
                        <div style={styles.summaryRow}><span>Address:</span><span>{v.address || 'Not provided'}</span></div>
                    </div>

                    <div style={styles.summarySection}>
                        <h4 style={styles.summaryTitle}>📎 Documents & Declarations</h4>
                        <div style={styles.summaryRow}><span>Driving Licence:</span><span>{getFileName(v.drivingLicense)}</span></div>
                        <div style={styles.summaryRow}><span>ID / Passport:</span><span>{getFileName(v.idDocument)}</span></div>
                        <div style={styles.summaryRow}><span>Consent:</span><span>{v.consent ? '✅ Accepted' : '❌ Not accepted'}</span></div>
                        <div style={styles.summaryRow}><span>Accuracy:</span><span>{v.accuracy ? '✅ Confirmed' : '❌ Not confirmed'}</span></div>
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

        // Render content based on activeStep
        const renderStepContent = () => {
            switch (activeStep) {
                case 1:
                    return (
                        <>
                            <section className="card" style={styles.card}>
                                <h2 style={styles.cardTitle}>Booking details</h2>
                                <div style={styles.grid2}>
                                    <div>
                                        <label style={styles.label} htmlFor="vehicle">
                                            Vehicle <span style={styles.required}>*</span>
                                        </label>
                                        <select
                                            id="vehicle"
                                            {...register('vehicle', { required: 'Please select a vehicle' })}
                                            style={styles.select}
                                        >
                                            <option value="">Select a vehicle</option>
                                            {vehicleOptions.map((v) => (
                                                <option key={v.value} value={v.value}>
                                                    {v.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.vehicle && <p style={styles.errorText}>{errors.vehicle.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="pickupLocation">
                                            Pickup location <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="pickupLocation"
                                            type="text"
                                            placeholder="e.g. Nairobi, JKIA, Mombasa Road"
                                            {...register('pickupLocation', { required: 'Pickup location is required' })}
                                            style={styles.input}
                                        />
                                        {errors.pickupLocation && <p style={styles.errorText}>{errors.pickupLocation.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="pickupDate">
                                            Pickup date <span style={styles.required}>*</span>
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
                                        <label style={styles.label} htmlFor="pickupTime">
                                            Preferred pickup time
                                        </label>
                                        <input
                                            id="pickupTime"
                                            type="time"
                                            {...register('pickupTime')}
                                            style={styles.input}
                                            placeholder="Select time"
                                        />
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="returnLocation">
                                            Return location
                                        </label>
                                        <input
                                            id="returnLocation"
                                            type="text"
                                            placeholder="e.g. Same as pickup"
                                            {...register('returnLocation')}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.fullWidth}>
                                        <label style={styles.label} htmlFor="notes">
                                            Additional requests / notes
                                        </label>
                                        <textarea
                                            id="notes"
                                            placeholder="Any special requests or additional information..."
                                            {...register('notes')}
                                            style={styles.textarea}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </section>
                            <RatesSection />
                            <NavigationButtons />
                        </>
                    );
                case 2:
                    return (
                        <>
                            <section className="card" style={styles.card}>
                                <h2 style={styles.cardTitle}>Client details</h2>
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
                                            autoComplete="off"
                                            data-form-type="other"
                                        />
                                        {errors.fullName && <p style={styles.errorText}>{errors.fullName.message}</p>}
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
                                    <div style={styles.fullWidth}>
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
                                            placeholder="Enter phone number"
                                            enableSearch={true}
                                            searchNotFound="No country found"
                                            countryCodeEditable={false}
                                        />
                                        <div style={styles.helpText}>
                                            Enter your phone number with country code. We'll contact you via WhatsApp if available.
                                        </div>
                                        {errors.phone && <p style={styles.errorText}>{errors.phone.message}</p>}
                                    </div>
                                    <div style={styles.fullWidth}>
                                        <label style={styles.label} htmlFor="address">
                                            Residential address
                                        </label>
                                        <input
                                            id="address"
                                            type="text"
                                            placeholder="Enter your residential address (optional)"
                                            {...register('address')}
                                            style={styles.input}
                                            autoComplete="off"
                                            data-form-type="other"
                                            value={watchedValues.address || ''}
                                        />
                                    </div>
                                </div>

                                {/* Declarations (Checkboxes) */}
                                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                    <h3 style={{ fontSize: '16px', margin: '0 0 12px', color: '#a80f0f' }}>
                                        Declarations & Consent
                                    </h3>
                                    <div style={styles.checkboxRow}>
                                        <input
                                            id="consent"
                                            type="checkbox"
                                            {...register('consent', { required: 'You must consent to processing' })}
                                            style={styles.checkbox}
                                        />
                                        <label htmlFor="consent" style={styles.checkboxLabel}>
                                            I consent to Vision One Services receiving and using the information and identification documents
                                            submitted here for the purpose of processing this vehicle booking request. <span style={styles.required}>*</span>
                                        </label>
                                    </div>
                                    {errors.consent && <p style={styles.errorText}>{errors.consent.message}</p>}

                                    <div style={{ ...styles.checkboxRow, marginTop: '12px' }}>
                                        <input
                                            id="accuracy"
                                            type="checkbox"
                                            {...register('accuracy', { required: 'You must confirm accuracy' })}
                                            style={styles.checkbox}
                                        />
                                        <label htmlFor="accuracy" style={styles.checkboxLabel}>
                                            I confirm that the information provided is accurate and that I am authorised to provide these documents. <span style={styles.required}>*</span>
                                        </label>
                                    </div>
                                    {errors.accuracy && <p style={styles.errorText}>{errors.accuracy.message}</p>}
                                </div>
                            </section>
                            <NavigationButtons />
                        </>
                    );
                case 3:
                    return (
                        <>
                            <section className="card" style={styles.card}>
                                <h2 style={styles.cardTitle}>Mandatory identity documents</h2>
                                <div style={styles.noteBox}>
                                    Both documents are required. On most phones, tap <strong>Choose File</strong> and select the camera
                                    to photograph the document. Make sure the whole document is visible and readable.
                                </div>
                                <div style={{ ...styles.grid2, marginTop: '16px' }}>
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
                                        <div style={styles.helpText}>Required: clear photo or PDF.</div>
                                        {errors.drivingLicense && <p style={styles.errorText}>{errors.drivingLicense.message}</p>}
                                    </div>
                                    <div>
                                        <label style={styles.label} htmlFor="idDocument">
                                            National ID or passport <span style={styles.required}>*</span>
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
                                        <div style={styles.helpText}>Required: clear photo or PDF.</div>
                                        {errors.idDocument && <p style={styles.errorText}>{errors.idDocument.message}</p>}
                                    </div>
                                </div>
                            </section>
                            <NavigationButtons />
                        </>
                    );
                case 4:
                    return (
                        <>
                            <section className="card" style={styles.card}>
                                <h2 style={styles.cardTitle}>Review & Confirm</h2>
                                <p style={{ marginBottom: '16px' }}>Please review your details below. If everything is correct, click the submit button to finalize your booking.</p>
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

// Styles
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '980px',
        margin: '0 auto',
        padding: '18px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#1f2328',
        background: 'linear-gradient(180deg, #ffe1d1 0%, #fff 25%, #fff7f1 100%)',
    },
    hero: {
        background: '#fff',
        borderRadius: '20px',
        padding: '22px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.09)',
        borderTop: '6px solid #f26722',
        flexWrap: 'wrap',
    },
    heroLogo: {
        flexShrink: 0,
    },
    heroContent: {
        flex: 1,
    },
    heroTitle: {
        margin: '0 0 8px',
        fontSize: 'clamp(26px, 5vw, 42px)',
        color: '#1f2328',
    },
    heroSubtitle: {
        margin: '0',
        color: '#667085',
        lineHeight: '1.5',
    },
    heroPill: {
        display: 'inline-block',
        marginTop: '10px',
        background: '#c51414',
        color: 'white',
        fontWeight: 'bold',
        padding: '7px 12px',
        borderRadius: '999px',
        fontSize: '14px',
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
        margin: '0 0 16px',
        color: '#a80f0f',
        fontSize: '21px',
        fontWeight: 'bold',
    },
    grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
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
        borderRadius: '10px',
        font: 'inherit',
        background: '#fff',
        fontSize: '14px',
        boxSizing: 'border-box',
    },
    select: {
        width: '100%',
        padding: '13px',
        border: '1px solid #d9dee7',
        borderRadius: '10px',
        font: 'inherit',
        background: '#fff',
        fontSize: '14px',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '13px',
        border: '1px solid #d9dee7',
        borderRadius: '10px',
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
    checkboxRow: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        marginBottom: '8px',
    },
    checkbox: {
        width: '20px',
        height: '20px',
        minWidth: '20px',
        minHeight: '20px',
        marginTop: '2px',
        cursor: 'pointer',
        accentColor: '#FF6B35',
        border: '2px solid #d9dee7',
        borderRadius: '4px',
        appearance: 'auto',
        WebkitAppearance: 'checkbox',
        MozAppearance: 'checkbox',
        flexShrink: 0,
    },
    checkboxLabel: {
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '1.5',
        cursor: 'pointer',
        color: '#1f2328',
    },
    ratesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
    },
    rateCard: {
        border: '1px solid #ffd0ae',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#fffaf6',
    },
    rateHeader: {
        display: 'block',
        background: 'linear-gradient(90deg, #b50909, #f23d20)',
        color: '#fff',
        padding: '10px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '14px',
    },
    rateBody: {
        padding: '10px',
        fontSize: '13px',
        lineHeight: '1.55',
    },
    rateRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2px 0',
    },
    ratePrice: {
        fontWeight: 'bold',
    },
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
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        color: '#1f2328',
    },
    nextBtn: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #FF6B35, #FF8B35)',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        color: '#fff',
        transition: 'opacity 0.2s',
        marginLeft: 'auto',
    },
    submitBtn: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #FF6B35, #FF8B35)',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        color: '#fff',
        transition: 'opacity 0.2s',
        marginLeft: 'auto',
    },
    submitBtnDisabled: {
        opacity: '0.5',
        cursor: 'not-allowed',
    },
    contactInfo: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '16px 0 4px',
        fontSize: '14px',
        color: '#667085',
    },
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        margin: '16px 0',
    },
    summarySection: {
        background: '#f8f9fa',
        padding: '16px',
        borderRadius: '10px',
        border: '1px solid #e9ecef',
    },
    summaryTitle: {
        margin: '0 0 12px',
        fontSize: '16px',
        color: '#a80f0f',
        borderBottom: '2px solid #FF6B35',
        paddingBottom: '6px',
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 0',
        fontSize: '14px',
        borderBottom: '1px solid #f1f3f5',
    },
};

export default BookingForm;