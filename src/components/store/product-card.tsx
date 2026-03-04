"use client";

import { useState } from "react";
import { Product } from "@/types/store";
import { useCartStore } from "@/store/cart-store";
import { formatUsd } from "@/lib/format";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <article className="prd-card group flex flex-col bg-black">
      {/* Imagen con zoom suave en hover (solo desktop) */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Badge de precio sobre la imagen */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 border border-white/5">
          <span className="text-[10px] font-bold tracking-widest text-[#ffb6c1]">
            {formatUsd(product.price)}
          </span>
        </div>
      </div>

      {/* Info + Controles (siempre visibles) */}
      <div className="flex flex-col gap-4 pt-4 pb-2">
        <div className="space-y-1 px-1">
          <h3 className="font-display text-sm tracking-wide text-zinc-100 uppercase leading-none truncate">
            {product.name}
          </h3>
          <p className="text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
            {product.subtitle}
          </p>
        </div>

        {/* Talla + Botón — siempre visibles, funciona en mobile */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full appearance-none bg-zinc-950 border border-white/10 px-3 py-2.5 text-[9px] font-bold tracking-[0.2em] text-zinc-300 uppercase outline-none focus:border-[#ffb6c1] transition-colors"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size} className="bg-black text-white">
                  {size}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-600">
              <span className="text-xs">↓</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart({ product, size: selectedSize })}
            className="shrink-0 bg-white px-4 py-2.5 text-[9px] font-bold tracking-[0.2em] text-black uppercase transition-colors hover:bg-[#ffb6c1] active:bg-[#ffb6c1] active:scale-95"
          >
            + Bolsa
          </button>
        </div>
      </div>
    </article>
  );
}
