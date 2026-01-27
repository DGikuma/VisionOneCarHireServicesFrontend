import * as React from 'react';
import { useState } from 'react';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    QuestionMarkCircleIcon,
    DocumentTextIcon,
    UserIcon,
    TruckIcon,
    PhoneIcon,
    ShieldCheckIcon,
    SparklesIcon,
    BuildingLibraryIcon,
    ChartBarIcon,
    ClockIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import {
    SparklesIcon as SparklesSolid,
    StarIcon as StarSolid,
    CheckBadgeIcon as CheckBadgeSolid
} from '@heroicons/react/24/solid';

const FAQPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Brand colors - deep corporate blue as primary

    const categories = [
        {
            id: 'booking',
            name: 'Booking Process',
            icon: DocumentTextIcon,
            description: 'Reservation procedures and modifications',
            gradient: 'from-blue-600 to-indigo-700',
            faqs: [
                {
                    question: 'How do I initiate a corporate booking?',
                    answer: 'Corporate bookings can be initiated through our dedicated enterprise portal, via API integration for automated systems, or through your dedicated account manager. The process includes streamlined approvals, consolidated billing, and priority vehicle allocation.'
                },
                {
                    question: 'What is your advance reservation policy for executive travel?',
                    answer: 'For executive and platinum tier clients, we guarantee vehicle availability with reservations made 48 hours in advance. Black car services require 72-hour notice. Last-minute requests are accommodated based on fleet availability with premium priority status.'
                },
                {
                    question: 'Can we modify enterprise agreements mid-term?',
                    answer: 'Yes, enterprise agreements feature flexible amendment clauses. Changes to fleet size, service levels, or billing terms can be arranged through quarterly business reviews with your designated relationship manager.'
                },
                {
                    question: 'How are booking confirmations handled for large groups?',
                    answer: 'Group bookings receive a dedicated coordination team, consolidated documentation, and a single point of contact. Digital confirmations include QR codes for expedited pickup and detailed itinerary management.'
                },
                {
                    question: 'What is your protocol for extending executive rentals during international trips?',
                    answer: 'International extensions are managed through our global concierge service, available 24/7. We handle all documentation, insurance adjustments, and local compliance requirements seamlessly.'
                }
            ]
        },
        {
            id: 'requirements',
            name: 'Corporate Requirements',
            icon: BuildingLibraryIcon,
            description: 'Documentation and eligibility criteria',
            gradient: 'from-indigo-600 to-purple-700',
            faqs: [
                {
                    question: 'What corporate documentation is required for enterprise accounts?',
                    answer: 'We require a signed master services agreement, certificate of insurance naming Vision One as additional insured, authorized signatory list, and corporate credit card on file. International entities need apostilled documentation.'
                },
                {
                    question: 'What are the driver qualification standards?',
                    answer: 'All drivers must be 25+, possess a valid license for 3+ years, pass our comprehensive driving record review, and complete our digital safety briefing. Executive drivers undergo additional verification.'
                },
                {
                    question: 'How does your corporate insurance program work?',
                    answer: 'Our enterprise insurance package includes $5M liability coverage, zero deductible on collisions, worldwide protection, and includes hired/non-owned auto liability. Certificates are issued within 24 hours.'
                },
                {
                    question: 'Can we authorize multiple departmental budgets under one account?',
                    answer: 'Yes, our hierarchical account structure allows for departmental segmentation with individual spending limits, approval workflows, and customized reporting by cost center or project code.'
                },
                {
                    question: 'What international driver provisions do you offer?',
                    answer: 'We provide International Driving Permit facilitation, country-specific regulatory guidance, and multi-language documentation support through our global mobility division.'
                }
            ]
        },
        {
            id: 'payment',
            name: 'Billing & Finance',
            icon: ChartBarIcon,
            description: 'Invoicing and financial arrangements',
            gradient: 'from-emerald-600 to-teal-700',
            faqs: [
                {
                    question: 'What consolidated billing options are available?',
                    answer: 'We offer monthly consolidated invoicing with itemized transaction details, digital expense reporting integration (Concur, Expensify), and automated reconciliation tools. Net-30 terms available for qualified enterprises.'
                },
                {
                    question: 'Do you offer spend management analytics?',
                    answer: 'Yes, our Vision One Analytics platform provides real-time spend dashboards, carbon footprint tracking, utilization optimization insights, and predictive budgeting tools with API access.'
                },
                {
                    question: 'How are international transactions handled?',
                    answer: 'All international transactions are processed in local currency with locked exchange rates at booking time. We absorb FX fees for platinum clients and provide multi-currency consolidated billing.'
                },
                {
                    question: 'What security deposit structure do you offer for fleets?',
                    answer: 'Enterprise clients benefit from deposit waivers or significantly reduced holds. Our tiered system bases requirements on account tenure, volume, and payment history.'
                },
                {
                    question: 'Can we integrate with our existing procurement systems?',
                    answer: 'We offer seamless integration with SAP Ariba, Coupa, and other major procurement platforms, including automated PO generation and three-way matching capabilities.'
                }
            ]
        },
        {
            id: 'vehicle',
            name: 'Fleet & Logistics',
            icon: TruckIcon,
            description: 'Vehicle management and logistics',
            gradient: 'from-amber-600 to-orange-700',
            faqs: [
                {
                    question: 'How is your executive fleet maintained?',
                    answer: 'All executive vehicles undergo 250-point inspections after every rental, receive weekly deep cleaning, and follow manufacturer-recommended maintenance schedules. Maintenance logs are digitally available for compliance.'
                },
                {
                    question: 'What is your protocol for vehicle replacement during mechanical issues?',
                    answer: 'Within metropolitan areas, we guarantee replacement vehicle delivery within 90 minutes. For executive class, we provide complimentary upgrade and dispatch a dedicated service vehicle for personal effects transfer.'
                },
                {
                    question: 'Can we reserve specific makes/models for brand consistency?',
                    answer: 'Yes, our corporate reserved fleet program guarantees specific models for brand alignment. We maintain reserved inventory across major hubs with 99.7% fulfillment rate.'
                },
                {
                    question: 'What sustainable fleet options do you offer?',
                    answer: 'Our Vision Green fleet includes electric vehicles (Tesla, Polestar), hybrids, and carbon offset programs. We provide charging infrastructure guidance and sustainability reporting.'
                },
                {
                    question: 'How do you handle cross-border logistics for international assignments?',
                    answer: 'Our global mobility team manages all cross-border documentation, temporary import permits, insurance validation, and return logistics for long-term international assignments.'
                }
            ]
        }
    ];

    const premiumServices = [
        {
            title: 'Executive Concierge',
            description: '24/7 dedicated support with 15-minute response guarantee',
            icon: StarSolid,
            color: 'text-amber-500'
        },
        {
            title: 'Digital Integration',
            description: 'API-first platform with real-time fleet management',
            icon: DevicePhoneMobileIcon,
            color: 'text-blue-500'
        },
        {
            title: 'Global Coverage',
            description: 'Seamless service across 150+ countries',
            icon: GlobeAltIcon,
            color: 'text-emerald-500'
        },
        {
            title: 'Compliance Assurance',
            description: 'Full regulatory compliance and audit support',
            icon: CheckBadgeSolid,
            color: 'text-purple-500'
        }
    ];

    const allFAQs = categories.flatMap((category, catIndex) =>
        category.faqs.map((faq, faqIndex) => ({
            ...faq,
            category: category.name,
            categoryColor: category.gradient,
            key: catIndex * 100 + faqIndex
        }))
    );

    const filteredFAQs = activeCategory === 'all'
        ? allFAQs
        : allFAQs.filter(faq => {
            const category = categories.find(c => c.id === activeCategory);
            return category ? faq.category === category.name : false;
        });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Premium Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-blue-900"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="flex items-center mb-8">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-30"></div>
                            <div className="relative p-3 bg-white rounded-lg shadow-xl">
                                <QuestionMarkCircleIcon className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>
                        <span className="ml-4 px-4 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
                            Enterprise Support
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Corporate
                        <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Knowledge Center
                        </span>
                    </h1>

                    <p className="text-xl text-blue-100 max-w-3xl mb-12 leading-relaxed">
                        Expert guidance for enterprise mobility solutions. Access comprehensive resources,
                        procedural documentation, and strategic insights for optimized fleet management.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search enterprise solutions..."
                                    className="w-full px-8 py-5 bg-white/95 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-xl"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <SparklesIcon className="h-6 w-6 text-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                {/* Premium Category Navigation */}
                <div className="mb-16">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg ${activeCategory === 'all'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-blue-500/25 transform scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            <SparklesSolid className={`h-5 w-5 mr-3 ${activeCategory === 'all' ? 'text-white' : 'text-blue-500'}`} />
                            All Solutions
                        </button>
                        {categories.map((category) => {
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg relative overflow-hidden ${isActive
                                        ? 'text-white shadow-xl transform scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    {isActive && (
                                        <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient}`}></div>
                                    )}
                                    <div className="relative flex items-center">
                                        <category.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                        {category.name}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {/* FAQ List */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {filteredFAQs.map((faq) => {
                                const isOpen = openIndex === faq.key;
                                return (
                                    <div
                                        key={faq.key}
                                        className={`bg-white rounded-2xl shadow-xl border transition-all duration-300 ${isOpen ? 'border-blue-200 shadow-blue-100' : 'border-gray-100 hover:shadow-lg hover:border-blue-100'}`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : faq.key)}
                                            className="flex justify-between items-center w-full p-8 text-left transition-colors group"
                                        >
                                            <div className="flex items-start">
                                                <div className={`p-3 rounded-lg mr-6 ${isOpen ? 'bg-blue-50' : 'bg-gray-50 group-hover:bg-blue-50'}`}>
                                                    <QuestionMarkCircleIcon className={`h-6 w-6 ${isOpen ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'}`} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                                                        {faq.question}
                                                    </h3>
                                                    <div className="flex items-center">
                                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${faq.categoryColor} text-white`}>
                                                            {faq.category}
                                                        </span>
                                                        <ClockIcon className="h-4 w-4 text-gray-400 ml-3" />
                                                        <span className="text-sm text-gray-500 ml-1">2 min read</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`p-2 rounded-full ${isOpen ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100'}`}>
                                                {isOpen ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-blue-600" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
                                                )}
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-8 pb-8 ml-20 border-t border-gray-100 pt-8">
                                                <div className="flex items-start mb-6">
                                                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4"></div>
                                                    <p className="text-gray-700 text-lg leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <StarIcon className="h-4 w-4 mr-1 text-amber-400" />
                                                    <span>Recommended for enterprise clients</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Premium Services */}
                        <div className="mt-16 bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-12 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-transparent opacity-10 rounded-full -translate-y-32 translate-x-32"></div>

                            <div className="relative">
                                <div className="flex items-center mb-10">
                                    <SparklesSolid className="h-10 w-10 text-amber-400 mr-4" />
                                    <h2 className="text-3xl font-bold">
                                        Vision One Premium Services
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {premiumServices.map((service, index) => (
                                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                                            <div className="flex items-center mb-4">
                                                <div className="p-3 rounded-lg bg-white/10 mr-4">
                                                    <service.icon className={`h-6 w-6 ${service.color}`} />
                                                </div>
                                                <h3 className="text-xl font-bold">{service.title}</h3>
                                            </div>
                                            <p className="text-blue-100">{service.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Executive Sidebar */}
                    <div className="space-y-8">
                        {/* Executive Support Card */}
                        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>

                            <div className="relative">
                                <div className="flex items-center mb-8">
                                    <div className="p-3 rounded-xl bg-white/10 mr-4">
                                        <PhoneIcon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">Executive Support</h3>
                                        <p className="text-blue-100">Dedicated enterprise assistance</p>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-8">
                                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center">
                                            <div className="p-2 rounded-lg bg-white/20 mr-4">
                                                <PhoneIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">+1 (888) 888-8888</p>
                                                <p className="text-blue-200 text-sm">24/7 Executive Line</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center">
                                            <div className="p-2 rounded-lg bg-white/20 mr-4">
                                                <UserIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">Dedicated Account Manager</p>
                                                <p className="text-blue-200 text-sm">Direct mobile access</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-white text-blue-700 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                                    Contact Executive Support
                                </button>
                            </div>
                        </div>

                        {/* Quick Resources */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                                <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-3" />
                                Corporate Resources
                            </h3>

                            <div className="space-y-4">
                                {[
                                    { name: 'Enterprise Agreement Template', type: 'PDF', size: '2.4 MB', color: 'bg-blue-100 text-blue-700' },
                                    { name: 'Global Compliance Guide', type: 'Interactive', size: 'Updated Q4 2024', color: 'bg-emerald-100 text-emerald-700' },
                                    { name: 'Sustainability Report 2024', type: 'Report', size: '15.2 MB', color: 'bg-amber-100 text-amber-700' },
                                    { name: 'Fleet Optimization Toolkit', type: 'Dashboard', size: 'Live Access', color: 'bg-purple-100 text-purple-700' }
                                ].map((resource, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="flex items-center p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group border border-gray-100 hover:border-blue-200"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className={`px-3 py-1 rounded-lg ${resource.color} font-semibold text-sm`}>
                                                {resource.type}
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-grow">
                                            <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                                                {resource.name}
                                            </p>
                                            <p className="text-sm text-gray-500">{resource.size}</p>
                                        </div>
                                        <ChevronDownIcon className="h-5 w-5 text-gray-400 ml-4 transform rotate-270 group-hover:text-blue-500" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Stats Widget */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-8">Enterprise Impact</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300">Client Satisfaction</span>
                                        <span className="font-bold text-2xl">98.7%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300">Uptime Guarantee</span>
                                        <span className="font-bold text-2xl">99.95%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full" style={{ width: '99.95%' }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300">Response Time</span>
                                        <span className="font-bold text-2xl">&lt;15min</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Protocol */}
                        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>

                            <div className="relative">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 rounded-xl bg-white/20 mr-4">
                                        <ShieldCheckIcon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold">Emergency Protocol</h3>
                                </div>

                                <p className="text-red-100 mb-6">
                                    For urgent security or safety concerns requiring immediate escalation
                                </p>

                                <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
                                    <p className="font-bold text-2xl text-center tracking-widest">1-800-VISION-911</p>
                                    <p className="text-red-200 text-sm text-center mt-2">Global Emergency Hotline</p>
                                </div>

                                <p className="text-sm text-red-200">
                                    Available in 150+ countries with local language support
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Strategic CTA */}
                <div className="mb-20 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-3xl p-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] opacity-10"></div>

                    <div className="relative text-center">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                            Ready to Transform Your
                            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Corporate Mobility Strategy?
                            </span>
                        </h2>

                        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Schedule a personalized consultation with our enterprise solutions team to
                            optimize your fleet efficiency, reduce costs, and enhance executive travel experiences.
                        </p>

                        <p className="mt-8 text-blue-200 flex items-center justify-center">
                            <StarIcon className="h-5 w-5 text-amber-400 mr-2" />
                            Average ROI: 42% within first year
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center py-8 border-t border-gray-200">
                    <p className="text-gray-500">
                        © 2024 Vision One Corporate Solutions. All enterprise inquiries handled with strict confidentiality.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        ISO 27001 Certified • GDPR Compliant • SOC 2 Type II
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;