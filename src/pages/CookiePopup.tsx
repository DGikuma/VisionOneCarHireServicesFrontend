import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    ShieldCheckIcon,
    Cog6ToothIcon,
    XMarkIcon,
    CheckIcon,
    InformationCircleIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';
import { ShieldCheckIcon as ShieldCheckSolid } from '@heroicons/react/24/solid';
import Button from '../components/Button';

const CookiePopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<'essential' | 'performance' | 'analytics' | 'marketing'>('essential');
    const [cookiePreferences, setCookiePreferences] = useState({
        essential: true,
        performance: false,
        analytics: false,
        marketing: false
    });
    const [isAnimating, setIsAnimating] = useState(false);

    // Add this to track if banner was shown
    useEffect(() => {
        const hasShown = sessionStorage.getItem('cookie-banner-shown');
        if (!hasShown) {
            // Show banner
            sessionStorage.setItem('cookie-banner-shown', 'true');
        }
    }, []);

    useEffect(() => {
        const hasConsent = localStorage.getItem('vision-one-cookie-consent');
        if (!hasConsent) {
            setTimeout(() => {
                setIsVisible(true);
                setIsAnimating(true);
            }, 1000);
        }
    }, []);

    const handleAcceptAll = () => {
        setCookiePreferences({
            essential: true,
            performance: true,
            analytics: true,
            marketing: true
        });

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
        setCookiePreferences({
            essential: true,
            performance: false,
            analytics: false,
            marketing: false
        });

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

    const handleSavePreferences = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('vision-one-cookie-consent', JSON.stringify({
                ...cookiePreferences,
                timestamp: new Date().toISOString()
            }));
        }, 300);
    };

    const togglePreference = (category: keyof typeof cookiePreferences) => {
        if (category === 'essential') return; // Essential cookies cannot be disabled

        setCookiePreferences(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const cookieCategories = [
        {
            id: 'essential',
            title: 'Essential Cookies',
            description: 'Required for basic site functionality and security. Cannot be disabled.',
            alwaysActive: true,
            icon: ShieldCheckIcon
        },
        {
            id: 'performance',
            title: 'Performance Cookies',
            description: 'Help us understand how visitors interact with our website to improve performance.',
            icon: Cog6ToothIcon
        },
        {
            id: 'analytics',
            title: 'Analytics Cookies',
            description: 'Allow us to analyze site usage to enhance your browsing experience.',
            icon: InformationCircleIcon
        },
        {
            id: 'marketing',
            title: 'Marketing Cookies',
            description: 'Used to deliver relevant advertisements and measure campaign effectiveness.',
            icon: LockClosedIcon
        }
    ];

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div className={`fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm transition-all duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`} onClick={() => setIsAnimating(false)} />

            {/* Cookie Popup */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,107,53,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-gray-50 to-white p-8 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-xl">
                                    <ShieldCheckSolid className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Privacy & Cookie Settings
                                    </h2>
                                    <p className="text-gray-600">
                                        Vision One Executive Mobility
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsAnimating(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                                aria-label="Close cookie settings"
                            >
                                <XMarkIcon className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full inline-flex">
                            <ShieldCheckIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE PRIVACY</span>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Info */}
                            <div className="lg:col-span-2">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        Our Commitment to Your Privacy
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        At Vision One, we value your privacy and are committed to protecting your personal data.
                                        We use cookies and similar technologies to provide you with the best possible experience
                                        on our platform while respecting your privacy choices.
                                    </p>

                                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-[#FF6B35]/10 rounded-lg">
                                                <InformationCircleIcon className="h-6 w-6 text-[#FF6B35]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-2">
                                                    How We Use Cookies
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    Cookies help us provide essential functionality, improve site performance,
                                                    understand user behavior, and deliver relevant content. You can adjust your
                                                    preferences at any time through our privacy settings.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cookie Categories Tabs */}
                                <div className="mb-8">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {cookieCategories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveTab(category.id as any)}
                                                className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === category.id
                                                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white shadow-lg shadow-[#FF6B35]/20'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                                    }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <category.icon className="h-5 w-5" />
                                                    {category.title}
                                                </span>
                                                {activeTab === category.id && (
                                                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FF6B35] rounded-full" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Active Category Content */}
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`p-3 rounded-xl ${cookieCategories.find(c => c.id === activeTab)?.alwaysActive
                                                ? 'bg-green-100 text-green-600'
                                                : cookiePreferences[activeTab]
                                                    ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] text-white'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {cookieCategories.find(c => c.id === activeTab)?.icon &&
                                                    React.createElement(
                                                        cookieCategories.find(c => c.id === activeTab)?.icon!,
                                                        { className: "h-8 w-8" }
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                                    {cookieCategories.find(c => c.id === activeTab)?.title}
                                                </h4>
                                                <p className="text-gray-600">
                                                    {cookieCategories.find(c => c.id === activeTab)?.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                                                <div>
                                                    <p className="font-medium text-gray-900">Cookie Status</p>
                                                    <p className="text-sm text-gray-500">
                                                        {cookieCategories.find(c => c.id === activeTab)?.alwaysActive
                                                            ? 'Always enabled for site functionality'
                                                            : cookiePreferences[activeTab]
                                                                ? 'Currently enabled'
                                                                : 'Currently disabled'
                                                        }
                                                    </p>
                                                </div>

                                                {!cookieCategories.find(c => c.id === activeTab)?.alwaysActive && (
                                                    <Button
                                                        onClick={() => togglePreference(activeTab)}
                                                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${cookiePreferences[activeTab]
                                                            ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]'
                                                            : 'bg-gray-300'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${cookiePreferences[activeTab]
                                                                ? 'translate-x-9'
                                                                : 'translate-x-1'
                                                                }`}
                                                        />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Preferences */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6">
                                        <h4 className="text-lg font-bold text-gray-900 mb-4">
                                            Your Cookie Preferences
                                        </h4>

                                        <div className="space-y-4 mb-6">
                                            {cookieCategories.map((category) => (
                                                <div
                                                    key={category.id}
                                                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${category.alwaysActive
                                                            ? 'bg-green-100 text-green-600'
                                                            : cookiePreferences[category.id as keyof typeof cookiePreferences]
                                                                ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] text-white'
                                                                : 'bg-gray-100 text-gray-500'
                                                            }`}>
                                                            <category.icon className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 text-sm">
                                                                {category.title}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {category.alwaysActive ? (
                                                        <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                                            Required
                                                        </div>
                                                    ) : (
                                                        <div className={`px-3 py-1 text-xs font-semibold rounded-full ${cookiePreferences[category.id as keyof typeof cookiePreferences]
                                                            ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white'
                                                            : 'bg-gray-200 text-gray-700'
                                                            }`}>
                                                            {cookiePreferences[category.id as keyof typeof cookiePreferences]
                                                                ? 'Enabled'
                                                                : 'Disabled'
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            <button
                                                onClick={handleAcceptAll}
                                                className="w-full py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                                            >
                                                <span className="flex items-center justify-center gap-2">
                                                    <CheckIcon className="h-5 w-5" />
                                                    Accept All Cookies
                                                </span>
                                            </button>

                                            <button
                                                onClick={handleSavePreferences}
                                                className="w-full py-3.5 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300"
                                            >
                                                Save Selected Preferences
                                            </button>

                                            <button
                                                onClick={handleAcceptNecessary}
                                                className="w-full py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                                            >
                                                Accept Necessary Only
                                            </button>
                                        </div>
                                    </div>

                                    {/* Privacy Links */}
                                    <div className="space-y-3">
                                        <a
                                            href="/privacy-policy"
                                            className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B35] transition-colors duration-300"
                                        >
                                            <InformationCircleIcon className="h-4 w-4" />
                                            <span className="text-sm">Privacy Policy</span>
                                        </a>
                                        <a
                                            href="/cookie-policy"
                                            className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B35] transition-colors duration-300"
                                        >
                                            <ShieldCheckIcon className="h-4 w-4" />
                                            <span className="text-sm">Cookie Policy</span>
                                        </a>
                                        <a
                                            href="/terms"
                                            className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B35] transition-colors duration-300"
                                        >
                                            <LockClosedIcon className="h-4 w-4" />
                                            <span className="text-sm">Terms of Service</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600">
                                <p>
                                    By continuing to use our site, you consent to our use of cookies as described in our
                                    <a href="/privacy-policy" className="text-[#FF6B35] font-semibold hover:underline mx-1">
                                        Privacy Policy
                                    </a>
                                    and
                                    <a href="/cookie-policy" className="text-[#FF6B35] font-semibold hover:underline mx-1">
                                        Cookie Policy
                                    </a>.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors duration-300"
                                >
                                    {isExpanded ? 'Show Less' : 'More Information'}
                                </button>
                                <button
                                    onClick={handleAcceptNecessary}
                                    className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors duration-300 font-semibold"
                                >
                                    Reject All
                                </button>
                            </div>
                        </div>

                        {isExpanded && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <h5 className="font-semibold text-gray-900 mb-2">Data Protection Details</h5>
                                <p className="text-sm text-gray-600">
                                    Vision One is committed to GDPR compliance and data protection. All data is encrypted
                                    and stored securely. For detailed information about data retention and your rights,
                                    please review our complete privacy documentation.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Alternative: Simple Banner for quick acceptance */}
            {!isExpanded && (
                <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}>
                    <div className="bg-white border-t border-gray-200 shadow-2xl">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-gradient-to-br from-[#FF6B35] to-[#FF8B35] rounded-lg">
                                            <ShieldCheckIcon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">
                                            Your Privacy Matters
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            We use cookies to enhance your browsing experience. By clicking "Accept All",
                                            you consent to our use of cookies.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        Customize
                                    </button>
                                    <button
                                        onClick={handleAcceptNecessary}
                                        className="px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        Reject All
                                    </button>
                                    <button
                                        onClick={handleAcceptAll}
                                        className="px-6 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300"
                                    >
                                        Accept All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CookiePopup; 