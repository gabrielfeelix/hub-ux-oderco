import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Cpu,
  Expand,
  HardDrive,
  Monitor,
  Save,
  Settings,
  Share2,
  ShoppingCart,
  Sparkles,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { allProducts } from "../components/productsData";
import { useCart } from "../components/CartContext";
import { Button } from "../components/ui/button";
import { cn } from "../components/ui/utils";

const LOGO_URL =
  "https://pcyes-cdn.oderco.com.br/Logotipos/PCYES/Simbolo-Logo-Horiz-Vermelho.png";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

type VisualKind =
  | "cpu"
  | "motherboard"
  | "ram"
  | "gpu"
  | "cooling"
  | "storage"
  | "case"
  | "psu"
  | "peripheral";

type Option = {
  id: string;
  name: string;
  price: number;
  image?: string;
  gallery?: string[];
  summary?: string;
  highlights?: string[];
  type?: string;
  standard?: boolean;
  req?: string[];
};

type Category = {
  id: string;
  title: string;
  icon: React.ReactNode;
  options: Option[];
};

const CONFIG_STORAGE_KEY = "pcyes-monte-seu-pc-config";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const escapeSvgText = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const buildComponentVisual = ({
  title,
  subtitle,
  accent,
  kind,
}: {
  title: string;
  subtitle: string;
  accent: string;
  kind: VisualKind;
}) => {
  const safeTitle = escapeSvgText(title);
  const safeSubtitle = escapeSvgText(subtitle);

  let illustration = "";

  switch (kind) {
    case "cpu":
      illustration = `
        <rect x="390" y="170" width="420" height="420" rx="48" fill="#0B0F18" stroke="${accent}" stroke-width="16"/>
        <rect x="470" y="250" width="260" height="260" rx="30" fill="url(#accentGlow)" stroke="rgba(255,255,255,0.24)" stroke-width="8"/>
        <rect x="520" y="300" width="160" height="160" rx="22" fill="#05070B" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
        ${Array.from({ length: 10 })
          .map((_, index) => `<rect x="${348 + index * 50}" y="128" width="18" height="56" rx="8" fill="${accent}" opacity="0.85"/>`)
          .join("")}
        ${Array.from({ length: 10 })
          .map((_, index) => `<rect x="${348 + index * 50}" y="576" width="18" height="56" rx="8" fill="${accent}" opacity="0.85"/>`)
          .join("")}
      `;
      break;
    case "motherboard":
      illustration = `
        <rect x="320" y="150" width="560" height="470" rx="42" fill="#090B10" stroke="${accent}" stroke-width="14"/>
        <rect x="390" y="220" width="220" height="220" rx="26" fill="#0F1520" stroke="rgba(255,255,255,0.15)" stroke-width="8"/>
        <rect x="650" y="220" width="140" height="36" rx="12" fill="${accent}" opacity="0.85"/>
        <rect x="650" y="282" width="160" height="28" rx="10" fill="rgba(255,255,255,0.12)"/>
        <rect x="650" y="330" width="120" height="28" rx="10" fill="rgba(255,255,255,0.12)"/>
        <rect x="650" y="378" width="180" height="28" rx="10" fill="rgba(255,255,255,0.12)"/>
        <rect x="370" y="472" width="460" height="56" rx="20" fill="#111722" stroke="rgba(255,255,255,0.14)" stroke-width="6"/>
        <circle cx="770" cy="520" r="28" fill="${accent}" opacity="0.92"/>
      `;
      break;
    case "ram":
      illustration = `
        <rect x="220" y="338" width="760" height="170" rx="34" fill="#0A0F18" stroke="${accent}" stroke-width="14"/>
        ${Array.from({ length: 8 })
          .map((_, index) => `<rect x="${286 + index * 78}" y="296" width="42" height="128" rx="16" fill="${accent}" opacity="${0.32 + index * 0.06}"/>`)
          .join("")}
        ${Array.from({ length: 10 })
          .map((_, index) => `<rect x="${272 + index * 66}" y="510" width="16" height="70" rx="8" fill="#C7CFDD" opacity="0.7"/>`)
          .join("")}
      `;
      break;
    case "gpu":
      illustration = `
        <rect x="230" y="298" width="740" height="220" rx="40" fill="#0A0D14" stroke="${accent}" stroke-width="14"/>
        <circle cx="430" cy="408" r="88" fill="#101621" stroke="rgba(255,255,255,0.14)" stroke-width="10"/>
        <circle cx="430" cy="408" r="38" fill="${accent}" opacity="0.92"/>
        <circle cx="720" cy="408" r="88" fill="#101621" stroke="rgba(255,255,255,0.14)" stroke-width="10"/>
        <circle cx="720" cy="408" r="38" fill="${accent}" opacity="0.92"/>
        <rect x="892" y="346" width="42" height="126" rx="16" fill="#DDE3ED" opacity="0.9"/>
      `;
      break;
    case "cooling":
      illustration = `
        <rect x="230" y="250" width="480" height="300" rx="38" fill="#0B1018" stroke="${accent}" stroke-width="14"/>
        <circle cx="380" cy="400" r="90" fill="#111722" stroke="rgba(255,255,255,0.14)" stroke-width="8"/>
        <circle cx="560" cy="400" r="90" fill="#111722" stroke="rgba(255,255,255,0.14)" stroke-width="8"/>
        <circle cx="380" cy="400" r="34" fill="${accent}" opacity="0.92"/>
        <circle cx="560" cy="400" r="34" fill="${accent}" opacity="0.92"/>
        <rect x="760" y="320" width="138" height="138" rx="28" fill="#0B1018" stroke="rgba(255,255,255,0.14)" stroke-width="8"/>
        <path d="M710 400C748 400 748 389 760 389" stroke="${accent}" stroke-width="16" stroke-linecap="round"/>
      `;
      break;
    case "storage":
      illustration = `
        <rect x="220" y="352" width="760" height="124" rx="34" fill="#0B0E15" stroke="${accent}" stroke-width="14"/>
        <circle cx="314" cy="414" r="30" fill="${accent}" opacity="0.95"/>
        <rect x="388" y="382" width="250" height="30" rx="12" fill="rgba(255,255,255,0.15)"/>
        <rect x="388" y="428" width="188" height="24" rx="10" fill="rgba(255,255,255,0.1)"/>
        ${Array.from({ length: 6 })
          .map((_, index) => `<rect x="${726 + index * 32}" y="386" width="18" height="56" rx="8" fill="#DCE4F2" opacity="0.84"/>`)
          .join("")}
      `;
      break;
    case "case":
      illustration = `
        <rect x="430" y="160" width="320" height="540" rx="52" fill="#090C11" stroke="${accent}" stroke-width="14"/>
        <rect x="500" y="230" width="178" height="390" rx="32" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" stroke-width="8"/>
        <rect x="626" y="250" width="18" height="344" rx="9" fill="${accent}" opacity="0.9"/>
        <circle cx="598" cy="650" r="18" fill="#D9E0EB" opacity="0.85"/>
      `;
      break;
    case "psu":
      illustration = `
        <rect x="270" y="288" width="660" height="260" rx="40" fill="#0A0E14" stroke="${accent}" stroke-width="14"/>
        <circle cx="430" cy="418" r="96" fill="#101722" stroke="rgba(255,255,255,0.16)" stroke-width="10"/>
        <circle cx="430" cy="418" r="36" fill="${accent}" opacity="0.94"/>
        ${Array.from({ length: 8 })
          .map((_, index) => `<rect x="${664 + index * 28}" y="342" width="16" height="152" rx="8" fill="#DBE2EE" opacity="0.75"/>`)
          .join("")}
      `;
      break;
    case "peripheral":
      illustration = `
        <rect x="240" y="430" width="520" height="126" rx="28" fill="#0B1018" stroke="${accent}" stroke-width="14"/>
        ${Array.from({ length: 11 })
          .map((_, index) => `<rect x="${284 + index * 40}" y="466" width="24" height="24" rx="6" fill="rgba(255,255,255,${0.18 + (index % 3) * 0.05})"/>`)
          .join("")}
        <path d="M790 382C852 382 904 434 904 496V538H840C797 538 762 503 762 460V410C762 394 774 382 790 382Z" fill="#101722" stroke="${accent}" stroke-width="14"/>
      `;
      break;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" fill="none">
      <defs>
        <linearGradient id="bg" x1="120" y1="80" x2="1080" y2="820" gradientUnits="userSpaceOnUse">
          <stop stop-color="#14171E"/>
          <stop offset="1" stop-color="#07080B"/>
        </linearGradient>
        <radialGradient id="accentGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(600 360) rotate(90) scale(280 280)">
          <stop stop-color="${accent}" stop-opacity="0.34"/>
          <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)"/>
      <circle cx="965" cy="164" r="176" fill="${accent}" fill-opacity="0.12"/>
      <circle cx="250" cy="742" r="220" fill="${accent}" fill-opacity="0.08"/>
      <path d="M0 132H1200" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
      <path d="M0 720H1200" stroke="rgba(255,255,255,0.05)" stroke-width="2"/>
      ${illustration}
      <text x="92" y="120" fill="white" font-family="Arial, sans-serif" font-size="62" font-weight="700">${safeTitle}</text>
      <text x="92" y="176" fill="rgba(255,255,255,0.62)" font-family="Arial, sans-serif" font-size="28" font-weight="400">${safeSubtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const findCatalogProduct = (...needles: string[]) =>
  allProducts.find((product) =>
    needles.every((needle) => product.name.toLowerCase().includes(needle.toLowerCase())),
  );

const cpuImages = {
  intelI5: "https://target.scene7.com/is/image/Target/GUEST_cb002eb7-a18f-41a8-9ca4-da7d187ec009?fmt=png-alpha&wid=1000&hei=1000",
  intelI7: "https://target.scene7.com/is/image/Target/GUEST_3bd1957a-5a46-4a0c-9956-8f52ddd6b783?fmt=png-alpha&wid=1000&hei=1000",
  amdR5: "https://target.scene7.com/is/image/Target/GUEST_ab1cb31e-6374-4b48-88ac-940a79c03dbc?fmt=png-alpha&wid=1000&hei=1000",
  amdR7: "https://target.scene7.com/is/image/Target/GUEST_42af582b-5e8c-42c1-b09a-6a073c63494c?fmt=png-alpha&wid=1000&hei=1000",
};

const motherboardImages = {
  b75: "https://cdn.oderco.com.br/produtos/270409/401F35F0C97D26C2E0630300A8C0FD75",
  h470: "https://cdn.oderco.com.br/produtos/270433/401F35F0C98926C2E0630300A8C0FD75",
  b650: "https://target.scene7.com/is/image/Target/GUEST_78e5082f-9e18-41c4-8d16-f3bf7fcda0c9?fmt=png-alpha&wid=1000&hei=1000",
  b650a: "https://target.scene7.com/is/image/Target/GUEST_cd497457-a7eb-4150-80fa-138e8444ce1e?fmt=png-alpha&wid=1000&hei=1000",
};

const ramImages = {
  ddr4_8: "https://cdn.oderco.com.br/produtos/34162/402EA1867FDB6E2DE0630300A8C0D98B",
  ddr4_32: "https://cdn.oderco.com.br/produtos/34689/4520E92D669EC021E0630300A8C02B6F",
  ddr4_32_front: "https://cdn.oderco.com.br/produtos/34689/4520E92D66A0C021E0630300A8C02B6F",
};

const psuImages = {
  electro550: "https://cdn.oderco.com.br/produtos/28742/4B7EC28153D51D2DE0630300A8C0552F",
  aether850: "https://cdn.oderco.com.br/produtos/244627/3D5C192CB9DE45B0E0630300A8C0C0C1",
  aether1000: "https://cdn.oderco.com.br/produtos/244628/3D5C192CB9E445B0E0630300A8C0C0C1",
};

const getProductsByCategory = (category: string, limit = 5) =>
  allProducts.filter((product) => product.category === category).slice(0, limit);

const getCaseType = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("white")) return "white";
  if (lowerName.includes("rgb") || lowerName.includes("argb")) return "rgb";
  return "black";
};

