"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SolarFlareLoader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-brand-charcoal-900 via-brand-charcoal-800 to-brand-charcoal-950 overflow-hidden">
            {/* Starfield Background */}
            <div className="absolute inset-0">
                {[...Array(100)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-[1px] rounded-full bg-white"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Nebula Clouds */}
            <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full opacity-20 blur-3xl"
                        style={{
                            width: `${300 + i * 200}px`,
                            height: `${300 + i * 200}px`,
                            background: `radial-gradient(circle, rgba(243, 111, 33, 0.3) 0%, transparent 70%)`,
                            left: `${10 + i * 30}%`,
                            top: `${10 + i * 40}%`,
                        }}
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Main Orbital System */}
            <div className="absolute inset-0 flex items-center justify-center">

                {/* Outer Orbit Ring */}
                <motion.div
                    className="absolute border border-brand-orange-500/20 rounded-full"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: '70vw',
                        height: '70vw',
                        maxWidth: '700px',
                        maxHeight: '700px',
                    }}
                />

                {/* Middle Orbit Ring */}
                <motion.div
                    className="absolute border border-brand-orange-400/30 rounded-full"
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: '50vw',
                        height: '50vw',
                        maxWidth: '500px',
                        maxHeight: '500px',
                    }}
                />

                {/* Inner Orbit Ring */}
                <motion.div
                    className="absolute border border-brand-orange-300/40 rounded-full"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: '30vw',
                        height: '30vw',
                        maxWidth: '300px',
                        maxHeight: '300px',
                    }}
                />

                {/* Orbiting Planets */}
                {[
                    { size: 20, color: "from-brand-charcoal-400 to-brand-charcoal-600", orbit: 350, duration: 12 },
                    { size: 16, color: "from-brand-orange-400 to-brand-orange-600", orbit: 250, duration: 8 },
                    { size: 24, color: "from-brand-charcoal-300 to-brand-charcoal-500", orbit: 150, duration: 6 },
                    { size: 12, color: "from-brand-orange-500 to-brand-orange-700", orbit: 450, duration: 15 },
                ].map((planet, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full bg-gradient-to-br ${planet.color} shadow-lg`}
                        style={{
                            width: `${planet.size}px`,
                            height: `${planet.size}px`,
                            boxShadow: '0 0 20px rgba(243, 111, 33, 0.5)',
                        }}
                        animate={{
                            rotate: 360,
                            x: [0, Math.cos(i * 90) * planet.orbit, 0],
                            y: [0, Math.sin(i * 90) * planet.orbit, 0],
                        }}
                        transition={{
                            duration: planet.duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {/* Planet Rings */}
                        <motion.div
                            className="absolute inset-0 border border-brand-orange-300/30 rounded-full"
                            animate={{
                                rotate: 360,
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                margin: '-8px',
                            }}
                        />
                    </motion.div>
                ))}

                {/* Central Sun */}
                <div className="relative">
                    {/* Sun Glow */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            background: 'radial-gradient(circle, rgba(243, 111, 33, 0.8) 0%, rgba(255, 135, 69, 0.4) 50%, transparent 70%)',
                            filter: 'blur(40px)',
                            width: '200px',
                            height: '200px',
                            margin: '-100px',
                        }}
                    />

                    {/* Sun Core */}
                    <motion.div
                        className="relative rounded-full"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            rotate: {
                                duration: 20,
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
                            width: '80px',
                            height: '80px',
                            background: 'radial-gradient(circle, #FFA573 0%, #FF8745 30%, #F36F21 70%, #DB5F1D 100%)',
                            boxShadow: `
                0 0 60px 30px rgba(243, 111, 33, 0.8),
                0 0 100px 60px rgba(255, 135, 69, 0.4),
                0 0 140px 90px rgba(255, 195, 161, 0.2)
              `,
                        }}
                    >
                        {/* Sun Surface Details */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-gradient-to-r from-brand-orange-600 to-brand-orange-800"
                                style={{
                                    width: `${10 + Math.random() * 20}px`,
                                    height: `${10 + Math.random() * 20}px`,
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                }}
                                animate={{
                                    scale: [0.8, 1.2, 0.8],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2 + Math.random(),
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Solar Flares */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                width: '4px',
                                height: '200px',
                                left: '50%',
                                top: '50%',
                                transformOrigin: 'bottom center',
                                background: 'linear-gradient(to top, transparent, #FF8745, #F36F21, transparent)',
                                transform: `translateX(-50%) rotate(${i * 30}deg)`,
                            }}
                            animate={{
                                height: ['150px', '300px', '150px'],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                {/* Asteroid Belt */}
                <div className="absolute">
                    {[...Array(24)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-sm bg-gradient-to-r from-brand-charcoal-400 to-brand-charcoal-600"
                            style={{
                                width: `${4 + Math.random() * 8}px`,
                                height: `${4 + Math.random() * 8}px`,
                                transform: `rotate(${i * 15}deg) translateX(380px)`,
                            }}
                            animate={{
                                rotate: 360,
                                x: [0, Math.cos(i * 15) * 10, 0],
                                y: [0, Math.sin(i * 15) * 10, 0],
                            }}
                            transition={{
                                rotate: {
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                                x: {
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                                y: {
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Shooting Stars */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-transparent via-brand-orange-300 to-transparent"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            opacity: 0,
                        }}
                        animate={{
                            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "linear",
                        }}
                    >
                        <div className="absolute w-20 h-px bg-gradient-to-r from-transparent via-brand-orange-400 to-transparent -translate-y-1/2" />
                    </motion.div>
                ))}
            </div>

            {/* Loading Text */}
            <motion.div
                className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.div
                    className="text-brand-charcoal-100 text-lg font-light tracking-widest"
                    animate={{
                        letterSpacing: ['0.1em', '0.2em', '0.1em'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    IGNITING CREATIVITY
                </motion.div>
                <motion.div
                    className="text-brand-orange-400 text-xs font-light mt-2"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Loading stellar experience...
                </motion.div>
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-8 left-8 w-32 h-px bg-gradient-to-r from-brand-orange-500/50 via-brand-orange-400 to-brand-orange-500/50" />
            <div className="absolute top-8 right-8 w-32 h-px bg-gradient-to-l from-brand-orange-500/50 via-brand-orange-400 to-brand-orange-500/50" />
            <div className="absolute bottom-8 left-8 w-32 h-px bg-gradient-to-r from-brand-orange-500/50 via-brand-orange-400 to-brand-orange-500/50" />
            <div className="absolute bottom-8 right-8 w-32 h-px bg-gradient-to-l from-brand-orange-500/50 via-brand-orange-300 to-brand-orange-500/50" />

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(90deg, rgba(243, 111, 33, 0.05) 1px, transparent 1px),
            linear-gradient(180deg, rgba(243, 111, 33, 0.05) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    );
}