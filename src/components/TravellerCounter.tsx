import * as React from 'react';
import { UserGroupIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

/* ─────────── Brand palette ─────────── */
const BRAND = {
    coral: '#FF6B35',
    coralLight: '#FF8B35',
    slate: '#0F172A',
    gold: '#D4AF37',
    cream: '#FFF8E7',
};

/* ─────────── Types ─────────── */
export interface TravellerCounts {
    adults: number;   // 12+
    children: number; // 2–11
    infants: number;  // 0–1
}

export interface TravellerCounterProps {
    value: TravellerCounts;
    onChange: (next: TravellerCounts) => void;
    /** Disable all interactions while submitting. */
    disabled?: boolean;
    /** Optional max total travellers (default 9 per booking). */
    maxTotal?: number;
}

const DEFAULT_MAX_TOTAL = 9;

/* ─────────── Counter row component ─────────── */
const CounterRow: React.FC<{
    label: string;
    hint: string;
    value: number;
    min: number;
    max: number;
    disabled?: boolean;
    onInc: () => void;
    onDec: () => void;
}> = ({ label, hint, value, min, max, disabled, onInc, onDec }) => {
    const canDec = !disabled && value > min;
    const canInc = !disabled && value < max;

    return (
        <div style={styles.row}>
            <div style={styles.rowInfo}>
                <span style={styles.rowLabel}>{label}</span>
                <span style={styles.rowHint}>{hint}</span>
            </div>
            <div style={styles.rowControls}>
                <button
                    type="button"
                    onClick={onDec}
                    disabled={!canDec}
                    aria-label={`Remove one ${label.toLowerCase()}`}
                    style={{
                        ...styles.stepBtn,
                        ...(canDec ? {} : styles.stepBtnDisabled),
                    }}
                >
                    <MinusIcon className="h-4 w-4" />
                </button>
                <span style={styles.rowValue}>{value}</span>
                <button
                    type="button"
                    onClick={onInc}
                    disabled={!canInc}
                    aria-label={`Add one ${label.toLowerCase()}`}
                    style={{
                        ...styles.stepBtn,
                        ...(canInc ? {} : styles.stepBtnDisabled),
                    }}
                >
                    <PlusIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════ */
const TravellerCounter: React.FC<TravellerCounterProps> = ({
    value,
    onChange,
    disabled = false,
    maxTotal = DEFAULT_MAX_TOTAL,
}) => {
    const total = value.adults + value.children + value.infants;

    const update = (patch: Partial<TravellerCounts>) => {
        const next: TravellerCounts = { ...value, ...patch };

        // Clamp: adults at least 1
        if (next.adults < 1) next.adults = 1;

        // Enforce total cap
        const nextTotal = next.adults + next.children + next.infants;
        if (nextTotal > maxTotal) {
            // Roll back the field that was just incremented
            if (patch.adults !== undefined) next.adults = value.adults;
            if (patch.children !== undefined) next.children = value.children;
            if (patch.infants !== undefined) next.infants = value.infants;
        }

        onChange(next);
    };

    const maxAdults = maxTotal;
    const maxChildren = Math.max(0, maxTotal - value.adults - value.infants);
    const maxInfants = Math.max(0, maxTotal - value.adults - value.children);

    return (
        <div style={styles.wrap} className="tc-wrap">
            <div style={styles.header}>
                <div style={styles.headerIcon}>
                    <UserGroupIcon className="h-5 w-5" />
                </div>
                <div>
                    <h3 style={styles.title}>Travellers</h3>
                    <p style={styles.sub}>
                        {total} {total === 1 ? 'traveller' : 'travellers'} · max {maxTotal} per enquiry
                    </p>
                </div>
            </div>

            <div style={styles.rows}>
                <CounterRow
                    label="Adults"
                    hint="12 years and above"
                    value={value.adults}
                    min={1}
                    max={maxAdults}
                    disabled={disabled}
                    onInc={() => update({ adults: value.adults + 1 })}
                    onDec={() => update({ adults: value.adults - 1 })}
                />
                <CounterRow
                    label="Children"
                    hint="2–11 years"
                    value={value.children}
                    min={0}
                    max={maxChildren}
                    disabled={disabled}
                    onInc={() => update({ children: value.children + 1 })}
                    onDec={() => update({ children: value.children - 1 })}
                />
                <CounterRow
                    label="Infants"
                    hint="Under 2 years"
                    value={value.infants}
                    min={0}
                    max={maxInfants}
                    disabled={disabled}
                    onInc={() => update({ infants: value.infants + 1 })}
                    onDec={() => update({ infants: value.infants - 1 })}
                />
            </div>

            {total >= maxTotal && (
                <p style={styles.note}>
                    Maximum {maxTotal} travellers per enquiry. For larger groups, call us on{' '}
                    <a href="tel:+254705336311" style={styles.noteLink}>
                        +254 (705) 336 311
                    </a>
                    .
                </p>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════ */
const styles: { [k: string]: React.CSSProperties } = {
    wrap: {
        background: '#F8FAFC',
        border: '1.5px solid #eef2f7',
        borderRadius: 16,
        padding: '18px 20px',
        fontFamily: 'Inter, Arial, sans-serif',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 14,
        borderBottom: '1px solid #eef2f7',
        marginBottom: 6,
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralLight})`,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 10px 22px -14px rgba(255,107,53,0.75)',
    },
    title: {
        margin: 0,
        fontSize: 16,
        fontWeight: 900,
        color: BRAND.slate,
        letterSpacing: -0.2,
    },
    sub: {
        margin: '2px 0 0',
        fontSize: 12.5,
        color: '#64748b',
        fontWeight: 600,
    },
    rows: { display: 'flex', flexDirection: 'column' },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '14px 0',
        borderBottom: '1px dashed #e2e8f0',
    },
    rowInfo: { display: 'flex', flexDirection: 'column', minWidth: 0 },
    rowLabel: { fontSize: 14.5, fontWeight: 800, color: BRAND.slate },
    rowHint: { fontSize: 12, color: '#94a3b8', marginTop: 2, fontWeight: 600 },
    rowControls: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
    },
    stepBtn: {
        width: 34,
        height: 34,
        borderRadius: 10,
        border: `1.5px solid ${BRAND.coral}`,
        background: '#fff',
        color: BRAND.coral,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        padding: 0,
    },
    stepBtnDisabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        borderColor: '#cbd5e1',
        color: '#94a3b8',
    },
    rowValue: {
        minWidth: 32,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 900,
        color: BRAND.slate,
        fontVariantNumeric: 'tabular-nums',
    },
    note: {
        margin: '14px 0 0',
        padding: '10px 12px',
        fontSize: 12.5,
        color: '#7c5a00',
        background: BRAND.cream,
        border: `1px dashed ${BRAND.gold}`,
        borderRadius: 10,
        lineHeight: 1.5,
    },
    noteLink: {
        color: BRAND.coral,
        fontWeight: 800,
        textDecoration: 'none',
    },
};

export default TravellerCounter;