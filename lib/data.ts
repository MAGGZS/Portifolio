/**
 * Fonte única de conteúdo do site.
 * Tudo que é texto, link ou mídia vive aqui — os componentes só desenham.
 */

export const PROFILE = {
  name: "Magdiel Eric",
  role: "Editor de vídeo & motion",
  age: 18,
  yearsEditing: 3,
  since: 2022,
  location: "Brasil — remoto",
  email: "magdielbr13@gmail.com",
  // TODO: troque pelos seus handles reais.
  socials: [
    { label: "Instagram", href: "https://instagram.com/", handle: "@magdiel" },
    { label: "YouTube", href: "https://youtube.com/", handle: "/magdiel" },
    { label: "GitHub", href: "https://github.com/", handle: "/magdiel" },
    { label: "E-mail", href: "mailto:magdielbr13@gmail.com", handle: "magdielbr13@gmail.com" },
  ],
  bio: [
    "Tenho 18 anos e edito vídeo há 3. Comecei em 2022 cortando conteúdo para canais pequenos do YouTube, peguei ritmo em 2024 e segui afiando a mão em 2025.",
    "Desde criança gosto de criar coisas — desenhando, gravando, montando. Hoje isso virou timeline: corte, ritmo, som e motion. Também desenvolvo páginas animadas como freelancer, então entrego a peça e o lugar onde ela vive.",
  ],
};

export type Reel = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  /** Coloque aqui o mp4/webm quando enviar os vídeos: "/reels/algo.mp4" */
  src?: string;
  /** Frame de capa: "/reels/algo.jpg" */
  poster?: string;
  /** Gradiente do placeholder enquanto não há mídia. */
  tint: string;
};

/**
 * TODO: substitua `src` e `poster` pelos arquivos reais em /public/reels.
 * Enquanto não houver mídia, o card desenha um placeholder de gradiente + grão.
 */
export const REELS: Reel[] = [
  {
    id: "r1",
    title: "Cortes de alta retenção",
    client: "Canal YouTube",
    category: "YouTube",
    year: "2025",
    duration: "00:42",
    tint: "linear-gradient(140deg, #7a0c12 0%, #14141a 70%)",
  },
  {
    id: "r2",
    title: "Abertura em motion",
    client: "Projeto pessoal",
    category: "Motion",
    year: "2025",
    duration: "00:18",
    tint: "linear-gradient(140deg, #1c1c1f 0%, #a5121a 120%)",
  },
  {
    id: "r3",
    title: "Edição narrativa",
    client: "Documental",
    category: "Narrativa",
    year: "2024",
    duration: "01:25",
    tint: "linear-gradient(200deg, #a5121a 0%, #050505 75%)",
  },
  {
    id: "r4",
    title: "Reels verticais",
    client: "Social",
    category: "Vertical",
    year: "2024",
    duration: "00:29",
    tint: "linear-gradient(160deg, #141416 0%, #7a0c12 110%)",
  },
  {
    id: "r5",
    title: "Color grade cinematográfico",
    client: "DaVinci",
    category: "Color",
    year: "2025",
    duration: "00:51",
    tint: "linear-gradient(120deg, #d11f27 -20%, #0f0f11 70%)",
  },
  {
    id: "r6",
    title: "Gameplay no beat",
    client: "Gaming",
    category: "Gaming",
    year: "2023",
    duration: "00:36",
    tint: "linear-gradient(180deg, #0a0a0b 0%, #7a0c12 130%)",
  },
];

export const SOFTWARE = [
  { name: "Premiere Pro", short: "Pr", level: 92, note: "Corte, ritmo, multicam, finalização" },
  { name: "After Effects", short: "Ae", level: 85, note: "Motion, tracking, composição, lower thirds" },
  { name: "DaVinci Resolve", short: "Dv", level: 80, note: "Color grade, node tree, delivery" },
  { name: "Photoshop", short: "Ps", level: 70, note: "Thumbnail, key art, retoque de frame" },
  { name: "Audition", short: "Au", level: 65, note: "Limpeza de áudio, mixagem, loudness" },
  { name: "Next.js / React", short: "Nx", level: 75, note: "Páginas animadas como freelancer" },
];

export const STATS = [
  { value: 3, suffix: "+", label: "anos editando" },
  { value: 2022, suffix: "", label: "onde começou", raw: true },
  { value: 180, suffix: "+", label: "vídeos entregues" },
  { value: 24, suffix: "h", label: "resposta média" },
];

export const TIMELINE = [
  {
    year: "2022",
    title: "Primeiro corte",
    text: "Comecei editando para canais pequenos do YouTube. Aprendi o básico na marra: corte seco, respiro, áudio no lugar certo.",
  },
  {
    year: "2023",
    title: "Ritmo e motion",
    text: "Entrei no After Effects. Passei a pensar em tempo, não só em clipes — keyframe, easing, sincronia com o som.",
  },
  {
    year: "2024",
    title: "Ritmo de produção",
    text: "Ano de volume: entregas consistentes, fluxo organizado, color grade no DaVinci e identidade própria nos cortes.",
  },
  {
    year: "2025",
    title: "Editor + dev",
    text: "Sigo editando e comecei a construir páginas animadas como freelancer. A mesma cabeça de timeline, agora em código.",
  },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  href: string;
  status: "ativo" | "arquivado" | "em progresso";
};

