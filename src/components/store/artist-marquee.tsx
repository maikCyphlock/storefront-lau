"use client";

const ARTISTS = ["MESSI", "TAYLOR & KANYE", "THE WEEKND", "JUSTIN BIEBER", "HASBULLA", "KANYE WEST", "TU FAVO"];

export function ArtistMarquee() {
    return (
        <div className="artist-marquee py-[12rem] border-b border-[#222] overflow-hidden relative">
            <div className="marquee-track flex gap-0 animate-[marqueeR_25s_linear_infinite] w-max">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex">
                        {ARTISTS.map((artist) => (
                            <div key={artist} className="marquee-item group flex items-center px-[3rem] border-r border-[#222] gap-[1rem] whitespace-nowrap">
                                <span className="marquee-artist font-bebas text-[2.5rem] tracking-[0.05em] text-[#333] transition-colors duration-200 group-hover:text-[var(--white)]">
                                    {artist}
                                </span>
                                <div className="marquee-dot w-[6px] h-[6px] bg-[#333] rounded-full"></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
