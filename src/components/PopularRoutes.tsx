/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { MapPinIcon, ArrowRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

/* ─────────── Brand palette ─────────── */
const BRAND = {
    coral: '#FF6B35',
    coralLight: '#FF8B35',
    slate: '#0F172A',
    gold: '#D4AF37',
    cream: '#FFF8E7',
};

/* ─────────── Types ─────────── */
export interface PopularRoute {
    id: string;
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    price: string;
    image: string;
    badge?: string;
}

export interface PopularRoutesProps {
    /** Called with { from, to } when a tile is clicked. */
    onSelect: (route: { from: string; to: string }) => void;
    /** Optional custom list — defaults to NAIROBI_ROUTES. */
    routes?: PopularRoute[];
    /** Optional heading override. */
    heading?: string;
    /** Optional subheading override. */
    subheading?: string;
}

/* ─────────── Default routes from Nairobi ─────────── */
export const NAIROBI_ROUTES: PopularRoute[] = [
    {
        id: 'nbo-lhr',
        from: 'Nairobi',
        fromCode: 'NBO',
        to: 'London',
        toCode: 'LHR',
        price: 'From KES 78,000',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
        badge: 'BESTSELLER',
    },
    {
        id: 'nbo-dxb',
        from: 'Nairobi',
        fromCode: 'NBO',
        to: 'Dubai',
        toCode: 'DXB',
        price: 'From KES 42,000',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        badge: 'POPULAR',
    },
    {
        id: 'nbo-mba',
        from: 'Nairobi',
        fromCode: 'NBO',
        to: 'Mombasa',
        toCode: 'MBA',
        price: 'From KES 8,500',
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80',
        badge: 'COASTAL',
    },
    {
        id: 'nbo-cpt',
        from: 'Nairobi',
        fromCode: 'NBO',
        to: 'Cape Town',
        toCode: 'CPT',
        price: 'From KES 65,000',
        image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'nbo-znz',
        from: 'Nairobi',
        fromCode: 'NBO',
        to: 'Zanzibar',
        toCode: 'ZNZ',
        price: 'From KES 32,000',
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
        badge: 'ISLAND',
    },
    {
        id: 'nbo-add',
        from: 'Nairobi',
        fromCode: 'NBO',
        to: 'Addis Ababa',
        toCode: 'ADD',
        price: 'From KES 24,000',
        image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80',
    },
];

/* ═══════════════════════════════════════════════════════════════ */
const PopularRoutes: React.FC<PopularRoutesProps> = ({
    onSelect,
    routes = NAIROBI_ROUTES,
    heading = 'Popular flight routes',
    subheading = 'Where Vision Wan travellers are flying right now. Tap a route to start your enquiry.',
}) => {
    const handleClick = (route: PopularRoute) => {
        onSelect({ from: route.from, to: route.to });
    };

    return (
        <section style={styles.section} className="pr-section">
            <div style={styles.inner}>
                <div style={styles.header}>
                    <div style={styles.chip}>
                        <PaperAirplaneIcon className="h-4 w-4" />
                        <span>Curated flight deals</span>
                    </div>
                    <h2 style={styles.title}>{heading}</h2>
                    <p style={styles.sub}>{subheading}</p>
                </div>

                <div style={styles.grid} className="pr-grid">
                    {routes.map((route) => (
                        <button
                            key={route.id}
                            type="button"
                            onClick={() => handleClick(route)}
                            style={styles.card}
                            className="pr-card"
                            aria-label={`Enquire about flights from ${route.from} to ${route.to}`}
                        >
                            <div style={styles.imageWrap}>
                                <img
                                    src={route.image}
                                    alt={`${route.to}`}
                                    style={styles.image}
                                    loading="lazy"
                                />
                                <div style={styles.imageOverlay} />
                                {route.badge && (
                                    <div style={styles.badge}>{route.badge}</div>
                                )}
                                <div style={styles.pricePill}>{route.price}</div>
                            </div>

                            <div style={styles.body}>
                                <div style={styles.routeRow}>
                                    <div style={styles.routeCity}>
                                        <span style={styles.cityName}>{route.from}</span>
                                        <span style={styles.cityCode}>{route.fromCode}</span>
                                    </div>
                                    <div style={styles.routeArrow}>
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </div>
                                    <div style={{ ...styles.routeCity, textAlign: 'right' }}>
                                        <span style={styles.cityName}>{route.to}</span>
                                        <span style={styles.cityCode}>{route.toCode}</span>
                                    </div>
                                </div>

                                <div style={styles.cta}>
                                    <MapPinIcon className="h-4 w-4" />
                                    <span>Enquire about this route</span>
                                    <ArrowRightIcon className="h-4 w-4 pr-cta-arrow" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <style>{`
                .pr-card {
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }
                .pr-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 28px 60px -24px rgba(255,107,53,0.45);
                }
                .pr-card:hover .pr-cta-arrow {
                    transform: translateX(4px);
                }
                .pr-cta-arrow {
                    transition: transform 0.2s ease;
                }
                @media (max-width: 640px) {
                    .pr-section { padding: 56px 0 !important; }
                    .pr-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
                }
                @media (min-width: 641px) and (max-width: 1023px) {
                    .pr-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
            `}</style>
        </section>
    );
};

/* ═══════════════════════════════════════════════════════════════ */
const styles: { [k: string]: React.CSSProperties } = {
    section: {
        padding: '80px 0',
        background:
            'radial-gradient(60% 40% at 50% 0%, rgba(255,107,53,0.06), transparent), linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        fontFamily: 'Inter, Arial, sans-serif',
    },
    inner: { maxWidth: 1200, margin: '0 auto', padding: '0 20px' },
    header: { textAlign: 'center', marginBottom: 44 },
    chip: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 999,
        background: 'rgba(255,107,53,0.10)',
        border: '1px solid rgba(255,107,53,0.22)',
        color: BRAND.coral,
        fontWeight: 800,
        fontSize: 12.5,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 14,
    },
    title: {
        margin: '0 0 12px',
        fontSize: 'clamp(26px, 4vw, 42px)',
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -1,
    },
    sub: {
        margin: 0,
        maxWidth: 640,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 15.5,
        lineHeight: 1.65,
        color: '#475569',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 22,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid #eef2f7',
        boxShadow: '0 20px 50px -32px rgba(15,23,42,0.25)',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0,
        font: 'inherit',
    },
    imageWrap: { position: 'relative', height: 180, overflow: 'hidden' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
    imageOverlay: {
        position: 'absolute',
        inset: 0,
        background:
            'linear-gradient(180deg, rgba(2,6,23,0.05) 0%, rgba(2,6,23,0.55) 100%)',
    },
    badge: {
        position: 'absolute',
        top: 12,
        left: 12,
        padding: '5px 10px',
        borderRadius: 6,
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        color: '#fff',
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 1.2,
        boxShadow: '0 8px 18px -8px rgba(255,107,53,0.9)',
    },
    pricePill: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        padding: '6px 12px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.95)',
        color: BRAND.slate,
        fontSize: 12,
        fontWeight: 900,
        boxShadow: '0 8px 18px -8px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
    },
    body: { padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 },
    routeRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 14,
    },
    routeCity: { display: 'flex', flexDirection: 'column', minWidth: 0 },
    cityName: {
        fontSize: 14.5,
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -0.2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cityCode: {
        fontSize: 11,
        fontWeight: 700,
        color: '#94a3b8',
        letterSpacing: 1.4,
        marginTop: 2,
    },
    routeArrow: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: 'rgba(255,107,53,0.10)',
        color: BRAND.coral,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    cta: {
        marginTop: 'auto',
        paddingTop: 12,
        borderTop: '1px solid #eef2f7',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        fontWeight: 800,
        color: BRAND.coral,
        letterSpacing: 0.2,
    },
};

export default PopularRoutes;