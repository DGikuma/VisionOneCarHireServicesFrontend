import * as React from 'react';
const { useEffect, useState, useCallback } = React;
import { getFestiveYear } from '../config/festiveRates';

interface Props {
    onBookNow?: () => void;
    storageKey?: string;
    openDelayMs?: number;
}

const FestivePopup: React.FC<Props> = ({
    onBookNow,
    storageKey = 'vw_festive_popup_v1',
    openDelayMs = 900,
}) => {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);
    const year = getFestiveYear();

    // Auto-show on mount
    useEffect(() => {
        let raf = 0;
        const t = window.setTimeout(() => {
            setMounted(true);
            raf = window.requestAnimationFrame(() => setVisible(true));
        }, openDelayMs);

        return () => {
            window.clearTimeout(t);
            if (raf) window.cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey]);

    // Lock body scroll while open
    useEffect(() => {
        if (!mounted) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [mounted]);

    const close = useCallback(() => {
        setVisible(false);
        window.setTimeout(() => setMounted(false), 280);
    }, []);

    // ESC to close
    useEffect(() => {
        if (!mounted) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [mounted, close]);

    const handleBook = () => {
        onBookNow?.();
        close();
    };

    if (!mounted) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`Christmas ${year} Festive Offers`}
            className="festive-popup-overlay"
            style={{
                ...S.overlay,
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
            }}
            onClick={close}
        >
            <div
                className="festive-flyer-wrap"
                style={{
                    ...S.flyerWrap,
                    transform: visible
                        ? 'translateY(0) scale(1)'
                        : 'translateY(22px) scale(0.94)',
                    opacity: visible ? 1 : 0,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Pulsating glow rings */}
                <span aria-hidden style={S.glowRing} />
                <span aria-hidden style={S.glowRingDelay} />

                {/* Full flyer image — natural aspect ratio, no cropping */}
                <div className="festive-flyer-area" style={S.flyerArea}>
                    {!imageFailed ? (
                        <img
                            src="/assets/festive-flyer.jpeg"
                            alt={`Christmas ${year} festive offers flyer`}
                            style={S.flyerImage}
                            onError={() => setImageFailed(true)}
                            draggable={false}
                        />
                    ) : (
                        <div style={S.flyerFallback} aria-hidden>
                            <div style={S.fallbackEmoji}>🎄</div>
                            <div style={S.fallbackTitle}>Christmas {year}</div>
                            <div style={S.fallbackSub}>Special Offers</div>
                            <div style={S.fallbackHint}>
                                Place your flyer at
                                <br />
                                <code style={S.code}>
                                    public/assets/festive-flyer.jpeg
                                </code>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA bar — sticky at bottom */}
                <div className="festive-cta-bar" style={S.ctaBar}>
                    <button
                        type="button"
                        onClick={handleBook}
                        style={S.ctaPrimary}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = 'translateY(-2px)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = 'translateY(0)')
                        }
                    >
                         Book Now →
                    </button>
                    <button
                        type="button"
                        onClick={close}
                        style={S.ctaGhost}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                                'rgba(255,255,255,0.18)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                                'rgba(255,255,255,0.08)')
                        }
                    >
                        Later
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes festivePulse {
                    0%   { box-shadow: 0 0 0 0 rgba(200,16,46,0.55), 0 0 0 0 rgba(212,175,55,0.45); }
                    70%  { box-shadow: 0 0 0 16px rgba(200,16,46,0), 0 0 0 26px rgba(212,175,55,0); }
                    100% { box-shadow: 0 0 0 0 rgba(200,16,46,0), 0 0 0 0 rgba(212,175,55,0); }
                }
                @keyframes cardBreathe {
                    0%,100% { transform: scale(1); }
                    50%     { transform: scale(1.005); }
                }

                .festive-popup-overlay {
                    padding-top: max(84px, env(safe-area-inset-top) + 72px) !important;
                    padding-bottom: max(24px, env(safe-area-inset-bottom) + 16px) !important;
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch;
                }

                .festive-flyer-wrap {
                    width: min(520px, 92vw) !important;
                    max-width: 92vw !important;
                }

                .festive-flyer-area {
                    display: block !important;
                    background: #0a0a12;
                }

                .festive-cta-bar {
                    position: sticky !important;
                    bottom: 0 !important;
                    z-index: 6;
                    backdrop-filter: blur(6px);
                }

                @media (max-width: 400px) {
                    .festive-popup-overlay {
                        padding-top: max(76px, env(safe-area-inset-top) + 64px) !important;
                    }
                    .festive-flyer-wrap {
                        width: 94vw !important;
                        border-radius: 16px !important;
                    }
                }

                @media (min-width: 1440px) {
                    .festive-flyer-wrap {
                        width: 560px !important;
                    }
                }
            `}</style>
        </div>
    );
};

/* ───────────── styles ───────────── */
const S: { [k: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
        background:
            'radial-gradient(60% 50% at 50% 30%, rgba(0,0,0,0.62), rgba(0,0,0,0.85))',
        backdropFilter: 'blur(3px)',
        transition: 'opacity 260ms ease',
    },
    flyerWrap: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 'min(520px, 92vw)',
        maxWidth: '92vw',
        borderRadius: 20,
        overflow: 'hidden',
        background: '#0a0a12',
        border: '2px solid #D4AF37',
        boxShadow:
            '0 30px 80px -20px rgba(200,16,46,0.55), 0 16px 36px -20px rgba(0,0,0,0.6)',
        transition:
            'transform 340ms cubic-bezier(.2,.9,.3,1.3), opacity 260ms ease',
        fontFamily: 'Inter, Arial, sans-serif',
        animation:
            'festivePulse 2.8s ease-out infinite, cardBreathe 4.5s ease-in-out infinite',
        marginTop: 'auto',
        marginBottom: 'auto',
        alignSelf: 'center',
    },
    glowRing: {
        position: 'absolute',
        inset: -2,
        borderRadius: 22,
        pointerEvents: 'none',
        boxShadow:
            '0 0 0 0 rgba(212,175,55,0.0), 0 0 40px 6px rgba(200,16,46,0.38)',
        zIndex: 2,
        animation: 'festivePulse 3s ease-out infinite',
    },
    glowRingDelay: {
        position: 'absolute',
        inset: -2,
        borderRadius: 22,
        pointerEvents: 'none',
        boxShadow:
            '0 0 0 0 rgba(212,175,55,0.0), 0 0 30px 4px rgba(11,110,79,0.30)',
        zIndex: 2,
        animation: 'festivePulse 3s ease-out 1.2s infinite',
    },
    flyerArea: {
        position: 'relative',
        flex: '0 0 auto',
        background: '#0a0a12',
        display: 'block',
    },
    flyerImage: {
        display: 'block',
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        userSelect: 'none',
        pointerEvents: 'none',
    },
    flyerFallback: {
        width: '100%',
        aspectRatio: '3 / 4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: 24,
        background:
            'linear-gradient(160deg, #0B6E4F, #064a34 55%, #C8102E 130%)',
    },
    fallbackEmoji: { fontSize: 52, lineHeight: 1, marginBottom: 10 },
    fallbackTitle: { fontSize: 20, fontWeight: 900, letterSpacing: 0.4 },
    fallbackSub: { fontSize: 12, opacity: 0.85, marginTop: 4, letterSpacing: 1 },
    fallbackHint: {
        fontSize: 10.5,
        opacity: 0.8,
        marginTop: 18,
        lineHeight: 1.6,
    },
    code: {
        background: 'rgba(0,0,0,0.35)',
        padding: '2px 8px',
        borderRadius: 6,
        fontSize: 10,
        fontFamily: 'ui-monospace, Menlo, monospace',
    },
    ctaBar: {
        display: 'flex',
        gap: 10,
        padding: '12px 14px',
        background:
            'linear-gradient(180deg, rgba(10,10,18,0.96) 0%, rgba(10,10,18,1) 100%)',
        borderTop: '1px solid rgba(212,175,55,0.5)',
        flexShrink: 0,
    },
    ctaPrimary: {
        flex: 1,
        padding: '12px 16px',
        borderRadius: 11,
        border: 'none',
        background:
            'linear-gradient(135deg, #C8102E, #8B0000 65%, #D4AF37 140%)',
        color: '#fff',
        fontSize: 14.5,
        fontWeight: 800,
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        boxShadow: '0 12px 26px -12px rgba(200,16,46,0.85)',
        letterSpacing: 0.3,
    },
    ctaGhost: {
        padding: '12px 18px',
        borderRadius: 11,
        border: '1.5px solid rgba(255,255,255,0.28)',
        background: 'rgba(255,255,255,0.08)',
        color: '#fff',
        fontSize: 13.5,
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'background 0.2s',
        letterSpacing: 0.2,
    },
};

export default FestivePopup;