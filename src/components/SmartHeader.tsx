"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
];

export default function SmartHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                // Approximate header height
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                const startPosition = window.scrollY;
                const distance = offsetPosition - startPosition;
                const duration = 400; // 400ms for quick scroll transition
                let start: number | null = null;

                window.requestAnimationFrame(function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // easeInOutQuad
                    const ease = percentage < 0.5 
                        ? 2 * percentage * percentage 
                        : -1 + (4 - 2 * percentage) * percentage;
                        
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    } else {
                        window.history.pushState(null, '', href);
                    }
                });
            }
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled
                ? "bg-gray-800/95 backdrop-blur-md shadow-md"
                : "bg-transparent shadow-none"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-5">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-white shadow-md p-1">
                        <Image
                            src="/logo-nobg.png"
                            alt="Vanamali Greenscape Creations Logo"
                            fill
                            className="object-contain p-0.5"
                            priority
                        />
                    </div>
                    <span
                        className={`hidden text-base font-bold uppercase tracking-widest sm:block transition-colors duration-300 ${isScrolled ? "text-white" : "text-white"
                            }`}
                    >
                        Vanamali Greenscape
                        <br className="hidden lg:block md:hidden" /> Creations
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 items-center">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToHash(e, link.href)}
                            className={`text-sm font-semibold uppercase tracking-wide transition-colors ${isScrolled
                                ? "text-white hover:text-gray-300"
                                : "text-white/90 hover:text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        onClick={(e) => scrollToHash(e, "#contact")}
                        className="rounded-full bg-leaf px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-leaf-light hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2"
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Mobile Menu Toggle Button */}
                <button
                    className={`md:hidden transition-colors ${isScrolled ? "text-white" : "text-white"
                        }`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute left-0 top-full flex w-full flex-col border-t border-cream-dark bg-cream/98 px-6 py-6 shadow-xl backdrop-blur-md md:hidden">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToHash(e, link.href)}
                            className="border-b border-cream-dark/50 py-4 text-base font-semibold uppercase tracking-widest text-forest transition-colors hover:text-leaf"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        onClick={(e) => scrollToHash(e, "#contact")}
                        className="mt-6 inline-block w-full rounded-full bg-leaf py-3 text-center text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-leaf-light"
                    >
                        Contact Us
                    </Link>
                </div>
            )}
        </header>
    );
}
