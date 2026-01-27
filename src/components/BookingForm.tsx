import { useState, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
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

interface BookingFormProps {
    activeStep: number;
    onNextStep?: () => void;
    onPrevStep?: () => void;
}

export interface BookingFormRef {
    validateStep: () => Promise<boolean>;
    getFormData: () => BookingFormData | null;
}

const carTypes = [
    { id: 'economy', name: 'Economy', description: 'Fuel-efficient, compact cars' },
    { id: 'compact', name: 'Compact', description: 'Perfect for city driving' },
    { id: 'mid-size', name: 'Mid-Size', description: 'Comfortable family cars' },
    { id: 'suv', name: 'SUV', description: 'Spacious and versatile' },
    { id: 'luxury', name: 'Luxury', description: 'Premium vehicles' },
    { id: 'van', name: 'Van', description: 'For group transportation' },
];

const BookingForm = forwardRef<BookingFormRef, BookingFormProps>(({ activeStep, onNextStep, onPrevStep }, ref) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, trigger, watch, getValues } = useForm<BookingFormData>();

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
        validateStep: async () => {
            let fieldsToValidate: (keyof BookingFormData)[] = [];

            switch (activeStep) {
                case 1:
                    fieldsToValidate = ['pickupDate', 'returnDate', 'carType'];
                    break;
                case 2:
                    fieldsToValidate = ['customerName', 'email', 'phone'];
                    break;
                case 3:
                    fieldsToValidate = ['pickupLocation', 'dropoffLocation'];
                    break;
            }

            return await trigger(fieldsToValidate);
        },
        getFormData: () => getValues()
    }));

    const onSubmit = async (data: BookingFormData) => {
        if (activeStep !== 3) {
            onNextStep?.();
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/bookings', data);
            toast.success('Booking confirmed! Check your email for the confirmation PDF.');
            setConfirmed(true);

            // Reset form after successful submission
            setTimeout(() => {
                reset();
                setConfirmed(false);
                // You might want to navigate or reset steps here
            }, 3000);

            console.log('Booking response:', response.data);
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Failed to create booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formData = watch();

    // Calculate number of rental days
    const calculateRentalDays = () => {
        if (!formData.pickupDate || !formData.returnDate) return 0;
        const pickup = new Date(formData.pickupDate);
        const dropoff = new Date(formData.returnDate);
        const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 0;
    };

    // Get selected car details
    const getSelectedCar = () => {
        return carTypes.find(car => car.id === formData.carType);
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Not selected';
        return format(new Date(dateString), 'MMM dd, yyyy');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Reservation Details */}
            {activeStep === 1 && (
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <CalendarIcon className="h-6 w-6 mr-2 text-[#FF6B35]" />
                        Reservation Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pick-up Date *
                            </label>
                            <input
                                type="date"
                                {...register('pickupDate', {
                                    required: 'Pick-up date is required',
                                    validate: value => {
                                        const today = format(new Date(), 'yyyy-MM-dd');
                                        return value >= today || 'Pick-up date must be today or in the future';
                                    }
                                })}
                                min={format(new Date(), 'yyyy-MM-dd')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                            />
                            {errors.pickupDate && (
                                <p className="mt-2 text-sm text-red-600">{errors.pickupDate.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Return Date *
                            </label>
                            <input
                                type="date"
                                {...register('returnDate', {
                                    required: 'Return date is required',
                                    validate: value => {
                                        const pickupDate = watch('pickupDate');
                                        if (!pickupDate) return true;
                                        return value >= pickupDate || 'Return date must be after pick-up date';
                                    }
                                })}
                                min={watch('pickupDate') || format(new Date(), 'yyyy-MM-dd')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                            />
                            {errors.returnDate && (
                                <p className="mt-2 text-sm text-red-600">{errors.returnDate.message}</p>
                            )}
                        </div>
                    </div>

                    {formData.pickupDate && formData.returnDate && (
                        <div className="mb-8 p-4 bg-gradient-to-r from-[#FF6B35]/5 to-[#FF8B35]/5 rounded-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-600">Rental Duration</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {calculateRentalDays()} day{calculateRentalDays() !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">
                                        {formatDate(formData.pickupDate)} → {formatDate(formData.returnDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            Select Vehicle Type *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {carTypes.map((car) => (
                                <label
                                    key={car.id}
                                    className={`relative flex flex-col cursor-pointer rounded-xl border-2 p-4 transition-all duration-300
                                        ${formData.carType === car.id
                                            ? 'border-[#FF6B35] bg-gradient-to-r from-[#FF6B35]/5 to-[#FF8B35]/5 shadow-md'
                                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        value={car.id}
                                        {...register('carType', { required: 'Please select a car type' })}
                                        className="peer sr-only"
                                    />
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-semibold text-gray-900">{car.name}</p>
                                        {formData.carType === car.id && (
                                            <CheckCircleIcon className="h-5 w-5 text-[#FF6B35]" />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{car.description}</p>
                                </label>
                            ))}
                        </div>
                        {errors.carType && !formData.carType && (
                            <p className="mt-4 text-sm text-red-600">{errors.carType.message}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Step 2: Personal Information */}
            {activeStep === 2 && (
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <UserIcon className="h-6 w-6 mr-2 text-[#FF6B35]" />
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                {...register('customerName', {
                                    required: 'Full name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Name must be at least 2 characters'
                                    }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                                placeholder="Enter Your Full Name"
                            />
                            {errors.customerName && (
                                <p className="mt-2 text-sm text-red-600">{errors.customerName.message}</p>
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
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter Your Email Address"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
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
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter Your Phone Number"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Confirmation */}
            {activeStep === 3 && (
                <div className="space-y-6">
                    {/* Summary Card */}
                    <div className="bg-gradient-to-r from-[#FF6B35]/5 to-[#FF8B35]/5 rounded-2xl p-6 border border-[#FF6B35]/20">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Booking Summary
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">RESERVATION DETAILS</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600">Vehicle Type</p>
                                        <p className="font-semibold text-gray-900">
                                            {getSelectedCar()?.name || 'Not selected'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Rental Period</p>
                                        <p className="font-semibold text-gray-900">
                                            {formatDate(formData.pickupDate)} → {formatDate(formData.returnDate)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            ({calculateRentalDays()} day{calculateRentalDays() !== 1 ? 's' : ''})
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">PERSONAL INFORMATION</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600">Full Name</p>
                                        <p className="font-semibold text-gray-900">{formData.customerName || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Contact</p>
                                        <p className="font-semibold text-gray-900">{formData.email || 'Not provided'}</p>
                                        <p className="text-sm text-gray-600">{formData.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Locations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPinIcon className="inline h-5 w-5 mr-1 text-gray-400" />
                                    Pick-up Location
                                </label>
                                <input
                                    type="text"
                                    {...register('pickupLocation', {
                                        required: 'Pick-up location is required'
                                    })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                                    placeholder="Main Office, 123 Street"
                                />
                                {errors.pickupLocation && (
                                    <p className="mt-2 text-sm text-red-600">{errors.pickupLocation.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPinIcon className="inline h-5 w-5 mr-1 text-gray-400" />
                                    Drop-off Location
                                </label>
                                <input
                                    type="text"
                                    {...register('dropoffLocation')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                                    placeholder="Same as pick-up"
                                />
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Requests or Notes
                            </label>
                            <textarea
                                {...register('additionalInfo')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                                placeholder="Any special requirements, additional drivers, etc."
                            />
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="terms"
                                className="h-5 w-5 text-[#FF6B35] rounded focus:ring-[#FF6B35] border-gray-300"
                            />
                            <div className="text-sm">
                                <label htmlFor="terms" className="font-medium text-gray-900">
                                    I agree to the Terms and Conditions
                                </label>
                                <p className="text-gray-600 mt-1">
                                    By proceeding, you acknowledge that you have read and agree to our rental terms,
                                    cancellation policy, and privacy policy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {confirmed && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                            <div className="flex items-center justify-center space-x-3">
                                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                                <div>
                                    <h3 className="font-semibold text-green-900">Booking Confirmed!</h3>
                                    <p className="text-green-700">Your confirmation PDF has been sent to {formData.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                {activeStep > 1 && (
                    <button
                        type="button"
                        onClick={onPrevStep}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                    >
                        ← Previous
                    </button>
                )}

                <div className="ml-auto">
                    {activeStep < 3 ? (
                        <button
                            type="button"
                            onClick={async () => {
                                const isValid = await trigger();
                                if (isValid) {
                                    onNextStep?.();
                                }
                            }}
                            className="group flex items-center px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Continue to Next Step
                            <svg className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting || confirmed}
                            className="group flex items-center px-12 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : confirmed ? (
                                <span className="flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                                    Booking Confirmed
                                </span>
                            ) : (
                                <>
                                    Confirm Booking
                                    <svg className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Step {activeStep} of 3 • {activeStep === 1 ? 'Reservation Details' : activeStep === 2 ? 'Personal Information' : 'Confirmation'}
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(activeStep / 3) * 100}%` }}
                    />
                </div>
            </div>
        </form>
    );
});

BookingForm.displayName = 'BookingForm';

export default BookingForm;