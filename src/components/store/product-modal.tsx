"use client";

import { useState, useEffect } from "react";
import { getProductPrice } from "@/lib/product-utils";
import { Product } from "@/types/store";
import { useCartStore } from "@/store/cart-store";

const WHATSAPP_NUMBER = "584145332928";

type ProductModalProps = {
    product: Product | null;
    onClose: () => void;
};

export function ProductModal({ product, onClose }: ProductModalProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes[0]);
            setSelectedMediaIndex(0);
            // Lock body scroll when modal is open
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [product]);

    if (!product) return null;

    const selectedMedia = product.media[selectedMediaIndex] ?? product.media[0];

    return (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container — full-width on mobile, max-w on desktop */}
            <div className="relative w-full md:w-[900px] md:max-w-[95vw] max-h-[100dvh] md:max-h-[90vh] bg-[var(--black)] border-t md:border border-[#1a1a1a] overflow-y-auto flex flex-col md:flex-row shadow-[0_0_80px_rgba(0,0,0,0.5)] mx-auto">
                {/* Decorative top line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(248,200,211,0.3),transparent)] z-20" />

                {/* Left: Image Section */}
                <div className="w-full md:w-1/2 md:flex-1 aspect-[3/4] md:aspect-auto md:min-h-[600px] relative shrink-0 border-b md:border-b-0 md:border-r border-[#1a1a1a] overflow-hidden bg-[#050505]">
                    {selectedMedia?.type === "video" ? (
                        <video
                            src={selectedMedia.url}
                            className="w-full h-full object-cover"
                            controls
                            playsInline
                        />
                    ) : (
                        <img
                            src={selectedMedia?.url ?? product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.6),transparent_60%)]" />

                    {/* Close button on mobile — top-right over image */}
                    <button
                        onClick={onClose}
                        className="md:hidden absolute top-4 right-4 z-10 w-10 h-10 bg-[rgba(10,10,10,0.8)] border border-[#333] flex items-center justify-center text-[var(--white)] text-[0.8rem] rounded-none"
                    >
                        ✕
                    </button>

                    {/* Product ID label */}
                    <div className="absolute top-6 left-6 text-[0.5rem] tracking-[0.4em] text-[rgba(255,255,255,0.3)] font-mono-custom uppercase z-10">
                        {product.id.slice(0, 8)}
                    </div>

                    {product.media.length > 1 ? (
                        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                            {product.media.map((media, index) => (
                                <button
                                    key={media.id}
                                    type="button"
                                    onClick={() => setSelectedMediaIndex(index)}
                                    className={`h-14 w-14 overflow-hidden border ${selectedMediaIndex === index ? "border-white" : "border-white/20"} bg-black/60`}
                                >
                                    {media.type === "video" ? (
                                        <div className="flex h-full w-full items-center justify-center text-[0.55rem] tracking-[0.2em] text-white/70 uppercase">
                                            video
                                        </div>
                                    ) : (
                                        <img src={media.url} alt="" className="h-full w-full object-cover" />
                                    )}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Right: Info Section */}
                <div className="w-full md:w-1/2 md:flex-1 shrink-0 flex flex-col bg-[var(--black)]">
                    <div className="p-8 md:pb-8 flex-1 flex flex-col">
                        {/* Header: Subtitle & Close Button */}
                        <div className="flex justify-between items-start mb-12 md:mb-16">
                            <div className="flex flex-col gap-1">
                                <p className="text-[0.6rem] tracking-[0.4em] text-[var(--mid)] uppercase font-mono-custom">
                                    CORE COLLECTION
                                </p>
                                <p className="text-[0.55rem] tracking-[0.3em] text-[var(--pink-soft)] uppercase font-mono-custom opacity-70">
                                    {product.subtitle}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="hidden md:block text-[0.6rem] tracking-[0.3em] text-[var(--mid)] hover:text-[var(--white)] transition-colors uppercase font-mono-custom border-b border-transparent hover:border-[var(--white)] pb-0.5"
                            >
                                CLOSE ✕
                            </button>
                        </div>

                        <h2 className="font-bebas text-[clamp(4rem,7vw,6rem)] leading-[0.8] tracking-[-0.03em] mb-12 text-[var(--white)] uppercase">
                            {product.name}
                        </h2>

                        {product.description ? (
                            <p className="mb-10 max-w-xl text-sm leading-7 text-[var(--mid)]">
                                {product.description}
                            </p>
                        ) : null}

                        <div className="space-y-12 mb-12">
                            {/* Price Section */}
                            <div className="border-l border-[#222] pl-6 py-1">
                                <span className="text-[0.55rem] tracking-[0.4em] text-[var(--mid)] font-mono-custom uppercase block mb-3">PRECIO</span>
                                <span className="font-bebas text-[2.5rem] text-[var(--white)] leading-none block">
                                    ${getProductPrice(product, selectedSize)}
                                </span>
                                {product.priceBySize && (
                                    <span className="text-[0.5rem] tracking-[0.2em] text-[var(--mid)] font-mono-custom mt-2 block">
                                        S / M / L — $18 &nbsp;·&nbsp; XL — $20
                                    </span>
                                )}
                            </div>

                            {/* Size Selection */}
                            <div className="border-l border-[#222] pl-6 py-1">
                                <span className="text-[0.55rem] tracking-[0.4em] text-[var(--white)] uppercase block mb-5 font-mono-custom">Select Size</span>
                                <div className="flex flex-wrap gap-2.5">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-11 h-11 md:w-12 md:h-12 flex items-center justify-center font-mono-custom text-[0.8rem] transition-all border ${selectedSize === size
                                                ? "bg-[var(--white)] text-[var(--black)] border-[var(--white)] scale-[1.05]"
                                                : "border-[#1a1a1a] text-[var(--mid)] hover:border-[#444] hover:text-[var(--white)] hover:bg-[#050505]"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar: Structural Footer */}
                    <div className="mt-auto border-t border-[#1a1a1a] bg-[#080808] p-8 md:p-14 pt-10 md:pt-12">
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Me interesa la franela *${product.name}* en talla *${selectedSize}* ($${getProductPrice(product, selectedSize)})`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] text-[var(--black)] py-5 md:py-6 font-mono-custom text-[0.75rem] md:text-[0.8rem] tracking-[0.35em] uppercase transition-all hover:bg-[#1ebe5d] flex items-center justify-center gap-4 group"
                        >
                            Consultar por WhatsApp <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                        </a>

                        <button
                            onClick={() => {
                                addToCart({ product, size: selectedSize });
                                onClose();
                            }}
                            className="w-full mt-3 bg-[var(--white)] text-[var(--black)] py-5 md:py-6 font-mono-custom text-[0.75rem] md:text-[0.8rem] tracking-[0.35em] uppercase transition-all hover:bg-[var(--pink-soft)] flex items-center justify-center gap-4 group"
                        >
                            Añadir al Carrito <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                        </button>

                        <div className="mt-10 pt-10 border-t border-[#151515] flex justify-between items-center opacity-40">
                            <p className="text-[0.5rem] tracking-[0.4em] text-[var(--mid)] uppercase font-mono-custom">
                                ACARIGUA · NAL
                            </p>
                            <p className="text-[0.5rem] tracking-[0.4em] text-[var(--mid)] uppercase font-mono-custom">
                                +58 414-5332928
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
