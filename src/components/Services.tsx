import * as React from 'react';
import {
    BriefcaseIcon,
    HeartIcon,
    HomeIcon,
    MapIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

import { Plane } from 'lucide-react';

const Services: React.FC = () => {
    const services = [
        {
            icon: BriefcaseIcon,
            title: 'Business Travel',
            description: 'Premium vehicles for corporate clients with flexible rental terms.',
            features: ['Airport Pickup', 'WiFi Enabled', 'Executive Class']
        },
        {
            icon: HomeIcon,
            title: 'Family Vacations',
            description: 'Spacious and safe vehicles perfect for family getaways.',
            features: ['Child Seats', 'GPS Navigation', 'Luggage Space']
        },
        {
            icon: Plane,
            title: 'Airport Transfers',
            description: 'Reliable airport pickup and drop-off services.',
            features: ['Flight Tracking', 'Meet & Greet', 'No Wait Time']
        },
        {
            icon: HeartIcon,
            title: 'Special Occasions',
            description: 'Luxury cars for weddings, anniversaries, and celebrations.',
            features: ['Chauffeur Service', 'Decoration', 'Red Carpet']
        },
        {
            icon: MapIcon,
            title: 'Long Distance',
            description: 'Comfortable vehicles for cross-country journeys.',
            features: ['Unlimited Mileage', 'Roadside Assistance', 'Comfort Packages']
        },
        {
            icon: ShieldCheckIcon,
            title: 'Insurance Replacement',
            description: 'Temporary vehicles while yours is being repaired.',
            features: ['Same Day Service', 'Direct Billing', 'Flexible Terms']
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                    Our Services
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Tailored Solutions for Every Need
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    We provide comprehensive car hire services designed to meet the unique requirements of every customer.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                    >
                        <div className="inline-flex p-4 bg-primary-100 rounded-2xl mb-6">
                            <service.icon className="h-8 w-8 text-primary-600" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {service.title}
                        </h3>

                        <p className="text-gray-600 mb-6">
                            {service.description}
                        </p>

                        <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <button className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                                Learn More →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Need a Custom Solution?
                        </h3>
                        <p className="text-primary-100 mb-6">
                            Contact us for personalized service packages and corporate rates.
                        </p>
                        <button className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Get Custom Quote
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { value: '100+', label: 'Vehicles' },
                            { value: '24/7', label: 'Support' },
                            { value: '50+', label: 'Locations' },
                            { value: '98%', label: 'Satisfaction' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <p className="text-3xl font-bold">{stat.value}</p>
                                <p className="text-primary-200 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;