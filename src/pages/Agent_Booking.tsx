import * as React from 'react';
import { useState, useRef } from 'react';
import Agent_BookingForm from '../components/Agent_BookingForm';
import type { Agent_BookingFormRef } from '../components/Agent_BookingForm';
import {
    ShieldCheckIcon,
    CheckBadgeIcon,
    CalendarIcon,
    UserIcon,
    DocumentArrowUpIcon,
    ClipboardDocumentCheckIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    BriefcaseIcon,
    BoltIcon,
    ChartBarIcon,
    GlobeAltIcon,
    ClockIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

/* ============================================================
   AGENT BOOKING PAGE
   Design intent:
   - Distinct from customer flow (darker, data-driven, executive)
   - Agent / trade-partner focused messaging
   - Hero image with overlay + animated stats
   - Clean corporate dashboard-style cards
   - Fully responsive from 320px up
   ============================================================ */

const Agent_Booking: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(1);
    const bookingFormRef = useRef<Agent_BookingFormRef>(null);

    const handleNextStep = async () => {
        if (bookingFormRef.current) {
            const isValid = await bookingFormRef.current.validateStep();
            if (isValid && activeStep < 4) {
                setActiveStep(activeStep + 1);
            }
        }
    };

    const handlePrevStep = () => {
        if (activeStep > 1) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleComplete = () => {
        if (bookingFormRef.current) {
            bookingFormRef.current.resetForm();
        }
        setActiveStep(1);
    };

    const handleStepClick = async (step: number) => {
        if (step < activeStep) {
            setActiveStep(step);
        } else if (step > activeStep && bookingFormRef.current) {
            const isValid = await bookingFormRef.current.validateStep();
            if (isValid) {
                setActiveStep(step);
            }
        }
    };

    const processSteps = [
        {
            step: 1,
            icon: UserIcon,
            title: 'Agent Details',
            description: 'Agent & ID',
            color: 'from-[#0F172A] to-[#1E293B]',
        },
        {
            step: 2,
            icon: CalendarIcon,
            title: 'Itinerary',
            description: 'Dates & vehicle',
            color: 'from-[#0F172A] to-[#1E293B]',
        },
        {
            step: 3,
            icon: DocumentArrowUpIcon,
            title: 'Documents',
            description: 'Upload & verify',
            color: 'from-[#0F172A] to-[#1E293B]',
        },
        {
            step: 4,
            icon: ClipboardDocumentCheckIcon,
            title: 'Confirm',
            description: 'Review & submit',
            color: 'from-[#0F172A] to-[#1E293B]',
        },
    ];

    const features = [
        {
            icon: BoltIcon,
            title: 'Priority Processing',
            description: 'Agent submissions are reviewed ahead of standard bookings.',
        },
        {
            icon: ChartBarIcon,
            title: 'Volume Pricing',
            description: 'Access negotiated trade rates across the full fleet.',
        },
        {
            icon: GlobeAltIcon,
            title: 'Multi-Location Access',
            description: 'Book pickups and drop-offs across all partner stations.',
        },
        {
            icon: ClockIcon,
            title: '24/7 Trade Desk',
            description: 'Direct line to our agent support team, any hour.',
        },
    ];

    const agentsStats = [
        { value: '150+', label: 'Verified Agents' },
        { value: '12K+', label: 'Bookings Processed' },
        { value: '98%',   label: 'Approval Rate' },
        { value: '<2h',   label: 'Avg. Turnaround' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
            {/* ============================================================
                INJECTED ANIMATIONS — scoped to this page only
                ============================================================ */}
            <style>{`
                @keyframes ab-fade-up {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes ab-fade-in {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes ab-slide-right {
                    from { opacity: 0; transform: translateX(-24px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes ab-pulse-ring {
                    0%   { transform: scale(0.95); opacity: 0.7; }
                    70%  { transform: scale(1.25); opacity: 0; }
                    100% { transform: scale(1.25); opacity: 0; }
                }
                @keyframes ab-shimmer {
                    0%   { background-position: -600px 0; }
                    100% { background-position: 600px 0; }
                }
                @keyframes ab-float {
                    0%,100% { transform: translateY(0); }
                    50%     { transform: translateY(-6px); }
                }
                .ab-fade-up   { animation: ab-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
                .ab-fade-in   { animation: ab-fade-in 1.1s ease-out both; }
                .ab-slide-right { animation: ab-slide-right 0.7s cubic-bezier(0.16,1,0.3,1) both; }
                .ab-pulse-ring::before {
                    content: '';
                    position: absolute;
                    inset: -6px;
                    border-radius: 9999px;
                    border: 2px solid rgba(255,107,53,0.35);
                    animation: ab-pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite;
                }
                .ab-shimmer {
                    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%);
                    background-size: 600px 100%;
                    animation: ab-shimmer 3.5s linear infinite;
                }
                .ab-float { animation: ab-float 5s ease-in-out infinite; }
                .ab-delay-100 { animation-delay: 0.1s; }
                .ab-delay-200 { animation-delay: 0.2s; }
                .ab-delay-300 { animation-delay: 0.3s; }
                .ab-delay-400 { animation-delay: 0.4s; }
                .ab-delay-500 { animation-delay: 0.5s; }
                .ab-grid-lines {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
                    background-size: 44px 44px;
                }
                .ab-noise {
                    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/></svg>");
                }
            `}</style>

            {/* ============================================================
                HERO — full-bleed image with dark executive overlay
                ============================================================ */}
            <section className="relative isolate overflow-hidden bg-[#0B1120] min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center">
                {/* Background image */}
                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80"
                    alt="Executive vehicle fleet"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-45 ab-fade-in"
                    loading="eager"
                />

                {/* Dark gradient overlay — corporate */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120]/95 via-[#0B1120]/85 to-[#0B1120]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 ab-grid-lines opacity-40 pointer-events-none" />

                {/* Accent glow */}
                <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-[#FF6B35]/10 blur-3xl" />

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        {/* Left — copy */}
                        <div className="lg:col-span-7 ab-fade-up">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3.5 py-1.5 mb-6">
                                <BriefcaseIcon className="h-3.5 w-3.5 text-[#FF6B35]" />
                                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-white/90">
                                    AGENT PORTAL · TRADE ACCESS
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-5">
                                Book for your clients
                                <span className="block bg-gradient-to-r from-[#FF6B35] to-[#FF9A5B] bg-clip-text text-transparent">
                                    in under two minutes.
                                </span>
                            </h1>

                            <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
                                A dedicated reservation desk built for travel agents, tour operators, and
                                corporate accounts. Negotiated rates, priority processing, and a paper trail
                                your clients will trust.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                <a
                                    href="#agent-form"
                                    className="group inline-flex items-center gap-2 rounded-lg bg-[#FF6B35] px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#FF6B35]/25 hover:bg-[#ff7d4d] transition-colors"
                                >
                                    Start a booking
                                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </a>
                                <a
                                    href="tel:+254705336311"
                                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-colors"
                                >
                                    <PhoneIcon className="h-4 w-4" />
                                    Talk to trade desk
                                </a>
                            </div>

                            {/* Trust line */}
                            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-white/60">
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="h-4 w-4 text-[#FF6B35]" />
                                    <span>Verified trade partner network</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheckIcon className="h-4 w-4 text-[#FF6B35]" />
                                    <span>PCI-compliant document handling</span>
                                </div>
                            </div>
                        </div>

                        {/* Right — floating stat card */}
                        <div className="lg:col-span-5 ab-fade-up ab-delay-200">
                            <div className="relative">
                                {/* card */}
                                <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7 shadow-2xl">
                                    {/* shimmer strip */}
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px ab-shimmer" />

                                    <div className="flex items-center justify-between mb-5">
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-[0.18em] text-white/50 mb-1">
                                                LIVE NETWORK
                                            </p>
                                            <h3 className="text-white text-base sm:text-lg font-bold">
                                                Trade performance
                                            </h3>
                                        </div>
                                        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B35]/15 ab-pulse-ring">
                                            <BoltIcon className="h-4 w-4 text-[#FF6B35]" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {agentsStats.map((s) => (
                                            <div
                                                key={s.label}
                                                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
                                            >
                                                <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                                                    {s.value}
                                                </div>
                                                <div className="text-[11px] sm:text-xs text-white/55 leading-tight">
                                                    {s.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-white/60">
                                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                                            Systems operational
                                        </div>
                                        <span className="text-[11px] text-white/40">
                                            Updated just now
                                        </span>
                                    </div>
                                </div>

                                {/* Decorative accent behind card */}
                                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-[#FF6B35]/20 to-transparent blur-2xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom hairline */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* ============================================================
                STEP INDICATOR — lighter, cleaner, distinct from customer page
                ============================================================ */}
            <section className="relative -mt-10 sm:-mt-12 lg:-mt-14 z-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] p-5 sm:p-6 lg:p-7">
                        <div className="hidden md:block mb-5">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                <span className="font-semibold tracking-wide uppercase">
                                    Progress
                                </span>
                                <span>
                                    Step <span className="font-semibold text-slate-900">{activeStep}</span> of 4
                                </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF9A5B] transition-all duration-500 ease-out"
                                    style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                            {processSteps.map((step) => {
                                const isActive = activeStep === step.step;
                                const isComplete = activeStep > step.step;
                                return (
                                    <button
                                        key={step.step}
                                        type="button"
                                        onClick={() => handleStepClick(step.step)}
                                        className={`group relative flex flex-col items-start text-left rounded-xl border p-3 sm:p-4 transition-all duration-300 ${
                                            isActive
                                                ? 'border-[#FF6B35] bg-[#FFF7F2] shadow-sm'
                                                : isComplete
                                                ? 'border-slate-200 bg-white hover:border-slate-300'
                                                : 'border-slate-200 bg-slate-50/60'
                                        }`}
                                    >
                                        <div
                                            className={`mb-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg ${
                                                isActive
                                                    ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF9A5B] text-white shadow-sm'
                                                    : isComplete
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-white border border-slate-200 text-slate-400'
                                            }`}
                                        >
                                            {isComplete ? (
                                                <CheckCircleIcon className="h-5 w-5" />
                                            ) : (
                                                <step.icon className="h-5 w-5" />
                                            )}
                                        </div>
                                        <div className="text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase text-slate-400 mb-1">
                                            Step {step.step}
                                        </div>
                                        <div
                                            className={`text-sm sm:text-base font-bold leading-tight mb-0.5 ${
                                                isActive ? 'text-[#0F172A]' : 'text-slate-800'
                                            }`}
                                        >
                                            {step.title}
                                        </div>
                                        <div className="text-[11px] sm:text-xs text-slate-500 hidden sm:block">
                                            {step.description}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                MAIN — form + sidebar
                ============================================================ */}
            <section
                id="agent-form"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Sidebar */}
                    <aside className="lg:col-span-4 lg:order-2">
                        <div className="lg:sticky lg:top-8 space-y-5">
                            {/* Benefits card */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckBadgeIcon className="h-4 w-4 text-[#FF6B35]" />
                                    <span className="text-[11px] font-semibold tracking-[0.14em] text-[#FF6B35] uppercase">
                                        Agent Benefits
                                    </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">
                                    Built for trade partners
                                </h3>

                                <ul className="space-y-4">
                                    {features.map((f, i) => (
                                        <li
                                            key={i}
                                            className="ab-slide-right flex items-start gap-3"
                                            style={{ animationDelay: `${i * 0.08}s` }}
                                        >
                                            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
                                                <f.icon className="h-4.5 w-4.5 text-[#FF6B35]" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 mb-0.5">
                                                    {f.title}
                                                </p>
                                                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                                                    {f.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support card — dark */}
                            <div className="relative overflow-hidden rounded-2xl bg-[#0B1120] p-6 sm:p-7 text-white">
                                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#FF6B35]/15 blur-2xl" />
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-3">
                                        <ChatBubbleLeftRightIcon className="h-4 w-4 text-[#FF6B35]" />
                                        <span className="text-[11px] font-semibold tracking-[0.14em] text-[#FF6B35] uppercase">
                                            Trade Support
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">
                                        Direct line to our desk
                                    </h3>
                                    <p className="text-sm text-white/70 leading-relaxed mb-5">
                                        Our agent support team is available 24/7 for urgent bookings,
                                        rate negotiations, and amendments.
                                    </p>

                                    <div className="space-y-2">
                                        <a
                                            href="tel:+254705336311"
                                            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium hover:bg-white/[0.08] transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <PhoneIcon className="h-4 w-4 text-[#FF6B35]" />
                                                Kenya Desk
                                            </span>
                                            <span className="text-white/60 text-xs">+254 705 336 311</span>
                                        </a>
                                        <a
                                            href="tel:+447397549590"
                                            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium hover:bg-white/[0.08] transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <PhoneIcon className="h-4 w-4 text-[#FF6B35]" />
                                                UK Desk
                                            </span>
                                            <span className="text-white/60 text-xs">+44 7397 549 590</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Small trust badge */}
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                                <ShieldCheckIcon className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                <p className="text-xs text-slate-600 leading-snug">
                                    All client data is encrypted at rest and in transit.
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Form column */}
                    <div className="lg:col-span-8 lg:order-1 min-w-0">
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] overflow-hidden">
                            {/* Form header */}
                            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 sm:px-7 lg:px-8 py-5 sm:py-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="inline-flex items-center gap-1.5 mb-1">
                                            <BriefcaseIcon className="h-3.5 w-3.5 text-[#FF6B35]" />
                                            <span className="text-[10px] font-semibold tracking-[0.14em] text-[#FF6B35] uppercase">
                                                Agent Reservation
                                            </span>
                                        </div>
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                                            Agent Booking Form
                                        </h2>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                            Enter the client's details and trip requirements.
                                        </p>
                                    </div>

                                    <div className="hidden md:flex flex-shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                                        <span className="text-xs font-medium text-slate-500">Step</span>
                                        <span className="text-sm font-bold text-[#FF6B35]">{activeStep}</span>
                                        <span className="text-xs font-medium text-slate-400">/ 4</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form body */}
                            <div className="px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
                                <Agent_BookingForm
                                    ref={bookingFormRef}
                                    activeStep={activeStep}
                                    onNextStep={handleNextStep}
                                    onPrevStep={handlePrevStep}
                                    onComplete={handleComplete}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                FAQ — data-dense corporate look
                ============================================================ */}
            <section className="bg-white border-y border-slate-200 py-14 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-10 sm:mb-14">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-[11px] font-semibold tracking-[0.14em] text-[#FF6B35] uppercase">
                                Frequently Asked
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                            Agent booking, answered.
                        </h2>
                        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                            The details most trade partners ask before their first reservation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        {[
                            {
                                q: 'Do agents need a separate account?',
                                a: 'Yes. Agent bookings are processed through a distinct workflow with dedicated support and trade rates. Contact our desk to be onboarded.',
                            },
                            {
                                q: 'How are agent rates different from retail?',
                                a: 'Agent rates are pre-negotiated volume pricing. The rate applied depends on the vehicle class and rental duration — it is shown live during the booking flow.',
                            },
                            {
                                q: 'What documents does the client need?',
                                a: 'A valid ID or passport, a driving licence, and proof of payment. Agents can upload these on behalf of the client during booking.',
                            },
                            {
                                q: 'Can I amend a booking after submission?',
                                a: 'Yes — use the booking ID from the confirmation email to amend dates, vehicle, or client details at any time before pickup.',
                            },
                            {
                                q: 'How fast are agent bookings confirmed?',
                                a: 'The vast majority of agent submissions are confirmed within two hours during business hours, and within four hours overnight.',
                            },
                            {
                                q: 'Is there a fee to use the agent portal?',
                                a: 'No platform fee. You pay only the agreed trade rate for the vehicle and any additional services requested.',
                            },
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="group rounded-xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-[#FF6B35]/40 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-500 group-hover:bg-[#FFF7F2] group-hover:border-[#FF6B35]/30 group-hover:text-[#FF6B35] transition-colors">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="min-w-0">
                                        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-[#FF6B35] transition-colors">
                                            {f.q}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            {f.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                CLOSING CTA — dark strip
                ============================================================ */}
            <section className="relative overflow-hidden bg-[#0B1120] py-14 sm:py-20">
                <div className="absolute inset-0 ab-grid-lines opacity-30 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FF6B35]/10 blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 mb-6">
                        <CheckBadgeIcon className="h-3.5 w-3.5 text-[#FF6B35]" />
                        <span className="text-[11px] font-semibold tracking-[0.18em] text-white/80">
                            READY WHEN YOU ARE
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                        Ready to make your next booking?
                    </h2>
                    <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Use the form above, or reach out to our trade desk and we'll take it from there.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="#agent-form"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B35] px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#FF6B35]/25 hover:bg-[#ff7d4d] transition-colors"
                        >
                            Start a booking
                            <ArrowRightIcon className="h-4 w-4" />
                        </a>
                        <a
                            href="mailto:visionwanservices@gmail.com"
                            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-colors"
                        >
                            Email the desk
                        </a>
                    </div>

                    {/* micro-footer */}
                    <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
                        <span>© {new Date().getFullYear()} Vision One Services — Agent Portal</span>
                        <span className="flex items-center gap-2">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            All systems operational
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Agent_Booking;