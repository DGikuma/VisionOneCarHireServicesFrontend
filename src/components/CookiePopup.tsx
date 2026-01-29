import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    ShieldCheckIcon,
    XMarkIcon,
    CheckIcon,
    InformationCircleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const CookiePopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check device type
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Check for existing consent
        const hasConsent = localStorage.getItem('vision-one-cookie-consent');
        if (!hasConsent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setIsAnimating(true);
            }, 1500);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', checkMobile);
            };
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleAcceptAll = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('vision-one-cookie-consent', JSON.stringify({
                essential: true,
                performance: true,
                analytics: true,
                marketing: true,
                timestamp: new Date().toISOString()
            }));
        }, 300);
    };

    const handleAcceptNecessary = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('vision-one-cookie-consent', JSON.stringify({
                essential: true,
                performance: false,
                analytics: false,
                marketing: false,
                timestamp: new Date().toISOString()
            }));
        }, 300);
    };

    const handleCustomize = () => {
        setIsExpanded(true);
    };

    if (!isVisible) return null;

    // Compact Banner View (Default)
    if (!isExpanded) {
        return (
            <>
                {/* Backdrop for mobile */}
                {isMobile && (
                    <div className={`fixed inset-0 z-[9998] bg-gray-900/50 backdrop-blur-sm transition-all duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'
                        }`} onClick={() => setIsAnimating(false)} />
                )}

                {/* Compact Banner */}
                <div className={`fixed z-[9999] transition-all duration-500 ${isMobile
                    ? 'bottom-0 left-0 right-0 p-4'
                    : 'bottom-6 right-6 max-w-md'
                    } ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#FF6B35]/5 to-[#FF8B35]/5 p-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-lg">
                                    <ShieldCheckIcon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm">
                                        Your Privacy Matters
                                    </h3>
                                    <p className="text-gray-600 text-xs">
                                        We use cookies for a better experience
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsAnimating(false)}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                                    aria-label="Close"
                                >
                                    <XMarkIcon className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <p className="text-gray-600 text-sm mb-4">
                                We use essential cookies to make our site work. With your consent, we may also use
                                cookies to improve your browsing experience.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={handleAcceptNecessary}
                                    className="flex-1 px-4 py-2.5 text-gray-700 font-medium text-sm rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                                >
                                    Necessary Only
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300"
                                >
                                    Accept All
                                </button>
                            </div>

                            <button
                                onClick={handleCustomize}
                                className="w-full mt-3 text-center text-[#FF6B35] text-sm font-medium hover:text-[#FF5A20] transition-colors duration-300"
                            >
                                Customize Preferences
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-500 text-xs text-center">
                                By continuing, you agree to our{' '}
                                <a href="/privacy" className="text-[#FF6B35] hover:underline">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Expanded Preferences View
    return (
        <>
            {/* Backdrop */}
            <div className={`fixed inset-0 z-[9998] bg-gray-900/70 backdrop-blur-sm transition-all duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`} onClick={() => setIsExpanded(false)} />

            {/* Modal */}
            <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-500 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-white p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-lg">
                                    <ShieldCheckIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Cookie Preferences
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        Vision One Executive Mobility
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsExpanded(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                                aria-label="Close"
                            >
                                <XMarkIcon className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="mb-6">
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                We use cookies to enhance your experience. Choose your preferences below.
                            </p>

                            {/* Cookie Types */}
                            <div className="space-y-3">
                                {/* Essential - Always on */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <CheckIcon className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">Essential</p>
                                            <p className="text-gray-500 text-xs">Required for site operation</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                        Always on
                                    </span>
                                </div>

                                {/* Performance */}
                                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-[#FF6B35]/30 transition-colors duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#FF6B35]/10 rounded-lg">
                                            <Cog6ToothIcon className="h-4 w-4 text-[#FF6B35]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">Performance</p>
                                            <p className="text-gray-500 text-xs">Site optimization</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 text-xs">Recommended</span>
                                        <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]">
                                            <span className="inline-block h-3 w-3 translate-x-1 rounded-full bg-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Analytics */}
                                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-[#FF6B35]/30 transition-colors duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#FF6B35]/10 rounded-lg">
                                            <InformationCircleIcon className="h-4 w-4 text-[#FF6B35]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">Analytics</p>
                                            <p className="text-gray-500 text-xs">Usage insights</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 text-xs">Recommended</span>
                                        <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]">
                                            <span className="inline-block h-3 w-3 translate-x-1 rounded-full bg-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 mb-6">
                            <div className="flex items-start gap-3">
                                <InformationCircleIcon className="h-5 w-5 text-[#FF6B35] flex-shrink-0" />
                                <p className="text-gray-600 text-xs">
                                    Essential cookies are required for site functionality. Performance and analytics
                                    cookies help us improve your experience.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleAcceptAll}
                                className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300"
                            >
                                Accept All Cookies
                            </button>

                            <button
                                onClick={handleAcceptNecessary}
                                className="w-full py-3 bg-white text-gray-900 font-medium text-sm rounded-xl border-2 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300"
                            >
                                Accept Necessary Only
                            </button>

                            <div className="flex items-center justify-center gap-2 pt-2">
                                <a href="/privacy" className="text-gray-600 hover:text-[#FF6B35] text-xs transition-colors duration-300">
                                    Privacy Policy
                                </a>
                                <span className="text-gray-300">•</span>
                                <a href="/cookies" className="text-gray-600 hover:text-[#FF6B35] text-xs transition-colors duration-300">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookiePopup;