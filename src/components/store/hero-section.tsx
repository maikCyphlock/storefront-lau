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

      tl.from(".hero-uptitle", { opacity: 0, y: 10, duration: 1.2 })
        .from(".hero-title span", { y: "110%", duration: 1.4, stagger: 0.15 }, "-=0.8")
        .from(".hero-desc", { opacity: 0, duration: 1.5 }, "-=1")
        .from(".hero-cta", { opacity: 0, y: 15, duration: 0.8, stagger: 0.1 }, "-=1.2");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Luz ambiental sutil rosa */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,182,193,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        <p className="hero-uptitle mb-6 text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">
          Acarigua / Estética Digital y Textil
        </p>

        <h1 className="hero-title font-display flex flex-col items-center gap-0">
          <div className="overflow-hidden pb-2">
            <span className="block text-[clamp(3.5rem,12vw,9rem)] leading-none text-white tracking-[-0.03em] uppercase">
              OverSize
            </span>
          </div>
          <div className="overflow-hidden pb-2">
            <span className="block text-[clamp(3.5rem,12vw,9rem)] leading-none text-[#ffb6c1] tracking-[-0.03em] uppercase">
              ByLau
            </span>
          </div>
        </h1>

        <p className="hero-desc mt-8 max-w-lg text-sm md:text-base text-zinc-400 font-light leading-relaxed">
          Experimenta el lujo de lo personalizado. Piezas diseñadas para quienes ven la moda como una extensión de su identidad.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/#drop"
            className="hero-cta group relative px-10 py-4 overflow-hidden border border-white/10 rounded-full transition-all hover:border-[#ffb6c1]"
          >
            <span className="relative z-10 text-[10px] font-bold tracking-[0.3em] text-white uppercase group-hover:text-black transition-colors duration-300">
              Ver Colección
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>

          <Link
            href="/#custom"
            className="hero-cta text-[10px] font-bold tracking-[0.3em] text-[#ffb6c1] uppercase hover:text-white transition-colors"
          >
            Sastrería Digital _
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}
