import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, ShieldCheck, Sparkles, Star, Award, Mail, ExternalLink } from 'lucide-react';

interface DeckPurchaseSectionProps {
  onOpenGumroad: () => void;
}

export default function DeckPurchaseSection({ onOpenGumroad }: DeckPurchaseSectionProps) {
  const [activeOption, setActiveOption] = useState<'digital' | 'weekly'>('digital');

  const handleActionClick = () => {
    if (activeOption === 'digital') {
      onOpenGumroad();
    } else {
      window.open('https://lukes.photos', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="text-white mt-4 max-w-4xl mx-auto"
    >
      {/* Intro block */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest text-[#cccccc] mb-4">
          <Award className="h-3.5 w-3.5 text-amber-500" />
          <span>Created in the United Kingdom</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-4">
          A digital companion for your creative process
        </h2>
        <p className="text-[#888888] font-mono text-sm max-w-xl mx-auto">
          Draw a single card from the digital deck, retain focus, and head out onto the street.
        </p>
      </div>

      {/* Grid: Features & Purchase info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-14">
        
        {/* Core inspiration features panel */}
        <div className="bg-[#161616] border border-[#222222] p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#888888] font-black mb-6 pb-2 border-b border-[#222222]">
              How it helps you
            </h3>
            
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="font-mono text-xs text-white font-bold shrink-0 mt-0.5">01/</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Find Fresh Inspiration</h4>
                  <p className="text-xs text-[#888888] mt-1">Dozens of hand-crafted prompts and visual concepts designed to break repetitive framing habits and encourage creative exploration.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-white font-bold shrink-0 mt-0.5">02/</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Overcome Creative Block</h4>
                  <p className="text-xs text-[#888888] mt-1">Structured exercises that nudge you out of your comfort zone, helping you find compelling scenes in ordinary environments.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-white font-bold shrink-0 mt-0.5">03/</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Build Muscle Memory</h4>
                  <p className="text-xs text-[#888888] mt-1">Technique cards covering practical street methods like zone focusing, high-contrast exposure, and geometric framing.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-white font-bold shrink-0 mt-0.5">04/</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Interactive Field Companion</h4>
                  <p className="text-xs text-[#888888] mt-1">Always with you on your smartphone. Track your completed cards, explore categories, and log notes on the move.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Core reassurance */}
          <div className="mt-8 pt-6 border-t border-[#222222] flex items-center gap-3.5 text-xs text-[#888888] font-mono">
            <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>Created by a street photographer who knows what it's like to feel overwhelmed, or stuck but has a ton of notes and ideas!</span>
          </div>
        </div>

        {/* Digital Toolkit Access Panel */}
        <div className="bg-[#161616] border border-[#222222] p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#888888] font-black mb-5 pb-2 border-b border-[#222222]">
              Digital Toolkit Access
            </h3>

            {/* Option Toggles */}
            <div className="grid grid-cols-2 gap-2 mb-6 bg-[#121212] p-1 rounded-xl border border-white/5">
              <button
                id="select-option-digital"
                onClick={() => setActiveOption('digital')}
                className={`py-2.5 px-3 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider text-center transition-all duration-200 cursor-pointer ${
                  activeOption === 'digital'
                    ? 'bg-white text-black shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                Field Edition
              </button>
              <button
                id="select-option-weekly"
                onClick={() => setActiveOption('weekly')}
                className={`py-2.5 px-3 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider text-center transition-all duration-200 cursor-pointer ${
                  activeOption === 'weekly'
                    ? 'bg-white text-black shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                Weekly Prompts
              </button>
            </div>

            {activeOption === 'digital' ? (
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/5 mb-6 min-h-[250px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg text-white">Digital Field Edition</span>
                    <span className="font-mono text-sm font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      £4.00
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] leading-relaxed mb-4">
                    Instant lifetime access to the interactive companion, full high-resolution offline PDF guide, and all future expansions. Perfect for smartphone and tablet use.
                  </p>
                </div>
                
                <ul className="text-xs text-[#888888] space-y-2 border-t border-[#222222] pt-4">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>140+ high-fidelity digital prompt cards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Complete offline PDF field manual</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Interactive simulator progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Free updates and new expansion cards</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/5 mb-6 min-h-[250px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg text-white">Weekly Street Prompts</span>
                    <span className="font-mono text-sm font-black text-[#888888] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      FREE
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] leading-relaxed mb-4">
                    Join Luke's creative photography circle. Get a single bespoke street prompt, technical setup tips, and framing concepts delivered straight to your inbox every Sunday morning.
                  </p>
                </div>
                
                <ul className="text-xs text-[#888888] space-y-2 border-t border-[#222222] pt-4">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Delivered fresh every Sunday morning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Behind-the-scenes framing & exposure tips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Community feature opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>100% free forever, cancel in one click</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <button
              id="buy-now-gumroad"
              onClick={handleActionClick}
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-[#eeeeee] font-black uppercase text-xs tracking-widest py-4 px-6 rounded-xl transition-all active:scale-98 cursor-pointer shadow-lg"
            >
              {activeOption === 'digital' ? (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Get Digital Access — £4.00</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  <span>Sign Up here</span>
                  <ExternalLink className="h-3 w-3 ml-0.5 opacity-60" />
                </>
              )}
            </button>
            <p className="text-center text-[10px] font-mono text-[#555555] mt-3">
              {activeOption === 'digital' 
                ? "Fulfilled securely via Gumroad. Instant delivery via email."
                : "Opens Luke's personal portfolio & newsletter sign-up."}
            </p>
          </div>
        </div>

      </div>

      {/* Testimonials */}
      <div className="border-t border-[#222222] pt-10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#888888] font-black text-center mb-8">
          Words from early adopters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-[#222222] bg-[#161616]">
            <div className="flex text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#dddddd] font-medium leading-relaxed italic">
              "Incredibly designed digital tool. The instructions on Zone Focusing are incredibly practical, completely changed how I frame my street shots."
            </p>
            <span className="block mt-3 text-[10px] font-mono font-bold text-[#888888] uppercase">
              Thomas G. — Soho, London
            </span>
          </div>

          <div className="p-5 rounded-xl border border-[#222222] bg-[#161616]">
            <div className="flex text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#dddddd] font-medium leading-relaxed italic">
              "An amazing companion app. I pull it up on my phone as I step off the train. It really inspires you to walk out and search for light."
            </p>
            <span className="block mt-3 text-[10px] font-mono font-bold text-[#888888] uppercase">
              Sarah K. — St Albans, Herts
            </span>
          </div>

          <div className="p-5 rounded-xl border border-[#222222] bg-[#161616]">
            <div className="flex text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#dddddd] font-medium leading-relaxed italic">
              "The Hertfordshire and Essex coastal location prompts are spectacular. I took my camera out to Southend Pier following the card and hit gold."
            </p>
            <span className="block mt-3 text-[10px] font-mono font-bold text-[#888888] uppercase">
              Dave P. — Colchester, Essex
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
