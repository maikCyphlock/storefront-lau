"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AboutStrip() {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".about-fade", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} id="nosotros" className="about-strip grid grid-cols-1 md:grid-cols-2 min-h-[500px] border-b border-[#222]">
            <div className="about-left p-[3rem] pt-[5rem] pb-[5rem] md:border-r border-[#222] flex flex-col justify-center relative overflow-hidden">
                <div className="about-grid-bg absolute inset-0 bg-[linear-gradient(#1a1a1a_1px,transparent_1px),linear-gradient(90deg,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4]"></div>
                <div className="about-content relative z-[1] about-fade">
                    <span className="about-tag inline-block bg-[var(--white)] text-[var(--black)] font-bebas text-[0.9rem] tracking-[0.2em] px-[0.8rem] py-[0.3rem] mb-[2rem] -rotate-2">
                        BY LAU :)
                    </span>
                    <h2 className="about-title font-bebas text-[clamp(3rem,5vw,4.5rem)] leading-[0.95] mb-[2rem]">
                        FASHION<br />ES <em className="font-playfair text-[var(--mid)]">expresión</em><br />PERSONAL
                    </h2>
                    <p className="about-text text-[0.72rem] text-[var(--mid)] leading-[2] max-w-[380px]">
                        Somos Lau. Creemos que la moda es una extensión de quién eres,
                        de lo que escuchas, de lo que te mueve. Cada tshirt que hacemos lleva
                        un pedazo de tu artista favorito — y un pedazo de nosotras. ✦
                    </p>
                </div>

                {/* Wireframe heart decoration */}
                <svg className="absolute opacity-[0.08] pointer-events-none bottom-[-5%] right-[5%] w-[200px]" viewBox="0 0 100 90" fill="none" stroke="white" strokeWidth="0.6">
                    <path d="M50 80 C50 80 5 50 5 25 C5 10 15 5 25 5 C35 5 45 15 50 20 C55 15 65 5 75 5 C85 5 95 10 95 25 C95 50 50 80 50 80Z" />
                    <line x1="50" y1="5" x2="50" y2="80" />
                    <line x1="15" y1="20" x2="85" y2="20" />
                    <line x1="8" y1="35" x2="92" y2="35" />
                    <line x1="10" y1="50" x2="90" y2="50" />
                    <line x1="20" y1="65" x2="80" y2="65" />
                </svg>
            </div>

            <div className="about-right p-[3rem] pt-[5rem] pb-[5rem] flex flex-col justify-between">
                <div className="about-cards flex flex-col gap-[1px] bg-[#222] h-full about-fade">
                    <div className="about-card bg-[var(--black)] p-[2rem] flex-1 flex gap-[1.5rem] items-start transition-colors duration-200 hover:bg-[#111]">
                        <div className="about-card-icon w-[40px] h-[40px] border border-[#333] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-[var(--mid)] fill-none" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="about-card-title font-bebas text-[1.1rem] tracking-[0.1em] mb-[0.5rem]">TUS FAVS ✦</h3>
                            <p className="about-card-text text-[0.65rem] text-[var(--mid)] leading-[1.8]">Hay muchas formas de expresar tus gustos y la moda es una de ellas. Lleva a tu artista favorito contigo a todos lados.</p>
                        </div>
                    </div>

                    <div className="about-card bg-[var(--black)] p-[2rem] flex-1 flex gap-[1.5rem] items-start transition-colors duration-200 hover:bg-[#111]">
                        <div className="about-card-icon w-[40px] h-[40px] border border-[#333] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-[var(--mid)] fill-none" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="about-card-title font-bebas text-[1.1rem] tracking-[0.1em] mb-[0.5rem]">OVERSIZE FIT</h3>
                            <p className="about-card-text text-[0.65rem] text-[var(--mid)] leading-[1.8]">Tener una tshirt oversize cambia las reglas del juego. El fit lo es todo, y nosotras lo sabemos &lt;3</p>
                        </div>
                    </div>

                    <div className="about-card bg-[var(--black)] p-[2rem] flex-1 flex gap-[1.5rem] items-start transition-colors duration-200 hover:bg-[#111]">
                        <div className="about-card-icon w-[40px] h-[40px] border border-[#333] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-[var(--mid)] fill-none" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M3 12h.01M12 3v.01M21 12h.01M12 21v.01M5.636 5.636l.007.007M18.364 5.636l.007.007M18.364 18.364l.007.007M5.636 18.364l.007.007" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="about-card-title font-bebas text-[1.1rem] tracking-[0.1em] mb-[0.5rem]">ENTREGAS · ENVÍOS</h3>
                            <p className="about-card-text text-[0.65rem] text-[var(--mid)] leading-[1.8]">Acarigua entregas personales. Envíos nacionales — tu camiseta llega a donde estés :)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
