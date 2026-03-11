"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "framer-motion";

// ─── Image Data by Category ───
const IMAGE_CATEGORIES: Record<string, { label: string; images: string[] }> = {
    all: {
        label: "All",
        images: [],
    },
    biowall: {
        label: "Vertical Gardens",
        images: [
            "/images/new/biowall/20160203_090205.jpg",
            "/images/new/biowall/20160203_090920.jpg",
            "/images/new/biowall/20160812_174116.jpg",
            "/images/new/biowall/20171017_122401.jpg",
            "/images/new/biowall/20171017_173910.jpg",
            "/images/new/biowall/20171205_084816.jpg",
            "/images/new/biowall/20171205_084836.jpg",
            "/images/new/biowall/20180417_150349.jpg",
            "/images/new/biowall/20180604_070703.jpg",
            "/images/new/biowall/IMG-20170908-WA0035.jpg",
            "/images/new/biowall/IMG-20200827-WA0023.jpg",
            "/images/new/biowall/IMG-20200827-WA0025.jpg",
            "/images/new/biowall/IMG-20241029-WA0171.jpg",
            "/images/new/biowall/IMG-20241029-WA0172.jpg",
            "/images/new/biowall/IMG-20241029-WA0176.jpg",
            "/images/new/biowall/IMG-20241029-WA0190.jpg",
            "/images/new/biowall/IMG-20241029-WA0191.jpg",
            "/images/new/biowall/IMG_20151231_115736.jpg",
        ],
    },
    commercial: {
        label: "Commercial",
        images: [
            "/images/new/commercial/20171230_082815.jpg",
            "/images/new/commercial/20180108_175822.jpg",
            "/images/new/commercial/20180401_070848.jpg",
            "/images/new/commercial/20180603_091958.jpg",
            "/images/new/commercial/20180711_095510.jpg",
            "/images/new/commercial/20190618_100505.jpg",
            "/images/new/commercial/IMG-20190914-WA0004.jpg",
            "/images/new/commercial/IMG-20190914-WA0006.jpg",
            "/images/new/commercial/IMG-20190914-WA0007.jpg",
            "/images/new/commercial/IMG-20190914-WA0009.jpg",
            "/images/new/commercial/IMG-20190914-WA0010.jpg",
            "/images/new/commercial/IMG-20190914-WA0017.jpg",
            "/images/new/commercial/IMG-20190914-WA0018.jpg",
            "/images/new/commercial/IMG-20200219-WA0001.jpg",
            "/images/new/commercial/IMG-20241028-WA0075.jpg",
            "/images/new/commercial/IMG-20241028-WA0082.jpg",
            "/images/new/commercial/IMG-20260101-WA0063.jpg",
            "/images/new/commercial/IMG-20260101-WA0065.jpg",
            "/images/new/commercial/IMG-20260101-WA0068.jpg",
            "/images/new/commercial/IMG-20260101-WA0073.jpg",
            "/images/new/commercial/IMG-20260101-WA0075.jpg",
            "/images/new/commercial/IMG-20260101-WA0079.jpg",
            "/images/new/commercial/IMG-20260101-WA0081.jpg",
            "/images/new/commercial/IMG-20260101-WA0082.jpg",
            "/images/new/commercial/IMG-20260101-WA0083.jpg",
            "/images/new/commercial/IMG-20260101-WA0089.jpg",
            "/images/new/commercial/IMG20200228163811.jpg",
            "/images/new/commercial/IMG20200525153555.jpg",
            "/images/new/commercial/IMG20200706152225.jpg",
            "/images/new/commercial/IMG20200706153216.jpg",
            "/images/new/commercial/IMG20220309074040.jpg",
            "/images/new/commercial/IMG20220813101008.jpg",
        ],
    },
    drip: {
        label: "Drip Irrigation",
        images: [
            "/images/new/drip/20241022_072205.jpg",
            "/images/new/drip/IMG-20260101-WA0086.jpg",
            "/images/new/drip/IMG-20260101-WA0091.jpg",
            "/images/new/drip/IMG_20200531_080209_1.jpg",
        ],
    },
    farmhouse: {
        label: "Farm House Villas",
        images: [
            "/images/new/farmhouse/20171020_114622.jpg",
            "/images/new/farmhouse/20180407_085100.jpg",
            "/images/new/farmhouse/20180407_085114.jpg",
            "/images/new/farmhouse/IMG-20170418-WA0014.jpg",
            "/images/new/farmhouse/IMG-20170523-WA0015.jpg",
            "/images/new/farmhouse/IMG-20180413-WA0044.jpg",
            "/images/new/farmhouse/IMG-20190903-WA0048.jpg",
            "/images/new/farmhouse/IMG-20190903-WA0059.jpg",
            "/images/new/farmhouse/IMG-20260101-WA0084.jpg",
            "/images/new/farmhouse/IMG20200219080216.jpg",
            "/images/new/farmhouse/IMG20200219080944.jpg",
            "/images/new/farmhouse/IMG20200219081719.jpg",
            "/images/new/farmhouse/IMG20200219082627.jpg",
            "/images/new/farmhouse/IMG20200428075021.jpg",
            "/images/new/farmhouse/IMG20200702064755.jpg",
            "/images/new/farmhouse/IMG20200702065538.jpg",
            "/images/new/farmhouse/IMG20200702065952.jpg",
            "/images/new/farmhouse/IMG20200723091816.jpg",
            "/images/new/farmhouse/IMG20200906104616.jpg",
            "/images/new/farmhouse/IMG20210824125106.jpg",
            "/images/new/farmhouse/IMG20210914081825.jpg",
            "/images/new/farmhouse/IMG20210914082816.jpg",
            "/images/new/farmhouse/IMG20210914082936.jpg",
            "/images/new/farmhouse/IMG20211125074135.jpg",
            "/images/new/farmhouse/IMG20211125074401.jpg",
            "/images/new/farmhouse/IMG20211125075654.jpg",
            "/images/new/farmhouse/IMG20211125132702.jpg",
            "/images/new/farmhouse/IMG20250723154857.jpg",
            "/images/new/farmhouse/Snapchat-1050851852.jpg",
        ],
    },
    hardscaping: {
        label: "Hardscaping",
        images: [
            "/images/new/hardscaping/20140919_135445.jpg",
            "/images/new/hardscaping/20150905_092748.jpg",
            "/images/new/hardscaping/20171127_123648.jpg",
            "/images/new/hardscaping/20190816_084745.jpg",
            "/images/new/hardscaping/IMG-20260101-WA0060.jpg",
            "/images/new/hardscaping/IMG-20260101-WA0072.jpg",
            "/images/new/hardscaping/IMG20210122173058.jpg",
            "/images/new/hardscaping/IMG20210216171026.jpg",
            "/images/new/hardscaping/IMG20210913121051.jpg",
            "/images/new/hardscaping/IMG20220416095902.jpg",
            "/images/new/hardscaping/IMG20220416123214.jpg",
        ],
    },
    industrial: {
        label: "Industrial",
        images: [
        ],
    },
    lawn: {
        label: "Lawn",
        images: [
            "/images/new/lawn/20170922_103106.jpg",
            "/images/new/lawn/20180708_090258.jpg",
            "/images/new/lawn/20180712_121731.jpg",
            "/images/new/lawn/20181130_110445.jpg",
            "/images/new/lawn/20190620_121851.jpg",
            "/images/new/lawn/IMG-20170107-WA0006.jpeg",
            "/images/new/lawn/IMG-20210727-WA0023.jpg",
            "/images/new/lawn/IMG-20210727-WA0024.jpg",
            "/images/new/lawn/IMG-20210727-WA0027.jpg",
            "/images/new/lawn/IMG20201217125614.jpg",
            "/images/new/lawn/IMG20210122153007.jpg",
            "/images/new/lawn/IMG20210122171027.jpg",
            "/images/new/lawn/IMG20210311143753.jpg",
            "/images/new/lawn/IMG20210312100011.jpg",
            "/images/new/lawn/IMG20210914081743.jpg",
            "/images/new/lawn/IMG20210914081825.jpg",
            "/images/new/lawn/IMG20210914082816.jpg",
            "/images/new/lawn/IMG20210914082936.jpg",
            "/images/new/lawn/IMG20220414084510.jpg",
        ],
    },
    layouts: {
        label: "Layouts",
        images: [
            "/images/new/layouts/20170810_111833.jpg",
            "/images/new/layouts/20170810_114839.jpg",
            "/images/new/layouts/20170922_103106.jpg",
            "/images/new/layouts/20171231_141955.jpg",
            "/images/new/layouts/20180224_152058.jpg",
            "/images/new/layouts/20180430_162717.jpg",
            "/images/new/layouts/20180615_163739.jpg",
            "/images/new/layouts/20180708_090258.jpg",
            "/images/new/layouts/20181009_143747.jpg",
            "/images/new/layouts/20181130_101008.jpg",
            "/images/new/layouts/20181130_104142.jpg",
            "/images/new/layouts/20181130_104216.jpg",
            "/images/new/layouts/20181130_104744.jpg",
            "/images/new/layouts/20181130_111837.jpg",
            "/images/new/layouts/20181130_112211.jpg",
            "/images/new/layouts/20181130_112526.jpg",
            "/images/new/layouts/20181219_093234.jpg",
            "/images/new/layouts/20190305_093812.jpg",
            "/images/new/layouts/20190620_121805.jpg",
            "/images/new/layouts/20190713_141312.jpg",
            "/images/new/layouts/20190713_141422.jpg",
            "/images/new/layouts/20190713_141656.jpg",
            "/images/new/layouts/20190713_141702.jpg",
            "/images/new/layouts/20190719_111047.jpg",
            "/images/new/layouts/20190719_114143.jpg",
            "/images/new/layouts/IMG-20181030-WA0038.jpg",
            "/images/new/layouts/IMG-20181030-WA0039.jpg",
            "/images/new/layouts/IMG-20190914-WA0004.jpg",
            "/images/new/layouts/IMG-20190914-WA0006.jpg",
            "/images/new/layouts/IMG-20190914-WA0007.jpg",
            "/images/new/layouts/IMG-20190914-WA0009.jpg",
            "/images/new/layouts/IMG-20190914-WA0010.jpg",
            "/images/new/layouts/IMG-20190914-WA0017.jpg",
            "/images/new/layouts/IMG-20190914-WA0018.jpg",
        ],
    },
    organic: {
        label: "Organic Farms",
        images: [
            "/images/new/organic/IMG-20210122-WA0012_1.jpg",
            "/images/new/organic/IMG-20210122-WA0013.jpg",
            "/images/new/organic/IMG-20210122-WA0013_1.jpg",
            "/images/new/organic/IMG-20210122-WA0014_1.jpg",
            "/images/new/organic/IMG-20210122-WA0016_1.jpg",
            "/images/new/organic/IMG-20260101-WA0076.jpg",
            "/images/new/organic/IMG-20260101-WA0085.jpg",
            "/images/new/organic/IMG-20260101-WA0086.jpg",
            "/images/new/organic/IMG-20260101-WA0087.jpg",
            "/images/new/organic/IMG-20260101-WA0088.jpg",
            "/images/new/organic/IMG-20260101-WA0090.jpg",
            "/images/new/organic/IMG-20260101-WA0091.jpg",
            "/images/new/organic/IMG-20260101-WA0092.jpg",
            "/images/new/organic/IMG-20260101-WA0093.jpg",
            "/images/new/organic/IMG-20260101-WA0094.jpg",
            "/images/new/organic/IMG-20260101-WA0095.jpg",
            "/images/new/organic/IMG20251225120546.jpg",
        ],
    },
    residential: {
        label: "Residential",
        images: [
            "/images/new/residential/20140910_154640 (1).jpg",
            "/images/new/residential/20141004_135732.jpg",
            "/images/new/residential/20141004_135818.jpg",
            "/images/new/residential/20141009_114046.jpg",
            "/images/new/residential/20141126_160234.jpg",
            "/images/new/residential/20150127_112856.jpg",
            "/images/new/residential/20150528_140520.jpg",
            "/images/new/residential/20150528_140553.jpg",
            "/images/new/residential/20160127_123459.jpg",
            "/images/new/residential/20161128_104504.jpg",
            "/images/new/residential/20171127_123100.jpg",
            "/images/new/residential/20180220_094028.jpg",
            "/images/new/residential/20180808_161901.jpg",
            "/images/new/residential/20190111_124255.jpg",
            "/images/new/residential/IMG-20140805-WA0003.jpg",
            "/images/new/residential/IMG-20190903-WA0039.jpg",
            "/images/new/residential/IMG-20200212-WA0001.jpg",
            "/images/new/residential/IMG-20210727-WA0022.jpg",
            "/images/new/residential/IMG-20220314-WA0109.jpg",
            "/images/new/residential/IMG-20220712-WA0017.jpg",
            "/images/new/residential/IMG-20220712-WA0018.jpg",
            "/images/new/residential/IMG-20220713-WA0013.jpg",
            "/images/new/residential/IMG-20220713-WA0019.jpg",
            "/images/new/residential/IMG-20220803-WA0003.jpg",
            "/images/new/residential/IMG-20220807-WA0058.jpg",
            "/images/new/residential/IMG-20220807-WA0066.jpg",
            "/images/new/residential/IMG-20241028-WA0021.jpg",
            "/images/new/residential/IMG-20241029-WA0185.jpg",
            "/images/new/residential/IMG-20260101-WA0059.jpg",
            "/images/new/residential/IMG-20260101-WA0061.jpg",
            "/images/new/residential/IMG20200110131101.jpg",
            "/images/new/residential/IMG20201217125614.jpg",
            "/images/new/residential/IMG20210122153007.jpg",
            "/images/new/residential/IMG20210122170225.jpg",
            "/images/new/residential/IMG20210122170238.jpg",
            "/images/new/residential/IMG20210618095409.jpg",
            "/images/new/residential/IMG20211027112838.jpg",
            "/images/new/residential/IMG20211027113158.jpg",
            "/images/new/residential/IMG20211027121045.jpg",
            "/images/new/residential/IMG20211027121146.jpg",
            "/images/new/residential/IMG20211030133351.jpg",
            "/images/new/residential/IMG20211128102748.jpg",
            "/images/new/residential/IMG20220203131612.jpg",
            "/images/new/residential/IMG20220203131652.jpg",
            "/images/new/residential/IMG20220204095309.jpg",
            "/images/new/residential/IMG20220204105341.jpg",
            "/images/new/residential/IMG20220204123946.jpg",
            "/images/new/residential/IMG20220206115115.jpg",
            "/images/new/residential/IMG20220206125007.jpg",
            "/images/new/residential/IMG20220206153157.jpg",
            "/images/new/residential/IMG20220207084426.jpg",
            "/images/new/residential/IMG20220713093628.jpg",
            "/images/new/residential/IMG20220926125223.jpg",
            "/images/new/residential/IMG20251121120013.jpg",
            "/images/new/residential/IMG20251121131030.jpg",
            "/images/new/residential/IMG20251121131151.jpg",
            "/images/new/residential/IMG20251121131201.jpg",
            "/images/new/residential/IMG_20160106_103158.jpg",
            "/images/new/residential/IMG_20251128_181900.jpg",
            "/images/new/residential/Photo0374 (1).jpg",
            "/images/new/residential/Snapchat-1948863336.jpg",
        ],
    },
    rooftop: {
        label: "Roof Top",
        images: [
            "/images/new/rooftop/20150310_171248.jpg",
            "/images/new/rooftop/20181102_092136.jpg",
            "/images/new/rooftop/IMG-20170106-WA0006.jpg",
            "/images/new/rooftop/IMG-20170123-WA0002.jpg",
            "/images/new/rooftop/IMG-20170123-WA0006.jpg",
            "/images/new/rooftop/IMG-20170417-WA0000.jpg",
            "/images/new/rooftop/IMG-20170627-WA0005.jpg",
            "/images/new/rooftop/IMG-20200212-WA0001.jpg",
            "/images/new/rooftop/IMG-20220712-WA0024.jpg",
            "/images/new/rooftop/IMG-20220712-WA0025.jpg",
            "/images/new/rooftop/IMG-20241028-WA0022.jpg",
            "/images/new/rooftop/IMG-20241028-WA0025.jpg",
            "/images/new/rooftop/IMG-20241028-WA0036.jpg",
            "/images/new/rooftop/IMG-20241028-WA0043.jpg",
            "/images/new/rooftop/IMG-20241029-WA0063.jpg",
            "/images/new/rooftop/IMG-20241029-WA0084.jpg",
            "/images/new/rooftop/IMG-20241029-WA0085.jpg",
            "/images/new/rooftop/IMG-20241029-WA0099.jpg",
            "/images/new/rooftop/IMG-20241029-WA0105.jpg",
            "/images/new/rooftop/IMG-20241029-WA0112.jpg",
            "/images/new/rooftop/IMG-20241029-WA0128.jpg",
            "/images/new/rooftop/IMG-20241029-WA0137.jpg",
            "/images/new/rooftop/IMG-20241029-WA0174.jpg",
            "/images/new/rooftop/IMG20211021121603.jpg",
            "/images/new/rooftop/IMG20220111172434.jpg",
            "/images/new/rooftop/IMG20220206115115.jpg",
            "/images/new/rooftop/IMG20220206125007.jpg",
            "/images/new/rooftop/IMG20220206153157.jpg",
            "/images/new/rooftop/IMG20220207084426.jpg",
            "/images/new/rooftop/IMG20220219091223.jpg",
            "/images/new/rooftop/IMG20220219092838.jpg",
        ],
    },
    spiritual: {
        label: "Spiritual",
        images: [
            "/images/new/spiritual/20130218_102358.jpg",
            "/images/new/spiritual/20130218_113345.jpg",
            "/images/new/spiritual/20140902_123743 (1).jpg",
            "/images/new/spiritual/20140919_135445.jpg",
            "/images/new/spiritual/20150108_132837.jpg",
            "/images/new/spiritual/20150109_134120.jpg",
            "/images/new/spiritual/20150117_100411.jpg",
            "/images/new/spiritual/20150204_101240.jpg",
            "/images/new/spiritual/20150331_132551.jpg",
            "/images/new/spiritual/20150331_132614.jpg",
            "/images/new/spiritual/20160303_082135.jpg",
            "/images/new/spiritual/20160303_082238.jpg",
            "/images/new/spiritual/20170124_133424.jpg",
            "/images/new/spiritual/20170217_113621.jpg",
            "/images/new/spiritual/20180322_094735.jpg",
            "/images/new/spiritual/20180322_094756(0).jpg",
            "/images/new/spiritual/20180322_094805.jpg",
            "/images/new/spiritual/20180516_105109.jpg",
            "/images/new/spiritual/20180516_105714.jpg",
            "/images/new/spiritual/20180711_095512.jpg",
            "/images/new/spiritual/20190628_090829.jpg",
            "/images/new/spiritual/20190718_073227.jpg",
            "/images/new/spiritual/20190802_111554.jpg",
            "/images/new/spiritual/IMG-20170217-WA0018.jpg",
            "/images/new/spiritual/IMG-20170217-WA0039.jpg",
            "/images/new/spiritual/IMG-20170714-WA0031.jpg",
            "/images/new/spiritual/IMG-20191019-WA0005.jpg",
            "/images/new/spiritual/IMG-20220807-WA0040.jpg",
            "/images/new/spiritual/IMG-20220807-WA0041.jpg",
            "/images/new/spiritual/IMG-20220807-WA0046.jpg",
        ],
    },
};


