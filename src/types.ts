export interface Job {
  id: string;
  title: string;
  company: string;
  technologies: string[];
  location: string;
  category: 'Backend' | 'Frontend' | 'Fullstack' | 'Data Science' | 'Mobile' | 'DevOps' | 'Design' | 'QA' | 'Support';
  description: string;
  postedAt: string;
  url: string;
  source?: 'CIEE' | 'IEL' | 'Startup' | 'Direct';
  code?: string;
}

export interface News {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  category: 'Manaus' | 'Brasil';
  summary: string;
}

export const MOCK_JOBS: Job[] = [
  {
    id: 'm1',
    title: 'Estágio em Desenvolvimento Web',
    company: 'Manaus Tech Hub',
    technologies: ['React', 'Node.js', 'JavaScript'],
    location: 'Manaus, AM',
    category: 'Fullstack',
    description: 'Oportunidade em uma das maiores aceleradoras de startups da região norte.',
    postedAt: '2026-03-12',
    url: 'https://manaustechhub.com/',
    source: 'Startup',
  },
  {
    id: 'm2',
    title: 'Estagiário de TI (Suporte e Redes)',
    company: 'CIEE Manaus',
    technologies: ['Windows Server', 'Linux', 'Redes'],
    location: 'Manaus, AM',
    category: 'Support',
    description: 'Vaga via CIEE para atuação em órgão público em Manaus.',
    postedAt: '2026-03-11',
    url: 'https://web.ciee.org.br/estudante/processos-seletivos-lista',
    source: 'CIEE',
    code: '05128934',
  },
  {
    id: 'm3',
    title: 'Estágio em Desenvolvimento Java',
    company: 'Samsung Ocean Manaus',
    technologies: ['Java', 'Android', 'Kotlin'],
    location: 'Manaus, AM',
    category: 'Backend',
    description: 'Participe de projetos de inovação tecnológica no ecossistema Samsung.',
    postedAt: '2026-03-10',
    url: 'https://www.oceanbrasil.com/',
    source: 'Direct',
  },
  {
    id: 'm4',
    title: 'Estágio em Análise de Dados',
    company: 'IEL Amazonas',
    technologies: ['Excel Avançado', 'Power BI', 'SQL'],
    location: 'Manaus, AM',
    category: 'Data Science',
    description: 'Vaga de estágio via IEL para indústria no Distrito Industrial.',
    postedAt: '2026-03-12',
    url: 'https://iel-am.org.br/estagio/vagas-de-estagio',
    source: 'IEL',
    code: 'IEL-2026-042',
  },
  {
    id: 'p1',
    title: 'Estágio em Desenvolvimento (PRODAM)',
    company: 'Governo do Amazonas - PRODAM',
    technologies: ['Java', 'Spring Boot', 'SQL'],
    location: 'Manaus, AM',
    category: 'Backend',
    description: 'Estágio no órgão de Processamento de Dados do Amazonas. Atuação em sistemas governamentais estaduais.',
    postedAt: '2026-03-12',
    url: 'https://www.prodam.am.gov.br/',
    source: 'Direct',
  },
  {
    id: 'p2',
    title: 'Estágio em TI - Suporte e Redes',
    company: 'Prefeitura de Manaus - SEMAD',
    technologies: ['Hardware', 'Redes', 'Windows'],
    location: 'Manaus, AM',
    category: 'Support',
    description: 'Oportunidade na Secretaria Municipal de Administração. Suporte técnico aos órgãos municipais.',
    postedAt: '2026-03-11',
    url: 'https://manaus.am.gov.br/',
    source: 'CIEE',
    code: 'MUN-2026-088',
  },
  {
    id: 'p3',
    title: 'Estágio em Desenvolvimento Web (TRT11)',
    company: 'Tribunal Regional do Trabalho - 11ª Região',
    technologies: ['PHP', 'Laravel', 'JavaScript'],
    location: 'Manaus, AM',
    category: 'Fullstack',
    description: 'Vaga federal no TRT11 (AM/RR). Desenvolvimento e manutenção de sistemas judiciários.',
    postedAt: '2026-03-10',
    url: 'https://portal.trt11.jus.br/',
    source: 'Direct',
  },
  {
    id: 'p4',
    title: 'Estágio em Ciência de Dados (UFAM)',
    company: 'Universidade Federal do Amazonas',
    technologies: ['Python', 'R', 'Estatística'],
    location: 'Manaus, AM',
    category: 'Data Science',
    description: 'Oportunidade em laboratórios de pesquisa e inovação da UFAM.',
    postedAt: '2026-03-12',
    url: 'https://ufam.edu.br/',
    source: 'Direct',
  },
  {
    id: 'p5',
    title: 'Estagiário de Desenvolvimento Mobile',
    company: 'UEA - Universidade do Estado do Amazonas',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    location: 'Manaus, AM',
    category: 'Mobile',
    description: 'Atuação em projetos de extensão e desenvolvimento de apps na UEA.',
    postedAt: '2026-03-09',
    url: 'https://uea.edu.br/',
    source: 'Direct',
  },
  {
    id: 'p6',
    title: 'Estágio em Infraestrutura e Cloud',
    company: 'IFAM - Instituto Federal do Amazonas',
    technologies: ['Linux', 'Docker', 'Redes'],
    location: 'Manaus, AM',
    category: 'DevOps',
    description: 'Vaga federal para suporte à infraestrutura de rede e servidores do IFAM.',
    postedAt: '2026-03-08',
    url: 'http://www.ifam.edu.br/',
    source: 'Direct',
  },
  {
    id: 'p7',
    title: 'Estágio em TI (TRE-AM)',
    company: 'Tribunal Regional Eleitoral do Amazonas',
    technologies: ['Suporte', 'Sistemas', 'Segurança'],
    location: 'Manaus, AM',
    category: 'Support',
    description: 'Vaga federal no TRE-AM. Apoio técnico especializado em sistemas eleitorais.',
    postedAt: '2026-03-12',
    url: 'https://www.tre-am.jus.br/',
    source: 'IEL',
    code: 'FED-TRE-2026',
  },
  {
    id: 'p8',
    title: 'Estágio em Desenvolvimento (SEMIT)',
    company: 'Secretaria Municipal de Inovação e Tecnologia',
    technologies: ['React', 'Node.js', 'API'],
    location: 'Manaus, AM',
    category: 'Fullstack',
    description: 'Vaga municipal na SEMIT Manaus. Foco em digitalização de serviços públicos.',
    postedAt: '2026-03-12',
    url: 'https://semit.manaus.am.gov.br/',
    source: 'Direct',
  },
];

