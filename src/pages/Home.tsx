/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
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
    PlayIcon,
    GlobeAltIcon,
    WrenchScrewdriverIcon,
    KeyIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';

/* ─────────────────────────── Data ─────────────────────────── */

const slides = [
    {
        image: '/assets/vehicles/prado.jpg',
        title: 'Toyota Prado',
        subtitle: 'The ultimate adventure SUV — rugged reliability meets executive comfort for every terrain',
        gradient: 'from-emerald-900/85 via-emerald-800/60 to-[#FF6B35]/40',
        badge: 'PREMIUM SUV',
    },
    {
        image: '/assets/vehicles/range-rover.jpg',
        title: 'Range Rover',
        subtitle: 'Command the road with unparalleled sophistication and peerless luxury presence',
        gradient: 'from-gray-900/85 via-gray-800/60 to-[#FF6B35]/40',
        badge: 'LUXURY CLASS',
    },
    {
        image: '/assets/vehicles/harrier.jpg',
        title: 'Toyota Harrier',
        subtitle: 'Refined urban crossover — sleek, efficient, and stylish for city and country',
        gradient: 'from-blue-900/85 via-blue-800/60 to-[#FF6B35]/40',
        badge: 'URBAN EXECUTIVE',
    },
    {
        image: '/assets/vehicles/fielder.jpeg',
        title: 'Toyota Fielder',
        subtitle: 'Efficient everyday executive — perfect for business and family journeys',
        gradient: 'from-rose-900/85 via-rose-800/60 to-[#FF6B35]/40',
        badge: 'EVERYDAY LUXURY',
    },
];

const stats = [
    { icon: ClockIcon, value: '24/7', label: 'Premium Support', description: 'Dedicated concierge service available round-the-clock' },
    { icon: ShieldCheckIcon, value: '100%', label: 'Client Satisfaction', description: 'Guaranteed premium experience for every journey' },
    { icon: TrophyIcon, value: '50+', label: 'Exclusive Locations', description: 'Nationwide network of premium service centers' },
    { icon: WrenchScrewdriverIcon, value: '100%', label: 'Fleet Maintained', description: 'Every vehicle serviced and inspected before each rental' },
];

const vehicles = [
    { name: 'Toyota Prado', tagline: 'The Ultimate Adventure SUV', image: '/assets/vehicles/prado.jpg', specs: ['7 Seats', '4WD', 'Diesel', 'Automatic'], price: 'From KES 12,000/day', accent: 'from-emerald-500 to-teal-600' },
    { name: 'Range Rover', tagline: 'Peerless Luxury & Presence', image: '/assets/vehicles/range-rover.jpg', specs: ['5 Seats', 'AWD', 'Petrol', 'Automatic'], price: 'From KES 50,000/day', accent: 'from-amber-500 to-orange-600' },
    { name: 'Toyota Harrier', tagline: 'Refined Urban Crossover', image: '/assets/vehicles/harrier.jpg', specs: ['5 Seats', '2WD', 'Hybrid', 'Automatic'], price: 'From KES 8,000/day', accent: 'from-blue-500 to-indigo-600' },
    { name: 'Toyota Fielder', tagline: 'Efficient Everyday Executive', image: '/assets/vehicles/fielder.jpeg', specs: ['5 Seats', '2WD', 'Petrol', 'Automatic'], price: 'From KES 4,000/day', accent: 'from-rose-500 to-pink-600' },
    { name: 'Mazda CX-5', tagline: 'Sporty Sophistication', image: '/assets/vehicles/mazdaCX5.jpeg', specs: ['5 Seats', 'AWD', 'Petrol', 'Automatic'], price: 'From KES 7,000/day', accent: 'from-cyan-500 to-blue-600' },
    { name: 'Lexus RX', tagline: 'Premium Comfort Redefined', image: '/assets/vehicles/lexus.jpg', specs: ['5 Seats', 'AWD', 'Hybrid', 'Automatic'], price: 'From KES 9,000/day', accent: 'from-slate-500 to-gray-700' },
];

