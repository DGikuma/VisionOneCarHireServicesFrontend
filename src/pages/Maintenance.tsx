import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    PhoneIcon,
    EnvelopeIcon,
    ArrowPathIcon,
    ClockIcon,
    ShieldCheckIcon,
    SignalIcon,
    WrenchScrewdriverIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
    MapPinIcon as MapPinSolid,
    BoltIcon as BoltSolid,
    LockClosedIcon as LockSolid,
    GlobeAltIcon as GlobeSolid,
} from '@heroicons/react/24/solid';

interface MaintenanceProps {
    /** 'maintenance' | 'suspended' | 'expired' */
    status?: 'maintenance' | 'suspended' | 'expired';
}

const Maintenance: React.FC<MaintenanceProps> = ({ status = 'maintenance' }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Live clock ticking every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Configuration per status type
    const statusConfig = {
        maintenance: {
            badge: 'Scheduled Maintenance',
            badgeColor: 'text-amber-700',
            badgeBg: 'bg-amber-50',
            badgeBorder: 'border-amber-200',
            dotColor: 'bg-amber-500',
            headline: 'We\'re Upgrading Your Experience',
            subheadline: 'Vision Wan is currently performing scheduled maintenance on our website to serve you better. We\'ll be back online shortly.',
            icon: WrenchScrewdriverIcon,
            iconGradient: 'from-amber-500 to-orange-600',
            iconShadow: 'shadow-amber-500/30',
            accentFrom: 'from-amber-400',
            accentVia: 'via-orange-400',
            accentTo: 'to-amber-400',
            orbOne: 'bg-amber-300/30',
            orbTwo: 'bg-orange-300/25',
            orbThree: 'bg-yellow-300/20',
            assistTitle: 'Need Immediate Assistance?',
            assistSubtitle: 'Our Vision Wan support team is available 24/7 for urgent matters.',
            assistBadge: 'Stay Informed',
        },
        suspended: {
            badge: 'Service Temporarily Suspended',
            badgeColor: 'text-red-700',
            badgeBg: 'bg-red-50',
            badgeBorder: 'border-red-200',
            dotColor: 'bg-red-500',
            headline: 'Service Temporarily Unavailable',
            subheadline: 'This website is currently suspended on Render. Please contact our team at Vision Wan to restore access immediately.',
            icon: LockSolid,
            iconGradient: 'from-red-500 to-rose-600',
            iconShadow: 'shadow-red-500/30',
            accentFrom: 'from-red-400',
            accentVia: 'via-rose-400',
            accentTo: 'to-red-400',
            orbOne: 'bg-red-300/30',
            orbTwo: 'bg-rose-300/25',
            orbThree: 'bg-pink-300/20',
            assistTitle: 'Contact Us to Reactivate',
            assistSubtitle: 'Reach out to Vision Wan and we\'ll restore the Render deployment within minutes.',
            assistBadge: 'Restore Access',
        },
        expired: {
            badge: 'Subscription Expired',
            badgeColor: 'text-purple-700',
            badgeBg: 'bg-purple-50',
            badgeBorder: 'border-purple-200',
            dotColor: 'bg-purple-500',
            headline: 'Your Subscription Has Expired',
            subheadline: 'The Render hosting plan for this website has expired. Contact Vision Wan to renew and restore uninterrupted access.',
            icon: ClockIcon,
            iconGradient: 'from-purple-500 to-violet-600',
            iconShadow: 'shadow-purple-500/30',
            accentFrom: 'from-purple-400',
            accentVia: 'via-violet-400',
            accentTo: 'to-purple-400',
            orbOne: 'bg-purple-300/30',
            orbTwo: 'bg-violet-300/25',
            orbThree: 'bg-indigo-300/20',
            assistTitle: 'Renew to Restore Access',
            assistSubtitle: 'Contact Vision Wan to renew the Render subscription and bring the site back online.',
            assistBadge: 'Renew Now',
        },
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    const contactOptions = [
        {
            label: 'Kenya Office',
            value: '+254 (705) 336 311',
            href: 'tel:+254705336311',
            icon: PhoneIcon,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            hover: 'hover:border-blue-300 hover:bg-blue-50',
        },
        {
            label: 'UK Office',
            value: '+44 (7397) 549 590',
            href: 'tel:+447397549590',
            icon: PhoneIcon,
            color: 'text-cyan-600',
            bg: 'bg-cyan-50',
            border: 'border-cyan-100',
            hover: 'hover:border-cyan-300 hover:bg-cyan-50',
        },
        {
            label: 'Email Support',
            value: 'visionwanservices@gmail.com',
            href: 'mailto:visionwanservices@gmail.com',
            icon: EnvelopeIcon,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            hover: 'hover:border-amber-300 hover:bg-amber-50',
        },
    ];

    // Format time
    const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    const dateString = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 overflow-hidden">
            {/* Grid pattern background */}
            <div
                className="absolute inset-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240 / 0.5) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 100%)',
                }}
            />

            {/* Soft animated orbs */}
            <div className={`absolute top-10 left-[15%] w-[500px] h-[500px] ${config.orbOne} rounded-full blur-[120px] animate-pulse pointer-events-none`} />
            <div className={`absolute bottom-10 right-[15%] w-[450px] h-[450px] ${config.orbTwo} rounded-full blur-[120px] animate-pulse pointer-events-none`} style={{ animationDelay: '1.5s' }} />
            <div className={`absolute top-1/2 left-1/2 w-[600px] h-[400px] ${config.orbThree} rounded-full blur-[130px] -translate-x-1/2 -translate-y-1/2 animate-pulse pointer-events-none`} style={{ animationDelay: '0.8s' }} />

            {/* Top accent line */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${config.accentFrom} ${config.accentVia} ${config.accentTo}`} />

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl w-full">

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-2.5 px-4 py-2 ${config.badgeBg} rounded-full shadow-sm border ${config.badgeBorder} mb-8`}>
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dotColor} opacity-75`} />
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`} />
                            </span>
                            <span className={`text-xs font-bold tracking-widest uppercase ${config.badgeColor}`}>
                                {config.badge}
                            </span>
                        </div>

                        {/* Icon */}
                        <div className="relative inline-flex mb-8">
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.iconGradient} rounded-3xl blur-2xl opacity-40 animate-pulse`} />
                            <div className={`relative p-6 bg-gradient-to-br ${config.iconGradient} rounded-3xl shadow-2xl ${config.iconShadow} transform hover:scale-105 transition-transform duration-500`}>
                                <StatusIcon className="h-14 w-14 text-white" />
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight max-w-3xl mx-auto">
                            {config.headline}
                        </h1>
                        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            {config.subheadline}
                        </p>
                    </div>

                    {/* Live Status Bar */}
                    <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-8">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-slate-100 to-transparent rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none" />

                        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
                            {/* Date + Time */}
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${config.iconGradient} shadow-lg ${config.iconShadow} flex-shrink-0`}>
                                    <SignalIcon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                                        Live Status
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {dateString}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block w-px h-12 bg-slate-200" />

                            {/* Time Display */}
                            <div className="text-center sm:text-right">
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                                    Current Time
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
                                    {timeString}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl -translate-y-20 translate-x-20 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-100 to-transparent rounded-full blur-2xl translate-y-20 -translate-x-20 pointer-events-none" />

                        <div className="relative">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-4">
                                    <BoltSolid className="h-3.5 w-3.5 text-blue-500" />
                                    <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">
                                        {config.assistBadge}
                                    </span>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                                    {config.assistTitle}
                                </h3>
                                <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
                                    {config.assistSubtitle}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                                {contactOptions.map((option, index) => {
                                    const Icon = option.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={option.href}
                                            className={`group/contact flex items-center gap-3 p-4 bg-slate-50 rounded-xl border ${option.border} ${option.hover} transition-all duration-300 hover:-translate-y-0.5`}
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

                    {/* Trust Indicators */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: ShieldCheckIcon, label: 'Secure Infrastructure', color: 'text-blue-500', bg: 'bg-blue-50' },
                            { icon: GlobeSolid, label: 'Global Coverage', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { icon: ArrowPathIcon, label: 'Auto-Recovery Enabled', color: 'text-purple-500', bg: 'bg-purple-50' },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="group flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/80 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <div className={`p-2.5 rounded-xl ${item.bg} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`h-5 w-5 ${item.color}`} />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 border-t border-slate-200/80 bg-white/60 backdrop-blur-sm py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Vision Wan Services. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <ExclamationTriangleIcon className="h-3.5 w-3.5" />
                        <span>
                            {status === 'maintenance' && 'Status updates posted every 15 minutes'}
                            {status === 'suspended' && 'Render deployment currently paused'}
                            {status === 'expired' && 'Render hosting plan requires renewal'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;