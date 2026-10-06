import * as React from 'react';
import FestiveBookingForm from '../components/FestiveBookingForm';
import { getFestiveYear } from '../config/festiveRates';

const FestiveBookingPage: React.FC = () => {
    const year = getFestiveYear();

    return (
        <div style={pageStyles.page}>
            {/* ───────────── HERO ───────────── */}
            <div className="festive-hero" style={pageStyles.hero}>
                {/* Background image */}
                <div style={pageStyles.heroImageLayer} aria-hidden>
                    <img
                        src="/assets/festive.jpg"
                        alt=""
                        style={pageStyles.heroImage}
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>

                {/* Overlays for readability */}
                <div style={pageStyles.heroOverlayA} aria-hidden />
                <div style={pageStyles.heroOverlayB} aria-hidden />
                <div style={pageStyles.heroGlow} aria-hidden />

                {/* Content */}
                <div className="festive-hero-inner" style={pageStyles.heroInner}>
                    <h1 className="festive-headline" style={pageStyles.headline}>
                        Christmas {year}{' '}
                        <span style={pageStyles.headlineAccent}>Festive Offers</span>
                    </h1>

                    <p className="festive-sub" style={pageStyles.sub}>
                        Book any day between{' '}
                        <strong style={pageStyles.subStrong}>
                            December 1 – 31, {year}
                        </strong>{' '}
                        and lock in our seasonal rates. Fielder, Mazda CX5, Harrier, Lexus
                        and Prado — all at festive prices.
                    </p>

                    <div className="festive-pill-row" style={pageStyles.pillRow}>
                        <Pill text="Special rates" />
                        <Pill text="December only" />
                        <Pill text="Premium fleet" />
                    </div>
                </div>
            </div>

            {/* ───────────── FORM ───────────── */}
            <div className="festive-body" style={pageStyles.body}>
                <FestiveBookingForm />
            </div>

            {/* Component-scoped keyframes */}
            <style>{`
                @keyframes festiveFloatIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Push hero content well below a fixed navbar + respect iOS safe area */
                .festive-hero-inner {
                    padding-top: max(160px, env(safe-area-inset-top) + 140px) !important;
                }

                @media (max-width: 640px) {
                    .festive-hero-inner {
                        padding-top: max(140px, env(safe-area-inset-top) + 120px) !important;
                        padding-bottom: 100px !important;
                    }
                    .festive-headline {
                        font-size: clamp(26px, 7vw, 40px) !important;
                    }
                    .festive-sub {
                        font-size: 14.5px !important;
                    }
                    .festive-body {
                        margin-top: -28px !important;
                        padding: 0 14px 48px !important;
                    }
                }

                @media (min-width: 1440px) {
                    .festive-headline {
                        font-size: 60px !important;
                    }
                    .festive-hero-inner {
                        padding-top: max(180px, env(safe-area-inset-top) + 160px) !important;
                    }
                }
            `}</style>
        </div>
    );
};

/* ───────────── Pill (clean, no emoji) ───────────── */
const Pill: React.FC<{ text: string }> = ({ text }) => (
    <span style={pageStyles.pill}>
        <span style={pageStyles.pillDot} aria-hidden />
        {text}
    </span>
);

/* ───────────── Styles ───────────── */
const pageStyles: { [k: string]: React.CSSProperties } = {
    page: {
        minHeight: '100vh',
        background:
            'linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 40%, #F6FBFF 100%)',
    },

    /* ── HERO ── */
    hero: {
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        isolation: 'isolate',
    },
    heroImageLayer: {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
    },
    heroImage: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 40%',
        filter: 'saturate(1.05) contrast(1.02)',
        transform: 'scale(1.04)',
    },
    heroOverlayA: {
        position: 'absolute',
        inset: 0,
        background:
            'linear-gradient(180deg, rgba(10,10,26,0.72) 0%, rgba(10,10,26,0.55) 40%, rgba(10,10,26,0.78) 100%)',
        zIndex: 1,
    },
    heroOverlayB: {
        position: 'absolute',
        inset: 0,
        background:
            'linear-gradient(120deg, rgba(11,110,79,0.55) 0%, rgba(11,110,79,0.15) 40%, rgba(200,16,46,0.55) 100%)',
        mixBlendMode: 'multiply',
        zIndex: 1,
    },
    heroGlow: {
        position: 'absolute',
        inset: 0,
        background:
            'radial-gradient(60% 40% at 50% 0%, rgba(212,175,55,0.28), transparent), radial-gradient(50% 40% at 50% 100%, rgba(200,16,46,0.28), transparent)',
        pointerEvents: 'none',
        zIndex: 2,
    },

    heroInner: {
        position: 'relative',
        zIndex: 3,
        maxWidth: 1080,
        margin: '0 auto',
        textAlign: 'center',
        padding: '160px 22px 140px',
        animation: 'festiveFloatIn 0.7s ease-out both',
    },

    headline: {
        margin: 0,
        fontSize: 'clamp(30px, 5vw, 56px)',
        fontWeight: 900,
        letterSpacing: -1.2,
        lineHeight: 1.05,
        textShadow: '0 4px 24px rgba(0,0,0,0.45)',
    },
    headlineAccent: {
        background:
            'linear-gradient(90deg, #FFD37A 0%, #FFF3C4 45%, #FFD37A 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    sub: {
        margin: '20px auto 0',
        maxWidth: 720,
        fontSize: 16.5,
        lineHeight: 1.7,
        color: 'rgba(255,255,255,0.94)',
        fontWeight: 400,
        textShadow: '0 2px 12px rgba(0,0,0,0.35)',
    },
    subStrong: {
        color: '#FFE9A8',
        fontWeight: 700,
    },
    pillRow: {
        marginTop: 28,
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
        boxShadow: '0 8px 22px -12px rgba(0,0,0,0.5)',
    },
    pillDot: {
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#D4AF37',
        boxShadow: '0 0 0 3px rgba(212,175,55,0.25)',
    },

    /* ── BODY (form card overlaps hero) ── */
    body: {
        maxWidth: 1080,
        margin: '-58px auto 0',
        padding: '0 18px 64px',
        position: 'relative',
        zIndex: 4,
    },
};

export default FestiveBookingPage;