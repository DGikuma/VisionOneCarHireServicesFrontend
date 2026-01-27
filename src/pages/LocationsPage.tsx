import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    MapPinIcon,
    PhoneIcon,
    ClockIcon,
    GlobeAltIcon,
    TruckIcon,
    BuildingOfficeIcon,
    SparklesIcon,
    ShieldCheckIcon,
    MapIcon,
    ArrowRightIcon,
    StarIcon,
    UsersIcon,
    WifiIcon,
    KeyIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as SolidCheck } from '@heroicons/react/24/solid';

interface Location {
    id: string;
    city: string;
    country: string;
    address: string;
    phone: string;
    hours: string;
    services: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    features: string[];
    status: 'premium' | 'executive' | 'flagship';
    capacity: number;
    rating: number;
}

const LocationsPage: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<string>('new-york');
    const [filterType, setFilterType] = useState<'all' | 'premium' | 'executive' | 'flagship'>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        // Add scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.location-card, .feature-card, .sidebar-card').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const locations: Location[] = [
        {
            id: 'new-york',
            city: 'New York',
            country: 'United States',
            address: 'One Executive Plaza, Suite 1000, 123 Premium Avenue, NY 10001',
            phone: '(888) 888-8901',
            hours: '24/7 Premium Lounge',
            services: ['Executive Sedans', 'Luxury SUVs', 'Electric Fleet', 'Airport Concierge', 'Chauffeur Services'],
            coordinates: { lat: 40.7128, lng: -74.0060 },
            features: ['Executive Lounge', 'Valet Service', 'Premium Detailing', 'Conference Facilities', 'EV Charging'],
            status: 'flagship',
            capacity: 150,
            rating: 4.9
        },
        {
            id: 'los-angeles',
            city: 'Los Angeles',
            country: 'United States',
            address: '456 Sunset Boulevard, Beverly Hills, CA 90210',
            phone: '(888) 888-8902',
            hours: '24/7 Premium Lounge',
            services: ['Convertibles', 'Sports Performance', 'Luxury SUVs', 'Celebrity Services', 'Event Planning'],
            coordinates: { lat: 34.0522, lng: -118.2437 },
            features: ['Private Showroom', 'Detailing Center', 'VIP Pickup', 'Mobile Check-in', 'Security Services'],
            status: 'premium',
            capacity: 120,
            rating: 4.8
        },
        {
            id: 'chicago',
            city: 'Chicago',
            country: 'United States',
            address: '789 Michigan Avenue, Chicago, IL 60611',
            phone: '(888) 888-8903',
            hours: 'Mon-Sun: 6 AM - 12 AM',
            services: ['Corporate Fleet', 'Family Vehicles', 'Executive Vans', 'Business Travel', 'Long-term Leasing'],
            coordinates: { lat: 41.8781, lng: -87.6298 },
            features: ['Indoor Garage', 'Business Lounge', 'High-speed WiFi', 'Meeting Rooms', 'Coffee Bar'],
            status: 'executive',
            capacity: 100,
            rating: 4.7
        },
        {
            id: 'miami',
            city: 'Miami',
            country: 'United States',
            address: '101 Ocean Drive, Miami Beach, FL 33139',
            phone: '(888) 888-8904',
            hours: '24/7 Premium Lounge',
            services: ['Convertibles', 'Yacht Services', 'Beach Delivery', 'Event Vehicles', 'Luxury Transportation'],
            coordinates: { lat: 25.7617, lng: -80.1918 },
            features: ['Beach Access Lounge', 'Valet Service', 'Premium Amenities', 'Event Planning', 'Concierge'],
            status: 'premium',
            capacity: 90,
            rating: 4.8
        },
        {
            id: 'las-vegas',
            city: 'Las Vegas',
            country: 'United States',
            address: '777 Las Vegas Boulevard, Suite 2000, NV 89109',
            phone: '(888) 888-8905',
            hours: '24/7 Premium Lounge',
            services: ['Exotic Collection', 'Limousines', 'Event Transportation', 'VIP Services', 'Nightlife Packages'],
            coordinates: { lat: 36.1699, lng: -115.1398 },
            features: ['Casino Valet', '24/7 Concierge', 'Entertainment Lounge', 'Private Suites', 'Security'],
            status: 'executive',
            capacity: 110,
            rating: 4.9
        },
        {
            id: 'san-francisco',
            city: 'San Francisco',
            country: 'United States',
            address: '888 Market Street, Financial District, CA 94102',
            phone: '(888) 888-8906',
            hours: 'Mon-Sun: 7 AM - 11 PM',
            services: ['Electric Fleet', 'Tech Shuttles', 'Corporate Solutions', 'Hybrid Vehicles', 'Startup Programs'],
            coordinates: { lat: 37.7749, lng: -122.4194 },
            features: ['EV Charging Hub', 'Tech Lounge', 'Co-working Space', 'High-speed WiFi', 'Conference Rooms'],
            status: 'premium',
            capacity: 85,
            rating: 4.8
        },
        {
            id: 'london',
            city: 'London',
            country: 'United Kingdom',
            address: '100 Mayfair, London W1K 4LA',
            phone: '+44 20 7946 0958',
            hours: '24/7 Premium Lounge',
            services: ['Right-hand Drive', 'Executive Sedans', 'Global Access', 'Corporate Accounts', 'Airport Services'],
            coordinates: { lat: 51.5074, lng: -0.1278 },
            features: ['Executive Lounge', 'Global Network', 'Premium Detailing', 'Multilingual Staff', '24/7 Support'],
            status: 'flagship',
            capacity: 130,
            rating: 4.9
        },
        {
            id: 'dubai',
            city: 'Dubai',
            country: 'UAE',
            address: 'Emirates Towers, Sheikh Zayed Road, Dubai',
            phone: '+971 4 319 7643',
            hours: '24/7 Premium Lounge',
            services: ['Luxury Fleet', 'VIP Transportation', 'Event Services', 'Desert Adventures', 'Airport Concierge'],
            coordinates: { lat: 25.2048, lng: 55.2708 },
            features: ['Luxury Lounge', 'VIP Services', 'Multilingual Concierge', 'Premium Amenities', 'Global Access'],
            status: 'premium',
            capacity: 95,
            rating: 4.8
        }
    ];

    const filteredLocations = filterType === 'all'
        ? locations
        : locations.filter(loc => loc.status === filterType);

    const selectedLocationData = locations.find(loc => loc.id === selectedLocation) || locations[0];

    const globalStats = [
        { value: '50+', label: 'Premium Locations' },
        { value: '24/7', label: 'Executive Support' },
        { value: '1000+', label: 'Luxury Vehicles' },
        { value: '25+', label: 'Countries Served' }
    ];

    const locationTypes = [
        { id: 'all', name: 'All Locations', count: locations.length, color: 'from-gray-600 to-gray-800' },
        { id: 'flagship', name: 'Flagship Centers', count: locations.filter(l => l.status === 'flagship').length, color: 'from-[#FF6B35] to-[#FF8B35]' },
        { id: 'premium', name: 'Premium Lounges', count: locations.filter(l => l.status === 'premium').length, color: 'from-blue-600 to-cyan-500' },
        { id: 'executive', name: 'Executive Hubs', count: locations.filter(l => l.status === 'executive').length, color: 'from-purple-600 to-indigo-500' }
    ] as const;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px h-px bg-[#FF6B35] rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.3}s`,
                                boxShadow: '0 0 20px 2px rgba(255, 107, 53, 0.5)'
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full border border-[#FF6B35]/20 mb-6">
                        <GlobeAltIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">GLOBAL NETWORK</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                            Premium Locations Worldwide
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Access our exclusive network of premium service centers, executive lounges, and flagship facilities
                        designed for discerning clients in major global cities.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {globalStats.map((stat, index) => (
                            <div key={index} className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <span className="text-3xl font-bold text-white">{stat.value}</span>
                                <p className="text-sm text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        {/* Location Type Filter */}
                        <div className="w-full lg:w-auto">
                            <div className="flex items-center gap-3 mb-3">
                                <BuildingOfficeIcon className="h-5 w-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Location Types</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {locationTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setFilterType(type.id as any)}
                                        className={`group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 ${filterType === type.id
                                            ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{type.name}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${filterType === type.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                                }`}>
                                                {type.count}
                                            </span>
                                        </span>
                                        {filterType === type.id && (
                                            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FF6B35] rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-4">
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'grid'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Grid View
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'list'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    List View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Location Grid */}
                    <div className="lg:col-span-3">
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                            }`}>
                            {filteredLocations.map((location) => (
                                <div
                                    key={location.id}
                                    onClick={() => setSelectedLocation(location.id)}
                                    className={`location-card group relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-500 transform cursor-pointer opacity-0 ${selectedLocation === location.id
                                        ? 'border-[#FF6B35] shadow-2xl scale-[1.02]'
                                        : 'border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-2 hover:border-gray-300'
                                        }`}
                                >
                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className={`px-3 py-1.5 text-white text-xs font-bold rounded-full shadow-lg ${location.status === 'flagship'
                                            ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]'
                                            : location.status === 'premium'
                                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500'
                                                : 'bg-gradient-to-r from-purple-600 to-indigo-500'
                                            }`}>
                                            {location.status.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Selected Indicator */}
                                    {selectedLocation === location.id && (
                                        <div className="absolute top-4 right-4 z-10 w-3 h-3 bg-[#FF6B35] rounded-full animate-pulse" />
                                    )}

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors duration-300">
                                                    {location.city}
                                                </h3>
                                                <p className="text-gray-500 text-sm mb-2">{location.country}</p>
                                                <div className="flex items-center text-gray-600 text-sm mb-1">
                                                    <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                                    <span className="truncate">{location.address}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600 text-sm mb-1">
                                                    <PhoneIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                                    <span>{location.phone}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600 text-sm">
                                                    <ClockIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                                    <span>{location.hours}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(location.rating)
                                                                ? 'text-yellow-500 fill-yellow-500'
                                                                : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                    <span className="text-sm text-gray-700 ml-1">{location.rating}</span>
                                                </div>
                                                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                    Open Now
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                <TruckIcon className="h-4 w-4 text-[#FF6B35]" />
                                                Premium Services
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {location.services.slice(0, 3).map((service, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                                {location.services.length > 3 && (
                                                    <span className="px-3 py-1.5 bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium rounded-lg">
                                                        +{location.services.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <UsersIcon className="h-4 w-4" />
                                                    <span>Capacity: {location.capacity}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <WifiIcon className="h-4 w-4" />
                                                    <span>Premium Lounge</span>
                                                </div>
                                            </div>
                                            <button className="flex items-center text-[#FF6B35] font-semibold group/btn">
                                                <span>View Details</span>
                                                <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Global Map Visualization */}
                        <div className="mt-12">
                            <div className="feature-card bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl opacity-0">
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-4">
                                                <MapIcon className="h-4 w-4 text-[#FF6B35]" />
                                                <span className="text-sm font-semibold text-[#FF6B35]">GLOBAL NETWORK MAP</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                Interactive Global Network
                                            </h3>
                                            <p className="text-gray-300">
                                                Explore our premium locations worldwide with detailed information and real-time availability.
                                            </p>
                                        </div>
                                        <button className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5">
                                            Launch Interactive Map
                                        </button>
                                    </div>

                                    {/* Map Placeholder */}
                                    <div className="relative h-96 rounded-xl overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-gray-900/30" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <GlobeAltIcon className="h-16 w-16 text-[#FF6B35] mx-auto mb-4" />
                                                <h4 className="text-xl font-bold text-white mb-2">Global Coverage</h4>
                                                <p className="text-gray-300 max-w-md mx-auto">
                                                    Interactive map showing all our premium service centers and executive lounges worldwide
                                                </p>
                                            </div>
                                        </div>

                                        {/* Location Dots */}
                                        {locations.map((loc, idx) => (
                                            <div
                                                key={loc.id}
                                                className="absolute w-3 h-3 bg-[#FF6B35] rounded-full animate-pulse cursor-pointer hover:scale-150 transition-transform duration-300"
                                                style={{
                                                    left: `${30 + Math.cos(idx * 0.8) * 40}%`,
                                                    top: `${40 + Math.sin(idx * 0.8) * 30}%`,
                                                    animationDelay: `${idx * 0.5}s`,
                                                    boxShadow: '0 0 20px 4px rgba(255, 107, 53, 0.7)'
                                                }}
                                                title={loc.city}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Selected Location Details */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            {/* Location Details Card */}
                            <div className="sidebar-card bg-white rounded-2xl shadow-xl border border-gray-200 p-6 opacity-0">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full">
                                        <SparklesIcon className="h-4 w-4 text-[#FF6B35]" />
                                        <span className="text-sm font-semibold text-[#FF6B35]">SELECTED LOCATION</span>
                                    </div>
                                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        Premium Status
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedLocationData.city}</h3>
                                    <p className="text-gray-500">{selectedLocationData.country}</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <MapPinIcon className="h-5 w-5 text-[#FF6B35] mr-3 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{selectedLocationData.address}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <PhoneIcon className="h-5 w-5 text-[#FF6B35] mr-3 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{selectedLocationData.phone}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <ClockIcon className="h-5 w-5 text-[#FF6B35] mr-3 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{selectedLocationData.hours}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <KeyIcon className="h-5 w-5 text-[#FF6B35]" />
                                            Premium Features
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedLocationData.features.slice(0, 4).map((feature, idx) => (
                                                <div key={idx} className="feature-card bg-gray-50 p-3 rounded-lg text-center opacity-0">
                                                    <div className="text-lg mb-1">✨</div>
                                                    <span className="text-xs text-gray-700 font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3">Available Services</h4>
                                        <ul className="space-y-2">
                                            {selectedLocationData.services.slice(0, 5).map((service, idx) => (
                                                <li key={idx} className="flex items-center">
                                                    <SolidCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                                    <span className="text-sm text-gray-700">{service}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button className="w-full py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5">
                                        Book at This Location
                                    </button>
                                </div>
                            </div>

                            {/* Airport Access */}
                            <div className="sidebar-card bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white opacity-0">
                                <div className="flex items-center gap-2 mb-6">
                                    <MapIcon className="h-5 w-5 text-[#FF6B35]" />
                                    <h3 className="text-xl font-bold">Airport Access</h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { airport: 'JFK International', code: 'JFK', time: '5 min', icon: '✈️' },
                                        { airport: 'LAX', code: 'LAX', time: '10 min', icon: '🛫' },
                                        { airport: 'O\'Hare International', code: 'ORD', time: '15 min', icon: '✈️' },
                                        { airport: 'Miami International', code: 'MIA', time: '8 min', icon: '🛬' }
                                    ].map((airport, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="text-xl">{airport.icon}</div>
                                                <div>
                                                    <div className="font-semibold">{airport.airport}</div>
                                                    <div className="text-gray-300 text-sm">{airport.code}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold">{airport.time}</div>
                                                <div className="text-gray-300 text-sm">drive</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Premium Services CTA */}
                            <div className="sidebar-card relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] p-8 text-white opacity-0">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />

                                <div className="relative">
                                    <div className="inline-flex p-3 bg-white/20 rounded-xl mb-6">
                                        <ShieldCheckIcon className="h-6 w-6" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-4">
                                        Need Special Arrangements?
                                    </h3>

                                    <p className="text-white/90 mb-6">
                                        Our premium concierge team can arrange custom services, delivery, and exclusive access.
                                    </p>

                                    <button className="w-full py-3.5 bg-white text-[#FF6B35] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300">
                                        Request Executive Service
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Coverage Stats */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                            <GlobeAltIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">GLOBAL COVERAGE</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Worldwide Premium Network
                        </h2>

                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Access our premium service centers in major cities across the globe,
                            ensuring seamless luxury mobility wherever your journey takes you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { region: 'North America', cities: '15+', icon: '🇺🇸', description: 'Flagship locations in major US and Canadian cities' },
                            { region: 'Europe', cities: '12+', icon: '🇪🇺', description: 'Premium service centers across European capitals' },
                            { region: 'Middle East', cities: '8+', icon: '🇦🇪', description: 'Luxury hubs in key Middle Eastern destinations' },
                            { region: 'Asia Pacific', cities: '10+', icon: '🌏', description: 'Growing network in major Asian financial centers' }
                        ].map((region, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                <div className="text-3xl mb-4">{region.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{region.region}</h3>
                                <div className="text-3xl font-bold text-[#FF6B35] mb-3">{region.cities}</div>
                                <p className="text-gray-600 text-sm">{region.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="relative overflow-hidden py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                        <SparklesIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">GLOBAL MOBILITY</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Experience Seamless Global Mobility
                    </h2>

                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Wherever your business or leisure takes you, our premium network ensures consistent
                        excellence and unparalleled service at every location.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-1">
                            Find Nearest Location
                        </button>
                        <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300">
                            Contact Global Concierge
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LocationsPage;