import * as React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    StarIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    UserIcon,
    PhoneIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    PaperAirplaneIcon,
    HeartIcon,
    BuildingOfficeIcon,
    CalendarDaysIcon,
    ShieldCheckIcon,
    ClockIcon,
    ArrowRightIcon,
    TruckIcon,
    HomeModernIcon,
    UserCircleIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */
interface FeedbackForm {
    name: string;
    email: string;
    phone: string;
    category: string;
    rating: number;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    rating?: string;
    message?: string;
}

/* ─────────────────────────────────────────────────────────────
   Categories — now using Heroicons instead of emoji
   ───────────────────────────────────────────────────────────── */
const FEEDBACK_CATEGORIES = [
    { id: 'car-hire', label: 'Car Hire', icon: TruckIcon },
    { id: 'accommodation', label: 'Accommodation', icon: HomeModernIcon },
    { id: 'customer-service', label: 'Customer Service', icon: ChatBubbleLeftRightIcon },
    { id: 'booking-process', label: 'Booking Process', icon: CalendarDaysIcon },
    { id: 'driver-experience', label: 'Driver Experience', icon: UserCircleIcon },
    { id: 'general', label: 'General Feedback', icon: SparklesIcon },
];

const API_URL = `${API_BASE_URL}/api/feedback`;

