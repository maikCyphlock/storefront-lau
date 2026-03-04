"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { ProductCard } from "@/components/store/product-card";

gsap.registerPlugin(ScrollTrigger);

export function ProductList() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".prd-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".product-grid",
          start: "top 85%",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="drop" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-col gap-3 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-bold tracking-[0.4em] text-[#ffb6c1] uppercase">Colección</p>
          <h2 className="font-display mt-3 text-3xl text-zinc-100 uppercase tracking-tight sm:text-4xl">
            Dark Extensions
          </h2>
        </div>
        <p className="max-w-sm text-xs leading-5 text-zinc-500 font-light">
          Piezas listas para usar. Identidad oscura y cruda.
        </p>
      </div>

      <div className="product-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
