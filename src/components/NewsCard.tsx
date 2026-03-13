import React from 'react';
import { ExternalLink, Calendar, Newspaper, ArrowRight } from 'lucide-react';
import { News } from '../types';
import { motion } from 'motion/react';

interface NewsCardProps {
  news: News;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group flex flex-col h-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
          news.category === 'Manaus' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
        }`}>
          {news.category}
        </span>
        <span className="text-zinc-500 text-xs flex items-center gap-1">
          <Calendar size={12} />
          {new Date(news.publishedAt).toLocaleDateString('pt-BR')}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
        {news.title}
      </h3>
      
      <p className="text-zinc-500 text-sm mb-6 line-clamp-3 flex-grow">
        {news.summary}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
          <Newspaper size={14} />
          {news.source}
        </div>
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1 text-sm font-bold group/link"
        >
          Ler mais
          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};
