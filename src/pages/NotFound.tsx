import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    PhoneIcon,
    ArrowRightIcon,
    MagnifyingGlassIcon,
    BuildingLibraryIcon,
    CalendarDaysIcon,
    TruckIcon,
    EnvelopeIcon,
    ArrowPathIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    ExclamationTriangleIcon as ExclamationSolid,
    MapPinIcon as MapPinSolid,
    ChatBubbleLeftRightIcon as ChatSolid,
} from '@heroicons/react/24/solid';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Searchable site index — each entry maps keywords to a route
    const searchIndex = [
        { keywords: ['home', 'main', 'landing', 'start'], path: '/', label: 'Home' },
        { keywords: ['book', 'booking', 'reserve', 'reservation', 'schedule'], path: '/booking', label: 'Book Now' },
        { keywords: ['fleet', 'car', 'vehicle', 'suv', 'sedan', 'luxury', 'tesla', 'mercedes', 'bmw', 'range rover'], path: '/fleet', label: 'Our Fleet' },
        { keywords: ['service', 'services', 'offering', 'rental', 'hire'], path: '/services', label: 'Services' },
        { keywords: ['airbnb', 'air bnb', 'accommodation', 'stay', 'apartment'], path: '/services/airbnb', label: 'Air BnB Services' },
        { keywords: ['suv', 'suv rental'], path: '/services/suv-rental', label: 'SUV Rental' },
        { keywords: ['electric', 'ev', 'tesla', 'polestar', 'green'], path: '/services/electric-vehicles', label: 'Electric Vehicles' },
        { keywords: ['business', 'corporate', 'executive', 'travel'], path: '/services/business-travel', label: 'Business Travel' },
        { keywords: ['airport', 'transfer', 'pickup', 'dropoff'], path: '/services/airport-transfers', label: 'Airport Transfers' },
        { keywords: ['about', 'about us', 'who', 'company', 'story'], path: '/about', label: 'About Us' },
        { keywords: ['contact', 'phone', 'call', 'email', 'reach', 'support', 'help'], path: '/contact', label: 'Contact Us' },
        { keywords: ['faq', 'question', 'questions', 'help', 'answer'], path: '/faq', label: 'FAQ' },
        { keywords: ['terms', 'conditions', 'legal'], path: '/terms', label: 'Terms & Conditions' },
        { keywords: ['privacy', 'policy', 'data'], path: '/privacy', label: 'Privacy Policy' },
        { keywords: ['location', 'locations', 'address', 'map', 'nairobi', 'kent', 'kenya', 'uk'], path: '/locations', label: 'Locations' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim().toLowerCase();
        if (!query) return;

        // Score each entry by keyword matches
        const scored = searchIndex
            .map((entry) => {
                let score = 0;
                entry.keywords.forEach((keyword) => {
                    if (query === keyword) score += 10;
                    else if (query.includes(keyword)) score += 5;
                    else if (keyword.includes(query)) score += 3;
                });
                return { ...entry, score };
            })
            .filter((entry) => entry.score > 0)
            .sort((a, b) => b.score - a.score);

        if (scored.length > 0) {
            navigate(scored[0].path);
        } else {
            // Fallback: go to contact page with query context
            navigate(`/contact?q=${encodeURIComponent(query)}`);
        }
    };

    const handleClear = () => setSearchQuery('');

    const quickLinks = [
        {
            title: 'Return Home',
            description: 'Back to the main page',
            icon: HomeIcon,
            path: '/',
            gradient: 'from-blue-500 to-indigo-600',
            shadow: 'shadow-blue-500/30',
            ring: 'group-hover:ring-blue-200',
        },
        {
            title: 'Book a Vehicle',
            description: 'Reserve your next ride',
            icon: CalendarDaysIcon,
            path: '/booking',
            gradient: 'from-emerald-500 to-teal-600',
            shadow: 'shadow-emerald-500/30',
            ring: 'group-hover:ring-emerald-200',
        },
        {
            title: 'Browse Our Fleet',
            description: 'Explore available vehicles',
            icon: TruckIcon,
            path: '/fleet',
            gradient: 'from-amber-500 to-orange-600',
            shadow: 'shadow-amber-500/30',
            ring: 'group-hover:ring-amber-200',
        },
        {
            title: 'Visit FAQ',
            description: 'Answers to common questions',
            icon: BuildingLibraryIcon,
            path: '/faq',
            gradient: 'from-purple-500 to-violet-600',
            shadow: 'shadow-purple-500/30',
            ring: 'group-hover:ring-purple-200',
        },
    ];

    const contactOptions = [
        {
            label: 'Kenya Office',
            value: '+254 (705) 336 311',
            href: 'tel:+254705336311',
            icon: PhoneIcon,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            hover: 'hover:border-blue-300 hover:bg-blue-50',
        },
        {
            label: 'UK Office',
            value: '+44 (7397) 549 590',
            href: 'tel:+447397549590',
            icon: PhoneIcon,
            color: 'text-cyan-600',
            bg: 'bg-cyan-50',
            hover: 'hover:border-cyan-300 hover:bg-cyan-50',
        },
        {
            label: 'Email Support',
            value: 'visionwanservices@gmail.com',
            href: 'mailto:visionwanservices@gmail.com',
            icon: EnvelopeIcon,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            hover: 'hover:border-amber-300 hover:bg-amber-50',
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 overflow-hidden">
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240 / 0.5) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
                }}
            />

            {/* Soft colored orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-cyan-300/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-300/15 rounded-full blur-[120px] pointer-events-none" />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-5xl w-full">

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-red-100 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </span>
                            <span className="text-xs font-bold text-red-600 tracking-widest uppercase">
                                Error 404
                            </span>
                        </div>

                        {/* 404 Hero */}
                        <div className="relative mb-6">
                            <h1 className="text-[120px] sm:text-[170px] lg:text-[220px] font-black leading-none tracking-tighter bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent select-none">
                                404
                            </h1>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                            This Page Took a Wrong Turn
                        </h2>
                        <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                            The page you're looking for doesn't exist or has been moved. Let's get you back on the road.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mb-14 max-w-2xl mx-auto">
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                            <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 focus-within:border-blue-300 transition-all duration-300 overflow-hidden">
                                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 ml-5 flex-shrink-0" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search pages, services, or vehicles..."
                                    className="flex-1 px-4 py-4 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm sm:text-base"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        aria-label="Clear search"
                                        className="p-1.5 mr-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-200"
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-6 py-3 m-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Quick Links Grid */}
                    <div className="mb-14">
                        <div className="flex items-center justify-center gap-2.5 mb-8">
                            <ArrowPathIcon className="h-4 w-4 text-blue-500" />
                            <h3 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
                                Popular Destinations
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={index}
                                        to={link.path}
                                        className={`group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl ${link.shadow} ring-1 ring-transparent ${link.ring} transition-all duration-500 hover:-translate-y-1.5 overflow-hidden`}
                                    >
                                        <div className="relative">
                                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${link.gradient} mb-4 shadow-lg ${link.shadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                                {link.title}
                                            </h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {link.description}
                                            </p>
                                            <ArrowRightIcon className="absolute top-1 right-0 h-5 w-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
                        {/* Decorative corner accents */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl -translate-y-20 translate-x-20 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-100 to-transparent rounded-full blur-2xl translate-y-20 -translate-x-20 pointer-events-none" />

                        <div className="relative">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-4">
                                    <ChatSolid className="h-3.5 w-3.5 text-blue-500" />
                                    <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">
                                        Need Assistance?
                                    </span>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                                    We're Here to Help
                                </h3>
                                <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
                                    Reach out to our team anytime — we're available 24/7.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                                {contactOptions.map((option, index) => {
                                    const Icon = option.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={option.href}
                                            className={`group/contact flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 ${option.hover} transition-all duration-300 hover:-translate-y-0.5`}
                                        >
                                            <div className={`p-2.5 rounded-lg ${option.bg} flex-shrink-0`}>
                                                <Icon className={`h-5 w-5 ${option.color} group-hover/contact:scale-110 transition-transform duration-300`} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                                                    {option.label}
                                                </p>
                                                <p className="text-sm font-bold text-slate-800 break-all">
                                                    {option.value}
                                                </p>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                                <div className="p-2.5 rounded-lg bg-white flex-shrink-0 shadow-sm">
                                    <MapPinSolid className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold text-emerald-700/70 uppercase tracking-wider mb-0.5">
                                        Head Office
                                    </p>
                                    <p className="text-sm font-bold text-slate-800">
                                        Kilimani, Equity Building 1st Floor
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Opposite Yaya Centre, Nairobi, Kenya — Arwings Kodhek Road
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-10 text-center">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-slate-900/20"
                        >
                            <HomeIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            Back to Home
                            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 border-t border-slate-200/80 bg-white/60 backdrop-blur-sm py-6">
                <p className="text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} Vision Wan Services. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;