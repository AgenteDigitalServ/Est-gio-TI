import { useState, useMemo, useEffect } from 'react';
import { Briefcase, Sparkles, MapPin, ChevronDown, Plus, Heart, Search, Newspaper, Globe, Bell } from 'lucide-react';
import { MOCK_JOBS, MOCK_NEWS } from './types';
import { JobCard } from './components/JobCard';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { NewsCard } from './components/NewsCard';
import { NotificationManager } from './components/NotificationManager';
import { motion, AnimatePresence } from 'motion/react';

const JOBS_PER_PAGE = 6;

export default function App() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'news'>('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('Manaus, AM');
  const [newsCategory, setNewsCategory] = useState<'All' | 'Manaus' | 'Brasil'>('All');
  const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Simulation of "new job" arrival
  useEffect(() => {
    const timer = setTimeout(() => {
      if ((window as any).showTechStepsNotification) {
        (window as any).showTechStepsNotification(
          'Nova Vaga!',
          'Uma nova vaga de Backend em Manaus acaba de ser postada.',
          'info',
          'https://www.prodam.am.gov.br/' // Direct link for the simulation
        );
      }
    }, 15000); // Simulate a new job after 15 seconds
    return () => clearTimeout(timer);
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(JOBS_PER_PAGE);
  }, [searchTerm, selectedCategory, selectedLocation, showOnlyFavorites, activeTab]);

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

  const filteredNews = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return MOCK_NEWS.filter((news) => {
      const matchesSearch = normalizedSearch === '' ||
        news.title.toLowerCase().includes(normalizedSearch) ||
        news.summary.toLowerCase().includes(normalizedSearch) ||
        news.source.toLowerCase().includes(normalizedSearch);
      
      const matchesCategory = newsCategory === 'All' || news.category === newsCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, newsCategory]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const newsPortals = [
    { name: 'G1 Amazonas', url: 'https://g1.globo.com/am/amazonas/' },
    { name: 'A Crítica', url: 'https://www.acritica.com/' },
    { name: 'Portal Holanda', url: 'https://www.portalholanda.com.br/' },
    { name: 'Canaltech', url: 'https://canaltech.com.br/' },
    { name: 'G1 Tecnologia', url: 'https://g1.globo.com/tecnologia/' },
    { name: 'Startups.com.br', url: 'https://startups.com.br/' },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500/30">
      <NotificationManager />
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

          <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => { setActiveTab('jobs'); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'jobs' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Briefcase size={16} />
              Vagas
            </button>
            <button
              onClick={() => { setActiveTab('news'); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'news' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Newspaper size={16} />
              Notícias
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button 
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-2 transition-colors ${showOnlyFavorites ? 'text-rose-500' : 'hover:text-emerald-400'}`}
            >
              <Heart size={18} fill={showOnlyFavorites ? "currentColor" : "none"} />
              Favoritos ({favorites.length})
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
            {activeTab === 'jobs' ? 'Ecossistema Tech Manaus' : 'Radar de Notícias Tech'}
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            {activeTab === 'jobs' ? (
              <>Dê o próximo passo na sua <br className="hidden md:block" /> carreira em <span className="text-emerald-500 italic">Manaus.</span></>
            ) : (
              <>Fique por dentro do que <br className="hidden md:block" /> acontece no <span className="text-emerald-500 italic">Mundo Tech.</span></>
            )}
          </h2>
          
          {activeTab === 'jobs' && (
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
          )}
          
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto">
            {activeTab === 'jobs' 
              ? 'Refinando buscas em CIEE, IEL, Startups e Órgãos Públicos (Municipais, Estaduais e Federais).'
              : 'As principais notícias de tecnologia e carreira de Manaus e de todo o Brasil em um só lugar.'}
          </p>
        </section>

        {/* Search and Filters */}
        <section id="search-section" className="space-y-6">
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder={activeTab === 'jobs' ? "Buscar vagas, empresas ou tecnologias..." : "Buscar notícias, fontes ou temas..."}
          />
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {activeTab === 'jobs' ? (
              <>
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
                <button
                  onClick={() => {
                    if ((window as any).showTechStepsNotification) {
                      (window as any).showTechStepsNotification(
                        'Inscrição Ativa',
                        `Você será notificado sobre novas vagas de ${selectedCategory === 'All' ? 'todas as categorias' : selectedCategory}.`,
                        'success'
                      );
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm font-bold text-zinc-400 hover:text-emerald-500 hover:border-emerald-500 transition-all"
                >
                  <Bell size={16} />
                  Notificar-me
                </button>
              </>
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {['All', 'Manaus', 'Brasil'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewsCategory(cat as any)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${
                      newsCategory === cat
                        ? 'bg-emerald-500 border-emerald-500 text-black'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {cat === 'All' ? 'Todas as Notícias' : cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Content Board */}
        <section id="content-board" className="mt-12">
          <AnimatePresence mode="wait">
            {activeTab === 'jobs' ? (
              <motion.div
                key="jobs-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isFavorite={favorites.includes(job.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="news-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>

                {/* News Portals Quick Links */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 mt-16">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Globe size={20} className="text-emerald-500" />
                    Principais Portais de Notícias
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {newsPortals.map((portal) => (
                      <a
                        key={portal.name}
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-4 bg-zinc-800 rounded-2xl text-xs font-bold hover:bg-emerald-500 hover:text-black transition-all text-center border border-zinc-700"
                      >
                        {portal.name}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {(activeTab === 'jobs' ? filteredJobs.length : filteredNews.length) === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-800"
              id="no-results"
            >
              <p className="text-zinc-500 text-lg">Nenhum resultado encontrado para esses critérios.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedLocation('All'); setShowOnlyFavorites(false); setNewsCategory('All'); }}
                className="mt-4 text-emerald-500 hover:underline"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}

          {/* Load More Button for Jobs */}
          {activeTab === 'jobs' && visibleCount < filteredJobs.length && (
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