const toOptionFromProduct = (
  prefix: string,
  product: (typeof allProducts)[number],
  index: number,
  extras: Partial<Option> = {},
): Option => ({
  id: `${prefix}-${index + 1}`,
  name: product.name,
  price: product.priceNum,
  image: product.image,
  gallery: product.images?.length ? product.images : [product.image],
  summary: extras.summary ?? product.description,
  highlights: extras.highlights ?? product.features?.slice(0, 3) ?? product.tags.slice(0, 3),
  standard: extras.standard,
  req: extras.req,
  type: extras.type,
});

const gpuProducts = getProductsByCategory("Placas de Vídeo", 5);
const coolingProducts = getProductsByCategory("Refrigeração", 5);
const storageProducts = getProductsByCategory("SSD e HD", 5);
const caseProducts = getProductsByCategory("Gabinetes", 5);
const peripheralProducts = getProductsByCategory("Periféricos", 5);

const categories: Category[] = [
  {
    id: "cpu",
    title: "Processador",
    icon: <Cpu className="h-4 w-4" />,
    options: [
      {
        id: "cpu-1",
        name: "Intel Core i5-13400F",
        price: 1200,
        standard: true,
        summary: "Imagem real de caixa, boa leitura visual e ótimo ponto de partida para a vitrine do configurador.",
        highlights: ["LGA1700", "10 núcleos", "Até 4.6GHz"],
        image: cpuImages.intelI5,
        gallery: [cpuImages.intelI5],
      },
      {
        id: "cpu-2",
        name: "Intel Core i7-14700K",
        price: 2500,
        summary: "Outra foto real de produto para a etapa ficar mais parecida com um e-commerce montável de verdade.",
        highlights: ["LGA1700", "20 núcleos", "Até 5.6GHz"],
        image: cpuImages.intelI7,
        gallery: [cpuImages.intelI7],
      },
      {
        id: "cpu-3",
        name: "AMD Ryzen 5 7600",
        price: 1400,
        summary: "Caixa real do Ryzen para validar como a direita se comporta com fotos de marca conhecidas.",
        highlights: ["AM5", "6 núcleos", "Até 5.1GHz"],
        image: cpuImages.amdR5,
        gallery: [cpuImages.amdR5],
      },
      {
        id: "cpu-4",
        name: "AMD Ryzen 7 7800X3D",
        price: 2800,
        summary: "Produto real forte para games, útil para testar visual premium dentro do fluxo.",
        highlights: ["AM5", "8 núcleos", "3D V-Cache"],
        image: cpuImages.amdR7,
        gallery: [cpuImages.amdR7],
      },
    ],
  },
  {
    id: "motherboard",
    title: "Placa Mãe",
    icon: <Settings className="h-4 w-4" />,
    options: [
      {
        id: "mb-1",
        name: "B760M AORUS ELITE (Intel)",
        price: 1100,
        req: ["cpu-1", "cpu-2"],
        standard: true,
        summary: "Foto real de placa-mãe para validar melhor leitura de produto escolhido no accordion.",
        highlights: ["LGA1155", "DDR3", "mATX"],
        image: motherboardImages.b75,
        gallery: [motherboardImages.b75],
      },
      {
        id: "mb-2",
        name: "H470 PCYES (Intel)",
        price: 1800,
        req: ["cpu-1", "cpu-2"],
        summary: "Outra placa real da PCYES para comparação visual no fluxo.",
        highlights: ["LGA1200", "DDR4", "mATX"],
        image: motherboardImages.h470,
        gallery: [motherboardImages.h470],
      },
      {
        id: "mb-3",
        name: "TUF GAMING B650-PLUS WIFI (AMD)",
        price: 1300,
        req: ["cpu-3", "cpu-4"],
        summary: "Imagem real com motherboard e bundle, ótima para testar cards mais densos.",
        highlights: ["AM5", "DDR5", "ATX"],
        image: motherboardImages.b650,
        gallery: [motherboardImages.b650],
      },
      {
        id: "mb-4",
        name: "ROG STRIX B650-A GAMING WIFI (AMD)",
        price: 2500,
        req: ["cpu-3", "cpu-4"],
        summary: "Uma opção mais premium com foto real para ver como o bloco aguenta um produto mais sofisticado.",
        highlights: ["AM5", "DDR5", "ATX"],
        image: motherboardImages.b650a,
        gallery: [motherboardImages.b650a],
      },
    ],
  },
  {
    id: "ram",
    title: "Memória RAM",
    icon: <Zap className="h-4 w-4" />,
    options: [
      {
        id: "ram-1",
        name: "8GB DDR4 3200MHz UDIMM PCYES",
        price: 400,
        standard: true,
        summary: "Foto real do módulo PCYES, mais coerente com a proposta do configurador.",
        highlights: ["8GB", "DDR4", "3200MHz"],
        image: ramImages.ddr4_8,
        gallery: [ramImages.ddr4_8],
      },
      {
        id: "ram-2",
        name: "16GB DDR4 3200MHz UDIMM PCYES",
        price: 800,
        summary: "Mantém a vitrine com módulo real e deixa a comparação de cards mais fiel ao catálogo.",
        highlights: ["16GB", "DDR4", "3200MHz"],
        image: ramImages.ddr4_32_front,
        gallery: [ramImages.ddr4_32_front],
      },
      {
        id: "ram-3",
        name: "16GB DDR5 5600MHz UDIMM PCYES",
        price: 1600,
        summary: "Outra opção visualmente realista para testar como a etapa de memória se comporta com variações.",
        highlights: ["16GB", "DDR5", "5600MHz"],
        image: ramImages.ddr4_32,
        gallery: [ramImages.ddr4_32],
      },
      {
        id: "ram-4",
        name: "32GB DDR4 3200MHz UDIMM PCYES",
        price: 1900,
        summary: "Módulo real em ângulo, útil para ver diferença de leitura dentro do card e no cabeçalho.",
        highlights: ["32GB", "DDR4", "3200MHz"],
        image: ramImages.ddr4_32,
        gallery: [ramImages.ddr4_32, ramImages.ddr4_32_front],
      },
    ],
  },
  {
    id: "gpu",
    title: "Placa de Vídeo",
    icon: <Monitor className="h-4 w-4" />,
    options: gpuProducts.map((product, index) =>
      toOptionFromProduct("gpu", product, index, {
        standard: index === 0,
        summary: "Produto real do catálogo para a gente validar densidade visual, foto e nome ao mesmo tempo.",
      }),
    ),
  },
  {
    id: "cooling",
    title: "Refrigeração",
    icon: <Settings className="h-4 w-4" />,
    options: coolingProducts.map((product, index) =>
      toOptionFromProduct("cooling", product, index, {
        standard: index === 0,
        summary: "Foto real do item para testar como coolers menores e AIOs se comportam no grid.",
      }),
    ),
  },
  {
    id: "storage",
    title: "HD e SSD",
    icon: <HardDrive className="h-4 w-4" />,
    options: storageProducts.map((product, index) =>
      toOptionFromProduct("storage", product, index, {
        standard: index === 0,
        summary: "Produto real do catálogo, bom para validar cards menores com nome técnico mais comprido.",
      }),
    ),
  },
  {
    id: "case",
    title: "Gabinete",
    icon: <Monitor className="h-4 w-4" />,
    options: caseProducts.map((product, index) =>
      toOptionFromProduct("case", product, index, {
        standard: product.name.toLowerCase().includes("white ghost") || index === 0,
        summary: "Foto real de gabinete, importante para testar a percepção premium da prévia grande.",
        type: getCaseType(product.name),
      }),
    ),
  },
  {
    id: "psu",
    title: "Fonte de Alimentação",
    icon: <Zap className="h-4 w-4" />,
    options: [
      {
        id: "psu-1",
        name: "PCYES Electro V2 550W 80Plus Bronze",
        price: 300,
        standard: true,
        summary: "Foto real levantada no site oficial, mais fiel para a etapa de fonte.",
        highlights: ["550W", "80+ Bronze", "ATX"],
        image: psuImages.electro550,
        gallery: [psuImages.electro550],
      },
      {
        id: "psu-2",
        name: "PCYES Electro V2 650W 80Plus Bronze",
        price: 550,
        summary: "Mantém uma imagem real de fonte enquanto a gente avalia a hierarquia de conteúdo.",
        highlights: ["650W", "80+ Bronze", "PFC ativo"],
        image: psuImages.electro550,
        gallery: [psuImages.electro550],
      },
      {
        id: "psu-3",
        name: "PCYES Aether 850W Full Modular Gold",
        price: 650,
        summary: "Fonte real com visual mais premium para testar cards e thumb no cabeçalho.",
        highlights: ["850W", "80+ Gold", "ATX"],
        image: psuImages.aether850,
        gallery: [psuImages.aether850],
      },
      {
        id: "psu-4",
        name: "PCYES Aether 1000W Full Modular Gold",
        price: 1200,
        summary: "Mais uma foto real para a grade de fontes ficar com densidade suficiente.",
        highlights: ["1000W", "Gold", "Full Modular"],
        image: psuImages.aether1000,
        gallery: [psuImages.aether1000],
      },
    ],
  },
  {
    id: "peripherals",
    title: "Periféricos",
    icon: <Settings className="h-4 w-4" />,
    options: peripheralProducts.map((product, index) =>
      toOptionFromProduct("peripherals", product, index, {
        standard: index === 0,
        summary: "Foto real do catálogo para avaliar como itens menores se comportam nos cards da direita.",
      }),
    ),
  },
];

