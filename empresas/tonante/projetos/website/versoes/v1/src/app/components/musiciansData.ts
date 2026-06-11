// musiciansData — Músicos Tonante (V3 §4.4).
// ⚠️ PLACEHOLDER: nomes, fotos, vídeos e depoimentos são fictícios/banco de
// imagem, apenas para demonstração de layout. Trocar pelo elenco real
// (assets Oderço) antes de qualquer publicação.
export interface Musician {
  id: string;
  name: string;
  city?: string;
  role: string;
  /** retrato 3:4 — tratado P&B via CSS no card */
  photo: string;
  /** mp4 vertical 9:16; ausente → modal mostra a foto grande */
  video?: string;
  quote: string;
  instagram?: string;
  /** instrumento que usa → lookup em productsData */
  productId?: number;
  /** fallback de texto quando productId não resolve */
  instrumentLabel: string;
}

const u = (id: string) => `https://images.unsplash.com/${id}?w=720&q=80&auto=format&fit=crop`;
// Vídeos de amostra (paisagem, cropados pelo player 9:16) — só pra demo.
const SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const SAMPLE_VIDEO_2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";

export const MUSICIANS: Musician[] = [
  {
    id: "rafael-monteiro",
    name: "Rafael Monteiro",
    city: "São Paulo · SP",
    role: "Violonista",
    photo: u("photo-1510915361894-db8b60106cb1"),
    video: SAMPLE_VIDEO,
    quote:
      "Meu primeiro violão foi um Tonante emprestado do meu tio. Vinte anos depois, subo no palco com um Coral — fechou um ciclo.",
    instagram: "@rafamonteiro.violao",
    productId: 52,
    instrumentLabel: "Violão Coral",
  },
  {
    id: "luiza-ferraz",
    name: "Luiza Ferraz",
    city: "Belo Horizonte · MG",
    role: "Guitarrista",
    photo: u("photo-1516924962500-2b4b3b99ea02"),
    video: SAMPLE_VIDEO_2,
    quote:
      "A Valentine's tem o timbre que eu procurei em guitarra importada e não achei. E ainda conta uma história que é nossa.",
    instagram: "@luizaferraz.gtr",
    productId: 13,
    instrumentLabel: "Guitarra Valentine's",
  },
  {
    id: "andre-batista",
    name: "André Batista",
    city: "Curitiba · PR",
    role: "Baixista",
    photo: u("photo-1549213783-8284d0336c4f"),
    quote:
      "Groove pede consistência. O Jazzmine aguenta ensaio, bar e estrada — e o braço não empena, como manda a tradição.",
    instagram: "@andrebatista.baixo",
    productId: 19,
    instrumentLabel: "Contrabaixo Jazzmine",
  },
  {
    id: "camila-rocha",
    name: "Camila Rocha",
    city: "Recife · PE",
    role: "Professora de violão",
    photo: u("photo-1525201548942-d8732f6617a0"),
    video: SAMPLE_VIDEO,
    quote:
      "Todo semestre vejo alunos começarem num Lorenzzo. O nylon macio segura o aluno nos três primeiros meses — o resto é história.",
    instagram: "@camilarocha.aulas",
    productId: 25,
    instrumentLabel: "Violão Lorenzzo",
  },
  {
    id: "diego-santana",
    name: "Diego Santana",
    city: "Rio de Janeiro · RJ",
    role: "Guitarrista de estúdio",
    photo: u("photo-1471478331149-c72f17e33c73"),
    quote:
      "A Star Light virou minha guitarra de sessão. Vintage no visual, estável na afinação — o engenheiro de som agradece.",
    instagram: "@diegosantana.studio",
    productId: 38,
    instrumentLabel: "Guitarra Star Light",
  },
  {
    id: "marina-lopes",
    name: "Marina Lopes",
    city: "Porto Alegre · RS",
    role: "Cantora e compositora",
    photo: u("photo-1493225457124-a3eb161ffa5f"),
    video: SAMPLE_VIDEO_2,
    quote:
      "Componho no Ônix. O som encorpado preenche a sala sozinho — voz e violão, mais nada. É disso que minha música precisa.",
    instagram: "@marinalopes.mus",
    productId: 62,
    instrumentLabel: "Violão Ônix",
  },
];
