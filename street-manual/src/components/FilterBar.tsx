import React from 'react';
import { CATEGORIES } from '../data';
import { CategoryId } from '../types';
import { Shuffle } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  onShuffle: () => void;
}

// YIQ helper to ensure WCAG-compliant contrast text color over solid background
function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
}

export default function FilterBar({ selectedCategory, onSelectCategory, onShuffle }: FilterBarProps) {
  return (
    <div className="mb-10">
      {/* Prominent Inspire Me button above the filters */}
      <div className="flex justify-center mb-6">
        <button
          id="shuffle-btn"
          onClick={onShuffle}
          className="flex items-center justify-center gap-2 bg-app-bg-secondary/95 hover:bg-app-bg-tertiary border border-app-border-primary hover:border-app-text-tertiary/50 text-app-text-primary font-bold text-[10px] font-mono uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-lg active:scale-95 group"
        >
          <Shuffle className="h-3.5 w-3.5 text-app-text-tertiary group-hover:text-app-text-primary transition-colors" />
          <span>Inspire Me</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-app-text-tertiary font-bold">
          Filter Deck By Category
        </span>
        {selectedCategory !== 'all' && (
          <button
            id="clear-filter"
            onClick={() => onSelectCategory('all')}
            className="text-xs font-mono text-app-text-primary underline underline-offset-4 hover:text-app-text-secondary transition-colors"
          >
            Reset All
          </button>
        )}
      </div>

      <div className="overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none flex gap-2.5 scroll-smooth">
        {/* 'All' Filter Button */}
        <button
          id="filter-all"
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 px-4 py-2 rounded-full text-[10px] uppercase font-bold border transition-all duration-200 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-app-text-primary text-app-bg-primary border-app-text-primary opacity-100 scale-105 shadow-md'
              : 'bg-app-bg-secondary text-app-text-primary border-app-border-primary opacity-60 hover:opacity-100 hover:scale-105'
          }`}
        >
          All
        </button>

        {/* Category Specific Filter Buttons */}
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id;
          const textColor = getContrastColor(category.color);
          return (
            <button
              id={`filter-${category.id}`}
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              style={{
                backgroundColor: category.color,
                borderColor: category.color,
                color: textColor,
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-[10px] uppercase font-bold border transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'opacity-100 scale-105 shadow-md' 
                  : 'opacity-40 hover:opacity-85 hover:scale-105'
              }`}
            >
              {category.name.replace(' Locations', '')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
