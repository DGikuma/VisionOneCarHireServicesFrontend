import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';

interface BookingFormData {
    customerName: string;
    email: string;
    phone: string;
    pickupDate: string;
    returnDate: string;
    carType: string;
    pickupLocation: string;
    dropoffLocation: string;
    additionalInfo: string;
}

const carTypes = [
    { id: 'economy', name: 'Economy', description: 'Fuel-efficient, compact cars' },
    { id: 'compact', name: 'Compact', description: 'Perfect for city driving' },
    { id: 'mid-size', name: 'Mid-Size', description: 'Comfortable family cars' },
    { id: 'suv', name: 'SUV', description: 'Spacious and versatile' },
    { id: 'luxury', name: 'Luxury', description: 'Premium vehicles' },
    { id: 'van', name: 'Van', description: 'For group transportation' },
];

const BookingForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>();

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/bookings', data);

            toast.success('Booking confirmed! Check your email for the confirmation PDF.');
            reset();

            // In a real app, you might want to show a success modal with booking details
            console.log('Booking response:', response.data);
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Failed to create booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Car</h1>
                <p className="text-gray-600">Easy booking process with instant confirmation</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Customer Information */}
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <UserIcon className="h-6 w-6 mr-2 text-primary-600" />
                        Customer Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                {...register('customerName', { required: 'Full name is required' })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="John Doe"
                            />
                            {errors.customerName && (
                                <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <div className="relative">
                                <PhoneIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="tel"
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[\+]?[1-9][\d]{0,15}$/,
                                            message: 'Invalid phone number',
                                        },
                                    })}
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="+1234567890"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <CalendarIcon className="h-6 w-6 mr-2 text-primary-600" />
                        Booking Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pick-up Date *
                            </label>
                            <input
                                type="date"
                                {...register('pickupDate', { required: 'Pick-up date is required' })}
                                min={format(new Date(), 'yyyy-MM-dd')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            {errors.pickupDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.pickupDate.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Return Date *
                            </label>
                            <input
                                type="date"
                                {...register('returnDate', { required: 'Return date is required' })}
                                min={format(new Date(), 'yyyy-MM-dd')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            {errors.returnDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.returnDate.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Car Type *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {carTypes.map((car) => (
                                <label
                                    key={car.id}
                                    className="relative flex cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none hover:border-primary-500"
                                >
                                    <input
                                        type="radio"
                                        {...register('carType', { required: 'Please select a car type' })}
                                        value={car.id}
                                        className="sr-only"
                                    />
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <p className="font-medium text-gray-900">{car.name}</p>
                                                <p className="text-gray-500">{car.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.carType && (
                            <p className="mt-1 text-sm text-red-600">{errors.carType.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MapPinIcon className="inline h-5 w-5 mr-1 text-gray-400" />
                                Pick-up Location
                            </label>
                            <input
                                type="text"
                                {...register('pickupLocation')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Main Office, 123 Street"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MapPinIcon className="inline h-5 w-5 mr-1 text-gray-400" />
                                Drop-off Location
                            </label>
                            <input
                                type="text"
                                {...register('dropoffLocation')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Same as pick-up"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Additional Information
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Special Requests or Notes
                        </label>
                        <textarea
                            {...register('additionalInfo')}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Any special requirements, additional drivers, etc."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto bg-primary-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'Confirm Booking'
                        )}
                    </button>
                    <p className="mt-4 text-sm text-gray-600">
                        No payment required. You'll receive a confirmation PDF via email.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;