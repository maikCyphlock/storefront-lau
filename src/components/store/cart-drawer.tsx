"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
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
        className="absolute inset-0 bg-black/85 backdrop-blur-[6px]"
      />

      {/* Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-[420px] bg-[var(--black)] border-l border-[#222] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-[#222]">
          <div className="flex items-center gap-3">
            <div className="w-[6px] h-[6px] bg-[var(--white)] rounded-full animate-pulse" />
            <h3 className="font-bebas text-[1rem] sm:text-[1.1rem] tracking-[0.2em] text-[var(--white)] uppercase">
              Bolsa
            </h3>
            <span className="text-[0.55rem] tracking-[0.15em] text-[var(--mid)] font-mono-custom">
              [{items.length}]
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-[28px] h-[28px] border border-[#333] flex items-center justify-center text-[var(--mid)] hover:text-[var(--white)] hover:border-[var(--white)] transition-all duration-200 text-[0.7rem]"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 sm:py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-6">
              <svg viewBox="0 0 100 100" className="w-[60px] h-[60px] opacity-[0.1]" fill="none" stroke="white" strokeWidth="0.8">
                <ellipse cx="50" cy="50" rx="45" ry="45" />
                <ellipse cx="50" cy="50" rx="45" ry="18" />
                <line x1="5" y1="50" x2="95" y2="50" />
                <line x1="50" y1="5" x2="50" y2="95" />
              </svg>
              <div className="text-center">
                <p className="font-bebas text-[1.2rem] tracking-[0.15em] text-[#333] uppercase mb-2">
                  Tu bolsa está vacía
                </p>
                <p className="text-[0.55rem] tracking-[0.2em] text-[#2a2a2a] font-mono-custom uppercase">
                  Agrega tus diseños favoritos ✦
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[1px] bg-[#1a1a1a]">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-4 bg-[var(--black)] group hover:bg-[#0e0e0e] transition-colors"
                >
                  {/* Product image */}
                  <div className="w-[70px] h-[90px] sm:w-[80px] sm:h-[100px] shrink-0 overflow-hidden border border-[#222] relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-0 right-0 bg-[var(--black)] border-l border-b border-[#222] px-1.5 py-0.5">
                      <span className="text-[0.45rem] tracking-[0.1em] text-[var(--mid)] font-bebas">{item.size}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="font-bebas text-[0.95rem] sm:text-[1.05rem] text-[var(--white)] uppercase tracking-[0.08em] truncate leading-[1.1]">
                        {item.product.name}
                      </p>
                      <p className="text-[0.5rem] tracking-[0.2em] text-[var(--mid)] mt-1 font-mono-custom uppercase">
                        {item.product.subtitle}
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-[#222]">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-[var(--mid)] hover:text-[var(--white)] hover:bg-[#1a1a1a] text-[0.7rem] transition-all border-r border-[#222]"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-[0.6rem] font-bebas tracking-[0.1em] text-[var(--white)]">
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
                          className="w-7 h-7 flex items-center justify-center text-[var(--mid)] hover:text-[var(--white)] hover:bg-[#1a1a1a] text-[0.7rem] transition-all border-l border-[#222]"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.product.id, item.size)
                        }
                        className="text-[0.5rem] tracking-[0.15em] text-[#333] uppercase hover:text-[var(--white)] transition-colors font-mono-custom"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Structural Section */}
        <div className="p-8 sm:p-10 border-t border-[#1a1a1a] bg-[#080808] space-y-8">
          <div className="flex items-center justify-between">
            <span className="font-bebas text-[0.7rem] tracking-[0.3em] text-[var(--mid)] uppercase opacity-60">
              SUBTOTAL ESTIM.
            </span>
            <span className="font-bebas text-[1.6rem] text-[var(--white)] tracking-[0.05em]">
              CONSULTAR
            </span>
          </div>

          <Link
            href="https://wa.me/584125555555"
            target="_blank"
            onClick={onClose}
            className="block w-full bg-[var(--white)] text-[var(--black)] py-5 text-center font-mono-custom text-[0.75rem] tracking-[0.3em] uppercase no-underline transition-all duration-300 hover:bg-[var(--pink-soft)] flex items-center justify-center gap-3 group"
          >
            ORDER VIA WHATSAPP <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
          </Link>

          <div className="pt-8 border-t border-[#151515] flex flex-col items-center gap-3 opacity-40">
            <p className="text-center text-[0.45rem] tracking-[0.4em] text-[var(--mid)] uppercase font-mono-custom">
              ENVIOS A TODA VENEZUELA · ACARIGUA
            </p>
            <span className="text-[0.4rem] text-[var(--mid)] tracking-[-0.05em] font-mono-custom">
              ||| || | ||| | || ||| | || | ||| || | ||| 8 230 258
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
