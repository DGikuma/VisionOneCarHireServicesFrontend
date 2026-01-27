import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    HomeIcon,
    MagnifyingGlassIcon,
    PhoneIcon,
    ArrowRightIcon,
    MapIcon,
    ClockIcon,
    ShieldCheckIcon,
    BuildingLibraryIcon,
    ChartBarIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';
import {
    SparklesIcon as SparklesSolid,
    ArrowPathIcon as ArrowPathSolid,
    ShieldCheckIcon as ShieldCheckSolid
} from '@heroicons/react/24/solid';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/5 to-cyan-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/5 to-blue-600/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <div className="absolute inset-0 animate-pulse">
                            <div className="w-48 h-48 border-2 border-blue-400/20 rounded-full"></div>
                            <div className="w-48 h-48 border-2 border-blue-400/20 rounded-full absolute top-0 left-0 animate-spin" style={{ animationDuration: '20s' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
                <div className="max-w-6xl w-full">
                    {/* Corporate Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-8">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                            <span className="text-sm font-semibold text-gray-700">
                                Navigation Error • Code 404 • Vision One Systems
                            </span>
                        </div>

                        <div className="relative mb-12">
                            {/* Large decorative 404 */}
                            <div className="text-[280px] font-black text-gray-100 leading-none tracking-tighter">
                                404
                            </div>

                            {/* Overlay text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg mr-4"></div>
                                    <h1 className="text-5xl font-bold text-gray-900">
                                        Resource Not Found
                                    </h1>
                                </div>
                                <p className="text-2xl font-medium text-gray-600 max-w-2xl">
                                    The requested corporate resource is temporarily unavailable or has been relocated
                                </p>
                            </div>
                        </div>

                        {/* Strategic Message */}
                        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
                            <div className="flex items-start">
                                <ShieldCheckSolid className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                                <div className="text-left">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        Executive Navigation Advisory
                                    </h3>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        While this specific page cannot be located, our enterprise systems are fully operational.
                                        This may be due to a recent strategic update, resource consolidation, or access restriction.
                                        Our corporate navigation team has been alerted and will address any systemic routing issues.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Corporate Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* Left Column - Recovery Actions */}
                        <div>
                            <div className="flex items-center mb-8">
                                <ArrowPathSolid className="h-8 w-8 text-blue-600 mr-4" />
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Immediate Recovery Protocol
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {[
                                    {
                                        title: 'Return to Command Center',
                                        description: 'Navigate back to the main corporate dashboard',
                                        icon: HomeIcon,
                                        path: '/',
                                        gradient: 'from-blue-600 to-blue-800'
                                    },
                                    {
                                        title: 'Initiate Booking Sequence',
                                        description: 'Access enterprise fleet management system',
                                        icon: DevicePhoneMobileIcon,
                                        path: '/booking',
                                        gradient: 'from-emerald-600 to-teal-600'
                                    },
                                    {
                                        title: 'Contact Strategic Support',
                                        description: 'Connect with executive assistance team',
                                        icon: PhoneIcon,
                                        path: '/contact',
                                        gradient: 'from-purple-600 to-indigo-600'
                                    },
                                    {
                                        title: 'Access Knowledge Repository',
                                        description: 'Browse corporate documentation and FAQs',
                                        icon: BuildingLibraryIcon,
                                        path: '/faq',
                                        gradient: 'from-amber-600 to-orange-600'
                                    }
                                ].map((action, index) => (
                                    <Link
                                        key={index}
                                        to={action.path}
                                        className="group block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
                                    >
                                        <div className="flex items-center">
                                            <div className={`p-4 rounded-xl bg-gradient-to-r ${action.gradient} mr-6`}>
                                                <action.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                                                        {action.title}
                                                    </h3>
                                                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                                <p className="text-gray-600 mt-2">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Corporate Resources */}
                        <div>
                            <div className="flex items-center mb-8">
                                <SparklesSolid className="h-8 w-8 text-blue-600 mr-4" />
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Strategic Resource Access
                                </h2>
                            </div>

                            {/* Search with AI */}
                            <div className="mb-8 bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-transparent opacity-20 rounded-full -translate-y-16 translate-x-16"></div>

                                <div className="relative">
                                    <h3 className="text-2xl font-bold mb-4">Corporate Search Intelligence</h3>
                                    <p className="text-blue-200 mb-6">
                                        Use our AI-powered search to locate enterprise resources
                                    </p>
                                    <div className="relative">
                                        <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-400" />
                                        <input
                                            type="text"
                                            placeholder="Search for enterprise solutions, fleet data, or corporate policies..."
                                            className="w-full pl-16 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Access Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    { name: 'Global Fleet', icon: GlobeAltIcon, color: 'bg-blue-100 text-blue-700' },
                                    { name: 'Analytics', icon: ChartBarIcon, color: 'bg-emerald-100 text-emerald-700' },
                                    { name: 'Compliance', icon: ShieldCheckIcon, color: 'bg-purple-100 text-purple-700' },
                                    { name: 'Schedule', icon: ClockIcon, color: 'bg-amber-100 text-amber-700' },
                                    { name: 'Locations', icon: MapIcon, color: 'bg-cyan-100 text-cyan-700' },
                                    { name: 'Systems', icon: DevicePhoneMobileIcon, color: 'bg-indigo-100 text-indigo-700' }
                                ].map((item, index) => (
                                    <Link
                                        key={index}
                                        to="/dashboard"
                                        className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow group border border-gray-200"
                                    >
                                        <div className={`inline-flex p-3 rounded-lg ${item.color} mb-3`}>
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {item.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>

                            {/* System Status */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-300">
                                <h3 className="font-bold text-gray-900 mb-4">System Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">Core Platform</span>
                                        </div>
                                        <span className="font-bold text-emerald-600">Operational</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">Booking Systems</span>
                                        </div>
                                        <span className="font-bold text-emerald-600">Operational</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">Resource Access</span>
                                        </div>
                                        <span className="font-bold text-blue-600">Degraded</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Protocol */}
                    <div className="mb-16">
                        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>

                            <div className="relative">
                                <div className="flex flex-col lg:flex-row items-center justify-between">
                                    <div className="mb-8 lg:mb-0 lg:mr-12">
                                        <div className="flex items-center mb-6">
                                            <div className="p-3 rounded-xl bg-white/20 mr-4">
                                                <ShieldCheckSolid className="h-8 w-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold">Emergency Access Protocol</h3>
                                                <p className="text-red-100 mt-2">For critical business continuity issues</p>
                                            </div>
                                        </div>
                                        <p className="text-red-100 max-w-2xl">
                                            If you require immediate access to mission-critical resources or are experiencing systemic navigation failures, use our dedicated emergency channels.
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                                            <p className="font-bold text-4xl tracking-widest mb-2">1-800-VISION-911</p>
                                            <p className="text-red-200">Global Executive Hotline</p>
                                        </div>
                                        <div className="text-sm text-red-200">
                                            24/7 Support • Priority Routing • Direct Escalation
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Corporate Footer */}
                    <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200">
                        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                            <div className="mb-6 lg:mb-0">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mr-4">
                                        <span className="text-white font-bold text-lg">V1</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Vision One Systems</h3>
                                        <p className="text-gray-600">Enterprise Mobility Solutions</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">99.95%</div>
                                    <div className="text-sm text-gray-600">Platform Uptime</div>
                                </div>
                                <div className="h-12 w-px bg-gray-300"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-emerald-600">24/7</div>
                                    <div className="text-sm text-gray-600">Support Coverage</div>
                                </div>
                                <div className="h-12 w-px bg-gray-300"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">ISO</div>
                                    <div className="text-sm text-gray-600">27001 Certified</div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-8">
                            <p className="text-center text-gray-500">
                                © 2024 Vision One Corporate Solutions. This incident has been logged for system improvement.
                                <span className="block mt-2 text-sm text-gray-400">
                                    Incident ID: V1-404-{Date.now().toString().slice(-8)} • Timestamp: {new Date().toISOString()}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Help */}
            <div className="fixed bottom-8 right-8 z-20">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center">
                        <PhoneIcon className="h-6 w-6 mr-3" />
                        <span className="font-bold">Quick Help</span>
                    </div>
                    <div className="absolute -top-2 -right-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;