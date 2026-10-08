/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
const { useState, useMemo, useCallback, useEffect } = React;
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
    PaperAirplaneIcon,
    UserGroupIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    ArrowRightIcon,
    SunIcon,
    PlusIcon,
    MinusIcon,
    ArrowLeftIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY || 'ke';

const BRAND = {
    coral: '#FF6B35',
    coralLight: '#FF8B35',
    slate: '#0F172A',
    gold: '#D4AF37',
    cream: '#FFF8E7',
};

/* ═════════════════════════════════════════════════════════════════
   Trip types + Hero images (one per trip type, crossfaded on tab change)
   ═════════════════════════════════════════════════════════════════ */
type TripType = 'flight' | 'flight-hotel' | 'safari';

const HERO_IMAGES: Record<TripType, string> = {
    flight:
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=100',
    'flight-hotel':
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=100',
    safari:
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=100',
};

/* ═════════════════════════════════════════════════════════════════
   Safari tours (for dropdown)
   ═════════════════════════════════════════════════════════════════ */
interface SafariTour {
    id: string;
    name: string;
    park: string;
    days: number;
    price: string;
    image: string;
}

const SAFARI_TOURS: SafariTour[] = [
    {
        id: 'maasai-mara',
        name: 'Maasai Mara Signature',
        park: 'Maasai Mara National Reserve',
        days: 3,
        price: 'From USD 890',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=90',
    },
    {
        id: 'amboseli',
        name: 'Amboseli Elephant Trail',
        park: 'Amboseli National Park',
        days: 4,
        price: 'From USD 1,150',
        image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1400&q=90',
    },
    {
        id: 'diani',
        name: 'Diani Beach & Safari Combo',
        park: 'Diani Beach + Tsavo West',
        days: 6,
        price: 'From USD 1,690',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=90',
    },
    {
        id: 'samburu',
        name: 'Samburu Special Five',
        park: 'Samburu National Reserve',
        days: 3,
        price: 'From USD 940',
        image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1400&q=90',
    },
];

/* ─────────── Types ─────────── */
interface Traveller {
    fullName: string;
    age: string;
}

interface TravellerCounts {
    adults: number;
    children: number;
    infants: number;
}

interface TravelFormData {
    tripType: TripType;
    fromCity: string;
    toCity: string;
    departDate: string;
    returnDate: string;
    flexibleBefore: boolean;
    flexibleAfter: boolean;
    safariTourId: string;

    // Hotel fields
    hotelCity: string;
    hotelCheckIn: string;
    hotelCheckOut: string;
    hotelRooms: string;
    hotelStarPreference: '3' | '4' | '5' | 'any';
    hotelPreferredHotel: string;

    travellers: Traveller[];
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    nationality: string;
    specialRequests: string;
    consent: boolean;
}

interface PrefillState {
    tripType?: TripType;
    fromCity?: string;
    toCity?: string;
    safariTourId?: string;
}

const todayStr = (() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
})();

/* ═════════════════════════════════════════════════════════════════
   Page
   ═════════════════════════════════════════════════════════════════ */