// Build the "all" category from everything else
const ALL_IMAGES = Object.entries(IMAGE_CATEGORIES)
    .filter(([key]) => key !== "all")
    .flatMap(([, val]) => val.images);
IMAGE_CATEGORIES.all.images = ALL_IMAGES;

const CATEGORY_KEYS = Object.keys(IMAGE_CATEGORIES);

export default function ProjectGallery() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const currentImages = IMAGE_CATEGORIES[activeCategory]?.images ?? ALL_IMAGES;

    // Embla carousel for "all" view
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        loop: true,
    });

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    // Listen for service card clicks
    useEffect(() => {
        const handler = (e: Event) => {
            const customEvent = e as CustomEvent<{ category: string }>;
            if (customEvent.detail?.category) {
                setActiveCategory(customEvent.detail.category);
            }
        };
        window.addEventListener("filterGallery", handler);
        return () => window.removeEventListener("filterGallery", handler);
    }, []);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section id="gallery" className="bg-cream py-24 px-6 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="mb-8 md:mb-12">
                    <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-leaf">
                        Our Portfolio
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-forest sm:text-4xl md:text-5xl">
                        Decades of Transforming Spaces
                    </h2>
                </div>

                {/* Category Filter Tabs */}
                <div className="mb-10 flex flex-wrap gap-2">
                    {CATEGORY_KEYS.map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all ${activeCategory === key
                                ? "bg-leaf text-white shadow-md"
                                : "bg-white text-forest border border-cream-dark/50 hover:border-leaf/40 hover:text-leaf"
                                }`}
                        >
                            {IMAGE_CATEGORIES[key].label}
                        </button>
                    ))}
                </div>

                {/* Gallery Content */}
                {activeCategory === "all" ? (
                    /* Carousel view for "All" */
                    <div className="relative">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex -ml-4 md:-ml-6 touch-pan-y">
                                {currentImages.map((src, index) => (
                                    <div
                                        key={index}
                                        className="flex-[0_0_80%] min-w-0 pl-4 md:flex-[0_0_33.333%] md:pl-6 cursor-pointer"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]">
                                            <Image
                                                src={src}
                                                alt={`VGC Landscape Project ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 80vw, 33vw"
                                                unoptimized={true}
                                            />
                                            <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/10"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Carousel Navigation */}
                        <button
                            onClick={scrollPrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest shadow-lg transition-all hover:bg-leaf hover:text-white"
                            aria-label="Previous"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest shadow-lg transition-all hover:bg-leaf hover:text-white"
                            aria-label="Next"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    /* Grid view for specific categories */
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6"
                        >
                            {currentImages.map((src, index) => (
                                <motion.div
                                    key={src}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl hover:scale-[1.02]"
                                    onClick={() => openLightbox(index)}
                                >
                                    <Image
                                        src={src}
                                        alt={`VGC ${IMAGE_CATEGORIES[activeCategory].label} Project ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        unoptimized={true}
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/10"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            {/* Full-Screen Lightbox */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={currentImages.map((src) => ({ src }))}
                className="z-[100]"
            />
        </section>
    );
}
