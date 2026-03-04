"use client";

import { useState } from "react";
import { HeroSection } from "@/components/store/hero-section";
import { Navbar } from "@/components/store/navbar";
import { ProductList } from "@/components/store/product-list";
import { CartDrawer } from "@/components/store/cart-drawer";
import { useCartStore } from "@/store/cart-store";
import { useStore } from "@/hooks/use-store";

export function Storefront() {
  const [open, setOpen] = useState(false);
  const cartCount = useStore(useCartStore, (state) => state.totalItems()) ?? 0;

  return (
    <div className="min-h-screen bg-black">
      <Navbar cartCount={cartCount} onOpenCart={() => setOpen(true)} />

      <HeroSection />
      <ProductList />

      {/* Custom Studio */}
      <section id="custom" className="mx-auto w-full max-w-5xl px-4 py-28 border-t border-white/[0.04]">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <p className="text-[9px] font-bold tracking-[0.5em] text-[#ffb6c1] uppercase">
                Concepto / Studio
              </p>
              <h2 className="font-display text-4xl text-white uppercase tracking-tight leading-none">
                Estudio de<br />Diseño Custom
              </h2>
            </div>

            <p className="text-sm font-light text-zinc-400 leading-relaxed max-w-sm">
              No solo vendemos ropa, construimos visiones. Cada pieza personalizada es un diálogo entre tu identidad y nuestra maestría técnica.
            </p>

            <div className="pt-4 border-t border-white/5 w-fit pr-10">
              <p className="text-[10px] font-bold tracking-widest text-[#ffb6c1] uppercase">
                Estado: Consultas abiertas_
              </p>
            </div>
          </div>

          <div className="flex-1 w-full aspect-[4/5] relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              alt="Custom Process"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[9px] font-bold tracking-[0.4em] text-white/50 uppercase">
                Proceso Artesanal .01
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section id="statement" className="mx-auto w-full max-w-4xl px-4 py-28 text-center">
        <div className="space-y-6">
          <p className="text-[9px] font-bold tracking-[0.5em] text-zinc-600 uppercase">
            Nuestra Filosofía
          </p>
          <p className="font-display text-2xl md:text-3xl text-zinc-200 uppercase tracking-tight leading-tight">
            Combinamos estética dark, energía juvenil<br />y diseño estructural en el corazón de Acarigua.
          </p>
          <div className="h-px w-20 bg-[#ffb6c1]/30 mx-auto mt-8" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/[0.04]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 text-[9px] font-bold tracking-[0.4em] text-zinc-600 uppercase sm:px-6">
          <span>&copy; OverSizeByLau . MMXXVI</span>
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-zinc-800" />
            <span>Acarigua / Portuguesa</span>
          </div>
        </div>
      </footer>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
