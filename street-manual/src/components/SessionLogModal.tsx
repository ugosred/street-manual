import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { Card } from '../types';
import { CATEGORIES } from '../data';

interface SessionLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  usedCardIds: string[];
  cards: Card[];
  onToggleUsed: (cardId: string) => void;
  onClearAll: () => void;
  onCardClick: (card: Card) => void;
}

export default function SessionLogModal({
  isOpen,
  onClose,
  usedCardIds,
  cards,
  onToggleUsed,
  onClearAll,
  onCardClick,
}: SessionLogModalProps) {
  const [confirmClear, setConfirmClear] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setConfirmClear(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter cards to find those that are marked as used
  const usedCards = cards.filter((card) => usedCardIds.includes(card.id));

  // Group used cards by category
  const groupedCards = CATEGORIES.map((category) => {
    const categoryCards = usedCards.filter((card) => card.categoryId === category.id);
    return {
      category,
      cards: categoryCards,
    };
  }).filter((group) => group.cards.length > 0);

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
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
          className="relative bg-app-bg-secondary border border-app-border-primary rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl z-10 text-app-text-primary font-sans"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-app-border-primary flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Compass className="h-5 w-5 text-amber-500 animate-spin-slow" />
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight uppercase font-mono">
                  Focus Log
                </h2>
              </div>
              <p className="text-app-text-secondary text-xs font-sans">
                Real-time field tracker • stored offline in your browser
              </p>
            </div>

            <button
              id="close-session-log-btn"
              onClick={onClose}
              className="p-2 hover:bg-app-bg-tertiary text-app-text-secondary hover:text-app-text-primary rounded-full transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            {usedCards.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="bg-app-bg-primary border border-app-border-primary p-4 rounded-full mb-4 text-app-text-tertiary">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-app-text-secondary mb-1">
                  Your active focus list is empty
                </h3>
                <p className="text-xs text-app-text-tertiary max-w-sm leading-relaxed">
                  Mark ideas or technique cards as "Focus Card" during your shoot to compile a tactical assignment report.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Stats Summary Panel */}
                <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-mono font-black text-amber-500">
                      {usedCards.length}
                    </span>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider block text-white">
                        Cards Mobilized
                      </span>
                      <span className="text-[10px] text-neutral-500 font-sans block">
                        across {groupedCards.length} distinct categories
                      </span>
                    </div>
                  </div>

                  {confirmClear ? (
                    <div className="flex items-center gap-2 animate-slide-in">
                      <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider">Are you sure?</span>
                      <button
                        id="clear-session-log-confirm-btn"
                        onClick={() => {
                          onClearAll();
                          setConfirmClear(false);
                        }}
                        className="bg-red-950/80 border border-red-800 text-red-400 hover:bg-red-900 hover:text-white px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Yes, Clear
                      </button>
                      <button
                        onClick={() => setConfirmClear(false)}
                        className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      id="clear-session-log-btn"
                      onClick={() => setConfirmClear(true)}
                      className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:border-red-900 hover:bg-red-950/20 text-neutral-400 hover:text-red-400 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Clear log</span>
                    </button>
                  )}
                </div>

                {/* Grouped Lists */}
                <div className="space-y-6">
                  {groupedCards.map(({ category, cards }) => (
                    <div key={category.id} className="space-y-3">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-neutral-800">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-app-text-primary">
                          {category.name}
                        </h4>
                        <span className="text-[10px] text-app-text-tertiary font-mono font-bold ml-auto">
                          {cards.length} {cards.length === 1 ? 'card' : 'cards'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {cards.map((card) => (
                          <div
                            key={card.id}
                            id={`session-item-${card.id}`}
                            onClick={() => {
                              onClose();
                              onCardClick(card);
                            }}
                            className="group flex items-center justify-between p-3.5 bg-app-bg-primary border border-app-border-primary hover:border-app-text-tertiary hover:bg-app-bg-tertiary rounded-xl transition-all cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              {/* Left Colored accent line representing the card category */}
                              <div 
                                className="w-1 h-8 rounded-full shrink-0" 
                                style={{ backgroundColor: category.color }}
                              />
                              <div className="min-w-0">
                                <span className="block text-xs font-black uppercase tracking-wide text-app-text-primary group-hover:text-amber-500 transition-colors truncate">
                                  {card.title}
                                </span>
                                {card.settings && (
                                  <span className="block text-[9px] font-mono text-app-text-tertiary uppercase mt-0.5">
                                    {card.settings.split('|')[0].trim()}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-2">
                              {/* Delete option to quickly unmark */}
                              <button
                                id={`unuse-card-btn-${card.id}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleUsed(card.id);
                                }}
                                className="p-1 text-app-text-tertiary hover:text-red-400 hover:bg-app-bg-tertiary rounded transition-colors cursor-pointer"
                                title="Remove from session"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                              <ArrowRight className="h-3 w-3 text-app-text-tertiary group-hover:text-app-text-primary transition-all transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pinned action footer */}
          <div className="bg-neutral-900 p-5 md:p-6 border-t border-neutral-800 text-center text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
            <span>Street Manual • Active Field Assignment Tracker</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
