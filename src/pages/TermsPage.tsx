import * as React from 'react';
import {
    DocumentTextIcon,
    ShieldCheckIcon,
    ExclamationTriangleIcon,
    CreditCardIcon,
    UserIcon,
    CalendarIcon,
    TruckIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';

const TermsPage: React.FC = () => {
    const sections = [
        {
            id: 'booking',
            title: 'Booking Terms',
            icon: DocumentTextIcon,
            content: [
                {
                    heading: 'Booking Process',
                    points: [
                        'All bookings are subject to availability and confirmation',
                        'Minimum rental period is 24 hours',
                        'Driver must be at least 25 years old',
                        'Valid driver\'s license required for all drivers',
                        'International drivers need valid passport and International Driving Permit'
                    ]
                },
                {
                    heading: 'Booking Confirmation',
                    points: [
                        'Booking is confirmed only when you receive confirmation email',
                        'We reserve right to cancel bookings that don\'t comply with terms',
                        'Prices are guaranteed at time of booking',
                        'Rates may change without notice for future bookings'
                    ]
                }
            ]
        },
        {
            id: 'rental',
            title: 'Rental Agreement',
            icon: UserIcon,
            content: [
                {
                    heading: 'Rental Period',
                    points: [
                        'Rental period begins at scheduled pickup time',
                        'Late returns incur additional charges',
                        '1-hour grace period provided',
                        'Extensions must be approved in advance'
                    ]
                },
                {
                    heading: 'Vehicle Condition',
                    points: [
                        'Vehicles provided clean with full fuel tank',
                        'Customer responsible for return condition',
                        'Pre-existing damage must be documented',
                        'Smoking in vehicles strictly prohibited'
                    ]
                },
                {
                    heading: 'Prohibited Uses',
                    points: [
                        'Off-road driving',
                        'Racing or speed testing',
                        'Transporting illegal goods',
                        'Towing without authorization',
                        'Driving under influence',
                        'Commercial transportation services'
                    ]
                }
            ]
        },
        {
            id: 'insurance',
            title: 'Insurance & Coverage',
            icon: ShieldCheckIcon,
            content: [
                {
                    heading: 'Basic Coverage',
                    points: [
                        'Basic insurance included with all rentals',
                        '$1,000 deductible applies',
                        'Coverage meets state minimum requirements',
                        'Additional coverage options available'
                    ]
                },
                {
                    heading: 'Additional Coverage',
                    points: [
                        'Collision Damage Waiver (CDW) available',
                        'Personal Accident Insurance (PAI)',
                        'Personal Effects Coverage (PEC)',
                        'Roadside Assistance Protection (RAP)'
                    ]
                },
                {
                    heading: 'Exclusions',
                    points: [
                        'Damage from violation of rental terms',
                        'Theft without proper documentation',
                        'Tire and windshield damage (unless covered)',
                        'Personal belongings left in vehicle',
                        'Damage from natural disasters'
                    ]
                }
            ]
        },
        {
            id: 'payment',
            title: 'Payment Terms',
            icon: CreditCardIcon,
            content: [
                {
                    heading: 'Rates & Charges',
                    points: [
                        'All rates quoted in USD',
                        'Prices subject to change without notice',
                        'Additional charges for extras',
                        'Taxes and fees additional'
                    ]
                },
                {
                    heading: 'Additional Fees',
                    points: [
                        'Young driver fee (under 30): $25/day',
                        'Additional driver fee: $15/day',
                        'One-way rental fee: $75+',
                        'Late return fee: 1.5x hourly rate',
                        'Cleaning fee (if needed): $250'
                    ]
                },
                {
                    heading: 'Security Deposit',
                    points: [
                        'Security deposit required on credit card',
                        'Amount varies by vehicle type ($200-$1,000)',
                        'Deposit released 3-5 business days after return',
                        'Additional charges deducted from deposit'
                    ]
                }
            ]
        },
        {
            id: 'cancellation',
            title: 'Cancellation Policy',
            icon: CalendarIcon,
            content: [
                {
                    heading: 'Cancellation Terms',
                    points: [
                        'Free cancellation up to 24 hours before pickup',
                        '50% charge for cancellations within 24 hours',
                        'No shows charged full first day rate',
                        'Modifications free up to 24 hours before'
                    ]
                },
                {
                    heading: 'Refund Policy',
                    points: [
                        'Refunds processed within 7-10 business days',
                        'Refund method same as payment method',
                        'Processing fees non-refundable',
                        'No refunds for early returns'
                    ]
                }
            ]
        },
        {
            id: 'vehicle',
            title: 'Vehicle Terms',
            icon: TruckIcon,
            content: [
                {
                    heading: 'Vehicle Use',
                    points: [
                        'Vehicle must be returned to agreed location',
                        'Mileage limits apply unless unlimited',
                        'Fuel must be returned at same level',
                        'Regular maintenance checks required'
                    ]
                },
                {
                    heading: 'Damage & Repairs',
                    points: [
                        'Customer responsible for all damage',
                        'Report accidents immediately',
                        'Authorized repairs only',
                        'Administrative fee for claims processing'
                    ]
                }
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex p-4 bg-primary-100 rounded-2xl mb-6">
                    <DocumentTextIcon className="h-12 w-12 text-primary-600" />
                </div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Terms & Conditions
                </h1>
                <p className="text-gray-600 text-xl">
                    Last updated: January 1, 2024
                </p>
                <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
                    By using Vision One Car Hire Services, you agree to these terms and conditions. Please read them carefully.
                </p>
            </div>

            {/* Quick Navigation */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Quick Navigation
                </h2>
                <div className="flex flex-wrap gap-3">
                    {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <section.icon className="h-4 w-4 mr-2" />
                            {section.title}
                        </a>
                    ))}
                </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
                {sections.map((section) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-20"
                    >
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Section Header */}
                            <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-3 bg-primary-100 rounded-xl mr-4">
                                        <section.icon className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {section.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Section Content */}
                            <div className="p-6">
                                <div className="space-y-8">
                                    {section.content.map((item, index) => (
                                        <div key={index} className="border-b border-gray-100 last:border-b-0 pb-8 last:pb-0">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                {item.heading}
                                            </h3>
                                            <ul className="space-y-3">
                                                {item.points.map((point, pointIndex) => (
                                                    <li key={pointIndex} className="flex items-start">
                                                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                        <span className="text-gray-700">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Important Notes */}
            <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                        <div className="flex items-center mb-4">
                            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-3" />
                            <h3 className="text-lg font-bold text-gray-900">
                                Important Notes
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-700">Review vehicle thoroughly at pickup</span>
                            </li>
                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-700">Keep rental agreement in vehicle</span>
                            </li>
                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-700">Report any issues immediately</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                        <div className="flex items-center mb-4">
                            <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-3" />
                            <h3 className="text-lg font-bold text-gray-900">
                                Your Responsibilities
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-700">Obey all traffic laws</span>
                            </li>
                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-700">Pay all tolls and fines</span>
                            </li>
                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-700">Return vehicle clean and fueled</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Agreement Section */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Agreement Acceptance
                </h3>
                <div className="space-y-4">
                    <p className="text-gray-700">
                        By proceeding with your booking, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                    </p>
                    <p className="text-gray-700">
                        These terms constitute the entire agreement between you and Vision One Car Hire Services regarding your rental and supersede all prior agreements and understandings.
                    </p>
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="agree"
                                className="h-5 w-5 text-primary-600 rounded"
                            />
                            <label htmlFor="agree" className="ml-3 text-gray-700">
                                I have read and agree to the Terms and Conditions
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Updates & Contact */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Policy Updates
                    </h3>
                    <p className="text-gray-700 mb-4">
                        We may update these terms periodically. Continued use of our services after changes constitutes acceptance of new terms.
                    </p>
                    <div className="flex items-center text-gray-600">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        <span>Next review scheduled: July 1, 2024</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Questions & Contact
                    </h3>
                    <p className="text-gray-700 mb-4">
                        For questions about these terms or to request clarification:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                            <DocumentTextIcon className="h-5 w-5 mr-2 text-primary-600" />
                            <span>legal@visionwanservices.com</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <PhoneIcon className="h-5 w-5 mr-2 text-primary-600" />
                            <span>(555) 123-4567 ext. 2</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Notice */}
            <div className="mt-12 p-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                    © 2024 Vision One Car Hire Services. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                    These Terms and Conditions are legally binding. Please retain a copy for your records.
                </p>
            </div>
        </div>
    );
};

export default TermsPage;