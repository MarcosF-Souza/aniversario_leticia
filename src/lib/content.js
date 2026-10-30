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

// Pontos do mapa (página "Nosso Mapa"). Para adicionar um lugar, copie um item e preencha:
//   id    -> texto único, sem espaços (ex.: 'koni')
//   name  -> nome do lugar
//   tag   -> (opcional) rótulo curto, ex.: 'Primeiro encontro'
//   date  -> (opcional) 'AAAA-MM-DD'
//   lat/lng -> coordenadas. No Google Maps: clique com o botão direito no local e copie os números.
//              Em `npm run dev`, clicar no mapa também mostra as coordenadas do ponto.
//   text  -> o que aconteceu ali
// Os textos abaixo vêm do que já está no projeto — troque pelos seus.
export const places = [
  {
    id: 'jardim-de-alah',
    name: 'Estação Jardim de Alah',
    tag: 'Primeiro beijo',
    date: '2025-11-01',
    lat: -22.983637,
    lng: -43.216350,
    text: 'Você acabou vencendo aquela aposta, aff.',
  },
  {
    id: 'shopping-leblon',
    name: 'Shopping Leblon',
    tag: 'Primeiro encontro',
    date: '2025-11-01',
    lat: -22.982310, 
    lng: -43.216621,
    text: 'O cinema do nosso primeiro encontro.',
  },
  {
    id: 'koni',
    name: 'Koni do Leblon',
    tag: 'Primeiro encontro',
    date: '2025-11-01',
    lat: -22.983667, 
    lng: -43.219247,
    text: 'Depois do cinema, o Koni.',
  },
  {
    id: 'praia-sao-conrado',
    name: 'Praia de São Conrado',
    tag: 'Conversas na praia',
    lat: -22.999195, 
    lng: -43.259354,
    text: 'Primeiros presentes feitos a mão e onde passamos a maior parte do tempo conversando.',
  },
  {
    id: 'meu-condominio',
    name: 'Meu condomínio',
    tag: 'Idas no cinema e jogando sinuca',
    lat: -22.928408, 
    lng: -43.376362,
    text: 'Onde jogamos várias vezes sinuca e ficamos sentados jogando conversa fora.(E outras coisas que não posso falar)',
  },
  {
    id: 'meu-aniversario',
    name: 'Cidade das Artes',
    tag: 'Orquestra Sinfônica',
    date: '2026-05-13',
    lat:  -22.999120, 
    lng: -43.365784,
    text: 'Orquestra Sinfônica do Metallica que fomos para comemorar o meu aniversário de 20 anos.',
  },  
  {
    id: 'downtown',
    name: 'Shopping Downtown',
    tag: 'Downtown',
    lat:  -23.002927, 
    lng: -43.317171,
    text: 'Idas ao cinema e passeios ao ar livre.',
  },
  {
    id: 'barra-shopping',
    name: 'Barra Shopping',
    tag: 'Cinema e Na Colônia Trattoria',
    lat:  -22.998778, 
    lng: -43.360451,
    text: 'Idas ao cinema e aquele restaurante italiano que fomos no meu aniversário.',
  },
  {
    id: 'jardim-oceanico',
    name: 'Jardim Oceânico',
    tag: 'Onde sempre te deixo',
    lat:  -23.006689, 
    lng: -43.312676,
    text: 'Onde sempre te deixo para você poder voltar para casa com segurança.',
  },   
  {
    id: 'via-parque',
    name: 'Via Parque Shopping',
    tag: 'Evento de anime',
    lat:  -22.982765, 
    lng: -43.362844,
    text: 'Quando fomos naquele evento de anime com a Brenda.',
  },
  {
    id: 'shopping-metropolitano',
    name: 'Shopping Metropolitano',
    tag: 'Filme do homem-aranha',
    lat: -22.970793, 
    lng: -43.372296,
    text: 'Dia em que fomos ver o filme do homem aranha com as teias que você fez de crochê.',
  },
  {
    id: 'trabalho-leticia',
    name: 'Trabalho da Letícia',
    tag: 'Já te busquei várias vezes',
    lat: -22.954472, 
    lng: -43.184898,
    text: 'Onde já te busquei várias vezes, até mesmo com flores.',
  },  
  {
    id: 'museu-da-republica',
    name: 'Museu da República',
    tag: 'Onde te pedi em namoro',
    date: '2026-02-07',
    lat: -22.925878, 
    lng: -43.176039,
    text: 'Lugar no qual te pedi em namoro, tremendo e suando bastante, mesmo assim consegui.',
  },
  {
    id: 'zui-sushi',
    name: 'Zui Sushi',
    tag: 'Rodízio de sushi',
    lat: -22.956395, 
    lng: -43.186046,
    text: 'Comemorando meu 1º salário e onde vamos comemorar seu aniversário.',
  },
];