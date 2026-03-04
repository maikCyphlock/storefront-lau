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
    <article className="prd-card group relative flex flex-col bg-black">
      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Precio flotante al hover */}
        <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/5">
            <span className="text-[10px] font-bold tracking-widest text-[#ffb6c1]">{formatUsd(product.price)}</span>
          </div>
        </div>

        {/* Panel de acción hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="flex flex-col gap-3 pt-8">
            <div className="relative">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full appearance-none bg-black/40 backdrop-blur-sm border border-white/10 px-4 py-2.5 text-[9px] font-bold tracking-[0.3em] text-white uppercase outline-none focus:border-[#ffb6c1] transition-colors"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size} className="bg-black text-white">
                    Talla: {size}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500">
                <span className="text-xs">↓</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => addToCart({ product, size: selectedSize })}
              className="w-full bg-white py-3 text-[9px] font-bold tracking-[0.4em] text-black uppercase transition-all duration-300 hover:bg-[#ffb6c1] active:scale-95"
            >
              Añadir a Bolsa
            </button>
          </div>
        </div>
      </div>

      {/* Info debajo de la imagen */}
      <div className="mt-4 space-y-1 px-1">
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="font-display text-sm tracking-wide text-zinc-100 uppercase leading-none truncate flex-1">{product.name}</h3>
          <span className="text-[10px] font-bold text-zinc-500">{formatUsd(product.price)}</span>
        </div>
        <p className="text-[9px] font-bold tracking-[0.2em] text-zinc-600 uppercase">{product.subtitle}</p>
      </div>
    </article>
  );
}
