import * as React from 'react';

/* ─────────── Brand palette ─────────── */
const BRAND = {
    coral: '#FF6B35',
    coralLight: '#FF8B35',
    slate: '#0F172A',
    gold: '#D4AF37',
    cream: '#FFF8E7',
};

export interface FestiveCountdownProps {
    /** Override the target date. Defaults to Dec 31, 23:59:59 of the current year. */
    targetDate?: Date;
    /** Optional heading. Default: "Festive offer ends in". */
    heading?: string;
    /** Optional subtext. Default: "Book any December date and lock in your rate." */
    subtext?: string;
    /** Hide the heading/subtext if embedding elsewhere. */
    compact?: boolean;
}

interface TimeParts {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
}

const getFestiveTarget = (): Date => {
    const year = new Date().getFullYear();
    return new Date(`${year}-12-31T23:59:59`);
};

const computeParts = (target: Date): TimeParts => {
    const now = Date.now();
    const diff = target.getTime() - now;

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, expired: false };
};

const pad = (n: number) => String(n).padStart(2, '0');

/* ═══════════════════════════════════════════════════════════════ */
const FestiveCountdown: React.FC<FestiveCountdownProps> = ({
    targetDate,
    heading = 'Festive offer ends in',
    subtext = 'Book any December date and lock in your rate.',
    compact = false,
}) => {
    const target = React.useMemo(
        () => targetDate ?? getFestiveTarget(),
        [targetDate]
    );
    const [parts, setParts] = React.useState<TimeParts>(() => computeParts(target));

    React.useEffect(() => {
        const t = window.setInterval(() => {
            setParts(computeParts(target));
        }, 1000);
        return () => window.clearInterval(t);
    }, [target]);

    if (parts.expired) {
        return (
            <div style={styles.wrap} className="fc-wrap">
                <div style={styles.expiredPill}>Festive offer has ended</div>
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
        <div
            style={compact ? styles.wrapCompact : styles.wrap}
            className="fc-wrap"
        >
            {!compact && (
                <div style={styles.header}>
                    <h3 style={styles.heading}>{heading}</h3>
                    <p style={styles.subtext}>{subtext}</p>
                </div>
            )}

            <div style={styles.boxes} className="fc-boxes">
                {boxes.map((b, i) => (
                    <React.Fragment key={b.label}>
                        <div style={styles.box}>
                            <span style={styles.boxValue}>{b.value}</span>
                            <span style={styles.boxLabel}>{b.label}</span>
                        </div>
                        {i < boxes.length - 1 && (
                            <span style={styles.colon}>:</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════ */
const styles: { [k: string]: React.CSSProperties } = {
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        padding: '26px 22px',
        borderRadius: 18,
        background: `linear-gradient(135deg, ${BRAND.cream}, #FFFDF7)`,
        border: `1px dashed ${BRAND.gold}`,
        fontFamily: 'Inter, Arial, sans-serif',
    },
    wrapCompact: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'Inter, Arial, sans-serif',
    },
    header: { textAlign: 'center' },
    heading: {
        margin: 0,
        fontSize: 18,
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -0.3,
    },
    subtext: {
        margin: '6px 0 0',
        fontSize: 13,
        color: '#64748b',
        fontWeight: 600,
    },
    boxes: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
    },
    box: {
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
    boxValue: {
        fontSize: 24,
        fontWeight: 900,
        color: BRAND.coral,
        letterSpacing: -0.5,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.1,
    },
    boxLabel: {
        marginTop: 4,
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        color: '#94a3b8',
    },
    colon: {
        fontSize: 22,
        fontWeight: 900,
        color: BRAND.gold,
        lineHeight: 1,
        paddingBottom: 14,
    },
    expiredPill: {
        padding: '8px 16px',
        borderRadius: 999,
        background: '#f1f5f9',
        color: '#64748b',
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: 0.5,
    },
};

export default FestiveCountdown;