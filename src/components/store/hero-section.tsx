"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero-overlay-text", { opacity: 0, scale: 1.1, duration: 2 })
        .from(".hero-eye", { opacity: 0, x: -30, duration: 1.2 }, "-=1.5")
        .from(".hero-title-main", { opacity: 0, y: 60, duration: 1.6 }, "-=1.2")
        .from(".hero-subtitle-line", { scaleX: 0, duration: 1 }, "-=1.2")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 1.2 }, "-=0.8")
        .from(".hero-cta-btn", { opacity: 0, y: 20, duration: 0.8 }, "-=0.8")
        .from(".hero-right-content", { opacity: 0, x: 40, duration: 1.8 }, "-=1.8")
        .from(".hero-scroll-hint", { opacity: 0, y: -10, duration: 1 }, "-=0.5");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="hero min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      <div className="hero-left flex flex-col justify-end px-[2rem] pt-[8rem] pb-[4rem] md:px-[3rem] md:border-r border-[#222] relative z-[2]">
        <div className="absolute inset-0 md:hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-28"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.35)_35%,rgba(10,10,10,0.88)_100%)]" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(#1a1a1a_1px,transparent_1px),linear-gradient(90deg,#1a1a1a_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.3] pointer-events-none" />

        <svg className="absolute opacity-[0.06] pointer-events-none top-[8%] right-[5%] w-[120px] animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
          <ellipse cx="50" cy="50" rx="45" ry="45" />
          <ellipse cx="50" cy="50" rx="45" ry="20" />
          <ellipse cx="50" cy="50" rx="20" ry="45" />
          <ellipse cx="50" cy="50" rx="45" ry="35" transform="rotate(30 50 50)" />
          <line x1="5" y1="50" x2="95" y2="50" />
          <line x1="50" y1="5" x2="50" y2="95" />
        </svg>

        <div className="absolute top-28 left-[2rem] flex flex-col gap-1 z-[2] md:left-[3rem]">
          <span className="text-[0.5rem] tracking-[0.3em] text-[#333] font-mono-custom">09&apos;19&apos;N</span>
          <span className="text-[0.5rem] tracking-[0.3em] text-[#333] font-mono-custom">69&apos;39&apos;W</span>
          <span className="text-[0.5rem] tracking-[0.2em] text-[#444] font-mono-custom mt-1">ACARIGUA · VE</span>
        </div>

        <p className="hero-eye text-[0.65rem] tracking-[0.3em] text-[var(--mid)] uppercase mb-[1.5rem] flex items-center gap-[1rem] relative z-[1]">
          <span className="inline-block w-[30px] h-[1px] bg-[var(--mid)]" />
          Tshirt Oversize · Diseños personalizados
        </p>

        <h1 className="hero-title-main font-bebas text-[clamp(5rem,12vw,10rem)] leading-[0.9] tracking-[-0.02em] mb-[2rem] relative z-[1]">
          <span className="block text-[0.5em] font-mono-custom tracking-[0.3em] text-[var(--mid)] mb-[0.5rem]">by Lau</span>
          OVER
          <br />
          SIZE
        </h1>

        <div className="hero-subtitle-line w-[60px] h-[1px] bg-[var(--white)] mb-[2rem] origin-left relative z-[1]" />

        <p className="hero-desc text-[0.75rem] text-[var(--mid)] font-mono-custom leading-[1.8] max-w-[320px] mb-[2.5rem] relative z-[1]">
          Lleva a tu artista favorito contigo.
          <br />
          Diseños únicos que expresan quién eres,
          <br />
          en la mejor tela oversize. ✦
        </p>

        <div className="flex items-center gap-[1.5rem] relative z-[1] flex-wrap">
          <Link href="#productos" className="hero-cta-btn inline-flex items-center gap-[1rem] bg-[var(--white)] text-[var(--black)] no-underline font-bebas text-[1.1rem] tracking-[0.15em] px-[2rem] py-[1rem] w-fit transition-all duration-300 hover:bg-[var(--black)] hover:text-[var(--white)] hover:outline hover:outline-1 hover:outline-[var(--white)]">
            Ver colección
            <span className="font-mono text-[0.8em]">→</span>
          </Link>
          <a href="https://instagram.com/oversizebylau" target="_blank" className="hero-cta-btn text-[0.65rem] tracking-[0.2em] text-[var(--mid)] uppercase transition-colors duration-200 hover:text-[var(--white)] no-underline">
            @oversizebylau
          </a>
        </div>

        <div className="hero-scroll-hint absolute bottom-6 left-[2rem] flex items-center gap-2 md:left-[3rem]">
          <div className="w-[1px] h-[30px] bg-[#333] relative overflow-hidden">
            <div className="w-full h-[10px] bg-[var(--mid)] animate-[scrollPulse_2s_ease-in-out_infinite]" />
          </div>
          <span className="text-[0.45rem] tracking-[0.3em] text-[#333] uppercase font-mono-custom">Scroll</span>
        </div>
      </div>

      <div className="hero-right hidden md:flex relative bg-[#0d0d0d] hero-right-content overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-[1.05]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_0%,transparent_30%)] z-[1]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0a0a_0%,transparent_40%)] z-[1]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a0a0a_0%,transparent_30%)] z-[1]" />

        <div className="hero-overlay-text absolute inset-0 flex items-center justify-center font-bebas text-[18rem] lg:text-[22rem] text-white opacity-[0.04] select-none z-[2] leading-[0.8] tracking-[-0.05em] text-center pointer-events-none">
          OBL
        </div>

        <div className="spotify-widget bg-[rgba(10,10,10,0.9)] border border-[#222] p-[1rem] px-[1.2rem] flex items-center gap-[1rem] w-fit absolute bottom-[2rem] right-[2rem] z-[5] animate-[floatWidget_3s_ease-in-out_infinite] backdrop-blur-sm">
          <div className="w-[36px] h-[36px] bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[1rem] shrink-0">🎵</div>
          <div className="flex-1 min-w-[120px]">
            <div className="text-[0.65rem] text-[var(--white)] tracking-[0.05em] mb-[0.2rem]">Blinding Lights</div>
            <div className="text-[0.55rem] text-[var(--mid)] tracking-[0.05em]">The Weeknd</div>
            <div className="w-full h-[2px] bg-[#333] mt-[0.4rem] relative overflow-hidden">
              <div className="w-[40%] h-full bg-[var(--white)] animate-[progressBar_8s_linear_infinite]" />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="bg-none border-none text-[var(--mid)] cursor-pointer text-[0.75rem] p-[0.2rem] transition-colors hover:text-[var(--white)]">⏮</button>
            <button className="bg-none border-none text-[var(--white)] cursor-pointer text-[0.8rem] p-[0.2rem]">▶</button>
            <button className="bg-none border-none text-[var(--mid)] cursor-pointer text-[0.75rem] p-[0.2rem] transition-colors hover:text-[var(--white)]">⏭</button>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-[5] text-right">
          <div className="text-[0.5rem] tracking-[0.3em] text-[#555] uppercase mb-1 font-mono-custom">Featured</div>
          <div className="font-bebas text-[1.4rem] text-[var(--white)] tracking-[0.1em] leading-[1]">THE WEEKND</div>
          <div className="text-[0.5rem] tracking-[0.2em] text-[#444] uppercase mt-1 font-mono-custom">Oversize Tee · Edición</div>
        </div>

        <div className="absolute bottom-8 left-8 z-[5] flex flex-col gap-1">
          <span className="text-[0.5rem] tracking-[0.3em] text-[#444] uppercase font-mono-custom">Colección 2024</span>
          <span className="text-[0.5rem] tracking-[0.2em] text-[#333] font-mono-custom">— 01 / 08</span>
        </div>

        <div className="absolute top-1/2 left-6 -translate-y-1/2 z-[3] [writing-mode:vertical-rl] rotate-180">
          <span className="text-[0.5rem] tracking-[0.4em] text-[#333] uppercase font-mono-custom">Oversize By Lau · Acarigua</span>
        </div>
      </div>
    </section>
  );
}
