import * as React from 'react';
import { useState, useRef } from 'react';
import BookingForm, { BookingFormRef } from '../components/BookingForm';
import {
    ShieldCheckIcon,
    DocumentTextIcon,
    CheckBadgeIcon,
    SparklesIcon,
    LockClosedIcon,
    CalendarIcon,
    MapPinIcon,
    UserIcon,
    CreditCardIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const BookingPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(1);
    const bookingFormRef = useRef<BookingFormRef>(null);
    // Fixed: Removed duplicate formRef since we're using bookingFormRef

    const handleNextStep = async () => {
        if (bookingFormRef.current) {
            const isValid = await bookingFormRef.current.validateStep();
            if (isValid && activeStep < 3) {
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
        // Reset form and steps
        if (bookingFormRef.current) {
            bookingFormRef.current.resetForm();
        }
        setActiveStep(1);
    };

    const handleStepClick = async (step: number) => {
        if (step < activeStep) {
            // Allow going back without validation
            setActiveStep(step);
        } else if (step > activeStep && bookingFormRef.current) {
            // Validate current step before moving forward
            const isValid = await bookingFormRef.current.validateStep();
            if (isValid) {
                setActiveStep(step);
            }
        }
    };

    const processSteps = [
        {
            step: 1,
            icon: DocumentTextIcon,
            title: 'Reservation Details',
            description: 'Select your vehicle and travel dates',
            color: 'from-[#FF6B35] to-[#FF8B35]'
        },
        {
            step: 2,
            icon: UserIcon,
            title: 'Personal Information',
            description: 'Provide your contact and driver details',
            color: 'from-[#FF8B35] to-[#FF7B35]'
        },
        {
            step: 3,
            icon: CreditCardIcon,
            title: 'Confirmation',
            description: 'Review and confirm your booking',
            color: 'from-[#FF7B35] to-[#FF6B35]'
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full border border-[#FF6B35]/20 mb-6">
                            <SparklesIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">PREMIUM BOOKING</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                                Executive Reservation
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Experience seamless booking for our premium fleet. Reserve your luxury vehicle
                            with our three-step executive process and enjoy white-glove service.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                                <span className="text-2xl font-bold text-white">3</span>
                                <p className="text-sm text-gray-400">Simple Steps</p>
                            </div>
                            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                                <span className="text-2xl font-bold text-white">0%</span>
                                <p className="text-sm text-gray-400">Booking Fee</p>
                            </div>
                            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                                <span className="text-2xl font-bold text-white">24/7</span>
                                <p className="text-sm text-gray-400">Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Process Steps */}
            <div className="relative -mt-16 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
                                <div
                                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] transition-all duration-500"
                                    style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {processSteps.map((step) => (
                                    <div
                                        key={step.step}
                                        className={`relative group transition-all duration-300 ${activeStep === step.step ? 'transform scale-105' : ''
                                            }`}
                                        onClick={() => handleStepClick(step.step)}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            {/* Step Circle */}
                                            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-4 ${activeStep === step.step
                                                ? `bg-gradient-to-br ${step.color} shadow-lg shadow-[#FF6B35]/30`
                                                : 'bg-gray-100 border-2 border-gray-200'
                                                } transition-all duration-300 cursor-pointer`}>
                                                {activeStep > step.step ? (
                                                    <CheckCircleIcon className="h-8 w-8 text-white" />
                                                ) : (
                                                    <step.icon className={`h-8 w-8 ${activeStep === step.step ? 'text-white' : 'text-gray-400'
                                                        }`} />
                                                )}

                                                {/* Active Step Indicator */}
                                                {activeStep === step.step && (
                                                    <div className="absolute -inset-3 border-2 border-[#FF6B35]/30 rounded-full animate-pulse" />
                                                )}
                                            </div>

                                            {/* Step Content */}
                                            <div>
                                                <div className="flex items-center justify-center mb-2">
                                                    <span className={`text-sm font-semibold ${activeStep === step.step
                                                        ? 'text-[#FF6B35]'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        Step {step.step}
                                                    </span>
                                                </div>

                                                <h3 className={`text-lg font-bold mb-2 ${activeStep === step.step
                                                    ? 'text-gray-900'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    {step.title}
                                                </h3>

                                                <p className="text-sm text-gray-600">
                                                    {step.description}
                                                </p>
                                            </div>

                                            {/* Connection Line for Mobile */}
                                            {step.step < 3 && (
                                                <div className="md:hidden absolute top-8 right-0 w-1/2 h-0.5 bg-gray-200 transform translate-x-1/2">
                                                    <div
                                                        className={`h-full ${activeStep > step.step
                                                            ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]'
                                                            : ''
                                                            }`}
                                                        style={{ width: activeStep > step.step ? '100%' : '0%' }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Features */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="mb-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                                    <CheckBadgeIcon className="h-4 w-4 text-[#FF6B35]" />
                                    <span className="text-sm font-semibold text-[#FF6B35]">PREMIUM FEATURES</span>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Executive Booking Benefits
                                </h2>

                                <div className="space-y-6">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#FF6B35]/30 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 group-hover:border-[#FF6B35]/20 transition-colors duration-300">
                                                    <feature.icon className="h-6 w-6 text-[#FF6B35]" />
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#FF6B35] transition-colors duration-300">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guarantee Card */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] p-6">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />

                                <div className="relative">
                                    <ShieldCheckIcon className="h-12 w-12 text-white mb-4" />

                                    <h3 className="text-xl font-bold text-white mb-3">
                                        Premium Guarantee
                                    </h3>

                                    <p className="text-white/90 mb-6">
                                        Your booking is protected with our executive guarantee, ensuring premium service and complete satisfaction.
                                    </p>

                                    <div className="flex items-center text-white/80">
                                        <div className="h-2 w-2 bg-white rounded-full mr-2" />
                                        <span className="text-sm">24/7 Premium Support</span>
                                    </div>
                                    <div className="flex items-center text-white/80 mt-2">
                                        <div className="h-2 w-2 bg-white rounded-full mr-2" />
                                        <span className="text-sm">Flexible Cancellation</span>
                                    </div>
                                    <div className="flex items-center text-white/80 mt-2">
                                        <div className="h-2 w-2 bg-white rounded-full mr-2" />
                                        <span className="text-sm">Price Match Guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            {/* Form Header */}
                            <div className="bg-gradient-to-r from-gray-50 to-white p-8 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            Executive Reservation Form
                                        </h2>
                                        <p className="text-gray-600">
                                            Complete the form below to reserve your premium vehicle
                                        </p>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="px-4 py-2 bg-gray-100 rounded-lg">
                                            <span className="text-sm font-medium text-gray-700">
                                                Step {activeStep} of 3
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-8">
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
                        <div className="mt-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 p-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Need Assistance with Your Booking?
                                    </h3>
                                    <p className="text-gray-600">
                                        Our premium concierge team is available 24/7 to assist you
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => window.open('tel:+254705336311')}
                                        className="group px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <PhoneIcon className="h-5 w-5 mr-2" />
                                        Call: +254 (705) 336 311
                                    </button>
                                    <button
                                        onClick={() => window.open('tel:+447397549590')}
                                        className="group px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <PhoneIcon className="h-5 w-5 mr-2" />
                                        Call: +44 (7397) 549 590
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE FAQ</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Premium Booking Information
                        </h2>

                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Answers to common questions about our executive booking process
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-[#FF6B35]/20 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                                            <div className="h-2 w-2 bg-[#FF6B35] rounded-full" />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors duration-300">
                                            {faq.question}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final Assurance */}
            <div className="relative overflow-hidden py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                        <ShieldCheckIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE ASSURANCE</span>
                    </div>

                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Your Journey, Our Commitment
                    </h2>

                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Every booking is backed by our premium guarantee, ensuring an exceptional experience
                        from reservation to return.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-2">Award-Winning Service</h4>
                            <p className="text-gray-600">Recognized for excellence in premium mobility</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-2">Premium Partnership</h4>
                            <p className="text-gray-600">Trusted by Fortune 500 companies</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-2">Exclusive Benefits</h4>
                            <p className="text-gray-600">Priority access and premium amenities</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;