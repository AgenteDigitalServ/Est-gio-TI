import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8" id="search-container">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="text-zinc-500" size={20} />
      </div>
      <input
        type="text"
        placeholder="Buscar por cargo, empresa ou tecnologia..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-zinc-600"
        id="search-input"
      />
    </div>
  );
};
