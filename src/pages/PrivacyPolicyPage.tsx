import * as React from 'react';
import { ShieldCheckIcon, DocumentTextIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex p-4 bg-primary-100 rounded-2xl mb-6">
                    <ShieldCheckIcon className="h-12 w-12 text-primary-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Privacy Policy
                </h1>
                <p className="text-gray-600">
                    Last updated: January 1, 2024
                </p>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <p className="text-gray-700 mb-6">
                    At Vision One Car Hire Services, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
                <p className="text-gray-700">
                    Please read this privacy policy carefully. By using our services, you consent to the data practices described in this policy.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
                <section className="bg-gray-50 rounded-2xl p-8">
                    <div className="flex items-center mb-6">
                        <DocumentTextIcon className="h-8 w-8 text-primary-600 mr-4" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            1. Information We Collect
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Personal Information
                            </h3>
                            <p className="text-gray-700 mb-4">
                                We collect personal information that you voluntarily provide when you:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li>Make a booking or reservation</li>
                                <li>Create an account</li>
                                <li>Contact our customer service</li>
                                <li>Subscribe to our newsletter</li>
                                <li>Participate in surveys or promotions</li>
                            </ul>
                            <p className="text-gray-700 mt-4">
                                This may include your name, email address, phone number, driver's license information, payment details, and vehicle preferences.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Automatically Collected Information
                            </h3>
                            <p className="text-gray-700">
                                When you visit our website, we automatically collect certain information about your device, including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Operating system</li>
                                <li>Referring URLs</li>
                                <li>Pages viewed and time spent</li>
                                <li>Clickstream data</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 rounded-2xl p-8">
                    <div className="flex items-center mb-6">
                        <UserIcon className="h-8 w-8 text-primary-600 mr-4" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            2. How We Use Your Information
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl">
                            <h3 className="font-bold text-gray-900 mb-3">Service Delivery</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Process your bookings and payments</li>
                                <li>• Send booking confirmations</li>
                                <li>• Provide customer support</li>
                                <li>• Manage your account</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl">
                            <h3 className="font-bold text-gray-900 mb-3">Improvement & Marketing</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Improve our services</li>
                                <li>• Send promotional offers</li>
                                <li>• Conduct market research</li>
                                <li>• Personalize your experience</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-6 bg-blue-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-3">Legal Compliance</h3>
                        <p className="text-gray-700">
                            We may use your information to comply with legal obligations, prevent fraud, and enforce our terms and conditions.
                        </p>
                    </div>
                </section>

                <section className="bg-gray-50 rounded-2xl p-8">
                    <div className="flex items-center mb-6">
                        <LockClosedIcon className="h-8 w-8 text-primary-600 mr-4" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            3. Data Security
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-700">
                            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="text-center p-4 bg-white rounded-xl">
                                <div className="text-2xl mb-2">🔒</div>
                                <h4 className="font-bold text-gray-900">Encryption</h4>
                                <p className="text-gray-600 text-sm">SSL/TLS encryption for data transmission</p>
                            </div>

                            <div className="text-center p-4 bg-white rounded-xl">
                                <div className="text-2xl mb-2">🛡️</div>
                                <h4 className="font-bold text-gray-900">Access Control</h4>
                                <p className="text-gray-600 text-sm">Strict access controls and authentication</p>
                            </div>

                            <div className="text-center p-4 bg-white rounded-xl">
                                <div className="text-2xl mb-2">📊</div>
                                <h4 className="font-bold text-gray-900">Regular Audits</h4>
                                <p className="text-gray-600 text-sm">Security assessments and monitoring</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        4. Your Rights
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl">
                            <h3 className="font-bold text-gray-900 mb-3">You have the right to:</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                    <span>Access your personal data</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                    <span>Correct inaccurate data</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                    <span>Request data deletion</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                    <span>Object to data processing</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                    <span>Data portability</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                    <span>Withdraw consent</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-gray-700">
                            To exercise any of these rights, please contact us at <strong>privacy@visiononecarhire.com</strong>. We will respond to your request within 30 days.
                        </p>
                    </div>
                </section>

                <section className="bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        5. Third-Party Sharing
                    </h2>

                    <div className="space-y-4">
                        <p className="text-gray-700">
                            We may share your information with third parties only in the following circumstances:
                        </p>

                        <div className="bg-white p-6 rounded-xl">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-blue-600 font-bold">A</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Service Providers</h4>
                                        <p className="text-gray-600">Payment processors, IT services, and marketing partners who assist in our operations</p>
                                    </div>
                                </li>

                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-green-600 font-bold">B</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Legal Requirements</h4>
                                        <p className="text-gray-600">When required by law or to protect our legal rights</p>
                                    </div>
                                </li>

                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-purple-600 font-bold">C</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Business Transfers</h4>
                                        <p className="text-gray-600">In connection with a merger, acquisition, or sale of assets</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        6. Cookies & Tracking
                    </h2>

                    <div className="space-y-4">
                        <p className="text-gray-700">
                            We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-xl">
                                <h4 className="font-bold text-gray-900 mb-2">Essential Cookies</h4>
                                <p className="text-gray-600 text-sm">Required for basic website functionality</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl">
                                <h4 className="font-bold text-gray-900 mb-2">Analytics Cookies</h4>
                                <p className="text-gray-600 text-sm">Help us understand how visitors use our site</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl">
                                <h4 className="font-bold text-gray-900 mb-2">Marketing Cookies</h4>
                                <p className="text-gray-600 text-sm">Used to deliver relevant advertisements</p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl mt-6">
                            <h4 className="font-bold text-gray-900 mb-2">Cookie Preferences</h4>
                            <p className="text-gray-700">
                                You can control cookie settings through your browser. However, disabling essential cookies may affect website functionality.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Contact Information */}
            <div className="mt-12 bg-primary-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Contact Us
                </h3>
                <p className="text-gray-700 mb-6">
                    If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer:
                </p>
                <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                        <ShieldCheckIcon className="h-5 w-5 mr-3 text-primary-600" />
                        <span>privacy@visiononecarhire.com</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <DocumentTextIcon className="h-5 w-5 mr-3 text-primary-600" />
                        <span>Vision One Car Hire Services<br />123 Main Street, City, State 12345</span>
                    </div>
                </div>
            </div>

            {/* Policy Updates */}
            <div className="mt-8 p-6 border-t border-gray-200">
                <p className="text-gray-600 text-center">
                    We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date and will be effective immediately upon posting.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;