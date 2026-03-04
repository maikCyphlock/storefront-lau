"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { ProductCard } from "@/components/store/product-card";
import { Product } from "@/types/store";

gsap.registerPlugin(ScrollTrigger);

type ProductListProps = {
  onSelectProduct: (product: Product) => void;
};

export function ProductList({ onSelectProduct }: ProductListProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".fade-in-section", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });

      gsap.from(".product-card-fade", {
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section py-[6rem] px-[3rem] border-b border-[#222]" id="productos">
      <div className="section-header flex justify-between items-end mb-[4rem] fade-in-section">
        <h2 className="section-title font-bebas text-[clamp(3rem,6vw,5rem)] leading-[1] tracking-[-0.01em]">COLECCIÓN<br />ACTUAL</h2>
        <span className="section-num text-[0.65rem] text-[var(--mid)] tracking-[0.2em]">01 / PRODUCTOS</span>
      </div>

      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#222]">
        {products.map((product) => (
          <div key={product.id} className="product-card-fade">
            <ProductCard product={product} onSelect={onSelectProduct} />
          </div>
        ))}
      </div>
    </section>
  );
}
