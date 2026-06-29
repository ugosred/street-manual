import React from 'react';
import { CATEGORIES } from '../data';
import { CategoryId } from '../types';
import { Shuffle } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  onShuffle: () => void;
}

export default function FilterBar({ selectedCategory, onSelectCategory, onShuffle }: FilterBarProps) {
  return (
    <div className="mb-10">
      {/* Prominent Inspire Me button above the filters */}
      <div className="flex justify-center mb-6">
        <button
          id="shuffle-btn"
          onClick={onShuffle}
          className="flex items-center justify-center gap-2 bg-[#111111]/90 hover:bg-neutral-900 border border-white/10 hover:border-white/25 text-white font-bold text-[10px] font-mono uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-lg active:scale-95 group"
        >
          <Shuffle className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-colors" />
          <span>Inspire Me</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#888888] font-bold">
          Filter Deck By Category
        </span>
        {selectedCategory !== 'all' && (
          <button
            id="clear-filter"
            onClick={() => onSelectCategory('all')}
            className="text-xs font-mono text-white underline underline-offset-4 hover:text-[#cccccc] transition-colors"
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
          className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold transition-all duration-200 cursor-pointer border ${
            selectedCategory === 'all'
              ? 'bg-white text-black border-white'
              : 'bg-[#161616] text-neutral-400 border-[#222222] hover:bg-white hover:text-black hover:border-white'
          }`}
        >
          All
        </button>

        {/* Category Specific Filter Buttons */}
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              id={`filter-${category.id}`}
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              style={{
                borderColor: category.color,
                backgroundColor: isActive ? category.color : 'transparent',
                color: isActive ? '#ffffff' : category.color,
              }}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold border transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'brightness-110' 
                  : 'hover:brightness-125'
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
