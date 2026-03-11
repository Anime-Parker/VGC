"use client";

import { motion, Variants } from "framer-motion";
import {
    Home,
    Landmark,
    Factory,
    Building2,
    Hammer,
    Sprout,
    Sun,
    Carrot,
    TreePine,
} from "lucide-react";
import { ReactNode } from "react";

interface ServiceItem {
    title: string;
    description: string;
    icon: ReactNode;
    category: string;
}

const services: ServiceItem[] = [
    {
        title: "Residential Landscaping",
        description: "Transforming home exteriors into lush retreats.",
        icon: <Home className="h-8 w-8" />,
        category: "residential",
    },
    {
        title: "Spiritual Landscaping",
        description: "Sacred gardens designed for temples and spiritual spaces.",
        icon: <Landmark className="h-8 w-8" />,
        category: "spiritual",
    },
    {
        title: "Industrial Landscaping",
        description: "Large-scale green belts for factories and industrial plants.",
        icon: <Factory className="h-8 w-8" />,
        category: "industrial",
    },
    {
        title: "Commercial Complexes & Offices",
        description: "Aesthetic landscaping for offices and commercial complexes.",
        icon: <Building2 className="h-8 w-8" />,
        category: "commercial",
    },
    {
        title: "Hardscaping",
        description: "Pathways, gazebos, and stone work.",
        icon: <Hammer className="h-8 w-8" />,
        category: "hardscaping",
    },
    {
        title: "Bio Wall",
        description: "Vertical green walls for modern urban aesthetics.",
        icon: <Sprout className="h-8 w-8" />,
        category: "biowall",
    },
    {
        title: "Roof Top Gardens",
        description: "Green spaces on your terrace and rooftop.",
        icon: <Sun className="h-8 w-8" />,
        category: "rooftop",
    },
    {
        title: "Organic Farms",
        description: "Sustainable farming and vegetable gardens.",
        icon: <Carrot className="h-8 w-8" />,
        category: "organic",
    },
    {
        title: "Lawn",
        description: "Lush, manicured lawns for every outdoor space.",
        icon: <TreePine className="h-8 w-8" />,
        category: "lawn",
    },
    {
        title: "Layouts",
        description: "Comprehensive landscape planning and layout design.",
        icon: <Landmark className="h-8 w-8" />,
        category: "layouts",
    },
    {
        title: "Farm House Villas",
        description: "Expansive landscape design for farm houses and villas.",
        icon: <Home className="h-8 w-8" />,
        category: "farmhouse",
    },
];


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export default function Services() {
    const handleServiceClick = (category: string) => {
        // Set the category in the URL hash so the gallery can pick it up
        const galleryEl = document.getElementById("gallery");
        if (galleryEl) {
            // Dispatch a custom event with the category
            window.dispatchEvent(
                new CustomEvent("filterGallery", { detail: { category } })
            );
            galleryEl.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="services" className="bg-cream py-24 px-6 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16 text-center md:mb-20"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-forest sm:text-4xl md:text-5xl">
                        Our Services
                    </h2>
                    <p className="mt-4 text-lg text-forest-light max-w-2xl mx-auto">
                        Comprehensive landscaping solutions from initial concept to ongoing care.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            onClick={() => handleServiceClick(service.category)}
                            className="group flex cursor-pointer flex-col items-center bg-white p-8 rounded-2xl shadow-sm border border-cream-dark/50 hover:shadow-xl hover:border-leaf/30 transition-all text-center"
                        >
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-leaf/10 text-leaf transition-colors group-hover:bg-leaf group-hover:text-white">
                                {service.icon}
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-forest">
                                {service.title}
                            </h3>
                            <p className="text-sm text-forest-light leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
