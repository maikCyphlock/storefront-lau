"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/store/hero-section";
import { Navbar } from "@/components/store/navbar";
import { ProductList } from "@/components/store/product-list";
import { CartDrawer } from "@/components/store/cart-drawer";
import { ProductModal } from "@/components/store/product-modal";
import { Ticker } from "@/components/store/ticker";
import { AboutStrip } from "@/components/store/about-strip";
import { ArtistMarquee } from "@/components/store/artist-marquee";
import { Lookbook } from "@/components/store/lookbook";
import { Footer } from "@/components/store/footer";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/store";

type StorefrontProps = {
  products: Product[];
};

export function Storefront({ products }: StorefrontProps) {
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const cartCount = useCartStore((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cursor glow effect — desktop only
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position:fixed;width:200px;height:200px;border-radius:50%;
      background:radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%);
      pointer-events:none;z-index:9998;transform:translate(-50%,-50%);
      transition:transform 0.1s;
    `;
    document.body.appendChild(cursor);

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)] selection:bg-[var(--white)] selection:text-[var(--black)]">
      <Navbar cartCount={mounted ? cartCount : 0} onOpenCart={() => setCartOpen(true)} />

      <HeroSection />

      <Ticker />

      {/* COMING SOON BAND — exact HTML values */}
      <div className="coming-band bg-[var(--white)] text-[var(--black)] py-[1rem] px-[3rem] flex items-center gap-[2rem] overflow-hidden relative border-b border-[#222]">
        <span className="font-bebas text-[1.5rem] tracking-[0.2em] whitespace-nowrap shrink-0">NUEVA COLECCIÓN</span>
        <div className="flex gap-[0.5rem] text-[var(--black)] text-[1.2rem]">✦ ✦ ✦</div>
        <span className="bg-[var(--pink-soft)] text-[var(--black)] font-bebas text-[0.8rem] tracking-[0.2em] px-[0.8rem] py-[0.25rem] -rotate-3 shrink-0">LAU</span>
        <span className="font-bebas text-[1.5rem] tracking-[0.2em] whitespace-nowrap shrink-0">COMING SOON</span>
        <div className="flex gap-[0.5rem] text-[var(--black)] text-[1.2rem]">✦ ✦ ✦</div>
        <span className="bg-[var(--black)] text-[var(--white)] font-bebas text-[0.8rem] tracking-[0.2em] px-[0.8rem] py-[0.25rem] -rotate-3 shrink-0">SEE U SOON</span>
        <span className="font-bebas text-[1.5rem] tracking-[0.2em] whitespace-nowrap shrink-0">NUEVA COLECCIÓN</span>
      </div>

      <ProductList products={products} onSelectProduct={setSelectedProduct} />

      <ArtistMarquee />

      <AboutStrip />

      <Lookbook />

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
