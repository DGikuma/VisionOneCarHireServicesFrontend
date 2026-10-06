export type PeriodCategory = 'short' | 'medium' | 'long';

export interface FestiveRate {
    short: number;   // 1–7 days
    medium: number;  // 7–20 days
    long: number;    // 20+ days
}

export interface FestiveVehicle {
    value: string;
    label: string;
    image: string;
    rates: FestiveRate;
}

/**
 * 🎄 December 2026 Festive Rates — from the official flyer
 * Year-adaptive: use getFestiveYear() to resolve the current year dynamically.
 */
export const FESTIVE_VEHICLES: FestiveVehicle[] = [
    {
        value: 'Fielder',
        label: 'Fielder',
        image: '/assets/vehicles/fielder.jpeg',
        rates: { short: 4500, medium: 4000, long: 3500 },
    },
    {
        value: 'Mazda CX-5',
        label: 'Mazda CX5',
        image: '/assets/vehicles/mazdaCX5.jpeg',
        rates: { short: 8000, medium: 7500, long: 7000 },
    },
    {
        value: 'Harrier',
        label: 'Harrier',
        image: '/assets/vehicles/harrier.jpg',
        rates: { short: 9000, medium: 8500, long: 8000 },
    },
    {
        value: 'Lexus',
        label: 'Lexus',
        image: '/assets/vehicles/lexus.jpg',
        rates: { short: 10000, medium: 9500, long: 9000 },
    },
    {
        value: 'Prado',
        label: 'Prado',
        image: '/assets/vehicles/prado.jpg',
        rates: { short: 13000, medium: 12000, long: 11000 },
    },
];

export const FESTIVE_PERIODS: {
    value: PeriodCategory;
    label: string;
    minDays: number;
    maxDays: number;
}[] = [
    { value: 'short',  label: '1–7 days',   minDays: 1,  maxDays: 7 },
    { value: 'medium', label: '7–20 days',  minDays: 8,  maxDays: 20 },
    { value: 'long',   label: '20+ days',   minDays: 21, maxDays: Infinity },
];

/** Resolve the current festive year (Dec of current year). */
export const getFestiveYear = (): number => new Date().getFullYear();

/** The one and only month allowed for festive bookings (December = 11). */
export const FESTIVE_MONTH = 11; // JS months are 0-indexed

/**
 * Check whether a date string (YYYY-MM-DD) falls entirely within December
 * of the current festive year.
 */
export const isFestiveDate = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return false;
    return d.getMonth() === FESTIVE_MONTH && d.getFullYear() === getFestiveYear();
};

/**
 * Get the valid min/max allowed dates for the festive booking window.
 * December 1 → December 31 of the current year.
 */
export const getFestiveDateRange = () => {
    const year = getFestiveYear();
    return {
        min: `${year}-12-01`,
        max: `${year}-12-31`,
        year,
    };
};

/**
 * Determine the period category from a rental duration in days.
 */
export const getPeriodFromDays = (days: number): PeriodCategory => {
    if (days <= 7) return 'short';
    if (days <= 20) return 'medium';
    return 'long';
};

/**
 * Calculate the full festive estimate.
 */
export const calculateFestiveEstimate = (
    vehicleValue: string,
    pickupDate: string,
    returnDate: string
): {
    days: number | null;
    rate: number | null;
    total: number | null;
    period: PeriodCategory | null;
    error: string | null;
} => {
    if (!vehicleValue || !pickupDate || !returnDate) {
        return { days: null, rate: null, total: null, period: null, error: null };
    }

    const p = new Date(pickupDate + 'T00:00:00');
    const r = new Date(returnDate + 'T00:00:00');
    const days = Math.ceil((r.getTime() - p.getTime()) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
        return { days: null, rate: null, total: null, period: null, error: 'Invalid dates' };
    }

    const vehicle = FESTIVE_VEHICLES.find(v => v.value === vehicleValue);
    if (!vehicle) {
        return { days: null, rate: null, total: null, period: null, error: 'Vehicle not found' };
    }

    const period = getPeriodFromDays(days);
    const rate = vehicle.rates[period];
    return { days, rate, total: rate * days, period, error: null };
};