"use client";

export function Ticker() {
    return (
        <div className="ticker-wrap border-t border-b border-[#222] overflow-hidden py-[0.8rem] bg-[#0d0d0d]">
            <div className="ticker flex gap-[3rem] animate-[ticker_18s_linear_infinite] whitespace-nowrap">
                {/* duplicated for infinite loop */}
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-[3rem]">
                        <div className="ticker-item font-bebas text-[1rem] tracking-[0.3em] text-[var(--mid)] flex items-center gap-[1.5rem]">
                            <span className="star text-[var(--white)] text-[0.8rem]">✦</span> TSHIRT OVERSIZE
                        </div>
                        <div className="ticker-item font-bebas text-[1rem] tracking-[0.3em] text-[var(--mid)] flex items-center gap-[1.5rem]">
                            <span className="star text-[var(--white)] text-[0.8rem]">✦</span> DISEÑOS PERSONALIZADOS
                        </div>
                        <div className="ticker-item font-bebas text-[1rem] tracking-[0.3em] text-[var(--mid)] flex items-center gap-[1.5rem]">
                            <span className="star text-[var(--white)] text-[0.8rem]">✦</span> ACARIGUA
                        </div>
                        <div className="ticker-item font-bebas text-[1rem] tracking-[0.3em] text-[var(--mid)] flex items-center gap-[1.5rem]">
                            <span className="star text-[var(--white)] text-[0.8rem]">✦</span> BY LAU
                        </div>
                        <div className="ticker-item font-bebas text-[1rem] tracking-[0.3em] text-[var(--mid)] flex items-center gap-[1.5rem]">
                            <span className="star text-[var(--white)] text-[0.8rem]">✦</span> ENVÍOS NACIONALES
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