const Feedback: React.FC = () => {
    const [form, setForm] = useState<FeedbackForm>({
        name: '',
        email: '',
        phone: '',
        category: 'car-hire',
        rating: 0,
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [hoverRating, setHoverRating] = useState(0);

    /* ───── Validation ───── */
    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!form.name.trim()) {
            newErrors.name = 'Please enter your name';
        } else if (form.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!form.email.trim()) {
            newErrors.email = 'Please enter your email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!form.rating) {
            newErrors.rating = 'Please give us a rating';
        }

        if (!form.message.trim()) {
            newErrors.message = 'Please share your feedback';
        } else if (form.message.trim().length < 10) {
            newErrors.message = 'Please write at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* ───── Submit ───── */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    submittedAt: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    page: window.location.href,
                }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            setStatus('success');

            setTimeout(() => {
                setForm({
                    name: '',
                    email: '',
                    phone: '',
                    category: 'car-hire',
                    rating: 0,
                    message: '',
                });
                setStatus('idle');
            }, 5000);
        } catch (err) {
            console.error('Feedback submission failed:', err);
            setStatus('error');
        }
    };

    /* ───── Field Updater ───── */
    const update = <K extends keyof FeedbackForm>(key: K, value: FeedbackForm[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [key]: undefined }));
        }
    };

    return (
        <>
            <Helmet>
                <title>Share Your Feedback | Vision Wan Services</title>
                <meta
                    name="description"
                    content="Tell us about your experience with Vision Wan Services. Your feedback helps us improve our car hire and accommodation services."
                />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-orange-50/30">

                {/* ═══════════════════════════════════════════════════════
                    HERO SECTION — HD Background Image
                    ═══════════════════════════════════════════════════════ */}
                <div className="relative overflow-hidden pt-28 lg:pt-40 pb-24 lg:pb-32 min-h-[560px] lg:min-h-[640px] flex items-center">
                    {/* HD Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2400&q=95"
                            alt="Happy customer giving feedback"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-gray-900/85 to-[#1a0f08]/90" />
                        {/* Subtle orange glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/15 via-transparent to-transparent" />
                        {/* Bottom fade into page */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/60 to-transparent" />
                    </div>

                    {/* Decorative blur blobs */}
                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#FF6B35]/15 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#FF8B35]/10 rounded-full blur-[140px] pointer-events-none" />

                    {/* Grid pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-[fadeUp_0.6s_ease-out]">
                            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase">
                                We Value Your Voice
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.05] animate-[fadeUp_0.7s_ease-out]">
                            Share Your{' '}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-[#FF7B35] via-[#FF8B35] to-[#FF9B35] bg-clip-text text-transparent">
                                    Experience
                                </span>
                                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35]/0 via-[#FF6B35] to-[#FF6B35]/0 rounded-full" />
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-[fadeUp_0.8s_ease-out]">
                            Your feedback helps us deliver exceptional car hire and accommodation
                            services. Tell us what you loved — or what we can improve.
                        </p>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 animate-[fadeUp_0.9s_ease-out]">
                            <div className="flex items-center gap-2 text-white/85">
                                <ShieldCheckIcon className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm font-medium">100% Confidential</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/85">
                                <ClockIcon className="h-4 w-4 text-[#FF6B35]" />
                                <span className="text-sm font-medium">Replies in 24hrs</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/85">
                                <CheckCircleIcon className="h-4 w-4 text-cyan-400" />
                                <span className="text-sm font-medium">Read by leadership</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════
                    MAIN CONTENT
                    ═══════════════════════════════════════════════════════ */}
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-12 lg:-mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

                        {/* ═══════════ FORM CARD ═══════════ */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-3xl shadow-[0_25px_70px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
                                {status === 'success' ? (
                                    <div className="p-10 sm:p-16 text-center">
                                        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 mb-6 shadow-2xl shadow-emerald-500/40 animate-[scaleIn_0.4s_ease-out]">
                                            <CheckCircleIcon className="h-12 w-12 text-white" />
                                        </div>
                                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                                            Thank You!
                                        </h2>
                                        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed text-base">
                                            Your feedback has been received. Our team reviews every
                                            message, and we'll reach out personally if a follow-up is needed.
                                        </p>
                                        <Link
                                            to="/"
                                            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                                                       bg-gradient-to-br from-[#FF6B35] to-[#E85A25] text-white font-bold
                                                       shadow-[0_10px_28px_-8px_rgba(255,107,53,0.7)]
                                                       hover:shadow-[0_16px_36px_-8px_rgba(255,107,53,0.9)]
                                                       transition-all duration-300 active:scale-[0.98]"
                                        >
                                            <span>Back to Home</span>
                                            <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
                                        {/* Form Header */}
                                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#E85A25] text-white shadow-lg shadow-[#FF6B35]/30">
                                                <ChatBubbleLeftRightIcon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                                                    Feedback Form
                                                </h2>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    Fields marked <span className="text-[#FF6B35] font-semibold">*</span> are required
                                                </p>
                                            </div>
                                        </div>

                                        {/* Name + Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-semibold text-gray-800 mb-2"
                                                >
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={form.name}
                                                        onChange={(e) => update('name', e.target.value)}
                                                        placeholder="Jane Doe"
                                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm
                                                                   placeholder:text-gray-400
                                                                   focus:outline-none focus:ring-2 transition-all duration-200
                                                                   ${
                                                                       errors.name
                                                                           ? 'border-red-300 bg-red-50/30 focus:ring-red-200'
                                                                           : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#FF6B35] focus:ring-[#FF6B35]/20'
                                                                   }`}
                                                    />
                                                </div>
                                                {errors.name && (
                                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                                        <ExclamationCircleIcon className="h-3.5 w-3.5" />
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-semibold text-gray-800 mb-2"
                                                >
                                                    Email Address *
                                                </label>
                                                <div className="relative">
                                                    <EnvelopeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={form.email}
                                                        onChange={(e) => update('email', e.target.value)}
                                                        placeholder="jane@example.com"
                                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm
                                                                   placeholder:text-gray-400
                                                                   focus:outline-none focus:ring-2 transition-all duration-200
                                                                   ${
                                                                       errors.email
                                                                           ? 'border-red-300 bg-red-50/30 focus:ring-red-200'
                                                                           : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#FF6B35] focus:ring-[#FF6B35]/20'
                                                                   }`}
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                                        <ExclamationCircleIcon className="h-3.5 w-3.5" />
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-semibold text-gray-800 mb-2"
                                            >
                                                Phone Number{' '}
                                                <span className="text-gray-400 font-normal">
                                                    (optional)
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    value={form.phone}
                                                    onChange={(e) => update('phone', e.target.value)}
                                                    placeholder="+254 705 336 311"
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm
                                                               placeholder:text-gray-400
                                                               focus:outline-none focus:ring-2 focus:bg-white focus:border-[#FF6B35] focus:ring-[#FF6B35]/20
                                                               transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        {/* Category — HEROICONS VERSION */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-3">
                                                What would you like to tell us about? *
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                                {FEEDBACK_CATEGORIES.map((cat) => {
                                                    const isActive = form.category === cat.id;
                                                    const IconComponent = cat.icon;
                                                    return (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => update('category', cat.id)}
                                                            className={`group flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-sm font-medium
                                                                       border transition-all duration-200 text-left
                                                                       ${
                                                                           isActive
                                                                               ? 'border-[#FF6B35] bg-[#FF6B35]/5 text-[#FF6B35] shadow-sm'
                                                                               : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                                                       }`}
                                                        >
                                                            <IconComponent
                                                                className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                                                                    isActive
                                                                        ? 'text-[#FF6B35]'
                                                                        : 'text-gray-400 group-hover:text-gray-600'
                                                                }`}
                                                            />
                                                            <span className="truncate">{cat.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-3">
                                                How would you rate your experience? *
                                            </label>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <div className="flex items-center gap-1.5">
                                                    {[1, 2, 3, 4, 5].map((star) => {
                                                        const isFilled = star <= (hoverRating || form.rating);
                                                        return (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => {
                                                                    update('rating', star);
                                                                    setHoverRating(0);
                                                                }}
                                                                onMouseEnter={() => setHoverRating(star)}
                                                                onMouseLeave={() => setHoverRating(0)}
                                                                aria-label={`Rate ${star} out of 5`}
                                                                className="transition-transform duration-200 hover:scale-125 active:scale-95"
                                                            >
                                                                {isFilled ? (
                                                                    <StarSolid className="h-9 w-9 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)]" />
                                                                ) : (
                                                                    <StarIcon className="h-9 w-9 text-gray-300 hover:text-amber-300 transition-colors" />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {form.rating > 0 && (
                                                    <span className="text-sm font-semibold text-gray-700 animate-[fadeIn_0.3s_ease-out]">
                                                        {['Poor', 'Fair', 'Good', 'Great', 'Excellent'][
                                                            form.rating - 1
                                                        ]}
                                                    </span>
                                                )}
                                            </div>
                                            {errors.rating && (
                                                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                                                    <ExclamationCircleIcon className="h-3.5 w-3.5" />
                                                    {errors.rating}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-sm font-semibold text-gray-800 mb-2"
                                            >
                                                Your Feedback *
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={6}
                                                value={form.message}
                                                onChange={(e) => update('message', e.target.value)}
                                                placeholder="Tell us about your experience — what went well, what could be better, or any suggestions you have..."
                                                className={`w-full px-4 py-3 rounded-xl border text-sm resize-none
                                                           placeholder:text-gray-400
                                                           focus:outline-none focus:ring-2 transition-all duration-200
                                                           ${
                                                               errors.message
                                                                   ? 'border-red-300 bg-red-50/30 focus:ring-red-200'
                                                                   : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#FF6B35] focus:ring-[#FF6B35]/20'
                                                           }`}
                                            />
                                            <div className="flex items-center justify-between mt-1.5">
                                                {errors.message ? (
                                                    <p className="text-xs text-red-600 flex items-center gap-1">
                                                        <ExclamationCircleIcon className="h-3.5 w-3.5" />
                                                        {errors.message}
                                                    </p>
                                                ) : (
                                                    <span />
                                                )}
                                                <span
                                                    className={`text-xs ${
                                                        form.message.length > 1000
                                                            ? 'text-red-500'
                                                            : 'text-gray-400'
                                                    }`}
                                                >
                                                    {form.message.length}/1000
                                                </span>
                                            </div>
                                        </div>

                                        {/* Error banner */}
                                        {status === 'error' && (
                                            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                                                <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-semibold text-red-800">
                                                        Something went wrong
                                                    </p>
                                                    <p className="text-xs text-red-600 mt-1">
                                                        We couldn't submit your feedback. Please try again
                                                        or email us directly at{' '}
                                                        <a
                                                            href="mailto:visionwanservices@gmail.com"
                                                            className="underline font-semibold"
                                                        >
                                                            visionwanservices@gmail.com
                                                        </a>
                                                        .
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl
                                                       bg-gradient-to-br from-[#FF7A3D] via-[#FF6B35] to-[#E85A25] text-white font-bold
                                                       shadow-[0_10px_28px_-8px_rgba(255,107,53,0.7)]
                                                       hover:shadow-[0_16px_36px_-8px_rgba(255,107,53,0.9)]
                                                       transition-all duration-300
                                                       hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.985]
                                                       disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/50 focus-visible:ring-offset-2"
                                        >
                                            <span className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
                                                <span className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-[900ms] ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                            </span>

                                            {status === 'submitting' ? (
                                                <>
                                                    <svg
                                                        className="animate-spin h-5 w-5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                        />
                                                    </svg>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <PaperAirplaneIcon className="h-5 w-5" />
                                                    <span>Submit Feedback</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* ═══════════ SIDEBAR ═══════════ */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* ───── Your Voice Matters ───── */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-7 text-white shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)]">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6B35]/20 rounded-full -translate-y-20 translate-x-20 blur-3xl pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF8B35]/15 rounded-full translate-y-16 -translate-x-16 blur-3xl pointer-events-none" />

                                <div className="relative">
                                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#E85A25] shadow-lg shadow-[#FF6B35]/40 mb-5">
                                        <HeartIcon className="h-6 w-6 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold tracking-tight mb-3">
                                        Your Voice Matters
                                    </h3>

                                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                        Every piece of feedback helps us refine our service. Whether you
                                        loved your experience or spotted something we can improve, we read
                                        and act on every message.
                                    </p>

                                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

                                    <ul className="space-y-4">
                                        {[
                                            'Read by our leadership team',
                                            'Response within 24 hours if needed',
                                            'Direct impact on service improvements',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B35]/20 flex-shrink-0 mt-0.5">
                                                    <CheckCircleIcon className="h-4 w-4 text-[#FF6B35]" />
                                                </span>
                                                <span className="text-sm text-gray-200 leading-snug pt-0.5">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* ───── Alternative Contact ───── */}
                            <div className="bg-white rounded-3xl p-7 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-5 tracking-tight">
                                    Prefer Another Way?
                                </h3>

                                <div className="space-y-3">
                                    <a
                                        href="https://wa.me/254705336311?text=Hello%20Vision%20Wan!%20I%20have%20some%20feedback%20to%20share."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 p-3.5 rounded-2xl
                                                   border border-gray-100 hover:border-[#25D366]/40 hover:bg-[#25D366]/5
                                                   transition-all duration-300"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] flex-shrink-0">
                                            <svg className="h-5 w-5 fill-current" viewBox="0 0 32 32">
                                                <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.64.86 5.083 2.317 7.058L5 29l7.155-1.88a11.95 11.95 0 0 0 3.848.636C22.623 27.756 28 22.373 28 15.753 28 9.134 22.623 3 16.003 3zm5.523 17.2c-.3-.15-1.78-.88-2.055-.98-.275-.1-.476-.15-.676.15-.2.3-.776.98-.952 1.18-.176.2-.35.225-.65.075-.3-.15-1.27-.47-2.42-1.5-.894-.798-1.497-1.784-1.673-2.084-.175-.3-.02-.46.132-.61.137-.136.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.235-.243-.585-.49-.505-.676-.515l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.115 3.225 5.125 4.52.717.31 1.277.495 1.714.634.72.23 1.376.198 1.893.12.578-.086 1.78-.726 2.03-1.426.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-900">
                                                WhatsApp
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Chat with us instantly
                                            </p>
                                        </div>
                                        <ArrowRightIcon className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
                                    </a>

                                    <a
                                        href="mailto:visionwanservices@gmail.com?subject=Feedback%20for%20Vision%20Wan"
                                        className="group flex items-center gap-3 p-3.5 rounded-2xl
                                                   border border-gray-100 hover:border-[#FF6B35]/40 hover:bg-[#FF6B35]/5
                                                   transition-all duration-300"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF6B35]/10 text-[#FF6B35] flex-shrink-0">
                                            <EnvelopeIcon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-900">
                                                Email Us
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                visionwanservices@gmail.com
                                            </p>
                                        </div>
                                        <ArrowRightIcon className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
                                    </a>

                                    <a
                                        href="tel:+254705336311"
                                        className="group flex items-center gap-3 p-3.5 rounded-2xl
                                                   border border-gray-100 hover:border-[#FF6B35]/40 hover:bg-[#FF6B35]/5
                                                   transition-all duration-300"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF6B35]/10 text-[#FF6B35] flex-shrink-0">
                                            <PhoneIcon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-900">
                                                Call Us
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                +254 (705) 336 311
                                            </p>
                                        </div>
                                        <ArrowRightIcon className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
                                    </a>
                                </div>
                            </div>

                            {/* ───── Response Stats ───── */}
                            <div className="bg-gradient-to-br from-[#FF6B35]/5 to-[#FF8B35]/5 rounded-3xl p-7 border border-[#FF6B35]/10">
                                <div className="flex items-center gap-2 mb-5">
                                    <BuildingOfficeIcon className="h-5 w-5 text-[#FF6B35]" />
                                    <h3 className="text-sm font-bold tracking-wider text-gray-800 uppercase">
                                        Response Stats
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-baseline justify-between mb-1.5">
                                            <span className="text-xs font-medium text-gray-600">
                                                Feedback reviewed
                                            </span>
                                            <span className="text-lg font-black text-gray-900">
                                                100%
                                            </span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]"
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-baseline justify-between mb-1.5">
                                            <span className="text-xs font-medium text-gray-600">
                                                Response within 24hrs
                                            </span>
                                            <span className="text-lg font-black text-gray-900">
                                                94%
                                            </span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]"
                                                style={{ width: '94%' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-5 border-t border-[#FF6B35]/15 flex items-center gap-2 text-xs text-gray-500">
                                    <CalendarDaysIcon className="h-4 w-4" />
                                    <span>Updated monthly</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </>
    );
};

export default Feedback;