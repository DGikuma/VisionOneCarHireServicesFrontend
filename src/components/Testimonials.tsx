import * as React from 'react';
import { useState } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import { Button } from "@heroui/react";

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: 'Michael Rodriguez',
            role: 'Business Executive',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200',
            rating: 5,
            content: 'The Mercedes S-Class I rented was immaculate. Perfect for my business meetings and the service was exceptional.',
            date: '2 weeks ago'
        },
        {
            name: 'Sarah Johnson',
            role: 'Family Vacationer',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200',
            rating: 5,
            content: 'Perfect family van for our road trip. Clean, comfortable, and the child seats were exactly what we needed.',
            date: '1 month ago'
        },
        {
            name: 'David Chen',
            role: 'Tech Entrepreneur',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200',
            rating: 4,
            content: 'Tesla Model 3 was a game-changer for my business trip. The autopilot made the long drive effortless.',
            date: '3 days ago'
        },
        {
            name: 'Emma Wilson',
            role: 'Event Planner',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200',
            rating: 5,
            content: 'Used their luxury cars for a corporate event. Professional service and stunning vehicles impressed all our clients.',
            date: '1 week ago'
        }
    ];

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                    Testimonials
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    What Our Clients Say
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
                </p>
            </div>

            <div className="relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-4">
                                <div className="bg-white rounded-2xl p-8 shadow-lg">
                                    <div className="flex items-center mb-6">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="ml-4">
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                            <div className="flex mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 text-lg italic mb-6">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="text-gray-500 text-sm">
                                        {testimonial.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={prev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                </Button>

                <Button
                    onClick={next}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                    <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                </Button>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                    <Button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                            ? 'bg-primary-600 w-8'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { name: 'Trustpilot', rating: '4.9/5', icon: '⭐' },
                    { name: 'Google Reviews', rating: '4.8/5', icon: '🌐' },
                    { name: 'TripAdvisor', rating: 'Excellent', icon: '🏆' },
                    { name: 'BBB', rating: 'A+ Rating', icon: '✅' }
                ].map((platform, index) => (
                    <div key={index} className="text-center">
                        <div className="text-3xl mb-2">{platform.icon}</div>
                        <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                        <p className="text-primary-600 font-bold">{platform.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;