/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
const { useState, useEffect, useMemo } = React;
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
    FESTIVE_VEHICLES,
    FESTIVE_PERIODS,
    isFestiveDate,
    getFestiveDateRange,
    calculateFestiveEstimate,
    type PeriodCategory,
} from '../config/festiveRates';

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY || 'ke';

/* ─────────── Festive palette ─────────── */
const FESTIVE = {
    red: '#C8102E',
    deepRed: '#8B0000',
    green: '#0B6E4F',
    deepGreen: '#064a34',
    gold: '#D4AF37',
    lightGold: '#F4D77A',
    cream: '#FFF8E7',
    dark: '#1a1a2e',
};

interface FestiveFormData {
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
}

export interface FestiveBookingFormProps {
    onComplete?: () => void;
}

const FestiveBookingForm: React.FC<FestiveBookingFormProps> = ({ onComplete }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');
    const [estimate, setEstimate] = useState<{
        days: number | null;
        rate: number | null;
        total: number | null;
        period: PeriodCategory | null;
        error: string | null;
    }>({ days: null, rate: null, total: null, period: null, error: null });

    const { year, min, max } = useMemo(() => getFestiveDateRange(), []);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FestiveFormData>({
        defaultValues: {
            idType: 'id',
            pickupDate: `${year}-12-20`,
            returnDate: `${year}-12-27`,
        },
        mode: 'onChange',
    });

    const pickupDate = watch('pickupDate');
    const returnDate = watch('returnDate');
    const vehicle = watch('vehicle');

    useEffect(() => {
        setEstimate(calculateFestiveEstimate(vehicle, pickupDate, returnDate));
    }, [vehicle, pickupDate, returnDate]);

    const onSubmit = async (data: FestiveFormData) => {
        if (!isFestiveDate(data.pickupDate)) {
            toast.error(`Pickup must fall within December ${year}.`);
            return;
        }
        if (!isFestiveDate(data.returnDate)) {
            toast.error(`Return must fall within December ${year}.`);
            return;
        }

        const dlFile = data.drivingLicense?.[0];
        const idFile = data.idDocument?.[0];
        const proofFile = data.depositProof?.[0];
        if (!dlFile || !idFile || !proofFile) {
            toast.error('Please attach all three documents.');
            return;
        }

        setIsSubmitting(true);
        try {
            const fd = new FormData();
            fd.append('customerName', data.fullName);
            fd.append('email', data.email);
            fd.append('phone', phoneValue);
            fd.append('pickupDate', data.pickupDate);
            fd.append('returnDate', data.returnDate);
            fd.append('carType', data.vehicle);
            fd.append('pickupLocation', data.pickupLocation);
            fd.append('dropoffLocation', data.deliveryAddress || data.pickupLocation);
            fd.append('additionalInfo', data.notes || '');
            fd.append('nationality', data.nationality || '');
            fd.append('idNumber', data.idNumber);
            fd.append('idType', data.idType);
            fd.append('termsAccepted', 'true');
            fd.append('drivingLicense', dlFile);
            fd.append('idDocument', idFile);
            fd.append('depositProof', proofFile);

            if (estimate.rate && estimate.period) {
                fd.append('periodCategory', estimate.period);
                fd.append('dailyRate', String(estimate.rate));
                fd.append('estimatedTotal', String(estimate.total || 0));
                fd.append('rentalDays', String(estimate.days || 0));
            }
            fd.append('bookingSeason', 'festive-december');
            fd.append('festiveYear', String(year));

            const res = await axios.post(`${API_BASE_URL}/api/bookings`, fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 30000,
            });

            if (res.status === 201 || res.status === 200) {
                setConfirmed(true);
                toast.success('Festive booking confirmed! Check your email.');
                if (onComplete) setTimeout(onComplete, 3000);
            }
        } catch (err: any) {
            const msg =
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                'Booking failed. Please try again.';
            toast.error(`❌ ${msg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const periodLabel = estimate.period
        ? FESTIVE_PERIODS.find(p => p.value === estimate.period)?.label
        : '—';

    return (
        <div style={styles.wrap}>
            {/* Soft snow accents */}
            <div style={styles.snowLayer} aria-hidden>
                {Array.from({ length: 14 }).map((_, i) => (
                    <span
                        key={i}
                        style={{
                            ...styles.snow,
                            left: `${(i * 6.9) % 100}%`,
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: `${9 + (i % 5)}s`,
                            fontSize: `${8 + (i % 3) * 4}px`,
                        }}
                    >
                        ❄
                    </span>
                ))}
            </div>

            {/* ── Botanical corners (pine + berries) ── */}
            <CornerSprite position="tl" />
            <CornerSprite position="tr" />
            <CornerSprite position="bl" />
            <CornerSprite position="br" />

            <header style={styles.header}>
                <div style={styles.headerBadge}>
                    Limited December {year} Offer
                </div>
                <h1 style={styles.title}>Festive {year} Booking</h1>
                <div style={styles.titleRule} aria-hidden />
                <p style={styles.subtitle}>
                    Reserve your vehicle for December {year} only — festive rates locked in.
                    Bookings accepted for{' '}
                    <strong style={styles.subtitleStrong}>
                        December 1 – 31, {year}
                    </strong>
                    .
                </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
                {/* ── Section 1 ── */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <span style={styles.sectionRule} aria-hidden />
                        Your Details
                    </h2>
                    <div style={styles.grid2}>
                        <Field label="Full name" required error={errors.fullName?.message}>
                            <input
                                type="text"
                                placeholder="e.g. Jane Wanjiku"
                                {...register('fullName', { required: 'Full name is required' })}
                                style={styles.input}
                            />
                        </Field>
                        <Field label="Phone / WhatsApp" required>
                            <PhoneInput
                                country={DEFAULT_COUNTRY}
                                value={phoneValue}
                                onChange={(v) => {
                                    setPhoneValue(v);
                                    setValue('phone', v, { shouldValidate: true });
                                }}
                                inputStyle={styles.phoneInput}
                                buttonStyle={styles.phoneButton}
                                dropdownStyle={{ borderRadius: 10 }}
                                placeholder="+254 705 336 311"
                                enableSearch
                                countryCodeEditable={false}
                            />
                        </Field>
                        <Field label="Email address" required error={errors.email?.message}>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email',
                                    },
                                })}
                                style={styles.input}
                            />
                        </Field>
                        <Field label="Nationality">
                            <input
                                type="text"
                                placeholder="e.g. Kenyan"
                                {...register('nationality')}
                                style={styles.input}
                            />
                        </Field>
                        <Field label="ID Type" required>
                            <select {...register('idType', { required: true })} style={styles.input}>
                                <option value="id">National ID</option>
                                <option value="passport">Passport</option>
                            </select>
                        </Field>
                        <Field label="ID / Passport number" required error={errors.idNumber?.message}>
                            <input
                                type="text"
                                placeholder="Enter ID or passport number"
                                {...register('idNumber', {
                                    required: 'ID/Passport number is required',
                                    minLength: { value: 4, message: 'At least 4 characters' },
                                })}
                                style={styles.input}
                            />
                        </Field>
                    </div>
                </section>

                {/* ── Section 2 ── */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <span style={styles.sectionRule} aria-hidden />
                        Festive Rental Details
                    </h2>
                    <div style={styles.grid3}>
                        <Field label={`Pickup date (Dec ${year})`} required error={errors.pickupDate?.message}>
                            <input
                                type="date"
                                min={min}
                                max={max}
                                {...register('pickupDate', {
                                    required: 'Pickup date is required',
                                    validate: v => isFestiveDate(v) || `Must be in December ${year}`,
                                })}
                                style={styles.input}
                            />
                        </Field>
                        <Field label={`Return date (Dec ${year})`} required error={errors.returnDate?.message}>
                            <input
                                type="date"
                                min={pickupDate || min}
                                max={max}
                                {...register('returnDate', {
                                    required: 'Return date is required',
                                    validate: v => isFestiveDate(v) || `Must be in December ${year}`,
                                })}
                                style={styles.input}
                            />
                        </Field>
                        <Field label="Pickup location" required>
                            <select
                                {...register('pickupLocation', { required: 'Pickup location is required' })}
                                style={styles.input}
                            >
                                <option value="">Select location</option>
                                <option>Nairobi</option>
                                <option>Jomo Kenyatta International Airport</option>
                                <option>Wilson Airport</option>
                                <option>Other / delivery requested</option>
                            </select>
                        </Field>
                    </div>

                    {/* ── Vehicle grid (icon-free) ── */}
                    <div style={{ marginTop: 22 }}>
                        <label style={styles.label}>
                            Choose your festive ride <span style={styles.req}>*</span>
                        </label>
                        <div style={styles.vehicleGrid}>
                            {FESTIVE_VEHICLES.map(v => {
                                const active = vehicle === v.value;
                                const shownRate = estimate.period ? v.rates[estimate.period] : v.rates.short;
                                return (
                                    <label
                                        key={v.value}
                                        style={{
                                            ...styles.vehicleCard,
                                            ...(active ? styles.vehicleCardActive : {}),
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            value={v.value}
                                            {...register('vehicle', { required: 'Please choose a vehicle' })}
                                            style={{ display: 'none' }}
                                        />
                                        <div style={styles.vehicleName}>{v.label}</div>
                                        <div style={styles.vehicleRate}>
                                            <span style={styles.vehicleRateAmount}>
                                                KES {shownRate.toLocaleString()}
                                            </span>
                                            <span style={styles.vehicleRateUnit}>/day</span>
                                        </div>
                                        <div style={styles.vehicleTier}>
                                            {estimate.period
                                                ? FESTIVE_PERIODS.find(p => p.value === estimate.period)?.label
                                                : '1–7 days'}
                                        </div>
                                        {active && <span style={styles.vehicleActiveDot} aria-hidden />}
                                    </label>
                                );
                            })}
                        </div>
                        {errors.vehicle && <p style={styles.error}>{errors.vehicle.message}</p>}
                    </div>

                    {/* ── Estimate card ── */}
                    {estimate.days && !estimate.error && (
                        <div style={styles.estimateCard}>
                            <h3 style={styles.estimateTitle}>Festive Estimate</h3>
                            <Row label="Vehicle" value={vehicle} />
                            <Row label="Rental days" value={`${estimate.days} day${estimate.days === 1 ? '' : 's'}`} />
                            <Row label="Tier" value={periodLabel || '—'} />
                            <Row label="Daily rate" value={estimate.rate ? `KES ${estimate.rate.toLocaleString()}/day` : '—'} />
                            <div style={styles.estimateTotalRow}>
                                <span>Estimated total</span>
                                <strong style={styles.estimateTotalValue}>
                                    {estimate.total ? `KES ${estimate.total.toLocaleString()}` : '—'}
                                </strong>
                            </div>
                        </div>
                    )}

                    <div style={{ ...styles.grid2, marginTop: 18 }}>
                        <Field label="Delivery / exact pick-up address">
                            <input
                                type="text"
                                placeholder="Optional"
                                {...register('deliveryAddress')}
                                style={styles.input}
                            />
                        </Field>
                        <Field label="Special requests">
                            <input
                                type="text"
                                placeholder="Child seat, airport pickup, etc."
                                {...register('notes')}
                                style={styles.input}
                            />
                        </Field>
                    </div>
                </section>

                {/* ── Section 3: Uploads ── */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <span style={styles.sectionRule} aria-hidden />
                        Upload Documents
                    </h2>
                    <p style={styles.hint}>
                        Attach a clear copy or photo of your ID/Passport, valid driving licence and proof of payment.
                        JPG, PNG, WEBP or PDF — max 10 MB each.
                    </p>
                    <div style={styles.grid2}>
                        <FileField
                            id="idDocument"
                            label="National ID / Passport"
                            register={register('idDocument', { required: 'ID or passport is required' })}
                            error={errors.idDocument?.message}
                        />
                        <FileField
                            id="drivingLicense"
                            label="Driving licence"
                            register={register('drivingLicense', { required: 'Driving licence is required' })}
                            error={errors.drivingLicense?.message}
                        />
                        <div style={{ gridColumn: '1 / -1' }}>
                            <FileField
                                id="depositProof"
                                label="Proof of Payment"
                                register={register('depositProof', { required: 'Proof of payment is required' })}
                                error={errors.depositProof?.message}
                            />
                        </div>
                    </div>
                </section>

                {/* ── Section 4: Consent ── */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <span style={styles.sectionRule} aria-hidden />
                        Declaration
                    </h2>
                    <label style={styles.consentBox}>
                        <input
                            type="checkbox"
                            {...register('consent', { required: 'You must confirm accuracy' })}
                            style={styles.consentCheckbox}
                        />
                        <span style={styles.consentText}>
                            I confirm that the information and documents provided are accurate and consent to their
                            use for booking verification. I understand this is a{' '}
                            <strong>December {year} festive booking only</strong>.
                        </span>
                    </label>
                    {errors.consent && <p style={styles.error}>{errors.consent.message}</p>}
                </section>

                <div style={styles.actions}>
                    <button
                        type="submit"
                        disabled={isSubmitting || confirmed}
                        style={{
                            ...styles.submitBtn,
                            ...((isSubmitting || confirmed) ? styles.submitBtnDisabled : {}),
                        }}
                    >
                        {isSubmitting
                            ? 'Submitting…'
                            : confirmed
                                ? 'Festive Booking Confirmed'
                                : `Reserve My December ${year} Ride`}
                    </button>
                    <p style={styles.termsNote}>
                        By submitting you agree to our Terms &amp; Conditions. Subject to availability.
                    </p>
                </div>
            </form>

            <style>{`
                @keyframes festiveFall {
                    0%   { transform: translateY(-10vh) rotate(0deg); opacity: 0.85; }
                    100% { transform: translateY(110vh) rotate(360deg); opacity: 0.15; }
                }
            `}</style>
        </div>
    );
};

/* ───────────── Botanical corner (jingle.jpg, edge-faded into the form) ───────────── */
type CornerPos = 'tl' | 'tr' | 'bl' | 'br';

const CornerSprite: React.FC<{ position: CornerPos }> = ({ position }) => {
    const [imgFailed, setImgFailed] = React.useState(false);

    // Rotate the image so the branch always flows inward from the corner
    const rotate =
        position === 'tl' ? 0 :
        position === 'tr' ? 90 :
        position === 'br' ? 180 :
        /* bl */ 270;

    /**
     * Mask that fades the INNER edges of the image so it dissolves into the form.
     * Each corner gets a 2-stop radial mask: opaque at the outer corner,
     * fully transparent ~72% of the way across — no hard edge, ever.
     */
    const maskCss: Record<CornerPos, string> = {
        tl: 'radial-gradient(circle at 0% 0%, #000 0%, #000 32%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.12) 68%, transparent 76%)',
        tr: 'radial-gradient(circle at 100% 0%, #000 0%, #000 32%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.12) 68%, transparent 76%)',
        bl: 'radial-gradient(circle at 0% 100%, #000 0%, #000 32%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.12) 68%, transparent 76%)',
        br: 'radial-gradient(circle at 100% 100%, #000 0%, #000 32%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.12) 68%, transparent 76%)',
    };

    const wrapperStyle: React.CSSProperties = {
        position: 'absolute',
        width: 'clamp(130px, 18vw, 230px)',
        height: 'clamp(130px, 18vw, 230px)',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.92,
        ...(position === 'tl' && { top: -6, left: -6 }),
        ...(position === 'tr' && { top: -6, right: -6 }),
        ...(position === 'bl' && { bottom: -6, left: -6 }),
        ...(position === 'br' && { bottom: -6, right: -6 }),
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center',
        userSelect: 'none',
        // Dissolve the inner edges so the jingle blends into the cream wrap
        WebkitMaskImage: maskCss[position],
        maskImage: maskCss[position],
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        // Remove any white background from the JPEG
        mixBlendMode: 'multiply' as any,
        // Warm, cream-tinted glow instead of a hard drop shadow
        filter: 'drop-shadow(0 8px 18px rgba(11,110,79,0.14)) saturate(1.08) contrast(1.03)',
    };

    return (
        <div style={wrapperStyle} aria-hidden>
            {!imgFailed ? (
                <img
                    src="/assets/jingle.jpg"
                    alt=""
                    onError={() => setImgFailed(true)}
                    draggable={false}
                    style={imageStyle}
                />
            ) : (
                /* Fallback: inline SVG pine branch (only shown if the jingle is missing) */
                <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: `rotate(${rotate}deg)`,
                        transformOrigin: 'center',
                        display: 'block',
                        WebkitMaskImage: maskCss[position],
                        maskImage: maskCss[position],
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskSize: '100% 100%',
                        maskSize: '100% 100%',
                    }}
                >
                    <defs>
                        <radialGradient id={`berryGrad-${position}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FF5A5F" />
                            <stop offset="100%" stopColor="#8B0000" />
                        </radialGradient>
                        <linearGradient id={`pineGrad-${position}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#0F7A58" />
                            <stop offset="100%" stopColor="#064a34" />
                        </linearGradient>
                    </defs>
                    <g stroke={`url(#pineGrad-${position})`} strokeWidth="3.5" fill="none" strokeLinecap="round">
                        <path d="M 12 12 C 60 20, 110 55, 165 130" />
                        <path d="M 30 18 C 40 8, 52 6, 60 12" />
                        <path d="M 45 26 C 58 16, 72 14, 82 20" />
                        <path d="M 65 40 C 80 30, 95 30, 105 36" />
                        <path d="M 85 55 C 100 45, 115 45, 126 52" />
                        <path d="M 105 72 C 120 62, 135 62, 146 70" />
                        <path d="M 125 92 C 140 82, 155 82, 166 90" />
                        <path d="M 30 30 C 22 42, 22 56, 30 66" />
                        <path d="M 48 44 C 40 56, 40 70, 48 80" />
                        <path d="M 66 60 C 58 72, 58 86, 66 96" />
                        <path d="M 86 78 C 78 90, 78 104, 86 114" />
                        <path d="M 106 96 C 98 108, 98 122, 106 132" />
                        <path d="M 126 116 C 118 128, 118 142, 126 152" />
                    </g>
                    <g>
                        <circle cx="34" cy="24" r="6" fill={`url(#berryGrad-${position})`} />
                        <circle cx="52" cy="40" r="5" fill={`url(#berryGrad-${position})`} />
                        <circle cx="72" cy="58" r="6" fill={`url(#berryGrad-${position})`} />
                        <circle cx="94" cy="78" r="5" fill={`url(#berryGrad-${position})`} />
                        <circle cx="114" cy="100" r="6" fill={`url(#berryGrad-${position})`} />
                        <circle cx="138" cy="124" r="5" fill={`url(#berryGrad-${position})`} />
                        <circle cx="32" cy="22" r="1.6" fill="#FFE9A8" opacity="0.85" />
                        <circle cx="70" cy="56" r="1.6" fill="#FFE9A8" opacity="0.85" />
                        <circle cx="112" cy="98" r="1.6" fill="#FFE9A8" opacity="0.85" />
                    </g>
                    <g fill="#D4AF37">
                        <path d="M 150 40 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 z" opacity="0.85" />
                        <path d="M 40 130 l 1.5 4.5 l 4.5 1.5 l -4.5 1.5 l -1.5 4.5 l -1.5 -4.5 l -4.5 -1.5 l 4.5 -1.5 z" opacity="0.7" />
                    </g>
                </svg>
            )}
        </div>
    );
};

/* ───────────── small internal helpers ───────────── */
const Field: React.FC<{
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}> = ({ label, required, error, children }) => (
    <div>
        <label style={styles.label}>
            {label} {required && <span style={styles.req}>*</span>}
        </label>
        {children}
        {error && <p style={styles.error}>{error}</p>}
    </div>
);

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div style={styles.row}>
        <span style={styles.rowLabel}>{label}</span>
        <span style={styles.rowValue}>{value}</span>
    </div>
);

