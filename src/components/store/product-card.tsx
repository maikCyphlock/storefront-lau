"use client";

import { Product } from "@/types/store";

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const cover = product.media[0];

  return (
    <div
      className="product-card group bg-[var(--black)] aspect-[3/4] relative overflow-hidden flex flex-col justify-end p-[1.5rem] cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Product image */}
      {cover?.type === "video" ? (
        <video
          src={cover.url}
          muted
          playsInline
          autoPlay
          loop
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-[1.05] opacity-80 group-hover:opacity-100"
        />
      ) : (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-[1.05] opacity-80 group-hover:opacity-100"
        />
      )}

      {/* Dark gradient overlay — matches HTML ::before */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,transparent_60%)] z-[1]" />

      {/* Size variants */}
      <div className="product-variants absolute top-[1rem] right-[1rem] flex gap-[0.4rem] z-[2]">
        {product.sizes.map((size) => (
          <div
            key={size}
            className="variant-dot w-[20px] h-[20px] border border-[#444] flex items-center justify-center text-[0.55rem] tracking-[0.05em] text-[var(--mid)] font-bebas"
          >
            {size}
          </div>
        ))}
      </div>

      {/* Decorative barcode */}
      <div className="card-barcode absolute bottom-[5rem] right-[1.5rem] opacity-[0.15] z-[2] text-[0.4rem] tracking-[-0.02em] [writing-mode:vertical-rl] text-[var(--mid)]">
        8 230 258 {product.id.toString().slice(-1)}
      </div>

      {/* Product info */}
      <div className="product-info relative z-[2]">
        <p className="product-category text-[0.55rem] tracking-[0.25em] text-[var(--mid)] uppercase mb-[0.4rem]">
          {product.subtitle}
        </p>
        <h3 className="product-name font-bebas text-[1.8rem] tracking-[0.05em] leading-[1] mb-[0.8rem] text-[var(--white)]">
          {product.name}
        </h3>
        <div className="product-footer flex justify-between items-center">
          <span className="product-price text-[0.75rem] text-[var(--mid)] tracking-[0.1em]">
            Consultar precio
          </span>
          <span
            className="product-tag text-[0.55rem] tracking-[0.15em] text-[var(--mid)] border border-[#333] px-[0.5rem] py-[0.25rem] uppercase transition-all duration-200 group-hover:bg-[var(--pink-soft)] group-hover:text-[var(--black)] group-hover:border-[var(--pink-soft)]"
          >
            Ver más →
          </span>
        </div>
      </div>
    </div>
  );
}
