"use client";

export default function RenderVsReality() {
    return (
        <section className="bg-cream-light py-20 px-6 lg:py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                {/* Text Content (Left on Desktop, Top on Mobile) */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-leaf">
                        Our Signature Process
                    </p>
                    <h2 className="mb-6 text-4xl font-bold tracking-tight text-forest sm:text-5xl md:text-6xl">
                        See It Before We Build It
                    </h2>
                    <p className="text-lg text-forest-light leading-relaxed mb-6">
                        We don&apos;t just ask you to imagine the final result—we show it to you.
                        VGC provides detailed 3D walkthroughs so you can visualize,
                        explore, and perfect your landscape design long before ground is broken.
                    </p>
                    <p className="text-lg text-forest-light leading-relaxed">
                        Experience the difference between our high-fidelity renders and
                        the breathtaking reality of the finished project — brought to life in full 3D.
                    </p>
                </div>

                {/* 3D Design Video (Right on Desktop, Bottom on Mobile) */}
                <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <video
                        src="/videos/final-design.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </section>
    );
}
