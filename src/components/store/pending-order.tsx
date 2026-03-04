"use client";

import Link from "next/link";
import { useEffect } from "react";
import { formatUsd } from "@/lib/format";

type PendingOrderProps = {
  waLink: string;
  total: number;
  advance: number;
};

export function PendingOrder({ waLink, total, advance }: PendingOrderProps) {
  useEffect(() => {
    if (!waLink) return;

    const timer = setTimeout(() => {
      window.location.href = waLink;
    }, 1200);

    return () => clearTimeout(timer);
  }, [waLink]);

  return (
    <main className="flex min-h-screen items-center bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6">
      <section className="fade-up mx-auto w-full max-w-2xl rounded-3xl border border-amber-100/25 bg-zinc-900/60 p-7 sm:p-10">
        <p className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase">OverSizeByLau</p>
        <h1 className="font-display mt-3 text-3xl uppercase">Pedido en espera</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Tu orden fue registrada. Para activarla debes escribir por WhatsApp y enviar el anticipo obligatorio del 50%.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-zinc-200">
          <p>Total estimado: {formatUsd(total)}</p>
          <p>Anticipo requerido (50%): {formatUsd(advance)}</p>
          <p className="mt-2 text-xs text-zinc-400">Sin ese pago no se procesa inventario, despacho ni reserva.</p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink}
            className="rounded-xl border border-emerald-200/35 bg-emerald-300/14 px-5 py-3 text-center text-[10px] tracking-[0.25em] text-emerald-100 uppercase transition hover:bg-emerald-300/22"
          >
            Ir a WhatsApp
          </a>
          <Link
            href="/"
            className="rounded-xl border border-white/15 px-5 py-3 text-center text-[10px] tracking-[0.25em] text-zinc-200 uppercase"
          >
            Seguir comprando
          </Link>
        </div>
      </section>
    </main>
  );
}