export const MOCK_NEWS: News[] = [
  {
    id: 'n1',
    title: 'Manaus Tech Hub anuncia nova rodada de aceleração para startups locais',
    source: 'A Crítica',
    url: 'https://www.acritica.com/manaus',
    publishedAt: '2026-03-12',
    category: 'Manaus',
    summary: 'Aceleradora do Sidia busca novos talentos e soluções inovadoras na região norte.',
  },
  {
    id: 'n2',
    title: 'Polo Industrial de Manaus registra alta na demanda por profissionais de TI',
    source: 'G1 Amazonas',
    url: 'https://g1.globo.com/am/amazonas/',
    publishedAt: '2026-03-10',
    category: 'Manaus',
    summary: 'Indústrias do Distrito Industrial buscam estagiários e desenvolvedores para digitalização.',
  },
  {
    id: 'n3',
    title: 'Mercado de tecnologia no Brasil deve crescer 12% em 2026, aponta relatório',
    source: 'Canaltech',
    url: 'https://canaltech.com.br/mercado/',
    publishedAt: '2026-03-11',
    category: 'Brasil',
    summary: 'Setor de software e serviços continua sendo o principal motor da economia digital.',
  },
  {
    id: 'n4',
    title: 'CIEE e IEL abrem mais de 500 vagas de estágio em tecnologia nesta semana',
    source: 'Exame',
    url: 'https://exame.com/carreira/',
    publishedAt: '2026-03-12',
    category: 'Brasil',
    summary: 'Oportunidades estão espalhadas por todo o país, com foco em trabalho híbrido e remoto.',
  },
  {
    id: 'n5',
    title: 'Startup amazonense recebe aporte milionário para expansão nacional',
    source: 'Portal Holanda',
    url: 'https://www.portalholanda.com.br/tecnologia/',
    publishedAt: '2026-03-09',
    category: 'Manaus',
    summary: 'Empresa focada em logística na Amazônia atrai investidores do sudeste.',
  },
  {
    id: 'n6',
    title: 'Novas regras para estágio em TI entram em vigor no Brasil',
    source: 'Valor Econômico',
    url: 'https://valor.globo.com/carreira/',
    publishedAt: '2026-03-08',
    category: 'Brasil',
    summary: 'Mudanças visam garantir melhor formação técnica e benefícios para os estudantes.',
  },
];
