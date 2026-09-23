import * as React from 'react';
import { useState } from 'react';
import {
    ChevronDownIcon,
    QuestionMarkCircleIcon,
    TruckIcon,
    PhoneIcon,
    ClockIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon,
    ArrowRightIcon,
    CreditCardIcon,
    EnvelopeIcon,
    IdentificationIcon,
    CalendarDaysIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import {
    StarIcon as StarSolid,
    CheckBadgeIcon as CheckBadgeSolid,
    BoltIcon as BoltSolid,
} from '@heroicons/react/24/solid';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = [
        {
            id: 'booking',
            name: 'Booking',
            icon: CalendarDaysIcon,
            description: 'Reservations and modifications',
            gradient: 'from-blue-600 to-indigo-700',
            color: 'blue',
            faqs: [
                {
                    question: 'How do I make a booking?',
                    answer: 'Book directly through our website, mobile app, or call our 24/7 reservations line. Corporate clients can use the dedicated enterprise portal or API integration for automated bookings.'
                },
                {
                    question: 'How far in advance should I book?',
                    answer: 'We recommend 48 hours for standard bookings. Executive and black car services require 72-hour notice. Last-minute requests are accommodated based on fleet availability.'
                },
                {
                    question: 'Can I modify my existing booking?',
                    answer: 'Yes, modifications can be made free of charge up to 24 hours before your rental period. Changes within 24 hours may incur a nominal adjustment fee.'
                },
                {
                    question: 'Do you offer group bookings?',
                    answer: 'Absolutely. Group bookings receive a dedicated coordinator, consolidated documentation, and priority vehicle allocation. Contact our group services team for 5+ vehicles.'
                },
                {
                    question: 'What is your cancellation policy?',
                    answer: 'Free cancellation up to 48 hours before pickup. Cancellations within 24-48 hours incur 25% of the booking value. No-shows are charged 50% of the total.'
                }
            ]
        },
        {
            id: 'requirements',
            name: 'Requirements',
            icon: IdentificationIcon,
            description: 'Documents and eligibility',
            gradient: 'from-indigo-600 to-purple-700',
            color: 'purple',
            faqs: [
                {
                    question: 'What documents do I need to rent a vehicle?',
                    answer: 'A valid driver\'s license held for 3+ years, a government-issued ID or passport, and a credit card in the driver\'s name. Corporate accounts require a signed master agreement.'
                },
                {
                    question: 'What is the minimum age to rent?',
                    answer: 'The minimum age is 25 for standard vehicles and 28 for luxury and executive class vehicles. Young driver surcharges may apply for drivers under 25.'
                },
                {
                    question: 'Do you require a security deposit?',
                    answer: 'Yes, a refundable security deposit is required. Enterprise accounts benefit from reduced or waived deposits based on account history and volume.'
                },
                {
                    question: 'Can I add an additional driver?',
                    answer: 'Yes, additional drivers can be added for a small daily fee. They must meet the same age and documentation requirements and be present at pickup.'
                },
                {
                    question: 'Do you accept international driver\'s licenses?',
                    answer: 'Yes, we accept International Driving Permits alongside your valid home country license. Our global mobility team can assist with documentation.'
                }
            ]
        },
        {
            id: 'payment',
            name: 'Payment',
            icon: CreditCardIcon,
            description: 'Billing and financial options',
            gradient: 'from-emerald-600 to-teal-700',
            color: 'emerald',
            faqs: [
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit cards, debit cards, bank transfers, and corporate invoicing. Digital wallets including Apple Pay and Google Pay are also supported.'
                },
                {
                    question: 'Do you offer corporate billing?',
                    answer: 'Yes, we offer monthly consolidated invoicing with Net-30 terms for qualified enterprises. Integration with Concur, Expensify, and major procurement platforms is available.'
                },
                {
                    question: 'Are there any hidden fees?',
                    answer: 'No hidden fees. All charges are transparent and itemized. Optional add-ons like insurance, GPS, and additional drivers are clearly priced upfront.'
                },
                {
                    question: 'How are international transactions handled?',
                    answer: 'All international transactions are processed in local currency with locked exchange rates at booking. Multi-currency consolidated billing is available for enterprise clients.'
                },
                {
                    question: 'Can I get a refund for early returns?',
                    answer: 'Early returns are eligible for partial refunds on unused rental days. The refund is processed within 5-7 business days to the original payment method.'
                }
            ]
        },
        {
            id: 'vehicle',
            name: 'Fleet',
            icon: TruckIcon,
            description: 'Vehicles and logistics',
            gradient: 'from-amber-600 to-orange-700',
            color: 'amber',
            faqs: [
                {
                    question: 'What vehicles are in your fleet?',
                    answer: 'Our fleet includes luxury sedans (Mercedes, BMW), SUVs (Range Rover, Toyota), electric vehicles (Tesla, Polestar), and executive vans for group travel.'
                },
                {
                    question: 'How well are your vehicles maintained?',
                    answer: 'Every vehicle undergoes a 250-point inspection after each rental, weekly deep cleaning, and follows manufacturer-recommended maintenance schedules.'
                },
                {
                    question: 'What happens if my vehicle breaks down?',
                    answer: 'We provide 24/7 roadside assistance. Within metropolitan areas, a replacement vehicle is delivered within 90 minutes at no additional cost.'
                },
                {
                    question: 'Can I request a specific make or model?',
                    answer: 'Yes, our corporate reserved fleet program guarantees specific models for brand consistency. We maintain a 99.7% fulfillment rate on reserved vehicles.'
                },
                {
                    question: 'Do you offer electric vehicles?',
                    answer: 'Yes, our Vision Green fleet includes Tesla, Polestar, and hybrid options. We provide charging infrastructure guidance and carbon offset programs.'
                }
            ]
        }
    ];

    const premiumServices = [
        {
            title: 'Executive Concierge',
            description: '24/7 dedicated support with 15-minute response',
            icon: StarSolid,
            gradient: 'from-amber-500 to-orange-600'
        },
        {
            title: 'Digital Integration',
            description: 'API-first platform with real-time management',
            icon: DevicePhoneMobileIcon,
            gradient: 'from-blue-500 to-indigo-600'
        },
        {
            title: 'Global Coverage',
            description: 'Seamless service across 150+ countries',
            icon: GlobeAltIcon,
            gradient: 'from-emerald-500 to-teal-600'
        },
        {
            title: 'Compliance Assurance',
            description: 'Full regulatory compliance and audit support',
            icon: CheckBadgeSolid,
            gradient: 'from-purple-500 to-violet-600'
        }
    ];

    const allFAQs = categories.flatMap((category, catIndex) =>
        category.faqs.map((faq, faqIndex) => ({
            ...faq,
            category: category.name,
            categoryColor: category.gradient,
            categoryId: category.id,
            key: catIndex * 100 + faqIndex
        }))
    );

    const filteredFAQs = activeCategory === 'all'
        ? allFAQs
        : allFAQs.filter(faq => faq.categoryId === activeCategory);

    const getCategoryIcon = (categoryId: string) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat ? cat.icon : QuestionMarkCircleIcon;
    };

    // Primary contact details
    const primaryPhone = '+254705336311';
    const secondaryPhone = '+447397549590';
    const emailAddress = 'visionwanservices@gmail.com';

    // Handler functions for contact actions
    const handleContactSupport = () => {
        window.location.href = `mailto:${emailAddress}?subject=Support%20Inquiry%20-%20Vision%20Wan%20Services&body=Hello%20Vision%20Wan%20Team,%0A%0AI%20have%20a%20question%20about%20your%20services.%0A%0APlease%20assist.%0A%0AThank%20you.`;
    };

    const handleCallNow = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    const handleStartLiveChat = () => {
        // Opens WhatsApp chat with the primary number
        window.open(`https://wa.me/${primaryPhone.replace(/\D/g, '')}?text=Hello%20Vision%20Wan%20Team,%20I%20need%20assistance%20with%20your%20services.`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Modern Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=100"
                        alt="Modern corporate office"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/98 via-blue-950/95 to-slate-900/98" />
                </div>

                {/* Animated gradient orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 lg:pt-40 pb-24">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30 mb-8">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-300" />
                            <span className="text-sm font-medium text-blue-200">Support Center</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Frequently Asked
                            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h1>

                        <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
                            Find answers to common questions about our services, bookings, and policies.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`group px-6 py-3.5 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2.5 ${activeCategory === 'all'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/30 scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-lg'
                                }`}
                        >
                            <BoltSolid className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${activeCategory === 'all' ? 'text-white' : 'text-blue-500'}`} />
                            All
                        </button>
                        {categories.map((category) => {
                            const isActive = activeCategory === category.id;
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`group px-6 py-3.5 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2.5 relative overflow-hidden ${isActive
                                        ? `text-white shadow-xl scale-105 bg-gradient-to-r ${category.gradient} shadow-${category.color}-500/30`
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-lg'
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 ${isActive ? 'text-white' : `text-${category.color}-500`}`} />
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* FAQ List */}
                    <div className="lg:col-span-2 space-y-4">
                        {filteredFAQs.map((faq, index) => {
                            const isOpen = openIndex === faq.key;
                            const CategoryIcon = getCategoryIcon(faq.categoryId);
                            return (
                                <div
                                    key={faq.key}
                                    className={`group bg-white rounded-2xl border transition-all duration-500 ${isOpen
                                        ? 'border-blue-200 shadow-xl shadow-blue-100/50'
                                        : 'border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50'
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : faq.key)}
                                        className="flex justify-between items-center w-full p-6 text-left"
                                    >
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className={`p-2.5 rounded-xl transition-all duration-300 ${isOpen
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                                }`}>
                                                <CategoryIcon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${isOpen ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'
                                                    }`}>
                                                    {faq.question}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${faq.categoryColor} text-white`}>
                                                        {faq.category}
                                                    </span>
                                                    <span className="flex items-center text-xs text-gray-400">
                                                        <ClockIcon className="h-3.5 w-3.5 mr-1" />
                                                        1 min read
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen
                                            ? 'bg-blue-100 rotate-180'
                                            : 'bg-gray-100 group-hover:bg-blue-100'
                                            }`}>
                                            <ChevronDownIcon className={`h-5 w-5 transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'
                                                }`} />
                                        </div>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="px-6 pb-6 pl-[4.5rem]">
                                            <div className="border-t border-gray-100 pt-4">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                                        <PhoneIcon className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Need Help?</h3>
                                        <p className="text-blue-200/70 text-sm">We're here 24/7</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <a
                                        href={`tel:${primaryPhone}`}
                                        className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group/link"
                                    >
                                        <PhoneIcon className="h-5 w-5 text-blue-400 group-hover/link:scale-110 transition-transform duration-300" />
                                        <div>
                                            <p className="font-semibold text-sm">+254 (705) 336 311</p>
                                            <p className="text-xs text-blue-200/60">Kenya</p>
                                        </div>
                                    </a>

                                    <a
                                        href={`tel:${secondaryPhone}`}
                                        className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group/link"
                                    >
                                        <PhoneIcon className="h-5 w-5 text-blue-400 group-hover/link:scale-110 transition-transform duration-300" />
                                        <div>
                                            <p className="font-semibold text-sm">+44 (7397) 549 590</p>
                                            <p className="text-xs text-blue-200/60">United Kingdom</p>
                                        </div>
                                    </a>

                                    <a
                                        href={`mailto:${emailAddress}`}
                                        className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group/link"
                                    >
                                        <EnvelopeIcon className="h-5 w-5 text-blue-400 group-hover/link:scale-110 transition-transform duration-300" />
                                        <div>
                                            <p className="font-semibold text-sm break-all">{emailAddress}</p>
                                            <p className="text-xs text-blue-200/60">Email us</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Premium Services */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                Premium Services
                            </h3>

                            <div className="space-y-3">
                                {premiumServices.map((service, index) => {
                                    const Icon = service.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200"
                                        >
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${service.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                                    {service.title}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                            <h3 className="text-lg font-bold mb-5">At a Glance</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Client Satisfaction</span>
                                    <span className="font-bold text-emerald-400">98.7%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full" style={{ width: '98.7%' }} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Fleet Availability</span>
                                    <span className="font-bold text-blue-400">99.95%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full" style={{ width: '99.95%' }} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Response Time</span>
                                    <span className="font-bold text-amber-400">&lt;15 min</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-1.5 rounded-full" style={{ width: '95%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-10 lg:p-14 text-white">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

                    <div className="relative text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-blue-100/80 text-lg mb-8">
                            Our team is ready to help you with anything you need.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleContactSupport}
                                className="group px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                            >
                                Contact Support
                                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                            <button
                                onClick={() => handleCallNow(primaryPhone)}
                                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <PhoneIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                Kenya Office Line
                            </button>
                            <button
                                onClick={() => handleCallNow(secondaryPhone)}
                                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <PhoneIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                UK Office Line
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center py-8 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Vision Wan Services. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;