import * as React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const CTASection: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="mb-8 lg:mb-0">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Experience Premium Car Hire?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Book your premium vehicle today and enjoy exceptional service that redefines luxury travel.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center">
                                <PhoneIcon className="h-6 w-6 text-primary-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-400">Call Us</p>
                                    <p className="text-lg font-semibold">+44 (7397) 549 590</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <EnvelopeIcon className="h-6 w-6 text-primary-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-400">Email Us</p>
                                    <p className="text-lg font-semibold">vision1servicesltd@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold mb-6">Quick Booking</h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                    <span className="font-bold">1</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Choose Your Vehicle</h4>
                                    <p className="text-gray-300 text-sm">Browse our premium fleet</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                    <span className="font-bold">2</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Fill Booking Details</h4>
                                    <p className="text-gray-300 text-sm">Simple form, no payment needed</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                    <span className="font-bold">3</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Get Confirmation</h4>
                                    <p className="text-gray-300 text-sm">PDF sent to your email instantly</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                to="/booking"
                                className="block w-full text-center bg-white text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
                            >
                                Start Booking Now
                            </Link>
                            <p className="text-center text-gray-300 text-sm mt-4">
                                No credit card required • Instant confirmation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTASection;