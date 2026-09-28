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
                        'All bookings are subject to vehicle availability and confirmation',
                        'The minimum rental period is 24 hours',
                        'The driver must meet the minimum age requirement applicable to the rental',
                        'A valid driver\'s license is required for all drivers',
                        'International drivers should provide a valid passport and International Driving Permit where applicable'
                    ]
                },
                {
                    heading: 'Booking Confirmation',
                    points: [
                        'A booking is confirmed only after you receive confirmation from Vision Wan Car Hire Services',
                        'We reserve the right to decline or cancel bookings that do not comply with these terms',
                        'The applicable rental rate is based on the vehicle and rental period selected at the time of booking',
                        'Rates and vehicle availability may change for future bookings'
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
                        'The rental period begins at the scheduled pickup time',
                        'The applicable rental rate is determined by the length of the rental period',
                        'Late returns may result in additional charges',
                        'Any extension of the rental period must be approved in advance'
                    ]
                },
                {
                    heading: 'Vehicle Condition',
                    points: [
                        'Vehicles are provided in a clean condition',
                        'The customer is responsible for returning the vehicle in an acceptable condition',
                        'Any pre-existing damage should be identified and documented at pickup',
                        'Smoking in vehicles is strictly prohibited'
                    ]
                },
                {
                    heading: 'Prohibited Uses',
                    points: [
                        'Off-road driving unless specifically authorized',
                        'Racing, speed testing or other unsafe driving activities',
                        'Transporting illegal goods or participating in unlawful activities',
                        'Towing without prior authorization',
                        'Driving under the influence of alcohol or drugs',
                        'Using the vehicle for unauthorized commercial transportation services'
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
                    heading: 'Insurance Coverage',
                    points: [
                        'Insurance coverage applicable to the rental will be communicated before confirmation',
                        'The customer is responsible for understanding the applicable coverage, exclusions and excess',
                        'Additional coverage options, where available, may be discussed before the rental is confirmed'
                    ]
                },
                {
                    heading: 'Additional Coverage',
                    points: [
                        'Additional protection options may be available depending on the vehicle and rental arrangement',
                        'Any optional coverage or protection will be communicated to the customer before it is added to the booking',
                        'Customers should confirm the scope and limitations of any additional coverage before accepting it'
                    ]
                },
                {
                    heading: 'Exclusions',
                    points: [
                        'Damage resulting from violation of the rental terms may not be covered',
                        'Damage resulting from unauthorized use of the vehicle may not be covered',
                        'Damage caused by unlawful or prohibited activities may not be covered',
                        'Personal belongings left inside the vehicle are the customer\'s responsibility'
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
                        'All rental rates are quoted in Kenyan Shillings (KES)',
                        'The rental rate is automatically determined by the length of the rental period',
                        'The applicable daily rate is displayed after the customer selects the vehicle and rental dates',
                        'The estimated rental total is calculated based on the selected vehicle, rental period and applicable daily rate',
                        'Rates and vehicle availability are subject to change for future bookings',
                        'Any additional charges applicable to a booking will be communicated before confirmation'
                    ]
                },
                {
                    heading: 'Rental Period & Pricing',
                    points: [
                        '1–7 days: Short-term rental rate',
                        '7–20 days: Medium-term rental rate',
                        '20 days or more: Long-term rental rate',
                        'The applicable rental pricing tier is determined automatically from the selected rental dates',
                        'The booking form displays the applicable daily rate and estimated rental total before the booking is submitted'
                    ]
                },
                {
                    heading: 'Payment & Booking Charges',
                    points: [
                        'The amount payable for the rental will be based on the confirmed booking details',
                        'Payment requirements may vary depending on the rental arrangement',
                        'Any applicable deposit, additional charge or payment requirement will be communicated before confirmation',
                        'Customers should retain payment confirmations and booking records for their records'
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
                        'Cancellation requests are subject to the terms applicable to the confirmed booking',
                        'Customers should contact Vision Wan Car Hire Services as soon as possible if they need to cancel or modify a booking',
                        'Cancellation charges, if applicable, will be communicated before cancellation is processed',
                        'Changes to a booking are subject to vehicle availability and confirmation'
                    ]
                },
                {
                    heading: 'Refund Policy',
                    points: [
                        'Where a refund is applicable, the customer will be informed of the applicable refund process',
                        'Refund processing times may depend on the payment method used',
                        'Any applicable non-refundable charges will be communicated before the booking is confirmed',
                        'Early return of a vehicle does not automatically guarantee a refund for unused rental time'
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
                        'The vehicle must be returned to the agreed location unless another arrangement has been approved',
                        'Any applicable mileage restrictions will be communicated as part of the rental arrangement',
                        'The vehicle should be returned with the agreed fuel level',
                        'The customer must use the vehicle responsibly and in accordance with applicable traffic laws'
                    ]
                },
                {
                    heading: 'Damage & Repairs',
                    points: [
                        'The customer may be responsible for damage caused during the rental where applicable',
                        'Accidents, breakdowns or significant vehicle issues must be reported immediately',
                        'Repairs must not be undertaken without prior authorization except where necessary to protect the vehicle or occupants',
                        'Any applicable administrative or damage-related charges will be communicated to the customer'
                    ]
                }
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl mb-12">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=100"
                        alt="Legal documents"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-800/90" />
                </div>

                <div className="relative text-center py-16 px-4">
                    <div className="inline-flex p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-6">
                        <DocumentTextIcon className="h-12 w-12 text-[#FF6B35]" />
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4">
                        Terms & Conditions
                    </h1>

                    <p className="text-gray-300 text-xl">
                        Last updated: September 28, 2026
                    </p>

                    <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                        By using Vision Wan Car Hire Services, you agree to these
                        terms and conditions. Please read them carefully.
                    </p>
                </div>
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
                                        <div
                                            key={index}
                                            className="border-b border-gray-100 last:border-b-0 pb-8 last:pb-0"
                                        >
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                {item.heading}
                                            </h3>

                                            <ul className="space-y-3">
                                                {item.points.map(
                                                    (point, pointIndex) => (
                                                        <li
                                                            key={pointIndex}
                                                            className="flex items-start"
                                                        >
                                                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />

                                                            <span className="text-gray-700">
                                                                {point}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
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
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3" />
                                <span className="text-gray-700">
                                    Review the vehicle thoroughly at pickup
                                </span>
                            </li>

                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3" />
                                <span className="text-gray-700">
                                    Keep your rental agreement and booking
                                    confirmation for your records
                                </span>
                            </li>

                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3" />
                                <span className="text-gray-700">
                                    Report any vehicle issues or incidents
                                    immediately
                                </span>
                            </li>

                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3" />
                                <span className="text-gray-700">
                                    Confirm the rental rate and booking details
                                    before accepting the vehicle
                                </span>
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
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                                <span className="text-gray-700">
                                    Obey all applicable traffic laws
                                </span>
                            </li>

                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                                <span className="text-gray-700">
                                    Pay applicable tolls, parking charges and
                                    fines associated with your use of the vehicle
                                </span>
                            </li>

                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                                <span className="text-gray-700">
                                    Return the vehicle in the agreed condition
                                    and with the agreed fuel level
                                </span>
                            </li>

                            <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                                <span className="text-gray-700">
                                    Notify Vision Wan Car Hire Services promptly
                                    about accidents, damage or mechanical issues
                                </span>
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
                        By proceeding with your booking, you acknowledge that
                        you have read, understood, and agree to be bound by
                        these Terms and Conditions.
                    </p>

                    <p className="text-gray-700">
                        These terms constitute the agreement between you and
                        Vision Wan Car Hire Services regarding your rental and
                        should be read together with your booking confirmation
                        and any applicable rental agreement.
                    </p>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="agree"
                                className="h-5 w-5 text-primary-600 rounded"
                            />

                            <label
                                htmlFor="agree"
                                className="ml-3 text-gray-700"
                            >
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
                        We may update these terms periodically. Continued use
                        of our services after changes constitutes acceptance of
                        the updated terms, subject to applicable law.
                    </p>

                    <div className="flex items-center text-gray-600">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        <span>
                            Terms last reviewed: September 28, 2026
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Questions & Contact
                    </h3>

                    <p className="text-gray-700 mb-4">
                        For questions about these terms or to request
                        clarification:
                    </p>

                    <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                            <DocumentTextIcon className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0" />

                            <span>
                                visionwanservices@gmail.com
                            </span>
                        </div>

                        <div className="flex items-center text-gray-700">
                            <PhoneIcon className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0" />

                            <span>
                                +254 (705) 336 311
                            </span>
                        </div>

                        <div className="flex items-center text-gray-700">
                            <PhoneIcon className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0" />

                            <span>
                                +44 (7397) 549 590
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Notice */}
            <div className="mt-12 p-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                    © 2026 Vision Wan Car Hire Services. All rights reserved.
                </p>

                <p className="text-gray-500 text-sm mt-2">
                    These Terms and Conditions should be retained for your
                    records.
                </p>
            </div>
        </div>
    );
};

export default TermsPage;