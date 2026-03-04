"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
                y: 30,
                duration: 1,
                stagger: 0.15,
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="lookbook py-[6rem] px-[3rem] border-b border-[#222]" id="lookbook">
            <div className="section-header flex justify-between items-end mb-[4rem] look-fade">
                <h2 className="section-title font-bebas text-[clamp(3rem,6vw,5rem)] leading-[1] tracking-[-0.01em]">LOOK<br />BOOK</h2>
                <span className="section-num text-[0.65rem] text-[var(--mid)] tracking-[0.2em]">02 / EDITORIAL</span>
            </div>

            <div className="lookbook-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] md:grid-rows-[300px_300px] gap-[1px] bg-[#222] mt-[4rem] look-fade">
                <div className="look-cell bg-[var(--black)] relative overflow-hidden flex items-center justify-center sm:col-span-2 md:col-span-1 md:row-span-2 min-h-[300px]">
                    <div className="look-bg-text absolute inset-0 flex items-center justify-center font-bebas text-[5rem] text-[rgba(255,255,255,0.04)] tracking-[-0.05em] text-center leading-[1] p-[1rem]">OVERSIZE BY LAU</div>
                    <div className="relative z-[2] w-full h-full flex items-center justify-center">
                        <div className="w-[220px] h-[280px] border border-[#222] flex items-center justify-center relative">
                            <span className="font-bebas text-[3.5rem] text-[#1a1a1a] tracking-[-0.02em] leading-[1] text-center">THE<br />WEEKND<br />TEE</span>
                        </div>
                    </div>
                    <div className="look-overlay absolute bottom-0 left-0 right-0 p-[1.5rem] bg-[linear-gradient(to_top,rgba(0,0,0,0.9),transparent)]">
                        <p className="look-label text-[0.6rem] tracking-[0.2em] text-[var(--mid)] uppercase">Editorial · Colección principal</p>
                    </div>
                </div>

                <div className="look-cell bg-[var(--black)] relative overflow-hidden flex items-center justify-center min-h-[300px]">
                    <div className="look-bg-text absolute inset-0 flex items-center justify-center font-bebas text-[5rem] text-[rgba(255,255,255,0.04)] tracking-[-0.05em] text-center leading-[1] p-[1rem]">MESSI</div>
                    <div className="relative z-[2] text-center">
                        <span className="font-bebas text-[2.5rem] text-[#1c1c1c] tracking-[0.1em]">LIONEL<br />MESSI</span>
                    </div>
                    <div className="look-overlay absolute bottom-0 left-0 right-0 p-[1.5rem] bg-[linear-gradient(to_top,rgba(0,0,0,0.9),transparent)]">
                        <p className="look-label text-[0.6rem] tracking-[0.2em] text-[var(--mid)] uppercase">Fútbol · Ícono</p>
                    </div>
                </div>

                <div className="look-cell bg-[var(--black)] relative overflow-hidden flex items-center justify-center min-h-[300px]">
                    <div className="look-bg-text absolute inset-0 flex items-center justify-center font-bebas text-[5rem] text-[rgba(255,255,255,0.04)] tracking-[-0.05em] text-center leading-[1] p-[1rem]">TAYLOR & KANYE</div>
                    <div className="relative z-[2] text-center">
                        <span className="font-bebas text-[2.5rem] text-[#1c1c1c] tracking-[0.1em]">TAYLOR<br />& KANYE</span>
                    </div>
                    <div className="look-overlay absolute bottom-0 left-0 right-0 p-[1.5rem] bg-[linear-gradient(to_top,rgba(0,0,0,0.9),transparent)]">
                        <p className="look-label text-[0.6rem] tracking-[0.2em] text-[var(--mid)] uppercase">Pop · Ícono</p>
                    </div>
                </div>

                <div className="look-cell bg-[var(--black)] relative overflow-hidden flex items-center justify-center min-h-[300px]">
                    <div className="look-bg-text absolute inset-0 flex items-center justify-center font-bebas text-[5rem] text-[rgba(255,255,255,0.04)] tracking-[-0.05em] text-center leading-[1] p-[1rem]">BIEBER</div>
                    <div className="relative z-[2] text-center">
                        <span className="font-bebas text-[2.5rem] text-[#1c1c1c] tracking-[0.1em] text-center block">JUSTIN<br />BIEBER</span>
                    </div>
                    <div className="look-overlay absolute bottom-0 left-0 right-0 p-[1.5rem] bg-[linear-gradient(to_top,rgba(0,0,0,0.9),transparent)]">
                        <p className="look-label text-[0.6rem] tracking-[0.2em] text-[var(--mid)] uppercase">Pop · Ícono</p>
                    </div>
                </div>

                <div className="look-cell bg-[#0d0d0d] relative overflow-hidden flex items-center justify-center min-h-[300px]">
                    <div className="relative z-[2] text-center p-[1.5rem]">
                        <div className="text-[0.6rem] tracking-[0.3em] text-[#333] uppercase mb-[1rem]">@oversizebylau</div>
                        <div className="font-bebas text-[2rem] text-[#222] tracking-[0.1em]">TU FAVO<br />AQUÍ</div>
                        <div className="mt-[1rem] text-[0.6rem] text-[#2a2a2a] tracking-[0.2em]">DISEÑO CUSTOM ✦</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
