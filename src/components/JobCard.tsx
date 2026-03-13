import React, { useState } from 'react';
import { Share2, MapPin, Building2, Calendar, Heart, ExternalLink, Linkedin, Copy, Check, Info, Mail, Globe } from 'lucide-react';
import { Job } from '../types';
import { motion } from 'motion/react';

interface JobCardProps {
  job: Job;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isFavorite, onToggleFavorite }) => {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const linkedinSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title + ' ' + job.company)}`;

  const getSourceColor = (source?: string) => {
    switch (source) {
      case 'CIEE': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'IEL': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Startup': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Erasmus+': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Parker Dewey': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'LinkedIn': return 'bg-[#0077b5]/10 text-[#0077b5] border-[#0077b5]/20';
      case 'Indeed': return 'bg-blue-600/10 text-blue-500 border-blue-600/20';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const copyText = (text: string, setStatus: (s: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setStatus(true);
    setTimeout(() => setStatus(false), 2000);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
      title: `Vaga de Estágio: ${job.title}`,
      text: `Confira esta vaga de estágio em ${job.category} na empresa ${job.company}! Tecnologias: ${job.technologies.join(', ')}.`,
      url: job.url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('Link copiado para a área de transferência!');
      } catch (err) {
        console.error('Erro ao copiar:', err);
      }
    }
  };

  const isPortal = job.source === 'CIEE' || job.source === 'IEL';
  const isManaus = job.location.toLowerCase().includes('manaus');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-colors group relative flex flex-col h-full"
      id={`job-card-${job.id}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
              {job.category}
            </span>
            {job.isRemote && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                <Globe size={12} />
                Remoto
              </span>
            )}
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${isManaus ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
              {isManaus ? 'Manaus' : 'Fora de Manaus'}
            </span>
            {job.source && (
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getSourceColor(job.source)}`}>
                {job.source}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            {job.title}
          </h3>
        </div>
        <div className="flex gap-2 shrink-0 ml-4">
          <button
            onClick={() => onToggleFavorite(job.id)}
            className={`p-2 rounded-xl transition-all active:scale-95 ${
              isFavorite ? 'bg-rose-500/20 text-rose-500' : 'bg-zinc-800 text-zinc-400 hover:text-rose-500'
            }`}
            aria-label="Favoritar vaga"
            id={`fav-btn-${job.id}`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
            aria-label="Compartilhar vaga"
            id={`share-btn-${job.id}`}
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-6 flex-grow">
        <div className="flex items-center text-zinc-400 text-sm">
          <Building2 size={16} className="mr-2 shrink-0" />
          <span className="truncate">{job.company}</span>
        </div>
        <div className="flex items-center text-zinc-400 text-sm">
          <MapPin size={16} className="mr-2 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        
        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mt-2">
          {job.description}
        </p>
        
        {job.contactEmail && (
          <div className="flex items-center justify-between bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10 mt-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <Mail size={14} className="text-emerald-500 shrink-0" />
              <span className="text-xs text-emerald-400 truncate font-medium">{job.contactEmail}</span>
            </div>
            <button 
              onClick={() => copyText(job.contactEmail!, setEmailCopied)}
              className="text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1 text-[10px] font-bold shrink-0 ml-2"
            >
              {emailCopied ? <Check size={12} /> : <Copy size={12} />}
              {emailCopied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        )}

        {job.code && (
          <div className="flex items-center justify-between bg-zinc-800/50 p-2 rounded-lg border border-zinc-700 mt-2">
            <span className="text-xs text-zinc-500 font-mono">CÓD: {job.code}</span>
            <button 
              onClick={() => copyText(job.code!, setCopied)}
              className="text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copiado' : 'Copiar Cód'}
            </button>
          </div>
        )}
        <div className="flex items-center text-zinc-500 text-xs pt-2">
          <Calendar size={14} className="mr-2" />
          Postado em {new Date(job.postedAt).toLocaleDateString('pt-BR')}
        </div>
      </div>

      {isPortal && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-2">
          <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-300 leading-tight">
            Este portal exige login. Copie o código acima e pesquise na área do estudante após entrar.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {job.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all group/btn ${
            isPortal ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-black'
          }`}
          id={`access-btn-${job.id}`}
        >
          {isPortal ? `Entrar no ${job.source}` : 'Acessar Vaga'}
          <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </a>
        <a
          href={linkedinSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-[#0077b5] text-zinc-100 py-3 rounded-xl font-bold transition-all group/linkedin"
          id={`linkedin-btn-${job.id}`}
        >
          <Linkedin size={16} />
          Buscar no LinkedIn
        </a>
      </div>
    </motion.div>
  );
};
