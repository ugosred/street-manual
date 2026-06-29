import React from 'react';
import { Search, Camera } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: 'browse' | 'get-deck' | 'about') => void;
  activeSection: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalCards: number;
}

export default function Header({ 
  onNavigate, 
  activeSection, 
  searchQuery, 
  setSearchQuery, 
  totalCards 
}: HeaderProps) {
  return (
    <header className="mb-12 border-b border-[#222222] pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <h1 
            id="site-title"
            className="flex items-center gap-2 sm:gap-3 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.05em] leading-none uppercase text-white cursor-pointer selection:bg-white selection:text-black whitespace-nowrap"
            onClick={() => onNavigate('browse')}
          >
            <Camera className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white shrink-0" />
            <span>Street Manual</span>
          </h1>
          <p className="text-neutral-400 mt-2 text-lg">
            A field guide for street photographers.
          </p>
          <p className="text-neutral-500 mt-1 text-sm font-mono uppercase tracking-wider">
            by{' '}
            <a 
              id="header-author-link"
              href="https://www.lukes.photos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white underline decoration-neutral-600 hover:decoration-white underline-offset-4 transition-colors"
            >
              Luke Carey
            </a>
          </p>
        </div>
        
        <div className="flex flex-col items-stretch md:items-end gap-4 w-full md:w-[450px]">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#555555]">
              <Search className="h-4 w-4" />
            </div>
            <input
              id="card-search-input"
              type="text"
              placeholder="SEARCH TECHNIQUES / LOCATIONS..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeSection !== 'browse') {
                  onNavigate('browse');
                }
              }}
              className="w-full bg-[#161616] border border-[#222222] text-white text-[11px] font-mono placeholder-[#555555] rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:border-[#444444] tracking-wider uppercase transition-colors"
            />
            
            {/* Retro Camera frame counter display detail */}
            <div className="absolute right-3.5 inset-y-0 flex items-center pointer-events-none">
              <span className="text-[9px] font-mono font-bold bg-[#1d1d1d] border border-[#333333] text-amber-500 px-2 py-0.5 rounded leading-none">
                {totalCards.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <nav className="flex items-center justify-start md:justify-end gap-6 text-xs font-bold uppercase tracking-widest pt-1">
            <button
              id="nav-browse"
              onClick={() => onNavigate('browse')}
              className={`text-left hover:text-white transition-colors duration-200 border-b-2 pb-1 cursor-pointer ${
                activeSection === 'browse' ? 'border-white text-white' : 'border-transparent text-neutral-500'
              }`}
            >
              Browse Cards
            </button>
            <button
              id="nav-get-deck"
              onClick={() => onNavigate('get-deck')}
              className={`text-left hover:text-white transition-colors duration-200 border-b-2 pb-1 cursor-pointer ${
                activeSection === 'get-deck' ? 'border-white text-white' : 'border-transparent text-neutral-500'
              }`}
            >
              Get the Deck
            </button>
            <a
              id="nav-portfolio"
              href="https://lukes.photos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors duration-200 border-b-2 border-transparent pb-1"
            >
              lukes.photos
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
