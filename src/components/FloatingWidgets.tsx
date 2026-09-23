import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ChatBubbleLeftRightIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    PencilSquareIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

const WHATSAPP_NUMBER = '254705336311';
const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hello Vision Wan! I'd like to inquire about your car hire and accommodation services."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/* ─────────────────────────────────────────────────────────────
   Auto-reply messages that cycle if the user doesn't get a reply
   ───────────────────────────────────────────────────────────── */
const AUTO_REPLIES = [
    {
        delay: 120000, // 2 minutes
        message:
            "👋 Hi there! Thanks for reaching out to Vision Wan Services. Our team will respond shortly. In the meantime, feel free to browse our fleet or make a booking — we're available 24/7.",
    },
];

const FloatingWidgets: React.FC = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [autoReplyShown, setAutoReplyShown] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const autoReplyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* Show a small "pulse" hint after 5 seconds to attract attention */
    const [showHint, setShowHint] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setShowHint(true), 5000);
        return () => clearTimeout(t);
    }, []);

    /* Auto-reply logic: when the user sends a message, start a 2-min timer.
       If we haven't been "replied to" (simulated), show the auto-reply. */
    useEffect(() => {
        if (messageSent && !autoReplyShown) {
            autoReplyTimer.current = setTimeout(() => {
                setAutoReplyShown(true);
            }, AUTO_REPLIES[0].delay);
        }
        return () => {
            if (autoReplyTimer.current) clearTimeout(autoReplyTimer.current);
        };
    }, [messageSent, autoReplyShown]);

    const handleSend = () => {
        setMessageSent(true);
        // Also open WhatsApp in a new tab so the user can chat live
        window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            {/* ─────────── Floating Blob Container ─────────── */}
            <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[80] flex flex-col items-end gap-3 pointer-events-none">
                {/* Feedback panel (opens above) */}
                {feedbackOpen && (
                    <div className="pointer-events-auto mb-2 w-[300px] sm:w-[340px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden animate-[fadeUp_0.25s_ease-out]">
                        <div className="relative bg-gradient-to-br from-[#FF6B35] to-[#E85A25] px-5 py-4 text-white">
                            <button
                                onClick={() => setFeedbackOpen(false)}
                                className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition"
                                aria-label="Close feedback panel"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                            <div className="flex items-center gap-2.5">
                                <PencilSquareIcon className="h-6 w-6" />
                                <div>
                                    <h4 className="font-bold text-sm tracking-tight">
                                        Share Your Feedback
                                    </h4>
                                    <p className="text-[11px] text-white/85">
                                        Help us improve — takes under a minute
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 space-y-3">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Tell us about your experience with Vision Wan Services.
                                Your feedback helps us serve you better.
                            </p>
                            <Link
                                to="/feedback"
                                onClick={() => setFeedbackOpen(false)}
                                className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl
                                           bg-gradient-to-br from-[#FF6B35] to-[#E85A25] text-white font-semibold
                                           shadow-[0_8px_22px_-8px_rgba(255,107,53,0.65)]
                                           hover:shadow-[0_12px_30px_-8px_rgba(255,107,53,0.85)]
                                           transition-all duration-300 active:scale-[0.98]"
                            >
                                <span>Open Feedback Form</span>
                                <svg
                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Chat panel (opens above) */}
                {chatOpen && (
                    <div className="pointer-events-auto mb-2 w-[310px] sm:w-[360px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden animate-[fadeUp_0.25s_ease-out]">
                        {/* Header */}
                        <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] px-5 py-4 text-white">
                            <button
                                onClick={() => {
                                    setChatOpen(false);
                                    setAutoReplyShown(false);
                                    setMessageSent(false);
                                }}
                                className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition"
                                aria-label="Close chat"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-300 border-2 border-[#25D366]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm tracking-tight">
                                        Vision Wan Support
                                    </h4>
                                    <p className="text-[11px] text-white/85 flex items-center gap-1.5">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                                        Online — replies in minutes
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5 space-y-3 max-h-[260px] overflow-y-auto">
                            {/* Initial greeting bubble */}
                            <div className="flex items-start gap-2">
                                <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        👋 Hi! Welcome to <strong>Vision Wan Services</strong>.
                                        How can we help you today?
                                    </p>
                                </div>
                            </div>

                            {/* Auto-reply bubble */}
                            {autoReplyShown && (
                                <div className="flex items-start gap-2 animate-[fadeUp_0.3s_ease-out]">
                                    <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {AUTO_REPLIES[0].message}
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-1.5">
                                            Auto-reply · Just now
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Success message after sending */}
                            {messageSent && !autoReplyShown && (
                                <div className="flex items-start gap-2 animate-[fadeUp_0.3s_ease-out]">
                                    <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
                                        <p className="text-sm text-emerald-800 flex items-center gap-2">
                                            <CheckCircleIcon className="h-4 w-4 flex-shrink-0" />
                                            Message sent! We'll reply within 2 minutes.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-100 p-3 bg-gray-50">
                            <button
                                onClick={handleSend}
                                className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl
                                           bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white font-semibold
                                           shadow-[0_8px_22px_-8px_rgba(37,211,102,0.65)]
                                           hover:shadow-[0_12px_30px_-8px_rgba(37,211,102,0.85)]
                                           transition-all duration-300 active:scale-[0.98]"
                            >
                                <PaperAirplaneIcon className="h-4 w-4" />
                                <span>Continue on WhatsApp</span>
                            </button>
                            <p className="text-[10px] text-center text-gray-400 mt-2">
                                Opens WhatsApp in a new tab
                            </p>
                        </div>
                    </div>
                )}

                {/* ─────────── Action Blobs ─────────── */}
                <div className="pointer-events-auto flex flex-col items-end gap-3">
                    {/* Feedback blob */}
                    <button
                        onClick={() => {
                            setFeedbackOpen((v) => !v);
                            setChatOpen(false);
                        }}
                        aria-label="Give feedback"
                        className="group relative flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full
                                   bg-gradient-to-br from-[#FF6B35] to-[#E85A25] text-white
                                   shadow-[0_10px_30px_-8px_rgba(255,107,53,0.65)]
                                   hover:shadow-[0_16px_40px_-8px_rgba(255,107,53,0.85)]
                                   transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                        <PencilSquareIcon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-6" />

                        {/* Tooltip on hover (desktop) */}
                        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Give Feedback
                        </span>
                    </button>

                    {/* WhatsApp blob */}
                    <button
                        onClick={() => {
                            setChatOpen((v) => !v);
                            setFeedbackOpen(false);
                            if (!chatOpen && !messageSent) {
                                // Optional: auto-start chat greeting
                            }
                        }}
                        aria-label="Chat on WhatsApp"
                        className="group relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full
                                   bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white
                                   shadow-[0_12px_35px_-8px_rgba(37,211,102,0.7)]
                                   hover:shadow-[0_18px_45px_-8px_rgba(37,211,102,0.9)]
                                   transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                        {/* Pulsing ring to attract attention */}
                        {showHint && !chatOpen && (
                            <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
                        )}

                        <ChatBubbleLeftRightIcon className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:scale-110" />

                        {/* Notification dot */}
                        {!chatOpen && (
                            <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white shadow-md" />
                        )}

                        {/* Tooltip on hover (desktop) */}
                        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Chat with us
                        </span>
                    </button>
                </div>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default FloatingWidgets;