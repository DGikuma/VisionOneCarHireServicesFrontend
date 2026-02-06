import { useState, forwardRef, useImperativeHandle, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
    CalendarIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    CheckCircleIcon,
    DocumentDuplicateIcon,
    IdentificationIcon,
    CreditCardIcon,
    CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';

// API base URL from environment variables or default
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

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
    idNumber: string;
    idType: 'id' | 'passport';
    termsAccepted: boolean;
    depositProof?: File;
    idDocument?: File;
    drivingLicense?: File;
}

interface BookingFormProps {
    activeStep: number;
    onNextStep?: () => void;
    onPrevStep?: () => void;
    onComplete?: () => void;
}

export interface BookingFormRef {
    validateStep: () => Promise<boolean>;
    getFormData: () => BookingFormData | null;
    resetForm: () => void;
}

interface BookingResponse {
    message: string;
    booking: {
        id: string;
        customerName: string;
        email: string;
        phone: string;
        pickupDate: string;
        returnDate: string;
        carType: string;
        pickupLocation: string;
        dropoffLocation?: string;
        additionalInfo?: string;
        bookingDate: string;
        status: string;
    };
}

interface CarType {
    id: string;
    name: string;
    description: string;
}

const carTypes: CarType[] = [
    { id: 'economy', name: 'Economy', description: 'Fuel-efficient, compact cars' },
    { id: 'compact', name: 'Compact', description: 'Perfect for city driving' },
    { id: 'mid-size', name: 'Mid-Size', description: 'Comfortable family cars' },
    { id: 'suv', name: 'SUV', description: 'Spacious and versatile' },
    { id: 'luxury', name: 'Luxury', description: 'Premium vehicles' },
    { id: 'van', name: 'Van', description: 'For group transportation' },
];