interface AmbientConfig {
  bg: string;
  glow: string;
}

const getAmbient = (type?: string): AmbientConfig => {
  switch (type) {
    case "white":
      return {
        bg: "radial-gradient(circle at 22% 14%, rgba(255,255,255,0.12), transparent 28%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.08), transparent 24%), linear-gradient(180deg, #171717 0%, #090909 100%)",
        glow: "rgba(255,255,255,0.14)",
      };
    case "rgb":
      return {
        bg: "radial-gradient(circle at 18% 16%, rgba(139,92,246,0.22), transparent 28%), radial-gradient(circle at 82% 18%, rgba(6,182,212,0.16), transparent 22%), linear-gradient(180deg, #12091d 0%, #080808 100%)",
        glow: "rgba(139,92,246,0.26)",
      };
    default:
      return {
        bg: "radial-gradient(circle at 22% 14%, rgba(255,255,255,0.07), transparent 26%), radial-gradient(circle at 82% 16%, rgba(255,255,255,0.04), transparent 20%), linear-gradient(180deg, #141414 0%, #080808 100%)",
        glow: "rgba(255,255,255,0.09)",
      };
  }
};

type View = "welcome" | "quiz" | "presets" | "builder" | "review";
type SortMode = "suggested" | "price-asc" | "price-desc" | "name";

type QuizAnswers = { use?: string; budget?: string; priority?: string };
type PresetTier = "start" | "pro" | "ultra";

type Preset = {
  id: PresetTier;
  name: string;
  tagline: string;
  description: string;
  price: number;
  installments: { count: number; value: number };
  accent: string;
  glow: string;
  icon: React.ReactNode;
  badge?: string;
  heroImage: string;
  performance: string;
  highlights: string[];
  selections: Record<string, string>;
};

