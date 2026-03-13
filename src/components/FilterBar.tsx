import React from 'react';
import { Job } from '../types';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES: Job['category'][] = [
  'Backend',
  'Frontend',
  'Fullstack',
  'Data Science',
  'Mobile',
  'DevOps',
  'Design',
  'QA',
  'Support',
];

export const FilterBar: React.FC<FilterBarProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12" id="filter-bar">
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedCategory === 'All'
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
            : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
        }`}
        id="filter-all"
      >
        Todas
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === cat
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
          }`}
          id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
