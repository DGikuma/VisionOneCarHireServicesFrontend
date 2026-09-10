import * as React from 'react';
import { useState, useRef } from 'react';
import BookingForm from '../components/BookingForm';
import type { BookingFormRef } from '../components/BookingForm';
import {
    ShieldCheckIcon,
    CheckBadgeIcon,
    LockClosedIcon,
    CalendarIcon,
    MapPinIcon,
    UserIcon,
    DocumentArrowUpIcon,
    ClipboardDocumentCheckIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const BookingPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(1);
    const bookingFormRef = useRef<BookingFormRef>(null);

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
            title: 'Your Details',
            description: 'Contact info and identification',
            color: 'from-[#FF6B35] to-[#FF8B35]'
        },
        {
            step: 2,
            icon: CalendarIcon,
            title: 'Rental Details',
            description: 'Dates, location, and vehicle',
            color: 'from-[#FF8B35] to-[#FF7B35]'
        },
        {
            step: 3,
            icon: DocumentArrowUpIcon,
            title: 'Upload Documents',
            description: 'ID and driving licence',
            color: 'from-[#FF7B35] to-[#FF6B35]'
        },
        {
            step: 4,
            icon: ClipboardDocumentCheckIcon,
            title: 'Review & Submit',
            description: 'Confirm your booking',
            color: 'from-[#FF6B35] to-[#FF8B35]'
        }
    ];

    const features = [
        {
            icon: LockClosedIcon,
            title: 'Secure Booking',
            description: 'Enterprise-grade security for all your data'
        },
        {
            icon: CalendarIcon,
            title: 'Flexible Dates',
            description: 'Modify or cancel up to 24 hours before pickup'
        },
        {
            icon: MapPinIcon,
            title: 'Global Access',
            description: 'Pickup and drop-off at 50+ premium locations'
        },
        {
            icon: ChatBubbleLeftRightIcon,
            title: 'Dedicated Support',
            description: '24/7 concierge service for premium clients'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
            {/* ============================================
                HERO SECTION — responsive from mobile to desktop
                ============================================ */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-14 sm:py-20 lg:py-24">
                {/* Animated Background Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px h-px bg-[#FF6B35] rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.3}s`,
                                boxShadow: '0 0 20px 2px rgba(255, 107, 53, 0.5)'
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full border border-[#FF6B35]/20 mb-4 sm:mb-6">
                            <span className="text-xs sm:text-sm font-semibold text-[#FF6B35]">PREMIUM BOOKING</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                                Executive Reservation
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
                            Experience seamless booking for our premium fleet. Reserve your luxury vehicle
                            with our four-step executive process and enjoy white-glove service.
                        </p>

                        {/* Stats badges — compact on mobile */}
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 min-w-[100px]">
                                <span className="text-xl sm:text-2xl font-bold text-white">4</span>
                                <p className="text-xs sm:text-sm text-gray-400">Simple Steps</p>
                            </div>
                            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 min-w-[100px]">
                                <span className="text-xl sm:text-2xl font-bold text-white">0%</span>
                                <p className="text-xs sm:text-sm text-gray-400">Booking Fee</p>
                            </div>
                            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 min-w-[100px]">
                                <span className="text-xl sm:text-2xl font-bold text-white">24/7</span>
                                <p className="text-xs sm:text-sm text-gray-400">Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================
                STEP INDICATOR — responsive layout
                ============================================ */}
            <div className="relative -mt-10 sm:-mt-12 lg:-mt-16 z-10">
                <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 lg:p-8">
                        <div className="relative">
                            {/* Progress Line — desktop only */}
                            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
                                <div
                                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] transition-all duration-500"
                                    style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
                                />
                            </div>

                            {/* Step Circles — 2 columns on mobile, 4 on desktop */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                                {processSteps.map((step) => (
                                    <div
                                        key={step.step}
                                        className={`relative group transition-all duration-300 ${activeStep === step.step ? 'transform scale-105' : ''
                                            }`}
                                        onClick={() => handleStepClick(step.step)}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            {/* Step Circle — smaller on mobile */}
                                            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 ${activeStep === step.step
                                                ? `bg-gradient-to-br ${step.color} shadow-lg shadow-[#FF6B35]/30`
                                                : 'bg-gray-100 border-2 border-gray-200'
                                                } transition-all duration-300 cursor-pointer`}>
                                                {activeStep > step.step ? (
                                                    <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                                                ) : (
                                                    <step.icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${activeStep === step.step ? 'text-white' : 'text-gray-400'
                                                        }`} />
                                                )}

                                                {activeStep === step.step && (
                                                    <div className="absolute -inset-2 sm:-inset-3 border-2 border-[#FF6B35]/30 rounded-full animate-pulse" />
                                                )}
                                            </div>

                                            {/* Step Content */}
                                            <div>
                                                <div className="flex items-center justify-center mb-1 sm:mb-2">
                                                    <span className={`text-[10px] sm:text-xs md:text-sm font-semibold ${activeStep === step.step
                                                        ? 'text-[#FF6B35]'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        Step {step.step}
                                                    </span>
                                                </div>

                                                <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 ${activeStep === step.step
                                                    ? 'text-gray-900'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    {step.title}
                                                </h3>

                                                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 hidden sm:block">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================
                MAIN CONTENT
                ============================================ */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {/* Left Column - Features (sticky on desktop only) */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24">
                            <div className="mb-6 sm:mb-10">
                                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FF6B35]/10 rounded-full mb-4 sm:mb-6">
                                    <CheckBadgeIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF6B35]" />
                                    <span className="text-xs sm:text-sm font-semibold text-[#FF6B35]">PREMIUM FEATURES</span>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    Executive Booking Benefits
                                </h2>

                                <div className="space-y-3 sm:space-y-6">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-[#FF6B35]/30 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 group-hover:border-[#FF6B35]/20 transition-colors duration-300">
                                                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF6B35]" />
                                                </div>
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1 group-hover:text-[#FF6B35] transition-colors duration-300">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guarantee Card */}
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] p-5 sm:p-6">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />

                                <div className="relative">
                                    <ShieldCheckIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white mb-3 sm:mb-4" />

                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                                        Premium Guarantee
                                    </h3>

                                    <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6">
                                        Your booking is protected with our executive guarantee, ensuring premium service and complete satisfaction.
                                    </p>

                                    <div className="flex items-center text-white/80">
                                        <div className="h-2 w-2 bg-white rounded-full mr-2" />
                                        <span className="text-xs sm:text-sm">24/7 Premium Support</span>
                                    </div>
                                    <div className="flex items-center text-white/80 mt-2">
                                        <div className="h-2 w-2 bg-white rounded-full mr-2" />
                                        <span className="text-xs sm:text-sm">Flexible Cancellation</span>
                                    </div>
                                    <div className="flex items-center text-white/80 mt-2">
                                        <div className="h-2 w-2 bg-white rounded-full mr-2" />
                                        <span className="text-xs sm:text-sm">Price Match Guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Form */}
                    <div className="lg:col-span-2 min-w-0">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            {/* Form Header */}
                            <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 lg:p-8 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                                    <div className="min-w-0">
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                                            Executive Reservation Form
                                        </h2>
                                        <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                                            Complete the form below to reserve your premium vehicle
                                        </p>
                                    </div>

                                    <div className="hidden md:block flex-shrink-0 ml-4">
                                        <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-lg">
                                            <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                                                Step {activeStep} of 4
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-3 sm:p-4 lg:p-8">
                                <BookingForm
                                    ref={bookingFormRef}
                                    activeStep={activeStep}
                                    onNextStep={handleNextStep}
                                    onPrevStep={handlePrevStep}
                                    onComplete={handleComplete}
                                />
                            </div>
                        </div>

                        {/* Booking Assistance */}
                        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                                        Need Assistance with Your Booking?
                                    </h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                                        Our premium concierge team is available 24/7 to assist you
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0">
                                    <button
                                        onClick={() => window.open('tel:+254705336311')}
                                        className="group px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm lg:text-base whitespace-nowrap"
                                    >
                                        <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                                        <span>Call: +254 (705) 336 311</span>
                                    </button>
                                    <button
                                        onClick={() => window.open('tel:+447397549590')}
                                        className="group px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm lg:text-base whitespace-nowrap"
                                    >
                                        <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                                        <span>Call: +44 (7397) 549 590</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================
                FAQ SECTION — responsive
                ============================================ */}
            <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FF6B35]/10 rounded-full mb-4 sm:mb-6">
                            <ChatBubbleLeftRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF6B35]" />
                            <span className="text-xs sm:text-sm font-semibold text-[#FF6B35]">EXECUTIVE FAQ</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Premium Booking Information
                        </h2>

                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                            Answers to common questions about our executive booking process
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {[
                            {
                                question: 'Is payment required at the time of booking?',
                                answer: 'No payment is required during the reservation process. Payment is only processed when you pick up your premium vehicle, allowing for flexible travel planning.'
                            },
                            {
                                question: 'What documentation is required for premium bookings?',
                                answer: 'We require a valid driver\'s license, a major credit card, and proof of insurance if you opt for coverage through your provider. International clients should bring their passport and international driver\'s permit.'
                            },
                            {
                                question: 'Can I modify or cancel my executive booking?',
                                answer: 'Yes, premium bookings can be modified or cancelled up to 24 hours before your scheduled pickup at no charge. Within 24 hours, a nominal administrative fee applies for changes.'
                            },
                            {
                                question: 'What insurance coverage is included with my booking?',
                                answer: 'All bookings include comprehensive basic insurance. Additional premium coverage options are available, including zero-deductible protection, personal accident insurance, and damage waiver options.'
                            },
                            {
                                question: 'Are there age requirements for premium vehicle rentals?',
                                answer: 'Yes, drivers must be at least 25 years old with a minimum of 3 years driving experience. Corporate accounts may have different age requirements subject to approval.'
                            },
                            {
                                question: 'What is your fuel policy for premium vehicles?',
                                answer: 'Vehicles are provided with a full tank and should be returned with a full tank. We offer a convenient fuel purchase option where you can prepay for a full tank at a competitive rate.'
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-[#FF6B35]/20 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                                            <div className="h-2 w-2 bg-[#FF6B35] rounded-full" />
                                        </div>
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#FF6B35] transition-colors duration-300">
                                            {faq.question}
                                        </h3>
                                        <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============================================
                FINAL ASSURANCE — responsive
                ============================================ */}
            <div className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FF6B35]/10 rounded-full mb-4 sm:mb-6">
                        <ShieldCheckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF6B35]" />
                        <span className="text-xs sm:text-sm font-semibold text-[#FF6B35]">EXECUTIVE ASSURANCE</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Your Journey, Our Commitment
                    </h2>

                    <p className="text-sm sm:text-base lg:text-xl text-gray-600 mb-6 sm:mb-10 max-w-3xl mx-auto px-2">
                        Every booking is backed by our premium guarantee, ensuring an exceptional experience
                        from reservation to return.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
                        <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">Award-Winning Service</h4>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600">Recognized for excellence in premium mobility</p>
                        </div>
                        <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">Premium Partnership</h4>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600">Trusted by Fortune 500 companies</p>
                        </div>
                        <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">Exclusive Benefits</h4>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600">Priority access and premium amenities</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;