import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ChatBubbleLeftRightIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    PaperClipIcon,
    DocumentIcon,
    TrashIcon,
    UserIcon,
    EnvelopeIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

/* ─────────────────────────────────────────────────────────────
   Config
   ───────────────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = '254705336311';
const LOGO_URL = '/assets/images/logo.png';

const DEFAULT_MESSAGE =
    "Hello Vision Wan! I'd like to inquire about your car hire and accommodation services.";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILES = 5;

const API_BASE =
    import.meta.env.VITE_BACKEND_URL ||
    'https://visiononecarhireservicesbackend-1.onrender.com';

const CHAT_UPLOAD_ENDPOINT = `${API_BASE}/api/chat-uploads`;

const AUTO_REPLY_DELAY = 120000; // 2 minutes
const AUTO_REPLY_TEXT =
    "👋 Hi there! Thanks for reaching out to Vision Wan Services. Our team will respond shortly. In the meantime, feel free to browse our fleet or make a booking — we're available 24/7.";

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */
interface AttachedFile {
    id: string;
    file: File;
    previewUrl: string;
    isImage: boolean;
}

type Status = 'idle' | 'uploading' | 'success' | 'error';

/* ─────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────── */
const FloatingWidgets: React.FC = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);

    /* Chat state */
    const [userMessage, setUserMessage] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);

    /* Flow state */
    const [status, setStatus] = useState<Status>('idle');
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [autoReplyShown, setAutoReplyShown] = useState(false);
    const [showContactFields, setShowContactFields] = useState(false);

    /* Refs */
    const autoReplyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    /* Show pulse hint after 5s to attract attention */
    const [showHint, setShowHint] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setShowHint(true), 5000);
        return () => clearTimeout(t);
    }, []);

    /* Auto-focus the textarea when chat opens */
    useEffect(() => {
        if (chatOpen && textareaRef.current) {
            const t = setTimeout(() => textareaRef.current?.focus(), 150);
            return () => clearTimeout(t);
        }
    }, [chatOpen]);

    /* Auto-reply logic — trigger after successful send */
    useEffect(() => {
        if (status === 'success' && !autoReplyShown) {
            autoReplyTimer.current = setTimeout(() => {
                setAutoReplyShown(true);
            }, AUTO_REPLY_DELAY);
        }
        return () => {
            if (autoReplyTimer.current) clearTimeout(autoReplyTimer.current);
        };
    }, [status, autoReplyShown]);

    /* Cleanup preview URLs on unmount */
    useEffect(() => {
        return () => {
            attachedFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ───── File handlers ───── */
    const handleFileSelect = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setFileError(null);

        const incoming = Array.from(files);
        const remainingSlots = MAX_FILES - attachedFiles.length;

        if (remainingSlots <= 0) {
            setFileError(`You can attach up to ${MAX_FILES} files.`);
            return;
        }

        const accepted: AttachedFile[] = [];
        const rejected: string[] = [];

        for (const file of incoming.slice(0, remainingSlots)) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                rejected.push(file.name);
                continue;
            }
            accepted.push({
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                file,
                previewUrl: URL.createObjectURL(file),
                isImage: file.type.startsWith('image/'),
            });
        }

        if (rejected.length > 0) {
            setFileError(
                `Too large (max ${MAX_FILE_SIZE_MB} MB): ${rejected.join(', ')}`
            );
        }

        if (accepted.length > 0) {
            setAttachedFiles((prev) => [...prev, ...accepted]);
        }
    };

    const removeFile = (id: string) => {
        setAttachedFiles((prev) => {
            const target = prev.find((f) => f.id === id);
            if (target) URL.revokeObjectURL(target.previewUrl);
            return prev.filter((f) => f.id !== id);
        });
    };

    const clearAllFiles = () => {
        attachedFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
        setAttachedFiles([]);
        setFileError(null);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    /* ───── Validation ───── */
    const validateBeforeSend = (): string | null => {
        if (!senderName.trim()) return 'Please enter your name.';
        if (!senderEmail.trim()) return 'Please enter your email.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
            return 'Please enter a valid email address.';
        }
        if (!userMessage.trim() && attachedFiles.length === 0) {
            return 'Please type a message or attach at least one file.';
        }
        return null;
    };

    /* ───── Send ───── */
    const handleSend = async () => {
        if (status === 'uploading') return;

        /* If user hasn't provided contact info yet, reveal the fields */
        if (!senderName.trim() || !senderEmail.trim()) {
            setShowContactFields(true);
            setStatusMessage('Please add your name and email so we can follow up.');
            return;
        }

        const validationError = validateBeforeSend();
        if (validationError) {
            setStatusMessage(validationError);
            return;
        }

        setStatusMessage(null);
        setFileError(null);

        const finalMessage = userMessage.trim() || DEFAULT_MESSAGE;
        let referenceId: string | null = null;

        /* ───── Step 1: Upload files if any ───── */
        if (attachedFiles.length > 0) {
            setStatus('uploading');

            try {
                const formData = new FormData();
                formData.append('name', senderName.trim());
                formData.append('email', senderEmail.trim().toLowerCase());
                formData.append('message', finalMessage);
                attachedFiles.forEach((f) => formData.append('files', f.file));

                const res = await fetch(CHAT_UPLOAD_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok || !data.success) {
                    throw new Error(
                        data?.message || `Upload failed (${res.status})`
                    );
                }

                referenceId = data.referenceId ?? null;
            } catch (err) {
                console.error('File upload failed:', err);
                setStatus('error');
                setStatusMessage(
                    "We couldn't upload your files. Please try again or send them directly on WhatsApp."
                );
                return;
            }
        }

        /* ───── Step 2: Open WhatsApp with the message ───── */
        const baseText = finalMessage;
        const fullMessage = referenceId
            ? `${baseText}\n\n📎 Files uploaded — Ref: ${referenceId}\nOur team has received your files.`
            : baseText;

        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            fullMessage
        )}`;

        window.open(whatsappLink, '_blank', 'noopener,noreferrer');

        setStatus('success');
        setStatusMessage(
            referenceId
                ? `Files uploaded (Ref: ${referenceId}). Continue in WhatsApp to send your message.`
                : "Message ready in WhatsApp — tap Send to deliver it."
        );
    };

    /* ───── Reset on close ───── */
    const handleCloseChat = () => {
        setChatOpen(false);
        setStatus('idle');
        setStatusMessage(null);
        setAutoReplyShown(false);
        setUserMessage('');
        setSenderName('');
        setSenderEmail('');
        setShowContactFields(false);
        setFileError(null);
        attachedFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
        setAttachedFiles([]);
    };

    const hasContent = userMessage.trim().length > 0 || attachedFiles.length > 0;
    const isUploading = status === 'uploading';
    const isSuccess = status === 'success';

    return (
        <>
            {/* ─────────── Floating Blob Container ─────────── */}
            <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[80] flex flex-col items-end gap-3 pointer-events-none">
                {/* Feedback panel */}
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

                {/* ─────────── Chat panel ─────────── */}
                {chatOpen && (
                    <div className="pointer-events-auto mb-2 w-[330px] sm:w-[400px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden animate-[fadeUp_0.25s_ease-out] flex flex-col max-h-[85vh]">

                        {/* Header — LOGO */}
                        <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] px-5 py-4 text-white flex-shrink-0">
                            <button
                                onClick={handleCloseChat}
                                className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition"
                                aria-label="Close chat"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="relative flex-shrink-0">
                                    <div className="h-11 w-11 rounded-full bg-white p-1 shadow-md ring-2 ring-white/40">
                                        <img
                                            src={LOGO_URL}
                                            alt="Vision Wan Services logo"
                                            className="h-full w-full object-contain rounded-full"
                                        />
                                    </div>
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-300 border-2 border-[#25D366]" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-sm tracking-tight truncate">
                                        Vision Wan Services
                                    </h4>
                                    <p className="text-[11px] text-white/85 flex items-center gap-1.5">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse flex-shrink-0" />
                                        Online — replies in minutes
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body — conversation bubbles */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-3 min-h-[160px] max-h-[280px]">
                            {/* Greeting */}
                            <div className="flex items-start gap-2">
                                <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        👋 Hi! Welcome to <strong>Vision Wan Services</strong>.
                                        How can we help you today? Feel free to attach
                                        any documents you'd like to share.
                                    </p>
                                </div>
                            </div>

                            {/* Auto-reply */}
                            {autoReplyShown && (
                                <div className="flex items-start gap-2 animate-[fadeUp_0.3s_ease-out]">
                                    <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {AUTO_REPLY_TEXT}
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-1.5">
                                            Auto-reply · Just now
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* User's typed message preview */}
                            {userMessage.trim() && !isSuccess && (
                                <div className="flex items-start gap-2 justify-end animate-[fadeUp_0.3s_ease-out]">
                                    <div className="max-w-[85%] bg-[#25D366] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                            {userMessage.trim()}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Attached files preview */}
                            {attachedFiles.length > 0 && !isSuccess && (
                                <div className="flex flex-col items-end gap-2 animate-[fadeUp_0.3s_ease-out]">
                                    {attachedFiles.map((f) => (
                                        <div
                                            key={f.id}
                                            className="max-w-[85%] bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-2 shadow-sm"
                                        >
                                            {f.isImage ? (
                                                <img
                                                    src={f.previewUrl}
                                                    alt={f.file.name}
                                                    className="max-w-[200px] max-h-[200px] rounded-xl object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 px-2 py-1.5">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 flex-shrink-0">
                                                        <DocumentIcon className="h-5 w-5 text-gray-700" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-semibold text-gray-800 truncate max-w-[160px]">
                                                            {f.file.name}
                                                        </p>
                                                        <p className="text-[10px] text-gray-600">
                                                            {formatFileSize(f.file.size)}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <p className="text-[10px] text-gray-600 text-right mt-1 px-1">
                                                Ready to upload
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Success message */}
                            {isSuccess && statusMessage && (
                                <div className="flex items-start gap-2 animate-[fadeUp_0.3s_ease-out]">
                                    <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
                                        <p className="text-sm text-emerald-800 flex items-start gap-2">
                                            <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                            <span>{statusMessage}</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-100 bg-gray-50 flex-shrink-0">
                            {/* Attached file chips */}
                            {attachedFiles.length > 0 && !isSuccess && (
                                <div className="px-3 pt-3 flex flex-wrap gap-2">
                                    {attachedFiles.map((f) => (
                                        <div
                                            key={f.id}
                                            className="group relative flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-1.5 shadow-sm max-w-[190px]"
                                        >
                                            {f.isImage ? (
                                                <img
                                                    src={f.previewUrl}
                                                    alt={f.file.name}
                                                    className="h-8 w-8 rounded object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-50 flex-shrink-0">
                                                    <DocumentIcon className="h-4 w-4 text-[#FF6B35]" />
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[11px] font-semibold text-gray-800 truncate">
                                                    {f.file.name}
                                                </p>
                                                <p className="text-[9px] text-gray-500">
                                                    {formatFileSize(f.file.size)}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(f.id)}
                                                aria-label={`Remove ${f.file.name}`}
                                                className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 flex items-center justify-center transition-colors"
                                            >
                                                <XMarkIcon className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}

                                    {attachedFiles.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={clearAllFiles}
                                            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <TrashIcon className="h-3.5 w-3.5" />
                                            Clear all
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Error banner */}
                            {fileError && (
                                <div className="mx-3 mt-2 flex items-start gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-100">
                                    <ExclamationCircleIcon className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-red-700 font-medium">
                                        {fileError}
                                    </p>
                                </div>
                            )}

                            {/* Contact info (revealed when sending without them) */}
                            {showContactFields && !isSuccess && (
                                <div className="px-3 pt-3 space-y-2 animate-[fadeUp_0.25s_ease-out]">
                                    <p className="text-[11px] font-semibold text-gray-700 flex items-center gap-1.5">
                                        <UserIcon className="h-3.5 w-3.5 text-[#25D366]" />
                                        We'll use these to follow up with you
                                    </p>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={senderName}
                                            onChange={(e) => setSenderName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white
                                                       text-sm text-gray-800 placeholder:text-gray-400
                                                       focus:outline-none focus:ring-2 focus:ring-[#25D366]/25 focus:border-[#25D366]
                                                       transition-all duration-200"
                                        />
                                    </div>
                                    <div className="relative">
                                        <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                        <input
                                            type="email"
                                            value={senderEmail}
                                            onChange={(e) => setSenderEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white
                                                       text-sm text-gray-800 placeholder:text-gray-400
                                                       focus:outline-none focus:ring-2 focus:ring-[#25D366]/25 focus:border-[#25D366]
                                                       transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Status / validation message */}
                            {status === 'error' && statusMessage && (
                                <div className="mx-3 mt-2 flex items-start gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-100">
                                    <ExclamationCircleIcon className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-red-700 font-medium">
                                        {statusMessage}
                                    </p>
                                </div>
                            )}

                            {status === 'idle' && statusMessage && (
                                <div className="mx-3 mt-2 flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-100">
                                    <ExclamationCircleIcon className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-amber-800 font-medium">
                                        {statusMessage}
                                    </p>
                                </div>
                            )}

                            {/* Input area (hidden after success) */}
                            {!isSuccess && (
                                <div className="p-3 space-y-2">
                                    <div className="relative">
                                        <textarea
                                            ref={textareaRef}
                                            value={userMessage}
                                            onChange={(e) => setUserMessage(e.target.value)}
                                            placeholder="Type your message…"
                                            rows={2}
                                            maxLength={500}
                                            disabled={isUploading}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Enter' &&
                                                    (e.metaKey || e.ctrlKey)
                                                ) {
                                                    e.preventDefault();
                                                    handleSend();
                                                }
                                            }}
                                            className="w-full px-3.5 py-2.5 pr-12 rounded-xl border border-gray-200 bg-white
                                                       text-sm text-gray-800 placeholder:text-gray-400
                                                       resize-none
                                                       focus:outline-none focus:ring-2 focus:ring-[#25D366]/25 focus:border-[#25D366]
                                                       transition-all duration-200
                                                       disabled:opacity-60 disabled:cursor-not-allowed"
                                        />
                                        <span
                                            className={`absolute bottom-1.5 right-3 text-[10px] font-medium ${
                                                userMessage.length > 450
                                                    ? 'text-red-500'
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            {userMessage.length}/500
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            aria-label="Attach files"
                                            disabled={
                                                attachedFiles.length >= MAX_FILES ||
                                                isUploading
                                            }
                                            className="flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-xl
                                                       bg-white border border-gray-200 text-gray-600
                                                       hover:bg-gray-50 hover:border-[#25D366]/40 hover:text-[#25D366]
                                                       active:scale-95 transition-all duration-200
                                                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600
                                                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40"
                                        >
                                            <PaperClipIcon className="h-5 w-5" />
                                        </button>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                                            onChange={(e) => {
                                                handleFileSelect(e.target.files);
                                                e.target.value = '';
                                            }}
                                            className="hidden"
                                        />

                                        <button
                                            onClick={handleSend}
                                            disabled={!hasContent || isUploading}
                                            className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                                                       bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white font-semibold
                                                       shadow-[0_8px_22px_-8px_rgba(37,211,102,0.65)]
                                                       hover:shadow-[0_12px_30px_-8px_rgba(37,211,102,0.85)]
                                                       transition-all duration-300 active:scale-[0.98]
                                                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100
                                                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40"
                                        >
                                            {isUploading ? (
                                                <>
                                                    <svg
                                                        className="animate-spin h-4 w-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                        />
                                                    </svg>
                                                    <span>Uploading…</span>
                                                </>
                                            ) : (
                                                <>
                                                    <PaperAirplaneIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                                    <span>
                                                        {attachedFiles.length > 0
                                                            ? 'Upload & Continue'
                                                            : 'Continue on WhatsApp'}
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-[10px] text-center text-gray-400 leading-tight">
                                        Up to {MAX_FILES} files · {MAX_FILE_SIZE_MB} MB each · Press ⌘/Ctrl + Enter to send
                                    </p>
                                </div>
                            )}

                            {/* Start new message (after success) */}
                            {isSuccess && (
                                <div className="p-3">
                                    <button
                                        onClick={handleCloseChat}
                                        className="w-full py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold
                                                   hover:bg-gray-50 hover:border-[#25D366]/40 hover:text-[#25D366]
                                                   active:scale-[0.98] transition-all duration-200"
                                    >
                                        Close Chat
                                    </button>
                                </div>
                            )}
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
                        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Give Feedback
                        </span>
                    </button>

                    {/* WhatsApp blob — CHAT ICON */}
                    <button
                        onClick={() => {
                            setChatOpen((v) => !v);
                            setFeedbackOpen(false);
                        }}
                        aria-label="Chat on WhatsApp"
                        className="group relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full
                                   bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white
                                   shadow-[0_12px_35px_-8px_rgba(37,211,102,0.7)]
                                   hover:shadow-[0_18px_45px_-8px_rgba(37,211,102,0.9)]
                                   transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                        {showHint && !chatOpen && (
                            <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
                        )}

                        <ChatBubbleLeftRightIcon className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:scale-110" />

                        {!chatOpen && (
                            <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white shadow-md" />
                        )}

                        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Chat with us
                        </span>
                    </button>
                </div>
            </div>

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