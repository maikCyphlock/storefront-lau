"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatUsd } from "@/lib/format";
import { useStore } from "@/hooks/use-store";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useStore(useCartStore, (state) => state.items) ?? [];
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const totalPrice = useStore(useCartStore, (state) => state.totalPrice()) ?? 0;

  if (!open) return null;

  return (
    <div className="fixed inset-0" style={{ zIndex: 9999 }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/5 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h3 className="font-display text-xs font-bold tracking-[0.4em] text-[#ffb6c1] uppercase">
            Bolsa de Compra
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <div className="w-10 h-px bg-zinc-800" />
              <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-600 uppercase">
                Tu bolsa está vacía
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 pb-5 border-b border-white/5 last:border-0"
                >
                  {/* Imagen */}
                  <div className="w-20 h-24 shrink-0 overflow-hidden bg-zinc-900">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Detalles */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="font-display text-sm text-zinc-100 uppercase tracking-wide truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[9px] font-bold tracking-widest text-zinc-500 mt-1">
                        TALLA: {item.size}
                      </p>
                    </div>

                    <div className="flex items-end justify-between">
                      {/* Controles cantidad */}
                      <div className="flex items-center border border-white/10">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white text-sm"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-[10px] font-bold text-zinc-200">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Precio y eliminar */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#ffb6c1]">
                          {formatUsd(item.product.price * item.quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.product.id, item.size)
                          }
                          className="text-[9px] font-bold tracking-widest text-zinc-600 uppercase hover:text-red-400 transition-colors mt-0.5"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/5 bg-black space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
              Total
            </span>
            <span className="text-xl font-display text-[#ffb6c1]">
              {formatUsd(totalPrice)}
            </span>
          </div>

          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full bg-white py-4 text-center text-[10px] font-bold tracking-[0.4em] text-black uppercase hover:bg-[#ffb6c1] transition-colors"
          >
            Finalizar vía WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
