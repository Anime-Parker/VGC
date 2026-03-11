import Link from "next/link";
import { Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-forest text-cream-light">
            <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
                {/* Top row */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-lg font-bold uppercase tracking-widest text-cream"
                        >
                            Vanamali Greenscape Creations
                        </Link>
                        <p className="mt-3 text-sm text-cream-light/70 leading-relaxed">
                            Bridging imagination and reality through precise 3D landscape
                            modeling. 25+ years of transforming spaces.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cream-light/50">
                            Quick Links
                        </p>
                        <nav className="flex flex-col gap-3 text-sm">
                            <a href="#services" className="transition-colors hover:text-leaf-light w-fit">
                                Services
                            </a>
                            <a href="#gallery" className="transition-colors hover:text-leaf-light w-fit">
                                Gallery
                            </a>
                            <a href="#faq" className="transition-colors hover:text-leaf-light w-fit">
                                FAQ
                            </a>
                            <a href="#contact" className="transition-colors hover:text-leaf-light w-fit">
                                Contact
                            </a>
                        </nav>
                    </div>

                    {/* Contact Info + Social */}
                    <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cream-light/50">
                            Get in Touch
                        </p>
                        <div className="space-y-3 text-sm">
                            <a href="tel:+917032350412" className="flex items-center gap-2 transition-colors hover:text-leaf-light">
                                <Phone className="h-4 w-4 flex-shrink-0 text-leaf-light" />
                                <span>70323 50412 , 9949645777</span>
                            </a>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-leaf-light" />
                                <span className="text-cream-light/80">
                                    2-8, Near Jeeyar Swami vari Ashram,
                                    <br />
                                    G.Vemavaram, 533461
                                </span>
                            </div>
                        </div>

                        {/* Instagram */}
                        <div className="mt-5">
                            <a
                                href="https://www.instagram.com/vanamali_greenscapes?igsh=MXA5NzUzbDhnYXpuOQ=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-cream-light/10 px-4 py-2 text-sm font-semibold text-cream-light transition-all hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white hover:scale-105"
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                                <span>@vanamali_greenscapes</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-cream-light/15" />

                {/* Bottom row */}
                <div className="flex flex-col items-center gap-3 text-center text-xs text-cream-light/50 md:flex-row md:justify-between">
                    <p className="font-medium tracking-wide text-cream-light/70">
                        20+ Years of Excellence
                    </p>
                    <p>&copy; {currentYear} Vanamali Greenscape Creations. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