const presets: Preset[] = [
  {
    id: "start",
    name: "Start",
    tagline: "Começo digno",
    description: "Performance honesta pra jogar em 1080p e dia-a-dia tranquilo.",
    price: 3499,
    installments: { count: 10, value: 349.9 },
    accent: "#22c55e",
    glow: "rgba(34,197,94,0.35)",
    icon: <Cpu className="h-5 w-5" />,
    heroImage: "/home/category-computers.png",
    performance: "1080p / Dia-a-dia",
    highlights: ["Intel Core i5-13400F", "16GB DDR4 3200MHz", "GPU entrada", "SSD NVMe 1TB", "Fonte 550W Bronze"],
    selections: {
      cpu: "cpu-1", motherboard: "mb-1", ram: "ram-2", gpu: "gpu-1",
      cooling: "cooling-1", storage: "storage-1", case: "case-1",
      psu: "psu-1", peripherals: "peripherals-1",
    },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Sweet spot performance",
    description: "2K 144Hz com folga, edição rápida. Build mais pedida.",
    price: 7499,
    installments: { count: 10, value: 749.9 },
    accent: "#ff2b2e",
    glow: "rgba(255,43,46,0.45)",
    icon: <Zap className="h-5 w-5" />,
    badge: "MAIS PEDIDA",
    heroImage: "/home/category-pc-gamer.png",
    performance: "2K 144Hz / Render",
    highlights: ["Intel Core i7-14700K", "32GB DDR5 5600MHz", "GPU high-end", "SSD NVMe 2TB", "Fonte 850W Gold"],
    selections: {
      cpu: "cpu-2", motherboard: "mb-1", ram: "ram-3", gpu: "gpu-2",
      cooling: "cooling-2", storage: "storage-2", case: "case-2",
      psu: "psu-3", peripherals: "peripherals-2",
    },
  },
  {
    id: "ultra",
    name: "Ultra",
    tagline: "Top tier sem freio",
    description: "4K alto FPS, render pesado, streaming. Headroom pra anos.",
    price: 14999,
    installments: { count: 10, value: 1499.9 },
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.4)",
    icon: <Sparkles className="h-5 w-5" />,
    heroImage: "/home/hero-videogame.png",
    performance: "4K alto FPS / Workstation",
    highlights: ["AMD Ryzen 7 7800X3D", "32GB DDR5 6000MHz", "GPU flagship", "SSD NVMe 4TB", "Fonte 1000W Gold"],
    selections: {
      cpu: "cpu-4", motherboard: "mb-4", ram: "ram-4", gpu: "gpu-3",
      cooling: "cooling-3", storage: "storage-3", case: "case-3",
      psu: "psu-4", peripherals: "peripherals-3",
    },
  },
];

const recommendPreset = (a: QuizAnswers): PresetTier => {
  if (a.budget === "12+" || a.priority === "fps-max") return "ultra";
  if (a.budget === "8-12" || a.budget === "5-8" || a.priority === "render") return "pro";
  return "start";
};

const quizSteps = [
  {
    id: "use" as const,
    title: "Pra que vai usar?",
    subtitle: "Vamos entender seu uso principal",
    options: [
      { id: "gaming-pro", label: "Gaming competitivo", desc: "FPS, esports, low-latency" },
      { id: "gaming-casual", label: "Gaming casual", desc: "AAA, RPG, single-player" },
      { id: "edit", label: "Trabalho / Edição", desc: "Vídeo, design, 3D, dev" },
      { id: "stream", label: "Streaming / Live", desc: "Captura + encode + chat" },
      { id: "general", label: "Uso geral", desc: "Estudos, leve, multimídia" },
    ],
  },
  {
    id: "budget" as const,
    title: "Qual seu orçamento?",
    subtitle: "Otimizamos a build dentro do seu range",
    options: [
      { id: "3-5", label: "R$ 3.000 – 5.000", desc: "Setup entrada digno" },
      { id: "5-8", label: "R$ 5.000 – 8.000", desc: "Sweet spot custo-benefício" },
      { id: "8-12", label: "R$ 8.000 – 12.000", desc: "Performance alta sustentada" },
      { id: "12+", label: "R$ 12.000+", desc: "Top de linha sem freio" },
    ],
  },
  {
    id: "priority" as const,
    title: "O que mais importa?",
    subtitle: "Onde concentrar o investimento",
    options: [
      { id: "fps-max", label: "FPS máximo", desc: "GPU > tudo" },
      { id: "render", label: "Render / Multitarefa", desc: "CPU forte, mais RAM" },
      { id: "aesthetic", label: "Estética / RGB", desc: "Bonito também conta" },
      { id: "balance", label: "Equilíbrio total", desc: "Tudo médio-alto" },
    ],
  },
];

function QuizFlow({
  onComplete,
  onBack,
}: {
  onComplete: (rec: PresetTier) => void;
  onBack: () => void;
}) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const step = quizSteps[stepIdx];
  const progress = ((stepIdx + 1) / quizSteps.length) * 100;

  const handlePick = (val: string) => {
    const next = { ...answers, [step.id]: val };
    setAnswers(next);
    if (stepIdx < quizSteps.length - 1) setStepIdx(stepIdx + 1);
    else onComplete(recommendPreset(next));
  };

  return (
    <div className="mx-auto max-w-[680px] px-6 py-12 md:py-16">
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => (stepIdx === 0 ? onBack() : setStepIdx(stepIdx - 1))}
            className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-white cursor-pointer"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: 600 }}
          >
            <ArrowLeft size={13} /> Voltar
          </button>
          <span
            className="uppercase text-zinc-500"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "10.5px",
              letterSpacing: "0.22em",
              fontWeight: 700,
            }}
          >
            {stepIdx + 1} / {quizSteps.length}
          </span>
        </div>
        <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "linear-gradient(90deg, rgba(255,43,46,0.4) 0%, rgba(255,43,46,1) 100%)",
              boxShadow: "0 0 12px rgba(255,43,46,0.55)",
            }}
          />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="mb-1 text-white"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {step.title}
          </h2>
          <p className="mb-8 text-zinc-400" style={{ fontFamily: "var(--font-family-inter)", fontSize: "14px" }}>
            {step.subtitle}
          </p>
          <div role="radiogroup" aria-label={step.title} className="space-y-2.5">
            {step.options.map((opt) => {
              const selected = answers[step.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => handlePick(opt.id)}
                  className={cn(
                    "group flex w-full cursor-pointer items-center gap-4 rounded-[18px] border p-5 text-left transition-all",
                    selected
                      ? "border-primary/55 bg-primary/[0.06]"
                      : "border-white/[0.08] bg-[#0f0f12] hover:border-primary/40 hover:bg-[#15151a]",
                  )}
                  style={
                    selected
                      ? { boxShadow: "0 0 0 1px rgba(255,43,46,0.15), 0 18px 50px -20px rgba(255,43,46,0.3)" }
                      : undefined
                  }
                >
                  <div
                    className={cn(
                      "relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                      selected ? "border-primary" : "border-white/25 group-hover:border-primary/60",
                    )}
                  >
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full transition-all",
                        selected ? "scale-100 bg-primary" : "scale-0 bg-primary/0 group-hover:scale-50 group-hover:bg-primary/40",
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-white"
                      style={{ fontFamily: "var(--font-family-figtree)", fontSize: "15px", fontWeight: 600 }}
                    >
                      {opt.label}
                    </p>
                    <p
                      className={cn("mt-0.5 transition-colors", selected ? "text-zinc-300" : "text-zinc-400")}
                      style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px" }}
                    >
                      {opt.desc}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className={cn(
                      "transition-all",
                      selected ? "text-primary" : "text-zinc-600 group-hover:translate-x-1 group-hover:text-primary",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const getSpecIcon = (text: string) => {
  if (/i\d|Ryzen/i.test(text)) return <Cpu size={13} />;
  if (/GPU|RTX|GTX/i.test(text)) return <Monitor size={13} />;
  if (/DDR|RAM/i.test(text)) return <Sparkles size={13} />;
  if (/SSD|HD|NVMe|TB|GB/i.test(text)) return <HardDrive size={13} />;
  if (/W\b|Watt|Fonte|Gold|Bronze/i.test(text)) return <Zap size={13} />;
  return <Settings size={13} />;
};

function PresetCard({
  preset,
  isRecommended,
  onApply,
}: {
  preset: Preset;
  isRecommended: boolean;
  onApply: () => void;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[20px] border bg-[#0d0d0d] transition-all duration-300",
        isRecommended ? "border-primary/55" : "border-white/[0.08] hover:border-white/[0.2]",
      )}
      style={
        isRecommended
          ? { boxShadow: "0 0 0 1px rgba(255,43,46,0.2), 0 40px 80px -30px rgba(255,43,46,0.4)" }
          : undefined
      }
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
        <img
          src={preset.heroImage}
          alt={`Setup ${preset.name}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.04]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 75%, #0d0d0d 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 100%, ${preset.glow} 0%, transparent 50%)` }}
        />
        <div className="absolute left-4 top-4 flex flex-col gap-1.5">
          {isRecommended && (
            <span
              className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-white"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "9.5px",
                letterSpacing: "0.16em",
                fontWeight: 700,
                boxShadow: "0 6px 22px -4px rgba(255,43,46,0.55)",
              }}
            >
              <Sparkles size={9} /> SUGERIDA PRA VOCÊ
            </span>
          )}
          {preset.badge && !isRecommended && (
            <span
              className="inline-flex w-fit items-center rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-white backdrop-blur"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "9.5px",
                letterSpacing: "0.16em",
                fontWeight: 700,
              }}
            >
              {preset.badge}
            </span>
          )}
        </div>
        <div
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md"
          style={{
            background: `${preset.accent}22`,
            border: `1px solid ${preset.accent}55`,
            color: preset.accent,
          }}
        >
          {preset.icon}
        </div>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
          <p
            className="mb-1 uppercase"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "9.5px",
              letterSpacing: "0.22em",
              fontWeight: 700,
              color: preset.accent,
            }}
          >
            {preset.performance}
          </p>
          <h3
            className="text-white"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {preset.name}
          </h3>
          <p
            className="mt-1 text-white/85"
            style={{ fontFamily: "var(--font-family-figtree)", fontSize: "13.5px", fontWeight: 500 }}
          >
            {preset.tagline}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p
          className="mb-4 text-zinc-400"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px", lineHeight: 1.55 }}
        >
          {preset.description}
        </p>
        <ul className="mb-5 space-y-1.5">
          {preset.highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2.5 text-zinc-200"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px", fontWeight: 500 }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-[#1a1a1f] text-zinc-400">
                {getSpecIcon(h)}
              </span>
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between border-t border-white/[0.06] pt-4">
          <div>
            <p
              className="text-white tabular-nums"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.015em",
                lineHeight: 1,
              }}
            >
              {formatBRL(preset.price)}
            </p>
            <p className="mt-1 text-zinc-500" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px" }}>
              {preset.installments.count}x de {formatBRL(preset.installments.value)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onApply}
          className={cn(
            "mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] transition-all duration-300",
            isRecommended
              ? "bg-primary text-white hover:brightness-110"
              : "border border-white/[0.12] bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.06]",
          )}
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.015em",
          }}
        >
          Aplicar e customizar <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

