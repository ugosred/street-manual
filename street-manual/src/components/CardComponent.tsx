import React from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, Compass, Camera, Clock, Check } from 'lucide-react';
import { Card, CategoryId } from '../types';
import { CATEGORIES } from '../data';

interface CardComponentProps {
  key?: string;
  card: Card;
  onCardClick: (card: Card) => void;
  onGetDeckClick: (e: React.MouseEvent, card: Card) => void;
  isMarkedRead: boolean;
  onToggleMarkAsRead: (cardId: string) => void;
}

export default function CardComponent({
  card,
  onCardClick,
  onGetDeckClick,
  isMarkedRead,
  onToggleMarkAsRead,
}: CardComponentProps) {
  // Check if this card is locked
  const isLocked = card.locked;
  
  // Find category color
  const categoryColor = CATEGORIES.find(cat => cat.id === card.categoryId)?.color || '#333333';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 18,
      }}
      whileHover={{ 
        y: -14,
        rotateX: 4,
        rotateY: -2,
        scale: 1.015,
        transition: { type: 'spring', stiffness: 350, damping: 20 }
      }}
      onClick={() => {
        if (!isLocked) {
          onCardClick(card);
        }
      }}
      id={`card-${card.id}`}
      className={`group relative bg-white text-black rounded-[24px] p-5 md:p-6 flex flex-col justify-between select-none shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] transition-shadow duration-200 overflow-hidden ${
        isLocked ? 'bg-neutral-100 cursor-not-allowed min-h-[290px]' : 'cursor-pointer min-h-[270px] h-auto'
      }`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Category Top Strip */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2" 
        style={{ backgroundColor: categoryColor }}
      />

      {/* Card Content Top Area */}
      <div>
        <div className="flex flex-col gap-2 mb-4 mt-2">
          <div className="flex items-center justify-between">
            <span 
              className="text-[9px] font-black uppercase tracking-widest"
              style={{ color: categoryColor }}
            >
              {card.categoryName}
            </span>
            {!isLocked && (
              <button
                id={`mark-read-btn-${card.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMarkAsRead(card.id);
                }}
                className={`p-1 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center border ${
                  isMarkedRead 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' 
                    : 'bg-neutral-50 text-[#888888] border-neutral-200/80 hover:bg-neutral-100 hover:text-[#333333]'
                }`}
                title={isMarkedRead ? "Mark as unread" : "Mark as read"}
              >
                <Check className={`h-3 w-3 ${isMarkedRead ? 'stroke-[3]' : 'stroke-[2]'}`} />
              </button>
            )}
          </div>
          
          {!isLocked && card.settings && (
            <div className="flex">
              <span className="text-[10px] font-mono text-[#777777] bg-[#f5f5f5] px-2 py-0.5 rounded flex items-center gap-1">
                <Camera className="h-3 w-3" />
                {card.settings.split('|')[0].trim()}
              </span>
            </div>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#111111] leading-tight mb-4 uppercase">
          {card.title}
        </h3>

        {/* Card Body - Clamped and Blurred for bottom 2 lines */}
        <div className="relative mt-2">
          {isLocked ? (
            <div className="relative h-[5.5rem] overflow-hidden">
              <p className="text-sm leading-relaxed text-neutral-700 blur-[4px] pointer-events-none opacity-40 select-none line-clamp-4 font-sans font-medium">
                {card.body}
              </p>
            </div>
          ) : (
            <div className="relative overflow-hidden h-[5.5rem]">
              <p className="text-sm leading-relaxed text-neutral-700 font-sans font-medium line-clamp-4">
                {card.body}
              </p>
              
              {/* Blur overlay for default state - blurs bottom 2 lines */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[2.75rem] pointer-events-none bg-gradient-to-t from-white via-white/85 to-transparent backdrop-blur-[1.2px]"
              />
            </div>
          )}
          
          {/* Subtle Padlock and Text on Locked cards */}
          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              <div className="bg-black/5 text-[#555555] p-2 rounded-full mb-1">
                <Lock className="h-4 w-4" style={{ color: categoryColor }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer / Action Button */}
      <div className="mt-6 pt-3 border-t border-[#f0f0f0] flex items-center justify-between gap-3">
        {isLocked ? (
          <div className="w-full flex flex-col gap-2">
            <button
              id={`unlock-btn-${card.id}`}
              onClick={(e) => onGetDeckClick(e, card)}
              className="w-full py-2.5 text-white text-[10px] font-black uppercase rounded-lg transition-all hover:brightness-110 active:scale-98 cursor-pointer shadow-sm text-center"
              style={{ backgroundColor: categoryColor }}
            >
              Get the full deck
            </button>
          </div>
        ) : (
          <>
            <div
              className="text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5 transition-all duration-200 text-[#111111]"
            >
              <span>Click to View</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
            </div>

            {card.location && (
              <span className="flex items-center gap-1 text-[#888888] font-mono text-[9px] font-bold uppercase tracking-wider truncate max-w-[140px]">
                <Compass className="h-3.5 w-3.5 text-[#555555]" />
                <span className="truncate text-[#333333]">{card.location.split(',')[0]}</span>
              </span>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
