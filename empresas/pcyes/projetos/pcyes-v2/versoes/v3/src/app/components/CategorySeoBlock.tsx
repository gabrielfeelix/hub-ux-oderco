import { useState } from "react";
import { ChevronDown } from "lucide-react";

type SeoEntry = { title: string; paragraphs: string[] };

const ALIASES: Record<string, string> = {
  "Teclado": "Teclados",
  "Mouse": "Mouses",
  "Headset": "Headsets",
  "Fone de Ouvido": "Headsets",
};

const SEO: Record<string, SeoEntry> = {
  default: {
    title: "Sobre os Produtos PCYES",
    paragraphs: [
      "A PCYES desenvolve hardware e periféricos pensados para quem leva o gaming a sério. Aqui você encontra a linha completa de componentes, acessórios e setups montados para alta performance, com garantia oficial, suporte técnico nacional e envio para todo o Brasil.",
      "Cada produto passa por controle de qualidade rigoroso e segue os padrões de durabilidade que fizeram a marca referência no mercado brasileiro de PC gamer — do entusiasta que monta sua primeira build ao competitivo que busca milisegundos de vantagem.",
    ],
  },
  "Periféricos": {
    title: "Sobre Periféricos Gamer PCYES",
    paragraphs: [
      "Nossa linha de periféricos reúne teclados mecânicos, mouses com sensores de alta precisão, headsets imersivos e mouse pads projetados para gaming competitivo. Iluminação RGB personalizável, switches de alta performance e design ergonômico para longas sessões.",
      "Todos os modelos contam com software dedicado para customização de macros, perfis de iluminação e mapeamento de teclas — pensados para entregar vantagem real em cada partida e refletir a identidade do seu setup.",
    ],
  },
  "Teclados": {
    title: "Sobre Teclados Gamer PCYES",
    paragraphs: [
      "Explore nossa linha completa de teclados mecânicos e de membrana, projetados para oferecer precisão e durabilidade em cada clique. Nossos periféricos contam com iluminação RGB personalizável, switches de alta performance e design ergonômico para longas sessões de jogo.",
      "Encontre o modelo ideal para seu setup — do compacto TKL ao full-size — com layouts ABNT2, anti-ghosting completo, N-key rollover e construção em alumínio escovado nos modelos premium.",
    ],
  },
  "Mouses": {
    title: "Sobre Mouses Gamer PCYES",
    paragraphs: [
      "Mouses gamer com sensores ópticos de alta precisão, taxa de polling configurável e botões programáveis para qualquer estilo de jogo — do FPS competitivo ao MMO. Construção leve, glide com pés de PTFE puro e cabo paracord nos modelos com fio.",
      "Linha completa com versões wireless de baixíssima latência, ultraleves e modelos ambidestros, todos com software de personalização e suporte a múltiplos perfis de DPI.",
    ],
  },
  "Headsets": {
    title: "Sobre Headsets Gamer PCYES",
    paragraphs: [
      "Headsets gamer com áudio espacial, microfone com cancelamento de ruído e conforto para sessões prolongadas. Drivers de neodímio entregam resposta de graves precisa e definição clara nos médios — essencial para localizar inimigos em jogos competitivos.",
      "Modelos com e sem fio compatíveis com PC, PS5, Xbox e Switch, com acolchoado em memory foam e estrutura ajustável para uso prolongado sem fadiga.",
    ],
  },
  "Refrigeração": {
    title: "Sobre Refrigeração PCYES",
    paragraphs: [
      "Soluções térmicas para manter seu PC operando no pico de performance: water coolers AIO, air coolers, fans com PWM e pastas térmicas de alta condutividade. Compatibilidade ampla com sockets Intel e AMD modernos.",
      "Nossa linha inclui radiadores de 120 a 360 mm, bombas silenciosas e iluminação ARGB sincronizável — refrigeração que protege o hardware e valoriza visualmente o setup.",
    ],
  },
  "Computadores": {
    title: "Sobre Computadores PCYES",
    paragraphs: [
      "PCs gamer e mini PCs montados com componentes selecionados, prontos para rodar os títulos atuais em alta performance. Cada configuração passa por teste de estabilidade e burn-in antes do envio.",
      "Opções para todos os perfis — do entrada acessível ao high-end com placa dedicada, refrigeração líquida e gabinete com vidro temperado — sempre com garantia de fábrica e suporte técnico PCYES.",
    ],
  },
  "Hardware": {
    title: "Sobre Hardware PCYES",
    paragraphs: [
      "Memórias RAM DDR4 e DDR5, placas-mãe e demais componentes para montar ou atualizar seu PC. Linha desenvolvida com chipsets de qualidade e dissipadores que garantem operação estável mesmo sob carga prolongada.",
      "Modelos com overclock de fábrica, perfis XMP/EXPO e iluminação RGB para integração total com o ecossistema PCYES — base sólida para qualquer build moderna.",
    ],
  },
  "Fontes": {
    title: "Sobre Fontes PCYES",
    paragraphs: [
      "Fontes ATX com certificação 80 Plus, proteções OVP/UVP/OCP/SCP e cabos sleeved para acabamento limpo no setup. Potências de 500 W a 1000 W+, atendendo desde builds de entrada até estações com GPU topo de linha.",
      "Modelos modulares e semi-modulares com ventoinha silenciosa e garantia estendida — o coração elétrico do seu PC com a confiabilidade PCYES.",
    ],
  },
  "SSD e HD": {
    title: "Sobre SSDs e HDs PCYES",
    paragraphs: [
      "Armazenamento rápido e confiável: SSDs NVMe com leitura acima de 3.500 MB/s, SSDs SATA para upgrade de notebooks e HDs de alta capacidade para arquivo. Toda a linha com TBW estendido e firmware otimizado.",
      "Ideal para reduzir tempo de carregamento em jogos, acelerar boot do sistema e ampliar a biblioteca sem comprometer performance.",
    ],
  },
  "Streaming": {
    title: "Sobre Equipamentos de Streaming PCYES",
    paragraphs: [
      "Microfones condensadores, placas de captura e acessórios para criadores de conteúdo. Equipamento profissional com plug-and-play e qualidade broadcast para lives, podcasts e gravações.",
      "Compatível com OBS, Streamlabs e principais plataformas — pronto para entregar áudio cristalino e vídeo em 1080p/4K sem latência perceptível.",
    ],
  },
  "Monitores": {
    title: "Sobre Monitores Gamer PCYES",
    paragraphs: [
      "Monitores gamer com altas taxas de atualização (144 Hz, 165 Hz, 240 Hz), tempo de resposta de 1 ms e tecnologias adaptativas como FreeSync. Painéis IPS, VA e curvos para imersão total.",
      "Resoluções de Full HD a 4K, com ampla cobertura sRGB e suporte a HDR — visão competitiva e fidelidade cromática no mesmo painel.",
    ],
  },
  "Placas de Vídeo": {
    title: "Sobre Placas de Vídeo PCYES",
    paragraphs: [
      "GPUs NVIDIA e AMD para gaming em alta resolução, criação de conteúdo e cargas de IA. Versões com refrigeração dupla ou tripla, backplate reforçada e boost clock de fábrica para máxima performance.",
      "Estoque com modelos da geração atual e anterior, prontos para entrega — escolha a placa certa para 1080p, 1440p ou 4K com a tranquilidade do suporte PCYES.",
    ],
  },
  "Gabinetes": {
    title: "Sobre Gabinetes Gamer PCYES",
    paragraphs: [
      "Gabinetes com painel lateral em vidro temperado, airflow otimizado e suporte para water coolers de até 360 mm. Espaço interno generoso para builds modernas, com gerenciamento de cabos completo.",
      "Modelos mid-tower e full-tower, com fans ARGB inclusos em várias versões — visual premium e fluxo de ar pensado para overclock estável.",
    ],
  },
  "Cadeiras": {
    title: "Sobre Cadeiras Gamer PCYES",
    paragraphs: [
      "Cadeiras gamer e ergonômicas com encosto reclinável, apoio lombar ajustável e estofado em material premium. Estrutura em metal reforçado, base estrela em nylon resistente e rodízios silenciosos.",
      "Opções para diferentes biotipos e estilos — do design esportivo ao office discreto — todas com apoio de braço 4D e altura regulável para ergonomia em longas jornadas.",
    ],
  },
};

