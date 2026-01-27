"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NavigationLoader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-brand-charcoal-100 via-white to-brand-charcoal-50 overflow-hidden">

            {/* Abstract Navigation Grid */}
            <div className="absolute inset-0">
                {/* Vertical Grid Lines */}
                {[...Array(13)].map((_, i) => (
                    <div
                        key={`v-${i}`}
                        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange-500/20 to-transparent"
                        style={{ left: `${i * 8.33}%` }}
                    />
                ))}

                {/* Horizontal Grid Lines */}
                {[...Array(13)].map((_, i) => (
                    <div
                        key={`h-${i}`}
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange-500/20 to-transparent"
                        style={{ top: `${i * 8.33}%` }}
                    />
                ))}
            </div>

            {/* Central Navigation Interface */}
            <div className="absolute inset-0 flex items-center justify-center">

                {/* Main Compass */}
                <div className="relative">

                    {/* Outer Ring */}
                    <motion.div
                        className="absolute border-2 border-brand-orange-500/40 rounded-full"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            rotate: {
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            },
                            scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                        style={{
                            width: '400px',
                            height: '400px',
                        }}
                    />

                    {/* Inner Ring */}
                    <motion.div
                        className="absolute border border-brand-orange-500/60 rounded-full"
                        animate={{
                            rotate: -360,
                            scale: [1.05, 1, 1.05],
                        }}
                        transition={{
                            rotate: {
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear",
                            },
                            scale: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                        style={{
                            width: '300px',
                            height: '300px',
                        }}
                    />

                    {/* Compass Points */}
                    {['N', 'E', 'S', 'W'].map((point, i) => (
                        <motion.div
                            key={point}
                            className="absolute text-brand-charcoal-900 font-bold text-xl bg-white/90 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm"
                            style={{
                                transform: `translate(-50%, -50%) rotate(${i * 90}deg)`,
                                left: '50%',
                                top: '50%',
                            }}
                            animate={{
                                y: [0, i % 2 === 0 ? -5 : 5, 0],
                                opacity: [0.9, 1, 0.9],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        >
                            {point}
                        </motion.div>
                    ))}

                    {/* Rotating Navigation Dial */}
                    <motion.div
                        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-white to-brand-charcoal-100 border-2 border-brand-orange-500/40 shadow-2xl"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {/* Dial Markers */}
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-6 bg-brand-orange-600"
                                style={{
                                    left: '50%',
                                    top: '0',
                                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                                    transformOrigin: '50% 100px',
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Central Target */}
                    <div className="relative w-32 h-32">

                        {/* Target Rings */}
                        <motion.div
                            className="absolute inset-0 border-4 border-brand-orange-500/50 rounded-full"
                            animate={{
                                scale: [1, 1.1, 1],
                                borderWidth: ['4px', '2px', '4px'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        <motion.div
                            className="absolute inset-6 border-2 border-brand-orange-600/70 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.2,
                            }}
                        />

                        {/* Central Dot */}
                        <motion.div
                            className="absolute inset-12 rounded-full bg-gradient-to-r from-brand-orange-600 to-brand-orange-700 shadow-lg"
                            animate={{
                                scale: [1, 1.3, 1],
                                boxShadow: [
                                    '0 0 20px rgba(243, 111, 33, 0.6)',
                                    '0 0 40px rgba(243, 111, 33, 0.9)',
                                    '0 0 20px rgba(243, 111, 33, 0.6)',
                                ],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Glow Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                    opacity: [0.4, 0.7, 0.4],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)',
                                    filter: 'blur(10px)',
                                }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Floating Navigation Points */}
                {[
                    { x: 25, y: 25, label: 'Pickup' },
                    { x: 75, y: 60, label: 'Destination' },
                    { x: 40, y: 70, label: 'Waypoint' },
                    { x: 60, y: 35, label: 'Stopover' },
                ].map((point, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: i * 0.2,
                            type: "spring",
                            stiffness: 200,
                        }}
                    >
                        {/* Navigation Point */}
                        <motion.div
                            className="relative w-6 h-6 rounded-full bg-gradient-to-br from-brand-orange-600 to-brand-orange-700 shadow-lg border border-white/50"
                            animate={{
                                scale: [1, 1.2, 1],
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Connection Line */}
                            <svg className="absolute inset-0 w-full h-full">
                                <motion.line
                                    x1="50%"
                                    y1="50%"
                                    x2="50%"
                                    y2="50%"
                                    stroke="url(#navGradient)"
                                    strokeWidth="1"
                                    initial={{
                                        x2: "50%",
                                        y2: "50%"
                                    }}
                                    animate={{
                                        x2: `${(point.x - 50) * 2 + 50}%`,
                                        y2: `${(point.y - 50) * 2 + 50}%`
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: "easeInOut",
                                    }}
                                />
                            </svg>
                        </motion.div>

                        {/* Label */}
                        <motion.div
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap text-brand-charcoal-900 text-xs font-semibold bg-white/95 px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm"
                            animate={{
                                opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        >
                            {point.label}
                        </motion.div>
                    </motion.div>
                ))}

                {/* Animated Route Path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                        d="M25,25 Q50,10 75,60 Q60,40 40,70"
                        fill="none"
                        stroke="url(#routeGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.path
                        d="M25,25 Q50,10 75,60 Q60,40 40,70"
                        fill="none"
                        stroke="rgba(243, 111, 33, 0.15)"
                        strokeWidth="10"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </svg>
            </div>

            {/* Data Visualization Elements */}
            <div className="absolute top-1/4 left-8">
                <motion.div
                    className="text-brand-orange-600 text-2xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    VISION<span className="text-brand-charcoal-800">ONE</span>
                </motion.div>
                <div className="text-brand-charcoal-700 text-xs mt-1 font-semibold">
                    Navigation System
                </div>

                {/* Data Bars */}
                <div className="mt-6 space-y-3">
                    {['Route Planning', 'GPS Tracking', 'ETA Calculation'].map((item, i) => (
                        <motion.div
                            key={item}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                        >
                            <div className="text-brand-charcoal-800 text-xs w-32 font-semibold">{item}</div>
                            <div className="h-2 bg-brand-charcoal-200 rounded-full flex-1 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-brand-orange-600 to-brand-orange-500 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${70 + i * 15}%` }}
                                    transition={{
                                        duration: 1.5,
                                        delay: 1 + i * 0.2,
                                        ease: "easeOut",
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Status Panel */}
            <div className="absolute top-1/4 right-8 text-right">
                <motion.div
                    className="text-brand-orange-600 text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    99.9%
                </motion.div>
                <div className="text-brand-charcoal-700 text-xs font-semibold">
                    System Accuracy
                </div>

                {/* Loading Indicator */}
                <motion.div
                    className="mt-6 h-1 bg-brand-charcoal-200 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: 120 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-brand-orange-600 to-brand-orange-500"
                        animate={{
                            x: ['0%', '100%'],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </motion.div>
            </div>

            {/* Main Loading Text */}
            <motion.div
                className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="text-brand-charcoal-900 text-xl font-bold tracking-wider bg-white/80 px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm"
                    animate={{
                        letterSpacing: ['0.05em', '0.1em', '0.05em'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    CALCULATING OPTIMAL ROUTE
                </motion.div>
                <motion.div
                    className="text-brand-orange-700 text-sm font-semibold mt-4 bg-white/70 px-4 py-2 rounded-lg shadow backdrop-blur-sm"
                    animate={{
                        opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Initializing premium navigation system...
                </motion.div>

                {/* Progress Dots */}
                <motion.div className="flex justify-center space-x-2 mt-6">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-brand-orange-600"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Feature Tags */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {['REAL-TIME', 'PRECISE', 'RELIABLE'].map((tag, i) => (
                    <motion.div
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-white/90 to-white/80 border border-brand-orange-500/30 rounded-lg shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                    >
                        <span className="text-brand-charcoal-900 text-xs font-bold tracking-wide">{tag}</span>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-white via-brand-charcoal-50 to-white border-t border-brand-orange-500/30 flex items-center justify-between px-8">
                <motion.div
                    className="text-brand-charcoal-700 text-xs font-semibold"
                    animate={{
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    SYSTEM INITIALIZED
                </motion.div>
                <div className="text-brand-charcoal-800 text-xs font-semibold">
                    VISION<span className="text-brand-orange-600 font-bold">ONE</span> NAVIGATION
                </div>
                <motion.div
                    className="text-brand-charcoal-700 text-xs font-semibold"
                    animate={{
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                >
                    READY FOR JOURNEY
                </motion.div>
            </div>

            {/* Background Enhancement */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange-50/30 via-transparent to-brand-orange-50/20 pointer-events-none" />

            {/* SVG Gradients */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F36F21" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#FF8745" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#F36F21" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F36F21" stopOpacity="0" />
                        <stop offset="30%" stopColor="#FF8745" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#FF8745" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#F36F21" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Pulsing Background Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    opacity: [0.01, 0.03, 0.01],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(243, 111, 33, 0.08) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}