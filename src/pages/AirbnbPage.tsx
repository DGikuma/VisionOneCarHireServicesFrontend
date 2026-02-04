import * as React from 'react';
import { useState } from 'react';
import {
    HomeIcon,
    StarIcon,
    MapPinIcon,
    UsersIcon,
    FireIcon,
    TvIcon,
    HeartIcon,
    PhoneIcon,
    EnvelopeIcon,
    CheckIcon,
    SparklesIcon,
    ShieldCheckIcon,
    FilmIcon,
    SunIcon as HeroSunIcon,
    BuildingOfficeIcon as HeroBuildingOfficeIcon,
    GlobeAltIcon as HeroGlobeAltIcon,
    HomeModernIcon as HeroHomeModernIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, StarIcon as SolidStar } from '@heroicons/react/24/solid';

interface AirbnbProperty {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    reviews: number;
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    images: string[];
    amenities: string[];
    type: string;
    superhost: boolean;
    instantBook: boolean;
    description: string;
    distanceFromCity: string;
}

const AirbnbPage: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>('all');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [sortBy, setSortBy] = useState<string>('popular');
    const [selectedProperty, setSelectedProperty] = useState<AirbnbProperty | null>(null);

    const properties: AirbnbProperty[] = [
        {
            id: '1',
            title: 'Modern Luxury Villa with Pool',
            location: 'Karen, Nairobi',
            price: 45000,
            rating: 4.9,
            reviews: 128,
            guests: 8,
            bedrooms: 4,
            beds: 5,
            bathrooms: 3,
            images: [
                '/assets/airbnb/villa1.jpg',
                '/assets/airbnb/villa2.jpg',
                '/assets/airbnb/villa3.jpg'
            ],
            amenities: ['Pool', 'WiFi', 'Kitchen', 'Parking', 'AC', 'TV', 'Gym'],
            type: 'Villa',
            superhost: true,
            instantBook: true,
            description: 'Stunning modern villa with panoramic views, private pool, and luxury amenities in exclusive Karen neighborhood.',
            distanceFromCity: '20 min from city center'
        },
        {
            id: '2',
            title: 'Lakefront Cottage Retreat',
            location: 'Naivasha',
            price: 25000,
            rating: 4.8,
            reviews: 96,
            guests: 6,
            bedrooms: 3,
            beds: 4,
            bathrooms: 2,
            images: [
                '/assets/airbnb/cottage1.jpg',
                '/assets/airbnb/cottage2.jpg',
                '/assets/airbnb/cottage3.jpg'
            ],
            amenities: ['Lake View', 'WiFi', 'Kitchen', 'Fireplace', 'BBQ', 'Garden'],
            type: 'Cottage',
            superhost: true,
            instantBook: true,
            description: 'Charming lakefront cottage with stunning views, perfect for family getaways and romantic retreats.',
            distanceFromCity: '1.5 hours from Nairobi'
        },
        {
            id: '3',
            title: 'Luxury Apartment in Westlands',
            location: 'Westlands, Nairobi',
            price: 18000,
            rating: 4.7,
            reviews: 84,
            guests: 4,
            bedrooms: 2,
            beds: 2,
            bathrooms: 2,
            images: [
                '/assets/airbnb/apartment1.jpg',
                '/assets/airbnb/apartment2.jpg',
                '/assets/airbnb/apartment3.jpg'
            ],
            amenities: ['City View', 'WiFi', 'Gym', 'Pool', 'Parking', 'Concierge'],
            type: 'Apartment',
            superhost: false,
            instantBook: true,
            description: 'Modern luxury apartment in the heart of Westlands with premium amenities and city skyline views.',
            distanceFromCity: '10 min from city center'
        },
        {
            id: '4',
            title: 'Beach House Malindi',
            location: 'Malindi Coast',
            price: 35000,
            rating: 4.9,
            reviews: 142,
            guests: 10,
            bedrooms: 5,
            beds: 6,
            bathrooms: 4,
            images: [
                '/assets/airbnb/beach1.jpg',
                '/assets/airbnb/beach2.jpg',
                '/assets/airbnb/beach3.jpg'
            ],
            amenities: ['Beachfront', 'Private Pool', 'WiFi', 'Chef', 'Garden', 'BBQ'],
            type: 'Beach House',
            superhost: true,
            instantBook: false,
            description: 'Exclusive beachfront villa with direct beach access, private pool, and staff including chef and housekeeper.',
            distanceFromCity: '1 hour from Malindi Airport'
        },
        {
            id: '5',
            title: 'Mountain View Cabin',
            location: 'Mount Kenya Region',
            price: 22000,
            rating: 4.6,
            reviews: 67,
            guests: 4,
            bedrooms: 2,
            beds: 3,
            bathrooms: 2,
            images: [
                '/assets/airbnb/cabin1.jpg',
                '/assets/airbnb/cabin2.jpg',
                '/assets/airbnb/cabin3.jpg'
            ],
            amenities: ['Mountain View', 'Fireplace', 'WiFi', 'Hot Tub', 'Hiking Trails'],
            type: 'Cabin',
            superhost: true,
            instantBook: true,
            description: 'Cozy mountain cabin with breathtaking views, perfect for nature lovers and adventure seekers.',
            distanceFromCity: '3 hours from Nairobi'
        },
        {
            id: '6',
            title: 'Executive Penthouse',
            location: 'Kilimani, Nairobi',
            price: 52000,
            rating: 4.9,
            reviews: 156,
            guests: 6,
            bedrooms: 3,
            beds: 4,
            bathrooms: 3,
            images: [
                '/assets/airbnb/penthouse1.jpg',
                '/assets/airbnb/penthouse2.jpg',
                '/assets/airbnb/penthouse3.jpg'
            ],
            amenities: ['Rooftop Pool', 'WiFi', 'Gym', 'Concierge', 'Valet', 'Cinema Room'],
            type: 'Penthouse',
            superhost: true,
            instantBook: true,
            description: 'Luxury penthouse with rooftop pool, panoramic city views, and premium executive services.',
            distanceFromCity: '15 min from city center'
        },
        {
            id: '7',
            title: 'Safari Lodge Experience',
            location: 'Masai Mara',
            price: 65000,
            rating: 4.9,
            reviews: 189,
            guests: 12,
            bedrooms: 6,
            beds: 8,
            bathrooms: 6,
            images: [
                '/assets/airbnb/lodge1.jpg',
                '/assets/airbnb/lodge2.jpg',
                '/assets/airbnb/lodge3.jpg'
            ],
            amenities: ['Game Drives', 'Pool', 'Spa', 'WiFi', 'Guide', 'Bush Dinner'],
            type: 'Lodge',
            superhost: true,
            instantBook: false,
            description: 'Luxury safari lodge with game drives included, spa services, and authentic bush experiences.',
            distanceFromCity: '5 hours from Nairobi'
        },
        {
            id: '8',
            title: 'City Center Loft',
            location: 'CBD, Nairobi',
            price: 15000,
            rating: 4.5,
            reviews: 72,
            guests: 2,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            images: [
                '/assets/airbnb/loft1.jpg',
                '/assets/airbnb/loft2.jpg',
                '/assets/airbnb/loft3.jpg'
            ],
            amenities: ['City Center', 'WiFi', 'Workspace', 'Netflix', 'Laundry'],
            type: 'Loft',
            superhost: false,
            instantBook: true,
            description: 'Modern industrial-style loft in the heart of the city, perfect for business travelers and couples.',
            distanceFromCity: 'In city center'
        }
    ];

    // Custom icon components for property types
    const PropertyTypeIcon = ({ name }: { name: string }) => {
        switch (name) {
            case 'Villa':
                return <SparklesIcon className="h-4 w-4" />;
            case 'Apartment':
                return <HeroBuildingOfficeIcon className="h-4 w-4" />;
            case 'Cottage':
                return <HomeIcon className="h-4 w-4" />;
            case 'Beach House':
                return <HeroSunIcon className="h-4 w-4" />;
            case 'Cabin':
                return <FireIcon className="h-4 w-4" />;
            case 'Penthouse':
                return <HeroBuildingOfficeIcon className="h-4 w-4" />;
            case 'Lodge':
                return <HeroGlobeAltIcon className="h-4 w-4" />;
            case 'Loft':
                return <HeroHomeModernIcon className="h-4 w-4" />;
            default:
                return <HomeIcon className="h-4 w-4" />;
        }
    };

    const propertyTypes = [
        { name: 'All', count: properties.length },
        { name: 'Villa', count: properties.filter(p => p.type === 'Villa').length },
        { name: 'Apartment', count: properties.filter(p => p.type === 'Apartment').length },
        { name: 'Cottage', count: properties.filter(p => p.type === 'Cottage').length },
        { name: 'Beach House', count: properties.filter(p => p.type === 'Beach House').length },
        { name: 'Cabin', count: properties.filter(p => p.type === 'Cabin').length },
        { name: 'Penthouse', count: properties.filter(p => p.type === 'Penthouse').length },
        { name: 'Lodge', count: properties.filter(p => p.type === 'Lodge').length },
        { name: 'Loft', count: properties.filter(p => p.type === 'Loft').length }
    ];

    const filteredProperties = selectedType === 'all'
        ? properties
        : properties.filter(property => property.type === selectedType);

    const sortedProperties = [...filteredProperties].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'guests':
                return b.guests - a.guests;
            case 'popular':
                return b.reviews - a.reviews;
            default:
                return 0;
        }
    });

    const toggleFavorite = (id: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    const handleEmailEnquiry = (property: AirbnbProperty) => {
        const subject = encodeURIComponent(`Enquiry: ${property.title}`);
        const body = encodeURIComponent(
            `Dear Vision One Properties,\n\nI am interested in booking "${property.title}" in ${property.location}.\n\nPlease provide me with more information regarding:\n\n1. Available dates\n2. Booking requirements\n3. Payment terms\n4. House rules\n\nThank you,\n[Your Name]`
        );
        window.open(`mailto:vison1servicesltd@gmail.com?subject=${subject}&body=${body}`);
    };

    const handleCallBooking = () => {
        window.open('tel:+254705336311');
    };

    const openPropertyModal = (property: AirbnbProperty) => {
        setSelectedProperty(property);
    };

    const closePropertyModal = () => {
        setSelectedProperty(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FF385C] via-[#FF5A5F] to-[#FF5A5F] py-16 md:py-24">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
                            <HomeIcon className="h-4 w-4 text-white" />
                            <span className="text-sm font-semibold text-white">PREMIUM PROPERTIES</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                                Exclusive Airbnb Properties
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
                            Discover handpicked luxury homes, villas, and unique stays managed by Vision One.
                            Experience exceptional comfort and premium service at every property.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <span className="text-2xl font-bold text-white">8+</span>
                                <p className="text-sm text-white/80">Premium Properties</p>
                            </div>
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <span className="text-2xl font-bold text-white">4.8★</span>
                                <p className="text-sm text-white/80">Guest Rating</p>
                            </div>
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <span className="text-2xl font-bold text-white">24/7</span>
                                <p className="text-sm text-white/80">Property Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Controls */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        {/* Property Type Filter */}
                        <div className="w-full lg:w-auto overflow-x-auto">
                            <div className="flex items-center gap-2 mb-3">
                                <FilmIcon className="h-5 w-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Property Type</h2>
                            </div>
                            <div className="flex gap-2 pb-2">
                                {propertyTypes.map((type) => (
                                    <button
                                        key={type.name}
                                        onClick={() => setSelectedType(type.name === 'All' ? 'all' : type.name)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${selectedType === (type.name === 'All' ? 'all' : type.name)
                                            ? 'bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/20'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        <PropertyTypeIcon name={type.name} />
                                        <span>{type.name}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${selectedType === (type.name === 'All' ? 'all' : type.name)
                                            ? 'bg-white/20'
                                            : 'bg-gray-100'
                                            }`}>
                                            {type.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort Controls */}
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 w-full lg:w-auto">
                            <div className="flex items-center gap-2">
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                <span className="font-medium text-gray-700">Sort by:</span>
                            </div>
                            <div className="relative group">
                                <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mb-2">
                                    Sort By
                                </label>
                                <div className="relative">
                                    <select
                                        id="sort-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 font-medium focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none appearance-none pr-12 group-hover:border-gray-300"
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="guests">Most Guests</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:text-[#FF6B35] group-focus-within:rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {sortedProperties.map((property) => (
                        <div
                            key={property.id}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 transform hover:-translate-y-2"
                        >
                            {/* Favorite Button */}
                            <button
                                onClick={() => toggleFavorite(property.id)}
                                className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
                                aria-label="Add to favorites"
                            >
                                {favorites.has(property.id) ? (
                                    <HeartSolid className="h-6 w-6 text-red-500" />
                                ) : (
                                    <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
                                )}
                            </button>

                            {/* Superhost Badge */}
                            {property.superhost && (
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1.5 bg-gradient-to-r from-[#FF385C] to-[#FF5A5F] text-white text-xs font-bold rounded-full shadow-lg">
                                        SUPERHOST
                                    </span>
                                </div>
                            )}

                            {/* Instant Book Badge */}
                            {property.instantBook && (
                                <div className="absolute top-16 left-4 z-20">
                                    <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                                        INSTANT BOOK
                                    </span>
                                </div>
                            )}

                            {/* Image Carousel */}
                            <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => openPropertyModal(property)}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Image Counter */}
                                <div className="absolute bottom-4 right-4 z-20">
                                    <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                        {property.images.length} photos
                                    </span>
                                </div>

                                {/* Price Overlay */}
                                <div className="absolute bottom-4 left-4 z-20">
                                    <div className="text-white">
                                        <p className="text-2xl font-bold drop-shadow-lg">
                                            KES {property.price.toLocaleString()}
                                            <span className="text-sm font-normal"> / night</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Title & Location */}
                                <div className="mb-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF385C] transition-colors duration-300 line-clamp-1">
                                            {property.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-3">
                                        <MapPinIcon className="h-4 w-4 mr-1.5" />
                                        <span className="text-sm">{property.location}</span>
                                        <span className="mx-2">•</span>
                                        <span className="text-sm">{property.distanceFromCity}</span>
                                    </div>
                                </div>

                                {/* Rating & Reviews */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            <SolidStar className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span className="ml-1 font-bold text-gray-900">{property.rating}</span>
                                        </div>
                                        <span className="text-gray-500 text-sm">
                                            ({property.reviews} reviews)
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {property.type}
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <UsersIcon className="h-4 w-4 text-gray-500" />
                                            <p className="text-xs text-gray-500">Guests</p>
                                        </div>
                                        <p className="font-bold text-gray-900 text-lg">{property.guests}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <HomeIcon className="h-4 w-4 text-gray-500" />
                                            <p className="text-xs text-gray-500">Bedrooms</p>
                                        </div>
                                        <p className="font-bold text-gray-900 text-lg">{property.bedrooms}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <FireIcon className="h-4 w-4 text-gray-500" />
                                            <p className="text-xs text-gray-500">Bathrooms</p>
                                        </div>
                                        <p className="font-bold text-gray-900 text-lg">{property.bathrooms}</p>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <SparklesIcon className="h-4 w-4 text-[#FF385C]" />
                                        Top Amenities
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {property.amenities.slice(0, 3).map((amenity, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                        {property.amenities.length > 3 && (
                                            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                                +{property.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEmailEnquiry(property)}
                                        className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#FF385C] to-[#FF5A5F] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF385C]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        <EnvelopeIcon className="h-5 w-5 mr-2" />
                                        <span>Enquire</span>
                                    </button>
                                    <button
                                        onClick={handleCallBooking}
                                        className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        <PhoneIcon className="h-5 w-5 mr-2" />
                                        <span>Call Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Property Management Services */}
                <div className="mt-16 lg:mt-24">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF385C]/10 rounded-full mb-4">
                            <ShieldCheckIcon className="h-4 w-4 text-[#FF385C]" />
                            <span className="text-sm font-semibold text-[#FF385C]">PROPERTY MANAGEMENT</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Premium Property Management
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Let us manage your property and maximize your rental income with our professional services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                            <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-6">
                                <HomeIcon className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Full-Service Management</h3>
                            <p className="text-gray-600 mb-6">
                                Comprehensive property management including guest coordination, cleaning, maintenance, and 24/7 support.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Guest screening & communication</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Professional cleaning services</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Regular maintenance & repairs</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                            <div className="inline-flex p-4 bg-green-100 rounded-2xl mb-6">
                                <TvIcon className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Revenue Optimization</h3>
                            <p className="text-gray-600 mb-6">
                                Dynamic pricing strategies and marketing to maximize your rental income and occupancy rates.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Dynamic pricing algorithms</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Multi-platform listing management</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Professional photography & staging</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                            <div className="inline-flex p-4 bg-purple-100 rounded-2xl mb-6">
                                <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Support</h3>
                            <p className="text-gray-600 mb-6">
                                24/7 guest support and premium concierge services for both property owners and guests.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>24/7 guest support hotline</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Premium concierge services</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Regular performance reports</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 lg:mt-24 relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF385C] via-[#FF5A5F] to-[#FF5A5F]" />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    <div className="relative px-6 lg:px-8 py-12 lg:py-16 text-center">
                        <div className="max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                                <HomeIcon className="h-4 w-4 text-white" />
                                <span className="text-sm font-semibold text-white">LIST YOUR PROPERTY</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                Earn More with Vision One
                            </h2>

                            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                                Join our network of premium property owners and let us maximize your rental income
                                with professional management and premium guest services.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleCallBooking}
                                    className="px-8 py-3.5 bg-white text-[#FF385C] font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
                                >
                                    <PhoneIcon className="h-5 w-5 mr-3" />
                                    <span>Call: +254 705 336 311</span>
                                </button>
                                <button
                                    onClick={() => handleEmailEnquiry(properties[0])}
                                    className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                                >
                                    <EnvelopeIcon className="h-5 w-5 mr-3" />
                                    <span>Email Enquiry</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Modal */}
            {selectedProperty && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" onClick={closePropertyModal} />
                        </div>

                        {/* Modal content */}
                        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="bg-white">
                                {/* Modal header */}
                                <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="text-2xl font-bold text-gray-900">{selectedProperty.title}</h3>
                                    <button
                                        onClick={closePropertyModal}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <span className="sr-only">Close</span>
                                        <span className="text-2xl">×</span>
                                    </button>
                                </div>

                                {/* Modal body */}
                                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                                    {/* Images */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {selectedProperty.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`${selectedProperty.title} - View ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-xl"
                                            />
                                        ))}
                                    </div>

                                    {/* Property details */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Guests</p>
                                            <p className="text-2xl font-bold text-gray-900">{selectedProperty.guests}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Bedrooms</p>
                                            <p className="text-2xl font-bold text-gray-900">{selectedProperty.bedrooms}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Beds</p>
                                            <p className="text-2xl font-bold text-gray-900">{selectedProperty.beds}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Bathrooms</p>
                                            <p className="text-2xl font-bold text-gray-900">{selectedProperty.bathrooms}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-6">
                                        <h4 className="text-lg font-bold text-gray-900 mb-3">Description</h4>
                                        <p className="text-gray-600">{selectedProperty.description}</p>
                                    </div>

                                    {/* Amenities */}
                                    <div className="mb-6">
                                        <h4 className="text-lg font-bold text-gray-900 mb-3">Amenities</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {selectedProperty.amenities.map((amenity, index) => (
                                                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                    <CheckIcon className="h-4 w-4 text-green-500" />
                                                    <span className="text-gray-700">{amenity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Booking info */}
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                        <h4 className="font-bold text-blue-900 mb-2">Booking Information</h4>
                                        <ul className="space-y-2 text-blue-800">
                                            <li className="flex items-center gap-2">
                                                <span className="font-semibold">Price:</span>
                                                <span>KES {selectedProperty.price.toLocaleString()} per night</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="font-semibold">Location:</span>
                                                <span>{selectedProperty.location}</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="font-semibold">Distance:</span>
                                                <span>{selectedProperty.distanceFromCity}</span>
                                            </li>
                                            {selectedProperty.superhost && (
                                                <li className="flex items-center gap-2">
                                                    <span className="font-semibold">Host Status:</span>
                                                    <span className="px-2 py-1 bg-[#FF385C] text-white text-xs font-bold rounded-full">SUPERHOST</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                {/* Modal footer */}
                                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                KES {selectedProperty.price.toLocaleString()}
                                                <span className="text-sm font-normal text-gray-600"> / night</span>
                                            </p>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                                                <span>{selectedProperty.rating} • ({selectedProperty.reviews} reviews)</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEmailEnquiry(selectedProperty)}
                                                className="px-6 py-3 bg-gradient-to-r from-[#FF385C] to-[#FF5A5F] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF385C]/20 transition-all duration-300"
                                            >
                                                Send Enquiry
                                            </button>
                                            <button
                                                onClick={handleCallBooking}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                                            >
                                                Call to Book
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AirbnbPage;