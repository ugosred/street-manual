import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  onOpenGumroad: () => void;
}

const IMAGES = [
  "https://cdn1.site-media.eu/images/1200/26553725/_lukesphotos_1747517262_3634760700429095734_7694541297-QBEU7izGJ429o3IUKpRb-g.jpg",
  "https://cdn1.site-media.eu/images/1184/26554064/_lukesphotos_1782153772_3925312089005368094_7694541297-2Xtg3O-mGayjpS4Lm5nWEg.jpg",
  "https://cdn1.site-media.eu/images/1200/26553890/_lukesphotos_1774645850_3862331108188807288_7694541297-hr_TCqzvVgu8ODWYZKt7QA.jpg",
  "https://cdn1.site-media.eu/images/1184/26553953/_lukesphotos_1778613099_3895610433442170705_7694541297-N2shb5Lj9sEHqwxVNBqfNQ.jpg",
  "https://cdn1.site-media.eu/images/1200/26553825/_lukesphotos_1764062400_3773551848821625717_7694541297-JsJk83q3rRm33X3DTN0XWA.jpg",
  "https://cdn1.site-media.eu/images/1200/26553767/_lukesphotos_1763060348_3770086288045640076_7694541297-U-iIUs4afnI7JN52-PLwKg.jpg"
];

export default function HeroSection({ onOpenGumroad }: HeroSectionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-[24px] p-5 md:p-6 lg:p-8 mb-8 overflow-hidden shadow-2xl border border-white/10 text-white min-h-[380px] flex items-center">
      {/* Absolute Background Crossfade Layers (No grey overlay) */}
      {IMAGES.map((imgUrl, index) => (
        <div
          key={imgUrl}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out z-0"
          style={{
            backgroundImage: `url('${imgUrl}')`,
            opacity: currentIdx === index ? 1 : 0,
          }}
        />
      ))}

      <div className="z-10 relative max-w-xl md:ml-auto md:mr-0 mx-auto w-full">
        {/* Centered Panel with glassmorphism to show photo backdrop */}
        <div className="bg-[#111111]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[20px] flex flex-col justify-between text-white shadow-xl">
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight mb-2 text-center">
              For when you're out shooting and your brain goes blank.
            </h2>
            
            <p className="text-neutral-400 text-xs font-sans leading-relaxed mb-4 text-center">
              Street Manual is a set of prompt cards covering techniques, locations, photographer influences, and project ideas. Created for street photographers who get overwhelmed, run out of ideas, or need a nudge in the right direction.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-neutral-800">
              {/* Free Section */}
              <div className="text-center border-r border-neutral-800/50 pr-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#888888] font-black block mb-1">
                  Free
                </span>
                <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                  14 cards across all categories.
                </p>
              </div>

              {/* Full Deck Section */}
              <div className="text-center pl-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#888888] font-black block mb-1">
                  Full deck
                </span>
                <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                  140+ cards, all categories, from £4 per pack.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800">
            <button
              id="hero-gumroad-btn"
              onClick={onOpenGumroad}
              className="w-full bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/40 font-bold text-[9px] font-mono uppercase tracking-wider py-2.5 px-4 rounded-xl text-center transition-colors cursor-pointer"
            >
              Browse packs on Gumroad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
