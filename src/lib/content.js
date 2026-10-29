// Datas e conteúdo centrais do projeto.
// Ajuste aqui quando quiser trocar textos ou datas — os componentes leem tudo daqui.

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
    text: 'Uma festa de Halloween qualquer, até você aparecer. O verdadeiro ponto de partida de tudo o que viria depois.',
    stamp: '25/10',
  },
  {
    id: 'encontro',
    tag: 'Jardim de Alah · Leblon',
    title: 'Nosso primeiro encontro',
    text: 'Cinema no Shopping Leblon, Koni depois e uma garrafa de vinho que, sem querer, virou símbolo daquele dia.',
    stamp: '01/11',
  },
  {
    id: 'beijo',
    tag: 'Estação Jardim de Alah',
    title: 'Nosso primeiro beijo',
    text: 'Toda a expectativa do encontro deu lugar a uma certeza silenciosa. O marco simbólico da nossa história.',
    stamp: '01/11',
  },
];

export const rooms = [
  {
    id: 'cartas',
    icon: 'Mail',
    label: 'Cartinhas & Textos',
    title: 'As cartas que escrevemos',
    text: 'Declarações, textos espontâneos e reflexões — a evolução do que sentimos, guardada em palavras.',
    accent: 'peach',
  },
  {
    id: 'mapa',
    icon: 'MapPin',
    label: 'Nosso Mapa',
    title: 'Os lugares que viramos nossos',
    text: 'Jardim de Alah, Koni, a praia, os cafés. Lugares comuns que se tornaram especiais por termos vivido neles.',
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
    title: 'As músicas da nossa história',
    text: 'A do primeiro encontro, as de viagem, os covers que gravei pra você. Uma máquina do tempo emocional.',
    accent: 'lavender',
  },
  {
    id: 'linha-do-tempo',
    icon: 'Clock',
    label: 'Linha do Tempo',
    title: 'Tudo, em ordem, de novo',
    text: 'Mês a mês, a evolução completa do que construímos — pra reviver sempre que quiser.',
    accent: 'peach',
  },
  {
    id: 'futuro',
    icon: 'Gift',
    label: 'Futuro Juntos',
    title: 'Meu momento favorito ainda não aconteceu',
    text: 'Uma carta pra abrir daqui a um ano, sonhos, planos e tudo que ainda vamos construir juntos.',
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
