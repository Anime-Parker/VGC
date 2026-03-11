"use client";

import { useState, useEffect } from "react";
import { Instagram, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstagramFloat() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Show after a short delay for better UX
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 80, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 80, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
                >
                    {/* Dismiss button */}
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white/80 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white"
                        aria-label="Dismiss"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>

                    {/* Instagram CTA */}
                    <a
                        href="https://www.instagram.com/vanamali_greenscapes?igsh=MXA5NzUzbDhnYXpuOQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-5 py-3 text-white shadow-xl transition-all hover:shadow-2xl hover:scale-105"
                    >
                        <Instagram className="h-5 w-5" />
                        <span className="text-sm font-bold tracking-wide">Follow us on Instagram</span>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
