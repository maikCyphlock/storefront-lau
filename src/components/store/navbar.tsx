"use client";

import Link from "next/link";

type NavbarProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[2.5rem] py-[1.2rem] border-b border-[#222] bg-[rgba(10,10,10,0.85)] backdrop-blur-[8px]">
      <Link href="/" className="font-bebas text-[1.4rem] tracking-[0.15em] text-[var(--white)] no-underline">
        OVERSIZE BY LAU
      </Link>

      <ul className="hidden md:flex gap-[2.5rem] list-none">
        <li><Link href="#productos" className="text-[var(--mid)] no-underline text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--white)]">Productos</Link></li>
        <li><Link href="#nosotros" className="text-[var(--mid)] no-underline text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--white)]">Nosotros</Link></li>
        <li><Link href="#lookbook" className="text-[var(--mid)] no-underline text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--white)]">Lookbook</Link></li>
        <li><Link href="#contacto" className="text-[var(--mid)] no-underline text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--white)]">Contacto</Link></li>
      </ul>

      <div className="flex items-center gap-6">
        <button
          onClick={onOpenCart}
          className="text-[var(--mid)] no-underline text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--white)]"
        >
          Bolsa [{cartCount}]
        </button>
        <span className="hidden md:inline text-[0.65rem] text-[var(--mid)] tracking-[0.1em]">★ Acarigua</span>
      </div>
    </nav>
  );
}
