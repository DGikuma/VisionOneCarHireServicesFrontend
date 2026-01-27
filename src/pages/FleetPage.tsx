import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FunnelIcon,
    CheckIcon,
    StarIcon,
    ShieldCheckIcon,
    BoltIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

type PriceRange = {
    '1-7': number;
    '8-20': number;
    '21+': number;
};

interface Car {
    id: string;
    name: string;
    category: string;
    image: string;
    price: PriceRange;
    seats: number;
    transmission: string;
    fuel: string;
    features: string[];
    rating: number;
    reviews: number;
    available: boolean;
    specialOffer?: boolean;
    popularity: number;
}

const FleetPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('popular');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    useEffect(() => {
        // Add subtle parallax effect on scroll
        const handleScroll = () => {
            const cards = document.querySelectorAll('.car-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = 0.3;
                    const yPos = -(rect.top * speed);
                    (card as HTMLElement).style.transform = `translateY(${yPos * 0.1}px)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [
        { name: 'All', count: 8 },
        { name: 'Luxury', count: 1 },
        { name: 'SUV', count: 4 },
        { name: 'Economy', count: 2 },
        { name: 'Premium', count: 1 },
        { name: 'Mid-Size', count: 0 },
        { name: 'Van', count: 0 }
    ];

    const cars: Car[] = [
        {
            id: '1',
            name: 'Toyota Fielder',
            category: 'Economy',
            image: '/assets/vehicles/fielder.jpeg',
            price: {
                '1-7': 4000,
                '8-20': 3500,
                '21+': 3000
            },
            seats: 5,
            transmission: 'Automatic',
            fuel: 'Petrol',
            features: ['Air Conditioning', 'Fuel Efficient', 'Spacious Boot'],
            rating: 4.4,
            reviews: 86,
            available: true,
            specialOffer: true,
            popularity: 85
        },
        {
            id: '3',
            name: 'Nissan Latio',
            category: 'Economy',
            image: '/assets/vehicles/latio.jpg',
            price: {
                '1-7': 3800,
                '8-20': 3300,
                '21+': 2800
            },
            seats: 5,
            transmission: 'Automatic',
            fuel: 'Petrol',
            features: [
                'Air Conditioning',
                'Fuel Efficient',
                'Comfortable Interior',
                'Compact & Easy to Drive'
            ],
            rating: 4.3,
            reviews: 74,
            available: true,
            specialOffer: true,
            popularity: 82
        },

        {
            id: '4',
            name: 'Mazda CX-5',
            category: 'SUV',
            image: '/assets/vehicles/mazdaCX5.jpg',
            price: {
                '1-7': 7000,
                '8-20': 6500,
                '21+': 6000
            },
            seats: 5,
            transmission: 'Automatic',
            fuel: 'Petrol',
            features: ['AWD', 'Reverse Camera', 'Cruise Control'],
            rating: 4.6,
            reviews: 102,
            available: true,
            specialOffer: true,
            popularity: 90
        },
        {
            id: '5',
            name: 'Toyota Harrier',
            category: 'SUV',
            image: '/assets/vehicles/harrier.jpg',
            price: {
                '1-7': 8000,
                '8-20': 7500,
                '21+': 7000
            },
            seats: 5,
            transmission: 'Automatic',
            fuel: 'Petrol',
            features: ['Luxury Interior', 'Push Start', 'Dual Zone Climate'],
            rating: 4.7,
            reviews: 118,
            available: true,
            specialOffer: true,
            popularity: 93
        },
        {
            id: '6',
            name: 'Lexus RX',
            category: 'Premium',
            image: '/assets/vehicles/lexus.jpg',
            price: {
                '1-7': 9000,
                '8-20': 8500,
                '21+': 8000
            },
            seats: 5,
            transmission: 'Automatic',
            fuel: 'Petrol',
            features: ['Leather Seats', 'Premium Sound', 'Sunroof'],
            rating: 4.8,
            reviews: 134,
            available: true,
            specialOffer: true,
            popularity: 95
        },
        {
            id: '7',
            name: 'Toyota Prado',
            category: 'SUV',
            image: '/assets/vehicles/prado.jpg',
            price: {
                '1-7': 12000,
                '8-20': 11000,
                '21+': 10000
            },
            seats: 7,
            transmission: 'Automatic',
            fuel: 'Diesel',
            features: ['4WD', 'Off-road Capability', 'Spacious Interior'],
            rating: 4.9,
            reviews: 160,
            available: true,
            specialOffer: true,
            popularity: 97
        },
        {
            id: '8',
            name: 'Range Rover SV Autobiography',
            category: 'Luxury',
            image: '/assets/vehicles/range-rover.jpg',
            price: {
                '1-7': 12000,
                '8-20': 11000,
                '21+': 10000
            },
            seats: 5,
            transmission: '8-Speed Auto',
            fuel: 'Diesel',
            features: [
                'SV Premium Package',
                'Executive Class Seating',
                'Meridian Signature Sound',
                'Terrain Response 2',
                'Gesture Sunblind'
            ],
            rating: 4.6,
            reviews: 76,
            available: true,
            specialOffer: true,
            popularity: 96
        },
        {
            id: '9',
            name: 'Mitsubishi Shogun',
            category: 'SUV',
            image: '/assets/vehicles/shogun.jpeg',
            price: {
                '1-7': 12000,
                '8-20': 11000,
                '21+': 10000
            },
            seats: 7,
            transmission: 'Automatic',
            fuel: 'Diesel',
            features: [
                '4WD Capability',
                'Spacious 7-Seater',
                'Off-Road Terrain Control',
                'Climate Control',
                'Premium Interior Finish'
            ],
            rating: 4.7,
            reviews: 89,
            available: true,
            specialOffer: true,
            popularity: 94
        }
    ];

    const filteredCars = selectedCategory === 'all'
        ? cars
        : cars.filter(car => car.category.toLowerCase() === selectedCategory.toLowerCase());

    const sortedCars = [...filteredCars].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price['1-7'] - b.price['1-7'];
            case 'price-high':
                return b.price['1-7'] - a.price['1-7'];
            case 'seats':
                return b.seats - a.seats;
            case 'rating':
                return b.rating - a.rating;
            case 'popular':
                return b.popularity - a.popularity;
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 py-12 md:py-20">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px h-px bg-[#FF6B35] rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.5}s`,
                                boxShadow: '0 0 20px 2px rgba(255, 107, 53, 0.5)'
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center mb-4 px-4 py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full border border-[#FF6B35]/20">

                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                            Executive Fleet
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed px-4">
                        Experience automotive excellence with our curated collection of premium vehicles,
                        meticulously maintained and ready for your next journey.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        <div className="px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 min-w-[120px]">
                            <span className="text-xl sm:text-2xl font-bold text-white">25+</span>
                            <p className="text-xs sm:text-sm text-gray-400">Premium Vehicles</p>
                        </div>
                        <div className="px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 min-w-[120px]">
                            <span className="text-xl sm:text-2xl font-bold text-white">4.8★</span>
                            <p className="text-xs sm:text-sm text-gray-400">Customer Rating</p>
                        </div>
                        <div className="px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 min-w-[120px]">
                            <span className="text-xl sm:text-2xl font-bold text-white">24/7</span>
                            <p className="text-xs sm:text-sm text-gray-400">Concierge Support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Controls */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
                        {/* Category Filter */}
                        <div className="w-full lg:w-auto overflow-x-auto pb-2">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3">
                                <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                                <h2 className="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">Filter by Category</h2>
                            </div>
                            <div className="flex flex-nowrap gap-1.5 sm:gap-2 pb-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.name}
                                        onClick={() => setSelectedCategory(category.name.toLowerCase())}
                                        className={`group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${selectedCategory === category.name.toLowerCase()
                                            ? 'bg-[#FF6B35] text-white shadow-md sm:shadow-lg shadow-[#FF6B35]/20'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        <span className="flex items-center gap-1.5 sm:gap-2">
                                            <span>{category.name}</span>
                                            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${selectedCategory === category.name.toLowerCase()
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                                }`}>
                                                {category.count}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort Controls */}
                        <div className="flex items-center gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 w-full lg:w-auto">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium text-sm sm:text-base focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all outline-none appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1rem] sm:bg-[length:1.25rem] pr-8 sm:pr-10"
                                style={{
                                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E\")"
                                }}
                                aria-label="Sort cars by"
                            >
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="seats">Most Seats</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fleet Grid */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {sortedCars.map((car) => (
                        <div
                            key={car.id}
                            className="car-card group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl sm:shadow-xl sm:hover:shadow-2xl transition-all duration-500 border border-gray-200 transform hover:-translate-y-1 sm:hover:-translate-y-2"
                        >
                            {/* Favorite Button */}
                            <button
                                onClick={() => toggleFavorite(car.id)}
                                className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 p-2 sm:p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300"
                                aria-label="Add to favorites"
                            >
                                {favorites.has(car.id) ? (
                                    <HeartSolid className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                                ) : (
                                    <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-red-500" />
                                )}
                            </button>

                            {/* Special Offer Badge */}
                            {car.specialOffer && (
                                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                                    <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white text-xs font-bold rounded-full shadow-md sm:shadow-lg">
                                        SPECIAL OFFER
                                    </span>
                                </div>
                            )}

                            {/* Image Container */}
                            <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Category Badge */}
                                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20">
                                    <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs sm:text-sm font-semibold rounded-lg shadow-sm">
                                        {car.category}
                                    </span>
                                </div>

                                {/* Price Overlay */}
                                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20">
                                    <div className="text-right">
                                        <div className="text-right text-white">
                                            <p className="text-xl font-bold drop-shadow-lg">
                                                KES {car.price['1-7'].toLocaleString()} / day
                                            </p>
                                            <p className="text-xs opacity-80 drop-shadow-md">
                                                8–20 days: {car.price['8-20'].toLocaleString()} <br />
                                                21+ days: {car.price['21+'].toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6">
                                {/* Title & Rating */}
                                <div className="mb-3 sm:mb-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#FF6B35] transition-colors duration-300 line-clamp-1">
                                        {car.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(car.rating)
                                                        ? 'text-yellow-500 fill-yellow-500'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-600">
                                            {car.rating} ({car.reviews} reviews)
                                        </span>
                                        {car.available && (
                                            <span className="ml-auto text-xs sm:text-sm text-green-600 font-semibold flex items-center gap-1">
                                                <BoltIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                                                <span className="hidden sm:inline">Available</span>
                                                <span className="sm:hidden">✓</span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Specifications Grid */}
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    <div className="bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Seats</p>
                                        <p className="font-bold text-gray-900 text-base sm:text-lg">{car.seats}</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Transmission</p>
                                        <p className="font-bold text-gray-900 text-base sm:text-lg">{car.transmission}</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Fuel Type</p>
                                        <p className="font-bold text-gray-900 text-base sm:text-lg">{car.fuel}</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Popularity</p>
                                        <p className="font-bold text-gray-900 text-base sm:text-lg">{car.popularity}%</p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                                        <CheckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
                                        Premium Features
                                    </h4>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        {car.features.slice(0, 3).map((feature, index) => (
                                            <div key={index} className="flex items-center text-gray-600">
                                                <div className="h-1.5 w-1.5 bg-[#FF6B35] rounded-full mr-1.5 sm:mr-2 flex-shrink-0" />
                                                <span className="text-xs sm:text-sm line-clamp-1">{feature}</span>
                                            </div>
                                        ))}
                                        {car.features.length > 3 && (
                                            <button className="text-[#FF6B35] text-xs sm:text-sm font-medium hover:text-[#FF5A20] transition-colors">
                                                View {car.features.length - 3} more features
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Reserve Button - Now Functional */}
                                <Link
                                    to="/booking"
                                    state={{ selectedCar: car }}
                                    className="w-full block bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5 group/btn text-sm sm:text-base"
                                >
                                    <span className="flex items-center justify-center">
                                        <span>Reserve Vehicle</span>
                                        <svg
                                            className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Executive Comparison Table */}
                <div className="mt-12 sm:mt-16 lg:mt-24">
                    <div className="text-center mb-6 sm:mb-8 lg:mb-12 px-4">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FF6B35]/10 rounded-full mb-3 sm:mb-4">
                            <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B35]" />
                            <span className="text-xs sm:text-sm font-semibold text-[#FF6B35]">EXECUTIVE COMPARISON</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Fleet Specifications
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Compare our premium vehicles side by side to find the perfect match for your needs
                        </p>
                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
                                        <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                            <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">Vehicle Model</span>
                                        </th>
                                        <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                            <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">Daily Rate</span>
                                        </th>
                                        <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                            <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">Executive Class</span>
                                        </th>
                                        <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                            <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">Premium Features</span>
                                        </th>
                                        <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                            <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">Status</span>
                                        </th>
                                        <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                            <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cars.slice(0, 6).map((car) => (
                                        <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                                                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                                                    <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border border-gray-200">
                                                        <img
                                                            src={car.image}
                                                            alt={car.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">{car.name}</h4>
                                                        <p className="text-xs sm:text-sm text-gray-500">{car.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                                                <div className="text-sm">
                                                    <p className="font-bold text-gray-900">
                                                        KES {car.price['1-7'].toLocaleString()} / day
                                                    </p>
                                                    <p className="text-gray-500 text-xs">
                                                        8–20: {car.price['8-20'].toLocaleString()} | 21+: {car.price['21+'].toLocaleString()}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(car.rating)
                                                                    ? 'text-yellow-500 fill-yellow-500'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-700 font-medium text-sm sm:text-base">{car.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {car.features.slice(0, 2).map((feature, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                                                {car.available ? (
                                                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-green-100 text-green-800 rounded-full">
                                                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500 rounded-full animate-pulse" />
                                                        <span className="font-semibold text-xs sm:text-sm">Available Now</span>
                                                    </div>
                                                ) : (
                                                    <span className="px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-600 rounded-full font-semibold text-xs sm:text-sm">
                                                        Booked
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                                                <Link
                                                    to="/booking"
                                                    state={{ selectedCar: car }}
                                                    className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF5A20] transition-colors duration-300 text-sm font-medium whitespace-nowrap"
                                                >
                                                    Reserve Now
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Corporate CTA */}
                <div className="mt-12 sm:mt-16 lg:mt-24 relative overflow-hidden rounded-xl sm:rounded-2xl">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] via-[#FF7B35] to-[#FF8B35]" />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 text-center">
                        <div className="max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
                                <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                <span className="text-xs sm:text-sm font-semibold text-white">CORPORATE PARTNERSHIPS</span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                                Elevate Your Business Travel
                            </h3>

                            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                                Experience VIP treatment with our corporate fleet program,
                                featuring exclusive rates, dedicated account management, and priority support.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                                <Link
                                    to="/contact"
                                    className="px-6 sm:px-8 py-2.5 sm:py-3.5 bg-white text-[#FF6B35] font-bold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl sm:shadow-xl sm:hover:shadow-2xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                                >
                                    Request Corporate Rate
                                </Link>
                                <Link
                                    to="/contact"
                                    className="px-6 sm:px-8 py-2.5 sm:py-3.5 bg-transparent border border-white sm:border-2 text-white font-bold rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                                >
                                    Contact Fleet Manager
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FleetPage;