import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCw, Camera, Compass, ClipboardList, Clock, Check } from 'lucide-react';
import { Card } from '../types';
import { CATEGORIES } from '../data';

interface CardDetailModalProps {
  card: Card | null;
  onClose: () => void;
  onGetDeck: () => void;
  isMarkedRead: boolean;
  onToggleMarkAsRead: (cardId: string) => void;
}

export default function CardDetailModal({ 
  card, 
  onClose, 
  onGetDeck,
  isMarkedRead,
  onToggleMarkAsRead,
}: CardDetailModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Prevent scrolling the main body of the webpage when the modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!card) return null;

  const category = CATEGORIES.find(cat => cat.id === card.categoryId);
  const categoryColor = category?.color || '#333333';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#0a0a0a] backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-lg z-10 flex flex-col items-center"
        >
          {/* Close button outside the card for clean appearance */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute -top-14 right-0 text-white hover:text-[#888888] transition-colors p-2 bg-[#1a1a1a] rounded-full border border-[#222222] cursor-pointer"
            title="Close field guide"
          >
            <X className="h-5 w-5" />
          </button>

          {/* 3D Card Container with perspective */}
          <div className="w-full h-[70vh] sm:h-[480px] min-h-[360px] sm:min-h-[480px] perspective-1000 flex items-center justify-center">
            <motion.div
              className="relative w-full h-full transition-all duration-700 transform-style-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              
              {/* === CARD FRONT === */}
              <div 
                className="absolute inset-0 bg-white text-black rounded-[24px] p-8 flex flex-col justify-between backface-hidden shadow-2xl overflow-hidden"
                style={{
                  transform: 'rotateY(0deg)',
                }}
              >
                {/* Thin category top strip */}
                <div 
                  className="absolute top-0 left-0 right-0 h-3" 
                  style={{ backgroundColor: categoryColor }}
                />

                {/* Pinned Top Bar */}
                <div className="mt-4 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-black tracking-widest uppercase font-mono"
                      style={{ color: categoryColor }}
                    >
                      {card.categoryName}
                    </span>
                  </div>

                  <button
                    id="modal-mark-read-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMarkAsRead(card.id);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase font-mono tracking-wider transition-all duration-200 cursor-pointer border ${
                      isMarkedRead 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                        : 'bg-neutral-50 text-[#666666] border-neutral-200 hover:bg-neutral-100 hover:text-black'
                    }`}
                  >
                    <Check className={`h-3 w-3 ${isMarkedRead ? 'stroke-[3]' : 'stroke-[2]'}`} />
                    <span>{isMarkedRead ? 'Completed' : 'Mark as Read'}</span>
                  </button>
                </div>

                {/* Scrollable Content (No-flip on click/drag) */}
                <div 
                  className="flex-1 overflow-y-auto pr-1 mb-4 select-text cursor-auto custom-scrollbar overscroll-contain touch-pan-y"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#111111] leading-none mb-6 uppercase">
                    {card.title}
                  </h2>

                  <p className="text-base md:text-lg text-[#222222] font-sans font-medium leading-relaxed">
                    {card.body}
                  </p>
                </div>

                {/* Footer and Interactive Hint - Always visible pinned at the bottom */}
                <div className="border-t border-[#eaeaea] pt-4 flex items-center justify-center md:justify-start">
                  <div className="flex items-center gap-1.5 text-xs text-[#888888] font-mono uppercase font-bold tracking-wider">
                    <RotateCw className="h-3.5 w-3.5 animate-spin-slow text-[#777777]" />
                    <span>Click card to view details</span>
                  </div>
                </div>
              </div>

              {/* === CARD BACK (FLIPPED STATE) === */}
              <div 
                className="absolute inset-0 text-white rounded-[24px] p-8 flex flex-col justify-between backface-hidden shadow-2xl overflow-hidden"
                style={{
                  transform: 'rotateY(180deg)',
                  backgroundColor: categoryColor,
                }}
              >
                {/* Pinned Top Bar */}
                <div className="mt-4 flex items-center justify-between mb-5 pb-2 border-b border-white/25">
                  <span className="text-xs font-black tracking-widest uppercase font-mono text-white/90">
                    Field Assignment
                  </span>
                  <button
                    id="modal-mark-read-btn-back"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMarkAsRead(card.id);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase font-mono tracking-wider transition-all duration-200 cursor-pointer border ${
                      isMarkedRead 
                        ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500/50 hover:bg-emerald-600/40' 
                        : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <Check className={`h-3 w-3 ${isMarkedRead ? 'stroke-[3]' : 'stroke-[2]'}`} />
                    <span>{isMarkedRead ? 'Completed' : 'Mark as Read'}</span>
                  </button>
                </div>

                {/* Scrollable Content (No-flip on click/drag) */}
                <div 
                  className="flex-1 overflow-y-auto pr-1 mb-4 select-text cursor-auto custom-scrollbar-white overscroll-contain touch-pan-y"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-white/95" />
                    <span>The Assignment</span>
                  </h3>

                  <p className="text-sm md:text-base text-white/95 leading-relaxed mb-6 font-medium font-sans">
                    {card.assignment || "Explore your local environment looking for unique moments that represent this category. Capture clean, high-contrast frames."}
                  </p>

                  {/* Settings and Location Parameters */}
                  <div className="grid grid-cols-2 gap-4 bg-white/10 p-4 rounded-xl border border-white/20">
                    {card.settings && (
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/80 flex items-center gap-1 mb-1">
                          <Camera className="h-3 w-3" />
                          <span>Settings Guide</span>
                        </span>
                        <span className="text-[11px] font-mono font-bold text-white truncate" title={card.settings}>
                          {card.settings}
                        </span>
                      </div>
                    )}

                    {card.location && (
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/80 flex items-center gap-1 mb-1">
                          <Compass className="h-3 w-3" />
                          <span>Suggested Area</span>
                        </span>
                        <span className="text-[11px] font-mono font-bold text-white truncate" title={card.location}>
                          {card.location}
                        </span>
                      </div>
                    )}

                    {card.estimatedTime && (
                      <div className="flex flex-col col-span-2 border-t border-white/10 pt-2 mt-2">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/80 flex items-center gap-1 mb-0.5">
                          <Clock className="h-3 w-3" />
                          <span>Duration Recommendation</span>
                        </span>
                        <span className="text-[11px] font-sans font-bold text-white/90">
                          Devote approximately {card.estimatedTime} to this exercise.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer action to turn back */}
                <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                  <button 
                    id="flip-back-hint"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                    }}
                    className="flex items-center gap-1 text-xs text-white/80 font-mono font-bold uppercase hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Flip back</span>
                  </button>
                  <span className="text-[9px] font-mono font-bold text-white/70">
                    ID: SN-{card.id.substring(0, 4).toUpperCase()}
                  </span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Quick Info text beneath card */}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