const features = [
    { title: 'Curated Premium Fleet', description: 'Prado, Range Rover, Harrier, Fielder & more — meticulously maintained', features: ['Executive SUVs', 'Luxury Sedans', 'Hybrid Vehicles', '7-Seater Options'], icon: KeyIcon },
    { title: 'Corporate Excellence', description: 'Tailored solutions for businesses with dedicated account management', features: ['Fleet Management', 'Custom Billing', 'Priority Service', 'Analytics'], icon: BuildingOfficeIcon },
    { title: 'Service Excellence', description: 'White-glove service with attention to every detail and personalization', features: ['24/7 Concierge', 'Premium Support', 'Personal Assistant', 'Flexible Terms'], icon: SparklesIcon },
    { title: 'Peace of Mind', description: 'Comprehensive coverage and support for complete journey assurance', features: ['Premium Insurance', 'Roadside Assistance', 'Secure Booking', 'Guaranteed Quality'], icon: ShieldCheckIcon },
];

const services = [
    { title: 'Corporate Fleet Management', description: 'Complete fleet solutions with dedicated support and advanced analytics.', link: '/services#corporate', icon: BuildingOfficeIcon },
    { title: 'Luxury Executive Rentals', description: 'Premium vehicles — Prado, Range Rover, Harrier — for business travel and events.', link: '/fleet', icon: KeyIcon },
    { title: 'Global Mobility Program', description: 'International vehicle access and support for frequent travelers.', link: '/services#global', icon: GlobeAltIcon },
    { title: 'Air BnB Luxury Stays', description: 'Handpicked luxury accommodations for business and leisure stays.', link: '/services#airbnb', icon: CalendarDaysIcon },
];

const testimonials = [
    { name: 'Michael Anderson', role: 'Chief Executive Officer', comment: 'Vision Wan transformed our corporate travel program. The Prado fleet is impeccable and the service is unmatched.', rating: 5, company: 'TechSphere Inc.' },
    { name: 'Sarah Mitchell', role: 'Managing Partner', comment: 'From the Range Rover to the Harrier, every vehicle I\'ve rented has been flawless. Truly seamless global mobility.', rating: 5, company: 'Global Ventures' },
    { name: 'David Richards', role: 'Chief Financial Officer', comment: 'Their attention to detail and premium fleet aligns perfectly with our brand standards. The Fielder is a hidden gem.', rating: 5, company: 'Luxury Brands Group' },
];

/* ──────────────────────── Component ───────────────────────── */