const BookingForm = forwardRef<BookingFormRef, BookingFormProps>(({ activeStep, onNextStep, onPrevStep, onComplete }, ref) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [bookingData, setBookingData] = useState<BookingResponse['booking'] | null>(null);
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [drivingLicense, setDrivingLicense] = useState<File | null>(null);
    const [depositProof, setDepositProof] = useState<File | null>(null);

    // Add this utility function near the top of the component
    const formatPhoneForDisplay = (phone: string): string => {
        if (!phone) return 'Not provided';

        // Ensure phone starts with +
        let formatted = phone.replace(/[^\d+]/g, '');
        if (!formatted.startsWith('+')) {
            formatted = '+' + formatted;
        }

        // Format with spaces for readability: +XXX XXX XXX XXX
        const digits = formatted.substring(1);
        if (digits.length <= 3) return formatted;

        // Format based on common patterns
        if (formatted.startsWith('+254')) { // Kenya
            return formatted.replace(/(\+\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        } else if (formatted.startsWith('+44')) { // UK
            return formatted.replace(/(\+\d{2})(\d{4})(\d{3})(\d{3})/, '$1 $2 $3 $4');
        } else if (formatted.startsWith('+1')) { // US/Canada
            return formatted.replace(/(\+\d{1})(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4');
        }

        // Default formatting: group in 3s
        return formatted.replace(/(\+\d{1,4})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    };

    const debugFiles = () => {
        console.group('📁 File Debug Info');
        console.log('idDocument:', idDocument ?
            `${idDocument.name} (${idDocument.size} bytes)` : 'NULL');
        console.log('drivingLicense:', drivingLicense ?
            `${drivingLicense.name} (${drivingLicense.size} bytes)` : 'NULL');
        console.log('depositProof:', depositProof ?
            `${depositProof.name} (${depositProof.size} bytes)` : 'NULL');
        console.groupEnd();
    };

    const validateFile = (file: File, maxSizeMB: number = 5): boolean => {
        const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes

        if (file.size > maxSize) {
            toast.error(`File "${file.name}" exceeds ${maxSizeMB}MB limit`, {
                position: "top-right",
                autoClose: 5000,
            });
            return false;
        }

        // Optional: Add file type validation
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            toast.error(`File "${file.name}" must be JPG, PNG, or PDF`, {
                position: "top-right",
                autoClose: 5000,
            });
            return false;
        }

        return true;
    };

    const { register, handleSubmit, formState: { errors }, reset, trigger, watch, getValues } = useForm<BookingFormData>({
        defaultValues: {
            idType: 'id'
        }
    });

    // Account details for deposit
    const depositDetails = {
        mpesa: {
            paybill: '123456',
            account: 'CARHIRE DEPOSIT',
            instructions: 'Use your name as account number'
        },
        uk: {
            bank: 'Barclays Bank',
            accountName: 'Vision One Car Hire Services',
            sortCode: '20-00-00',
            accountNumber: '12345678',
            iban: 'GB33BUKB20201512345678'
        }
    };

    // Create axios instance with interceptors for logging
    const apiClient = useMemo(() => {
        const client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add request interceptor for logging
        client.interceptors.request.use(
            (config) => {
                console.group('📨 Axios Request');
                console.log(`Method: ${config.method?.toUpperCase()}`);
                console.log(`URL: ${config.baseURL}${config.url}`);
                console.log('Headers:', config.headers);
                console.log('Data:', config.data);
                console.groupEnd();
                return config;
            },
            (error) => {
                console.error('❌ Request interceptor error:', error);
                return Promise.reject(error);
            }
        );

        // Add response interceptor for logging
        client.interceptors.response.use(
            (response) => {
                console.group('✅ Axios Response');
                console.log(`Status: ${response.status}`);
                console.log(`URL: ${response.config.url}`);
                console.log('Data:', response.data);
                console.log('Headers:', response.headers);
                console.groupEnd();
                return response;
            },
            (error) => {
                console.group('❌ Axios Error Response');
                console.log('Error occurred for URL:', error.config?.url);
                if (error.response) {
                    console.log('Response status:', error.response.status);
                    console.log('Response data:', error.response.data);
                    console.log('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.log('No response received. Request:', error.request);
                } else {
                    console.log('Error setting up request:', error.message);
                }
                console.groupEnd();
                return Promise.reject(error);
            }
        );

        return client;
    }, []);

    // Log environment info on mount
    useEffect(() => {
        console.group('🌍 Booking Form Environment');
        console.log('API Base URL:', API_BASE_URL);
        console.log('Node Environment:', process.env.NODE_ENV);
        console.log('Full Booking Endpoint:', `${API_BASE_URL}/api/bookings`);
        console.log('Full Contact Endpoint:', `${API_BASE_URL}/api/contact`);
        console.groupEnd();
    }, []);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
        validateStep: async () => {
            let fieldsToValidate: (keyof BookingFormData)[] = [];

            switch (activeStep) {
                case 1:
                    fieldsToValidate = ['pickupDate', 'returnDate', 'carType'];
                    break;
                case 2:
                    fieldsToValidate = ['customerName', 'email', 'phone', 'idNumber'];
                    break;
                case 3:
                    // Validate document uploads
                    if (!idDocument || !drivingLicense || !depositProof) {
                        toast.error('Please upload all required documents', {
                            position: "top-right",
                            autoClose: 5000,
                        });
                        return false;
                    }
                    return true;
                case 4:
                    fieldsToValidate = ['pickupLocation', 'termsAccepted'];
                    break;
            }

            const isValid = await trigger(fieldsToValidate);
            return isValid;
        },
        getFormData: () => getValues(),
        resetForm: () => {
            reset();
            setIdDocument(null);
            setDrivingLicense(null);
            setDepositProof(null);
            setConfirmed(false);
            setBookingData(null);
        }
    }));

    const onSubmit = async (data: BookingFormData) => {
        if (activeStep !== 4) {
            onNextStep?.();
            return;
        }

        // Check if terms are accepted
        if (!data.termsAccepted) {
            toast.error('Please accept the Terms and Conditions to proceed', {
                position: "top-right",
                autoClose: 5000,
            });
            return;
        }

        // Check if all required files are uploaded
        if (!idDocument || !drivingLicense || !depositProof) {
            console.error('❌ Missing files:', {
                idDocument: idDocument?.name || 'missing',
                drivingLicense: drivingLicense?.name || 'missing',
                depositProof: depositProof?.name || 'missing'
            });
            toast.error('Please upload all required documents', {
                position: "top-right",
                autoClose: 5000,
            });
            return;
        }

        console.log('✅ All files present:', {
            idDocument: idDocument.name,
            drivingLicense: drivingLicense.name,
            depositProof: depositProof.name
        });

        // Call debugFiles to verify files before submission
        debugFiles();

        setIsSubmitting(true);

        console.group('🚀 Booking Form Submission');
        console.log('📤 Form data being submitted:', data);

        try {
            // Create FormData for file uploads
            const formData = new FormData();

            // Add form fields
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (key === 'termsAccepted') {
                        // Convert boolean to string
                        formData.append(key, value.toString());
                    } else if (key === 'idType' && !value) {
                        // Ensure idType has a value
                        formData.append(key, 'id');
                    } else {
                        formData.append(key, value as string);
                    }
                }
            });

            // Add files FIRST
            formData.append('idDocument', idDocument);
            formData.append('drivingLicense', drivingLicense);
            formData.append('depositProof', depositProof);

            // Then log
            console.log('📋 FormData entries with files:');
            for (const pair of formData.entries()) {
                if (pair[1] instanceof File) {
                    console.log(`${pair[0]}: [File] ${pair[1].name} (${pair[1].type}, ${pair[1].size} bytes)`);
                } else {
                    console.log(pair[0] + ': ' + pair[1]);
                }
            }

            console.log('📡 Making POST request to backend...');

            const response = await apiClient.post<BookingResponse>('/api/bookings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('✅ Backend response received!');

            if (response.status === 201) {
                console.log('🎉 Booking created successfully!');

                // Success: Update state with response data
                setBookingData(response.data.booking);
                setConfirmed(true);

                // Show success toast
                toast.success('✅ Booking confirmed! Check your email for the confirmation PDF.', {
                    position: "top-right",
                    autoClose: 5000,
                });

                // Call onComplete callback if provided
                if (onComplete) {
                    setTimeout(() => {
                        onComplete();
                    }, 3000);
                }
            }
        } catch (error: any) {
            console.error('❌ Booking Submission Error:', error);

            if (error.response) {
                console.error('📡 Server response:', error.response.data);
                console.error('📊 Status:', error.response.status);

                const errorMessage = error.response.data?.error ||
                    error.response.data?.message ||
                    error.response.data?.errors?.[0]?.message ||
                    'Booking failed';

                toast.error(`❌ ${errorMessage}`, {
                    position: "top-right",
                    autoClose: 5000,
                });
            } else if (error.request) {
                console.error('🌐 Network error - No response received');
                toast.error('⚠️ Network error. Please check your connection and try again.', {
                    position: "top-right",
                    autoClose: 5000,
                });
            } else {
                console.error('⚡ Setup error:', error.message);
                toast.error('❌ Something went wrong. Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        } finally {
            console.log('🏁 Submission process completed');
            console.groupEnd();
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

    // Handle file uploads
    const handleIdDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (validateFile(file, 5)) {
                setIdDocument(file);
                console.log('✅ ID Document uploaded:', file.name, `(${(file.size / 1024).toFixed(2)} KB)`);
            } else {
                e.target.value = ''; // Reset input
                setIdDocument(null);
            }
        }
    };

    const handleDrivingLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (validateFile(file, 5)) {
                setDrivingLicense(file);
                console.log('✅ Driving License uploaded:', file.name, `(${(file.size / 1024).toFixed(2)} KB)`);
            } else {
                e.target.value = ''; // Reset input
                setDrivingLicense(null);
            }
        }
    };

    const handleDepositProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (validateFile(file, 10)) { // 10MB for deposit proof
                setDepositProof(file);
                console.log('✅ Deposit Proof uploaded:', file.name, `(${(file.size / 1024).toFixed(2)} KB)`);
            } else {
                e.target.value = ''; // Reset input
                setDepositProof(null);
            }
        }
    };

    // Render success message with backend data
    const renderSuccessMessage = () => {
        if (!bookingData) return null;

        return (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                        <CheckCircleIcon className="h-16 w-16 text-green-600" />
                        <div className="absolute -inset-4 border-2 border-green-500/30 rounded-full animate-pulse" />
                    </div>

                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-green-900 mb-2">Booking Confirmed!</h3>
                        <p className="text-green-700 mb-4">Your confirmation PDF has been sent to {bookingData.email}</p>

                        <div className="mt-4 p-4 bg-white/50 rounded-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                <div>
                                    <p className="text-sm text-gray-600">Booking ID</p>
                                    <p className="font-semibold text-gray-900">{bookingData.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Status</p>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                                        {bookingData.status.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Vehicle</p>
                                    <p className="font-semibold text-gray-900">{bookingData.carType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Booking Date</p>
                                    <p className="font-semibold text-gray-900">
                                        {format(new Date(bookingData.bookingDate), 'MMM dd, yyyy HH:mm')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
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
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <input
                                        type="radio"
                                        value={car.id}
                                        {...register('carType', { required: 'Please select a car type' })}
                                        className="peer sr-only"
                                        disabled={isSubmitting}
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
                <div className="space-y-8">
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter Your Full Name"
                                    disabled={isSubmitting}
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
                                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Enter Your Email Address"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Phone Number
                                </label>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="inline-flex items-center h-full px-4 py-4 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50">
                                            <span className="text-gray-700 font-medium">+</span>
                                        </div>
                                    </div>
                                    <div className="relative flex-1">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                // Remove all non-digit characters
                                                const value = e.target.value.replace(/\D/g, '');

                                                // Limit to 15 digits
                                                const limitedValue = value.length > 15 ? value.substring(0, 15) : value;

                                                setFormData({
                                                    ...formData,
                                                    phone: limitedValue
                                                });
                                            }}
                                            disabled={isSubmitting}
                                            className="w-full px-5 py-4 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="254 705 336 311"
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Example: +254 705 336 311
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ID Information Section */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                            <IdentificationIcon className="h-6 w-6 mr-2 text-[#FF6B35]" />
                            Identification Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ID Type *
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="id"
                                            {...register('idType', { required: 'Please select ID type' })}
                                            className="h-4 w-4 text-[#FF6B35] border-gray-300 focus:ring-[#FF6B35]"
                                        />
                                        <span className="ml-2 text-gray-700">National ID</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="passport"
                                            {...register('idType')}
                                            className="h-4 w-4 text-[#FF6B35] border-gray-300 focus:ring-[#FF6B35]"
                                        />
                                        <span className="ml-2 text-gray-700">Passport</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {formData.idType === 'passport' ? 'Passport Number *' : 'ID Number *'}
                                </label>
                                <input
                                    type="text"
                                    {...register('idNumber', {
                                        required: formData.idType === 'passport'
                                            ? 'Passport number is required'
                                            : 'ID number is required'
                                    })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300"
                                    placeholder={formData.idType === 'passport' ? 'Enter passport number' : 'Enter ID number'}
                                />
                                {errors.idNumber && (
                                    <p className="mt-2 text-sm text-red-600">{errors.idNumber.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload ID Card/Passport *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FF6B35] transition-colors duration-300">
                                    <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-sm text-gray-600 mb-2">
                                        {idDocument ? idDocument.name : 'Upload your ID document'}
                                    </p>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={handleIdDocumentUpload}
                                        className="hidden"
                                        id="idDocument"
                                    />
                                    <label
                                        htmlFor="idDocument"
                                        className="inline-block px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8B35] transition-colors duration-300 cursor-pointer"
                                    >
                                        Choose File
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">Max 5MB • JPG, PNG, PDF</p>
                                </div>
                                {!idDocument && activeStep === 2 && (
                                    <p className="mt-2 text-sm text-red-600">ID document is required</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Driving License *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FF6B35] transition-colors duration-300">
                                    <DocumentDuplicateIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-sm text-gray-600 mb-2">
                                        {drivingLicense ? drivingLicense.name : 'Upload your driving license'}
                                    </p>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={handleDrivingLicenseUpload}
                                        className="hidden"
                                        id="drivingLicense"
                                    />
                                    <label
                                        htmlFor="drivingLicense"
                                        className="inline-block px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8B35] transition-colors duration-300 cursor-pointer"
                                    >
                                        Choose File
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">Max 5MB • JPG, PNG, PDF</p>
                                </div>
                                {!drivingLicense && activeStep === 2 && (
                                    <p className="mt-2 text-sm text-red-600">Driving license is required</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Security Deposit */}
            {activeStep === 3 && (
                <div className="space-y-8">
                    {/* Deposit Instructions */}
                    <div className="bg-gradient-to-r from-[#FF6B35]/5 to-[#FF8B35]/5 rounded-2xl p-6 border border-[#FF6B35]/20">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                            <CreditCardIcon className="h-6 w-6 mr-2 text-[#FF6B35]" />
                            Security Deposit Payment
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* M-Pesa Section */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-green-600 font-bold">M</span>
                                    </div>
                                    M-Pesa Payment (Kenya)
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Paybill Number</p>
                                        <p className="text-xl font-bold text-gray-900 font-mono">{depositDetails.mpesa.paybill}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Account Number</p>
                                        <p className="text-lg font-semibold text-gray-900">{depositDetails.mpesa.account}</p>
                                        <p className="text-sm text-gray-500 mt-1">{depositDetails.mpesa.instructions}</p>
                                    </div>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Note:</strong> Deposit amount is 30% of the total rental cost.
                                            You will receive the exact amount after completing Step 1.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* UK Bank Section */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-600 font-bold">£</span>
                                    </div>
                                    Bank Transfer (UK/International)
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Bank Name</p>
                                        <p className="text-lg font-semibold text-gray-900">{depositDetails.uk.bank}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Account Name</p>
                                        <p className="text-lg font-semibold text-gray-900">{depositDetails.uk.accountName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Sort Code</p>
                                            <p className="font-mono text-gray-900">{depositDetails.uk.sortCode}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Account Number</p>
                                            <p className="font-mono text-gray-900">{depositDetails.uk.accountNumber}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">IBAN</p>
                                        <p className="font-mono text-sm text-gray-900">{depositDetails.uk.iban}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Important:</strong> The security deposit is fully refundable upon return of the
                                vehicle in good condition. Please include your booking reference in the payment description.
                            </p>
                        </div>
                    </div>

                    {/* Proof of Payment Upload */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <CloudArrowUpIcon className="h-6 w-6 mr-2 text-[#FF6B35]" />
                            Upload Proof of Payment
                        </h3>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF6B35] transition-colors duration-300">
                            <CloudArrowUpIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">
                                {depositProof ? 'Payment proof uploaded ✓' : 'Upload your payment confirmation'}
                            </p>
                            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                                Upload a screenshot or receipt of your payment transaction (M-Pesa message, bank transfer receipt, etc.)
                            </p>

                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                onChange={handleDepositProofUpload}
                                className="hidden"
                                id="depositProof"
                            />
                            <label
                                htmlFor="depositProof"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                                {depositProof ? 'Change File' : 'Choose File'}
                            </label>

                            {depositProof && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg inline-flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                                    <span className="text-green-800">{depositProof.name}</span>
                                </div>
                            )}

                            <p className="text-xs text-gray-500 mt-4">Accepted: JPG, PNG, PDF • Max 10MB</p>
                        </div>

                        {!depositProof && (
                            <p className="mt-3 text-sm text-red-600 text-center">
                                Proof of payment is required to proceed
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Step 4: Confirmation */}
            {activeStep === 4 && (
                <div className="space-y-6">
                    {/* Summary Card */}
                    <div className="bg-gradient-to-r from-[#FF6B35]/5 to-[#FF8B35]/5 rounded-2xl p-6 border border-[#FF6B35]/20">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Complete Booking Summary
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                                    <div>
                                        <p className="text-sm text-gray-600">{formData.idType === 'passport' ? 'Passport No.' : 'ID Number'}</p>
                                        <p className="font-semibold text-gray-900">{formData.idNumber || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Document Status */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-500 mb-3">DOCUMENT STATUS</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                                    {idDocument ? (
                                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
                                    ) : (
                                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3" />
                                    )}
                                    <span className={idDocument ? "text-gray-900" : "text-gray-500"}>
                                        ID Document
                                    </span>
                                </div>
                                <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                                    {drivingLicense ? (
                                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
                                    ) : (
                                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3" />
                                    )}
                                    <span className={drivingLicense ? "text-gray-900" : "text-gray-500"}>
                                        Driving License
                                    </span>
                                </div>
                                <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                                    {depositProof ? (
                                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
                                    ) : (
                                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3" />
                                    )}
                                    <span className={depositProof ? "text-gray-900" : "text-gray-500"}>
                                        Proof of Payment
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Locations */}
                        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                            <p className="text-sm text-amber-800">
                                <strong>Note:</strong> Pick-up within the Nairobi area attracts an additional
                                <strong> KES 1,000</strong> charge.
                                Drop-off within the Nairobi area also attracts an additional
                                <strong> KES 1,000</strong> charge.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPinIcon className="inline h-5 w-5 mr-1 text-gray-400" />
                                    Pick-up Location *
                                </label>
                                <input
                                    type="text"
                                    {...register('pickupLocation', {
                                        required: 'Pick-up location is required'
                                    })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter Pick Up "
                                    disabled={isSubmitting}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter Drop Off "
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Requests or Notes
                            </label>
                            <textarea
                                {...register('additionalInfo')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Any special requirements, additional drivers, etc."
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Terms and Conditions - Enhanced */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                {...register('termsAccepted', {
                                    required: 'You must accept the terms and conditions'
                                })}
                                className="h-5 w-5 text-[#FF6B35] rounded focus:ring-[#FF6B35] border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            />
                            <div className="text-sm">
                                <label className="font-medium text-gray-900">
                                    I agree to the Terms and Conditions *
                                </label>
                                <p className="text-gray-600 mt-1 mb-3">
                                    By proceeding, you acknowledge that you have read and agree to:
                                </p>

                                <ul className="space-y-2 text-gray-600 mb-4">
                                    <li className="flex items-start">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full mt-1.5 mr-3"></div>
                                        <span>Our rental agreement and terms of service</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full mt-1.5 mr-3"></div>
                                        <span>Security deposit terms and refund policy</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full mt-1.5 mr-3"></div>
                                        <span>Cancellation and modification policies</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full mt-1.5 mr-3"></div>
                                        <span>Privacy policy and data protection terms</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full mt-1.5 mr-3"></div>
                                        <span>Insurance coverage and liability terms</span>
                                    </li>
                                </ul>

                                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                    <p className="text-xs text-blue-800">
                                        <strong>Security Deposit Note:</strong> Your deposit is fully refundable within
                                        7 business days after vehicle return, provided there is no damage or
                                        violation of rental terms.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {errors.termsAccepted && (
                            <p className="mt-2 text-sm text-red-600">{errors.termsAccepted.message}</p>
                        )}
                    </div>

                    {/* Success Message */}
                    {confirmed && renderSuccessMessage()}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                {activeStep > 1 && (
                    <button
                        type="button"
                        onClick={onPrevStep}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting || confirmed}
                    >
                        ← Previous
                    </button>
                )}

                <div className="ml-auto">
                    {activeStep < 4 ? (
                        <button
                            type="button"
                            onClick={async () => {
                                console.log(`🔄 Moving from step ${activeStep} to ${activeStep + 1}`);
                                const isValid = await trigger();
                                console.log(`✓ Form validation result:`, isValid);
                                if (isValid) {
                                    onNextStep?.();
                                }
                            }}
                            className="group flex items-center px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                            disabled={isSubmitting}
                        >
                            Continue to Next Step
                            <svg className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting || confirmed || !formData.termsAccepted}
                            className={`group flex items-center px-12 py-4 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 ${formData.termsAccepted && !isSubmitting && !confirmed
                                ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] hover:shadow-xl hover:shadow-[#FF6B35]/20 cursor-pointer'
                                : 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-70'
                                }`}
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
                            ) : !formData.termsAccepted ? (
                                <span className="flex items-center">
                                    <svg className="ml-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Accept Terms to Confirm
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
                    Step {activeStep} of 4 • {
                        activeStep === 1 ? 'Reservation Details' :
                            activeStep === 2 ? 'Personal Information' :
                                activeStep === 3 ? 'Security Deposit' :
                                    'Confirmation'
                    }
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="progress-bar h-2 rounded-full transition-all duration-500"
                        style={{
                            '--progress-width': `${(activeStep / 4) * 100}%`,
                            '--color-start': '#FF6B35',
                            '--color-end': '#FF8B35'
                        } as React.CSSProperties}
                    />
                </div>
            </div>
        </form>
    );
});

BookingForm.displayName = 'BookingForm';

export default BookingForm;