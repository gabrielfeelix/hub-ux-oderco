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
      "A PCYES fabrica componentes e periféricos gamer com presença consolidada nas principais lojas de tecnologia do Brasil. O catálogo da loja oficial PCYES reúne hardware, refrigeração, fontes, gabinetes, monitores, cadeiras e a linha completa de acessórios para PC gamer.",
      "Todos os produtos PCYES contam com garantia de fábrica, nota fiscal, suporte técnico em português e envio para todo o território nacional. Compre direto da marca PCYES e tenha acesso a estoque atualizado, atendimento pós venda e mercadoria 100% original.",
    ],
  },
  "Periféricos": {
    title: "Sobre Periféricos Gamer PCYES",
    paragraphs: [
      "A linha de periféricos gamer PCYES inclui teclados mecânicos, mouses gamer, headsets, mousepads e acessórios para setup. Os teclados PCYES utilizam switches mecânicos de alta durabilidade, iluminação RGB e layout ABNT2 nacional. Os mouses gamer PCYES contam com sensor óptico de alta precisão, taxa de polling configurável e botões programáveis para FPS, MOBA e MMO.",
      "Todo periférico gamer PCYES sai de fábrica com software de personalização compatível com Windows, permitindo ajuste de macros, perfis de iluminação e mapeamento de teclas. Compre periférico gamer PCYES com garantia oficial de 12 meses, nota fiscal e frete para todo o Brasil.",
    ],
  },
  "Teclados": {
    title: "Sobre Teclados Gamer PCYES",
    paragraphs: [
      "O teclado gamer PCYES combina switches mecânicos, iluminação RGB e layout ABNT2 nacional. A linha de teclados gamer PCYES inclui modelos full size, TKL, 75%, 65% e 60%, em versões com fio e wireless. Cada teclado mecânico PCYES tem keycaps em ABS double shot, anti ghosting completo, N key rollover e cabo destacável USB C nos modelos premium.",
      "O teclado gamer PCYES é compatível com Windows, macOS e Linux, e funciona em PCs gamer, notebooks e setups de streaming. Compre teclado mecânico PCYES na loja oficial, com garantia de 12 meses, suporte técnico em português e envio para todo o Brasil.",
    ],
  },
  "Mouses": {
    title: "Sobre Mouses Gamer PCYES",
    paragraphs: [
      "O mouse gamer PCYES tem sensor óptico de alta precisão, taxa de resposta configurável e botões programáveis para diferentes estilos de jogo. A linha de mouse gamer PCYES inclui modelos com fio, sem fio 2.4 GHz, Bluetooth, ambidestros, ultraleves e versões com peso ajustável.",
      "Cada mouse gamer PCYES acompanha software para configuração de perfis de DPI, ajuste de RGB e gravação de macros. Pés de PTFE, cabo paracord e construção em ABS premium garantem deslize suave e durabilidade. Compre mouse gamer PCYES com garantia oficial e entrega em todo o Brasil.",
    ],
  },
  "Headsets": {
    title: "Sobre Headsets Gamer PCYES",
    paragraphs: [
      "O headset gamer PCYES traz drivers de neodímio, áudio espacial e microfone com cancelamento de ruído para gameplay competitivo. A linha de headset gamer PCYES inclui modelos USB 7.1, P2 estéreo, wireless 2.4 GHz e Bluetooth 5.0, compatíveis com PC gamer, PS5, Xbox Series e Nintendo Switch.",
      "Espuma memory foam, estrutura em metal reforçado e arco ajustável fazem do headset gamer PCYES uma escolha confortável para longas sessões de jogo ou de stream. Compre headset gamer PCYES com garantia oficial, nota fiscal e suporte técnico em português.",
    ],
  },
  "Refrigeração": {
    title: "Sobre Refrigeração PCYES",
    paragraphs: [
      "A linha de refrigeração PCYES reúne water cooler AIO, cooler para processador, fans com PWM, pasta térmica e acessórios para gerenciamento térmico. Cada water cooler PCYES é compatível com soquetes Intel LGA 1700, 1200 e 115x, e AMD AM4, AM5 e TR4, com radiadores de 120 mm, 240 mm e 360 mm.",
      "Os fans PCYES utilizam rolamentos hidrodinâmicos para operação silenciosa e iluminação ARGB sincronizável via Aura Sync, Mystic Light e RGB Fusion. A refrigeração PCYES atende desde builds de entrada até estações de overclock high end, com garantia oficial e envio para todo o Brasil.",
    ],
  },
  "Computadores": {
    title: "Sobre Computadores PCYES",
    paragraphs: [
      "O PC gamer PCYES já vem montado, com cabeamento organizado e teste de estabilidade antes do envio. A linha de computadores PCYES inclui PC gamer entrada, intermediário e high end, além de mini PCs para escritório e estação de trabalho. Cada PC gamer PCYES roda títulos atuais em 1080p, 1440p e 4K, com configurações que combinam processadores Intel Core e AMD Ryzen.",
      "Compre PC gamer montado direto da loja oficial PCYES, com garantia de fábrica, nota fiscal e envio para todo o Brasil. Configurações personalizadas disponíveis sob consulta com a equipe técnica.",
    ],
  },
  "Hardware": {
    title: "Sobre Hardware PCYES",
    paragraphs: [
      "A linha de hardware PCYES traz memória RAM DDR4 e DDR5, placa mãe e demais componentes para montagem ou upgrade de PC gamer. As memórias RAM PCYES contam com perfis XMP 3.0 e EXPO, dissipador em alumínio escovado e iluminação RGB compatível com Aura Sync e Mystic Light.",
      "Cada componente da linha de hardware PCYES é testado em fábrica e entregue com garantia oficial. Compre memória RAM PCYES, placa mãe PCYES e acessórios para PC gamer com frete e nota fiscal para todo o Brasil.",
    ],
  },
  "Fontes": {
    title: "Sobre Fontes PCYES",
    paragraphs: [
      "A fonte gamer PCYES atende builds de entrada, intermediárias e high end, com potências de 500 W, 600 W, 750 W, 850 W e 1000 W. Toda fonte PCYES é certificada 80 Plus, com proteções OVP, UVP, OCP, OPP e SCP, garantindo operação estável e segura sob carga máxima.",
      "A linha de fonte PCYES inclui modelos modular, semi modular e cabeada, com ventoinha silenciosa de 120 mm ou 140 mm. Compre fonte de alimentação PCYES com garantia oficial estendida e envio para todo o Brasil.",
    ],
  },
  "SSD e HD": {
    title: "Sobre SSDs e HDs PCYES",
    paragraphs: [
      "O SSD PCYES oferece leitura acima de 3.500 MB/s nos modelos NVMe PCIe 3.0 e 4.0, ideal para reduzir tempo de boot, acelerar carregamento de jogos e ampliar a biblioteca Steam, Epic e Xbox PC. A linha de SSD PCYES inclui versões M.2 NVMe e SATA III 2.5 polegadas, com capacidades de 240 GB, 480 GB, 960 GB, 1 TB e 2 TB.",
      "Cada SSD PCYES tem TBW estendido, firmware otimizado e garantia de 5 anos nos modelos premium. Compre SSD gamer PCYES e HD PCYES com nota fiscal, garantia oficial e envio para todo o Brasil.",
    ],
  },
  "Streaming": {
    title: "Sobre Equipamentos de Streaming PCYES",
    paragraphs: [
      "A linha de equipamentos de streaming PCYES reúne microfone condensador, placa de captura, suporte de microfone e acessórios para criadores de conteúdo. O microfone PCYES funciona em modo plug and play via USB, compatível com OBS Studio, Streamlabs, Discord e principais plataformas de live streaming.",
      "A placa de captura PCYES suporta captura em 1080p 60 fps e 4K 30 fps via HDMI, com baixa latência e compatibilidade com Windows e macOS. Compre equipamento de streaming PCYES com garantia oficial e entrega em todo o Brasil.",
    ],
  },
  "Monitores": {
    title: "Sobre Monitores Gamer PCYES",
    paragraphs: [
      "O monitor gamer PCYES traz alta taxa de atualização (144 Hz, 165 Hz, 240 Hz), tempo de resposta de 1 ms e tecnologia FreeSync para gameplay sem tearing. A linha de monitor gamer PCYES inclui painéis IPS, VA e curvos, em tamanhos de 24, 27, 32 e 34 polegadas ultrawide.",
      "As resoluções vão de Full HD a 4K UHD, com ampla cobertura sRGB e suporte a HDR nos modelos premium. Compre monitor gamer PCYES com garantia oficial, frete para todo o Brasil e suporte técnico em português.",
    ],
  },
  "Placas de Vídeo": {
    title: "Sobre Placas de Vídeo PCYES",
    paragraphs: [
      "A placa de vídeo PCYES atende gaming em 1080p, 1440p e 4K, edição de vídeo e cargas de inteligência artificial. A loja oficial PCYES vende placa de vídeo NVIDIA GeForce RTX e AMD Radeon, em versões com refrigeração dupla ou tripla, backplate em metal e boost clock de fábrica.",
      "Compre placa de vídeo PCYES com garantia oficial, nota fiscal e envio para todo o Brasil. Estoque atualizado das gerações atual e anterior, com modelos de entrada, intermediários e high end para todos os perfis de PC gamer.",
    ],
  },
  "Gabinetes": {
    title: "Sobre Gabinetes Gamer PCYES",
    paragraphs: [
      "O gabinete gamer PCYES traz painel lateral em vidro temperado, airflow otimizado e suporte para water cooler de até 360 mm. A linha de gabinete gamer PCYES inclui formatos mid tower e full tower, com compatibilidade ATX, micro ATX e mini ITX.",
      "Cada gabinete gamer PCYES tem espaço para placa de vídeo de até 400 mm, gerenciamento de cabos completo e fans ARGB inclusos em vários modelos. Compre gabinete gamer PCYES com garantia oficial e envio para todo o Brasil.",
    ],
  },
  "Cadeiras": {
    title: "Sobre Cadeiras Gamer PCYES",
    paragraphs: [
      "A cadeira gamer PCYES tem encosto reclinável até 180 graus, apoio lombar ajustável e apoio de braço 4D para conforto em longas jornadas. A linha de cadeira gamer PCYES inclui modelos esportivos, cadeira office, cadeira ergonômica e versões com revestimento em couro sintético ou tecido respirável.",
      "Estrutura em aço, pistão a gás classe 4 e base estrela em nylon reforçada fazem da cadeira gamer PCYES uma escolha durável para uso diário. Compre cadeira gamer PCYES com garantia oficial, montagem fácil e entrega em todo o Brasil.",
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
