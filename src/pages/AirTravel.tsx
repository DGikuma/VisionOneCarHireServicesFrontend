/* src/pages/AirTravel.tsx */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
const { useMemo, useEffect } = React;
import { useNavigate } from 'react-router-dom';
import {
    PaperAirplaneIcon,
    PhoneIcon,
    MapPinIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    SparklesIcon,
    ArrowRightIcon,
    SunIcon,
    CheckBadgeIcon,
    ClockIcon,
    StarIcon,
} from '@heroicons/react/24/outline';

const BRAND = {
    coral: '#FF6B35',
    coralLight: '#FF8B35',
    slate: '#0F172A',
    gold: '#D4AF37',
    cream: '#FFF8E7',
};

/* ═════════════════════════════════════════════════════════════════
   Data
   ═════════════════════════════════════════════════════════════════ */
interface PopularRoute {
    id: string;
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    price: string;
    image: string;
    badge?: string;
}

const NAIROBI_ROUTES: PopularRoute[] = [
    { id: 'nbo-lhr', from: 'Nairobi', fromCode: 'NBO', to: 'London', toCode: 'LHR', price: 'From KES 78,000', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80', badge: 'BESTSELLER' },
    { id: 'nbo-dxb', from: 'Nairobi', fromCode: 'NBO', to: 'Dubai', toCode: 'DXB', price: 'From KES 42,000', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80', badge: 'POPULAR' },
    { id: 'nbo-mba', from: 'Nairobi', fromCode: 'NBO', to: 'Mombasa', toCode: 'MBA', price: 'From KES 8,500', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80', badge: 'COASTAL' },
    { id: 'nbo-cpt', from: 'Nairobi', fromCode: 'NBO', to: 'Cape Town', toCode: 'CPT', price: 'From KES 65,000', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80' },
    { id: 'nbo-znz', from: 'Nairobi', fromCode: 'NBO', to: 'Zanzibar', toCode: 'ZNZ', price: 'From KES 32,000', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80', badge: 'ISLAND' },
    { id: 'nbo-add', from: 'Nairobi', fromCode: 'NBO', to: 'Addis Ababa', toCode: 'ADD', price: 'From KES 24,000', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80' },
];

interface SafariTour {
    id: string;
    name: string;
    park: string;
    days: number;
    price: string;
    image: string;
    highlights: string[];
    badge: string;
    accent: string;
}

const SAFARI_TOURS: SafariTour[] = [
    { id: 'maasai-mara', name: 'Maasai Mara Signature', park: 'Maasai Mara National Reserve', days: 3, price: 'From USD 890', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=90', highlights: ['Big Five game drives', 'Maasai village visit', 'Hot air balloon option'], badge: 'BESTSELLER', accent: 'from-[#FF6B35] to-[#FF8B35]' },
    { id: 'amboseli', name: 'Amboseli Elephant Trail', park: 'Amboseli National Park', days: 4, price: 'From USD 1,150', image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1400&q=90', highlights: ['Kilimanjaro views', 'Elephant herds', 'Sunset photography'], badge: 'SCENIC', accent: 'from-emerald-500 to-teal-600' },
    { id: 'diani', name: 'Diani Beach & Safari Combo', park: 'Diani Beach + Tsavo West', days: 6, price: 'From USD 1,690', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=90', highlights: ['White sand beaches', 'Tsavo game drive', 'Snorkelling'], badge: 'BEACH & BUSH', accent: 'from-cyan-500 to-blue-600' },
    { id: 'samburu', name: 'Samburu Special Five', park: 'Samburu National Reserve', days: 3, price: 'From USD 940', image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1400&q=90', highlights: ['Unique northern species', 'Cultural encounters', "Ewaso Ng'iro river"], badge: 'OFF THE BEATEN', accent: 'from-rose-500 to-pink-600' },
];

/* ═════════════════════════════════════════════════════════════════
   Landing page
   ═════════════════════════════════════════════════════════════════ */
const AirTravel: React.FC = () => {
    const navigate = useNavigate();

    const handleSelectRoute = (route: PopularRoute) => {
        navigate('/air-travel/book', {
            state: {
                tripType: 'flight',
                fromCity: route.from,
                toCity: route.to,
            },
        });
    };

    const handleSelectTour = (tourId: string) => {
        navigate('/air-travel/book', {
            state: {
                tripType: 'safari',
                safariTourId: tourId,
            },
        });
    };

    return (
        <div style={styles.page}>
            <Hero
                onStartEnquiry={() =>
                    navigate('/air-travel/book', {
                        state: { tripType: 'flight-hotel' },
                    })
                }
            />

            <PopularRoutesGrid
                routes={NAIROBI_ROUTES}
                onSelect={handleSelectRoute}
            />

            <SafariShowcase onSelect={handleSelectTour} />

            <div style={{ padding: '60px 20px' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <FestiveCountdown />
                </div>
            </div>

            <WhyUs />
            <ContactStrip />

            <style>{`
                @keyframes atFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .pr-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
                .pr-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 28px 60px -24px rgba(255,107,53,0.45);
                }
                .pr-card:hover .pr-cta-arrow { transform: translateX(4px); }
                .pr-cta-arrow { transition: transform 0.2s ease; }
                @media (max-width: 640px) {
                    .pr-section { padding: 56px 0 !important; }
                    .pr-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
                }
                @media (min-width: 641px) and (max-width: 1023px) {
                    .pr-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
            `}</style>
        </div>
    );
};

/* ═════════════════════════════════════════════════════════════════
   Hero — tagline removed
   ═════════════════════════════════════════════════════════════════ */
const Hero: React.FC<{ onStartEnquiry: () => void }> = ({ onStartEnquiry }) => (
    <div style={styles.hero}>
        <div style={styles.heroImageLayer} aria-hidden>
            <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=100"
                alt=""
                style={styles.heroImage}
                loading="eager"
            />
        </div>
        <div style={styles.heroOverlayA} aria-hidden />
        <div style={styles.heroOverlayB} aria-hidden />
        <div style={styles.heroInner}>
            <div style={styles.ribbon}>Flights · Hotels · Safaris</div>
            <h1 style={styles.heroTitle}>
                Vision Wan{' '}
                <span style={styles.heroTitleAccent}>Air Travel &amp; Safaris</span>
            </h1>
            <p style={styles.heroSub}>
                From Nairobi to the world — and from the world to Kenya's greatest parks.
                Tell us your dates and travellers, and our travel desk will reply by email
                with a tailored quote within 24 hours.
            </p>

            <div style={styles.heroCtas}>
                <button
                    type="button"
                    onClick={onStartEnquiry}
                    style={styles.heroCta}
                >
                    Start your enquiry
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                </button>
            </div>

            <div style={styles.heroPills}>
                <Pill text="Flights worldwide" />
                <Pill text="Private safaris" />
                <Pill text="Fast email reply" />
            </div>
        </div>
    </div>
);

const Pill: React.FC<{ text: string }> = ({ text }) => (
    <span style={styles.pill}>
        <span style={styles.pillDot} aria-hidden />
        {text}
    </span>
);

/* ═════════════════════════════════════════════════════════════════
   Popular Routes
   ═════════════════════════════════════════════════════════════════ */
const PopularRoutesGrid: React.FC<{
    routes: PopularRoute[];
    onSelect: (route: PopularRoute) => void;
}> = ({ routes, onSelect }) => (
    <section style={styles.prSection} className="pr-section">
        <div style={styles.prInner}>
            <div style={styles.prHeader}>
                <div style={styles.prChip}>
                    <PaperAirplaneIcon className="h-4 w-4" />
                    <span>Curated flight deals</span>
                </div>
                <h2 style={styles.prTitle}>Popular flight routes</h2>
                <p style={styles.prSub}>
                    Where Vision Wan travellers are flying right now. Tap a route to
                    start your enquiry.
                </p>
            </div>

            <div style={styles.prGrid} className="pr-grid">
                {routes.map((route) => (
                    <button
                        key={route.id}
                        type="button"
                        onClick={() => onSelect(route)}
                        style={styles.prCard}
                        className="pr-card"
                        aria-label={`Enquire about flights from ${route.from} to ${route.to}`}
                    >
                        <div style={styles.prImageWrap}>
                            <img
                                src={route.image}
                                alt={route.to}
                                style={styles.prImage}
                                loading="lazy"
                            />
                            <div style={styles.prImageOverlay} />
                            {route.badge && (
                                <div style={styles.prBadge}>{route.badge}</div>
                            )}
                            <div style={styles.prPricePill}>{route.price}</div>
                        </div>
                        <div style={styles.prBody}>
                            <div style={styles.prRouteRow}>
                                <div style={styles.prRouteCity}>
                                    <span style={styles.prCityName}>{route.from}</span>
                                    <span style={styles.prCityCode}>{route.fromCode}</span>
                                </div>
                                <div style={styles.prRouteArrow}>
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                                <div
                                    style={{
                                        ...styles.prRouteCity,
                                        textAlign: 'right',
                                    }}
                                >
                                    <span style={styles.prCityName}>{route.to}</span>
                                    <span style={styles.prCityCode}>{route.toCode}</span>
                                </div>
                            </div>
                            <div style={styles.prCta}>
                                <MapPinIcon className="h-4 w-4" />
                                <span>Enquire about this route</span>
                                <ArrowRightIcon className="h-4 w-4 pr-cta-arrow" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </section>
);

/* ═════════════════════════════════════════════════════════════════
   Safari Showcase
   ═════════════════════════════════════════════════════════════════ */
const SafariShowcase: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => (
    <section style={styles.safariSection}>
        <div style={styles.safariSectionInner}>
            <div style={styles.safariHeader}>
                <div style={styles.safariChip}>
                    <SunIcon className="h-4 w-4" />
                    <span>Curated safari tours</span>
                </div>
                <h2 style={styles.safariTitle}>Signature Kenyan Safaris</h2>
                <p style={styles.safariSub}>
                    Handpicked itineraries with trusted lodges, private game drives and
                    executive transfers. Click a tour to start your enquiry.
                </p>
            </div>

            <div className="at-safari-grid" style={styles.safariGrid}>
                {SAFARI_TOURS.map((tour) => (
                    <div key={tour.id} style={styles.safariCard}>
                        <div style={styles.safariImageWrap}>
                            <img
                                src={tour.image}
                                alt={tour.name}
                                style={styles.safariImage}
                            />
                            <div
                                className={`bg-gradient-to-r ${tour.accent}`}
                                style={styles.safariBadge}
                            >
                                {tour.badge}
                            </div>
                        </div>
                        <div style={styles.safariBody}>
                            <h3 style={styles.safariName}>{tour.name}</h3>
                            <p style={styles.safariPark}>
                                <MapPinIcon className="h-4 w-4" />
                                {tour.park}
                            </p>
                            <ul style={styles.safariHighlights}>
                                {tour.highlights.map((h) => (
                                    <li key={h} style={styles.safariHighlightItem}>
                                        <span style={styles.bullet} />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                            <div style={styles.safariMeta}>
                                <span style={styles.safariDays}>
                                    <ClockIcon className="h-4 w-4" />
                                    {tour.days} days
                                </span>
                                <span style={styles.safariPrice}>{tour.price}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => onSelect(tour.id)}
                                style={styles.safariCta}
                            >
                                Enquire about this tour
                                <ArrowRightIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ═════════════════════════════════════════════════════════════════
   Festive Countdown
   ═════════════════════════════════════════════════════════════════ */
const getFestiveTarget = (): Date => {
    const year = new Date().getFullYear();
    return new Date(`${year}-12-31T23:59:59`);
};

const computeParts = (target: Date) => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    const totalSeconds = Math.floor(diff / 1000);
    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        expired: false,
    };
};

const pad = (n: number) => String(n).padStart(2, '0');

const FestiveCountdown: React.FC<{ heading?: string; subtext?: string }> = ({
    heading = 'Festive offer ends in',
    subtext = 'Book any December date and lock in your rate.',
}) => {
    const target = useMemo(() => getFestiveTarget(), []);
    const [parts, setParts] = React.useState(() => computeParts(target));

    useEffect(() => {
        const t = window.setInterval(() => setParts(computeParts(target)), 1000);
        return () => window.clearInterval(t);
    }, [target]);

    if (parts.expired) {
        return (
            <div style={styles.fcWrap}>
                <div style={styles.fcExpiredPill}>Festive offer has ended</div>
            </div>
        );
    }

    const boxes = [
        { label: 'Days', value: pad(parts.days) },
        { label: 'Hours', value: pad(parts.hours) },
        { label: 'Mins', value: pad(parts.minutes) },
        { label: 'Secs', value: pad(parts.seconds) },
    ];

    return (
        <div style={styles.fcWrap}>
            <div style={styles.fcHeader}>
                <h3 style={styles.fcHeading}>{heading}</h3>
                <p style={styles.fcSubtext}>{subtext}</p>
            </div>
            <div style={styles.fcBoxes}>
                {boxes.map((b, i) => (
                    <React.Fragment key={b.label}>
                        <div style={styles.fcBox}>
                            <span style={styles.fcBoxValue}>{b.value}</span>
                            <span style={styles.fcBoxLabel}>{b.label}</span>
                        </div>
                        {i < boxes.length - 1 && <span style={styles.fcColon}>:</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

/* ═════════════════════════════════════════════════════════════════
   Why Us + Contact
   ═════════════════════════════════════════════════════════════════ */
const WhyUs: React.FC = () => {
    const items = [
        { icon: GlobeAltIcon, title: 'Global flight network', desc: 'Access to 500+ airlines, from economy to first class.' },
        { icon: ShieldCheckIcon, title: 'Trusted safari partners', desc: 'Vetted lodges, licensed guides, private game drives.' },
        { icon: SparklesIcon, title: 'Executive add-ons', desc: 'Airport transfers, VIP lounges, private concierge.' },
        { icon: CheckBadgeIcon, title: 'Email-first workflow', desc: 'A real human replies within 24 hours with your quote.' },
    ];
    return (
        <section style={styles.whySection}>
            <div style={styles.whyInner}>
                <div style={styles.whyHead}>
                    <div style={styles.whyChip}>
                        <StarIcon className="h-4 w-4" />
                        <span>The Vision Wan difference</span>
                    </div>
                    <h2 style={styles.whyTitle}>Why book with us</h2>
                </div>
                <div style={styles.whyGrid}>
                    {items.map((it) => (
                        <div key={it.title} style={styles.whyCard}>
                            <div style={styles.whyIconWrap}>
                                <it.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 style={styles.whyCardTitle}>{it.title}</h3>
                            <p style={styles.whyCardDesc}>{it.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContactStrip: React.FC = () => (
    <section style={styles.contactStrip}>
        <div style={styles.contactInner}>
            <div>
                <h3 style={styles.contactTitle}>Prefer to talk to a human?</h3>
                <p style={styles.contactSub}>
                    Our travel desk is available 24/7 for premium enquiries.
                </p>
            </div>
            <div style={styles.contactActions}>
                <a href="tel:+254705336311" style={styles.contactBtn}>
                    <PhoneIcon className="h-4 w-4" />
                    +254 (705) 336 311
                </a>
                <a href="tel:+447397549590" style={styles.contactBtnGhost}>
                    <PhoneIcon className="h-4 w-4" />
                    +44 (7397) 549 590
                </a>
            </div>
        </div>
    </section>
);

/* ═════════════════════════════════════════════════════════════════
   Styles
   ═════════════════════════════════════════════════════════════════ */
const styles: { [k: string]: React.CSSProperties } = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 40%, #FFF8E7 100%)',
        fontFamily: 'Inter, Arial, sans-serif',
    },

    /* Hero */
    hero: { position: 'relative', overflow: 'hidden', color: '#fff', isolation: 'isolate' },
    heroImageLayer: { position: 'absolute', inset: 0, zIndex: 0 },
    heroImage: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 45%',
        filter: 'saturate(1.05) contrast(1.02)',
        transform: 'scale(1.04)',
    },
    heroOverlayA: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.55) 45%, rgba(2,6,23,0.82) 100%)',
        zIndex: 1,
    },
    heroOverlayB: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(120deg, rgba(255,107,53,0.35) 0%, rgba(255,107,53,0.05) 45%, rgba(212,175,55,0.30) 100%)',
        mixBlendMode: 'multiply',
        zIndex: 1,
    },
    heroInner: {
        position: 'relative',
        zIndex: 3,
        maxWidth: 1080,
        margin: '0 auto',
        textAlign: 'center',
        padding: '120px 22px 140px',
        animation: 'atFadeUp 0.7s ease-out both',
    },
    ribbon: {
        display: 'inline-block',
        padding: '7px 18px',
        background: 'linear-gradient(135deg, #D4AF37, #FFF3C4, #D4AF37)',
        color: '#3a2b00',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 900,
        letterSpacing: 2,
        textTransform: 'uppercase',
        boxShadow: '0 10px 30px -10px rgba(212,175,55,0.8)',
        marginBottom: 20,
    },
    heroTitle: {
        margin: 0,
        fontSize: 'clamp(30px, 5vw, 56px)',
        fontWeight: 900,
        letterSpacing: -1.2,
        lineHeight: 1.05,
        textShadow: '0 4px 24px rgba(0,0,0,0.45)',
    },
    heroTitleAccent: {
        background: 'linear-gradient(90deg, #FFD37A 0%, #FFF3C4 45%, #FFD37A 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    heroSub: {
        margin: '20px auto 0',
        maxWidth: 720,
        fontSize: 16.5,
        lineHeight: 1.7,
        color: 'rgba(255,255,255,0.94)',
        textShadow: '0 2px 12px rgba(0,0,0,0.35)',
    },
    heroCtas: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
    },
    heroCta: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '14px 28px',
        borderRadius: 14,
        border: 'none',
        background: `linear-gradient(135deg, ${BRAND.coral} 0%, ${BRAND.coralLight} 60%, ${BRAND.gold} 130%)`,
        color: '#fff',
        fontWeight: 900,
        fontSize: 15.5,
        cursor: 'pointer',
        letterSpacing: 0.4,
        boxShadow: '0 18px 38px -16px rgba(255,107,53,0.7)',
        textShadow: '0 2px 6px rgba(0,0,0,0.25)',
    },
    heroPills: {
        marginTop: 26,
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    pill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 18px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.22)',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 0.4,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: '#fff',
    },
    pillDot: {
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#D4AF37',
        boxShadow: '0 0 0 3px rgba(212,175,55,0.25)',
    },

    /* Popular Routes */
    prSection: {
        padding: '80px 0',
        background:
            'radial-gradient(60% 40% at 50% 0%, rgba(255,107,53,0.06), transparent), linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
    },
    prInner: { maxWidth: 1200, margin: '0 auto', padding: '0 20px' },
    prHeader: { textAlign: 'center', marginBottom: 44 },
    prChip: {
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
    prTitle: {
        margin: '0 0 12px',
        fontSize: 'clamp(26px, 4vw, 42px)',
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -1,
    },
    prSub: {
        margin: 0,
        maxWidth: 640,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 15.5,
        lineHeight: 1.65,
        color: '#475569',
    },
    prGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 22,
    },
    prCard: {
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
    prImageWrap: { position: 'relative', height: 180, overflow: 'hidden' },
    prImage: { width: '100%', height: '100%', objectFit: 'cover' },
    prImageOverlay: {
        position: 'absolute',
        inset: 0,
        background:
            'linear-gradient(180deg, rgba(2,6,23,0.05) 0%, rgba(2,6,23,0.55) 100%)',
    },
    prBadge: {
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
    prPricePill: {
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
    prBody: {
        padding: '16px 18px 18px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    prRouteRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 14,
    },
    prRouteCity: { display: 'flex', flexDirection: 'column', minWidth: 0 },
    prCityName: {
        fontSize: 14.5,
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -0.2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    prCityCode: {
        fontSize: 11,
        fontWeight: 700,
        color: '#94a3b8',
        letterSpacing: 1.4,
        marginTop: 2,
    },
    prRouteArrow: {
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
    prCta: {
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

    /* Safari showcase */
    safariSection: {
        padding: '80px 0',
        background:
            'radial-gradient(60% 40% at 50% 0%, rgba(255,107,53,0.08), transparent), linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
    },
    safariSectionInner: { maxWidth: 1200, margin: '0 auto', padding: '0 20px' },
    safariHeader: { textAlign: 'center', marginBottom: 44 },
    safariChip: {
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
    safariTitle: {
        margin: '0 0 12px',
        fontSize: 'clamp(26px, 4vw, 42px)',
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -1,
    },
    safariSub: {
        margin: 0,
        maxWidth: 640,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 15.5,
        lineHeight: 1.65,
        color: '#475569',
    },
    safariGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 22,
    },
    safariCard: {
        background: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 24px 60px -30px rgba(15,23,42,0.25)',
        border: '1px solid #eef2f7',
        display: 'flex',
        flexDirection: 'column',
    },
    safariImageWrap: { position: 'relative', height: 210, overflow: 'hidden' },
    safariImage: { width: '100%', height: '100%', objectFit: 'cover' },
    safariBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        color: '#fff',
        fontSize: 10.5,
        fontWeight: 900,
        letterSpacing: 1.2,
        padding: '5px 10px',
        borderRadius: 6,
        boxShadow: '0 6px 16px -8px rgba(0,0,0,0.5)',
    },
    safariBody: {
        padding: '18px 18px 20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    safariName: { margin: 0, fontSize: 17, fontWeight: 900, color: BRAND.slate },
    safariPark: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        margin: '6px 0 12px',
        fontSize: 13,
        color: '#64748b',
    },
    safariHighlights: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 16px',
        display: 'grid',
        gap: 6,
    },
    safariHighlightItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: '#334155',
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: BRAND.coral,
        boxShadow: '0 0 0 3px rgba(255,107,53,0.18)',
        flexShrink: 0,
    },
    safariMeta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTop: '1px solid #eef2f7',
        marginTop: 'auto',
    },
    safariDays: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        color: '#475569',
        fontWeight: 700,
    },
    safariPrice: { fontSize: 14, fontWeight: 900, color: BRAND.coral },
    safariCta: {
        marginTop: 14,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '11px 16px',
        borderRadius: 12,
        border: 'none',
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        color: '#fff',
        fontWeight: 800,
        fontSize: 13.5,
        cursor: 'pointer',
        boxShadow: '0 14px 30px -14px rgba(255,107,53,0.7)',
        transition: 'transform 0.15s',
    },

    /* Festive Countdown */
    fcWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        padding: '26px 22px',
        borderRadius: 18,
        background: `linear-gradient(135deg, ${BRAND.cream}, #FFFDF7)`,
        border: `1px dashed ${BRAND.gold}`,
    },
    fcHeader: { textAlign: 'center' },
    fcHeading: {
        margin: 0,
        fontSize: 18,
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -0.3,
    },
    fcSubtext: {
        margin: '6px 0 0',
        fontSize: 13,
        color: '#64748b',
        fontWeight: 600,
    },
    fcBoxes: { display: 'inline-flex', alignItems: 'center', gap: 8 },
    fcBox: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 64,
        padding: '10px 12px',
        borderRadius: 12,
        background: '#ffffff',
        border: '1.5px solid #eef2f7',
        boxShadow: '0 12px 26px -16px rgba(15,23,42,0.35)',
    },
    fcBoxValue: {
        fontSize: 24,
        fontWeight: 900,
        color: BRAND.coral,
        letterSpacing: -0.5,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.1,
    },
    fcBoxLabel: {
        marginTop: 4,
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        color: '#94a3b8',
    },
    fcColon: {
        fontSize: 22,
        fontWeight: 900,
        color: BRAND.gold,
        lineHeight: 1,
        paddingBottom: 14,
    },
    fcExpiredPill: {
        padding: '8px 16px',
        borderRadius: 999,
        background: '#f1f5f9',
        color: '#64748b',
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: 0.5,
    },

    /* Why us */
    whySection: {
        padding: '80px 0',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
    },
    whyInner: { maxWidth: 1200, margin: '0 auto', padding: '0 20px' },
    whyHead: { textAlign: 'center', marginBottom: 40 },
    whyChip: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 999,
        background: 'rgba(15,23,42,0.06)',
        color: BRAND.slate,
        fontWeight: 800,
        fontSize: 12.5,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 14,
    },
    whyTitle: {
        margin: 0,
        fontSize: 'clamp(26px, 4vw, 40px)',
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -1,
    },
    whyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: 20,
    },
    whyCard: {
        background: '#fff',
        padding: '26px 22px',
        borderRadius: 18,
        border: '1px solid #eef2f7',
        boxShadow: '0 20px 50px -32px rgba(15,23,42,0.25)',
    },
    whyIconWrap: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 46,
        height: 46,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        marginBottom: 14,
        boxShadow: '0 12px 26px -14px rgba(255,107,53,0.75)',
    },
    whyCardTitle: {
        margin: '0 0 6px',
        fontSize: 15.5,
        fontWeight: 900,
        color: BRAND.slate,
    },
    whyCardDesc: { margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.6 },

    /* Contact strip */
    contactStrip: {
        padding: '60px 0',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #334155 100%)',
        color: '#fff',
    },
    contactInner: {
        maxWidth: 1080,
        margin: '0 auto',
        padding: '0 22px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
    },
    contactTitle: {
        margin: '0 0 6px',
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: -0.4,
    },
    contactSub: { margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.75)' },
    contactActions: { display: 'flex', gap: 10, flexWrap: 'wrap' },
    contactBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 20px',
        borderRadius: 12,
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        color: '#fff',
        fontWeight: 800,
        fontSize: 14,
        textDecoration: 'none',
        boxShadow: '0 14px 30px -14px rgba(255,107,53,0.75)',
    },
    contactBtnGhost: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 20px',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.08)',
        border: '1.5px solid rgba(255,255,255,0.25)',
        color: '#fff',
        fontWeight: 800,
        fontSize: 14,
        textDecoration: 'none',
    },
};

export default AirTravel;