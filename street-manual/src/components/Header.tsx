import React from 'react';
import { Search, Camera, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: 'browse' | 'get-deck' | 'about') => void;
  activeSection: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalCards: number;
  onOpenSessionLog: () => void;
  usedCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Header({ 
  onNavigate, 
  activeSection, 
  searchQuery, 
  setSearchQuery, 
  totalCards,
  onOpenSessionLog,
  usedCount,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="mb-12 border-b border-app-border-primary pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 
            id="site-title"
            className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.05em] leading-none uppercase text-app-text-primary cursor-pointer selection:bg-app-text-primary selection:text-app-bg-primary whitespace-nowrap"
            onClick={() => onNavigate('browse')}
          >
            <Camera className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12 text-app-text-primary shrink-0" />
            <span>Street Manual</span>
          </h1>
          <p className="text-app-text-secondary mt-2 text-lg">
            A field guide for street photographers.
          </p>
          <p className="text-app-text-tertiary mt-1 text-sm font-mono uppercase tracking-wider">
            by{' '}
            <a 
              id="header-author-link"
              href="https://www.lukes.photos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-app-text-secondary hover:text-app-text-primary underline decoration-app-border-primary hover:decoration-app-text-primary underline-offset-4 transition-colors"
            >
              Luke Carey
            </a>
          </p>
        </div>
        
        <div className="flex flex-col items-stretch md:items-end gap-4 w-full md:w-[450px]">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-app-text-primary">
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
              className="w-full bg-app-bg-secondary border border-app-border-primary text-app-text-primary text-[11px] font-mono placeholder-app-text-tertiary/70 rounded-xl pl-10 pr-20 py-3 focus:outline-none focus:border-app-text-primary/70 tracking-wider uppercase transition-colors"
            />
            
            {/* Retro Camera frame counter display detail */}
            <div className="absolute right-3.5 inset-y-0 flex items-center pointer-events-none">
              <span className="text-[9px] font-mono font-bold bg-app-bg-tertiary border border-app-border-secondary text-amber-500 px-2 py-0.5 rounded leading-none">
                {totalCards.toString().padStart(2, '0')} IDEAS
              </span>
            </div>
          </div>

          <nav className="flex items-center justify-start md:justify-end gap-6 text-xs font-bold uppercase tracking-widest pt-1">
            <button
              id="nav-browse"
              onClick={() => onNavigate('browse')}
              className={`text-left hover:text-app-text-primary transition-colors duration-200 border-b-2 pb-1 cursor-pointer ${
                activeSection === 'browse' ? 'border-app-text-primary text-app-text-primary' : 'border-transparent text-app-text-tertiary'
              }`}
            >
              Browse Cards
            </button>
            <button
              id="nav-session-log"
              onClick={onOpenSessionLog}
              className={`text-left hover:text-amber-500 transition-colors duration-200 border-b-2 pb-1 cursor-pointer flex items-center gap-1.5 ${
                usedCount > 0 ? 'border-amber-500/50 text-amber-500' : 'border-transparent text-app-text-tertiary'
              }`}
            >
              <span>Focus Log</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold leading-none ${
                usedCount > 0 ? 'bg-amber-500 text-black' : 'bg-app-bg-tertiary text-app-text-tertiary'
              }`}>
                {usedCount}
              </span>
            </button>
            <button
              id="nav-get-deck"
              onClick={() => onNavigate('get-deck')}
              className={`text-left hover:text-app-text-primary transition-colors duration-200 border-b-2 pb-1 cursor-pointer ${
                activeSection === 'get-deck' ? 'border-app-text-primary text-app-text-primary' : 'border-transparent text-app-text-tertiary'
              }`}
            >
              Get the Deck
            </button>
            <a
              id="nav-portfolio"
              href="https://lukes.photos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-app-text-tertiary hover:text-app-text-primary transition-colors duration-200 border-b-2 border-transparent pb-1"
            >
              lukes.photos
            </a>
            
            {/* Minimal High-Tactility Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={onToggleTheme}
              className="flex items-center justify-center p-1.5 rounded-lg border border-app-border-primary bg-app-bg-secondary hover:border-app-text-primary hover:text-app-text-primary text-app-text-tertiary transition-all duration-200 cursor-pointer active:scale-95"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
