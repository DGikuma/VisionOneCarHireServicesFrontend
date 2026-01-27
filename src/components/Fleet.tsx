import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    UserGroupIcon,
    CogIcon,
} from '@heroicons/react/24/outline';

interface Car {
    id: string;
    name: string;
    category: string;
    image: string;
    price: number;
    seats: number;
    transmission: string;
    features: string[];
}

interface FleetProps {
    compact?: boolean;
}

const Fleet: React.FC<FleetProps> = ({ compact = false }) => {
    const cars: Car[] = [
        {
            id: '1',
            name: 'Mercedes-Benz S-Class',
            category: 'Luxury',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800',
            price: 299,
            seats: 5,
            transmission: 'Automatic',
            features: ['Premium Sound', 'Heated Seats', 'Panoramic Roof']
        },
        {
            id: '2',
            name: 'BMW X5',
            category: 'SUV',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800',
            price: 249,
            seats: 7,
            transmission: 'Automatic',
            features: ['4WD', 'Navigation', 'Parking Assist']
        },
        {
            id: '3',
            name: 'Tesla Model 3',
            category: 'Electric',
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
            price: 199,
            seats: 5,
            transmission: 'Automatic',
            features: ['Autopilot', 'Electric', 'Premium Interior']
        },
        {
            id: '4',
            name: 'Toyota Camry',
            category: 'Mid-Size',
            image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800',
            price: 149,
            seats: 5,
            transmission: 'Automatic',
            features: ['Fuel Efficient', 'Comfortable', 'Reliable']
        },
        {
            id: '5',
            name: 'Ford Transit',
            category: 'Van',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800',
            price: 179,
            seats: 12,
            transmission: 'Automatic',
            features: ['Spacious', 'Cargo Space', 'Family Friendly']
        },
        {
            id: '6',
            name: 'Audi A4',
            category: 'Premium',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800',
            price: 229,
            seats: 5,
            transmission: 'Automatic',
            features: ['Quattro', 'Virtual Cockpit', 'LED Lights']
        }
    ];

    const displayedCars = compact ? cars.slice(0, 4) : cars;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                    Our Fleet
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Choose Your Perfect Ride
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    From luxury sedans to spacious SUVs, our meticulously maintained fleet offers the perfect vehicle for every occasion.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedCars.map((car) => (
                    <div
                        key={car.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                                    {car.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary-600">${car.price}<span className="text-sm text-gray-500">/day</span></p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center text-gray-600">
                                    <UserGroupIcon className="h-5 w-5 mr-2" />
                                    <span>{car.seats} seats</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <CogIcon className="h-5 w-5 mr-2" />
                                    <span>{car.transmission}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {car.features.map((feature, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link
                                to={`/booking?car=${car.id}`}
                                className="block w-full text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                            >
                                Book This Car
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {compact && (
                <div className="text-center mt-12">
                    <Link
                        to="/fleet"
                        className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                    >
                        View All Vehicles
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Fleet;