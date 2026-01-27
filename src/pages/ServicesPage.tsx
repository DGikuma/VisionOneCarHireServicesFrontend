import * as React from 'react';
import { useState } from 'react';
import {
    WrenchIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    GiftIcon,
    TruckIcon,
    ShieldCheckIcon,
    DevicePhoneMobileIcon,
    ClockIcon,
    ArrowRightIcon,
    CheckBadgeIcon,
    ChartBarIcon,
    StarIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, StarIcon as SolidStar } from '@heroicons/react/24/solid';

const ServicesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('core');

    const mainServices = [
        {
            icon: TruckIcon,
            title: 'Executive Short-Term Rentals',
            description: 'Premium daily, weekly, and monthly rentals with white-glove service and flexible terms for discerning clients.',
            features: ['No long-term commitment', 'Flexible 24/7 pickup/dropoff', 'All-inclusive transparent pricing', 'Concierge service'],
            stats: { vehicles: '50+', support: '24/7', satisfaction: '98%' },
            color: 'from-[#FF6B35] to-[#FF8B35]'
        },
        {
            icon: BuildingOfficeIcon,
            title: 'Corporate Fleet Solutions',
            description: 'Tailored enterprise solutions with dedicated account management and streamlined billing for businesses.',
            features: ['Corporate accounts & billing', 'Dedicated account manager', 'Fleet management portal', 'Priority maintenance'],
            stats: { companies: '200+', vehicles: '500+', uptime: '99.5%' },
            color: 'from-[#FF6B35]/80 to-[#FF8B35]'
        },
        {
            icon: UserGroupIcon,
            title: 'Family & Group Travel',
            description: 'Spacious luxury vehicles equipped for family vacations and group travel with premium amenities.',
            features: ['Child safety seats included', 'Extra luggage capacity', 'Entertainment systems', 'Comfort packages'],
            stats: { capacity: '8 seats', luggage: '7 bags', rating: '4.9/5' },
            color: 'from-[#FF6B35] to-[#FF8B35]/80'
        },
        {
            icon: GiftIcon,
            title: 'Special Occasion Luxury',
            description: 'Make your celebrations extraordinary with our curated luxury vehicles and premium service packages.',
            features: ['Wedding & event packages', 'Champagne service', 'Professional chauffeur', 'Custom decorations'],
            stats: { events: '1000+', luxury: 'Top Tier', 'custom': 'Yes' },
            color: 'from-[#FF8B35] to-[#FF6B35]'
        }
    ];

    const additionalServices = [
        {
            icon: ShieldCheckIcon,
            title: 'Premium Insurance Coverage',
            description: 'Comprehensive coverage with zero deductible options for complete peace of mind.',
            tag: 'Most Secure'
        },
        {
            icon: WrenchIcon,
            title: '24/7 Premium Support',
            description: 'Round-the-clock roadside assistance and maintenance with average 30-minute response time.',
            tag: 'Guaranteed'
        },
        {
            icon: DevicePhoneMobileIcon,
            title: 'Dedicated Mobile Experience',
            description: 'Exclusive app with digital keys, remote control, and concierge services at your fingertips.',
            tag: 'Exclusive'
        },
        {
            icon: ClockIcon,
            title: 'Express Service Elite',
            description: '15-minute pickup/drop-off service with priority lanes and dedicated agents.',
            tag: 'VIP'
        },
        {
            icon: ChartBarIcon,
            title: 'Corporate Analytics Suite',
            description: 'Advanced reporting and analytics for fleet optimization and cost management.',
            tag: 'Business'
        },
        {
            icon: CheckBadgeIcon,
            title: 'Executive Membership',
            description: 'Priority access, exclusive rates, and personalized service for frequent clients.',
            tag: 'Elite'
        }
    ];

    const servicePackages = [
        {
            name: 'Signature',
            level: 'Premium',
            price: 399,
            period: 'per day',
            features: ['Executive luxury vehicle', 'Premium insurance zero deductible', 'Unlimited mileage', '24/7 concierge support', 'Express service', 'Mobile app control', 'Complimentary delivery'],
            popular: false,
            color: 'border-gray-200'
        },
        {
            name: 'Platinum',
            level: 'Elite',
            price: 699,
            period: 'per day',
            features: ['Ultra-luxury vehicle selection', 'Executive insurance coverage', 'Priority 24/7 support', 'Dedicated account manager', 'Flexible cancellation', 'Airport fast track', 'Personal assistant'],
            popular: true,
            color: 'border-[#FF6B35]'
        },
        {
            name: 'Corporate Elite',
            level: 'Enterprise',
            price: 8999,
            period: 'per month',
            features: ['Multiple luxury vehicles', 'Custom fleet management', 'Dedicated support team', 'Predictive maintenance', 'Analytics dashboard', 'Custom billing cycles', 'Global coverage'],
            popular: false,
            color: 'border-gray-200'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: 'Consultation & Booking',
            description: 'Personalized consultation with our executive team to understand your requirements.',
            icon: '💬'
        },
        {
            step: '02',
            title: 'Documentation & Verification',
            description: 'Streamlined digital verification process with our secure platform.',
            icon: '📄'
        },
        {
            step: '03',
            title: 'Vehicle Preparation',
            description: 'Premium detailing and comprehensive safety checks by certified technicians.',
            icon: '✨'
        },
        {
            step: '04',
            title: 'Delivery & Handover',
            description: 'White-glove delivery service with personalized vehicle orientation.',
            icon: '🚗'
        },
        {
            step: '05',
            title: 'Journey Experience',
            description: 'Enjoy your journey with 24/7 premium support and concierge services.',
            icon: '🌟'
        },
        {
            step: '06',
            title: 'Return & Feedback',
            description: 'Seamless return process and collection of feedback for continuous improvement.',
            icon: '🔄'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6B35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF8B35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full border border-[#FF6B35]/20 mb-6">
                            <ShieldCheckIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE SERVICES</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                                Premium Mobility Solutions
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Experience unparalleled service excellence with our curated range of premium mobility solutions,
                            designed for discerning individuals and corporate clients who demand the extraordinary.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-xl hover:bg-[#FF5A20] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Explore Services
                            </div>
                            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                                Request Consultation
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Categories Tabs */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center space-x-1">
                        <button
                            onClick={() => setActiveTab('core')}
                            className={`relative px-8 py-4 text-lg font-medium transition-all duration-300 ${activeTab === 'core'
                                ? 'text-[#FF6B35]'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Core Services
                            {activeTab === 'core' && (
                                <>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-t-full" />
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FF6B35] rounded-full" />
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('additional')}
                            className={`relative px-8 py-4 text-lg font-medium transition-all duration-300 ${activeTab === 'additional'
                                ? 'text-[#FF6B35]'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Premium Features
                            {activeTab === 'additional' && (
                                <>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-t-full" />
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FF6B35] rounded-full" />
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('packages')}
                            className={`relative px-8 py-4 text-lg font-medium transition-all duration-300 ${activeTab === 'packages'
                                ? 'text-[#FF6B35]'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Service Tiers
                            {activeTab === 'packages' && (
                                <>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-t-full" />
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FF6B35] rounded-full" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Core Services Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Executive Core Services
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Our meticulously crafted services combine luxury, convenience, and reliability for an unparalleled experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {mainServices.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 transform hover:-translate-y-2"
                        >
                            {/* Gradient Corner */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className="p-8">
                                <div className="flex items-start mb-6">
                                    <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mr-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="h-8 w-8" />
                                        <div className="absolute -inset-1 border-2 border-white/20 rounded-2xl animate-pulse" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-8">
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {Object.entries(service.stats).map(([key, value]) => (
                                            <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{key}</p>
                                                <p className="text-lg font-bold text-gray-900">{value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-gray-700">
                                                <div className="h-2 w-2 bg-[#FF6B35] rounded-full mr-3 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className="group/btn flex items-center text-[#FF6B35] font-semibold hover:text-[#FF5A20] transition-colors duration-300">
                                    <span>Discover Service Details</span>
                                    <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Features Section */}
            <div className="bg-gradient-to-b from-white to-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-4">
                            <StarIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">PREMIUM FEATURES</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Enhanced Experience Services
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Additional premium services designed to elevate your journey and provide complete peace of mind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {additionalServices.map((service, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 transform hover:-translate-y-2"
                            >
                                <div className="relative mb-6">
                                    <div className="inline-flex p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 group-hover:border-[#FF6B35]/20 transition-colors duration-300">
                                        <service.icon className="h-8 w-8 text-[#FF6B35]" />
                                    </div>
                                    {service.tag && (
                                        <span className="absolute top-0 right-0 px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold rounded-full">
                                            {service.tag}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 mb-6">
                                    {service.description}
                                </p>

                                <div className="flex items-center text-sm text-gray-500">
                                    <span>Learn more</span>
                                    <ChevronRightIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Service Tiers Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Executive Service Tiers
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Choose from our curated service tiers designed to meet the needs of every discerning client.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {servicePackages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white rounded-2xl p-8 border-2 ${pkg.color} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="px-6 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white text-sm font-bold rounded-full shadow-lg">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                                        {pkg.level}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold text-gray-900">${pkg.price}</span>
                                        <span className="text-gray-600 ml-2"> {pkg.period}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 text-[#FF6B35] mr-2" />
                                    Included Features
                                </h4>

                                <ul className="space-y-4">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                <div className="h-2 w-2 bg-green-500 rounded-full" />
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 ${pkg.popular
                                ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white shadow-lg hover:shadow-xl hover:shadow-[#FF6B35]/20'
                                : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}>
                                Select {pkg.name} Tier
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Process Section */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full mb-4">
                            <ClockIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE PROCESS</span>
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-4">
                            The Vision One Experience
                        </h2>

                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            Our six-step premium process ensures a seamless and exceptional experience from start to finish.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#FF6B35] via-[#FF8B35] to-transparent" />

                        <div className="space-y-16">
                            {processSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                        }`}
                                >
                                    <div className="lg:w-1/2" />

                                    <div className="relative z-10 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                                        <div className="relative">
                                            <div className="h-16 w-16 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                {step.step}
                                            </div>
                                            <div className="absolute -inset-4 border-2 border-[#FF6B35]/30 rounded-3xl animate-pulse" />
                                        </div>
                                    </div>

                                    <div className={`lg:w-1/2 mt-8 lg:mt-0 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                                        }`}>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                            <div className="text-3xl mb-4">{step.icon}</div>
                                            <h3 className="text-xl font-bold text-white mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-300">
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

            {/* CTA Section */}
            <div className="relative overflow-hidden py-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.1)_0%,transparent_50%)]" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                        <SolidStar className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">PREMIUM PARTNERSHIP</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Elevate Your Mobility Experience
                    </h2>

                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Join our exclusive network of satisfied clients who trust Vision One for their premium mobility needs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
                            <span>Schedule Executive Consultation</span>
                            <ArrowRightIcon className="h-5 w-5 ml-2" />
                        </button>
                        <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300">
                            Call: (888) 888-8888
                        </button>
                    </div>

                    <div className="mt-12 pt-12 border-t border-gray-200">
                        <div className="flex flex-wrap justify-center gap-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">2500+</div>
                                <div className="text-gray-600">Premium Clients</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                                <div className="text-gray-600">Service Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">99.7%</div>
                                <div className="text-gray-600">Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default ServicesPage;