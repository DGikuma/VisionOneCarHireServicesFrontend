import * as React from 'react';
import {
    UsersIcon,
    TruckIcon,
    MapIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const Stats: React.FC = () => {
    const stats = [
        {
            icon: UsersIcon,
            value: '10,000+',
            label: 'Satisfied Customers',
            description: 'Trusted by individuals and businesses'
        },
        {
            icon: TruckIcon,
            value: '500+',
            label: 'Vehicles in Fleet',
            description: 'Regularly updated and maintained'
        },
        {
            icon: MapIcon,
            value: '50+',
            label: 'Service Locations',
            description: 'Nationwide coverage'
        },
        {
            icon: CheckCircleIcon,
            value: '99%',
            label: 'On-Time Service',
            description: 'Reliability guaranteed'
        }
    ];

    return (
        <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Numbers That Speak
                    </h2>
                    <p className="text-primary-200 max-w-2xl mx-auto">
                        Our commitment to excellence is reflected in these numbers
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-6">
                                <stat.icon className="h-8 w-8" />
                            </div>
                            <p className="text-4xl font-bold mb-2">{stat.value}</p>
                            <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                            <p className="text-primary-200">{stat.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-6">
                        <div className="flex items-center">
                            <CheckCircleIcon className="h-6 w-6 text-green-400 mr-2" />
                            <span>24/7 Roadside Assistance</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircleIcon className="h-6 w-6 text-green-400 mr-2" />
                            <span>Full Insurance Coverage</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircleIcon className="h-6 w-6 text-green-400 mr-2" />
                            <span>Free Cancellation</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;