const FileField: React.FC<{
    id: string;
    label: string;
    register: any;
    error?: string;
}> = ({ id, label, register, error }) => (
    <div>
        <label style={styles.label} htmlFor={id}>
            {label} <span style={styles.req}>*</span>
        </label>
        <input
            id={id}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            {...register}
            style={styles.fileInput}
        />
        {error && <p style={styles.error}>{error}</p>}
    </div>
);

/* ───────────── styles ───────────── */
const styles: { [k: string]: React.CSSProperties } = {
    wrap: {
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${FESTIVE.cream} 0%, #ffffff 55%, #FFF1E0 100%)`,
        borderRadius: 24,
        padding: '34px 24px 38px',
        border: `2px solid ${FESTIVE.gold}`,
        boxShadow:
            '0 24px 70px -22px rgba(200,16,46,0.38), 0 8px 24px -14px rgba(11,110,79,0.25)',
        fontFamily: 'Inter, Arial, sans-serif',
    },

    /* Subtle snow */
    snowLayer: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
    },
    snow: {
        position: 'absolute',
        top: '-5vh',
        color: '#ffffff',
        textShadow: '0 0 6px rgba(11,110,79,0.35)',
        animation: 'festiveFall linear infinite',
        opacity: 0.7,
    },

    /* Header */
    header: { textAlign: 'center', marginBottom: 28, position: 'relative', zIndex: 3 },
    headerBadge: {
        display: 'inline-block',
        padding: '7px 18px',
        background: `linear-gradient(135deg, ${FESTIVE.gold}, ${FESTIVE.lightGold}, ${FESTIVE.gold})`,
        color: '#3a2b00',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 900,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 14,
        boxShadow: '0 10px 26px -12px rgba(212,175,55,0.85)',
    },
    title: {
        margin: 0,
        fontSize: 'clamp(24px, 4vw, 38px)',
        color: FESTIVE.deepRed,
        fontWeight: 900,
        letterSpacing: -0.6,
        lineHeight: 1.1,
    },
    titleRule: {
        width: 74,
        height: 3,
        margin: '14px auto 12px',
        background: `linear-gradient(90deg, transparent, ${FESTIVE.gold}, transparent)`,
        borderRadius: 999,
    },
    subtitle: {
        margin: '0 auto',
        maxWidth: 640,
        color: '#5b5b6b',
        fontSize: 14.5,
        lineHeight: 1.6,
    },
    subtitleStrong: { color: FESTIVE.deepGreen, fontWeight: 800 },

    form: { position: 'relative', zIndex: 3 },

    /* Sections */
    section: {
        background: '#ffffff',
        borderRadius: 18,
        padding: '22px 20px',
        marginBottom: 20,
        border: '1px solid #f1e6d2',
        boxShadow:
            '0 10px 30px -20px rgba(26,26,46,0.28), 0 2px 8px -6px rgba(212,175,55,0.25)',
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '0 0 18px',
        fontSize: 17,
        color: FESTIVE.dark,
        fontWeight: 800,
        letterSpacing: -0.2,
        textTransform: 'uppercase',
    },
    sectionRule: {
        display: 'inline-block',
        width: 26,
        height: 4,
        background: `linear-gradient(90deg, ${FESTIVE.red}, ${FESTIVE.gold})`,
        borderRadius: 999,
        boxShadow: '0 2px 8px -2px rgba(200,16,46,0.55)',
    },

    grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 14,
    },
    grid3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 14,
    },

    label: {
        display: 'block',
        fontWeight: 700,
        fontSize: 13,
        color: FESTIVE.dark,
        marginBottom: 6,
    },
    req: { color: FESTIVE.red },
    input: {
        width: '100%',
        padding: '12px 14px',
        border: '1.5px solid #e6dcc8',
        borderRadius: 10,
        fontSize: 14,
        background: '#fffdf8',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
    },
    phoneInput: {
        width: '100%',
        height: 46,
        fontSize: 14,
        borderRadius: 10,
        border: '1.5px solid #e6dcc8',
        paddingLeft: 76,
        background: '#fffdf8',
    },
    phoneButton: {
        borderRadius: '10px 0 0 10px',
        border: '1.5px solid #e6dcc8',
        background: '#fff7e6',
        height: 46,
    },
    fileInput: { width: '100%', padding: '10px 0', fontSize: 14 },
    hint: { fontSize: 13, color: '#7a7a8c', margin: '-6px 0 14px' },
    error: { color: FESTIVE.red, fontSize: 12.5, marginTop: 5, fontWeight: 600 },

    /* Vehicle cards — no icons */
    vehicleGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 12,
        marginTop: 6,
    },
    vehicleCard: {
        position: 'relative',
        textAlign: 'center',
        padding: '18px 12px 16px',
        borderRadius: 14,
        background: '#fffdf8',
        border: '2px solid #f1e6d2',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    vehicleCardActive: {
        border: `2px solid ${FESTIVE.red}`,
        background: `linear-gradient(180deg, #fff5f5, #fffdf8)`,
        boxShadow: '0 14px 28px -16px rgba(200,16,46,0.55)',
        transform: 'translateY(-2px)',
    },
    vehicleName: {
        fontWeight: 900,
        color: FESTIVE.dark,
        fontSize: 15,
        letterSpacing: -0.2,
        marginBottom: 8,
    },
    vehicleRate: { color: FESTIVE.red, fontWeight: 900, fontSize: 15.5 },
    vehicleRateUnit: { fontSize: 11, color: '#7a7a8c', fontWeight: 700, marginLeft: 3 },
    vehicleTier: {
        marginTop: 8,
        fontSize: 11,
        color: FESTIVE.green,
        fontWeight: 800,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
    },
    vehicleActiveDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: FESTIVE.red,
        boxShadow: '0 0 0 3px rgba(200,16,46,0.2)',
    },

    /* Estimate */
    estimateCard: {
        marginTop: 20,
        padding: 20,
        borderRadius: 16,
        background: `linear-gradient(135deg, ${FESTIVE.cream}, #FFF6E5)`,
        border: `1.5px dashed ${FESTIVE.gold}`,
    },
    estimateTitle: {
        margin: '0 0 14px',
        fontSize: 15,
        color: FESTIVE.deepRed,
        fontWeight: 900,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '7px 0',
        fontSize: 14,
    },
    rowLabel: { color: '#6b6b7b', fontWeight: 600 },
    rowValue: { color: FESTIVE.dark, fontWeight: 800 },
    estimateTotalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: `1.5px solid ${FESTIVE.gold}`,
        marginTop: 10,
        paddingTop: 14,
        fontSize: 15,
        fontWeight: 900,
        color: FESTIVE.deepRed,
        letterSpacing: 0.2,
    },
    estimateTotalValue: { fontSize: 20, color: FESTIVE.red },

    consentBox: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        background: '#fffdf8',
        border: '1.5px solid #f1e6d2',
        borderRadius: 12,
        padding: 14,
    },
    consentCheckbox: {
        width: 20,
        height: 20,
        minWidth: 20,
        marginTop: 2,
        accentColor: FESTIVE.red,
        cursor: 'pointer',
    },
    consentText: { fontSize: 13.5, color: '#3c3c4a', lineHeight: 1.55 },

    actions: { textAlign: 'center', marginTop: 10 },
    submitBtn: {
        padding: '16px 38px',
        fontSize: 16,
        fontWeight: 900,
        color: '#fff',
        background: `linear-gradient(135deg, ${FESTIVE.red} 0%, ${FESTIVE.deepRed} 60%, ${FESTIVE.gold} 130%)`,
        border: 'none',
        borderRadius: 14,
        cursor: 'pointer',
        boxShadow: '0 16px 34px -14px rgba(200,16,46,0.65)',
        letterSpacing: 0.4,
        transition: 'transform 0.15s, box-shadow 0.15s',
    },
    submitBtnDisabled: { opacity: 0.55, cursor: 'not-allowed', boxShadow: 'none' },
    termsNote: { marginTop: 12, fontSize: 12, color: '#7a7a8c' },
};

export default FestiveBookingForm;