const Home: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeVehicle, setActiveVehicle] = useState(0);

    /* Independent video modals */
    const [introVideoOpen, setIntroVideoOpen] = useState(false);
    const [globalVideoOpen, setGlobalVideoOpen] = useState(false);

    const heroRef = useRef<HTMLDivElement>(null);

    /* Auto-advance slides */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    /* Auto-rotate vehicles */
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveVehicle((prev) => (prev + 1) % vehicles.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    /* Scroll listener */
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* Lock body scroll while ANY modal is open */
    useEffect(() => {
        if (introVideoOpen || globalVideoOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [introVideoOpen, globalVideoOpen]);

    /* Close on Escape */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIntroVideoOpen(false);
                setGlobalVideoOpen(false);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const openIntroVideo = useCallback(() => setIntroVideoOpen(true), []);
    const closeIntroVideo = useCallback(() => setIntroVideoOpen(false), []);
    const openGlobalVideo = useCallback(() => setGlobalVideoOpen(true), []);
    const closeGlobalVideo = useCallback(() => setGlobalVideoOpen(false), []);

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* ────────────── HERO SECTION ────────────── */}
            <div className="relative h-screen overflow-hidden" ref={heroRef}>
                <div className="absolute inset-0 z-0">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full animate-pulse"
                            style={{
                                width: `${Math.random() * 4 + 1}px`,
                                height: `${Math.random() * 4 + 1}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                backgroundColor: i % 3 === 0 ? '#FF8B35' : '#FF6B35',
                                animationDelay: `${i * 0.15}s`,
                                boxShadow: '0 0 20px 4px rgba(255, 107, 53, 0.5)',
                            }}
                        />
                    ))}
                </div>

                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ${
                            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-fixed"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                transform: `scale(${index === currentSlide ? 1.08 : 1})`,
                                transition: 'transform 20s linear',
                            }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                        </div>

                        <div className="relative h-full flex items-center">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
                                <div
                                    className={`transition-all duration-1000 transform ${
                                        index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                    }`}
                                >
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
                                        <SparklesIcon className="h-4 w-4 text-[#FF6B35]" />
                                        <span className="text-sm font-bold tracking-[0.2em]">{slide.badge}</span>
                                    </div>

                                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] tracking-tight">
                                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                            {slide.title}
                                        </span>
                                    </h1>

                                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed">
                                        {slide.subtitle}
                                    </p>

                                    <div className="flex flex-wrap gap-5">
                                        <Link
                                            to="/booking"
                                            className="group relative px-9 py-4.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#FF6B35]/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03]"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                                            <span className="relative flex items-center text-lg">
                                                Reserve Your Vehicle
                                                <ArrowRightIcon className="ml-3 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                                            </span>
                                        </Link>

                                        <button
                                            onClick={openIntroVideo}
                                            className="group relative px-9 py-4.5 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/25 hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center"
                                        >
                                            <div className="p-2 bg-[#FF6B35] rounded-full mr-3 group-hover:scale-110 transition-transform duration-300">
                                                <PlayIcon className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="text-lg">Watch Experience</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex gap-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`relative h-2.5 rounded-full transition-all duration-500 ${
                                    index === currentSlide
                                        ? 'w-14 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]'
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

                <div
                    className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${
                        isScrolled ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    <div className="animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2" />
                        </div>
                        <p className="text-white/70 text-xs mt-2 text-center tracking-wider">SCROLL</p>
                    </div>
                </div>
            </div>

            {/* ────────────── QUICK STATS ────────────── */}
            <div className="relative z-20 -mt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="group relative bg-white rounded-2xl p-7 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 border border-gray-100">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="p-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <stat.icon className="h-7 w-7 text-white" />
                                    </div>
                                </div>
                                <div className="text-center pt-6">
                                    <p className="text-4xl font-black text-gray-900 mb-1">{stat.value}</p>
                                    <p className="text-lg font-bold text-gray-900 mb-2">{stat.label}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ────────────── INTRODUCTION ────────────── */}
            <div className="py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6B35]/10 rounded-full mb-6">
                            <CheckBadgeIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-bold tracking-wider text-[#FF6B35]">PREMIUM FLEET</span>
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
                            Vision Wan Executive Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Experience unparalleled luxury with our curated fleet of{' '}
                            <span className="font-semibold text-[#FF6B35]">Prado, Range Rover, Harrier, Fielder</span>{' '}
                            and other premium vehicles — plus Luxury Air BnB accommodations and bespoke mobility solutions
                            designed for discerning individuals and corporate clients who demand the extraordinary.
                        </p>
                    </div>

                    {/* Intro video preview — opens intro modal */}
                    <button
                        type="button"
                        onClick={openIntroVideo}
                        className="relative w-full rounded-3xl overflow-hidden shadow-2xl group cursor-pointer block text-left"
                        aria-label="Play Vision Wan experience video"
                    >
                        <img
                            src="https://img.youtube.com/vi/m12A34xgAQg/maxresdefault.jpg"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    'https://img.youtube.com/vi/m12A34xgAQg/hqdefault.jpg';
                            }}
                            alt="Vision Wan Experience — watch now"
                            className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-[#FF6B35]/30 animate-ping" />
                                <div className="relative p-7 bg-white/15 backdrop-blur-md rounded-full border-2 border-white/40 group-hover:scale-110 group-hover:bg-[#FF6B35]/80 transition-all duration-300">
                                    <PlayIcon className="h-14 w-14 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="text-sm font-bold tracking-[0.2em] text-[#FF6B35] mb-2">WATCH VIDEO</p>
                            <p className="text-3xl font-black">Discover the Vision Wan Experience</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* ────────────── VEHICLE SHOWCASE ────────────── */}
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                <div className="absolute top-20 left-0 w-80 h-80 bg-[#FF6B35]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#FF8B35]/5 rounded-full blur-3xl" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6B35]/10 rounded-full mb-6">
                            <KeyIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-bold tracking-wider text-[#FF6B35]">OUR FLEET</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Modern Vehicles for Every Journey
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            From the rugged Toyota Prado to the elegant Range Rover — choose the perfect vehicle for your needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vehicles.map((vehicle, index) => (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 ${
                                    activeVehicle === index ? 'ring-2 ring-[#FF6B35]/30' : ''
                                }`}
                                onMouseEnter={() => setActiveVehicle(index)}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className={`absolute top-4 right-4 px-4 py-1.5 bg-gradient-to-r ${vehicle.accent} text-white text-sm font-bold rounded-full shadow-lg`}>
                                        {vehicle.price}
                                    </div>
                                    <div className="absolute bottom-4 left-5 text-white">
                                        <h3 className="text-2xl font-black">{vehicle.name}</h3>
                                        <p className="text-sm text-white/80">{vehicle.tagline}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {vehicle.specs.map((spec, idx) => (
                                            <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg group-hover:bg-[#FF6B35]/10 group-hover:text-[#FF6B35] transition-colors duration-300">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        to="/booking"
                                        className={`flex items-center justify-center w-full py-3.5 bg-gradient-to-r ${vehicle.accent} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]`}
                                    >
                                        <span>Book Now</span>
                                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-14">
                        <Link to="/fleet" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-[#FF6B35] transition-all duration-300 transform hover:-translate-y-1 shadow-xl">
                            <span>View Full Fleet</span>
                            <ArrowRightIcon className="h-5 w-5 ml-3" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ────────────── WHY CHOOSE US ────────────── */}
            <div className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            The Vision Wan Difference
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Discover what sets us apart in the world of premium mobility services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                                <div className="inline-flex p-3.5 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{feature.description}</p>
                                <div className="space-y-2.5">
                                    {feature.features.map((item, idx) => (
                                        <div key={idx} className="flex items-center text-gray-700 text-sm">
                                            <div className="h-1.5 w-1.5 bg-[#FF6B35] rounded-full mr-2.5 flex-shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[#FF6B35]/5 to-transparent rounded-tr-2xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ────────────── FEATURED SERVICES ────────────── */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6B35]/10 rounded-full mb-6">
                            <BuildingOfficeIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-bold tracking-wider text-[#FF6B35]">EXECUTIVE SERVICES</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Premium Mobility & Accommodation Solutions
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Explore our comprehensive range of services designed for the modern executive.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <Link key={index} to={service.link} className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex items-start gap-5">
                                <div className="flex-shrink-0 p-3.5 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <service.icon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                                    <div className="flex items-center text-[#FF6B35] font-semibold text-sm">
                                        <span>Learn More</span>
                                        <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF6B35]/15 rounded-2xl transition-colors duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ────────────── GLOBAL REACH VIDEO SECTION ────────────── */}
            <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF8B35]/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                                <GlobeAltIcon className="h-4 w-4 text-[#FF6B35]" />
                                <span className="text-sm font-bold tracking-wider">GLOBAL REACH</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                                Seamless Mobility <br />
                                <span className="text-[#FF6B35]">Across the Globe</span>
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                From Nairobi to London, our international network of Prados, Range Rovers, and
                                executive vehicles ensures you experience the same premium service wherever your
                                journey takes you.
                            </p>
                            <div className="flex flex-wrap gap-5">
                                <div className="flex items-center gap-2.5 text-gray-300">
                                    <div className="h-2.5 w-2.5 bg-[#FF6B35] rounded-full" />
                                    <span className="font-medium">50+ Cities</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-gray-300">
                                    <div className="h-2.5 w-2.5 bg-[#FF6B35] rounded-full" />
                                    <span className="font-medium">24/7 Support</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-gray-300">
                                    <div className="h-2.5 w-2.5 bg-[#FF6B35] rounded-full" />
                                    <span className="font-medium">Premium Fleet</span>
                                </div>
                            </div>
                        </div>

                        {/* Global video preview — opens global modal */}
                        <button
                            type="button"
                            onClick={openGlobalVideo}
                            className="relative w-full rounded-3xl overflow-hidden shadow-2xl group cursor-pointer block text-left"
                            aria-label="Play Range Rover in Action video"
                        >
                            <img
                                src="https://img.youtube.com/vi/uvGFXy3glRg/maxresdefault.jpg"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = 'https://img.youtube.com/vi/uvGFXy3glRg/hqdefault.jpg';
                                }}
                                alt="Range Rover in Action — watch now"
                                className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-[#FF6B35]/30 animate-ping" />
                                    <div className="relative p-6 bg-[#FF6B35]/90 backdrop-blur-md rounded-full border-2 border-white/40 shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                                        <PlayIcon className="h-12 w-12 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-sm font-bold tracking-[0.2em] text-[#FF6B35] mb-1">LIVE FOOTAGE</p>
                                <p className="text-2xl font-black">Range Rover in Action</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* ────────────── TESTIMONIALS ────────────── */}
            <div className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-orange-50/40 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#FF6B35]/8 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#FF8B35]/8 rounded-full blur-[120px] pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8B35]/10 border border-[#FF6B35]/20 rounded-full mb-6 backdrop-blur-sm">
                            <div className="relative flex items-center justify-center">
                                <span className="absolute inline-flex h-2 w-2 rounded-full bg-[#FF6B35] animate-ping opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]" />
                            </div>
                            <span className="text-sm font-bold tracking-[0.15em] text-[#FF6B35] uppercase">
                                Client Testimonials
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            Trusted by{' '}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF7B35] to-[#FF8B35] bg-clip-text text-transparent">
                                    Industry Leaders
                                </span>
                                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35]/0 via-[#FF6B35] to-[#FF6B35]/0 rounded-full" />
                            </span>
                        </h2>

                        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Hear from executives and partners who trust Vision Wan for their premium mobility needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group relative animate-[fadeUp_0.8s_ease-out_forwards] opacity-0"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="absolute -inset-[1px] bg-gradient-to-br from-[#FF6B35]/40 via-[#FF8B35]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                                <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] hover:shadow-[0_25px_60px_-15px_rgba(255,107,53,0.35)] border border-slate-100 transition-all duration-500 transform group-hover:-translate-y-3 overflow-hidden">
                                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-[#FF6B35]/15 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="flex items-center gap-1 mb-5">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <SolidStar key={i} className="h-5 w-5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]" />
                                        ))}
                                        <span className="ml-2 text-xs font-bold text-slate-400 tracking-wider">5.0</span>
                                    </div>

                                    <p className="text-slate-700 leading-relaxed mb-8 text-[15px] relative">
                                        {testimonial.comment}
                                    </p>

                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-black text-slate-900 text-lg tracking-tight">{testimonial.name}</h4>
                                            <p className="text-slate-500 text-sm mt-0.5">{testimonial.role}</p>
                                            <p className="text-[#FF6B35] text-xs font-bold tracking-wider uppercase mt-1.5">
                                                {testimonial.company}
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400/15 to-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-8 right-8 h-[3px] bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ────────────── CONTACT ────────────── */}
            <div className="relative py-24 bg-slate-950 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#FF6B35]/8 rounded-full blur-[140px] pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                        backgroundSize: '70px 70px',
                    }}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
                            <span className="relative flex items-center justify-center">
                                <span className="absolute h-2 w-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
                                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
                                Always Available · 24/7
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                            Get in Touch with{' '}
                            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] bg-clip-text text-transparent">
                                Our Team
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                icon: PhoneIcon,
                                title: 'Executive Support',
                                subtitle: 'Available 24/7 for premium clients',
                                content: (
                                    <>
                                        <a href="tel:+254705336311" className="text-lg font-bold text-white hover:text-[#FF6B35] transition-colors duration-300 block mt-4 tracking-wide">
                                            +254 (705) 336 311
                                        </a>
                                        <a href="tel:+447397549590" className="text-lg font-bold text-white hover:text-[#FF6B35] transition-colors duration-300 block mt-1 tracking-wide">
                                            +44 (7397) 549 590
                                        </a>
                                    </>
                                ),
                            },
                            {
                                icon: MapPinIcon,
                                title: 'Global Headquarters',
                                subtitle: 'Premium service centers nationwide',
                                content: (
                                    <p className="text-slate-300 text-sm leading-relaxed mt-4">
                                        Kilimani, Equity Building 1st Floor,
                                        <br />
                                        Opposite Yaya Centre,
                                        <br />
                                        Nairobi, Kenya — Arwings Kodhek Road
                                    </p>
                                ),
                            },
                            {
                                icon: ClockIcon,
                                title: 'Service Hours',
                                subtitle: 'Premium support schedule',
                                content: (
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Executive Support</span>
                                            <span className="text-emerald-400 font-bold">24/7</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Business Hours</span>
                                            <span className="text-white font-bold">8AM – 8PM</span>
                                        </div>
                                    </div>
                                ),
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="group relative animate-[fadeUp_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 0.15}s` }}>
                                    <div className="absolute -inset-[1px] bg-gradient-to-br from-[#FF6B35]/50 via-[#FF8B35]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                                    <div className="relative h-full bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:border-[#FF6B35]/40 group-hover:-translate-y-2 overflow-hidden">
                                        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#FF6B35]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="relative inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] shadow-lg shadow-[#FF6B35]/30 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-2 tracking-tight">{item.title}</h3>
                                        <p className="text-slate-400 text-sm">{item.subtitle}</p>
                                        {item.content}
                                        <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ────────────── FINAL CTA ────────────── */}
            <div className="relative overflow-hidden py-32 bg-gradient-to-br from-[#FF6B35] via-[#FF7B35] to-[#FF8B35]">
                <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-white/15 rounded-full blur-[100px] animate-pulse pointer-events-none" />
                <div
                    className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] animate-pulse pointer-events-none"
                    style={{ animationDelay: '1s' }}
                />
                <div
                    className="absolute inset-0 opacity-[0.15] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/15 backdrop-blur-md border border-white/30 rounded-full mb-8">
                        <div className="relative flex items-center justify-center">
                            <span className="absolute h-2 w-2 rounded-full bg-white animate-ping opacity-75" />
                            <span className="relative h-2 w-2 rounded-full bg-white" />
                        </div>
                        <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">
                            Premium Partnership
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-sm">
                        Elevate Your{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10">Mobility Experience</span>
                            <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/25 -skew-x-6 z-0" />
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        Join our exclusive network of satisfied clients who trust Vision Wan for their premium mobility
                        needs. From Prado to Range Rover — experience the difference of executive-class service.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link
                            to="/booking"
                            className="group relative w-full sm:w-auto px-9 py-4.5 bg-white text-[#FF6B35] font-black rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center text-lg overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-slate-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center">
                                Begin Your Premium Journey
                                <ArrowRightIcon className="ml-3 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                        </Link>

                        <Link
                            to="/contact"
                            className="group w-full sm:w-auto px-9 py-4.5 bg-transparent border-2 border-white/60 text-white font-bold rounded-2xl hover:bg-white/15 hover:border-white transition-all duration-300 text-lg backdrop-blur-sm flex items-center justify-center"
                        >
                            <span>Request Executive Consultation</span>
                        </Link>
                    </div>

                    <div className="mt-16 pt-10 border-t border-white/20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/85 text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold tracking-wide">Verified Fleet</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold tracking-wide">24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                            </svg>
                            <span className="font-semibold tracking-wide">Global Network</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global keyframes */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            {/* ────────────── INTRO VIDEO MODAL ────────────── */}
            {introVideoOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-[fadeIn_0.3s_ease-out]"
                    onClick={closeIntroVideo}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeIntroVideo}
                            className="absolute top-3 right-3 z-10 p-2 bg-white/15 backdrop-blur-md rounded-full text-white hover:bg-white/25 transition-colors"
                            aria-label="Close video"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <iframe
                            src="https://www.youtube.com/embed/m12A34xgAQg?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                            title="Vision Wan Experience"
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            {/* ────────────── GLOBAL REACH VIDEO MODAL ────────────── */}
            {globalVideoOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-[fadeIn_0.3s_ease-out]"
                    onClick={closeGlobalVideo}
                >
                    <div
                        className="relative w-full max-w-md aspect-[9/16] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeGlobalVideo}
                            className="absolute top-3 right-3 z-10 p-2 bg-white/15 backdrop-blur-md rounded-full text-white hover:bg-white/25 transition-colors"
                            aria-label="Close video"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <iframe
                            src="https://www.youtube.com/embed/uvGFXy3glRg?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                            title="Range Rover in Action"
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;