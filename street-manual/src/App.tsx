import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, SlidersHorizontal, Camera, Film, HelpCircle, Check, BookOpen } from 'lucide-react';
import { CARDS } from './data';
import { Card, CategoryId } from './types';

// Component imports
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import StatsBanner from './components/StatsBanner';
import CardComponent from './components/CardComponent';
import CardDetailModal from './components/CardDetailModal';
import SessionLogModal from './components/SessionLogModal';
import DeckPurchaseSection from './components/DeckPurchaseSection';
import GumroadModal from './components/GumroadModal';

// Helper to shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  // Navigation & Page Sections
  const [activeSection, setActiveSection] = useState<'browse' | 'get-deck'>('browse');
  
  // Card Filters and Search States
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [shuffledAllCards, setShuffledAllCards] = useState<Card[]>(() => shuffleArray(CARDS));
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  // Custom handler for category selection that shuffles when 'all' is selected
  const handleSelectCategory = (category: CategoryId | 'all') => {
    if (category === 'all') {
      setShuffledAllCards(shuffleArray(CARDS));
    }
    setSelectedCategory(category);
  };

  // Reset visible card count when filters change
  React.useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery]);
  
  // Interactive Simulator States
  const [activeCardDetail, setActiveCardDetail] = useState<Card | null>(null);

  // Session Log state tracked via localStorage key streetmanual_used_cards
  const [usedCardIds, setUsedCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('streetmanual_used_cards');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const toggleUsedCard = (cardId: string) => {
    setUsedCardIds(prev => {
      const next = prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId];
      try {
        localStorage.setItem('streetmanual_used_cards', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const clearSessionLog = () => {
    try {
      localStorage.setItem('streetmanual_used_cards', JSON.stringify([]));
    } catch (e) {
      // ignore
    }
    setUsedCardIds([]);
  };
  
  // Modal visibility states
  const [isGumroadOpen, setIsGumroadOpen] = useState(false);
  const [isSessionLogOpen, setIsSessionLogOpen] = useState(false);
  
  // Creative feature: camera shutter flash effect state
  const [shutterFlash, setShutterFlash] = useState(false);

  // Filter & Search computation
  const filteredCards = useMemo(() => {
    const sourceCards = selectedCategory === 'all' ? shuffledAllCards : CARDS;
    return sourceCards.filter((card) => {
      // 1. Filter by Category
      const matchesCategory = selectedCategory === 'all' || card.categoryId === selectedCategory;
      
      // 2. Filter by Search Query
      const matchesSearch = 
        searchQuery.trim() === '' ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.location && card.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.settings && card.settings.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, shuffledAllCards]);

  // Action: Trigger a visual camera shutter flash effect
  const triggerShutterFlash = () => {
    setShutterFlash(true);
    setTimeout(() => {
      setShutterFlash(false);
    }, 150);
  };

  const handleCardClick = (card: Card) => {
    setActiveCardDetail(card);
  };

  const handleShuffle = () => {
    if (filteredCards.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setActiveCardDetail(filteredCards[randomIndex]);
  };

  const handleOpenGumroad = () => {
    setIsGumroadOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#111111] text-white font-sans antialiased overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Visual Camera Shutter Flash Overlay */}
      <AnimatePresence>
        {shutterFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
            className="fixed inset-0 bg-white pointer-events-none z-50 mix-blend-difference"
          />
        )}
      </AnimatePresence>

      {/* Retro film grain noise effect overlay for raw physical zine feel */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.015] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container mx-auto max-w-[1536px] px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 2xl:px-40 py-10 md:py-16 flex flex-col justify-between min-h-screen">
        
        {/* Header Module */}
        <Header 
          activeSection={activeSection}
          onNavigate={(section) => {
            if (section === 'browse' || section === 'get-deck') {
              setActiveSection(section);
            }
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalCards={filteredCards.length}
          onOpenSessionLog={() => setIsSessionLogOpen(true)}
          usedCount={usedCardIds.length}
        />

        {/* Dynamic page rendering */}
        <main className="flex-grow">
          {activeSection === 'browse' ? (
            <div className="animate-fade-in">
              
              {/* Hero Section */}
              <HeroSection onOpenGumroad={handleOpenGumroad} />

              {/* Promotional Banner above grid */}
              <StatsBanner 
                onGoToGetDeck={() => setActiveSection('get-deck')}
              />

              {/* Main controls row: FilterBar */}
              <div className="mb-8">
                <FilterBar 
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                  onShuffle={handleShuffle}
                />
                {usedCardIds.length > 0 && (
                  <div className="mt-4 flex justify-start">
                    <button
                      id="stats-session-log-btn"
                      onClick={() => setIsSessionLogOpen(true)}
                      className="inline-flex items-center gap-1.5 bg-amber-950/40 border border-amber-800/50 hover:border-amber-600/70 text-amber-400 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded transition-colors cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>Focus Log: {usedCardIds.length} Active</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Informative helper info bar if search has results */}
              {searchQuery && (
                <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[#888888] uppercase">
                  <span>Found {filteredCards.length} matches for "{searchQuery}"</span>
                  <button
                    id="clear-search"
                    onClick={() => setSearchQuery('')}
                    className="text-white hover:underline cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Responsive Card Grid with Layout animations */}
              {filteredCards.length > 0 ? (
                <>
                  <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 xl:gap-12 pb-12"
                  >
                    {filteredCards.slice(0, visibleCount).map((card) => (
                      <CardComponent
                        key={card.id}
                        card={card}
                        onCardClick={handleCardClick}
                        onGetDeckClick={(e, c) => {
                          e.stopPropagation();
                          handleOpenGumroad();
                        }}
                        isUsed={usedCardIds.includes(card.id)}
                        onToggleUsed={toggleUsedCard}
                      />
                    ))}
                  </div>

                  {/* View More Button */}
                  {filteredCards.length > visibleCount && (
                    <div className="flex justify-center pb-16">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="px-8 py-3 bg-white hover:bg-neutral-200 text-black font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_12px_rgba(255,255,255,0.05)] cursor-pointer flex items-center gap-2"
                      >
                        <span>View More</span>
                        <span className="text-[#666666] text-[10px]">({filteredCards.length - visibleCount} remaining)</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-[#161616] border border-[#222222] rounded-2xl p-8 mb-12">
                  <Film className="h-8 w-8 text-[#555555] mx-auto mb-4" />
                  <p className="text-sm font-mono text-white font-bold uppercase tracking-wider mb-2">
                    No field notes matched your criteria
                  </p>
                  <p className="text-xs text-[#888888] font-sans max-w-sm mx-auto mb-6">
                    Try checking your spelling, selecting "All Cards", or resetting your search term.
                  </p>
                  <button
                    id="reset-all-filters-btn"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded-lg uppercase hover:bg-[#eeeeee] transition-all cursor-pointer"
                  >
                    Reset Grid
                  </button>
                </div>
              )}

              {/* Minimal Field Guide Instructions / Key legends */}
              <div className="mt-8 border-t border-[#1a1a1a] pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-[#555555]">
                <div className="flex gap-3">
                  <div className="text-xs font-mono font-bold shrink-0 text-[#888888]">
                    [A]
                  </div>
                  <p className="text-[11px] font-sans leading-relaxed">
                    <strong>Zone Focusing:</strong> Keep standard manual camera prime lenses focused permanently at 1.5-2m to seize unposed, candid geometry on high-contrast tarmac.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-xs font-mono font-bold shrink-0 text-[#888888]">
                    [B]
                  </div>
                  <p className="text-[11px] font-sans leading-relaxed">
                    <strong>Tactile Cards:</strong> Click any free card to pick it up and flip it. Study the assignment parameters on the back, then replicate on your camera.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-xs font-mono font-bold shrink-0 text-[#888888]">
                    [C]
                  </div>
                  <p className="text-[11px] font-sans leading-relaxed">
                    <strong>Premium Pack:</strong> Access detailed assignments, full lens recommendation guides, and coordinates for hidden spots across London, Essex, and Hertfordshire.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            // Deck Store and Physical Specification section
            <DeckPurchaseSection onOpenGumroad={handleOpenGumroad} />
          )}
        </main>

        {/* Minimal Zine Footer */}
        <footer 
          id="app-footer"
          className="mt-24 pt-12 border-t border-[#222222] flex flex-col gap-10"
        >
          {/* Main Footer content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Statement */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[11px] font-black uppercase tracking-widest text-white">
                STREET MANUAL
              </h4>
              <p className="text-xs text-[#888888] font-sans leading-relaxed">
                A tactical street photography manual tool designed to spark your creativity, refine your muscle memory, and challenge your perspective.
              </p>
            </div>

            {/* Platform Column */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[11px] font-black uppercase tracking-widest text-white">
                THE DECK
              </h4>
              <ul className="text-xs text-[#888888] font-sans space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveSection('browse')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Browse Starter Cards
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleOpenGumroad} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Unlock all 140+ Cards
                  </button>
                </li>

              </ul>
            </div>

            {/* Designer / Links Column */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[11px] font-black uppercase tracking-widest text-white">
                COLLECTIVE
              </h4>
              <p className="text-xs text-[#888888] font-sans leading-relaxed">
                Developed in collaboration with photographers across London, Essex, and Hertfordshire.
              </p>
              <div className="mt-1">
                <a 
                  id="footer-portfolio-link"
                  href="https://lukes.photos" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white border border-[#333333] hover:border-white px-3 py-1.5 rounded-md uppercase tracking-widest font-bold transition-all duration-200"
                >
                  <span>lukes.photos</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="border-t border-[#1e1e1e] pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-[#555555] uppercase tracking-widest font-black">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center sm:text-left">
              <span>© {new Date().getFullYear()} STREET MANUAL</span>
              <span className="text-[#333333] hidden sm:inline">•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </footer>

        {/* Tactile Card inspection modal */}
        {activeCardDetail && (
          <CardDetailModal 
            card={activeCardDetail}
            onClose={() => setActiveCardDetail(null)}
            onGetDeck={handleOpenGumroad}
            isUsed={usedCardIds.includes(activeCardDetail.id)}
            onToggleUsed={toggleUsedCard}
          />
        )}

        {/* Session Log Modal */}
        <SessionLogModal
          isOpen={isSessionLogOpen}
          onClose={() => setIsSessionLogOpen(false)}
          usedCardIds={usedCardIds}
          cards={CARDS}
          onToggleUsed={toggleUsedCard}
          onClearAll={clearSessionLog}
          onCardClick={handleCardClick}
        />

        {/* Gumroad Simulated Gateway */}
        <GumroadModal 
          isOpen={isGumroadOpen}
          onClose={() => setIsGumroadOpen(false)}
        />

      </div>
    </div>
  );
}