function PresetGallery({
  recommended,
  onApply,
  onBack,
}: {
  recommended: PresetTier | null;
  onApply: (preset: Preset) => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1320px] px-6 py-12 md:py-14">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white cursor-pointer"
        style={{ fontFamily: "var(--font-family-inter)", fontWeight: 600 }}
      >
        <ArrowLeft size={14} /> Voltar
      </button>
      <div className="mb-10 text-center">
        <p
          className="mb-3 uppercase text-zinc-500"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "10.5px",
            letterSpacing: "0.28em",
            fontWeight: 700,
          }}
        >
          // Builds prontas
        </p>
        <h2
          className="mb-3 text-white"
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Escolha seu <span className="text-primary">setup</span>
        </h2>
        <p
          className="mx-auto max-w-[520px] text-zinc-400"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "14.5px", lineHeight: 1.6 }}
        >
          Builds montadas e testadas. Aplique e customize qualquer peça antes de finalizar.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {presets.map((p) => (
          <PresetCard key={p.id} preset={p} isRecommended={recommended === p.id} onApply={() => onApply(p)} />
        ))}
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] max-w-[1760px] items-center justify-between gap-3 px-5 md:px-8">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80" aria-label="PCYES home">
          <img src={LOGO_URL} alt="PCYES" className="h-[24px] w-auto" />
        </Link>
        <Link
          to="/"
          className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.02] px-4 text-zinc-300 transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "12.5px",
            fontWeight: 600,
          }}
        >
          <X size={12} /> Voltar para o Site
        </Link>
      </div>
    </header>
  );
}

function PathCard({
  icon,
  label,
  desc,
  cta,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  cta: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0f0f12] p-7 text-left transition-all duration-300 hover:border-primary/45 hover:bg-[#15151a] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,43,46,0.18), transparent 60%)" }}
      />
      {badge && (
        <span
          className="absolute right-5 top-5 rounded-full bg-primary px-2 py-0.5 text-white"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "9.5px",
            letterSpacing: "0.16em",
            fontWeight: 700,
            boxShadow: "0 6px 20px -4px rgba(255,43,46,0.6)",
          }}
        >
          {badge}
        </span>
      )}
      <div className="relative">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.1] text-primary transition-all group-hover:scale-110 group-hover:border-primary/45 group-hover:bg-primary/15">
          {icon}
        </div>
        <h3
          className="mb-2 text-white"
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "-0.015em",
          }}
        >
          {label}
        </h3>
        <p
          className="mb-6 text-zinc-400"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px", lineHeight: 1.6 }}
        >
          {desc}
        </p>
        <div
          className="flex items-center gap-2 text-primary"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: 600 }}
        >
          {cta}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}

function WelcomeScreen({ onPath }: { onPath: (p: "builder" | "quiz" | "presets") => void }) {
  return (
    <div className="relative">
      <div
        className="relative overflow-hidden border-b border-white/[0.06]"
        style={{
          background:
            "radial-gradient(circle at 25% 30%, rgba(255,43,46,0.18) 0%, transparent 55%), radial-gradient(circle at 75% 70%, rgba(255,43,46,0.12) 0%, transparent 50%), #0a0a0a",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 22%, rgba(255,255,255,0.6) 0.5px, transparent 1px), radial-gradient(circle at 38% 78%, rgba(255,232,31,0.5) 0.5px, transparent 1px), radial-gradient(circle at 64% 30%, rgba(255,255,255,0.5) 0.5px, transparent 1px), radial-gradient(circle at 84% 65%, rgba(255,232,31,0.4) 0.5px, transparent 1px), radial-gradient(circle at 22% 88%, rgba(255,255,255,0.4) 0.5px, transparent 1px)",
          }}
        />
        <div className="relative mx-auto max-w-[1320px] px-6 py-16 md:py-20 lg:py-24 text-center">
          <p
            className="mb-3 uppercase text-primary"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "11px",
              letterSpacing: "0.3em",
              fontWeight: 700,
            }}
          >
            // Monte seu PC
          </p>
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "clamp(38px, 6vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
            }}
          >
            Seu setup, <span className="text-primary">sua regra</span>
          </h1>
          <p
            className="mx-auto mt-5 max-w-[560px] text-zinc-300"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "16px",
              lineHeight: 1.55,
            }}
          >
            Configure cada peça do seu jeito ou deixa a gente sugerir. Compatibilidade garantida, preço em tempo real, parcelado em até 10x.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PathCard
            icon={<Cpu className="h-5 w-5" />}
            label="Eu já sei o que quero"
            desc="Vai direto pro builder. Escolhe cada peça do zero, com filtros, busca e compatibilidade automática."
            cta="Montar do zero"
            onClick={() => onPath("builder")}
          />
          <PathCard
            icon={<Wand2 className="h-5 w-5" />}
            label="Me ajuda a escolher"
            desc="3 perguntas rápidas sobre seu uso, orçamento e prioridades. Recomendamos a build ideal pra você."
            cta="Iniciar quiz"
            badge="POPULAR"
            onClick={() => onPath("quiz")}
          />
          <PathCard
            icon={<Sparkles className="h-5 w-5" />}
            label="Quero builds prontas"
            desc="Setups Start, Pro e Ultra já montados e testados. Aplica e customiza qualquer peça antes de comprar."
            cta="Ver setups"
            onClick={() => onPath("presets")}
          />
        </div>
      </div>
    </div>
  );
}

