// Datas e conteúdo centrais do projeto.
// Ajustar quando trocar textos ou datas — os componentes leem tudo daqui.

export const dates = {
  aniversarioLeticia: '2026-11-04',
  nosConhecemos: '2025-10-25', // Festa de Halloween
  primeiroEncontro: '2025-11-01',
  primeiroBeijo: '2025-11-01',
};

export const milestones = [
  {
    id: 'conhecemos',
    tag: 'Halloween, 25 de outubro',
    title: 'O dia em que nos conhecemos',
    text: 'Uma festa de Halloween qualquer, até eu ter descoberto que a garota de rosa gostava de mim.',
    stamp: '25/10',
  },
  {
    id: 'encontro',
    tag: 'Shopping Leblon',
    title: 'Nosso primeiro encontro',
    text: 'Cinema no Shopping Leblon, Koni depois e uma garrafa de vinho. Não sei como essa combinação deu certo',
    stamp: '01/11',
  },
  {
    id: 'beijo',
    tag: 'Estação Jardim de Alah',
    title: 'Nosso primeiro beijo',
    text: 'Você acabou vencendo aquela aposta, aff.',
    stamp: '01/11',
  },
];

export const rooms = [
  {
    id: 'cartas',
    icon: 'Mail',
    label: 'Cartinhas & Textos',
    title: 'As cartas que escrevi',
    text: 'Declarações, textos espontâneos e reflexões — a evolução do que acabei sentindo por você',
    accent: 'peach',
  },
  {
    id: 'mapa',
    icon: 'MapPin',
    label: 'Nosso Mapa',
    title: 'Os lugares que viraram nossos',
    text: 'Jardim de Alah, Koni, a praia de São Conrado. Lugares comuns que se tornaram especiais por termos vivido boas memórias.',
    accent: 'lavender',
  },
  {
    id: 'scrapbook',
    icon: 'Image',
    label: 'Scrapbook',
    title: 'Um álbum vivo de memórias',
    text: 'Cada foto conta uma história — não apenas mostra um momento, mas lembra o que sentimos nele.',
    accent: 'blush',
  },
  {
    id: 'trilha',
    icon: 'Music',
    label: 'Nossa Trilha Sonora',
    title: 'As músicas que já toquei para você',
    text: 'Os covers que gravei pra você e músicas que já toquei pessoalmente.',
    accent: 'lavender',
  },
  {
    id: 'linha-do-tempo',
    icon: 'Clock',
    label: 'Linha do Tempo',
    title: 'Tudo, em ordem, de novo',
    text: 'Mês a mês, a evolução completa do que construímos.',
    accent: 'peach',
  },
  {
    id: 'futuro',
    icon: 'Gift',
    label: 'Futuro Juntos',
    title: 'Meu momento favorito ainda não aconteceu',
    text: 'Tudo que ainda vamos construir juntos.',
    accent: 'blush',
    featured: true,
  },
];

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/cartas', label: 'Cartinhas' },
  { to: '/mapa', label: 'Nosso Mapa' },
  { to: '/scrapbook', label: 'Scrapbook' },
  { to: '/trilha', label: 'Trilha Sonora' },
  { to: '/linha-do-tempo', label: 'Linha do Tempo' },
];