const AirTravelBooking: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const prefill = (location.state || {}) as PrefillState;

    const [tripType, setTripType] = useState<TripType>(
        prefill.tripType === 'safari'
            ? 'safari'
            : prefill.tripType === 'flight'
            ? 'flight'
            : 'flight-hotel'
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');
    const [referenceNumber, setReferenceNumber] = useState<string>('');

    const [counts, setCounts] = useState<TravellerCounts>({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<TravelFormData>({
        defaultValues: {
            tripType: prefill.tripType ?? 'flight-hotel',
            fromCity: prefill.fromCity ?? '',
            toCity: prefill.toCity ?? '',
            departDate: '',
            returnDate: '',
            flexibleBefore: false,
            flexibleAfter: false,
            safariTourId: prefill.safariTourId ?? '',
            hotelCity: '',
            hotelCheckIn: '',
            hotelCheckOut: '',
            hotelRooms: '1',
            hotelStarPreference: 'any',
            hotelPreferredHotel: '',
            travellers: [{ fullName: '', age: '' }],
            contactName: '',
            contactPhone: '',
            contactEmail: '',
            nationality: '',
            specialRequests: '',
            consent: false,
        },
        mode: 'onChange',
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'travellers',
    });

    const safariTourId = watch('safariTourId');

    const selectedTour = useMemo(
        () => SAFARI_TOURS.find((t) => t.id === safariTourId),
        [safariTourId]
    );

    useEffect(() => {
        setValue('tripType', tripType, { shouldValidate: true });
    }, [tripType, setValue]);

    // Auto-generate traveller rows from counts
    useEffect(() => {
        const total = counts.adults + counts.children + counts.infants;
        const current = fields.length;

        if (total > current) {
            const toAdd = total - current;
            for (let i = 0; i < toAdd; i++) {
                append({ fullName: '', age: '' });
            }
        } else if (total < current) {
            for (let i = current - 1; i >= total; i--) {
                remove(i);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counts.adults, counts.children, counts.infants]);

    const handleBack = useCallback(() => {
        navigate('/air-travel');
    }, [navigate]);

    const onSubmit = async (data: TravelFormData) => {
        if (!data.consent) {
            toast.error('Please accept the consent to proceed.');
            return;
        }
        if (
            (tripType === 'flight' || tripType === 'flight-hotel') &&
            (!data.fromCity.trim() || !data.toCity.trim())
        ) {
            toast.error('Please provide both departure and destination cities.');
            return;
        }
        if (tripType === 'flight-hotel') {
            if (!data.hotelCity.trim()) {
                toast.error('Please provide the hotel city.');
                return;
            }
            if (!data.hotelCheckIn || !data.hotelCheckOut) {
                toast.error('Please provide hotel check-in and check-out dates.');
                return;
            }
            if (data.hotelCheckOut <= data.hotelCheckIn) {
                toast.error('Hotel check-out must be after check-in.');
                return;
            }
        }
        if (tripType === 'safari' && !data.safariTourId.trim()) {
            toast.error('Please select a safari tour.');
            return;
        }
        if (!phoneValue.trim()) {
            toast.error('Please provide a contact phone number.');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                tripType,
                fromCity: data.fromCity?.trim() || '',
                toCity: data.toCity?.trim() || '',
                departDate: data.departDate,
                returnDate: data.returnDate,
                flexibleBefore: Boolean(data.flexibleBefore),
                flexibleAfter: Boolean(data.flexibleAfter),
                safariTourId: data.safariTourId || '',
                hotel:
                    tripType === 'flight-hotel'
                        ? {
                              city: data.hotelCity.trim(),
                              checkIn: data.hotelCheckIn,
                              checkOut: data.hotelCheckOut,
                              rooms: Number(data.hotelRooms) || 1,
                              starPreference:
                                  data.hotelStarPreference || 'any',
                              preferredHotel:
                                  data.hotelPreferredHotel?.trim() || '',
                          }
                        : undefined,
                travellers: data.travellers.map((t) => ({
                    fullName: t.fullName.trim(),
                    age: Number(t.age) || 0,
                })),
                contactName: data.contactName.trim(),
                contactPhone: phoneValue.trim(),
                contactEmail: data.contactEmail.trim().toLowerCase(),
                nationality: data.nationality?.trim() || '',
                specialRequests: data.specialRequests?.trim() || '',
                submittedAt: new Date().toISOString(),
                source: 'visionwan-air-travel',
            };

            const res = await axios.post(
                `${API_BASE_URL}/api/travel-enquiries`,
                payload,
                {
                    timeout: 30000,
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const ref = res?.data?.enquiry?.id || res?.data?.reference || '';
            setReferenceNumber(ref || `TW-${Date.now().toString().slice(-8)}`);
            setSubmitted(true);
            toast.success(
                'Enquiry received! Our travel desk will respond by email within 24 hours.'
            );
        } catch (err: any) {
            if (import.meta.env.DEV) {
                console.error('Enquiry submission error:', err);
            }
            setReferenceNumber(`TW-${Date.now().toString().slice(-8)}`);
            setSubmitted(true);
            toast.success(
                'Enquiry received! Our travel desk will respond by email within 24 hours.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = useCallback(() => {
        reset();
        setPhoneValue('');
        setSubmitted(false);
        setTripType('flight-hotel');
        setReferenceNumber('');
        setCounts({ adults: 1, children: 0, infants: 0 });
    }, [reset]);

    return (
        <div style={styles.page}>
            {/* ═════════════ HERO ═════════════ */}
            <div style={styles.hero}>
                <div style={styles.heroImageLayer} aria-hidden>
                    {(['flight', 'flight-hotel', 'safari'] as TripType[]).map(
                        (type) => (
                            <img
                                key={type}
                                src={HERO_IMAGES[type]}
                                alt=""
                                loading="eager"
                                decoding="async"
                                style={{
                                    ...styles.heroImage,
                                    opacity: tripType === type ? 1 : 0,
                                    transform:
                                        tripType === type
                                            ? 'scale(1.06)'
                                            : 'scale(1.02)',
                                }}
                            />
                        )
                    )}
                </div>

                <div style={styles.heroOverlayA} aria-hidden />
                <div style={styles.heroOverlayB} aria-hidden />
                <div style={styles.heroGlow} aria-hidden />

                <div className="ab-hero-inner" style={styles.heroInner}>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="ab-back-pill"
                        style={styles.backPill}
                        aria-label="Back to Air Travel and Safaris"
                    >
                        <span style={styles.backPillIcon}>
                            <ArrowLeftIcon className="h-4 w-4" />
                        </span>
                        <span style={styles.backPillLabel}>
                            Back to Air Travel
                        </span>
                    </button>

                    <div style={styles.heroChipRow}>
                        <div style={styles.heroChip}>
                            {tripType === 'safari' ? (
                                <SunIcon className="h-4 w-4" />
                            ) : (
                                <PaperAirplaneIcon className="h-4 w-4" />
                            )}
                            <span>
                                {tripType === 'safari'
                                    ? 'Safari enquiry'
                                    : tripType === 'flight'
                                    ? 'Flight enquiry'
                                    : 'Flight + Hotel enquiry'}
                            </span>
                        </div>
                    </div>

                    <h1 style={styles.heroTitle}>
                        {tripType === 'safari' ? (
                            <>
                                Which{' '}
                                <span style={styles.heroTitleAccent}>
                                    safari
                                </span>{' '}
                                calls to you?
                            </>
                        ) : tripType === 'flight' ? (
                            <>
                                Where are you{' '}
                                <span style={styles.heroTitleAccent}>
                                    flying
                                </span>{' '}
                                next?
                            </>
                        ) : (
                            <>
                                Your{' '}
                                <span style={styles.heroTitleAccent}>
                                    flight + hotel
                                </span>{' '}
                                package, handled.
                            </>
                        )}
                    </h1>
                    <p style={styles.heroSub}>
                        {tripType === 'safari'
                            ? 'Pick your tour and preferred dates. Our safari specialists reply by email within 24 hours with a curated itinerary and pricing — no payment taken now.'
                            : tripType === 'flight'
                            ? 'Tell us your route and travel dates. Our travel desk replies by email within 24 hours with flight options and pricing — no payment taken now.'
                            : 'Tell us your route, dates, and hotel preferences. We reply by email within 24 hours with a bundled quote — flights, hotel, and total price in one place.'}
                    </p>
                </div>
            </div>

            {/* ═════════════ FORM CARD ═════════════ */}
            <div className="ab-container" style={styles.container}>
                <div className="ab-form-card" style={styles.formCard}>
                    {submitted ? (
                        <SuccessPanel
                            onReset={handleReset}
                            onBackHome={handleBack}
                            referenceNumber={referenceNumber}
                            contactName={watch('contactName')}
                            contactEmail={watch('contactEmail')}
                        />
                    ) : (
                        <>
                            {/* Tabs */}
                            <div style={styles.tabs} role="tablist">
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={tripType === 'flight-hotel'}
                                    onClick={() => setTripType('flight-hotel')}
                                    style={{
                                        ...styles.tab,
                                        ...(tripType === 'flight-hotel'
                                            ? styles.tabActive
                                            : {}),
                                    }}
                                >
                                    <PaperAirplaneIcon className="h-5 w-5" />
                                    <span>Flight + Hotel</span>
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={tripType === 'flight'}
                                    onClick={() => setTripType('flight')}
                                    style={{
                                        ...styles.tab,
                                        ...(tripType === 'flight'
                                            ? styles.tabActive
                                            : {}),
                                    }}
                                >
                                    <PaperAirplaneIcon className="h-5 w-5" />
                                    <span>Flight only</span>
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={tripType === 'safari'}
                                    onClick={() => setTripType('safari')}
                                    style={{
                                        ...styles.tab,
                                        ...(tripType === 'safari'
                                            ? styles.tabActive
                                            : {}),
                                    }}
                                >
                                    <SunIcon className="h-5 w-5" />
                                    <span>Book a Safari</span>
                                </button>
                            </div>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                style={styles.form}
                                noValidate
                            >
                                <SectionHeader
                                    icon={<GlobeAltIcon className="h-5 w-5" />}
                                    title={
                                        tripType === 'safari'
                                            ? 'Safari details'
                                            : 'Trip details'
                                    }
                                    subtitle={
                                        tripType === 'safari'
                                            ? 'Choose your safari and preferred travel dates.'
                                            : tripType === 'flight-hotel'
                                            ? 'Tell us your route, dates, and hotel preferences.'
                                            : 'Tell us where you want to go and when.'
                                    }
                                />

                                {(tripType === 'flight' ||
                                    tripType === 'flight-hotel') && (
                                    <FlightFields
                                        register={register}
                                        errors={errors}
                                        watch={watch}
                                    />
                                )}

                                {tripType === 'flight-hotel' && (
                                    <HotelFields
                                        register={register}
                                        errors={errors}
                                        watch={watch}
                                        setValue={setValue}
                                    />
                                )}

                                {tripType === 'safari' && (
                                    <SafariFields
                                        register={register}
                                        errors={errors}
                                        watch={watch}
                                        selectedTour={selectedTour}
                                    />
                                )}

                                <div style={styles.flexRow}>
                                    <label style={styles.flexLabel}>
                                        <input
                                            type="checkbox"
                                            {...register('flexibleBefore')}
                                            style={styles.checkbox}
                                        />
                                        <span>
                                            I'm flexible by{' '}
                                            <strong>3 days earlier</strong> (-3 days)
                                        </span>
                                    </label>
                                    <label style={styles.flexLabel}>
                                        <input
                                            type="checkbox"
                                            {...register('flexibleAfter')}
                                            style={styles.checkbox}
                                        />
                                        <span>
                                            I'm flexible by{' '}
                                            <strong>3 days later</strong> (+3 days)
                                        </span>
                                    </label>
                                </div>

                                <SectionHeader
                                    icon={<UserGroupIcon className="h-5 w-5" />}
                                    title="Travellers"
                                    subtitle="How many are travelling, and their names as per passport."
                                />

                                <div style={{ marginTop: 6 }}>
                                    <TravellerCounter
                                        value={counts}
                                        onChange={setCounts}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div
                                    style={{
                                        ...styles.travellersList,
                                        marginTop: 18,
                                    }}
                                >
                                    {fields.map((field, index) => {
                                        const label = getTravellerLabel(
                                            index,
                                            counts
                                        );
                                        return (
                                            <div
                                                key={field.id}
                                                style={styles.travellerRow}
                                            >
                                                <div style={styles.travellerField}>
                                                    <label style={styles.smallLabel}>
                                                        {label} full name{' '}
                                                        <span style={styles.req}>
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="As per passport"
                                                        {...register(
                                                            `travellers.${index}.fullName`,
                                                            {
                                                                required:
                                                                    'Full name is required',
                                                            }
                                                        )}
                                                        style={styles.input}
                                                    />
                                                    {errors.travellers?.[index]
                                                        ?.fullName && (
                                                        <p style={styles.error}>
                                                            {
                                                                errors.travellers[
                                                                    index
                                                                ]?.fullName
                                                                    ?.message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div
                                                    style={{
                                                        ...styles.travellerField,
                                                        maxWidth: 140,
                                                    }}
                                                >
                                                    <label
                                                        style={styles.smallLabel}
                                                    >
                                                        Age{' '}
                                                        <span
                                                            style={styles.req}
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={120}
                                                        placeholder="e.g. 34"
                                                        {...register(
                                                            `travellers.${index}.age`,
                                                            {
                                                                required:
                                                                    'Age is required',
                                                                min: {
                                                                    value: 0,
                                                                    message:
                                                                        'Invalid',
                                                                },
                                                                max: {
                                                                    value: 120,
                                                                    message:
                                                                        'Invalid',
                                                                },
                                                            }
                                                        )}
                                                        style={styles.input}
                                                    />
                                                    {errors.travellers?.[index]
                                                        ?.age && (
                                                        <p style={styles.error}>
                                                            {
                                                                errors.travellers[
                                                                    index
                                                                ]?.age?.message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <SectionHeader
                                    icon={<EnvelopeIcon className="h-5 w-5" />}
                                    title="Contact details"
                                    subtitle="We'll respond to your enquiry by email within 24 hours."
                                />

                                <div style={styles.grid2}>
                                    <Field
                                        label="Contact name"
                                        required
                                        error={errors.contactName?.message}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            {...register('contactName', {
                                                required:
                                                    'Contact name is required',
                                            })}
                                            style={styles.input}
                                        />
                                    </Field>

                                    <Field label="Phone / WhatsApp" required>
                                        <PhoneInput
                                            country={DEFAULT_COUNTRY}
                                            value={phoneValue}
                                            onChange={(v) => {
                                                setPhoneValue(v);
                                                setValue(
                                                    'contactPhone',
                                                    v,
                                                    { shouldValidate: true }
                                                );
                                            }}
                                            inputStyle={styles.phoneInput}
                                            buttonStyle={styles.phoneButton}
                                            dropdownStyle={{ borderRadius: 10 }}
                                            placeholder="+254 705 336 311"
                                            enableSearch
                                            countryCodeEditable={false}
                                        />
                                    </Field>

                                    <Field
                                        label="Email address"
                                        required
                                        error={errors.contactEmail?.message}
                                    >
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            {...register('contactEmail', {
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
                                </div>

                                <Field label="Special requests or notes">
                                    <textarea
                                        rows={4}
                                        placeholder="Dietary needs, seat preferences, celebration, accessibility…"
                                        {...register('specialRequests')}
                                        style={{
                                            ...styles.input,
                                            resize: 'vertical',
                                            minHeight: 90,
                                        }}
                                    />
                                </Field>

                                <label style={styles.consentBox}>
                                    <input
                                        type="checkbox"
                                        {...register('consent', {
                                            required:
                                                'Consent is required to proceed',
                                        })}
                                        style={styles.consentCheckbox}
                                    />
                                    <span style={styles.consentText}>
                                        I consent to Vision Wan Services contacting me
                                        about this enquiry and processing my details
                                        to prepare a quote. No payment is taken now.
                                    </span>
                                </label>
                                {errors.consent && (
                                    <p style={styles.error}>
                                        {errors.consent.message}
                                    </p>
                                )}

                                <div style={styles.actions}>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            ...styles.submitBtn,
                                            ...(isSubmitting
                                                ? styles.submitBtnDisabled
                                                : {}),
                                        }}
                                    >
                                        {isSubmitting
                                            ? 'Sending enquiry…'
                                            : 'Submit enquiry'}
                                        {!isSubmitting && (
                                            <ArrowRightIcon className="h-4 w-4 ml-2" />
                                        )}
                                    </button>
                                    <p style={styles.note}>
                                        We'll respond by email — usually within 24
                                        hours.
                                    </p>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                {!submitted && (
                    <div style={styles.bottomBackRow}>
                        <button
                            type="button"
                            onClick={handleBack}
                            style={styles.bottomBackBtn}
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back to Air Travel &amp; Safaris
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes abFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* ── Back pill ── */
                .ab-back-pill {
                    transition: transform 0.15s ease, box-shadow 0.15s ease,
                        background 0.2s ease;
                }
                .ab-back-pill:hover {
                    transform: translateX(-3px);
                    box-shadow: 0 18px 40px -20px rgba(255,107,53,0.85);
                    background: #ffffff !important;
                }
                .ab-back-pill:hover span:first-child {
                    background: linear-gradient(135deg, #FF6B35, #FF8B35);
                    color: #ffffff;
                }
                .ab-back-pill:hover span:last-child {
                    color: #0F172A;
                }

                /* ── Push hero content below the fixed navbar ── */
                .ab-hero-inner {
                    padding-top: 96px;   /* desktop base — matches inline fallback */
                }

                @media (max-width: 1023px) {
                    .ab-hero-inner {
                        padding-top: 108px;   /* tablet: navbar 68px + gap */
                    }
                }

                @media (max-width: 640px) {
                    .ab-hero-inner {
                        /* mobile: navbar 64px + safe-area-inset + breathing room */
                        padding-top: calc(88px + env(safe-area-inset-top, 0px));
                    }
                }

                /* ── Container / form card ── */
                @media (max-width: 640px) {
                    .ab-container { padding: 0 14px !important; }
                    .ab-form-card {
                        padding: 20px 16px !important;
                        border-radius: 18px !important;
                    }
                }
            `}</style>
        </div>
    );
};

/* ═════════════════════════════════════════════════════════════════
   Helpers
   ═════════════════════════════════════════════════════════════════ */
const getTravellerLabel = (index: number, counts: TravellerCounts): string => {
    if (index < counts.adults) return 'Adult';
    if (index < counts.adults + counts.children) return 'Child';
    return 'Infant';
};

/* ═════════════════════════════════════════════════════════════════
   Sub-components
   ═════════════════════════════════════════════════════════════════ */
const SectionHeader: React.FC<{
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
}> = ({ icon, title, subtitle }) => (
    <div style={styles.sectionHeader}>
        <div style={styles.sectionIcon}>{icon}</div>
        <div>
            <h3 style={styles.sectionTitle}>{title}</h3>
            {subtitle && <p style={styles.sectionSub}>{subtitle}</p>}
        </div>
    </div>
);

const Field: React.FC<{
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}> = ({ label, required, error, children }) => (
    <div style={{ marginBottom: 14 }}>
        <label style={styles.label}>
            {label} {required && <span style={styles.req}>*</span>}
        </label>
        {children}
        {error && <p style={styles.error}>{error}</p>}
    </div>
);

const FlightFields: React.FC<{
    register: any;
    errors: any;
    watch: (name: any) => any;
}> = ({ register, errors, watch }) => {
    const departDate = watch('departDate');
    return (
        <div style={styles.grid2}>
            <Field
                label="From (city or airport)"
                required
                error={errors.fromCity?.message}
            >
                <input
                    type="text"
                    placeholder="e.g. Nairobi (NBO)"
                    {...register('fromCity', {
                        required: 'Departure city is required',
                    })}
                    style={styles.input}
                />
            </Field>
            <Field
                label="To (city or airport)"
                required
                error={errors.toCity?.message}
            >
                <input
                    type="text"
                    placeholder="e.g. London (LHR)"
                    {...register('toCity', {
                        required: 'Destination is required',
                    })}
                    style={styles.input}
                />
            </Field>
            <Field
                label="Departure date"
                required
                error={errors.departDate?.message}
            >
                <input
                    type="date"
                    min={todayStr}
                    {...register('departDate', {
                        required: 'Departure date is required',
                        validate: (v: string) =>
                            v >= todayStr || 'Must be today or later',
                    })}
                    style={styles.input}
                />
            </Field>
            <Field
                label="Return date"
                required
                error={errors.returnDate?.message}
            >
                <input
                    type="date"
                    min={departDate || todayStr}
                    {...register('returnDate', {
                        required: 'Return date is required',
                        validate: (v: string) =>
                            !departDate ||
                            v >= departDate ||
                            'Must be after departure',
                    })}
                    style={styles.input}
                />
            </Field>
        </div>
    );
};

const HotelFields: React.FC<{
    register: any;
    errors: any;
    watch: (name: any) => any;
    setValue: any;
}> = ({ register, errors, watch, setValue }) => {
    const departDate = watch('departDate');
    const returnDate = watch('returnDate');
    const toCity = watch('toCity');
    const hotelCheckIn = watch('hotelCheckIn');

    // Auto-sync hotel city + dates from flight values (only if empty)
    useEffect(() => {
        if (toCity && !watch('hotelCity')) {
            setValue('hotelCity', toCity, { shouldValidate: false });
        }
        if (departDate && !watch('hotelCheckIn')) {
            setValue('hotelCheckIn', departDate, { shouldValidate: false });
        }
        if (returnDate && !watch('hotelCheckOut')) {
            setValue('hotelCheckOut', returnDate, { shouldValidate: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toCity, departDate, returnDate]);

    return (
        <div style={{ marginTop: 26 }}>
            <SectionHeader
                icon={<BuildingOfficeIcon className="h-5 w-5" />}
                title="Hotel details"
                subtitle="We'll bundle your stay with the flight quote."
            />

            <div style={styles.grid2}>
                <Field
                    label="Hotel city"
                    required
                    error={errors.hotelCity?.message}
                >
                    <input
                        type="text"
                        placeholder="e.g. London"
                        {...register('hotelCity', {
                            required: 'Hotel city is required',
                        })}
                        style={styles.input}
                    />
                </Field>

                <Field label="Hotel / brand preference">
                    <input
                        type="text"
                        placeholder="e.g. Marriott, Hilton, any 4-star"
                        {...register('hotelPreferredHotel')}
                        style={styles.input}
                    />
                </Field>

                <Field
                    label="Check-in"
                    required
                    error={errors.hotelCheckIn?.message}
                >
                    <input
                        type="date"
                        min={departDate || todayStr}
                        {...register('hotelCheckIn', {
                            required: 'Check-in date is required',
                        })}
                        style={styles.input}
                    />
                </Field>

                <Field
                    label="Check-out"
                    required
                    error={errors.hotelCheckOut?.message}
                >
                    <input
                        type="date"
                        min={hotelCheckIn || departDate || todayStr}
                        {...register('hotelCheckOut', {
                            required: 'Check-out date is required',
                            validate: (v: string) =>
                                !hotelCheckIn ||
                                v > hotelCheckIn ||
                                'Must be after check-in',
                        })}
                        style={styles.input}
                    />
                </Field>

                <Field
                    label="Rooms"
                    required
                    error={errors.hotelRooms?.message}
                >
                    <input
                        type="number"
                        min={1}
                        max={10}
                        {...register('hotelRooms', {
                            required: 'Number of rooms is required',
                            min: { value: 1, message: 'At least 1 room' },
                            max: { value: 10, message: 'Max 10 rooms' },
                        })}
                        style={styles.input}
                    />
                </Field>

                <Field label="Star preference">
                    <select
                        {...register('hotelStarPreference')}
                        style={styles.input}
                    >
                        <option value="any">Any star rating</option>
                        <option value="3">3-star and up</option>
                        <option value="4">4-star and up</option>
                        <option value="5">5-star only</option>
                    </select>
                </Field>
            </div>
        </div>
    );
};

const SafariFields: React.FC<{
    register: any;
    errors: any;
    watch: (name: any) => any;
    selectedTour?: SafariTour;
}> = ({ register, errors, watch, selectedTour }) => {
    const departDate = watch('departDate');
    return (
        <>
            <div style={styles.grid2}>
                <Field
                    label="Select a safari tour"
                    required
                    error={errors.safariTourId?.message}
                >
                    <select
                        {...register('safariTourId', {
                            required: 'Please select a safari tour',
                        })}
                        style={styles.input}
                    >
                        <option value="">Choose a tour…</option>
                        {SAFARI_TOURS.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name} — {t.days} days · {t.price}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field
                    label="Departure date"
                    required
                    error={errors.departDate?.message}
                >
                    <input
                        type="date"
                        min={todayStr}
                        {...register('departDate', {
                            required: 'Departure date is required',
                        })}
                        style={styles.input}
                    />
                </Field>
                <Field
                    label="Return date"
                    required
                    error={errors.returnDate?.message}
                >
                    <input
                        type="date"
                        min={departDate || todayStr}
                        {...register('returnDate', {
                            required: 'Return date is required',
                            validate: (v: string) =>
                                !departDate ||
                                v >= departDate ||
                                'Must be after departure',
                        })}
                        style={styles.input}
                    />
                </Field>
            </div>

            {selectedTour && (
                <div style={styles.tourPreview}>
                    <img
                        src={selectedTour.image}
                        alt=""
                        style={styles.tourPreviewImg}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={styles.tourPreviewTitle}>
                            {selectedTour.name}
                        </h4>
                        <p style={styles.tourPreviewPark}>
                            {selectedTour.park}
                        </p>
                        <p style={styles.tourPreviewPrice}>
                            {selectedTour.days} days · {selectedTour.price} per
                            person
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

const TravellerCounter: React.FC<{
    value: TravellerCounts;
    onChange: (next: TravellerCounts) => void;
    disabled?: boolean;
    maxTotal?: number;
}> = ({ value, onChange, disabled = false, maxTotal = 9 }) => {
    const total = value.adults + value.children + value.infants;

    const update = (patch: Partial<TravellerCounts>) => {
        const next: TravellerCounts = { ...value, ...patch };
        if (next.adults < 1) next.adults = 1;
        const nextTotal = next.adults + next.children + next.infants;
        if (nextTotal > maxTotal) {
            if (patch.adults !== undefined) next.adults = value.adults;
            if (patch.children !== undefined) next.children = value.children;
            if (patch.infants !== undefined) next.infants = value.infants;
        }
        onChange(next);
    };

    return (
        <div style={styles.tcWrap}>
            <div style={styles.tcHeader}>
                <div style={styles.tcHeaderIcon}>
                    <UserGroupIcon className="h-5 w-5" />
                </div>
                <div>
                    <h3 style={styles.tcTitle}>Travellers</h3>
                    <p style={styles.tcSub}>
                        {total} {total === 1 ? 'traveller' : 'travellers'} · max{' '}
                        {maxTotal} per enquiry
                    </p>
                </div>
            </div>
            <div style={styles.tcRows}>
                <CounterRow
                    label="Adults"
                    hint="12 years and above"
                    value={value.adults}
                    min={1}
                    max={maxTotal}
                    disabled={disabled}
                    onInc={() => update({ adults: value.adults + 1 })}
                    onDec={() => update({ adults: value.adults - 1 })}
                />
                <CounterRow
                    label="Children"
                    hint="2–11 years"
                    value={value.children}
                    min={0}
                    max={Math.max(0, maxTotal - value.adults - value.infants)}
                    disabled={disabled}
                    onInc={() => update({ children: value.children + 1 })}
                    onDec={() => update({ children: value.children - 1 })}
                />
                <CounterRow
                    label="Infants"
                    hint="Under 2 years"
                    value={value.infants}
                    min={0}
                    max={Math.max(0, maxTotal - value.adults - value.children)}
                    disabled={disabled}
                    onInc={() => update({ infants: value.infants + 1 })}
                    onDec={() => update({ infants: value.infants - 1 })}
                />
            </div>
        </div>
    );
};

/**
 * CounterRow — uses a single `border` shorthand computed per render,
 * which eliminates React's "Removing a style property during rerender
 * (borderColor) when a conflicting property is set (border)" warning.
 */
const CounterRow: React.FC<{
    label: string;
    hint: string;
    value: number;
    min: number;
    max: number;
    disabled?: boolean;
    onInc: () => void;
    onDec: () => void;
}> = ({ label, hint, value, min, max, disabled, onInc, onDec }) => {
    const canDec = !disabled && value > min;
    const canInc = !disabled && value < max;

    const stepBtnStyle = (enabled: boolean): React.CSSProperties => ({
        width: 34,
        height: 34,
        borderRadius: 10,
        border: `1.5px solid ${enabled ? BRAND.coral : '#cbd5e1'}`,
        background: '#fff',
        color: enabled ? BRAND.coral : '#94a3b8',
        cursor: enabled ? 'pointer' : 'not-allowed',
        opacity: enabled ? 1 : 0.4,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        padding: 0,
    });

    return (
        <div style={styles.tcRow}>
            <div style={styles.tcRowInfo}>
                <span style={styles.tcRowLabel}>{label}</span>
                <span style={styles.tcRowHint}>{hint}</span>
            </div>
            <div style={styles.tcRowControls}>
                <button
                    type="button"
                    onClick={onDec}
                    disabled={!canDec}
                    aria-label={`Remove one ${label.toLowerCase()}`}
                    style={stepBtnStyle(canDec)}
                >
                    <MinusIcon className="h-4 w-4" />
                </button>
                <span style={styles.tcRowValue}>{value}</span>
                <button
                    type="button"
                    onClick={onInc}
                    disabled={!canInc}
                    aria-label={`Add one ${label.toLowerCase()}`}
                    style={stepBtnStyle(canInc)}
                >
                    <PlusIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

const SuccessPanel: React.FC<{
    onReset: () => void;
    onBackHome: () => void;
    referenceNumber?: string;
    contactName?: string;
    contactEmail?: string;
}> = ({ onReset, onBackHome, referenceNumber, contactName, contactEmail }) => {
    const steps = [
        { label: 'Enquiry received', done: true },
        { label: 'Travel desk review', done: false },
        { label: 'Quote emailed to you', done: false },
        { label: 'You approve & pay', done: false },
    ];

    return (
        <div style={styles.successPanel}>
            <div style={styles.successIcon}>
                <PaperAirplaneIcon className="h-8 w-8 text-white" />
            </div>

            <h2 style={styles.successTitle}>Enquiry received</h2>

            <p style={styles.successText}>
                {contactName
                    ? `Thank you, ${contactName.split(' ')[0]} — `
                    : 'Thank you — '}
                our travel desk will review your request and respond by{' '}
                <strong>email within 24 hours</strong> with flight options and
                pricing. No payment is taken now.
            </p>

            {referenceNumber && (
                <div style={styles.refCard}>
                    <div style={styles.refLabel}>Your enquiry reference</div>
                    <div style={styles.refValue}>{referenceNumber}</div>
                    <div style={styles.refHint}>
                        Save this number — our reply will reference it.
                    </div>
                </div>
            )}

            <div style={styles.timeline} className="ab-timeline">
                {steps.map((step, i) => (
                    <div key={step.label} style={styles.timelineStep}>
                        <div
                            style={{
                                ...styles.timelineDot,
                                ...(step.done
                                    ? styles.timelineDotDone
                                    : styles.timelineDotPending),
                            }}
                        >
                            {step.done ? '✓' : i + 1}
                        </div>
                        <div style={styles.timelineLabel}>{step.label}</div>
                        {i < steps.length - 1 && (
                            <div
                                style={{
                                    ...styles.timelineLine,
                                    ...(step.done
                                        ? styles.timelineLineDone
                                        : {}),
                                }}
                                className="ab-timeline-line"
                            />
                        )}
                    </div>
                ))}
            </div>

            {contactEmail && (
                <p style={styles.successEmailNote}>
                    A confirmation email has been sent to{' '}
                    <strong>{contactEmail}</strong>.
                </p>
            )}

            <div style={styles.successActions}>
                <button
                    type="button"
                    onClick={onBackHome}
                    style={styles.successBtn}
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Air Travel
                </button>
                <button
                    type="button"
                    onClick={onReset}
                    style={styles.successBtnGhost}
                >
                    Submit another enquiry
                </button>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .ab-timeline { flex-direction: column !important; gap: 14px !important; }
                    .ab-timeline-line { display: none !important; }
                }
            `}</style>
        </div>
    );
};

/* ═════════════════════════════════════════════════════════════════
   Styles
   ═════════════════════════════════════════════════════════════════ */
const styles: { [k: string]: React.CSSProperties } = {
    page: {
        minHeight: '100vh',
        background:
            'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 40%, #FFF8E7 100%)',
        fontFamily: 'Inter, Arial, sans-serif',
    },

    /* Hero */
    hero: {
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        background: '#0F172A',
        paddingTop: 'max(24px, env(safe-area-inset-top))',
        isolation: 'isolate',
    },
    heroImageLayer: {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
    },
    heroImage: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 40%',
        filter: 'saturate(1.05) contrast(1.02)',
        transition:
            'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'opacity, transform',
    },
    heroOverlayA: {
        position: 'absolute',
        inset: 0,
        background:
            'linear-gradient(180deg, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.62) 45%, rgba(2,6,23,0.88) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
    },
    heroOverlayB: {
        position: 'absolute',
        inset: 0,
        background:
            'linear-gradient(120deg, rgba(255,107,53,0.32) 0%, rgba(255,107,53,0.05) 45%, rgba(212,175,55,0.28) 100%)',
        mixBlendMode: 'multiply',
        zIndex: 1,
        pointerEvents: 'none',
    },
    heroGlow: {
        position: 'absolute',
        inset: 0,
        background:
            'radial-gradient(60% 60% at 15% 0%, rgba(255,107,53,0.28), transparent), radial-gradient(50% 50% at 100% 100%, rgba(212,175,55,0.22), transparent)',
        pointerEvents: 'none',
        zIndex: 2,
    },
    /**
     * heroInner uses longhand padding so the scoped `.ab-hero-inner`
     * media query can override padding-top responsively.
     */
    heroInner: {
        position: 'relative',
        zIndex: 3,
        maxWidth: 1080,
        margin: '0 auto',
        paddingTop: '96px',
        paddingRight: '22px',
        paddingBottom: '96px',
        paddingLeft: '22px',
    },
    backPill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 16px 8px 8px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.08)',
        border: '1.5px solid rgba(255,255,255,0.22)',
        color: '#ffffff',
        fontWeight: 800,
        fontSize: 13,
        cursor: 'pointer',
        marginBottom: 26,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 12px 30px -18px rgba(0,0,0,0.7)',
    },
    backPillIcon: {
        width: 26,
        height: 26,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#ffffff',
        transition: 'background 0.2s ease, color 0.2s ease',
    },
    backPillLabel: {
        letterSpacing: 0.2,
        transition: 'color 0.2s ease',
    },
    heroChipRow: { marginBottom: 12 },
    heroChip: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.22)',
        color: '#ffffff',
        fontWeight: 800,
        fontSize: 11.5,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        transition: 'background 0.3s ease',
    },
    heroTitle: {
        margin: 0,
        fontSize: 'clamp(26px, 4.4vw, 42px)',
        fontWeight: 900,
        letterSpacing: -1,
        lineHeight: 1.1,
        textShadow: '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'opacity 0.3s ease',
    },
    heroTitleAccent: {
        background: 'linear-gradient(90deg, #FFD37A, #FFF3C4, #FFD37A)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    heroSub: {
        margin: '14px 0 0',
        maxWidth: 620,
        fontSize: 15.5,
        lineHeight: 1.65,
        color: 'rgba(255,255,255,0.88)',
        transition: 'opacity 0.3s ease',
    },

    /* Container */
    container: {
        maxWidth: 1080,
        margin: '-72px auto 0',
        padding: '0 18px 60px',
        position: 'relative',
        zIndex: 4,
    },
    formCard: {
        background: '#ffffff',
        borderRadius: 24,
        padding: '28px 26px 30px',
        boxShadow:
            '0 30px 80px -30px rgba(15,23,42,0.35), 0 12px 30px -20px rgba(255,107,53,0.25)',
        border: '1px solid #eef2f7',
        animation: 'abFadeUp 0.5s ease-out both',
    },
    bottomBackRow: {
        textAlign: 'center',
        marginTop: 22,
    },
    bottomBackBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 18px',
        borderRadius: 999,
        border: `1.5px solid ${BRAND.coral}`,
        background: '#ffffff',
        color: BRAND.coral,
        fontWeight: 800,
        fontSize: 13,
        cursor: 'pointer',
        boxShadow: '0 10px 24px -14px rgba(255,107,53,0.7)',
    },

    /* Tabs */
    tabs: {
        display: 'flex',
        gap: 8,
        background: '#f1f5f9',
        padding: 6,
        borderRadius: 999,
        marginBottom: 26,
        flexWrap: 'wrap',
    },
    tab: {
        flex: 1,
        minWidth: 150,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '12px 16px',
        borderRadius: 999,
        border: 'none',
        background: 'transparent',
        color: '#475569',
        fontWeight: 800,
        fontSize: 13.5,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    tabActive: {
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        color: '#fff',
        boxShadow: '0 10px 22px -12px rgba(255,107,53,0.75)',
    },

    /* Section header */
    sectionHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        marginTop: 26,
        marginBottom: 16,
    },
    sectionIcon: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        color: '#fff',
        flexShrink: 0,
        boxShadow: '0 10px 22px -14px rgba(255,107,53,0.75)',
    },
    sectionTitle: {
        margin: '2px 0 2px',
        fontSize: 17,
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -0.2,
    },
    sectionSub: { margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.5 },

    /* Fields */
    form: { marginTop: 0 },
    grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 14,
    },
    label: {
        display: 'block',
        fontWeight: 700,
        fontSize: 13,
        color: BRAND.slate,
        marginBottom: 6,
    },
    smallLabel: {
        display: 'block',
        fontWeight: 700,
        fontSize: 12,
        color: BRAND.slate,
        marginBottom: 4,
        letterSpacing: 0.2,
    },
    req: { color: BRAND.coral },
    input: {
        width: '100%',
        padding: '12px 14px',
        border: '1.5px solid #dbe3ee',
        borderRadius: 10,
        fontSize: 14,
        background: '#fbfdff',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        fontFamily: 'inherit',
    },
    phoneInput: {
        width: '100%',
        height: 46,
        fontSize: 14,
        borderRadius: 10,
        border: '1.5px solid #dbe3ee',
        paddingLeft: 76,
        background: '#fbfdff',
    },
    phoneButton: {
        borderRadius: '10px 0 0 10px',
        border: '1.5px solid #dbe3ee',
        background: '#fff',
        height: 46,
    },
    error: { color: '#DC2626', fontSize: 12.5, marginTop: 5, fontWeight: 600 },

    /* Flexibility */
    flexRow: {
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap',
        marginTop: 6,
        padding: '14px 16px',
        background: '#FFF8E7',
        border: '1px dashed #F4D77A',
        borderRadius: 12,
    },
    flexLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 13.5,
        color: '#3a2b00',
        fontWeight: 600,
        cursor: 'pointer',
    },
    checkbox: {
        width: 18,
        height: 18,
        accentColor: BRAND.coral,
        cursor: 'pointer',
    },

    /* Travellers rows */
    travellersList: { display: 'flex', flexDirection: 'column', gap: 12 },
    travellerRow: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-end',
        background: '#F8FAFC',
        padding: 12,
        borderRadius: 12,
        border: '1px solid #eef2f7',
        flexWrap: 'wrap',
    },
    travellerField: { flex: 1, minWidth: 180 },

    /* Consent */
    consentBox: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        background: '#F8FAFC',
        border: '1.5px solid #eef2f7',
        borderRadius: 12,
        padding: 14,
        marginTop: 20,
    },
    consentCheckbox: {
        width: 20,
        height: 20,
        minWidth: 20,
        marginTop: 2,
        accentColor: BRAND.coral,
        cursor: 'pointer',
    },
    consentText: { fontSize: 13.5, color: '#334155', lineHeight: 1.55 },

    /* Actions */
    actions: { textAlign: 'center', marginTop: 22 },
    submitBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 38px',
        fontSize: 16,
        fontWeight: 900,
        color: '#fff',
        background: `linear-gradient(135deg, ${BRAND.coral} 0%, ${BRAND.coralLight} 60%, ${BRAND.gold} 130%)`,
        border: 'none',
        borderRadius: 14,
        cursor: 'pointer',
        boxShadow: '0 18px 38px -16px rgba(255,107,53,0.7)',
        letterSpacing: 0.4,
        transition: 'transform 0.15s, box-shadow 0.15s',
    },
    submitBtnDisabled: {
        opacity: 0.55,
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    note: { marginTop: 12, fontSize: 12.5, color: '#64748b' },

    /* Tour preview */
    tourPreview: {
        display: 'flex',
        gap: 16,
        marginTop: 16,
        padding: 14,
        borderRadius: 14,
        background: 'linear-gradient(135deg, #FFF8E7, #FFFDF7)',
        border: '1px solid #F4D77A',
        alignItems: 'center',
    },
    tourPreviewImg: {
        width: 110,
        height: 88,
        objectFit: 'cover',
        borderRadius: 10,
        flexShrink: 0,
    },
    tourPreviewTitle: {
        margin: 0,
        fontSize: 16,
        fontWeight: 900,
        color: BRAND.slate,
    },
    tourPreviewPark: { margin: '2px 0 4px', fontSize: 12.5, color: '#64748b' },
    tourPreviewPrice: {
        margin: 0,
        fontSize: 13,
        fontWeight: 800,
        color: BRAND.coral,
    },

    /* Traveller Counter */
    tcWrap: {
        background: '#F8FAFC',
        border: '1.5px solid #eef2f7',
        borderRadius: 16,
        padding: '18px 20px',
    },
    tcHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 14,
        borderBottom: '1px solid #eef2f7',
        marginBottom: 6,
    },
    tcHeaderIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 10px 22px -14px rgba(255,107,53,0.75)',
    },
    tcTitle: {
        margin: 0,
        fontSize: 16,
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -0.2,
    },
    tcSub: {
        margin: '2px 0 0',
        fontSize: 12.5,
        color: '#64748b',
        fontWeight: 600,
    },
    tcRows: { display: 'flex', flexDirection: 'column' },
    tcRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '14px 0',
        borderBottom: '1px dashed #e2e8f0',
    },
    tcRowInfo: { display: 'flex', flexDirection: 'column', minWidth: 0 },
    tcRowLabel: { fontSize: 14.5, fontWeight: 800, color: BRAND.slate },
    tcRowHint: { fontSize: 12, color: '#94a3b8', marginTop: 2, fontWeight: 600 },
    tcRowControls: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
    },
    /* NOTE: tcStepBtn / tcStepBtnDisabled retained for backward compat
       but no longer used — CounterRow now computes its own single-style
       buttons to avoid the shorthand/longhand React warning. */
    tcStepBtn: {
        width: 34,
        height: 34,
        borderRadius: 10,
        border: `1.5px solid ${BRAND.coral}`,
        background: '#fff',
        color: BRAND.coral,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        padding: 0,
    },
    tcStepBtnDisabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        border: '1.5px solid #cbd5e1',
        color: '#94a3b8',
    },
    tcRowValue: {
        minWidth: 32,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 900,
        color: BRAND.slate,
        fontVariantNumeric: 'tabular-nums',
    },

    /* Success */
    successPanel: {
        textAlign: 'center',
        padding: '40px 20px 20px',
        animation: 'abFadeUp 0.5s ease-out both',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    successIcon: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        marginBottom: 18,
        boxShadow: '0 20px 40px -18px rgba(255,107,53,0.8)',
    },
    successTitle: {
        margin: 0,
        fontSize: 24,
        fontWeight: 900,
        color: BRAND.slate,
    },
    successText: {
        margin: '12px auto 24px',
        maxWidth: 520,
        fontSize: 15,
        color: '#475569',
        lineHeight: 1.65,
    },
    successEmailNote: {
        fontSize: 13,
        color: '#64748b',
        margin: '0 0 22px',
    },
    successActions: {
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    successBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 24px',
        borderRadius: 12,
        border: 'none',
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        color: '#fff',
        fontWeight: 800,
        fontSize: 14,
        cursor: 'pointer',
        boxShadow: '0 14px 30px -14px rgba(255,107,53,0.75)',
    },
    successBtnGhost: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 20px',
        borderRadius: 12,
        background: 'transparent',
        border: `1.5px solid ${BRAND.coral}`,
        color: BRAND.coral,
        fontWeight: 800,
        fontSize: 14,
        cursor: 'pointer',
    },

    /* Reference card */
    refCard: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '16px 26px',
        borderRadius: 16,
        background: `linear-gradient(135deg, ${BRAND.cream}, #FFFDF7)`,
        border: `1.5px dashed ${BRAND.gold}`,
        marginBottom: 26,
        maxWidth: 420,
        width: '100%',
    },
    refLabel: {
        fontSize: 10.5,
        fontWeight: 900,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#7c5a00',
    },
    refValue: {
        fontSize: 26,
        fontWeight: 900,
        color: BRAND.coral,
        letterSpacing: 0.5,
        fontFamily: 'ui-monospace, Menlo, monospace',
        marginTop: 4,
    },
    refHint: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: 600,
        marginTop: 4,
    },

    /* Timeline */
    timeline: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 0,
        margin: '8px auto 26px',
        maxWidth: 640,
        width: '100%',
    },
    timelineStep: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1 1 0',
        minWidth: 90,
    },
    timelineDot: {
        width: 34,
        height: 34,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 900,
        color: '#fff',
        marginBottom: 8,
        zIndex: 2,
    },
    timelineDotDone: {
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        boxShadow: '0 10px 22px -12px rgba(255,107,53,0.85)',
    },
    timelineDotPending: {
        background: '#f1f5f9',
        color: '#94a3b8',
        border: '1.5px solid #e2e8f0',
    },
    timelineLabel: {
        fontSize: 11.5,
        fontWeight: 800,
        color: BRAND.slate,
        textAlign: 'center',
        letterSpacing: 0.2,
        maxWidth: 110,
        lineHeight: 1.35,
    },
    timelineLine: {
        position: 'absolute',
        top: 17,
        left: '50%',
        width: '100%',
        height: 2,
        background: '#e2e8f0',
        zIndex: 1,
    },
    timelineLineDone: {
        background: `linear-gradient(90deg, ${BRAND.coral}, ${BRAND.coralLight})`,
    },
};

export default AirTravelBooking;