function resolveContent(category: string, subcategory: string, featured: string): SeoEntry {
  const keys = [subcategory, featured, category].filter(Boolean);
  for (const raw of keys) {
    const key = ALIASES[raw] ?? raw;
    if (SEO[key]) return SEO[key];
  }
  return SEO.default;
}

export function CategorySeoBlock({
  categoryLabel,
  subcategoryLabel,
  featuredLabel,
}: {
  categoryLabel: string;
  subcategoryLabel: string;
  featuredLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const content = resolveContent(categoryLabel, subcategoryLabel, featuredLabel);
  const hasMore = content.paragraphs.length > 1;

  return (
    <section
      className="mt-12 md:mt-16 mb-4"
      aria-labelledby="category-seo-title"
    >
      <div
        className="rounded-2xl border p-6 md:p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,59,62,0.05) 0%, rgba(255,255,255,0.02) 60%)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <h2
          id="category-seo-title"
          className="mb-4"
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: "clamp(18px, 2.2vw, 24px)",
            fontWeight: 700,
            color: "#ff3b3e",
            letterSpacing: "-0.015em",
            lineHeight: 1.2,
          }}
        >
          {content.title}
        </h2>

        <div className="space-y-4">
          {content.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0 ? "" : expanded ? "" : "hidden md:block"
              }
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "clamp(13px, 1.4vw, 15px)",
                lineHeight: 1.65,
                color: "rgba(var(--foreground-rgb), 0.72)",
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-4 md:hidden inline-flex items-center gap-2 min-h-[44px] hover:underline transition-colors"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "13px",
              fontWeight: 700,
              color: "#ff3b3e",
              letterSpacing: "0.02em",
            }}
            aria-expanded={expanded}
          >
            {expanded ? "Ler menos" : "Ler mais"}
            <ChevronDown
              size={14}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
    </section>
  );
}
