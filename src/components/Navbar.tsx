import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon, GlobeAltIcon } from '@heroicons/react/24/solid';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activePath, setActivePath] = useState('/');
    const location = useLocation();
    const bookButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Booking', href: '/booking' },
        { name: 'Fleet', href: '/fleet' },
        { name: 'Services', href: '/services' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-2xl shadow-gray-900/5 py-0'
            : 'bg-white/95 backdrop-blur-lg py-0'
            }`}>
            {/* Executive Top Bar - Ultra Compact & Premium - Fully Responsive */}
            <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-5 lg:px-8">
                    <div className="flex justify-between items-center h-8 text-[10px] sm:text-xs font-medium">
                        {/* Left: Corporate Badges */}
                        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
                            {/* ISO Badge - Always visible but adjusts */}
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <CheckBadgeIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" />
                                <span className="text-gray-300 font-light tracking-wider hidden xs:inline-block">
                                    <span className="hidden sm:inline">ISO 9001:2022</span>
                                    <span className="sm:hidden">ISO 9001</span>
                                </span>
                            </div>

                            {/* Global Partner - Shows on medium+ */}
                            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                                <div className="h-3 w-px bg-gray-700" />
                                <GlobeAltIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-400" />
                                <span className="text-gray-300 font-light tracking-wider hidden lg:inline">
                                    GLOBAL MOBILITY
                                </span>
                                <span className="text-gray-300 font-light tracking-wider lg:hidden">
                                    GLOBAL
                                </span>
                            </div>

                            {/* Trust Seal - Mobile only badge */}
                            <div className="md:hidden flex items-center space-x-1">
                                <div className="h-3 w-px bg-gray-700" />
                                <span className="px-1.5 py-0.5 bg-gray-800/60 border border-gray-700 rounded text-[9px] text-gray-300 font-light">
                                    24/7
                                </span>
                            </div>
                        </div>

                        {/* Right: Contact & Trust Signals */}
                        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
                            {/* Phone - Progressive disclosure */}
                            <a
                                href="tel:+254705336311"
                                className="group flex items-center space-x-1 sm:space-x-2 hover:text-white transition-all duration-200"
                            >
                                <PhoneIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                <span className="text-gray-300 font-light tracking-wide hidden sm:inline">
                                    <span className="hidden md:inline">+254 (705) 336 311</span>
                                    <span className="md:hidden">Call</span>
                                </span>
                            </a>

                            {/* Separator - Shows on sm+ */}
                            <span className="h-3 w-px bg-gray-700 hidden sm:block" />

                            {/* Email - Progressive disclosure */}
                            <a
                                href="mailto:corporate@visionone.co.ke"
                                className="group flex items-center space-x-1 sm:space-x-2 hover:text-white transition-all duration-200"
                            >
                                <EnvelopeIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                <span className="text-gray-300 font-light tracking-wide hidden md:inline">
                                    <span className="hidden lg:inline">vison1servicesltd@gmail.com</span>
                                    <span className="lg:hidden">Email</span>
                                </span>
                            </a>

                            {/* Business Hours Badge - Multiple breakpoints */}
                            <div className="hidden sm:block">
                                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gray-800/50 border border-gray-700 rounded-full text-[9px] sm:text-xs text-gray-300 font-light tracking-wide">
                                    <span className="hidden xl:inline">24/7 GLOBAL SUPPORT</span>
                                    <span className="xl:hidden hidden lg:inline">24/7 SUPPORT</span>
                                    <span className="lg:hidden hidden sm:inline">24/7</span>
                                </span>
                            </div>

                            {/* Mobile Quick Contact - Shows on xs only */}
                            <div className="sm:hidden flex items-center space-x-2">
                                <a
                                    href="tel:+254 (705) 336 311"
                                    className="p-1 rounded-full bg-gray-800/70 hover:bg-gray-700 transition-colors"
                                    aria-label="Call"
                                >
                                    <PhoneIcon className="h-3 w-3 text-gray-300" />
                                </a>
                                <a
                                    href="mailto:vison1servicesltd@gmail.com"
                                    className="p-1 rounded-full bg-gray-800/70 hover:bg-gray-700 transition-colors"
                                    aria-label="Email"
                                >
                                    <EnvelopeIcon className="h-3 w-3 text-gray-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo with animation */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex-shrink-0 flex items-center group"
                        >
                            <div className="relative">
                                {/* Logo container */}
                                <img
                                    src="/assets/images/logo.png"
                                    alt="Company Logo"
                                    className="h-15 w-12 object-contain"
                                />
                            </div>

                            {/* Text */}
                            <div className="ml-3">
                                <h1 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors duration-300">
                                    Vision One
                                </h1>
                                <p className="text-xs text-gray-600 font-medium tracking-wider">
                                    PREMIUM CAR HIRE
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`relative px-3 py-2 font-medium transition-all duration-300 ${activePath === item.href
                                    ? 'text-[#FF6B35]'
                                    : 'text-gray-700 hover:text-[#FF6B35]'
                                    }`}
                            >
                                <span className="relative z-10">
                                    {item.name}
                                    {activePath === item.href && (
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] rounded-full" />
                                    )}
                                </span>

                                {/* Hover effect */}
                                <span className="absolute inset-0 bg-[#FF6B35]/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                        ))}

                        {/* Fixed Book Now Button */}
                        <div className="relative ml-2" ref={bookButtonRef}>
                            <Link
                                to="/booking"
                                className="relative bg-[#FF6B35] text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#FF5A20] group overflow-hidden flex items-center"
                            >
                                {/* Shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                <span className="relative flex items-center">
                                    <span>Book Now</span>
                                    <svg
                                        className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-700 hover:text-[#FF6B35] hover:bg-gray-100 transition-colors duration-300"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                        <div className="p-4 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${activePath === item.href
                                        ? 'bg-[#FF6B35]/10 text-[#FF6B35]'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF6B35]'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex items-center">
                                        <span>{item.name}</span>
                                        {activePath === item.href && (
                                            <span className="ml-auto w-2 h-2 bg-[#FF6B35] rounded-full" />
                                        )}
                                    </div>
                                </Link>
                            ))}

                            {/* Mobile Book Now Button */}
                            <div className="pt-4">
                                <Link
                                    to="/booking"
                                    className="block w-full bg-[#FF6B35] text-white font-semibold py-3 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#FF5A20]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="flex items-center justify-center">
                                        <span>Book Now</span>
                                        <svg
                                            className="ml-2 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;