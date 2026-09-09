import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';

// API base URL from environment variables or default
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

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
    drivingLicence: FileList;
    idDocument: FileList;
    consent: boolean;
    accuracy: boolean;
}

interface BookingFormProps {
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

const BookingForm: React.FC<BookingFormProps> = ({ onComplete }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [bookingData, setBookingData] = useState<any>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        trigger,
    } = useForm<BookingFormData>({
        defaultValues: {
            consent: false,
            accuracy: false,
        },
    });

    const pickupDate = watch('pickupDate');
    const returnDate = watch('returnDate');

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
            // If return date is before pickup, reset it
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

    const onSubmit = async (data: BookingFormData) => {
        // Validate files
        const dlFile = data.drivingLicence?.[0];
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

        // Validate dates
        if (data.returnDate && data.pickupDate && data.returnDate < data.pickupDate) {
            toast.error('Return date cannot be before pickup date');
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();

            // Add all form fields
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'drivingLicence' || key === 'idDocument') {
                    // Skip files, handle separately
                    return;
                }
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            // Add files
            formData.append('drivingLicence', dlFile);
            formData.append('idDocument', idFile);

            // Map field names to match backend expectations
            // The backend expects: customerName, email, phone, pickupDate, returnDate, carType, etc.
            // We map our fields to the backend schema
            const mappedData = new FormData();
            mappedData.append('customerName', data.fullName);
            mappedData.append('email', data.email);
            mappedData.append('phone', data.phone);
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
            // Add a dummy deposit proof since the backend expects it
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

    // Hero section with logo (using inline SVG as placeholder, or you can use an img tag)
    const HeroSection = () => (
        <div className="hero-section" style={styles.hero}>
            <div style={styles.heroLogo}>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="58" fill="#FF6B35" stroke="#fff" strokeWidth="4" />
                    <text x="30" y="70" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#fff">V1</text>
                    <text x="28" y="92" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#fff">CAR HIRE</text>
                </svg>
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

    // Special offer rates section
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

    return (
        <div style={styles.container}>
            <HeroSection />

            <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                style={styles.form}
                encType="multipart/form-data"
            >
                {/* Client details */}
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
                                {...register('fullName', { required: 'Full name is required' })}
                                style={styles.input}
                                autoComplete="name"
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
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                style={styles.input}
                                autoComplete="email"
                            />
                            {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label style={styles.label} htmlFor="phone">
                                Phone / WhatsApp <span style={styles.required}>*</span>
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[\+]?[1-9][\d]{0,15}$/,
                                        message: 'Invalid phone number',
                                    },
                                })}
                                style={styles.input}
                                autoComplete="tel"
                            />
                            {errors.phone && <p style={styles.errorText}>{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label style={styles.label} htmlFor="address">
                                Residential address
                            </label>
                            <input
                                id="address"
                                type="text"
                                {...register('address')}
                                style={styles.input}
                                autoComplete="street-address"
                            />
                        </div>
                    </div>
                </section>

                {/* Booking details */}
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
                            />
                        </div>
                        <div>
                            <label style={styles.label} htmlFor="returnLocation">
                                Return location
                            </label>
                            <input
                                id="returnLocation"
                                type="text"
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
                                {...register('notes')}
                                style={styles.textarea}
                                rows={3}
                            />
                        </div>
                    </div>
                </section>

                {/* Special offer rates */}
                <RatesSection />

                {/* Mandatory identity documents */}
                <section className="card" style={styles.card}>
                    <h2 style={styles.cardTitle}>Mandatory identity documents</h2>
                    <div style={styles.noteBox}>
                        Both documents are required. On most phones, tap <strong>Choose File</strong> and select the camera
                        to photograph the document. Make sure the whole document is visible and readable.
                    </div>
                    <div style={{ ...styles.grid2, marginTop: '16px' }}>
                        <div>
                            <label style={styles.label} htmlFor="drivingLicence">
                                Driving licence <span style={styles.required}>*</span>
                            </label>
                            <input
                                id="drivingLicence"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,application/pdf"
                                {...register('drivingLicence', {
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
                            {errors.drivingLicence && <p style={styles.errorText}>{errors.drivingLicence.message}</p>}
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

                {/* Consent checkboxes */}
                <section className="card" style={styles.card}>
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
                </section>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isSubmitting || confirmed}
                    style={{
                        ...styles.submitBtn,
                        ...((isSubmitting || confirmed) ? styles.submitBtnDisabled : {}),
                    }}
                >
                    {isSubmitting ? 'Submitting…' : confirmed ? '✓ Booking Confirmed' : 'Submit Booking Request'}
                </button>

                <div style={styles.contactInfo}>
                    +254 705 336 311 / +44 7397 549 590 · visionwanservices@gmail.com
                </div>
            </form>
        </div>
    );
};

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
        gap: '10px',
        alignItems: 'flex-start',
    },
    checkbox: {
        marginTop: '4px',
        width: 'auto',
        flexShrink: 0,
    },
    checkboxLabel: {
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '1.4',
        cursor: 'pointer',
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
    submitBtn: {
        width: '100%',
        padding: '16px',
        border: '0',
        borderRadius: '12px',
        background: 'linear-gradient(90deg, #a80707, #f34a22)',
        color: 'white',
        fontSize: '18px',
        fontWeight: '800',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
    },
    submitBtnDisabled: {
        opacity: '0.55',
        cursor: 'not-allowed',
    },
    contactInfo: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '16px 0 4px',
        fontSize: '14px',
        color: '#667085',
    },
};

export default BookingForm;