"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const COLLECTION_ITEMS = [
    {
        src: "/product/book.jpeg",
        alt: "New Collection — Oversize Graphic Tee 01",
        label: "PIECE 01",
    },
    {
        src: "/product/book-2.jpeg",
        alt: "New Collection — Oversize Graphic Tee 02",
        label: "PIECE 02",
    },
    {
        src: "/product/book-3.jpeg",
        alt: "New Collection — Oversize Graphic Tee 03",
        label: "PIECE 03",
    },
];

export function Lookbook() {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".look-fade", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 40,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.2,
            });

            // Parallax effect on hover for images
            const cells = document.querySelectorAll('.look-cell');
            cells.forEach((cell) => {
                const img = cell.querySelector('img');
                if (img) {
                    cell.addEventListener('mouseenter', () => {
                        gsap.to(img, { scale: 1.08, duration: 1.5, ease: "power2.out" });
                    });
                    cell.addEventListener('mouseleave', () => {
                        gsap.to(img, { scale: 1.0, duration: 1.5, ease: "power2.out" });
                    });
                }
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="lookbook py-[8rem] px-[4vw] border-b border-[#1a1a1a]" id="lookbook">
            {/* Header */}
            <div className="section-header flex justify-between items-end mb-[5rem] look-fade">
                <div className="flex flex-col gap-4">
                    <span className="text-[0.6rem] tracking-[0.4em] text-[var(--mid)] uppercase font-mono-custom">PRÓXIMA COLECCIÓN</span>
                    <h2 className="font-bebas text-[clamp(4rem,10vw,8rem)] leading-[0.85] tracking-[-0.02em] uppercase">
                        NEW<br />COLLECTION
                    </h2>
                </div>
                <div className="text-right hidden md:block">
                    <span className="text-[0.6rem] tracking-[0.4em] text-[var(--mid)] uppercase font-mono-custom block mb-2">DROP 01 / 2025</span>
                    <span className="text-[0.55rem] tracking-[0.3em] text-[var(--pink-soft)] uppercase font-mono-custom opacity-70 italic">OVERSIZE COLLECTION</span>
                </div>
            </div>

            {/* Collection Grid — 3 pieces */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#1a1a1a] look-fade">
                {COLLECTION_ITEMS.map((item, i) => (
                    <div
                        key={i}
                        className="look-cell relative overflow-hidden bg-[#050505] group aspect-[3/4]"
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-cover object-top opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent_50%)] pointer-events-none" />

                        {/* Top label */}
                        <div className="absolute top-6 left-6 z-10">
                            <span className="text-[0.5rem] tracking-[0.5em] text-[rgba(255,255,255,0.4)] font-mono-custom uppercase">{item.label}</span>
                        </div>

                        {/* Bottom info */}
                        <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
                            <div>
                                <span className="text-[0.55rem] tracking-[0.3em] text-[rgba(255,255,255,0.6)] font-mono-custom uppercase block">OVERSIZE TEE</span>
                                <span className="text-[0.45rem] tracking-[0.3em] text-[rgba(255,255,255,0.3)] font-mono-custom uppercase">240 GSM</span>
                            </div>
                            <span className="bg-[var(--white)] text-[var(--black)] font-mono-custom text-[0.5rem] tracking-[0.2em] px-3 py-1.5 uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                VER MÁS
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Technical Strip  */}
            <div className="mt-12 bg-[var(--black)] border border-[#1a1a1a] p-8 md:p-12 look-fade">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-3">
                        <span className="text-[0.55rem] tracking-[0.4em] text-[var(--pink-soft)] uppercase font-mono-custom block">ESPECIFICACIONES DE LA COLECCIÓN</span>
                        <div className="flex gap-8 flex-wrap">
                            <div className="flex flex-col gap-1">
                                <span className="text-[0.5rem] text-[var(--mid)] font-mono-custom">MATERIAL</span>
                                <span className="text-[0.6rem] text-[var(--white)] font-mono-custom uppercase">100% Algodón Premium</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[0.5rem] text-[var(--mid)] font-mono-custom">PESO TELA</span>
                                <span className="text-[0.6rem] text-[var(--white)] font-mono-custom uppercase">240 GSM / Heavyweight</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[0.5rem] text-[var(--mid)] font-mono-custom">FIT</span>
                                <span className="text-[0.6rem] text-[var(--white)] font-mono-custom uppercase">Oversize / Drop Shoulder</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[0.5rem] text-[var(--mid)] font-mono-custom">ORIGEN</span>
                                <span className="text-[0.6rem] text-[var(--white)] font-mono-custom uppercase">Acarigua, Venezuela</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <span className="font-bebas text-[2rem] tracking-[0.05em] leading-none block">3 PIEZAS</span>
                        <span className="text-[0.5rem] tracking-[0.3em] text-[var(--mid)] font-mono-custom uppercase">EDICIÓN LIMITADA</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                <div className="flex gap-12">
                    <span className="text-[0.45rem] tracking-[0.4em] text-[var(--mid)] font-mono-custom">DROP 01</span>
                    <span className="text-[0.45rem] tracking-[0.4em] text-[var(--mid)] font-mono-custom">OVERSIZE</span>
                    <span className="text-[0.45rem] tracking-[0.4em] text-[var(--mid)] font-mono-custom">240 GSM</span>
                </div>
                <div className="font-mono-custom text-[0.45rem] tracking-[0.5em] text-[var(--mid)] uppercase">
                    PROPIEDAD INTELECTUAL © 2025 BY LAU
                </div>
            </div>
        </section>
    );
}
