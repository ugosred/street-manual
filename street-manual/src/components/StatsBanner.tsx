import React from 'react';
import { Sparkles, Mail, Check } from 'lucide-react';

interface StatsBannerProps {
  onGoToGetDeck: () => void;
  readCount: number;
  totalCount: number;
}

export default function StatsBanner({
  onGoToGetDeck,
  readCount,
  totalCount,
}: StatsBannerProps) {
  return (
    <div className="mb-10 animate-slide-in">
      <div className="bg-neutral-900 border border-neutral-800 p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-sm">
        <div className="flex items-start gap-4">
          <div className="mt-1 bg-white/5 p-2 rounded border border-neutral-800 hidden md:block text-amber-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-white">
                14 cards free. <span className="text-neutral-400">Unlock all 140+ cards — from £4.</span>
              </p>
              {readCount > 0 && (
                <span className="inline-flex items-center gap-1 bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  <Check className="h-3 w-3 stroke-[3]" />
                  Progress: {readCount} / {totalCount} completed
                </span>
              )}
            </div>
            <p className="text-neutral-500 text-xs mt-1">
              When you don't know where to start, start here.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Action Button */}
          <button
            id="gumroad-link-btn"
            onClick={onGoToGetDeck}
            className="flex items-center justify-center gap-2 bg-white text-black hover:bg-[#eeeeee] font-bold text-[9px] font-mono uppercase tracking-wider px-4 py-2.5 rounded transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Sign up for free</span>
          </button>
        </div>
      </div>
    </div>
  );
}
