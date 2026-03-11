"use client";

import { motion } from "framer-motion";
import { TreePine, Cuboid, Clock, Award, Users } from "lucide-react";

const stats = [
    { icon: <Clock className="h-6 w-6" />, value: "25+", label: "Years of Experience" },
    { icon: <TreePine className="h-6 w-6" />, value: "500+", label: "Projects Completed" },
    { icon: <Cuboid className="h-6 w-6" />, value: "3D", label: "Design Technology" },
    { icon: <Award className="h-6 w-6" />, value: "100%", label: "Client Satisfaction" },
];

const TEAM = [
    { name: "R. Bala", role: "Founder" },
    { name: "R. Sriram", role: "Lead Designer & Architect" },
    { name: "P. Siva", role: "Work Force Manager" },
];

export default function AboutUs() {
    return (
        <section id="about" className="bg-white py-24 px-6 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-leaf">
                        Our Story
                    </p>
                    <h2 className="mb-6 text-4xl font-bold tracking-tight text-forest sm:text-5xl md:text-6xl">
                        Transforming Ordinary Outdoor Areas
                        <br className="hidden sm:block" />
                        into Living Masterpieces
                    </h2>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">
                    {/* Left - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-forest-light leading-relaxed">
                            For over <strong className="text-forest">25 years</strong>, Vanamali Greenscape
                            Creations has been the region&#39;s most trusted name in landscape design
                            and execution. We don&#39;t just plant gardens — we craft living environments
                            that breathe life into every space.
                        </p>
                        <p className="text-lg text-forest-light leading-relaxed">
                            Our signature approach combines <strong className="text-forest">cutting-edge 3D design
                                technology</strong> with deep horticultural expertise. Every project begins with
                            a detailed 3D walkthrough, allowing you to explore and refine
                            your landscape before a single stone is laid.
                        </p>
                        <p className="text-lg text-forest-light leading-relaxed">
                            From residential gardens and spiritual spaces to industrial green belts
                            and rooftop terraces, we bring the same passion, precision, and
                            dedication to every project — no matter the size.
                        </p>

                        {/* Team Members */}
                        <div className="pt-4 border-t border-cream-dark/50 space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="h-5 w-5 text-leaf" />
                                <p className="text-sm font-semibold uppercase tracking-wider text-forest-light">Our Team</p>
                            </div>
                            {TEAM.map((member) => (
                                <div key={member.name} className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-forest">{member.name}</p>
                                        <p className="text-sm text-forest-light">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="flex flex-col items-center rounded-2xl bg-cream-light p-6 text-center shadow-sm border border-cream-dark/30 hover:shadow-md transition-shadow"
                            >
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                                    {stat.icon}
                                </div>
                                <p className="text-3xl font-bold text-forest mb-1">{stat.value}</p>
                                <p className="text-sm text-forest-light font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
