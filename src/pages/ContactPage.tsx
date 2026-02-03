// src/components/ContactPage.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ClockIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    SparklesIcon,
    ArrowRightIcon,
    GlobeAltIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as SolidCheck } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

// API base URL from environment variables or default
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

// TypeScript interfaces
interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    message: string;
    department: string;
}

interface ContactResponse {
    message: string;
    inquiry: {
        id: string;
        name: string;
        email: string;
        subject: string;
        department: string;
        priority: 'low' | 'normal' | 'high' | 'urgent';
        estimatedResponseTime: string;
        submissionDate: string;
    };
}

interface Department {
    id: string;
    name: string;
    email: string;
    phone: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ContactChannel {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    details: string[];
    description: string;
    color: string;
    action: string;
}

interface Location {
    city: string;
    country: string;
    address: string;
    phone: string;
    hours: string;
    features: string[];
    featured: boolean;
}

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        department: 'general'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeDepartment, setActiveDepartment] = useState('general');
    const [submissionData, setSubmissionData] = useState<ContactResponse['inquiry'] | null>(null);

    const apiClient = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add request interceptor for logging
    apiClient.interceptors.request.use(
        (config) => {
            console.log(`📨 Outgoing ${config.method?.toUpperCase()} request to:`, config.url);
            console.log('Request data:', config.data);
            console.log('Request headers:', config.headers);
            return config;
        },
        (error) => {
            console.error('❌ Request interceptor error:', error);
            return Promise.reject(error);
        }
    );

    // Add response interceptor for logging
    apiClient.interceptors.response.use(
        (response) => {
            console.log(`✅ Response received from ${response.config.url}:`, response.status);
            return response;
        },
        (error) => {
            console.error(`❌ Response error from ${error.config?.url}:`, error.message);
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        // Log environment info
        console.group('🌍 Environment Information');
        console.log('API Base URL:', API_BASE_URL);
        console.log('Node Environment:', process.env.NODE_ENV);
        console.log('Full API URL for contact endpoint:', `${API_BASE_URL}/api/contact`);
        console.groupEnd();

        // Add subtle animations on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.contact-card, .form-card, .location-card').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDepartmentChange = (departmentId: string) => {
        setActiveDepartment(departmentId);
        setFormData(prev => ({ ...prev, department: departmentId }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Log form data being sent
        console.log('📤 Submitting form data:', formData);
        console.log('🔗 API Base URL:', API_BASE_URL);
        console.log('🎯 Full endpoint:', `${API_BASE_URL}/api/contact`);

        try {
            // Send form data to backend API
            console.log('🚀 Making POST request to backend...');

            const response = await apiClient.post<ContactResponse>('/api/contact', formData);

            console.log('✅ Backend response received!');
            console.log('📊 Response status:', response.status);
            console.log('📦 Response data:', response.data);
            console.log('📋 Response headers:', response.headers);

            if (response.status === 201) {
                // Success: Update state with response data
                setSubmissionData(response.data.inquiry);
                setIsSubmitted(true);

                console.log('🎉 Success - Inquiry ID:', response.data.inquiry.id);
                console.log('📧 Email sent to:', response.data.inquiry.email);

                // Show success toast
                toast.success('✅ Inquiry submitted successfully! Check your email for confirmation.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                // Reset form data
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    subject: '',
                    message: '',
                    department: 'general'
                });

                // Reset active department
                setActiveDepartment('general');

                // Auto-reset success message after 10 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                    setSubmissionData(null);
                }, 10000);
            }
        } catch (error: any) {
            console.group('❌ Submission Error');
            console.error('Error type:', error.constructor.name);
            console.error('Error message:', error.message);

            // Handle different types of errors
            if (error.response) {
                // Server responded with error status
                console.error('📡 Server responded with error:', error.response.status);
                console.error('📋 Error data:', error.response.data);
                console.error('📨 Error headers:', error.response.headers);

                const errorMessage = error.response.data?.error || error.response.data?.message || 'Submission failed';
                console.error('📝 Error message:', errorMessage);

                if (error.response.status === 400) {
                    // Validation errors
                    console.warn('⚠️ Validation error - Check form data');
                    toast.error(`❌ ${errorMessage}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else if (error.response.status === 429) {
                    // Rate limiting
                    console.warn('⏰ Rate limit exceeded');
                    toast.error('⚠️ Too many requests. Please try again in a few minutes.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else {
                    // Other server errors
                    console.error('🔥 Server error:', error.response.status);
                    toast.error(`❌ Server error (${error.response.status}). Please try again later.`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            } else if (error.request) {
                // Request made but no response
                console.error('🌐 Network error - No response received');
                console.error('Request details:', error.request);
                console.error('Request URL:', error.config?.url);
                console.error('Request method:', error.config?.method);

                toast.error('⚠️ Network error. Please check your connection and try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                // Other errors
                console.error('⚡ Setup error:', error.message);
                console.error('Error config:', error.config);

                toast.error('❌ Something went wrong. Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }

            console.groupEnd();

            // Optionally log full error for debugging
            if (process.env.NODE_ENV === 'development') {
                console.error('🔍 Full error object:', error);
            }
        } finally {
            console.log('🏁 Submission process completed');
            setIsSubmitting(false);
        }
    };

    const renderSuccessMessage = () => {
        if (!submissionData) return null;

        return (
            <div className="text-center py-12">
                <div className="relative inline-block mb-6">
                    <CheckCircleIcon className="h-20 w-20 text-green-500" />
                    <div className="absolute -inset-4 border-2 border-green-500/30 rounded-full animate-pulse" />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Inquiry Submitted Successfully!
                </h3>

                <div className="mb-8 max-w-lg mx-auto bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-4">
                        <div>
                            <p className="text-sm text-gray-600">Reference ID</p>
                            <p className="font-semibold text-gray-900">{submissionData.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Priority</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${submissionData.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                submissionData.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                {submissionData.priority.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Department</p>
                            <p className="font-semibold text-gray-900">
                                {executiveDepartments.find(d => d.id === submissionData.department)?.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Estimated Response</p>
                            <p className="font-semibold text-gray-900">{submissionData.estimatedResponseTime}</p>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                        Thank you for contacting Vision One Executive Services.
                        A confirmation email has been sent to {submissionData.email}.
                        Our team will respond within the estimated time frame.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span>Submitted: {new Date(submissionData.submissionDate).toLocaleString()}</span>
                    </div>
                    <button
                        onClick={() => {
                            setIsSubmitted(false);
                            setSubmissionData(null);
                        }}
                        className="px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    };

    const contactChannels: ContactChannel[] = [
        {
            icon: PhoneIcon,
            title: 'Executive Support',
            details: ['+254 (705) 336 311', '+44 (7397) 549 590'],
            description: '24/7 premium concierge service for urgent matters',
            color: 'from-[#FF6B35] to-[#FF8B35]',
            action: 'Call Now'
        },
        {
            icon: EnvelopeIcon,
            title: 'Email Communications',
            details: ['executive@visionone.com', 'vision1servicesltd@gmail.com'],
            description: 'Guaranteed response within 2 business hours',
            color: 'from-[#FF8B35] to-[#FF7B35]',
            action: 'Send Email'
        },
        {
            icon: MapPinIcon,
            title: 'Global Headquarters',
            details: ['One Executive Plaza, Suite 1000', '123 Premium Avenue, New York, NY 10001'],
            description: 'Premium service centers in 50+ global locations',
            color: 'from-[#FF7B35] to-[#FF6B35]',
            action: 'Get Directions'
        },
        {
            icon: ClockIcon,
            title: 'Premium Hours',
            details: ['Concierge: 24/7', 'Executive Office: 8 AM - 10 PM EST'],
            description: 'Dedicated support for premium and corporate clients',
            color: 'from-[#FF6B35] to-[#FF8B35]',
            action: 'View Schedule'
        }
    ];

    const executiveDepartments: Department[] = [
        {
            id: 'general',
            name: 'Executive Office',
            email: 'vision1servicesltd@gmail.com',
            phone: '+254 (705) 336 311',
            description: 'For strategic partnerships and executive-level inquiries',
            icon: BuildingOfficeIcon
        },
        {
            id: 'booking',
            name: 'Premium Reservations',
            email: 'vision1servicesltd@gmail.com',
            phone: '+254 (705) 336 311',
            description: 'Personalized booking assistance and itinerary planning',
            icon: DocumentTextIcon
        },
        {
            id: 'corporate',
            name: 'Corporate Services',
            email: 'vision1servicesltd@gmail.com',
            phone: '+254 (705) 336 311',
            description: 'Enterprise fleet management and corporate accounts',
            icon: UserGroupIcon
        },
        {
            id: 'support',
            name: 'Premium Support',
            email: 'vision1servicesltd@gmail.com',
            phone: '+254 (705) 336 311',
            description: '24/7 concierge service and roadside assistance',
            icon: ShieldCheckIcon
        }
    ];

    const globalLocations: Location[] = [
        {
            city: 'Kilimani, Nairobi',
            country: 'Kenya',
            address: 'Equity Building 1st Floor, Opp. Yaya Center',
            phone: '+254 (705) 336 311',
            hours: '24/7 Premium Lounge',
            features: ['Executive Lounge', 'Premium Valet', 'Conference Facilities'],
            featured: true
        },
        {
            city: 'Kent',
            country: 'United Kingdom',
            address: '456 Sunset Boulevard, Beverly Hills, CA 90210',
            phone: '+44 (7397) 549 590',
            hours: '24/7 Premium Lounge',
            features: ['Private Showroom', 'Luxury Detailing', 'Chauffeur Services'],
            featured: false
        }
    ];

    const handleContactAction = (channel: ContactChannel) => {
        switch (channel.action) {
            case 'Call Now':
                window.open(`tel:${channel.details[0].replace(/[^+\d]/g, '')}`);
                break;
            case 'Send Email':
                window.open(`mailto:${channel.details[0]}?subject=Inquiry from Vision One Website`);
                break;
            case 'Get Directions':
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(channel.details[0])}`);
                break;
            case 'View Schedule':
                toast.info('Schedule: 24/7 Concierge, Executive Office: 8 AM - 10 PM EST', {
                    position: "top-right",
                    autoClose: 3000,
                });
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
                {/* Animated Background Particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px h-px bg-[#FF6B35] rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.3}s`,
                                boxShadow: '0 0 20px 2px rgba(255, 107, 53, 0.5)'
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full border border-[#FF6B35]/20 mb-6">
                        <SparklesIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE CONNECTIONS</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                            Premium Contact & Support
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Connect with our executive team for unparalleled service, strategic partnerships,
                        and premium support tailored to your unique mobility requirements.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-2xl font-bold text-white">2</span>
                            <p className="text-sm text-gray-400">Hour Response</p>
                        </div>
                        <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-2xl font-bold text-white">24/7</span>
                            <p className="text-sm text-gray-400">Premium Support</p>
                        </div>
                        <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-2xl font-bold text-white">50+</span>
                            <p className="text-sm text-gray-400">Global Locations</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Channels */}
            <div className="relative -mt-16 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactChannels.map((channel, index) => (
                            <div
                                key={index}
                                className="contact-card group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 opacity-0"
                            >
                                {/* Gradient Header */}
                                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${channel.color} rounded-t-2xl`} />

                                <div className="pt-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-3 bg-gradient-to-br ${channel.color} rounded-xl text-white`}>
                                            <channel.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors duration-300">
                                            {channel.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {channel.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-700 font-medium">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-500 mb-6">
                                        {channel.description}
                                    </p>

                                    <button
                                        onClick={() => handleContactAction(channel)}
                                        className="text-[#FF6B35] font-semibold flex items-center group/btn hover:text-[#FF8B35] transition-colors duration-300"
                                    >
                                        <span>{channel.action}</span>
                                        <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF6B35]/20 rounded-2xl transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Departments & Information */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                                    <BuildingOfficeIcon className="h-4 w-4 text-[#FF6B35]" />
                                    <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE DEPARTMENTS</span>
                                </div>

                                <div className="space-y-4">
                                    {executiveDepartments.map((dept) => (
                                        <div
                                            key={dept.id}
                                            className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${activeDepartment === dept.id
                                                ? 'border-[#FF6B35] bg-gradient-to-r from-[#FF6B35]/5 to-transparent shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                                }`}
                                            onClick={() => handleDepartmentChange(dept.id)}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-xl ${activeDepartment === dept.id
                                                    ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] text-white'
                                                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                                    }`}>
                                                    <dept.icon className="h-5 w-5" />
                                                </div>

                                                <div>
                                                    <h3 className={`font-bold text-lg mb-2 ${activeDepartment === dept.id
                                                        ? 'text-[#FF6B35]'
                                                        : 'text-gray-900'
                                                        }`}>
                                                        {dept.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        {dept.description}
                                                    </p>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <EnvelopeIcon className="h-4 w-4 mr-2" />
                                                            {dept.email}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <PhoneIcon className="h-4 w-4 mr-2" />
                                                            {dept.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Assurance Card */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6B35]/10 rounded-full -translate-y-20 translate-x-20" />

                                <div className="relative">
                                    <ShieldCheckIcon className="h-12 w-12 text-[#FF6B35] mb-6" />

                                    <h3 className="text-xl font-bold text-white mb-4">
                                        Premium Assurance
                                    </h3>

                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center text-white/80">
                                            <SolidCheck className="h-5 w-5 text-[#FF6B35] mr-3" />
                                            <span>Guaranteed 2-hour response time</span>
                                        </li>
                                        <li className="flex items-center text-white/80">
                                            <SolidCheck className="h-5 w-5 text-[#FF6B35] mr-3" />
                                            <span>24/7 executive support line</span>
                                        </li>
                                        <li className="flex items-center text-white/80">
                                            <SolidCheck className="h-5 w-5 text-[#FF6B35] mr-3" />
                                            <span>Dedicated account management</span>
                                        </li>
                                    </ul>

                                    <button
                                        onClick={() => toast.info('Service Level Agreement coming soon!', {
                                            position: "top-right",
                                            autoClose: 3000,
                                        })}
                                        className="w-full py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                                    >
                                        View Service Level Agreement
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="form-card bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden opacity-0">
                            {/* Form Header */}
                            <div className="bg-gradient-to-r from-gray-50 to-white p-8 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            Executive Contact Form
                                        </h2>
                                        <p className="text-gray-600">
                                            Complete this form for premium support and executive-level inquiries
                                        </p>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="px-4 py-2 bg-gray-100 rounded-lg">
                                            <span className="text-sm font-medium text-gray-700">
                                                Department: {executiveDepartments.find(d => d.id === activeDepartment)?.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-8">
                                {isSubmitted ? (
                                    renderSuccessMessage()
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isSubmitting}
                                                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                    placeholder="John A. Smith"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isSubmitting}
                                                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                    placeholder="john.smith@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                    placeholder="+254705336311"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                                    Company / Organization
                                                </label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                    placeholder="Acme Corporation"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                disabled={isSubmitting}
                                                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Brief description of your inquiry"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                disabled={isSubmitting}
                                                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Please provide details about your inquiry, requirements, and any specific assistance needed..."
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35]"
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing Request...
                                                    </span>
                                                ) : (
                                                    'Submit Executive Inquiry'
                                                )}
                                            </button>
                                            <p className="text-gray-500 text-sm mt-4 text-center">
                                                Our premium team typically responds within 2 hours during business hours.
                                            </p>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Live Support */}
                        <div className="mt-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Immediate Premium Support
                                    </h3>
                                    <p className="text-gray-600">
                                        Connect instantly with our executive concierge team
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => toast.info('Live chat coming soon!', {
                                            position: "top-right",
                                            autoClose: 3000,
                                        })}
                                        className="group px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300 flex items-center justify-center"
                                    >
                                        <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                                        Start Live Chat
                                    </button>
                                    <button
                                        onClick={() => window.open('tel:+254705336311')}
                                        className="group px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <PhoneIcon className="h-5 w-5 mr-2" />
                                        Call: +254 (705) 336 311
                                    </button>
                                    <button
                                        onClick={() => window.open('tel:+447397549590')}
                                        className="group px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <PhoneIcon className="h-5 w-5 mr-2" />
                                        Call: +44 (7397) 549 590
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Locations */}
            <div className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                            <GlobeAltIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">GLOBAL PRESENCE</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Premium Service Centers
                        </h2>

                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Access our premium facilities and executive lounges in major cities worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {globalLocations.map((location, index) => (
                            <div
                                key={index}
                                className="location-card group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 opacity-0"
                            >
                                {location.featured && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white text-xs font-bold rounded-full shadow-lg">
                                            HEADQUARTERS
                                        </span>
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {location.city}
                                        </h3>
                                        <p className="text-gray-500 text-sm">{location.country}</p>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-start text-gray-600">
                                            <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{location.address}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                                            <span className="text-sm">{location.phone}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <ClockIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                                            <span className="text-sm">{location.hours}</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Premium Features</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {location.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toast.info(`Details for ${location.city} coming soon!`, {
                                            position: "top-right",
                                            autoClose: 3000,
                                        })}
                                        className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-300"
                                    >
                                        View Location Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Map Visualization */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 opacity-10 pattern-grid" />

                            <style>{`
                                    .pattern-grid {
                                        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                                    }
                            `}</style>
                        </div>

                        <div className="relative text-center">
                            <GlobeAltIcon className="h-16 w-16 text-[#FF6B35] mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Global Network Map
                            </h3>
                            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                                Interactive map showing all our premium service centers and executive lounges worldwide
                            </p>
                            <button
                                onClick={() => toast.info('Global network map coming soon!', {
                                    position: "top-right",
                                    autoClose: 3000,
                                })}
                                className="px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Explore Global Network
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="relative overflow-hidden py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                        <SparklesIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">PREMIUM PARTNERSHIP</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Ready to Elevate Your Mobility Experience?
                    </h2>

                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Contact our executive team today to discuss premium services,
                        corporate partnerships, and exclusive mobility solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => {
                                setFormData({
                                    name: '',
                                    email: '',
                                    phone: '',
                                    company: '',
                                    subject: 'Executive Consultation Request',
                                    message: 'I would like to schedule an executive consultation to discuss premium services.',
                                    department: 'general'
                                });
                                setActiveDepartment('general');
                                document.querySelector('.form-card')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }}
                            className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Schedule Executive Consultation
                        </button>
                        <button
                            onClick={() => toast.info('Corporate brochure download coming soon!', {
                                position: "top-right",
                                autoClose: 3000,
                            })}
                            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300"
                        >
                            Download Corporate Brochure
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ContactPage;