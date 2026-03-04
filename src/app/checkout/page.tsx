"use client";

import Link from "next/link";
import { CheckoutForm } from "@/components/store/checkout-form";
import { useCartStore } from "@/store/cart-store";
import { formatUsd } from "@/lib/format";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.totalPrice());

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">OverSizeByLau</p>
            <h1 className="font-display mt-2 text-3xl uppercase">Finalizar compra</h1>
          </div>
          <Link href="/" className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase hover:text-pink-200">
            Volver
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-zinc-900/45 p-5">
            <h2 className="mb-4 text-[10px] tracking-[0.2em] text-zinc-300 uppercase">Resumen del pedido</h2>
            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-zinc-400">Tu carrito esta vacio.</p>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex justify-between gap-2 text-sm">
                    <p className="text-zinc-200">
                      {item.product.name} x{item.quantity}
                      <span className="ml-2 text-xs text-zinc-500">Talla {item.size}</span>
                    </p>
                    <p className="text-pink-100">{formatUsd(item.product.price * item.quantity)}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-5 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-300">Total</span>
                <span>{formatUsd(total)}</span>
              </div>
            </div>
          </section>

          <CheckoutForm />
        </div>
      </div>
    </main>
  );
}
