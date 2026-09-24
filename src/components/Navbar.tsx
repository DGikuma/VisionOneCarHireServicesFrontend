/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Bars3Icon,
    XMarkIcon,
    PhoneIcon,
    EnvelopeIcon,
    ArrowDownTrayIcon,
    DevicePhoneMobileIcon,
    ComputerDesktopIcon,
    PlusIcon,
    ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

/* ─── Type for the deferred install prompt event ─── */
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activePath, setActivePath] = useState('/');
    const [showInstallTip, setShowInstallTip] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    /* Desktop install prompt state */
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showDesktopInstall, setShowDesktopInstall] = useState(false);
    const [desktopPlatform, setDesktopPlatform] = useState<'chrome' | 'safari' | 'firefox' | 'other'>('other');
    const [isDesktop, setIsDesktop] = useState(false);

    const location = useLocation();
    const bookButtonRef = useRef<HTMLDivElement>(null);

    /* ───────────── Route change ───────────── */
    useEffect(() => {
        setActivePath(location.pathname);
        setIsOpen(false);
    }, [location]);

    /* ───────────── Scroll handler ───────────── */
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* ───────────── Resize handler ───────────── */
    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);
            if (desktop) setIsOpen(false);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    /* ───────────── Body scroll lock ───────────── */
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
            if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    /* ───────────── ESC to close ───────────── */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    /* ───────────── MOBILE Install Tip (Chrome on Android/iOS) ───────────── */
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        if (isStandalone) return;

        const ua = window.navigator.userAgent;
        const iOSDevice =
            /iPad|iPhone|iPod/.test(ua) ||
            (ua.includes('Mac') && 'ontouchend' in document);
        setIsIOS(iOSDevice);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            if (showInstallTip) {
                const timer = setTimeout(() => setShowInstallTip(false), 200);
                return () => clearTimeout(timer);
            }
            return;
        }

        const todayKey = new Date().toISOString().slice(0, 10);
        const lastShown = localStorage.getItem('vw-install-tip-shown');
        if (lastShown === todayKey) {
            setShowInstallTip(false);
            return;
        }

        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        if (isStandalone) {
            setShowInstallTip(false);
            return;
        }

        const timer = setTimeout(() => {
            setShowInstallTip(true);
            localStorage.setItem('vw-install-tip-shown', todayKey);
        }, 700);

        return () => clearTimeout(timer);
    }, [isOpen]);

    const handleDismissInstallTip = () => setShowInstallTip(false);

    /* ───────────── DESKTOP Install Logic ─────────────
       - Chrome/Edge on desktop support `beforeinstallprompt` → native prompt
       - Safari/Firefox do NOT → show instructions modal pointing to browser menu
       - Shown once per day via localStorage
       - Skipped if already installed (standalone mode)
    */
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Detect browser (for fallback instructions)
        const ua = window.navigator.userAgent;
        if (/Edg\//.test(ua) || /Chrome\//.test(ua)) {
            setDesktopPlatform('chrome');
        } else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
            setDesktopPlatform('safari');
        } else if (/Firefox\//.test(ua)) {
            setDesktopPlatform('firefox');
        } else {
            setDesktopPlatform('other');
        }

        // Capture the native install prompt event (Chrome/Edge only)
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        // If already installed as PWA, skip entirely
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        if (isStandalone) {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
            return;
        }

        // Only show on desktop (lg and up) — mobile gets its own popup
        // Only show once per day
        const todayKey = new Date().toISOString().slice(0, 10);
        const lastDesktopShown = localStorage.getItem('vw-desktop-install-shown');

        const shouldShow =
            window.innerWidth >= 1024 &&
            lastDesktopShown !== todayKey;

        if (shouldShow) {
            // Delay so it doesn't fight with page paint
            const timer = setTimeout(() => {
                setShowDesktopInstall(true);
                localStorage.setItem('vw-desktop-install-shown', todayKey);
            }, 3500); // 3.5s — user has settled, not annoying
            return () => {
                clearTimeout(timer);
                window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
            };
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    /* Trigger native install prompt (Chrome/Edge desktop) */
    const handleNativeInstall = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
            setShowDesktopInstall(false);
            setDeferredPrompt(null);
        } else {
            setShowDesktopInstall(false);
        }
    };

    const handleDismissDesktopInstall = () => setShowDesktopInstall(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Booking', href: '/booking' },
        { name: 'Fleet', href: '/fleet' },
        { name: 'Services', href: '/services' },
        { name: 'Accommodations', href: '/airbnb' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            {/* ============================================================
                NAVBAR — z-[100]
                ============================================================ */}
            <nav
                className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-out ${
                    isScrolled
                        ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-b border-gray-100'
                        : 'bg-white lg:bg-white/80 lg:backdrop-blur-md border-b border-transparent'
                }`}
            >
                {/* ───────────── Executive Top Bar (lg+) ───────────── */}
                <div
                    className={`w-full hidden lg:block overflow-hidden transition-all duration-500 ease-out ${
                        isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
                    }`}
                >
                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-10 text-xs">
                                <div className="flex items-center gap-5">
                                    <a
                                        href="tel:+254705336311"
                                        className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        <PhoneIcon className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#FF6B35] transition-colors duration-300" />
                                        <span className="font-light tracking-wide">
                                            +254 (705) 336 311
                                        </span>
                                    </a>

                                    <span className="h-3 w-px bg-gray-700" />

                                    <a
                                        href="mailto:visionwanservices@gmail.com"
                                        className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        <EnvelopeIcon className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#FF6B35] transition-colors duration-300" />
                                        <span className="font-light tracking-wide">
                                            visionwanservices@gmail.com
                                        </span>
                                    </a>
                                </div>

                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://wa.me/254705336311"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Chat on WhatsApp Kenya"
                                        className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-700/70 hover:border-[#25D366]/60 hover:bg-[#25D366]/5 transition-all duration-300"
                                    >
                                        <svg
                                            className="h-3.5 w-3.5 fill-[#25D366] group-hover:scale-110 transition-transform duration-300"
                                            viewBox="0 0 32 32"
                                        >
                                            <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.64.86 5.083 2.317 7.058L5 29l7.155-1.88a11.95 11.95 0 0 0 3.848.636C22.623 27.756 28 22.373 28 15.753 28 9.134 22.623 3 16.003 3zm0 21.79a9.99 9.99 0 0 1-3.399-.594l-.244-.087-4.245 1.115 1.132-4.136-.159-.262a9.94 9.94 0 1 1 6.915 3.964zm5.523-7.59c-.3-.15-1.78-.88-2.055-.98-.275-.1-.476-.15-.676.15-.2.3-.776.98-.952 1.18-.176.2-.35.225-.65.075-.3-.15-1.27-.47-2.42-1.5-.894-.798-1.497-1.784-1.673-2.084-.175-.3-.02-.46.132-.61.137-.136.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.235-.243-.585-.49-.505-.676-.515l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.115 3.225 5.125 4.52.717.31 1.277.495 1.714.634.72.23 1.376.198 1.893.12.578-.086 1.78-.726 2.03-1.426.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
                                        </svg>
                                        <span className="text-gray-300 font-light tracking-wide group-hover:text-white transition-colors duration-300">
                                            WhatsApp
                                        </span>
                                    </a>

                                    <span className="relative flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6B35]/15 to-[#FF8B35]/15 border border-[#FF6B35]/30">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                        </span>
                                        <span className="text-[11px] font-medium tracking-wide text-[#FF6B35]">
                                            24/7 Support
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-[#FF6B35]/30 to-transparent" />
                    </div>
                </div>

                {/* ───────────── Main Navbar ───────────── */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 sm:h-[68px] lg:h-[72px] items-center transition-all duration-500">
                        <Link
                            to="/"
                            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-w-0"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img
                                    src="/assets/images/logo.png"
                                    alt="Vision Wan Services logo"
                                    className="relative h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="leading-tight min-w-0">
                                <h1 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors duration-300 tracking-tight truncate">
                                    Vision Wan
                                </h1>
                                <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium tracking-[0.15em] uppercase truncate">
                                    Services
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                            {navigation.map((item) => {
                                const isActive = activePath === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`group relative px-3 xl:px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                                            isActive
                                                ? 'text-[#FF6B35]'
                                                : 'text-gray-600 hover:text-[#FF6B35]'
                                        }`}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        <span
                                            className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] origin-center transition-transform duration-300 ${
                                                isActive
                                                    ? 'scale-x-100'
                                                    : 'scale-x-0 group-hover:scale-x-100'
                                            }`}
                                        />
                                        <span className="absolute inset-0 rounded-lg bg-[#FF6B35]/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                );
                            })}

                            <div className="relative ml-3 flex-shrink-0" ref={bookButtonRef}>
                                <Link
                                    to="/booking"
                                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden
                                               shadow-[0_6px_18px_-6px_rgba(255,107,53,0.55)]
                                               hover:shadow-[0_14px_30px_-8px_rgba(255,107,53,0.75)]
                                               transition-all duration-300 ease-out
                                               hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.985]
                                               focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/50 focus-visible:ring-offset-2"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-br from-[#FF7A3D] via-[#FF6B35] to-[#E85A25]" />
                                    <span className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/10 opacity-70" />
                                    <span className="pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-[900ms] ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                    <span className="pointer-events-none absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#FF6B35]/40 via-[#FF8B35]/30 to-[#FF6B35]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative flex items-center gap-1.5 tracking-wide">
                                        <span>Book Now</span>
                                        <svg
                                            className="h-4 w-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile / Tablet right side */}
                        <div className="lg:hidden flex items-center gap-2">
                            <a
                                href="tel:+254705336311"
                                aria-label="Call Vision Wan Services"
                                className="group flex items-center justify-center h-10 w-10 rounded-xl
                                           bg-[#FF6B35]/10 text-[#FF6B35]
                                           hover:bg-[#FF6B35]/15 active:scale-95
                                           transition-all duration-300
                                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/50"
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                    touchAction: 'manipulation',
                                }}
                            >
                                <PhoneIcon className="h-5 w-5" />
                            </a>

                            <button
                                type="button"
                                onClick={() => setIsOpen((prev) => !prev)}
                                className="relative p-2.5 rounded-xl text-gray-700 hover:text-[#FF6B35] hover:bg-[#FF6B35]/5 active:scale-95 transition-all duration-300 z-[110]"
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                    touchAction: 'manipulation',
                                }}
                            >
                                <span className="relative block h-6 w-6">
                                    <Bars3Icon
                                        className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                                            isOpen
                                                ? 'opacity-0 rotate-90 scale-50'
                                                : 'opacity-100 rotate-0 scale-100'
                                        }`}
                                    />
                                    <XMarkIcon
                                        className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                                            isOpen
                                                ? 'opacity-100 rotate-0 scale-100'
                                                : 'opacity-0 -rotate-90 scale-50'
                                        }`}
                                    />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ============================================================
                MOBILE / TABLET OVERLAY
                ============================================================ */}
            {isOpen && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 bg-gray-900/50 z-[90] animate-[fadeIn_0.25s_ease-out]"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                        style={{ touchAction: 'manipulation' }}
                    />

                    <div
                        className="lg:hidden fixed left-0 right-0 bottom-0 z-[95] top-16 sm:top-[68px] bg-white shadow-2xl overflow-y-auto animate-[slideDown_0.3s_ease-out]"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            touchAction: 'pan-y',
                        }}
                    >
                        <div className="p-5 sm:p-6 space-y-1 pb-28">
                            {/* Mobile Install Prompt Popup */}
                            {showInstallTip && (
                                <div
                                    className="relative mb-4 overflow-hidden rounded-2xl border border-[#FF6B35]/20 bg-gradient-to-br from-[#FFF6F1] via-white to-[#FFF0E8] shadow-[0_8px_28px_-10px_rgba(255,107,53,0.35)] animate-[installPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                                    role="dialog"
                                    aria-label="Install app tip"
                                >
                                    <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#FF6B35]/15 rounded-full blur-2xl pointer-events-none" />
                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FF8B35]/10 rounded-full blur-2xl pointer-events-none" />

                                    <button
                                        type="button"
                                        onClick={handleDismissInstallTip}
                                        aria-label="Dismiss install tip"
                                        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white/70 active:scale-90 transition-all duration-200"
                                        style={{
                                            WebkitTapHighlightColor: 'transparent',
                                            touchAction: 'manipulation',
                                        }}
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>

                                    <div className="relative p-4 sm:p-5 flex items-start gap-3.5">
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-2xl blur-md opacity-40" />
                                            <div className="relative h-12 w-12 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden border border-[#FF6B35]/10">
                                                <img
                                                    src="/assets/images/logo.png"
                                                    alt="Vision Wan"
                                                    className="h-9 w-9 object-contain"
                                                />
                                            </div>
                                            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] shadow-md ring-2 ring-white">
                                                <ArrowDownTrayIcon className="h-3 w-3 text-white" />
                                            </span>
                                        </div>

                                        <div className="min-w-0 flex-1 pr-6">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <DevicePhoneMobileIcon className="h-3.5 w-3.5 text-[#FF6B35]" />
                                                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#FF6B35]">
                                                    Install App
                                                </p>
                                            </div>

                                            <p className="text-[13px] font-semibold text-gray-900 leading-snug mb-1">
                                                Add Vision Wan to your home screen
                                            </p>
                                            <p className="text-[11.5px] text-gray-500 leading-relaxed">
                                                {isIOS ? (
                                                    <>
                                                        Tap{' '}
                                                        <span className="inline-flex items-center justify-center align-middle mx-0.5 px-1.5 py-0.5 rounded-md bg-[#FF6B35]/10 text-[#FF6B35] font-semibold">
                                                            <PlusIcon className="h-3 w-3" />
                                                        </span>{' '}
                                                        Share, then{' '}
                                                        <span className="font-semibold text-gray-700">
                                                            "Add to Home Screen"
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        Tap the{' '}
                                                        <span className="font-semibold text-gray-700">
                                                            ⋮ menu
                                                        </span>{' '}
                                                        (top right), then{' '}
                                                        <span className="font-semibold text-gray-700">
                                                            "Add to Home screen"
                                                        </span>
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-[3px] w-full bg-gradient-to-r from-[#FF6B35] via-[#FF8B35] to-[#FF6B35] opacity-70" />
                                </div>
                            )}

                            {navigation.map((item, index) => {
                                const isActive = activePath === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`group flex items-center justify-between px-4 py-3.5 sm:py-4 rounded-xl font-medium transition-all duration-300 animate-[fadeUp_0.4s_ease-out_both] ${
                                            isActive
                                                ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8B35]/5 text-[#FF6B35] shadow-sm'
                                                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            animationDelay: `${index * 40}ms`,
                                            WebkitTapHighlightColor: 'transparent',
                                            touchAction: 'manipulation',
                                        }}
                                    >
                                        <span className="tracking-tight text-[15px] sm:text-base">
                                            {item.name}
                                        </span>
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full bg-[#FF6B35] transition-all duration-300 ${
                                                isActive
                                                    ? 'opacity-100 scale-100'
                                                    : 'opacity-0 scale-0 group-hover:opacity-40 group-hover:scale-100'
                                            }`}
                                        />
                                    </Link>
                                );
                            })}

                            <div className="pt-4">
                                <Link
                                    to="/booking"
                                    onClick={() => setIsOpen(false)}
                                    className="group relative block w-full overflow-hidden rounded-xl text-center
                                            shadow-[0_8px_22px_-8px_rgba(255,107,53,0.65)]
                                            active:scale-[0.985] transition-transform duration-200 ease-out
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/50"
                                    style={{
                                        WebkitTapHighlightColor: 'transparent',
                                        touchAction: 'manipulation',
                                    }}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-br from-[#FF7A3D] via-[#FF6B35] to-[#E85A25]" />
                                    <span className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/10 opacity-70" />
                                    <span className="pointer-events-none absolute inset-0 -translate-x-[120%] group-active:translate-x-[120%] transition-transform duration-[900ms] ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                    <span className="relative flex items-center justify-center gap-2 py-3.5 sm:py-4 font-semibold text-white tracking-wide">
                                        <span>Book Now</span>
                                        <svg
                                            className="h-4 w-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>

                            <div className="pt-5 mt-4 border-t border-gray-100 space-y-1.5">
                                <p className="px-4 pb-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400">
                                    Get in touch
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    <a
                                        href="tel:+254705336311"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                                        style={{
                                            WebkitTapHighlightColor: 'transparent',
                                            touchAction: 'manipulation',
                                        }}
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF6B35]/10 text-[#FF6B35] flex-shrink-0">
                                            <PhoneIcon className="h-4.5 w-4.5" />
                                        </span>
                                        <span className="text-sm font-medium whitespace-nowrap">
                                            +254 (705) 336 311
                                        </span>
                                    </a>

                                    <a
                                        href="tel:+447397549590"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                                        style={{
                                            WebkitTapHighlightColor: 'transparent',
                                            touchAction: 'manipulation',
                                        }}
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF6B35]/10 text-[#FF6B35] flex-shrink-0">
                                            <PhoneIcon className="h-4.5 w-4.5" />
                                        </span>
                                        <span className="text-sm font-medium whitespace-nowrap">
                                            +44 (7397) 549 590
                                        </span>
                                    </a>

                                    <a
                                        href="mailto:visionwanservices@gmail.com"
                                        className="sm:col-span-2 flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                                        style={{
                                            WebkitTapHighlightColor: 'transparent',
                                            touchAction: 'manipulation',
                                        }}
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF6B35]/10 text-[#FF6B35] flex-shrink-0">
                                            <EnvelopeIcon className="h-4.5 w-4.5" />
                                        </span>
                                        <span className="text-sm font-medium break-all">
                                            visionwanservices@gmail.com
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ============================================================
                DESKTOP / LAPTOP INSTALL PROMPT (bottom-right pill card)
                ============================================================ */}
            {showDesktopInstall && isDesktop && (
                <div
                    className="fixed bottom-6 right-6 z-[80] w-[360px] max-w-[calc(100vw-3rem)] hidden lg:block animate-[desktopPop_0.55s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                    role="dialog"
                    aria-label="Install Vision Wan app on desktop"
                >
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.35)] border border-slate-200/80">
                        {/* Decorative orbs */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF6B35]/15 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#FF8B35]/10 rounded-full blur-2xl pointer-events-none" />

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleDismissDesktopInstall}
                            aria-label="Dismiss install prompt"
                            className="absolute top-3 right-3 z-10 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:scale-90 transition-all duration-200"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>

                        <div className="relative p-5">
                            <div className="flex items-start gap-3.5">
                                {/* Logo with badge */}
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-2xl blur-md opacity-40" />
                                    <div className="relative h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden border border-[#FF6B35]/10">
                                        <img
                                            src="/assets/images/logo.png"
                                            alt="Vision Wan"
                                            className="h-11 w-11 object-contain"
                                        />
                                    </div>
                                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] shadow-md ring-2 ring-white">
                                        <ArrowDownTrayIcon className="h-3 w-3 text-white" />
                                    </span>
                                </div>

                                <div className="min-w-0 flex-1 pr-6">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <ComputerDesktopIcon className="h-3.5 w-3.5 text-[#FF6B35]" />
                                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#FF6B35]">
                                            Desktop App
                                        </p>
                                    </div>

                                    <p className="text-[14px] font-semibold text-slate-900 leading-snug mb-1">
                                        Install Vision Wan on this device
                                    </p>
                                    <p className="text-[12px] text-slate-500 leading-relaxed">
                                        Fast access, works offline, and runs in its own window — no browser tabs needed.
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="mt-4 flex items-center gap-2">
                                {deferredPrompt ? (
                                    <button
                                        type="button"
                                        onClick={handleNativeInstall}
                                        className="group relative flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden
                                                   shadow-[0_6px_18px_-6px_rgba(255,107,53,0.55)]
                                                   hover:shadow-[0_10px_24px_-8px_rgba(255,107,53,0.7)]
                                                   transition-all duration-300 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985]"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-br from-[#FF7A3D] via-[#FF6B35] to-[#E85A25]" />
                                        <span className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/10 opacity-70" />
                                        <span className="relative flex items-center gap-1.5">
                                            <ArrowDownTrayIcon className="h-4 w-4" />
                                            <span>Install Now</span>
                                        </span>
                                    </button>
                                ) : (
                                    <div className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[12px] text-slate-600 leading-snug">
                                        {desktopPlatform === 'safari' && (
                                            <>
                                                Click{' '}
                                                <ArrowUpTrayIcon className="inline h-3 w-3 mx-0.5 -mt-0.5" />{' '}
                                                <span className="font-semibold">Share</span> then{' '}
                                                <span className="font-semibold">"Add to Dock"</span>
                                            </>
                                        )}
                                        {desktopPlatform === 'firefox' && (
                                            <>
                                                Firefox doesn't support one-click install. Open this site in{' '}
                                                <span className="font-semibold">Chrome</span> or{' '}
                                                <span className="font-semibold">Edge</span> to install.
                                            </>
                                        )}
                                        {(desktopPlatform === 'chrome' || desktopPlatform === 'other') && (
                                            <>
                                                Click the{' '}
                                                <span className="font-semibold">install icon</span>{' '}
                                                in the browser's address bar.
                                            </>
                                        )}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={handleDismissDesktopInstall}
                                    className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
                                >
                                    Later
                                </button>
                            </div>

                            <p className="mt-3 text-[10.5px] text-slate-400 leading-relaxed">
                                Free · ~1 MB · No account required
                            </p>
                        </div>

                        {/* Bottom accent line */}
                        <div className="h-[3px] w-full bg-gradient-to-r from-[#FF6B35] via-[#FF8B35] to-[#FF6B35] opacity-70" />
                    </div>
                </div>
            )}

            {/* Keyframes */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes installPop {
                    0% {
                        opacity: 0;
                        transform: translateY(14px) scale(0.96);
                    }
                    60% {
                        opacity: 1;
                        transform: translateY(-2px) scale(1.01);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes desktopPop {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) scale(0.94);
                    }
                    60% {
                        opacity: 1;
                        transform: translateY(-3px) scale(1.01);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;