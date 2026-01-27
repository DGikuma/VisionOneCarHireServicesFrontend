import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheckIcon,
    ClockIcon,
    MapPinIcon,
    PhoneIcon,
    ArrowRightIcon,
    SparklesIcon,
    CheckBadgeIcon,
    TrophyIcon,
    BuildingOfficeIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';

const HomePage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80",
            title: "Executive Mobility",
            subtitle: "Redefining premium transportation with unparalleled service excellence",
            gradient: "from-[#FF6B35]/80 via-[#FF7B35]/60 to-[#FF8B35]/40"
        },
        {
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
            title: "Corporate Solutions",
            subtitle: "Tailored fleet management for discerning businesses and organizations",
            gradient: "from-gray-900/70 via-gray-800/60 to-[#FF6B35]/40"
        },
        {
            image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80",
            title: "Premium Experience",
            subtitle: "Luxury vehicles and white-glove service for every journey",
            gradient: "from-[#FF8B35]/70 via-[#FF7B35]/60 to-[#FF6B35]/40"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Slider */}
            <div className="relative h-screen overflow-hidden" ref={heroRef}>
                {/* Animated Background Particles */}
                <div className="absolute inset-0 z-0">
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

                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide
                            ? 'opacity-100 z-10'
                            : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Background Image with Parallax Effect */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-fixed"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                transform: `scale(${index === currentSlide ? 1.05 : 1})`,
                                transition: 'transform 20s linear'
                            }}
                        >
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex items-center">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
                                <div className={`transition-all duration-1000 transform ${index === currentSlide
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-20 opacity-0'
                                    }`}>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                                        <SparklesIcon className="h-4 w-4" />
                                        <span className="text-sm font-semibold">EXECUTIVE CLASS</span>
                                    </div>

                                    <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                                            {slide.title}
                                        </span>
                                    </h1>

                                    <p className="text-2xl md:text-3xl text-white/90 mb-10 max-w-3xl">
                                        {slide.subtitle}
                                    </p>

                                    <div className="flex flex-wrap gap-6">
                                        <Link
                                            to="/booking"
                                            className="group relative px-10 py-5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                                            <span className="relative flex items-center">
                                                Reserve Your Journey
                                                <ArrowRightIcon className="ml-3 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                                            </span>
                                        </Link>

                                        <Link
                                            to="/fleet"
                                            className="group relative px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                                        >
                                            <span className="relative flex items-center">
                                                Explore Fleet
                                                <ChevronRightIcon className="ml-3 h-5 w-5" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slider Navigation */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex gap-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`relative h-2 rounded-full transition-all duration-500 ${index === currentSlide
                                    ? 'w-12 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]'
                                    : 'w-3 bg-white/50 hover:bg-white/80'
                                    }`}
                            >
                                {index === currentSlide && (
                                    <div className="absolute -inset-2 border-2 border-[#FF6B35]/30 rounded-full animate-pulse" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'
                    }`}>
                    <div className="animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2" />
                        </div>
                        <p className="text-white/70 text-sm mt-2 text-center">Scroll to Explore</p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="relative z-20 -mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ClockIcon,
                                value: '24/7',
                                label: 'Premium Support',
                                description: 'Dedicated concierge service available round-the-clock'
                            },
                            {
                                icon: ShieldCheckIcon,
                                value: '100%',
                                label: 'Client Satisfaction',
                                description: 'Guaranteed premium experience for every journey'
                            },
                            {
                                icon: TrophyIcon,
                                value: '50+',
                                label: 'Exclusive Locations',
                                description: 'Nationwide network of premium service centers'
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 border border-gray-200"
                            >
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="p-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-xl shadow-lg">
                                        <stat.icon className="h-8 w-8 text-white" />
                                    </div>
                                </div>

                                <div className="text-center pt-6">
                                    <p className="text-5xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                    <p className="text-xl font-semibold text-gray-900 mb-3">{stat.label}</p>
                                    <p className="text-gray-600 text-sm">{stat.description}</p>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                            <CheckBadgeIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">PREMIUM EXPERIENCE</span>
                        </div>

                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            Vision One Executive Mobility
                        </h2>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience unparalleled luxury and service excellence with our curated fleet of premium vehicles,
                            designed for discerning individuals and corporate clients who demand the extraordinary.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            The Vision One Difference
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Discover what sets us apart in the world of premium mobility services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Curated Premium Fleet',
                                description: 'Meticulously maintained luxury vehicles equipped with the latest technology',
                                features: ['Executive Sedans', 'Luxury SUVs', 'Sports Performance', 'Electric Vehicles']
                            },
                            {
                                title: 'Corporate Excellence',
                                description: 'Tailored solutions for businesses with dedicated account management',
                                features: ['Fleet Management', 'Custom Billing', 'Priority Service', 'Analytics']
                            },
                            {
                                title: 'Service Excellence',
                                description: 'White-glove service with attention to every detail and personalization',
                                features: ['24/7 Concierge', 'Premium Support', 'Personal Assistant', 'Flexible Terms']
                            },
                            {
                                title: 'Peace of Mind',
                                description: 'Comprehensive coverage and support for complete journey assurance',
                                features: ['Premium Insurance', 'Roadside Assistance', 'Secure Booking', 'Guaranteed Quality']
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200"
                            >

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 mb-6">
                                    {feature.description}
                                </p>

                                <div className="space-y-2">
                                    {feature.features.map((item, idx) => (
                                        <div key={idx} className="flex items-center text-gray-700 text-sm">
                                            <div className="h-1.5 w-1.5 bg-[#FF6B35] rounded-full mr-2" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                {/* Gradient Corner */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FF6B35]/5 to-transparent rounded-tr-2xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Services Preview */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                            <BuildingOfficeIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE SERVICES</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Premium Mobility Solutions
                        </h2>

                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Explore our comprehensive range of services designed for the modern executive.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Corporate Fleet Management',
                                description: 'Complete fleet solutions with dedicated support and advanced analytics.',
                                link: '/services#corporate'
                            },
                            {
                                title: 'Luxury Executive Rentals',
                                description: 'Premium vehicles for business travel, events, and special occasions.',
                                link: '/fleet'
                            },
                            {
                                title: 'Global Mobility Program',
                                description: 'International vehicle access and support for frequent travelers.',
                                link: '/services#global'
                            }
                        ].map((service, index) => (
                            <Link
                                key={index}
                                to={service.link}
                                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200"
                            >

                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 mb-6">
                                    {service.description}
                                </p>

                                <div className="flex items-center text-[#FF6B35] font-semibold">
                                    <span>Learn More</span>
                                    <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF6B35]/20 rounded-2xl transition-colors duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Client Testimonials */}
            <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                            <SolidStar className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">CLIENT TESTIMONIALS</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Trusted by Industry Leaders
                        </h2>

                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Hear from executives and partners who trust Vision One for their premium mobility needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Michael Anderson',
                                role: 'CEO, TechSphere Inc.',
                                comment: 'Vision One transformed our corporate travel program. The service excellence is unmatched.',
                                rating: 5,
                                company: 'Fortune 500 Technology'
                            },
                            {
                                name: 'Sarah Mitchell',
                                role: 'Partner, Global Ventures',
                                comment: 'For international business trips, Vision One provides seamless global mobility solutions.',
                                rating: 5,
                                company: 'International Investment Firm'
                            },
                            {
                                name: 'David Richards',
                                role: 'CFO, Luxury Brands Group',
                                comment: 'Their attention to detail and premium service aligns perfectly with our brand standards.',
                                rating: 5,
                                company: 'Premium Brand Consortium'
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200"
                            >
                                {/* Quote Icon */}
                                <div className="text-4xl text-[#FF6B35]/20 mb-4">"</div>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <SolidStar key={i} className="h-5 w-5 text-yellow-500" />
                                    ))}
                                </div>

                                <p className="text-gray-600 italic mb-6">
                                    "{testimonial.comment}"
                                </p>

                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                    <p className="text-[#FF6B35] text-sm font-medium">{testimonial.company}</p>
                                </div>

                                {/* Company Logo Placeholder */}
                                <div className="absolute top-6 right-6 h-12 w-12 bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8B35]/10 rounded-lg flex items-center justify-center">
                                    <BuildingOfficeIcon className="h-6 w-6 text-[#FF6B35]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="py-20 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/5 via-white to-[#FF8B35]/5" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center md:text-left">
                            <div className="inline-flex p-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white rounded-2xl mb-6">
                                <PhoneIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Executive Support</h3>
                            <p className="text-gray-600 mb-2">Available 24/7 for premium clients</p>
                            <a href="tel:+254 (705) 336 311" className="text-2xl font-bold text-gray-900 hover:text-[#FF6B35] transition-colors duration-300">
                                +254 (705) 336 311
                            </a>
                            <a href="tel:+44 (7397) 549 590" className="text-2xl font-bold text-gray-900 hover:text-[#FF6B35] transition-colors duration-300">
                                +44 (7397) 549 590
                            </a>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="inline-flex p-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white rounded-2xl mb-6">
                                <MapPinIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Global Headquarters</h3>
                            <p className="text-gray-600 mb-2">Premium service centers nationwide</p>
                            <p className="text-gray-900 font-medium">123 Executive Boulevard, Suite 1000<br />New York, NY 10001</p>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="inline-flex p-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white rounded-2xl mb-6">
                                <ClockIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Service Hours</h3>
                            <p className="text-gray-600 mb-2">Premium support schedule</p>
                            <p className="text-gray-900 font-medium">24/7 Executive Support<br />Business Hours: 8AM - 8PM EST</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="relative overflow-hidden py-32">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] via-[#FF7B35] to-[#FF8B35]" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <SparklesIcon className="h-4 w-4 text-white" />
                        <span className="text-sm font-semibold text-white">PREMIUM PARTNERSHIP</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Elevate Your Mobility Experience
                    </h2>

                    <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                        Join our exclusive network of satisfied clients who trust Vision One for their premium mobility needs.
                        Experience the difference of executive-class service.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/booking"
                            className="px-10 py-5 bg-white text-[#FF6B35] font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center"
                        >
                            <span>Begin Your Premium Journey</span>
                            <ArrowRightIcon className="ml-3 h-5 w-5" />
                        </Link>
                        <Link
                            to="/contact"
                            className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                            Request Executive Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;