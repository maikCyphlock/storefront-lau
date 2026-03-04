"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Footer() {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".footer-fade", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 90%",
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
            });
        },
        { scope: container }
    );

    return (
        <footer ref={container} id="contacto" className="pt-[4rem] px-[3rem] pb-[2rem] border-t border-[#222] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-[3rem]">
            <div className="footer-brand footer-fade sm:col-span-2 md:col-span-1">
                <div className="footer-logo font-bebas text-[3rem] leading-[1] mb-[1rem] tracking-[-0.02em]">OVERSIZE<br />BY LAU</div>
                <p className="footer-tagline text-[0.65rem] text-[var(--mid)] tracking-[0.15em] uppercase mb-[2rem] flex items-center gap-[0.5rem]">
                    <span className="animate-[twinkle_2s_ease-in-out_infinite] text-[var(--white)] text-[1rem]">✦</span> Tshirt Oversize · Diseños personalizados
                </p>
                <a href="https://instagram.com/oversizebylau" className="footer-handle text-[0.7rem] text-[var(--mid)] flex items-center gap-[0.5rem] no-underline transition-colors duration-200 hover:text-[var(--white)]" target="_blank">
                    ↗ @oversizebylau
                </a>
            </div>

            <div className="footer-fade">
                <p className="footer-col-title font-bebas text-[1rem] tracking-[0.2em] mb-[1.5rem] text-[var(--mid)]">Navegación</p>
                <ul className="footer-links list-none flex flex-col gap-[0.8rem]">
                    <li><Link href="#productos" className="text-[#555] no-underline text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--white)]">Productos</Link></li>
                    <li><Link href="#nosotros" className="text-[#555] no-underline text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--white)]">Nosotros</Link></li>
                    <li><Link href="#lookbook" className="text-[#555] no-underline text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--white)]">Lookbook</Link></li>
                </ul>
            </div>

            <div className="footer-fade">
                <p className="footer-col-title font-bebas text-[1rem] tracking-[0.2em] mb-[1.5rem] text-[var(--mid)]">Contacto</p>
                <ul className="footer-links list-none flex flex-col gap-[0.8rem]">
                    <li><a href="#" className="text-[#555] no-underline text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--white)]">Instagram DM</a></li>
                    <li><a href="#" className="text-[#555] no-underline text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--white)]">WhatsApp</a></li>
                    <li><span className="text-[#555] text-[0.65rem] tracking-[0.1em] uppercase">Acarigua, Venezuela</span></li>
                </ul>
            </div>

            <div className="footer-bottom mt-[4rem] pt-[1.5rem] border-t border-[#1a1a1a] flex justify-between items-center col-span-1 sm:col-span-2 md:col-span-3">
                <span className="footer-copy text-[0.6rem] text-[#333] tracking-[0.1em]">© 2024 Oversize By Lau · By Lau :)</span>
                <span className="footer-barcode text-[0.5rem] text-[#222] tracking-[-0.05em] font-mono-custom">||| || | ||| | || || ||| | || | ||| || | || ||| 8 230 258 7</span>
            </div>
        </footer>
    );
}
