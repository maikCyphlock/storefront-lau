"use client";

import Link from "next/link";

type NavbarProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-sm tracking-[0.25em] text-zinc-100 uppercase">
          OverSizeByLau
        </Link>

        <nav className="hidden items-center gap-5 text-[10px] tracking-[0.25em] text-zinc-400 uppercase md:flex">
          <Link href="/#drop" className="transition hover:text-[#ffb6c1]">Colección</Link>
          <Link href="/#custom" className="transition hover:text-[#ffb6c1]">Estudio</Link>
          <Link href="/#statement" className="transition hover:text-[#ffb6c1]">Concepto</Link>
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative group flex items-center gap-3 px-6 py-2 border border-white/5 rounded-full bg-white/[0.02] hover:border-[#ffb6c1] transition-all"
        >
          <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-100 uppercase group-hover:text-[#ffb6c1]">Bolsa [{cartCount}]</span>
        </button>
      </div>
    </header>
  );
}
