"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        question: "How does the 3D design process work?",
        answer: "We create a detailed digital model of your property, allowing you to explore the finished landscape in a realistic 3D walkthrough. You can request adjustments, change plant placements, and perfect every detail before any physical work begins — saving time, money, and surprises.",
    },
    {
        question: "Is the initial consultation free?",
        answer: "Yes! Our initial site visit and consultation is completely free of charge within the city limits of Kakinada. We'll assess your space, discuss your vision, and provide preliminary ideas — all at no cost. For locations outside Kakinada, a nominal travel fee may apply.",
    },
    {
        question: "Do you handle both design and installation?",
        answer: "Absolutely. We are a full-service landscaping firm. From the initial concept sketch and 3D modeling to material sourcing, installation, and final planting — we handle everything in-house with our experienced team.",
    },
    {
        question: "What types of properties do you work with?",
        answer: "We work with all property types — residential homes, commercial complexes, temples and spiritual spaces, industrial campuses, rooftops, and balconies. Whether it's a small terrace garden or a large-scale industrial green belt, we bring the same level of expertise and care.",
    },
    {
        question: "Do you offer ongoing maintenance, and do you supply plants and materials?",
        answer: "Yes on both counts. We offer tailored maintenance packages that include regular lawn care, pruning, fertilization, pest management, and seasonal planting — ensuring your landscape looks stunning year-round. We also source all plants, stones, soil, and materials directly from trusted nurseries and suppliers to ensure the highest quality. All materials are included in our project quotes — no hidden costs.",
    },
];

const AccordionItem = ({
    question,
    answer,
    isOpen,
    onClick,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <div className="border-b border-cream-dark last:border-0">
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-leaf focus:outline-none"
            >
                <span className={`text-lg font-semibold sm:text-xl ${isOpen ? "text-leaf" : "text-forest"}`}>
                    {question}
                </span>
                <span
                    className={`ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-300 ${isOpen ? "rotate-45 border-leaf bg-leaf text-white" : "border-forest-light text-forest-light"
                        }`}
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pr-12 text-forest-light text-lg leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-white py-24 px-6 lg:py-32">
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-leaf">
                        Got Questions?
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-forest sm:text-4xl md:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-forest-light max-w-2xl mx-auto">
                        Everything you need to know about working with us.
                    </p>
                </div>

                <div className="rounded-2xl border border-cream-dark bg-cream-light/30 px-6 sm:px-10 shadow-sm">
                    {FAQS.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
