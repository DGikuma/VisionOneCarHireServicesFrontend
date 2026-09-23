import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
    PhoneIcon,
    MailIcon,
    MapPinIcon,
    ArrowUpIcon,
    CarIcon,
    HomeIcon,
    BriefcaseIcon,
    GlobeIcon
} from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Social media links
    const socialLinks = [
        { icon: FacebookIcon, href: 'https://facebook.com/visionwanservices', label: 'Facebook', hover: 'hover:bg-blue-600' },
        { icon: TwitterIcon, href: 'https://twitter.com/visionwanservices', label: 'Twitter', hover: 'hover:bg-sky-500' },
        { icon: InstagramIcon, href: 'https://instagram.com/visionwanservices', label: 'Instagram', hover: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-amber-400' },
        { icon: LinkedinIcon, href: 'https://linkedin.com/company/visionwanservices', label: 'LinkedIn', hover: 'hover:bg-blue-700' },
    ];

    // Quick links with proper routes
    const quickLinks = [
        { to: '/', label: 'Home', icon: HomeIcon },
        { to: '/booking', label: 'Book Now', icon: CarIcon },
        { to: '/fleet', label: 'Our Fleet', icon: CarIcon },
        { to: '/services', label: 'Services', icon: BriefcaseIcon },
        { to: '/about', label: 'About Us', icon: GlobeIcon },
    ];

    // Services with proper routes
    const services = [
        { to: '/services/luxury-car-hire', label: 'Luxury Car Hire' },
        { to: '/services/airbnb', label: 'Air BnB Services' },
        { to: '/services/suv-rental', label: 'SUV Rental' },
        { to: '/services/electric-vehicles', label: 'Electric Vehicles' },
        { to: '/services/business-travel', label: 'Business Travel' },
        { to: '/services/airport-transfers', label: 'Airport Transfers' },
    ];

    // Bottom links with proper routes
    const bottomLinks = [
        { to: '/terms', label: 'Terms & Conditions' },
        { to: '/privacy', label: 'Privacy Policy' },
        { to: '/faq', label: 'FAQ' },
        { to: '/seo', label: 'SEO' },
        { to: '/locations', label: 'Locations' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Top accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-amber-400 to-cyan-400" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Company Info - spans 4 columns */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-amber-400 rounded-xl blur-md opacity-60" />
                                <div className="relative bg-gradient-to-br from-primary-500 to-amber-400 p-2.5 rounded-xl">
                                    <CarIcon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Vision Wan
                                </h2>
                                <p className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                                    Services
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed text-sm">
                            Premium services with luxury vehicles, Air BnB's, exceptional customer service,
                            and nationwide coverage. Your journey, our passion.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            {socialLinks.map(({ icon: Icon, href, label, hover }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`group relative p-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-400 transition-all duration-300 hover:text-white hover:border-transparent hover:scale-110 ${hover}`}
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links & Services - side by side on mobile, each 2 columns on desktop */}
                    <div className="grid grid-cols-2 gap-6 md:col-span-2 lg:col-span-4">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-6">
                                Quick Links
                            </h3>
                            <ul className="space-y-3.5">
                                {quickLinks.map(({ to, label, icon: Icon }) => (
                                    <li key={to}>
                                        <Link
                                            to={to}
                                            className="group flex items-center gap-2.5 text-gray-400 hover:text-white transition-all duration-300"
                                        >
                                            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 border border-white/10 group-hover:bg-primary-500/20 group-hover:border-primary-500/30 transition-all duration-300 shrink-0">
                                                <Icon className="h-3 w-3 text-primary-400" />
                                            </span>
                                            <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                                                {label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-6">
                                Services
                            </h3>
                            <ul className="space-y-3.5">
                                {services.map(({ to, label }) => (
                                    <li key={to}>
                                        <Link
                                            to={to}
                                            className="group flex items-center gap-2.5 text-gray-400 hover:text-white transition-all duration-300"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-amber-400 group-hover:scale-150 transition-transform duration-300 shrink-0" />
                                            <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                                                {label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info - spans 4 columns */}
                    <div className="lg:col-span-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-6">
                            Get In Touch
                        </h3>
                        <ul className="space-y-5">
                            {/* Phone 1 */}
                            <li className="group flex items-start gap-3.5">
                                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-primary-500/20 to-primary-500/5 border border-primary-500/20 rounded-xl group-hover:border-primary-400/40 transition-all duration-300">
                                    <PhoneIcon className="h-4 w-4 text-primary-400" />
                                </div>
                                <div>
                                    <a
                                        href="tel:+254705336311"
                                        className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors"
                                    >
                                        +254 (705) 336 311
                                    </a>
                                    <p className="text-xs text-gray-500 mt-0.5">24/7 Support</p>
                                </div>
                            </li>

                            {/* Phone 2 */}
                            <li className="group flex items-start gap-3.5">
                                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-primary-500/20 to-primary-500/5 border border-primary-500/20 rounded-xl group-hover:border-primary-400/40 transition-all duration-300">
                                    <PhoneIcon className="h-4 w-4 text-primary-400" />
                                </div>
                                <div>
                                    <a
                                        href="tel:+447397549590"
                                        className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors"
                                    >
                                        +44 (7397) 549 590
                                    </a>
                                    <p className="text-xs text-gray-500 mt-0.5">24/7 Support</p>
                                </div>
                            </li>

                            {/* Email */}
                            <li className="group flex items-start gap-3.5">
                                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 rounded-xl group-hover:border-amber-400/40 transition-all duration-300">
                                    <MailIcon className="h-4 w-4 text-amber-400" />
                                </div>
                                <div>
                                    <a
                                        href="mailto:visionwanservices@gmail.com"
                                        className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors break-all"
                                    >
                                        visionwanservices@gmail.com
                                    </a>
                                    <p className="text-xs text-gray-500 mt-0.5">Response within 2 hours</p>
                                </div>
                            </li>

                            {/* Updated Nairobi Address */}
                            <li className="group flex items-start gap-3.5">
                                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 rounded-xl group-hover:border-emerald-400/40 transition-all duration-300">
                                    <MapPinIcon className="h-4 w-4 text-emerald-400" />
                                </div>
                                <div>
                                    <a
                                        href="https://maps.google.com/?q=Equity+Building+Kilimani+Nairobi+Kenya"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors"
                                    >
                                        Kilimani, Equity Building 1st Floor
                                    </a>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Opposite Yaya Centre, Nairobi, Kenya
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Arwings Kodhek Road
                                    </p>
                                </div>
                            </li>

                            {/* UK Address */}
                            <li className="group flex items-start gap-3.5">
                                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 rounded-xl group-hover:border-cyan-400/40 transition-all duration-300">
                                    <MapPinIcon className="h-4 w-4 text-cyan-400" />
                                </div>
                                <div>
                                    <a
                                        href="https://maps.google.com/?q=Kent+United+Kingdom"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors"
                                    >
                                        Kent
                                    </a>
                                    <p className="text-xs text-gray-500 mt-0.5">United Kingdom</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-gray-500 order-2 md:order-1">
                            &copy; {currentYear}{' '}
                            <span className="text-gray-400 font-medium">Vision Wan Services</span>. All rights reserved.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 order-1 md:order-2">
                            {bottomLinks.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className="relative text-sm text-gray-500 hover:text-white transition-colors duration-300 group"
                                >
                                    {label}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary-400 to-amber-400 group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to top button */}
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="absolute bottom-6 right-6 p-3 bg-gradient-to-br from-primary-500 to-amber-500 rounded-xl text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
                <ArrowUpIcon className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
        </footer>
    );
};

export default Footer;