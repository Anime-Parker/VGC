"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2, Phone, MapPin, User, Instagram } from "lucide-react";

type ContactFormData = {
    name: string;
    phone: string;
    email: string;
    message: string;
};

export default function Contact() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ContactFormData>();

    const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
        setSubmitError(null);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to send message. Please try again later.");
            }

            setIsSuccess(true);
        } catch (error) {
            console.error("Submission Error:", error);
            setSubmitError("There was an issue sending your message. Please give us a call instead.");
        }
    };

    return (
        <section id="contact" className="bg-cream-light py-24 px-6 lg:py-32">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-leaf">
                        Ready to Start?
                    </p>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-forest sm:text-4xl md:text-5xl">
                        Let&#39;s Discuss Your Landscape
                    </h2>
                    <p className="text-lg text-forest-light max-w-2xl mx-auto">
                        Reach out to us for a free consultation within Kakinada city limits.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Owner - R Sriram */}
                        <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-cream-dark/30">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                                <User className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-forest-light mb-1">Lead Designer &amp; Architect</p>
                                <p className="text-lg font-bold text-forest">R Sriram</p>
                                <a href="tel:+917032350412" className="text-sm text-leaf hover:underline">70323 50412</a>
                            </div>
                        </div>

                        {/* Owner - P Siva */}
                        <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-cream-dark/30">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                                <User className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-forest-light mb-1">Work Force Manager</p>
                                <p className="text-lg font-bold text-forest">P Siva</p>
                                <a href="tel:+919949645777" className="text-sm text-leaf hover:underline">99496 45777</a>
                            </div>
                        </div>



                        {/* Address */}
                        <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-cream-dark/30">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-forest-light mb-1">Office</p>
                                <p className="text-base font-semibold text-forest leading-relaxed">
                                    2-8, Near Jeeyar Swami vari Ashram,
                                    <br />
                                    G.Vemavaram, 533461
                                </p>
                            </div>
                        </div>

                        {/* Instagram CTA */}
                        <a
                            href="https://www.instagram.com/vanamali_greenscapes?igsh=MXA5NzUzbDhnYXpuOQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-md text-white transition-all hover:shadow-xl hover:scale-[1.02]"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                                <Instagram className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-0.5">Follow Us</p>
                                <p className="text-lg font-bold">@vanamali_greenscapes</p>
                            </div>
                            <svg className="ml-auto h-5 w-5 text-white/70 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        {isSuccess ? (
                            <div className="rounded-2xl bg-white p-12 shadow-lg border border-cream text-center h-full flex flex-col items-center justify-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-forest mb-4">Thank you!</h3>
                                <p className="text-forest-light text-lg">
                                    Your message has been received. We&#39;ll be in touch with you shortly to discuss your landscaping needs.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg border border-cream sm:p-10 text-left"
                            >
                                {submitError && (
                                    <div className="p-4 mb-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                        <span className="font-medium">Error!</span> {submitError}
                                    </div>
                                )}
                                {/* Name Field */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        {...register("name", { required: "Name is required" })}
                                        className="peer w-full border-b-2 border-cream-dark bg-transparent px-0 py-3 text-forest placeholder-transparent focus:border-leaf focus:outline-none focus:ring-0"
                                        placeholder="Name"
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-0 -top-3.5 text-sm text-forest-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-forest-light/70 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-leaf"
                                    >
                                        Name
                                    </label>
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                                </div>

                                {/* Phone Field */}
                                <div className="relative">
                                    <input
                                        type="tel"
                                        id="phone"
                                        maxLength={10}
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: { value: /^\d{10}$/, message: "Phone number must be exactly 10 digits" }
                                        })}
                                        className="peer w-full border-b-2 border-cream-dark bg-transparent px-0 py-3 text-forest placeholder-transparent focus:border-leaf focus:outline-none focus:ring-0"
                                        placeholder="Phone Number"
                                    />
                                    <label
                                        htmlFor="phone"
                                        className="absolute left-0 -top-3.5 text-sm text-forest-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-forest-light/70 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-leaf"
                                    >
                                        Phone Number
                                    </label>
                                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email")}
                                        className="peer w-full border-b-2 border-cream-dark bg-transparent px-0 py-3 text-forest placeholder-transparent focus:border-leaf focus:outline-none focus:ring-0"
                                        placeholder="Email Address"
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 -top-3.5 text-sm text-forest-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-forest-light/70 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-leaf"
                                    >
                                        Email Address
                                    </label>
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                                </div>

                                {/* Message Field */}
                                <div className="relative mt-2">
                                    <textarea
                                        id="message"
                                        rows={4}
                                        {...register("message")}
                                        className="peer w-full resize-none border-b-2 border-cream-dark bg-transparent px-0 py-3 text-forest placeholder-transparent focus:border-leaf focus:outline-none focus:ring-0"
                                        placeholder="Brief Message"
                                    />
                                    <label
                                        htmlFor="message"
                                        className="absolute left-0 -top-3.5 text-sm text-forest-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-forest-light/70 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-leaf"
                                    >
                                        Brief Message
                                    </label>
                                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-leaf px-8 py-4 text-base font-bold uppercase tracking-wider text-cream-light transition-colors hover:bg-leaf-light disabled:cursor-not-allowed disabled:bg-leaf/70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
