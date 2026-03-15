"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative flex h-screen min-h-[600px] w-full items-center justify-start overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/new/farmhouse/IMG20200906104616.jpg"
                    alt="Beautiful landscape design by Vanamali Greenscape Creations"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Dark Overlay for Readability (Lightened for clarity) */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
                <div className="max-w-3xl">
                    {/* Trust Badge */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/90 md:text-base"
                    >
                        25+ Years of Excellence | Proudly Serving You
                    </motion.p>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="mb-8 text-4xl font-bold leading-tight tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Where Nature Meets Legacy.
                    </motion.h1>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-wrap gap-4"
                    >
                        <motion.a
                            href="#gallery"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block rounded-full border-2 border-white/70 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-white/10 md:px-10 md:py-5 md:text-base"
                        >
                            View Projects
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block rounded-full bg-leaf px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-leaf-light md:px-10 md:py-5 md:text-base"
                        >
                            Contact Us
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
