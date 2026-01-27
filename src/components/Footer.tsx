import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
    PhoneIcon,
    MailIcon,
    MapPinIcon
} from 'lucide-react';


const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">V1</span>
                            </div>
                            <div className="ml-3">
                                <h2 className="text-xl font-bold">Vision One</h2>
                                <p className="text-gray-400 text-sm">Car Hire Services</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Premium car hire services with luxury vehicles, exceptional customer service, and nationwide coverage.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FacebookIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <TwitterIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <InstagramIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <LinkedinIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/booking" className="text-gray-400 hover:text-white transition-colors">
                                    Book Now
                                </Link>
                            </li>
                            <li>
                                <Link to="/fleet" className="text-gray-400 hover:text-white transition-colors">
                                    Our Fleet
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Services</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                Luxury Car Hire
                            </li>
                            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                SUV Rental
                            </li>
                            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                Electric Vehicles
                            </li>
                            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                Business Travel
                            </li>
                            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                Airport Transfers
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <PhoneIcon className="h-5 w-5 text-primary-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-gray-400">+254 (705) 336 311</p>
                                    <p className="text-gray-500 text-sm">24/7 Support</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <PhoneIcon className="h-5 w-5 text-primary-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-gray-400">+44 (7397) 549 590</p>
                                    <p className="text-gray-500 text-sm">24/7 Support</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <MailIcon className="h-5 w-5 text-primary-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-gray-400">vison1servicesltd@gmail.com</p>
                                    <p className="text-gray-500 text-sm">Response within 2 hours</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <MapPinIcon className="h-5 w-5 text-primary-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-gray-400">Kilimani</p>
                                    <p className="text-gray-500 text-sm">Nairobi, Kenya</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <MapPinIcon className="h-5 w-5 text-primary-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-gray-400">Kent</p>
                                    <p className="text-gray-500 text-sm">United Kingdom</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-400">
                                &copy; {currentYear} Vision One Car Hire Services. All rights reserved.
                            </p>
                        </div>
                        <div className="md:text-right">
                            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                                <Link to="/terms" className="hover:text-white transition-colors">
                                    Terms & Conditions
                                </Link>
                                <Link to="/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link to="/faq" className="hover:text-white transition-colors">
                                    FAQ
                                </Link>
                                <Link to="/seo" className="hover:text-white transition-colors">
                                    SEO
                                </Link>
                                <Link to="/locations" className="hover:text-white transition-colors">
                                    Locations
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;