import { useState, useMemo, useEffect } from 'react';
import { Briefcase, Sparkles, MapPin, ChevronDown, Plus, Heart } from 'lucide-react';
import { MOCK_JOBS } from './types';
import { JobCard } from './components/JobCard';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { motion, AnimatePresence } from 'motion/react';

const JOBS_PER_PAGE = 6;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('Manaus, AM');
  const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(JOBS_PER_PAGE);
  }, [searchTerm, selectedCategory, selectedLocation, showOnlyFavorites]);

  const locations = useMemo(() => {
    const locs = MOCK_JOBS.map(job => job.location);
    return ['All', ...new Set(locs)];
  }, []);

  const filteredJobs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    
    return MOCK_JOBS.filter((job) => {
      const matchesSearch = normalizedSearch === '' ||
        job.title.toLowerCase().includes(normalizedSearch) ||
        job.company.toLowerCase().includes(normalizedSearch) ||
        job.technologies.some((tech) => tech.toLowerCase().includes(normalizedSearch));

      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
      const matchesFavorite = !showOnlyFavorites || favorites.includes(job.id);

      return matchesSearch && matchesCategory && matchesLocation && matchesFavorite;
    });
  }, [searchTerm, selectedCategory, selectedLocation, showOnlyFavorites, favorites]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" id="logo">
            <div className="p-2 bg-emerald-500 rounded-xl group-hover:rotate-12 transition-transform">
              <Briefcase className="text-black" size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter">
              Tech<span className="text-emerald-500">Steps</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button 
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-2 transition-colors ${showOnlyFavorites ? 'text-rose-500' : 'hover:text-emerald-400'}`}
            >
              <Heart size={18} fill={showOnlyFavorites ? "currentColor" : "none"} />
              Favoritos ({favorites.length})
            </button>
            <button className="bg-emerald-500 text-black px-5 py-2 rounded-full hover:bg-emerald-400 transition-colors font-bold">
              Postar Vaga
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center mb-16" id="hero">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} />
            Ecossistema Tech Manaus
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Dê o próximo passo na sua <br className="hidden md:block" />
            carreira em <span className="text-emerald-500 italic">Manaus.</span>
          </h2>
          
          {/* Stats Card */}
          <div className="flex justify-center mb-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-sm" id="stats-card">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Briefcase className="text-emerald-500" size={24} />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider">Vagas em Manaus</p>
                <p className="text-2xl font-black text-emerald-500">{filteredJobs.length}</p>
              </div>
            </div>
          </div>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto">
            Refinando buscas em CIEE, IEL, Startups e Órgãos Públicos (Municipais, Estaduais e Federais).
          </p>
        </section>

        {/* Search and Filters */}
        <section id="search-section" className="space-y-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Location Selector */}
            <div className="relative group w-full md:w-auto" id="location-selector">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <MapPin className="text-zinc-500" size={18} />
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none w-full md:w-64 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-pointer"
              >
                <option value="All">Todas as Localizações</option>
                {locations.filter(l => l !== 'All').map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown className="text-zinc-500" size={18} />
              </div>
            </div>

            <FilterBar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          </div>
        </section>

        {/* Job Board */}
        <section id="job-board" className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  isFavorite={favorites.includes(job.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-800"
              id="no-results"
            >
              <p className="text-zinc-500 text-lg">Nenhuma vaga encontrada para esses critérios.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedLocation('All'); setShowOnlyFavorites(false); }}
                className="mt-4 text-emerald-500 hover:underline"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredJobs.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount(prev => prev + JOBS_PER_PAGE)}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-emerald-500 text-zinc-100 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 group"
                id="load-more-btn"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                Carregar mais vagas
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Briefcase className="text-emerald-500" size={20} />
            <span className="font-bold tracking-tighter">TechSteps © 2026</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300">Privacidade</a>
            <a href="#" className="hover:text-zinc-300">Termos</a>
            <a href="#" className="hover:text-zinc-300">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