function HorizontalStepper({
  categories,
  currentId,
  completedIds,
  onJump,
}: {
  categories: { id: string; title: string; icon: React.ReactNode }[];
  currentId: string;
  completedIds: string[];
  onJump: (id: string) => void;
}) {
  const currentIdx = categories.findIndex((c) => c.id === currentId);
  return (
    <div className="border-b border-white/[0.05] bg-[#0a0a0a]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[1760px] overflow-x-auto px-6 py-6">
        <div className="relative flex min-w-fit items-start justify-between gap-2">
          <div className="pointer-events-none absolute left-0 right-0 top-[28px] h-[2px] bg-white/[0.06]" />
          <motion.div
            className="pointer-events-none absolute left-0 top-[28px] h-[2px]"
            initial={false}
            animate={{
              width: `${categories.length > 1 ? (currentIdx / (categories.length - 1)) * 100 : 0}%`,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "linear-gradient(90deg, rgba(255,43,46,0.4) 0%, rgba(255,43,46,1) 100%)",
              boxShadow: "0 0 12px rgba(255,43,46,0.45)",
            }}
          />
          {categories.map((c) => {
            const done = completedIds.includes(c.id);
            const active = c.id === currentId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onJump(c.id)}
                aria-current={active ? "step" : undefined}
                aria-label={`${c.title}${done ? " (concluída)" : ""}`}
                className="group relative z-10 flex shrink-0 cursor-pointer flex-col items-center gap-2 px-2 focus-visible:outline-none"
              >
                <div
                  className={cn(
                    "relative flex h-[56px] w-[56px] items-center justify-center rounded-full transition-all",
                    active
                      ? "bg-primary text-white"
                      : done
                        ? "bg-primary/15 text-primary"
                        : "bg-[#16161a] text-zinc-500 group-hover:bg-[#1c1c20] group-hover:text-zinc-300",
                  )}
                  style={
                    active
                      ? {
                          boxShadow:
                            "0 0 0 4px rgba(255,43,46,0.18), 0 0 28px -4px rgba(255,43,46,0.55)",
                        }
                      : done
                        ? { boxShadow: "0 0 0 1px rgba(255,43,46,0.25)" }
                        : { boxShadow: "0 0 0 1px rgba(255,255,255,0.05)" }
                  }
                >
                  {done && !active ? (
                    <Check size={18} strokeWidth={3} />
                  ) : (
                    c.icon
                  )}
                </div>
                <span
                  className={cn(
                    "max-w-[80px] text-center transition-colors",
                    active ? "text-primary" : done ? "text-zinc-200" : "text-zinc-500",
                  )}
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "11.5px",
                    fontWeight: active ? 700 : 600,
                    lineHeight: 1.2,
                  }}
                >
                  {c.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProductRow({
  option,
  category,
  selected,
  onSelect,
}: {
  option: Option;
  category: Category;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Selecionar ${option.name}${option.standard ? " (sugerida PCYES)" : ""}`}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-4 rounded-[16px] border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]",
        selected
          ? "border-primary bg-primary/[0.05]"
          : "border-white/[0.08] bg-[#0f0f12] hover:border-white/[0.18] hover:bg-[#15151a]",
      )}
      style={
        selected
          ? { boxShadow: "0 0 0 1px rgba(255,43,46,0.45), 0 18px 50px -20px rgba(255,43,46,0.35)" }
          : undefined
      }
    >
      <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg bg-[#1a1a1f]">
        {option.image ? (
          <img
            src={option.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-500">{category.icon}</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "-0.005em",
              lineHeight: 1.3,
            }}
          >
            {option.name}
          </p>
          {option.standard && (
            <span
              className="rounded-full bg-primary/15 px-2 py-0.5 text-primary"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "9px",
                letterSpacing: "0.16em",
                fontWeight: 700,
              }}
            >
              SUGERIDA
            </span>
          )}
        </div>
        {option.highlights && option.highlights.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {option.highlights.slice(0, 4).map((h) => (
              <span
                key={h}
                className="rounded border border-white/[0.08] bg-[#1a1a1f] px-2 py-0.5 text-zinc-300"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "10.5px",
                  fontWeight: 500,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span
          className={cn("tabular-nums", selected ? "text-primary" : "text-white")}
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: "17px",
            fontWeight: 700,
            letterSpacing: "-0.005em",
          }}
        >
          {formatBRL(option.price)}
        </span>
        <div
          className={cn(
            "relative flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all",
            selected ? "border-primary bg-primary" : "border-white/25 group-hover:border-primary/60",
          )}
        >
          {selected && <Check size={13} className="text-white" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
}

function SelectedItemCard({
  category,
  option,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: {
  category: Category | undefined;
  option: Option | undefined;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0d0d0d]">
      <div className="border-b border-white/[0.06] px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <p
            className="uppercase text-zinc-400"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "10px",
              letterSpacing: "0.22em",
              fontWeight: 700,
            }}
          >
            Item selecionado
          </p>
          <span
            className="text-zinc-500"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "10.5px",
              fontWeight: 500,
            }}
          >
            {category?.title}
          </span>
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="mb-4 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#15151a]">
          {option?.image ? (
            <img src={option.image} alt={option.name} className="h-full w-full object-contain p-3" />
          ) : (
            <div className="text-zinc-600">{category?.icon}</div>
          )}
        </div>
        {option ? (
          <>
            <p
              className="text-white"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-0.005em",
                lineHeight: 1.3,
              }}
            >
              {option.name}
            </p>
            {option.highlights && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {option.highlights.slice(0, 3).map((h) => (
                  <span
                    key={h}
                    className="rounded border border-white/[0.08] bg-[#1a1a1f] px-1.5 py-0.5 text-zinc-300"
                    style={{
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "10px",
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
            <p
              className="mt-3 text-white tabular-nums"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.015em",
              }}
            >
              {formatBRL(option.price)}
            </p>
            <p className="mt-0.5 text-zinc-500" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11px" }}>
              em até 10x de {formatBRL(option.price / 10)} sem juros
            </p>
          </>
        ) : (
          <p
            className="text-zinc-500"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px" }}
          >
            Selecione uma opção da lista
          </p>
        )}
      </div>
      <div className="border-t border-white/[0.06] bg-[#0a0a0a] p-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-white/[0.1] bg-white/[0.02] text-zinc-300 transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px", fontWeight: 600 }}
          >
            <ArrowLeft size={12} /> Voltar
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-primary text-white transition-all hover:brightness-110"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "12.5px",
              fontWeight: 600,
              letterSpacing: "0.01em",
              boxShadow: "0 8px 24px -8px rgba(255,43,46,0.5)",
            }}
          >
            {isLast ? "Revisar" : "Avançar"} <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfiguracaoSelecionadaCard({
  categories,
  selections,
  total,
  onEdit,
}: {
  categories: Array<Category & { selectedOption?: Option }>;
  selections: Record<string, string>;
  total: number;
  onEdit: (id: string) => void;
}) {
  const filled = categories.filter((c) => c.selectedOption);
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0d0d0d]">
      <div className="border-b border-white/[0.06] px-5 pt-4 pb-3">
        <div className="flex items-baseline justify-between">
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "-0.005em",
            }}
          >
            Configuração selecionada
          </p>
          <span
            className="rounded-full bg-primary/[0.12] px-2 py-0.5 text-primary tabular-nums"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            {filled.length}/{categories.length}
          </span>
        </div>
      </div>
      {filled.length === 0 ? (
        <div className="px-5 py-6 text-center">
          <p
            className="text-zinc-500"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px" }}
          >
            Nenhum componente selecionado ainda.
            <br />
            Comece escolhendo as peças.
          </p>
        </div>
      ) : (
        <div className="max-h-[280px] space-y-1 overflow-y-auto px-3 py-3">
          {filled.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onEdit(c.id)}
              className="group flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] p-2 text-left transition-colors hover:bg-white/[0.04]"
              aria-label={`Editar ${c.title}`}
            >
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-[#1a1a1f]">
                {c.selectedOption?.image ? (
                  <img src={c.selectedOption.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-600">{c.icon}</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="uppercase text-zinc-500"
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {c.title}
                </p>
                <p
                  className="mt-0.5 truncate text-white"
                  style={{
                    fontFamily: "var(--font-family-figtree)",
                    fontSize: "12px",
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  {c.selectedOption?.name}
                </p>
              </div>
              <span
                className="shrink-0 tabular-nums text-primary"
                style={{ fontFamily: "var(--font-family-figtree)", fontSize: "11.5px", fontWeight: 700 }}
              >
                {formatBRL(c.selectedOption!.price)}
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="border-t border-white/[0.06] bg-[#0a0a0a] px-5 py-3.5">
        <div className="flex items-baseline justify-between">
          <span
            className="uppercase text-zinc-500"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "9.5px",
              letterSpacing: "0.2em",
              fontWeight: 700,
            }}
          >
            Total parcial
          </span>
          <span
            className="text-white tabular-nums"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.015em",
            }}
          >
            {formatBRL(total)}
          </span>
        </div>
        <p
          className="mt-0.5 text-right tabular-nums text-zinc-500"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px" }}
        >
          10x de {formatBRL(total / 10)} sem juros
        </p>
      </div>
    </div>
  );
}

export function MonteSeuPcPage() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const previewRef = useRef<HTMLDivElement>(null);
  const feedbackTimerRef = useRef<number | null>(null);

  const [selections, setSelections] = useState<Record<string, string>>({
    cpu: "cpu-1",
    motherboard: "mb-1",
    ram: "ram-1",
    gpu: "gpu-1",
    cooling: "cooling-1",
    storage: "storage-1",
    case: "case-2",
    psu: "psu-1",
    peripherals: "peripherals-1",
  });
  const [activeCategory, setActiveCategory] = useState<string>("cpu");
  const [expandedCategory, setExpandedCategory] = useState<string>("cpu");
  const [activeView, setActiveView] = useState(0);
  const [actionFeedback, setActionFeedback] = useState("");
  const [view, setView] = useState<View>("welcome");
  const [quizRec, setQuizRec] = useState<PresetTier | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [stepSearch, setStepSearch] = useState<string>("");
  const [sortMode, setSortMode] = useState<SortMode>("suggested");

  useEffect(() => {
    setStepSearch("");
  }, [activeCategory]);

  const handlePath = (p: "builder" | "quiz" | "presets") => setView(p);
  const goToWelcome = () => {
    setQuizRec(null);
    setView("welcome");
  };
  const handleQuizComplete = (rec: PresetTier) => {
    setQuizRec(rec);
    setView("presets");
  };
  const handleApplyPreset = (preset: Preset) => {
    setSelections(preset.selections);
    setActiveCategory("cpu");
    setExpandedCategory("cpu");
    setView("builder");
  };

  const categoriesWithSelected = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        selectedOption: category.options.find((option) => option.id === selections[category.id]),
      })),
    [selections],
  );

  const currentCategory = categoriesWithSelected.find((category) => category.id === activeCategory);
  const currentPreviewOption = currentCategory?.selectedOption ?? categoriesWithSelected.find((category) => category.id === "case")?.selectedOption;
  const currentGallery =
    currentPreviewOption?.gallery?.length
      ? currentPreviewOption.gallery
      : currentPreviewOption?.image
        ? [currentPreviewOption.image]
        : [];

  const currentCase = categoriesWithSelected.find((category) => category.id === "case")?.selectedOption;
  const ambient = useMemo(() => getAmbient(currentCase?.type), [currentCase?.type]);

  const priceBreakdown = useMemo(() => {
    let base = 0;
    let equipment = 0;

    Object.entries(selections).forEach(([categoryId, optionId]) => {
      const category = categories.find((item) => item.id === categoryId);
      const option = category?.options.find((item) => item.id === optionId);
      if (!option) return;

      if (option.standard) base += option.price;
      else equipment += option.price;
    });

    return { base, equipment, total: base + equipment };
  }, [selections]);

  const configurationName = useMemo(() => {
    const caseName = currentCase?.name ?? "PCYES Custom";
    return `${caseName} · Build personalizada`;
  }, [currentCase?.name]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CONFIG_STORAGE_KEY);
      if (!raw) return;

      const savedSelections = JSON.parse(raw) as Record<string, string>;
      if (!savedSelections || typeof savedSelections !== "object") return;
      setSelections((prev) => ({ ...prev, ...savedSelections }));
    } catch {
      // Ignore invalid saved data.
    }
  }, []);

  useEffect(() => {
    setSelections((prev) => {
      let changed = false;
      const next = { ...prev };

      categories.forEach((category) => {
        const selected = category.options.find((option) => option.id === next[category.id]);
        if (!selected) return;

        if (selected.req && !selected.req.includes(next.cpu)) {
          const fallback = category.options.find((option) => !option.req || option.req.includes(next.cpu));
          if (fallback) {
            next[category.id] = fallback.id;
            changed = true;
          }
        }
      });

      return changed ? next : prev;
    });
  }, [selections.cpu]);

  useEffect(() => {
    setActiveView(0);
  }, [activeCategory, currentPreviewOption?.id]);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        window.clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const pushFeedback = (message: string) => {
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
    }

    setActionFeedback(message);
    feedbackTimerRef.current = window.setTimeout(() => {
      setActionFeedback("");
      feedbackTimerRef.current = null;
    }, 2400);
  };

  const getVisibleOptions = (category: Category) =>
    category.options.filter((option) => !option.req || option.req.includes(selections.cpu));

  const handleSelect = (categoryId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [categoryId]: optionId }));
    setActiveCategory(categoryId);

    const currentIndex = categories.findIndex((category) => category.id === categoryId);
    const nextCategory = categories[currentIndex + 1];
    if (nextCategory) {
      setExpandedCategory(nextCategory.id);
      setActiveCategory(nextCategory.id);
    }
  };

  const toggleSection = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? "" : categoryId));
    setActiveCategory(categoryId);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/produtos");
  };

  const handleSave = () => {
    window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(selections));
    pushFeedback("Configuração salva");
  };

  const handleShare = async () => {
    const shareData = {
      title: configurationName,
      text: `Confira esta configuração PCYES em ${formatCurrency(priceBreakdown.total)}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(window.location.href);
      pushFeedback("Link pronto para compartilhar");
    } catch {
      pushFeedback("Compartilhamento cancelado");
    }
  };

  const handleFullscreen = async () => {
    if (!previewRef.current) return;

    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await previewRef.current.requestFullscreen();
    } catch {
      pushFeedback("Tela cheia indisponível");
    }
  };

  const handleAddToCart = () => {
    const cartKey = `pc-builder-${Object.entries(selections)
      .map(([categoryId, optionId]) => `${categoryId}:${optionId}`)
      .join("|")}`;

    addItem({
      cartKey,
      id: 900001,
      name: configurationName,
      price: formatCurrency(priceBreakdown.total),
      image: currentCase?.image ?? currentPreviewOption?.image ?? "",
    });

    pushFeedback("Configuração adicionada ao carrinho");
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5]">
      <TopBar />
      <AnimatePresence mode="wait">
        {view === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeScreen onPath={handlePath} />
          </motion.div>
        )}
        {view === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuizFlow onComplete={handleQuizComplete} onBack={goToWelcome} />
          </motion.div>
        )}
        {view === "presets" && (
          <motion.div
            key="presets"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PresetGallery
              recommended={quizRec}
              onApply={handleApplyPreset}
              onBack={() => setView(quizRec ? "quiz" : "welcome")}
            />
          </motion.div>
        )}
        {view === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-[1280px] px-6 py-16 text-center"
          >
            <p className="mb-2 text-zinc-500" style={{ fontSize: "11px", letterSpacing: "0.24em", fontWeight: 700 }}>
              // REVISÃO — em construção (Fase D)
            </p>
          </motion.div>
        )}
        {view === "builder" && (
          <motion.div
            key="builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentCategory && (() => {
              const currentIdx = categories.findIndex((c) => c.id === activeCategory);
              const allCompat = currentCategory.options.filter(
                (o) => !o.req || o.req.includes(selections.cpu),
              );
              const q = stepSearch.trim().toLowerCase();
              const visibleOptions = q
                ? allCompat.filter(
                    (o) =>
                      o.name.toLowerCase().includes(q) ||
                      (o.highlights ?? []).some((h) => h.toLowerCase().includes(q)) ||
                      (o.summary ?? "").toLowerCase().includes(q),
                  )
                : allCompat;
              const isFirst = currentIdx === 0;
              const isLast = currentIdx === categories.length - 1;
              const stepSelectedId = selections[currentCategory.id];
              const stepSelected = currentCategory.options.find((o) => o.id === stepSelectedId);

              const goNext = () => {
                if (isLast) {
                  setView("review");
                  return;
                }
                const next = categories[currentIdx + 1];
                if (next) {
                  setActiveCategory(next.id);
                  setExpandedCategory(next.id);
                  setCompletedSteps((prev) =>
                    prev.includes(currentCategory.id) ? prev : [...prev, currentCategory.id],
                  );
                }
              };
              const goPrev = () => {
                const prev = categories[currentIdx - 1];
                if (prev) {
                  setActiveCategory(prev.id);
                  setExpandedCategory(prev.id);
                }
              };

              return (
                <>
                  <HorizontalStepper
                    categories={categoriesWithSelected.map((c) => ({
                      id: c.id,
                      title: c.title,
                      icon: c.icon,
                    }))}
                    currentId={activeCategory}
                    completedIds={completedSteps}
                    onJump={(id) => {
                      setActiveCategory(id);
                      setExpandedCategory(id);
                    }}
                  />

                  <div className="mx-auto max-w-[1760px] px-5 pt-5 md:px-8">
                    <div
                      className="flex items-start gap-3 rounded-[14px] border border-blue-500/25 bg-blue-500/[0.06] px-4 py-3"
                      role="note"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                        <span style={{ fontSize: "11px", fontWeight: 700 }}>i</span>
                      </div>
                      <p
                        className="text-zinc-200"
                        style={{
                          fontFamily: "var(--font-family-inter)",
                          fontSize: "12.5px",
                          lineHeight: 1.5,
                        }}
                      >
                        <span className="text-blue-300" style={{ fontWeight: 700 }}>
                          IMPORTANTE:
                        </span>{" "}
                        Configurações montadas aqui são enviadas separadamente, sem montagem. Os valores
                        consideram apenas o preço dos componentes.
                      </p>
                    </div>
                  </div>

                  <main className="mx-auto grid max-w-[1760px] grid-cols-1 gap-6 px-5 py-6 md:px-8 lg:grid-cols-[1fr_380px]">
                    <section className="min-w-0">
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p
                            className="mb-1 uppercase text-zinc-500"
                            style={{
                              fontFamily: "var(--font-family-inter)",
                              fontSize: "10px",
                              letterSpacing: "0.22em",
                              fontWeight: 700,
                            }}
                          >
                            Etapa {currentIdx + 1} / {categories.length}
                          </p>
                          <h2
                            className="text-white"
                            style={{
                              fontFamily: "var(--font-family-figtree)",
                              fontSize: "26px",
                              fontWeight: 700,
                              letterSpacing: "-0.015em",
                              lineHeight: 1.1,
                            }}
                          >
                            Escolha {currentCategory.title.toLowerCase()}
                          </h2>
                          <p
                            className="mt-1 text-zinc-400"
                            style={{
                              fontFamily: "var(--font-family-inter)",
                              fontSize: "12.5px",
                            }}
                          >
                            {visibleOptions.length} de {allCompat.length} compatíveis
                            {q ? ` · busca "${q}"` : null}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px]">
                        <div className="relative">
                          <label
                            className="mb-1.5 block uppercase text-zinc-400"
                            htmlFor="step-search"
                            style={{
                              fontFamily: "var(--font-family-inter)",
                              fontSize: "10px",
                              letterSpacing: "0.18em",
                              fontWeight: 700,
                            }}
                          >
                            Buscar
                          </label>
                          <input
                            id="step-search"
                            type="text"
                            value={stepSearch}
                            onChange={(e) => setStepSearch(e.target.value)}
                            placeholder="Busque por nome ou código"
                            aria-label={`Buscar em ${currentCategory.title}`}
                            className="w-full rounded-[12px] border border-white/[0.1] bg-[#0f0f12] px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-primary/45 focus:bg-[#15151a]"
                            style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px" }}
                          />
                          {stepSearch && (
                            <button
                              type="button"
                              onClick={() => setStepSearch("")}
                              aria-label="Limpar busca"
                              className="absolute right-3 top-[34px] flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              <X size={12} />
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <label
                            className="mb-1.5 block uppercase text-zinc-400"
                            htmlFor="step-sort"
                            style={{
                              fontFamily: "var(--font-family-inter)",
                              fontSize: "10px",
                              letterSpacing: "0.18em",
                              fontWeight: 700,
                            }}
                          >
                            Ordenar por
                          </label>
                          <select
                            id="step-sort"
                            value={sortMode}
                            onChange={(e) => setSortMode(e.target.value as SortMode)}
                            className="w-full appearance-none rounded-[12px] border border-white/[0.1] bg-[#0f0f12] px-4 py-3 pr-9 text-white outline-none transition-all focus:border-primary/45 focus:bg-[#15151a] cursor-pointer"
                            style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px" }}
                          >
                            <option value="suggested">Sugerida primeiro</option>
                            <option value="price-asc">Menor preço</option>
                            <option value="price-desc">Maior preço</option>
                            <option value="name">Nome A-Z</option>
                          </select>
                          <ChevronDown
                            size={14}
                            className="pointer-events-none absolute right-3 top-[38px] text-zinc-500"
                          />
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentCategory.id}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-2.5"
                        >
                          {visibleOptions.length === 0 ? (
                            <div className="rounded-[14px] border border-white/[0.06] bg-[#0f0f12] px-6 py-12 text-center">
                              <p
                                className="text-white"
                                style={{
                                  fontFamily: "var(--font-family-figtree)",
                                  fontSize: "15px",
                                  fontWeight: 600,
                                }}
                              >
                                Nada encontrado pra "{stepSearch}"
                              </p>
                              <p
                                className="mt-1 text-zinc-500"
                                style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px" }}
                              >
                                Tente outro termo ou limpe a busca
                              </p>
                              <button
                                type="button"
                                onClick={() => setStepSearch("")}
                                className="mt-3 rounded-full border border-white/15 px-4 py-1.5 text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white cursor-pointer"
                                style={{
                                  fontFamily: "var(--font-family-inter)",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Limpar busca
                              </button>
                            </div>
                          ) : (
                            visibleOptions
                              .slice()
                              .sort((a, b) => {
                                if (sortMode === "suggested")
                                  return (b.standard ? 1 : 0) - (a.standard ? 1 : 0);
                                if (sortMode === "price-asc") return a.price - b.price;
                                if (sortMode === "price-desc") return b.price - a.price;
                                if (sortMode === "name") return a.name.localeCompare(b.name);
                                return 0;
                              })
                              .map((option) => (
                                <ProductRow
                                  key={option.id}
                                  option={option}
                                  category={currentCategory}
                                  selected={stepSelectedId === option.id}
                                  onSelect={() => {
                                    setSelections((prev) => ({
                                      ...prev,
                                      [currentCategory.id]: option.id,
                                    }));
                                    setCompletedSteps((prev) =>
                                      prev.includes(currentCategory.id)
                                        ? prev
                                        : [...prev, currentCategory.id],
                                    );
                                  }}
                                />
                              ))
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </section>

                    <aside className="space-y-4 lg:sticky lg:top-[180px] lg:self-start">
                      <SelectedItemCard
                        category={currentCategory}
                        option={stepSelected}
                        onPrev={goPrev}
                        onNext={goNext}
                        isFirst={isFirst}
                        isLast={isLast}
                      />
                      <ConfiguracaoSelecionadaCard
                        categories={categoriesWithSelected}
                        selections={selections}
                        total={priceBreakdown.total}
                        onEdit={(id) => {
                          setActiveCategory(id);
                          setExpandedCategory(id);
                        }}
                      />
                    </aside>
                  </main>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
