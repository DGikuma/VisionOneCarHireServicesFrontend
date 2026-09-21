import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    MagnifyingGlassIcon,
    ChartBarIcon,
    LinkIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const SEOPage: React.FC = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CarRental",
        "name": "Vision Wan Car Hire Services",
        "description": "Premium car hire and short-stay accommodation in Nairobi, Kenya. Luxury SUVs, executive sedans, and furnished apartments.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kilimani, Equity Building 1st Floor, Opposite Yaya Centre",
            "addressLocality": "Nairobi",
            "addressRegion": "Nairobi County",
            "addressCountry": "KE"
        },
        "telephone": "+254705336311",
        "openingHours": "Mo-Su 00:00-23:59",
        "priceRange": "$$",
        "image": "https://visionwanservices.com/images/logo.png",
        "areaServed": [
            "Nairobi", "Kilimani", "Westlands", "Karen", "Lavington",
            "Parklands", "Upper Hill", "JKIA", "Wilson Airport"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Car Hire Services",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airport Car Rental" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Luxury SUV Rental" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Car Hire" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Self-Drive Car Rental" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chauffeur Services" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Long-term Car Lease" } }
            ]
        }
    };

    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What types of cars can I hire from Vision Wan?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer Toyota Prado, Range Rover, Toyota Harrier, Toyota Fielder, Mazda CX-5, Lexus RX, and other premium vehicles for hire in Nairobi and across Kenya."
                }
            },
            {
                "@type": "Question",
                "name": "Do you offer airport car rental in Nairobi?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide airport car rental at Jomo Kenyatta International Airport (JKIA) and Wilson Airport with convenient pickup and drop-off options."
                }
            },
            {
                "@type": "Question",
                "name": "Can I rent a car for a month or longer in Nairobi?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We offer monthly car rental and long-term car lease options in Nairobi with flexible terms for corporate clients and extended stays."
                }
            },
            {
                "@type": "Question",
                "name": "Is roadside assistance included?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all rentals include 24/7 roadside assistance and basic insurance across Kenya."
                }
            },
            {
                "@type": "Question",
                "name": "Which areas in Kenya do you serve?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We serve Nairobi and surrounding areas including Kilimani, Westlands, Karen, Lavington, Parklands, Upper Hill, JKIA, and Wilson Airport. We also arrange vehicle delivery to other parts of Kenya on request."
                }
            }
        ]
    };

    const serviceAreas = [
        'Kilimani', 'Westlands', 'Karen', 'Lavington', 'Parklands',
        'Upper Hill', 'JKIA', 'Wilson Airport', 'Nairobi CBD', 'Gigiri'
    ];

    const vehicleTypes = [
        'Toyota Prado', 'Range Rover', 'Toyota Harrier', 'Toyota Fielder',
        'Mazda CX-5', 'Lexus RX', 'Executive Sedans', '7-Seater SUVs',
        'Self-Drive Vehicles', 'Chauffeur-Driven Cars'
    ];

    const services = [
        'Airport Car Rental', 'Corporate Car Hire', 'Luxury SUV Rental',
        'Self-Drive Car Rental', 'Chauffeur Services', 'Long-term Car Lease',
        'Monthly Car Rental', 'Weekend Car Hire', 'Vehicle Delivery',
        'Short-Stay Accommodation'
    ];

    return (
        <>
            <Helmet>
                <title>Car Hire Nairobi | Luxury SUV Rental & Airport Transfers | Vision Wan</title>
                <meta
                    name="description"
                    content="Looking for car hire in Nairobi? Vision Wan offers luxury SUV rental, airport transfers at JKIA, self-drive cars, chauffeur services, and monthly car lease across Kenya. Based in Kilimani, opposite Yaya Centre."
                />
                <meta
                    name="keywords"
                    content="car hire Nairobi, car rental Kenya, luxury SUV rental Nairobi, airport car rental JKIA, self-drive car hire Nairobi, chauffeur services Kenya, monthly car rental Nairobi, Prado hire Nairobi, Range Rover rental Kenya"
                />
                <meta property="og:title" content="Car Hire Nairobi | Luxury SUV Rental | Vision Wan" />
                <meta
                    property="og:description"
                    content="Premium car hire in Nairobi — luxury SUVs, executive sedans, airport transfers, and chauffeur services. Based in Kilimani, opposite Yaya Centre."
                />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
                <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Car Hire Nairobi — Luxury SUV Rental & Airport Transfers
                    </h1>
                    <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                        Vision Wan Car Hire offers premium vehicle rental in Nairobi, Kenya — including Toyota Prado, Range Rover, Harrier, and executive sedans. Perfect for corporate car hire, airport transfers at JKIA, self-drive adventures, and long-term car lease.
                    </p>
                </div>

                {/* SEO Content */}
                <div className="prose prose-lg max-w-none mb-16">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <MagnifyingGlassIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Premium Car Hire in Nairobi, Kenya
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Welcome to <strong>Vision Wan Car Hire Services</strong>, your trusted partner for <strong>car hire in Nairobi</strong>, <strong>luxury SUV rental</strong>, and <strong>premium vehicle rental</strong> across Kenya. Based in Kilimani, opposite Yaya Centre, we deliver exceptional service, competitive rates, and a meticulously maintained fleet of vehicles.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Whether you need an <strong>airport car rental</strong> at JKIA for a quick business trip, a <strong>family car hire</strong> for a weekend getaway, or a <strong>chauffeur-driven Range Rover</strong> for a special occasion, we have the perfect vehicle for you. Our <strong>corporate car hire</strong> services are designed for professionals who value comfort, style, and reliability.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <ChartBarIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Our Vehicle Fleet: Prado, Range Rover, Harrier & More
                        </h2>
                        <p className="text-gray-700 mb-4">
                            At Vision Wan Car Hire, we maintain an extensive fleet of <strong>premium vehicles in Nairobi</strong> including:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                            {vehicleTypes.map((type, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                    {type}
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-700">
                            Each vehicle undergoes regular maintenance and thorough cleaning to ensure optimal performance and comfort. Our fleet includes the latest models from top manufacturers, equipped with advanced safety features and luxury amenities. Looking for a <strong>Toyota Prado for hire in Nairobi</strong> or a <strong>Range Rover rental in Kenya</strong>? We have you covered.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <GlobeAltIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Car Hire Service Areas Across Nairobi
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We provide <strong>car hire services in Nairobi and surrounding areas</strong>, including:
                        </p>
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {serviceAreas.map((area, index) => (
                                    <div key={index} className="text-gray-700">
                                        {area}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-700">
                            With convenient pickup and drop-off options including <strong>JKIA</strong>, <strong>Wilson Airport</strong>, and our Kilimani office, we make car hire in Nairobi simple and stress-free. We also arrange vehicle delivery to other parts of Kenya on request.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <DocumentTextIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Comprehensive Car Hire Services in Nairobi
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Car Hire Services:</h3>
                                <ul className="space-y-3">
                                    {services.slice(0, 5).map((service, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Rental Options:</h3>
                                <ul className="space-y-3">
                                    {services.slice(5, 10).map((service, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            We offer flexible rental terms including daily, weekly, and <strong>monthly car rental</strong> rates in Nairobi. All rentals include basic insurance, 24/7 roadside assistance, and unlimited mileage (unless otherwise specified). Our <strong>long-term car lease</strong> options are ideal for corporate clients and extended stays in Kenya.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <DevicePhoneMobileIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Why Choose Vision Wan for Car Hire in Nairobi?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                            {[
                                {
                                    title: 'Premium Fleet',
                                    description: 'Prado, Range Rover, Harrier, Fielder — regularly maintained and ready'
                                },
                                {
                                    title: '24/7 Support',
                                    description: 'Round-the-clock customer service and roadside assistance in Kenya'
                                },
                                {
                                    title: 'Best Rates',
                                    description: 'Competitive pricing with transparent, no-hidden-fees policy'
                                },
                                {
                                    title: 'Nairobi Coverage',
                                    description: 'Serving Kilimani, Westlands, Karen, JKIA, and all of Nairobi'
                                },
                                {
                                    title: 'Easy Booking',
                                    description: 'Simple online booking process with instant confirmation'
                                },
                                {
                                    title: 'Flexible Options',
                                    description: 'Self-drive, chauffeur-driven, and long-term lease options'
                                }
                            ].map((feature, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Contact & Booking Information
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Booking with Vision Wan Car Hire in Nairobi is simple and convenient. You can reserve your vehicle through our website, by phone, or by visiting our office. We offer:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                            <li><strong>Online Booking:</strong> Reserve your vehicle in minutes</li>
                            <li><strong>Phone Reservations:</strong> Call +254 705 336 311 for assistance</li>
                            <li><strong>WhatsApp:</strong> Chat with us at +44 7397 549 590</li>
                            <li><strong>In-Person:</strong> Visit our office at Kilimani, Equity Building 1st Floor, Opposite Yaya Centre</li>
                        </ul>
                        <div className="bg-primary-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Get Started Today
                            </h3>
                            <p className="text-gray-700 mb-6">
                                Experience the difference with Vision Wan Car Hire in Nairobi. Whether you need a <strong>Toyota Prado for a safari</strong>, a <strong>Range Rover for a corporate event</strong>, or a <strong>Fielder for everyday driving</strong>, we have the perfect vehicle for you.
                            </p>
                            <Link
                                to="/booking"
                                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                            >
                                Book Your Vehicle Now
                            </Link>
                        </div>
                    </section>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Frequently Asked Questions About Car Hire in Nairobi
                    </h3>
                    <div className="space-y-6">
                        {faqStructuredData.mainEntity.map((faq, index) => (
                            <div key={index}>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    {faq.name}
                                </h4>
                                <p className="text-gray-700">
                                    {faq.acceptedAnswer.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Keywords Section */}
                <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <LinkIcon className="h-6 w-6 mr-3 text-primary-600" />
                        Related Search Terms
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {[
                            'car hire Nairobi',
                            'car rental Kenya',
                            'luxury SUV rental Nairobi',
                            'airport car rental JKIA',
                            'self-drive car hire Nairobi',
                            'chauffeur services Nairobi',
                            'monthly car rental Nairobi',
                            'Prado hire Nairobi',
                            'Range Rover rental Kenya',
                            'corporate car hire Nairobi',
                            'car hire Kilimani',
                            'vehicle lease Kenya',
                            'Toyota Harrier hire Nairobi',
                            'executive car rental Kenya',
                            'long term car hire Nairobi'
                        ].map((term, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm hover:shadow-sm transition-shadow"
                            >
                                {term}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Location Information */}
                <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-2xl p-12 text-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">
                                Car Hire Services in Nairobi, Kenya
                            </h3>
                            <p className="text-primary-100 mb-6">
                                Serving customers across Nairobi and surrounding areas with premium vehicles and exceptional service.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Head Office</h4>
                                    <p className="text-primary-200">
                                        Kilimani, Equity Building 1st Floor,<br />
                                        Opposite Yaya Centre,<br />
                                        Nairobi, Kenya — Arwings Kodhek Road
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Contact</h4>
                                    <p className="text-primary-200">Phone: +254 705 336 311</p>
                                    <p className="text-primary-200">WhatsApp: +44 7397 549 590</p>
                                    <p className="text-primary-200">Email: visionwanservices@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Popular Pickup Locations</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {serviceAreas.slice(0, 6).map((location, index) => (
                                    <div key={index} className="text-primary-200">
                                        {location}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors"
                    >
                        Contact Us for Custom Quotes
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SEOPage;