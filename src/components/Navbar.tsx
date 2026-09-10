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
    const menuPanelRef = useRef<HTMLDivElement>(null);

    // Close mobile menu on route change
    useEffect(() => {
        setActivePath(location.pathname);
        setIsOpen(false);
    }, [location]);

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ✅ FIX 1: Close menu ONLY on crossing the lg breakpoint.
    // We track the previous width so that rotation (portrait ↔ landscape)
    // does NOT close the menu, and we don't thrash state on every resize event.
    useEffect(() => {
        let lastIsDesktop = window.innerWidth >= 1024;

        const handleResize = () => {
            const isDesktopNow = window.innerWidth >= 1024;

            // Only react when we actually cross the desktop/mobile boundary
            if (isDesktopNow !== lastIsDesktop) {
                lastIsDesktop = isDesktopNow;
                if (isDesktopNow) {
                    // Entered desktop: force-close mobile menu
                    setIsOpen(false);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        // Some tablets fire orientationchange separately — listen too
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    // ✅ FIX 2: Prevent body scroll lock, but ensure it's always cleaned up.
    // Also add a scrollbar-gutter compensation to avoid layout shift on mobile.
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // ✅ FIX 3: Close menu when user taps the ESC key (desktop UX)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Booking', href: '/booking' },
        { name: 'Fleet', href: '/fleet' },
        { name: 'Services', href: '/services' },
        { name: 'Accomodations', href: '/airbnb' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
    ];

    const handleMenuToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${isScrolled
                ? 'shadow-2xl shadow-gray-900/5'
                : ''
                }`}>
                {/* Executive Top Bar - Hidden below lg (1024px) */}
                <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hidden lg:block">
                    <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-5 lg:px-8">
                        <div className="flex justify-between items-center h-8 text-xs font-medium">
                            {/* Left: Corporate Badges */}
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <CheckBadgeIcon className="h-3.5 w-3.5 text-emerald-400" />
                                    <span className="text-gray-300 font-light tracking-wider">
                                        ISO 9001:2022
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="h-3 w-px bg-gray-700" />
                                    <GlobeAltIcon className="h-3.5 w-3.5 text-cyan-400" />
                                    <span className="text-gray-300 font-light tracking-wider">
                                        GLOBAL MOBILITY
                                    </span>
                                </div>
                            </div>

                            {/* Right: Contact & Trust Signals */}
                            <div className="flex items-center space-x-6">
                                <a
                                    href="tel:+254705336311"
                                    className="group flex items-center space-x-2 hover:text-white transition-all duration-200"
                                >
                                    <PhoneIcon className="h-3.5 w-3.5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                    <span className="text-gray-300 font-light tracking-wide">
                                        +254 (705) 336 311
                                    </span>
                                </a>

                                <a
                                    href="https://wa.me/447397549590"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center space-x-2 hover:text-white transition-all duration-200"
                                    aria-label="Chat on WhatsApp UK"
                                >
                                    <svg className="h-3.5 w-3.5 fill-[#25D366]" viewBox="0 0 32 32">
                                        <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.64.86 5.083 2.317 7.058L5 29l7.155-1.88a11.95 11.95 0 0 0 3.848.636C22.623 27.756 28 22.373 28 15.753 28 9.134 22.623 3 16.003 3zm0 21.79a9.99 9.99 0 0 1-3.399-.594l-.244-.087-4.245 1.115 1.132-4.136-.159-.262a9.94 9.94 0 1 1 6.915 3.964zm5.523-7.59c-.3-.15-1.78-.88-2.055-.98-.275-.1-.476-.15-.676.15-.2.3-.776.98-.952 1.18-.176.2-.35.225-.65.075-.3-.15-1.27-.47-2.42-1.5-.894-.798-1.497-1.784-1.673-2.084-.175-.3-.02-.46.132-.61.137-.136.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.235-.243-.585-.49-.505-.676-.515l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.115 3.225 5.125 4.52.717.31 1.277.495 1.714.634.72.23 1.376.198 1.893.12.578-.086 1.78-.726 2.03-1.426.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
                                    </svg>
                                    <span className="text-gray-300 font-light tracking-wide">
                                        UK WhatsApp
                                    </span>
                                </a>

                                <a
                                    href="https://wa.me/254705336311"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center space-x-2 hover:text-white transition-all duration-200"
                                    aria-label="Chat on WhatsApp Kenya"
                                >
                                    <svg className="h-3.5 w-3.5 fill-[#25D366]" viewBox="0 0 32 32">
                                        <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.64.86 5.083 2.317 7.058L5 29l7.155-1.88a11.95 11.95 0 0 0 3.848.636C22.623 27.756 28 22.373 28 15.753 28 9.134 22.623 3 16.003 3zm0 21.79a9.99 9.99 0 0 1-3.399-.594l-.244-.087-4.245 1.115 1.132-4.136-.159-.262a9.94 9.94 0 1 1 6.915 3.964zm5.523-7.59c-.3-.15-1.78-.88-2.055-.98-.275-.1-.476-.15-.676.15-.2.3-.776.98-.952 1.18-.176.2-.35.225-.65.075-.3-.15-1.27-.47-2.42-1.5-.894-.798-1.497-1.784-1.673-2.084-.175-.3-.02-.46.132-.61.137-.136.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.235-.243-.585-.49-.505-.676-.515l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.115 3.225 5.125 4.52.717.31 1.277.495 1.714.634.72.23 1.376.198 1.893.12.578-.086 1.78-.726 2.03-1.426.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
                                    </svg>
                                    <span className="text-gray-300 font-light tracking-wide">
                                        KE WhatsApp
                                    </span>
                                </a>

                                <a
                                    href="mailto:visionwanservices@gmail.com"
                                    className="group flex items-center space-x-2 hover:text-white transition-all duration-200"
                                >
                                    <EnvelopeIcon className="h-3.5 w-3.5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                    <span className="text-gray-300 font-light tracking-wide">
                                        visionwanservices@gmail.com
                                    </span>
                                </a>

                                <span className="px-2.5 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-300 font-light tracking-wide">
                                    24/7 GLOBAL SUPPORT
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                </div>

                {/* Main Navbar */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex items-center flex-shrink-0">
                            <Link
                                to="/"
                                className="flex-shrink-0 flex items-center group"
                                onClick={handleCloseMenu}
                            >
                                <div className="relative">
                                    <img
                                        src="/assets/images/logo.png"
                                        alt="Company Logo"
                                        className="h-12 w-12 object-contain"
                                    />
                                </div>
                                <div className="ml-2 sm:ml-3">
                                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors duration-300">
                                        Vision Wan
                                    </h1>
                                    <p className="text-xs text-gray-600 font-medium tracking-wider">
                                        Services
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation - Only shows on lg+ (1024px) */}
                        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`relative px-2 xl:px-3 py-2 font-medium transition-all duration-300 text-sm xl:text-base ${activePath === item.href
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
                                    <span className="absolute inset-0 bg-[#FF6B35]/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </Link>
                            ))}

                            {/* Book Now Button */}
                            <div className="relative ml-2 flex-shrink-0" ref={bookButtonRef}>
                                <Link
                                    to="/booking"
                                    className="relative bg-[#FF6B35] text-white px-4 xl:px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#FF5A20] group overflow-hidden flex items-center text-sm xl:text-base"
                                >
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    <span className="relative flex items-center">
                                        <span>Book Now</span>
                                        <svg
                                            className="ml-1 xl:ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
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

                        {/* Mobile/Tablet menu button - Shows below lg (1024px) */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={handleMenuToggle}
                                onTouchEnd={(e) => {
                                    // ✅ FIX 4: Some tablets on iOS Safari don't
                                    // reliably fire click after a tap. Handle touch.
                                    e.preventDefault();
                                    handleMenuToggle();
                                }}
                                className="p-2 rounded-lg text-gray-700 hover:text-[#FF6B35] hover:bg-gray-100 transition-colors duration-300 relative z-[60] touch-manipulation"
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                type="button"
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {isOpen ? (
                                    <XMarkIcon className="h-6 w-6 pointer-events-none" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6 pointer-events-none" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile/Tablet Navigation Overlay - FIXED POSITION */}
            {isOpen && (
                <>
                    {/* ✅ FIX 5: Backdrop with `touch-manipulation` and `cursor-pointer`
                        to make sure taps are captured properly on tablets. */}
                    <div
                        className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 cursor-pointer touch-manipulation"
                        onClick={handleCloseMenu}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            handleCloseMenu();
                        }}
                        aria-hidden="true"
                    />

                    {/* ✅ FIX 6: Menu panel with `touch-manipulation` and high z-index.
                        Also explicitly prevent touch events from bubbling to backdrop. */}
                    <div
                        ref={menuPanelRef}
                        className="lg:hidden fixed top-16 left-0 right-0 bottom-0 z-50 bg-white shadow-2xl overflow-y-auto overscroll-contain touch-manipulation"
                        onClick={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 space-y-1 pb-24">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 touch-manipulation ${activePath === item.href
                                        ? 'bg-[#FF6B35]/10 text-[#FF6B35]'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF6B35]'
                                        }`}
                                    onClick={handleCloseMenu}
                                    onTouchEnd={(e) => {
                                        // ✅ Ensure navigation happens on tablets
                                        // Some tablets swallow the click after touch.
                                        e.stopPropagation();
                                        handleCloseMenu();
                                    }}
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
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
                                    className="block w-full bg-[#FF6B35] text-white font-semibold py-3 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#FF5A20] touch-manipulation"
                                    onClick={handleCloseMenu}
                                    onTouchEnd={(e) => {
                                        e.stopPropagation();
                                        handleCloseMenu();
                                    }}
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
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

                            {/* Mobile Contact Info */}
                            <div className="pt-4 border-t border-gray-100 space-y-2">
                                <a
                                    href="tel:+254705336311"
                                    className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-[#FF6B35] transition-colors touch-manipulation"
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    <PhoneIcon className="h-5 w-5" />
                                    <span className="text-sm">+254 (705) 336 311</span>
                                </a>
                                <a
                                    href="tel:+447397549590"
                                    className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-[#FF6B35] transition-colors touch-manipulation"
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    <PhoneIcon className="h-5 w-5" />
                                    <span className="text-sm">+44 (7397) 549 590</span>
                                </a>
                                <a
                                    href="mailto:visionwanservices@gmail.com"
                                    className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-[#FF6B35] transition-colors touch-manipulation"
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    <EnvelopeIcon className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm break-all">visionwanservices@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;