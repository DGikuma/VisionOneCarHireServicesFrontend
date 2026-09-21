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
                    "text": "We offer luxury sedans, SUVs, electric vehicles, sports cars, convertibles, minivans, pickup trucks, luxury coupes, executive sedans, and premium wagons."
                }
            },
            {
                "@type": "Question",
                "name": "Do you offer airport car rental services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide airport car rental at major US airports with convenient pickup and drop-off options."
                }
            },
            {
                "@type": "Question",
                "name": "Can I rent a car for a month or longer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We offer monthly car rental and long-term car lease options with flexible terms."
                }
            },
            {
                "@type": "Question",
                "name": "Is roadside assistance included?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all rentals include 24/7 roadside assistance and basic insurance."
                }
            },
            {
                "@type": "Question",
                "name": "Which cities do you serve?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We serve New York City, Los Angeles, Chicago, Miami, Las Vegas, San Francisco, Boston, Washington DC, Dallas, Houston, Atlanta, Phoenix, Philadelphia, Seattle, and Denver."
                }
            }
        ]
    };

    const serviceAreas = [
        'New York City', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas',
        'San Francisco', 'Boston', 'Washington DC', 'Dallas', 'Houston',
        'Atlanta', 'Phoenix', 'Philadelphia', 'Seattle', 'Denver'
    ];

    const vehicleTypes = [
        'Luxury Sedans', 'SUVs', 'Electric Vehicles', 'Sports Cars',
        'Convertibles', 'Minivans', 'Pickup Trucks', 'Luxury Coupes',
        'Executive Sedans', 'Premium Wagons'
    ];

    const services = [
        'Airport Car Rental', 'Business Car Rental', 'Luxury Car Hire',
        'SUV Rental', 'Electric Car Rental', 'Convertible Rental',
        'Van Rental', 'Monthly Car Rental', 'Weekend Car Hire',
        'Long-term Car Lease'
    ];

    return (
        <>
            <Helmet>
                <title>Luxury Car Hire & SUV Rental | Airport Car Rental | Vision Wan</title>
                <meta
                    name="description"
                    content="Looking for luxury car hire, SUV rental, or airport car rental? Vision Wan offers premium vehicle rental, electric car hire, monthly car rental, and 24/7 support across 50+ US cities."
                />
                <meta
                    name="keywords"
                    content="luxury car hire, SUV rental, airport car rental, electric car rental, business car hire, monthly car rental, convertible rental, premium vehicle rental, family car hire, long-term car lease"
                />
                <meta property="og:title" content="Luxury Car Hire & SUV Rental | Vision Wan Car Hire" />
                <meta
                    property="og:description"
                    content="Premium car hire with luxury vehicles, SUVs, electric cars, and family vehicles. Best rates, 24/7 support, nationwide locations."
                />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
                <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Luxury Car Hire, SUV Rental & Airport Car Rental Services
                    </h1>
                    <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                        Vision Wan Car Hire offers premium vehicle rental including luxury sedans, SUVs, electric cars, and family vehicles. Perfect for business car hire, weekend getaways, airport transfers, and long-term car lease across the United States.
                    </p>
                </div>

                {/* SEO Content */}
                <div className="prose prose-lg max-w-none mb-16">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <MagnifyingGlassIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Premium Car Hire & Luxury Vehicle Rental
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Welcome to <strong>Vision Wan Car Hire Services</strong>, your trusted partner for <strong>luxury car hire</strong>, <strong>SUV rental</strong>, and <strong>premium vehicle rental</strong>. With over a decade of experience in the car rental industry, we deliver exceptional service, competitive rates, and a meticulously maintained fleet of vehicles.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Whether you need an <strong>airport car rental</strong> for a quick business trip, a <strong>family car hire</strong> for a vacation, or a <strong>convertible rental</strong> for a special occasion, we have the perfect vehicle for you. Our <strong>business car rental</strong> services are designed for professionals who value comfort, style, and reliability.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <ChartBarIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Our Vehicle Fleet: SUVs, Electric Cars & More
                        </h2>
                        <p className="text-gray-700 mb-4">
                            At Vision Wan Car Hire, we maintain an extensive fleet of <strong>premium vehicles</strong> including:
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
                            Each vehicle undergoes regular maintenance and thorough cleaning to ensure optimal performance and comfort. Our fleet includes the latest models from top manufacturers, equipped with advanced safety features and luxury amenities. Looking for an <strong>electric car rental</strong> or a <strong>luxury SUV rental</strong>? We have you covered.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <GlobeAltIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Car Hire Service Areas Across the USA
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We provide <strong>car hire services in major cities</strong> across the United States:
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
                            With <strong>50+ locations nationwide</strong>, we offer convenient pickup and drop-off options including major airports, city centers, and suburban locations. Our <strong>airport car rental</strong> service is available at all major US airports.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <DocumentTextIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Comprehensive Car Hire Services
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
                            We offer flexible rental terms including daily, weekly, and <strong>monthly car rental</strong> rates. All rentals include basic insurance, 24/7 roadside assistance, and unlimited mileage (unless otherwise specified). Our <strong>long-term car lease</strong> options are ideal for corporate clients and extended stays.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <DevicePhoneMobileIcon className="h-8 w-8 mr-3 text-primary-600" />
                            Why Choose Vision Wan for Car Hire?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                            {[
                                {
                                    title: 'Premium Fleet',
                                    description: 'Regularly maintained luxury vehicles with latest features'
                                },
                                {
                                    title: '24/7 Support',
                                    description: 'Round-the-clock customer service and roadside assistance'
                                },
                                {
                                    title: 'Best Rates',
                                    description: 'Competitive pricing with transparent, no-hidden-fees policy'
                                },
                                {
                                    title: 'Nationwide Coverage',
                                    description: 'Extensive network of locations across the United States'
                                },
                                {
                                    title: 'Easy Booking',
                                    description: 'Simple online booking process with instant confirmation'
                                },
                                {
                                    title: 'Flexible Options',
                                    description: 'Wide range of vehicles and rental terms to suit every need'
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
                            Booking with Vision Wan Car Hire is simple and convenient. You can reserve your vehicle through our website, mobile app, or by calling our customer service team. We offer:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                            <li><strong>Online Booking:</strong> Reserve your vehicle in minutes</li>
                            <li><strong>Mobile App:</strong> Book and manage rentals on the go</li>
                            <li><strong>Phone Reservations:</strong> Call (555) 123-4567 for assistance</li>
                            <li><strong>In-Person:</strong> Visit any of our 50+ locations</li>
                        </ul>
                        <div className="bg-primary-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Get Started Today
                            </h3>
                            <p className="text-gray-700 mb-6">
                                Experience the difference with Vision Wan Car Hire. Whether you need a <strong>luxury sedan for business</strong>, an <strong>SUV for family travel</strong>, or a <strong>convertible for a special occasion</strong>, we have the perfect vehicle for you.
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
                        Frequently Asked Questions About Car Hire
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
                            'luxury car rental near me',
                            'SUV rental services',
                            'electric car hire',
                            'premium vehicle rental',
                            'business car rental',
                            'family car hire',
                            'airport car rental',
                            'monthly car rental',
                            'convertible rental',
                            'luxury SUV rental',
                            'premium car hire',
                            'executive car rental',
                            'luxury vehicle hire',
                            'premium SUV rental',
                            'electric vehicle rental'
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
                                Nationwide Car Hire Services
                            </h3>
                            <p className="text-primary-100 mb-6">
                                Serving customers across all major US cities with premium vehicles and exceptional service.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Headquarters</h4>
                                    <p className="text-primary-200">123 Main Street, City, State 12345</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Contact</h4>
                                    <p className="text-primary-200">Phone: (555) 123-4567</p>
                                    <p className="text-primary-200">Email: info@visionwanservices.com</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Popular Locations</h4>
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