/**
 * TODO: aponte `href` para os repositórios reais e ajuste nomes/descrições.
 * Aqui ficam os projetos de código ligados a edição de vídeo.
 */
export const PROJECTS: Project[] = [
  {
    name: "reel-cutter",
    description:
      "Script que fatia gravações longas em cortes verticais prontos para Shorts e Reels, com detecção de silêncio.",
    tags: ["Python", "FFmpeg", "Automação"],
    href: "https://github.com/",
    status: "ativo",
  },
  {
    name: "ae-preset-pack",
    description:
      "Coleção de presets e expressões de After Effects que uso no dia a dia: lower thirds, shake, transições de máscara.",
    tags: ["After Effects", "Expressions", "Motion"],
    href: "https://github.com/",
    status: "ativo",
  },
  {
    name: "lut-lab",
    description:
      "LUTs e node trees de DaVinci Resolve com os looks que aplico em material de câmera e de gameplay.",
    tags: ["DaVinci", "Color", "cube"],
    href: "https://github.com/",
    status: "em progresso",
  },
  {
    name: "beat-sync",
    description:
      "Ferramenta que lê o áudio, extrai o BPM e gera marcadores para alinhar cortes ao beat dentro do Premiere.",
    tags: ["Node.js", "Áudio", "Premiere"],
    href: "https://github.com/",
    status: "em progresso",
  },
  {
    name: "thumb-forge",
    description:
      "Gerador de variações de thumbnail a partir de frames do próprio vídeo, para testar retenção de clique.",
    tags: ["React", "Canvas", "YouTube"],
    href: "https://github.com/",
    status: "arquivado",
  },
  {
    name: "portfolio-motion",
    description:
      "Este site. Next.js, React e animações escritas à mão com a mesma lógica de keyframe do After Effects.",
    tags: ["Next.js", "Motion", "CSS"],
    href: "https://github.com/",
    status: "ativo",
  },
];

export const SERVICES = [
  {
    index: "01",
    title: "Edição para YouTube",
    text: "Corte de alta retenção, ritmo pensado desde o primeiro segundo, legendas, b-roll e sonoplastia.",
    items: ["Cortes longos", "Shorts / Reels", "Legendas", "Sound design"],
  },
  {
    index: "02",
    title: "Motion design",
    text: "Aberturas, lower thirds, transições de máscara e animação de logo feitas no After Effects.",
    items: ["Intro / outro", "Lower thirds", "Logo animado", "Kinetic type"],
  },
  {
    index: "03",
    title: "Color grade",
    text: "Tratamento de cor no DaVinci: balanço, look, consistência entre cenas e entrega no formato certo.",
    items: ["Balanço", "Look / LUT", "Match de cenas", "Delivery"],
  },
  {
    index: "04",
    title: "Páginas animadas",
    text: "Landing pages em Next.js com a mesma atenção a timing, easing e detalhe que coloco na timeline.",
    items: ["Next.js", "Animação", "Responsivo", "Deploy"],
  },
];

export const PROCESS = [
  { step: "01", title: "Briefing", text: "Entendo referência, público e prazo. Sem isso, edição vira chute." },
  { step: "02", title: "Decupagem", text: "Assisto tudo, marco os melhores takes e monto a espinha da narrativa." },
  { step: "03", title: "Corte", text: "Ritmo, respiro e sincronia. É aqui que o vídeo ganha ou perde o espectador." },
  { step: "04", title: "Acabamento", text: "Motion, color, mixagem e revisão. Duas rodadas de ajuste inclusas." },
];

export const TESTIMONIALS = [
  {
    quote: "Entregou antes do prazo e o ritmo do corte segurou a retenção bem acima da média do canal.",
    author: "Cliente — canal de gaming",
    role: "YouTube, 2024",
  },
  {
    quote: "Pedi uma abertura simples e voltou com um motion que virou a identidade do projeto inteiro.",
    author: "Cliente — projeto documental",
    role: "Motion, 2025",
  },
  {
    quote: "Comunicação direta e feedback aplicado já na primeira rodada. Trabalho limpo.",
    author: "Cliente — social media",
    role: "Reels, 2025",
  },
];

export const FAQ = [
  {
    q: "Qual o prazo médio de entrega?",
    a: "Vídeo curto (até 5 min): 2 a 3 dias. Vídeo longo ou com motion pesado: 5 a 7 dias. Prazo apertado eu aviso antes de fechar.",
  },
  {
    q: "Quantas rodadas de revisão?",
    a: "Duas rodadas inclusas. Ajuste pontual depois disso eu costumo resolver sem cobrar a mais.",
  },
  {
    q: "Você trabalha com material bruto bagunçado?",
    a: "Sim. Decupagem faz parte do serviço — só peço que o áudio esteja gravado de forma utilizável.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "50% na aprovação do orçamento e 50% na entrega final. Projeto recorrente fecha no mês.",
  },
  {
    q: "Em qual software você edita?",
    a: "Premiere Pro para corte, After Effects para motion e DaVinci Resolve para cor. Entrego no formato que a plataforma pedir.",
  },
];

export const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Reel", href: "#reel" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];
