export interface Product {
  id: number;
  sku?: string;
  name: string;
  price: string;
  priceNum: number;
  oldPrice?: string;
  oldPriceNum?: number;
  rating: number;
  reviews: number;
  category: string;
  subcategory?: string;
  tags: string[];
  image: string;
  badge?: string;
  brand?: string;
  inStock?: boolean;
  description?: string;
  htmlDescription?: string;
  seoSlug?: string;
  productUrl?: string;
  specs?: { label: string; value: string }[];
  features?: string[];
  images?: string[];
}

const rawProducts: Product[] = [
  {
    "id": 1,
    "sku": "TON-10000",
    "name": "Violão Lorenzzo",
    "price": "R$ 1.190,00",
    "priceNum": 1190,
    "rating": 4.7,
    "reviews": 488,
    "category": "Violões",
    "subcategory": "Clássico nylon",
    "tags": [
      "Violões",
      "Nylon",
      "Para iniciantes",
      "Clássico"
    ],
    "brand": "Tonante",
    "image": "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23C9A06A'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%238A5E2C'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E",
    "images": [
      "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23C9A06A'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%238A5E2C'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E"
    ],
    "inStock": true,
    "description": "O clássico que abre portas. Cordas de nylon, braço macio e timbre redondo — o primeiro violão de muita gente.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>Feita para durar</h2><p>O clássico que abre portas. Cordas de nylon, braço macio e timbre redondo — o primeiro violão de muita gente. Cada detalhe é pensado para acompanhar você por muitos anos de música.</p><h3>Cuidado de quem entende</h3><p>Mais de meio século de experiência em cada instrumento. Materiais selecionados e controle de qualidade rigoroso, do galpão ao palco.</p><h3>Pronta para o palco</h3><p>Sai da caixa afinada e ajustada. É só conectar (ou dedilhar) e começar a sua próxima história.</p><h2>Principais características</h2><ul><li>Nylon e Clássico</li><li>Formato Clássico nylon</li><li>Acabamento Tonante de fábrica</li><li>Garantia de 2 anos contra defeitos</li><li>Pronta entrega · envio em 24h</li><li>Tradição brasileira desde 1954</li></ul></section>",
    "features": [
      "Nylon e Clássico",
      "Formato Clássico nylon",
      "Acabamento Tonante de fábrica",
      "Garantia de 2 anos contra defeitos",
      "Pronta entrega · envio em 24h",
      "Tradição brasileira desde 1954"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "TON-10000"
      },
      {
        "label": "Formato",
        "value": "Clássico nylon"
      },
      {
        "label": "Categoria",
        "value": "Violões"
      },
      {
        "label": "Marca",
        "value": "Tonante"
      },
      {
        "label": "Garantia",
        "value": "2 anos"
      },
      {
        "label": "Origem",
        "value": "Brasil · desde 1954"
      }
    ],
    "seoSlug": "violao-lorenzzo-tonante",
    "productUrl": "https://tonante.com.br/violao-lorenzzo-tonante"
  },
  {
    "id": 2,
    "sku": "TON-10137",
    "name": "Violão Coral",
    "price": "R$ 1.690,00",
    "priceNum": 1690,
    "rating": 4.9,
    "reviews": 327,
    "category": "Violões",
    "subcategory": "Folk aço",
    "tags": [
      "Violões",
      "Aço",
      "Tampo maciço"
    ],
    "brand": "Tonante",
    "image": "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23B5793C'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%236E4220'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E",
    "images": [
      "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23B5793C'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%236E4220'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E"
    ],
    "inStock": true,
    "description": "Folk de tampo maciço com fundo em mogno. Som encorpado e quente, que envelhece bonito com você.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>Feita para durar</h2><p>Folk de tampo maciço com fundo em mogno. Som encorpado e quente, que envelhece bonito com você. Cada detalhe é pensado para acompanhar você por muitos anos de música.</p><h3>Cuidado de quem entende</h3><p>Mais de meio século de experiência em cada instrumento. Materiais selecionados e controle de qualidade rigoroso, do galpão ao palco.</p><h3>Pronta para o palco</h3><p>Sai da caixa afinada e ajustada. É só conectar (ou dedilhar) e começar a sua próxima história.</p><h2>Principais características</h2><ul><li>Aço e Tampo maciço</li><li>Formato Folk aço</li><li>Acabamento Tonante de fábrica</li><li>Garantia de 2 anos contra defeitos</li><li>Pronta entrega · envio em 24h</li><li>Tradição brasileira desde 1954</li></ul></section>",
    "features": [
      "Aço e Tampo maciço",
      "Formato Folk aço",
      "Acabamento Tonante de fábrica",
      "Garantia de 2 anos contra defeitos",
      "Pronta entrega · envio em 24h",
      "Tradição brasileira desde 1954"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "TON-10137"
      },
      {
        "label": "Formato",
        "value": "Folk aço"
      },
      {
        "label": "Categoria",
        "value": "Violões"
      },
      {
        "label": "Marca",
        "value": "Tonante"
      },
      {
        "label": "Garantia",
        "value": "2 anos"
      },
      {
        "label": "Origem",
        "value": "Brasil · desde 1954"
      }
    ],
    "seoSlug": "violao-coral-tonante",
    "productUrl": "https://tonante.com.br/violao-coral-tonante",
    "oldPrice": "R$ 1.990,00",
    "oldPriceNum": 1990,
    "badge": "Mais vendido"
  },
  {
    "id": 3,
    "sku": "TON-10274",
    "name": "Violão Volcano",
    "price": "R$ 1.990,00",
    "priceNum": 1990,
    "rating": 4.8,
    "reviews": 366,
    "category": "Violões",
    "subcategory": "Eletroacústico",
    "tags": [
      "Violões",
      "Eletroacústico",
      "Aço",
      "Captação ativa"
    ],
    "brand": "Tonante",
    "image": "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23D2A86A'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%239A6A33'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E",
    "images": [
      "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23D2A86A'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%239A6A33'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E"
    ],
    "inStock": true,
    "description": "Pré-amplificador ativo com afinador embutido. Feito pra sair do quarto e encarar o palco sem perder o calor da madeira.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>Feita para durar</h2><p>Pré-amplificador ativo com afinador embutido. Feito pra sair do quarto e encarar o palco sem perder o calor da madeira. Cada detalhe é pensado para acompanhar você por muitos anos de música.</p><h3>Cuidado de quem entende</h3><p>Mais de meio século de experiência em cada instrumento. Materiais selecionados e controle de qualidade rigoroso, do galpão ao palco.</p><h3>Pronta para o palco</h3><p>Sai da caixa afinada e ajustada. É só conectar (ou dedilhar) e começar a sua próxima história.</p><h2>Principais características</h2><ul><li>Eletroacústico e Captação ativa</li><li>Formato Eletroacústico</li><li>Acabamento Tonante de fábrica</li><li>Garantia de 2 anos contra defeitos</li><li>Pronta entrega · envio em 24h</li><li>Tradição brasileira desde 1954</li></ul></section>",
    "features": [
      "Eletroacústico e Captação ativa",
      "Formato Eletroacústico",
      "Acabamento Tonante de fábrica",
      "Garantia de 2 anos contra defeitos",
      "Pronta entrega · envio em 24h",
      "Tradição brasileira desde 1954"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "TON-10274"
      },
      {
        "label": "Formato",
        "value": "Eletroacústico"
      },
      {
        "label": "Categoria",
        "value": "Violões"
      },
      {
        "label": "Marca",
        "value": "Tonante"
      },
      {
        "label": "Garantia",
        "value": "2 anos"
      },
      {
        "label": "Origem",
        "value": "Brasil · desde 1954"
      }
    ],
    "seoSlug": "violao-volcano-tonante",
    "productUrl": "https://tonante.com.br/violao-volcano-tonante",
    "oldPrice": "R$ 2.290,00",
    "oldPriceNum": 2290,
    "badge": "Mais vendido"
  },
  {
    "id": 4,
    "sku": "TON-10411",
    "name": "Violão Etna",
    "price": "R$ 2.490,00",
    "priceNum": 2490,
    "rating": 4.9,
    "reviews": 142,
    "category": "Violões",
    "subcategory": "Eletroacústico premium",
    "tags": [
      "Violões",
      "Eletroacústico",
      "Tampo maciço",
      "Premium"
    ],
    "brand": "Tonante",
    "image": "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23B5793C'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%236E4220'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E",
    "images": [
      "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23B5793C'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%236E4220'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E"
    ],
    "inStock": true,
    "description": "O topo da linha. Madeiras selecionadas, acabamento impecável e uma projeção que preenche o ambiente.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>Feita para durar</h2><p>O topo da linha. Madeiras selecionadas, acabamento impecável e uma projeção que preenche o ambiente. Cada detalhe é pensado para acompanhar você por muitos anos de música.</p><h3>Cuidado de quem entende</h3><p>Mais de meio século de experiência em cada instrumento. Materiais selecionados e controle de qualidade rigoroso, do galpão ao palco.</p><h3>Pronta para o palco</h3><p>Sai da caixa afinada e ajustada. É só conectar (ou dedilhar) e começar a sua próxima história.</p><h2>Principais características</h2><ul><li>Eletroacústico e Premium</li><li>Formato Eletroacústico premium</li><li>Acabamento Tonante de fábrica</li><li>Garantia de 2 anos contra defeitos</li><li>Pronta entrega · envio em 24h</li><li>Tradição brasileira desde 1954</li></ul></section>",
    "features": [
      "Eletroacústico e Premium",
      "Formato Eletroacústico premium",
      "Acabamento Tonante de fábrica",
      "Garantia de 2 anos contra defeitos",
      "Pronta entrega · envio em 24h",
      "Tradição brasileira desde 1954"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "TON-10411"
      },
      {
        "label": "Formato",
        "value": "Eletroacústico premium"
      },
      {
        "label": "Categoria",
        "value": "Violões"
      },
      {
        "label": "Marca",
        "value": "Tonante"
      },
      {
        "label": "Garantia",
        "value": "2 anos"
      },
      {
        "label": "Origem",
        "value": "Brasil · desde 1954"
      }
    ],
    "seoSlug": "violao-etna-tonante",
    "productUrl": "https://tonante.com.br/violao-etna-tonante",
    "badge": "Edição especial"
  },
  {
    "id": 5,
    "sku": "TON-10548",
    "name": "Violão Ônix",
    "price": "R$ 1.790,00",
    "priceNum": 1790,
    "rating": 4.7,
    "reviews": 173,
    "category": "Violões",
    "subcategory": "Folk black",
    "tags": [
      "Violões",
      "Aço",
      "Black"
    ],
    "brand": "Tonante",
    "image": "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%234A3A2C'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%23211711'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E",
    "images": [
      "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%234A3A2C'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%23211711'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E"
    ],
    "inStock": true,
    "description": "Folk em acabamento preto acetinado. Elegância escura pra quem quer atitude no visual e no som.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>Feita para durar</h2><p>Folk em acabamento preto acetinado. Elegância escura pra quem quer atitude no visual e no som. Cada detalhe é pensado para acompanhar você por muitos anos de música.</p><h3>Cuidado de quem entende</h3><p>Mais de meio século de experiência em cada instrumento. Materiais selecionados e controle de qualidade rigoroso, do galpão ao palco.</p><h3>Pronta para o palco</h3><p>Sai da caixa afinada e ajustada. É só conectar (ou dedilhar) e começar a sua próxima história.</p><h2>Principais características</h2><ul><li>Aço e Black</li><li>Formato Folk black</li><li>Acabamento Tonante de fábrica</li><li>Garantia de 2 anos contra defeitos</li><li>Pronta entrega · envio em 24h</li><li>Tradição brasileira desde 1954</li></ul></section>",
    "features": [
      "Aço e Black",
      "Formato Folk black",
      "Acabamento Tonante de fábrica",
      "Garantia de 2 anos contra defeitos",
      "Pronta entrega · envio em 24h",
      "Tradição brasileira desde 1954"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "TON-10548"
      },
      {
        "label": "Formato",
        "value": "Folk black"
      },
      {
        "label": "Categoria",
        "value": "Violões"
      },
      {
        "label": "Marca",
        "value": "Tonante"
      },
      {
        "label": "Garantia",
        "value": "2 anos"
      },
      {
        "label": "Origem",
        "value": "Brasil · desde 1954"
      }
    ],
    "seoSlug": "violao-onix-tonante",
    "productUrl": "https://tonante.com.br/violao-onix-tonante"
  },
  {
    "id": 6,
    "sku": "TON-10685",
    "name": "Violão Citrino",
    "price": "R$ 1.490,00",
    "priceNum": 1490,
    "rating": 4.6,
    "reviews": 211,
    "category": "Violões",
    "subcategory": "Clássico natural",
    "tags": [
      "Violões",
      "Nylon",
      "Para iniciantes",
      "Natural"
    ],
    "brand": "Tonante",
    "image": "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23C9A06A'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%238A5E2C'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E",
    "images": [
      "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'640'%20height%3D'640'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'1'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23C9A06A'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%238A5E2C'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'640'%20height%3D'640'%20fill%3D'url(%23g)'%2F%3E%3Ctext%20x%3D'320'%20y%3D'330'%20font-family%3D'Georgia%2C%20serif'%20font-style%3D'italic'%20font-size%3D'96'%20fill%3D'rgba(255%2C253%2C248%2C0.94)'%20text-anchor%3D'middle'%3ETonante%3C%2Ftext%3E%3Ctext%20x%3D'320'%20y%3D'392'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'20'%20letter-spacing%3D'8'%20fill%3D'rgba(255%2C253%2C248%2C0.6)'%20text-anchor%3D'middle'%3EDESDE%201954%3C%2Ftext%3E%3C%2Fsvg%3E"
    ],
    "inStock": true,
    "description": "O brilho jovem da Tonante. Leve, claro e fácil de tocar — combina com qualquer estilo.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>Feita para durar</h2><p>O brilho jovem da Tonante. Leve, claro e fácil de tocar — combina com qualquer estilo. Cada detalhe é pensado para acompanhar você por muitos anos de música.</p><h3>Cuidado de quem entende</h3><p>Mais de meio século de experiência em cada instrumento. Materiais selecionados e controle de qualidade rigoroso, do galpão ao palco.</p><h3>Pronta para o palco</h3><p>Sai da caixa afinada e ajustada. É só conectar (ou dedilhar) e começar a sua próxima história.</p><h2>Principais características</h2><ul><li>Nylon e Natural</li><li>Formato Clássico natural</li><li>Acabamento Tonante de fábrica</li><li>Garantia de 2 anos contra defeitos</li><li>Pronta entrega · envio em 24h</li><li>Tradição brasileira desde 1954</li></ul></section>",
    "features": [
      "Nylon e Natural",
      "Formato Clássico natural",
      "Acabamento Tonante de fábrica",
      "Garantia de 2 anos contra defeitos",
      "Pronta entrega · envio em 24h",
      "Tradição brasileira desde 1954"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "TON-10685"
      },
      {
        "label": "Formato",
        "value": "Clássico natural"
      },
      {
        "label": "Categoria",
        "value": "Violões"
      },
      {
        "label": "Marca",
        "value": "Tonante"
      },
      {
        "label": "Garantia",
        "value": "2 anos"
      },
      {
        "label": "Origem",
        "value": "Brasil · desde 1954"
      }
    ],
    "seoSlug": "violao-citrino-tonante",
    "productUrl": "https://tonante.com.br/violao-citrino-tonante",
    "oldPrice": "R$ 1.690,00",
    "oldPriceNum": 1690
  },
  {
    "id": 7,
    "sku": "CP108169",
    "name": "Guitarra Valentine's",
    "price": "R$ 2.390,00",
    "priceNum": 2390,
    "rating": 4.8,
    "reviews": 188,
    "category": "Guitarras",
    "subcategory": "Les Paul",
    "tags": [
      "Guitarras",
      "Humbucker",
      "6 cordas"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/1/0/108169_1-17680523300367888.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/1/0/108169_1-17680523300367888.jpeg"
    ],
    "inStock": true,
    "description": "Corpo encorpado e dois humbuckers com presença de sobra. Peso, calor e sustain pra quem leva o palco a sério.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>A VALENTINE'S</h2><p>Essa nossa linha apresenta uma guitarra totalmente nova que incorpora avanços evolutivos no design, indicada principalmente para iniciantes, de todas as idades. É um instrumento marcante pela sua versatilidade e além de claro, carregar o legado da Tonante.</p><h3>A VALENTINE'S</h3><p>Essa nossa linha apresenta uma guitarra totalmente nova que incorpora avanços evolutivos no design, indicada principalmente para iniciantes, de todas as idades. É um instrumento marcante pela sua versatilidade e além de claro, carregar o legado da Tonante.</p><h3>OPÇÕES PARA TODOS OS GOSTOS!</h3><p>Como de costume, a Tonante trouxe um lançamento com várias cores disponíveis para você poder escolher exatamente aquela que combina com o seu estilo.\nConheça agora nossas opções, cores disponíveis:</p><h2>Principais características</h2><ul><li>Corpo: Basswood</li><li>Braço: Maple</li><li>Escala: : Rosewood - 22T - C 25.5\" - R 9.5\"</li><li>Nut: 42 mm</li><li>Tarraxas: Chrome Die-cast</li><li>Ponte: Vintage Tremolo</li></ul></section>",
    "features": [
      "Corpo: Basswood",
      "Braço: Maple",
      "Escala: : Rosewood - 22T - C 25.5\" - R 9.5\"",
      "Nut: 42 mm",
      "Tarraxas: Chrome Die-cast",
      "Ponte: Vintage Tremolo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP108169"
      },
      {
        "label": "Corpo",
        "value": "Basswood"
      },
      {
        "label": "Braço",
        "value": "Maple"
      },
      {
        "label": "Escala",
        "value": ": Rosewood - 22T - C 25.5\" - R 9.5\""
      },
      {
        "label": "Nut",
        "value": "42 mm"
      },
      {
        "label": "Tarraxas",
        "value": "Chrome Die-cast"
      },
      {
        "label": "Ponte",
        "value": "Vintage Tremolo"
      },
      {
        "label": "Captação",
        "value": "3 Single coils"
      },
      {
        "label": "Controles",
        "value": "1V, 2T - Chave 5 posições"
      },
      {
        "label": "Cor",
        "value": "Lipstick Red"
      }
    ],
    "seoSlug": "guitarra-valentine-s-tonante",
    "productUrl": "https://tonante.com.br/guitarra-valentine-s-tonante",
    "oldPrice": "R$ 2.690,00",
    "oldPriceNum": 2690,
    "badge": "Mais vendido"
  },
  {
    "id": 8,
    "sku": "CP108173",
    "name": "Guitarra Cecille",
    "price": "R$ 2.790,00",
    "priceNum": 2790,
    "rating": 4.8,
    "reviews": 96,
    "category": "Guitarras",
    "subcategory": "Stratocaster",
    "tags": [
      "Guitarras",
      "Single-coil",
      "Tremolo",
      "6 cordas"
    ],
    "brand": "Tonante",
    "image": "https://cdn.oderco.com.br/produtos/108173/108173-A1.1.jpg",
    "images": [
      "https://cdn.oderco.com.br/produtos/108173/108173-A1.1.jpg",
      "https://cdn.oderco.com.br/produtos/108173/108173-A6.png",
      "https://cdn.oderco.com.br/produtos/108173/108173-A2.jpg"
    ],
    "inStock": true,
    "description": "Três captadores single-coil, ponte tremolo e sustain de sobra. Versatilidade do limpo ao crocante.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>A CECILLE</h2><p>Apresenta design de corpo sólido em basswood, headstock e escudo customizados, controles separados de volume e tom e um braço parafusado, tem dois captadores e um tensor ajustável no braço. Esse instrumento tem aparência, sensação e som próprios. Muitas vezes descrito como \"twang\", o som será imediatamente apreciado por uma grande variedade de músicos.</p><h3>VERSÁTIL</h3><p>A simplicidade da Guitarra Elétrica Cecille, modelo TL, faz com que ela tenha um desempenho versátil. É uma ferramenta indispensável tanto para músicos de rock quanto de country e se tornou indelevelmente ligada a artistas individuais de ambos os gêneros, também é um dos modelos mais recomendados quando o assunto é Worship.</p><h3>PATRIMÔNIO E LEGADO</h3><p>Atualmente, a Cecille está disponível em uma variedade de cores para aproveitar!\nCORES DISPONÍVEIS:</p><h2>Principais características</h2><ul><li>Tipo: Guitarra elétrica</li><li>Corpo: Basswood</li><li>Braço: Maple</li><li>Escala: Rosewood</li><li>Comprimento de escala: 25.5\"</li><li>Raio da escala: 9.5\"</li></ul></section>",
    "features": [
      "Tipo: Guitarra elétrica",
      "Corpo: Basswood",
      "Braço: Maple",
      "Escala: Rosewood",
      "Comprimento de escala: 25.5\"",
      "Raio da escala: 9.5\""
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP108173"
      },
      {
        "label": "Tipo",
        "value": "Guitarra elétrica"
      },
      {
        "label": "Corpo",
        "value": "Basswood"
      },
      {
        "label": "Braço",
        "value": "Maple"
      },
      {
        "label": "Escala",
        "value": "Rosewood"
      },
      {
        "label": "Comprimento de escala",
        "value": "25.5\""
      },
      {
        "label": "Raio da escala",
        "value": "9.5\""
      },
      {
        "label": "Trastes",
        "value": "22"
      },
      {
        "label": "Nut",
        "value": "42 mm"
      },
      {
        "label": "Tarraxas",
        "value": "Die-cast cromadas"
      },
      {
        "label": "Ponte",
        "value": "Estilo Pure Vintage"
      },
      {
        "label": "Captação",
        "value": "1 Single Coil + 1 Lipstick"
      },
      {
        "label": "Controles",
        "value": "1 volume, 1 tone, chave seletora de 3 posições"
      }
    ],
    "seoSlug": "guitarra-cecille-tonante",
    "productUrl": "https://tonante.com.br/guitarra-cecille-tonante",
    "oldPrice": "R$ 3.190,00",
    "oldPriceNum": 3190,
    "badge": "Novidade"
  },
  {
    "id": 9,
    "sku": "CP360331",
    "name": "Guitarra 70th Anniversary",
    "price": "R$ 3.490,00",
    "priceNum": 3490,
    "rating": 4.9,
    "reviews": 54,
    "category": "Guitarras",
    "subcategory": "Edição comemorativa",
    "tags": [
      "Guitarras",
      "HSS",
      "6 cordas",
      "Edição limitada"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/6/360331_1-17783069090081006.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/6/360331_1-17783069090081006.jpeg"
    ],
    "inStock": true,
    "description": "Edição comemorativa de 70 anos da Tonante. Acabamento exclusivo e versatilidade HSS pra todos os estilos.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>Celebre 70 anos de história</h2><p>A Guitarra Elétrica 70th Anniversary Edition foi criada para homenagear o legado da Tonante com um instrumento exclusivo, sofisticado e de alta performance. Com corpo em Alder, braço em Roasted Maple e captadores duplos Humbucker, ela entrega versatilidade sonora, tocabilidade moderna e um visual marcante em quatro acabamentos especiais.</p><h3>Performance incomparável</h3><p>Cada detalhe foi cuidadosamente desenvolvido para oferecer uma experiência única. Dos trastes Jumbo em inox ao tensor Spoke Wheel, passando pelo acabamento premium e hardware exclusivo de cada versão, esta guitarra representa o encontro perfeito entre tradição, inovação e excelência musical.</p><h3>Quatro acabamentos exclusivos</h3><p>Escolha a versão que mais combina com o seu estilo. \nDisponível em quatro cores:\nSatin Military Green  |  Satin Black  |  Metallic Blue  |  Olympic White</p><h2>Principais características</h2><ul><li>Formato do Corpo: Jazz Master</li><li>Corpo: Alder</li><li>Braço: Roasted Maple</li><li>Escala: Bolivian Rosewood</li><li>Shape do Braço: Modern C</li><li>Raio da Escala: 12\"</li></ul></section>",
    "features": [
      "Formato do Corpo: Jazz Master",
      "Corpo: Alder",
      "Braço: Roasted Maple",
      "Escala: Bolivian Rosewood",
      "Shape do Braço: Modern C",
      "Raio da Escala: 12\""
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP360331"
      },
      {
        "label": "Formato do Corpo",
        "value": "Jazz Master"
      },
      {
        "label": "Corpo",
        "value": "Alder"
      },
      {
        "label": "Braço",
        "value": "Roasted Maple"
      },
      {
        "label": "Escala",
        "value": "Bolivian Rosewood"
      },
      {
        "label": "Shape do Braço",
        "value": "Modern C"
      },
      {
        "label": "Raio da Escala",
        "value": "12\""
      },
      {
        "label": "Largura do Nut",
        "value": "42 mm"
      },
      {
        "label": "Comprimento da Escala",
        "value": "25.5\""
      },
      {
        "label": "Número de Trastes",
        "value": "21"
      },
      {
        "label": "Tipo de Traste",
        "value": "Jumbo Inox"
      },
      {
        "label": "Marcações",
        "value": "Bloco"
      },
      {
        "label": "Tensor",
        "value": "Spoke Wheel"
      }
    ],
    "seoSlug": "guitarra-70th-anniversary-tonante",
    "productUrl": "https://tonante.com.br/guitarra-70th-anniversary-tonante",
    "badge": "Edição 70 anos"
  },
  {
    "id": 10,
    "sku": "CP108177",
    "name": "Contrabaixo JazzMine",
    "price": "R$ 2.590,00",
    "priceNum": 2590,
    "rating": 4.8,
    "reviews": 64,
    "category": "Contrabaixos",
    "subcategory": "Jazz Bass",
    "tags": [
      "Contrabaixos",
      "4 cordas",
      "Passivo"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/1/0/108177_-17680208889835810.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/1/0/108177_-17680208889835810.jpeg"
    ],
    "inStock": true,
    "description": "Dois captadores single-coil estilo JB e corpo leve. O groove limpo e articulado que segura a banda inteira.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>O JazzMine</h2><p>Foi desenvolvido com o objetivo de proporcionar aos músicos um timbre mais limpo e articulado. Um dos baixos mais flexíveis e amplamente utilizados em vários gêneros musicais.</p><h3>Design Próprio Tonante</h3><p>Nosso instrumento foi meticulosamente projetado, desde a modelação e acabamento da madeira, até ao cuidado e consideração de cada detalhe.</p><h3>Estilo para todos os gostos</h3><p>Outras cores estão disponíveis, elaboradas para satisfazer todos os estilos de artistas!</p><h2>Principais características</h2><ul><li>Tipo: Contrabaixo modelo JB 4 cordas</li><li>Corpo: Basswood</li><li>Braço: Maple</li><li>Escala: Rosewood</li><li>Tarraxas: Blindadas</li><li>Captação: Passiva</li></ul></section>",
    "features": [
      "Tipo: Contrabaixo modelo JB 4 cordas",
      "Corpo: Basswood",
      "Braço: Maple",
      "Escala: Rosewood",
      "Tarraxas: Blindadas",
      "Captação: Passiva"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP108177"
      },
      {
        "label": "Tipo",
        "value": "Contrabaixo modelo JB 4 cordas"
      },
      {
        "label": "Corpo",
        "value": "Basswood"
      },
      {
        "label": "Braço",
        "value": "Maple"
      },
      {
        "label": "Escala",
        "value": "Rosewood"
      },
      {
        "label": "Tarraxas",
        "value": "Blindadas"
      },
      {
        "label": "Captação",
        "value": "Passiva"
      },
      {
        "label": "Captadores",
        "value": "2 Single Coils estilo JB com ímãs cerâmicos"
      },
      {
        "label": "Controles",
        "value": "2 volumes, 1 tone"
      },
      {
        "label": "Trastes",
        "value": "21 Jumbo"
      },
      {
        "label": "Tensor",
        "value": "Dual Action"
      },
      {
        "label": "Marcadores",
        "value": "Dot"
      }
    ],
    "seoSlug": "contrabaixo-jazzmine-tonante",
    "productUrl": "https://tonante.com.br/contrabaixo-jazzmine-tonante",
    "badge": "Mais vendido"
  },
  {
    "id": 11,
    "sku": "CP108181",
    "name": "Contrabaixo Theodor",
    "price": "R$ 2.390,00",
    "priceNum": 2390,
    "rating": 4.7,
    "reviews": 52,
    "category": "Contrabaixos",
    "subcategory": "Precision Bass",
    "tags": [
      "Contrabaixos",
      "4 cordas",
      "Passivo",
      "Split-coil"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/1/0/108181_1-17680213671014443.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/1/0/108181_1-17680213671014443.jpeg"
    ],
    "inStock": true,
    "description": "O contrabaixo de toda gravadora. Punch grave e definição que atravessa qualquer mix.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>O Theodor</h2><p>É um baixo projetado para músicos que buscam qualidade &amp; versatilidade em um instrumento.\nCom corpo em Basswood, este instrumento oferece um som equilibrado, com boa definição e excelente resposta em todas as frequências. O braço em Maple garante resistência e durabilidade.</p><h3>Disponível em três opções de cores:</h3><p>- Nude Wood;\n- Merlot;\n- Deep Dark\nO Theodor oferece um visual elegante e moderno.</p><h2>Principais características</h2><ul><li>Tipo: Contrabaixo elétrico</li><li>Corpo: Basswood</li><li>Braço: Maple</li><li>Escala: Rosewood</li><li>Comprimento de escala: 34\"</li><li>Raio da escala: 14\"</li></ul></section>",
    "features": [
      "Tipo: Contrabaixo elétrico",
      "Corpo: Basswood",
      "Braço: Maple",
      "Escala: Rosewood",
      "Comprimento de escala: 34\"",
      "Raio da escala: 14\""
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP108181"
      },
      {
        "label": "Tipo",
        "value": "Contrabaixo elétrico"
      },
      {
        "label": "Corpo",
        "value": "Basswood"
      },
      {
        "label": "Braço",
        "value": "Maple"
      },
      {
        "label": "Escala",
        "value": "Rosewood"
      },
      {
        "label": "Comprimento de escala",
        "value": "34\""
      },
      {
        "label": "Raio da escala",
        "value": "14\""
      },
      {
        "label": "Trastes",
        "value": "24"
      },
      {
        "label": "Cordas",
        "value": "4 cordas"
      },
      {
        "label": "Ponte",
        "value": "Standard"
      },
      {
        "label": "Tarraxas",
        "value": "Die-cast"
      },
      {
        "label": "Captação",
        "value": "2 Humbuckers estilo soapbar com ímãs cerâmicos"
      },
      {
        "label": "Equalização",
        "value": "Ativa"
      }
    ],
    "seoSlug": "contrabaixo-theodor-tonante",
    "productUrl": "https://tonante.com.br/contrabaixo-theodor-tonante",
    "oldPrice": "R$ 2.790,00",
    "oldPriceNum": 2790,
    "badge": "Promoção"
  },
  {
    "id": 12,
    "sku": "CP108180",
    "name": "Contrabaixo JazzMine Black",
    "price": "R$ 2.690,00",
    "priceNum": 2690,
    "rating": 4.8,
    "reviews": 41,
    "category": "Contrabaixos",
    "subcategory": "Jazz Bass",
    "tags": [
      "Contrabaixos",
      "4 cordas",
      "Passivo",
      "Black"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/1/0/108180_-17680210463088772.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/1/0/108180_-17680210463088772.jpeg"
    ],
    "inStock": true,
    "description": "A versão black do JazzMine. Mesmo timbre flexível, com atitude no visual.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>O JazzMine</h2><p>Foi desenvolvido com o objetivo de proporcionar aos músicos um timbre mais limpo e articulado. Um dos baixos mais flexíveis e amplamente utilizados em vários gêneros musicais.</p><h3>Design Próprio Tonante</h3><p>Nosso instrumento foi meticulosamente projetado, desde a modelação e acabamento da madeira, até ao cuidado e consideração de cada detalhe.</p><h3>Estilo para todos os gostos</h3><p>Outras cores estão disponíveis, elaboradas para satisfazer todos os estilos de artistas!</p><h2>Principais características</h2><ul><li>Tipo: Contrabaixo modelo JB 4 cordas</li><li>Corpo: Basswood</li><li>Braço: Maple</li><li>Escala: Rosewood</li><li>Tarraxas: Blindadas</li><li>Captação: Passiva</li></ul></section>",
    "features": [
      "Tipo: Contrabaixo modelo JB 4 cordas",
      "Corpo: Basswood",
      "Braço: Maple",
      "Escala: Rosewood",
      "Tarraxas: Blindadas",
      "Captação: Passiva"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP108180"
      },
      {
        "label": "Tipo",
        "value": "Contrabaixo modelo JB 4 cordas"
      },
      {
        "label": "Corpo",
        "value": "Basswood"
      },
      {
        "label": "Braço",
        "value": "Maple"
      },
      {
        "label": "Escala",
        "value": "Rosewood"
      },
      {
        "label": "Tarraxas",
        "value": "Blindadas"
      },
      {
        "label": "Captação",
        "value": "Passiva"
      },
      {
        "label": "Captadores",
        "value": "2 Single Coils estilo JB com ímãs cerâmicos"
      },
      {
        "label": "Controles",
        "value": "2 volumes, 1 tone"
      },
      {
        "label": "Trastes",
        "value": "21 Jumbo"
      },
      {
        "label": "Tensor",
        "value": "Dual Action"
      },
      {
        "label": "Marcadores",
        "value": "Dot"
      }
    ],
    "seoSlug": "contrabaixo-jazzmine-black-tonante",
    "productUrl": "https://tonante.com.br/contrabaixo-jazzmine-black-tonante"
  },
  {
    "id": 13,
    "sku": "CP338667",
    "name": "Capotraste Tonante Alumínio",
    "price": "R$ 89,00",
    "priceNum": 89,
    "rating": 4.7,
    "reviews": 274,
    "category": "Acessórios",
    "subcategory": "Capotraste",
    "tags": [
      "Acessórios",
      "Capotraste",
      "Alumínio",
      "Mola"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/338667_-17773826708619782.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/338667_-17773826708619782.jpeg"
    ],
    "inStock": true,
    "description": "Pressão equilibrada que não desafina. Muda o tom da música sem mudar o jeito de tocar.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>Praticidade e precisão para acompanhar sua música</h2><p>Os Capotrastes Tonante CPT-30 foram desenvolvidos para proporcionar mudanças rápidas de tonalidade com segurança, conforto e praticidade. Disponíveis nas versões prata e preta, são ideais para violões com cordas de nylon, oferecendo excelente fixação e ótimo custo-benefício para músicos de todos os níveis.</p><h3>Leveza, resistência e encaixe seguro</h3><p>Produzidos em alumínio leve e resistente, os modelos CPT-30 garantem durabilidade e praticidade no uso diário. Seu sistema de encaixe facilita trocas rápidas durante apresentações, ensaios ou estudos, mantendo firmeza nas cordas e estabilidade na afinação.</p><h3>O acessório ideal para cada acorde</h3><p>Compactos, resistentes e fáceis de transportar, os Capotrastes Tonante CPT-30 oferecem conforto e praticidade para músicos que buscam agilidade nas mudanças de tom sem abrir mão da qualidade. Uma solução versátil para diferentes estilos musicais e momentos de performance.</p><h2>Principais características</h2><ul><li>Modelo: CPT-30</li><li>Indicação: Violões com cordas de nylon</li><li>Material: Alumínio</li><li>Cores: Prata</li><li>Estrutura: Leve e resistente</li><li>Peso: 60g</li></ul></section>",
    "features": [
      "Modelo: CPT-30",
      "Indicação: Violões com cordas de nylon",
      "Material: Alumínio",
      "Cores: Prata",
      "Estrutura: Leve e resistente",
      "Peso: 60g"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP338667"
      },
      {
        "label": "Modelo",
        "value": "CPT-30"
      },
      {
        "label": "Indicação",
        "value": "Violões com cordas de nylon"
      },
      {
        "label": "Material",
        "value": "Alumínio"
      },
      {
        "label": "Cores",
        "value": "Prata"
      },
      {
        "label": "Estrutura",
        "value": "Leve e resistente"
      },
      {
        "label": "Peso",
        "value": "60g"
      },
      {
        "label": "Dimensões",
        "value": "14 x 11 x 2 cm"
      },
      {
        "label": "Garantia",
        "value": "365 dias"
      },
      {
        "label": "Marca",
        "value": "Tonante"
      }
    ],
    "seoSlug": "capotraste-tonante-aluminio-tonante",
    "productUrl": "https://tonante.com.br/capotraste-tonante-aluminio-tonante",
    "badge": "Mais vendido"
  },
  {
    "id": 14,
    "sku": "CP330674",
    "name": "Suporte para Guitarra Dobrável",
    "price": "R$ 149,00",
    "priceNum": 149,
    "rating": 4.8,
    "reviews": 233,
    "category": "Acessórios",
    "subcategory": "Suporte de chão",
    "tags": [
      "Acessórios",
      "Suporte",
      "Universal",
      "Dobrável"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/330674-17715117783793699.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/330674-17715117783793699.jpeg"
    ],
    "inStock": true,
    "description": "Segurança, praticidade e estabilidade. Seu instrumento sempre em pé, sempre seguro.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>ESTRUTURA REFORÇADA E DESIGN FUNCIONAL</h2><p>Construído em ferro com componentes em ABS, o produto oferece alta resistência para uso contínuo. Conta com tubo de maior espessura e base com pés emborrachados, garantindo máxima estabilidade. Além disso, é dobrável e leve, sendo ideal para transporte prático e montagem rápida.</p><h3>PROTEÇÃO E FIRMEZA NO DIA A DIA</h3><p>Desenvolvido para manter sua guitarra segura e sempre pronta para uso.</p><h2>Principais características</h2><ul><li>Altura ajustável: 64–74 cm</li><li>Material: Ferro, ABS e esponja</li><li>Capacidade de carga: até 15 kg</li><li>Peso: 0,9 kg</li><li>Base: Borracha antiderrapante</li><li>Cor: Preto</li></ul></section>",
    "features": [
      "Altura ajustável: 64–74 cm",
      "Material: Ferro, ABS e esponja",
      "Capacidade de carga: até 15 kg",
      "Peso: 0,9 kg",
      "Base: Borracha antiderrapante",
      "Cor: Preto"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP330674"
      },
      {
        "label": "Altura ajustável",
        "value": "64–74 cm"
      },
      {
        "label": "Material",
        "value": "Ferro, ABS e esponja"
      },
      {
        "label": "Capacidade de carga",
        "value": "até 15 kg"
      },
      {
        "label": "Peso",
        "value": "0,9 kg"
      },
      {
        "label": "Base",
        "value": "Borracha antiderrapante"
      },
      {
        "label": "Cor",
        "value": "Preto"
      }
    ],
    "seoSlug": "suporte-para-guitarra-dobravel-tonante",
    "productUrl": "https://tonante.com.br/suporte-para-guitarra-dobravel-tonante"
  },
  {
    "id": 15,
    "sku": "CP342288",
    "name": "Encordoamento Violão Tonante",
    "price": "R$ 49,00",
    "priceNum": 49,
    "rating": 4.8,
    "reviews": 520,
    "category": "Cordas & Encordoamentos",
    "subcategory": "Jogo 6 cordas",
    "tags": [
      "Cordas & Encordoamentos",
      "Violão",
      "Aço"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/4/342288_1-17734961058253226.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/4/342288_1-17734961058253226.jpeg"
    ],
    "inStock": true,
    "description": "Timbre equilibrado, durabilidade e economia. O toque que muda tudo no seu violão.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>SOM DE QUALIDADE E ALTA RESISTÊNCIA</h2><p>Construído com liga de bronze 85/15 sobre núcleo hexagonal de aço estanhado. Timbre quente, brilhante e equilibrado, ideal para diversos estilos musicais.</p><h3>O SOM QUE ACOMPANHA SUA EVOLUÇÃO</h3><p>Pensado para músicos que buscam qualidade, praticidade e consistência no dia a dia.</p><h3>PRECISÃO NO DETALHE QUE FAZ DIFERENÇA</h3><p>O núcleo hexagonal em aço estanhado garante maior estabilidade de afinação e melhor fixação do enrolamento.\nIsso se traduz em mais firmeza, durabilidade e resposta sonora consistente ao tocar.</p><h2>Principais características</h2><ul><li>Tipo: Encordoamento para violão aço</li><li>Modelo: TNVA10B853</li><li>Calibre: .010 – .047</li><li>Tensão: Leve</li><li>Material: Bronze 85/15</li><li>Quantidade: 6 cordas</li></ul></section>",
    "features": [
      "Tipo: Encordoamento para violão aço",
      "Modelo: TNVA10B853",
      "Calibre: .010 – .047",
      "Tensão: Leve",
      "Material: Bronze 85/15",
      "Quantidade: 6 cordas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP342288"
      },
      {
        "label": "Tipo",
        "value": "Encordoamento para violão aço"
      },
      {
        "label": "Modelo",
        "value": "TNVA10B853"
      },
      {
        "label": "Calibre",
        "value": ".010 – .047"
      },
      {
        "label": "Tensão",
        "value": "Leve"
      },
      {
        "label": "Material",
        "value": "Bronze 85/15"
      },
      {
        "label": "Quantidade",
        "value": "6 cordas"
      },
      {
        "label": "Pack",
        "value": "3 jogos completos (embalados individualmente)"
      },
      {
        "label": "Corda extra",
        "value": "1ª Mi (.010)"
      }
    ],
    "seoSlug": "encordoamento-violao-tonante-tonante",
    "productUrl": "https://tonante.com.br/encordoamento-violao-tonante-tonante"
  },
  {
    "id": 16,
    "sku": "CP342290",
    "name": "Encordoamento Guitarra .010",
    "price": "R$ 45,00",
    "priceNum": 45,
    "rating": 4.7,
    "reviews": 388,
    "category": "Cordas & Encordoamentos",
    "subcategory": "Jogo 6 cordas",
    "tags": [
      "Cordas & Encordoamentos",
      "Guitarra",
      "Níquel"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/4/342290_1-17734961285921725.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/4/342290_1-17734961285921725.jpeg"
    ],
    "inStock": true,
    "description": "Calibre .010 em níquel. Bends macios e afinação estável pro seu som.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>MAIS DETALHES</h2><p>A escolha confiável de guitarristas brasileiros há décadas.\nPorque tocar bem também é confiar no que está no seu instrumento.</p><h3>APLICAÇÃO E USO</h3><p>Ideal para guitarristas que atuam em ensaios, estúdios e apresentações ao vivo.\nEntrega timbre definido, sustain prolongado e desempenho consistente em estilos como rock, blues e pop.</p><h3>NÚCLEO HEXAGONAL</h3><p>O formato Hex Core garante maior aderência do enrolamento, proporcionando estabilidade na afinação e consistência ao tocar.</p><h2>Principais características</h2><ul><li>Tipo: Encordoamento para guitarra</li><li>Modelo: TNGE10N3</li><li>Calibre: .010 – .046</li><li>Tensão: Leve</li><li>Material: Aço niquelado (Nickel Plated Steel) com núcleo hexagonal</li><li>Quantidade: 6 cordas</li></ul></section>",
    "features": [
      "Tipo: Encordoamento para guitarra",
      "Modelo: TNGE10N3",
      "Calibre: .010 – .046",
      "Tensão: Leve",
      "Material: Aço niquelado (Nickel Plated Steel) com núcleo hexagonal",
      "Quantidade: 6 cordas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP342290"
      },
      {
        "label": "Tipo",
        "value": "Encordoamento para guitarra"
      },
      {
        "label": "Modelo",
        "value": "TNGE10N3"
      },
      {
        "label": "Calibre",
        "value": ".010 – .046"
      },
      {
        "label": "Tensão",
        "value": "Leve"
      },
      {
        "label": "Material",
        "value": "Aço niquelado (Nickel Plated Steel) com núcleo hexagonal"
      },
      {
        "label": "Quantidade",
        "value": "6 cordas"
      },
      {
        "label": "Pack",
        "value": "3 jogos completos (embalados individualmente)"
      },
      {
        "label": "Corda extra",
        "value": "1ª Mi (.010)"
      }
    ],
    "seoSlug": "encordoamento-guitarra-010-tonante",
    "productUrl": "https://tonante.com.br/encordoamento-guitarra-010-tonante",
    "oldPrice": "R$ 59,00",
    "oldPriceNum": 59,
    "badge": "Promoção"
  },
  {
    "id": 17,
    "sku": "CP342291",
    "name": "Encordoamento Ukulele Soprano",
    "price": "R$ 39,00",
    "priceNum": 39,
    "rating": 4.8,
    "reviews": 133,
    "category": "Cordas & Encordoamentos",
    "subcategory": "Jogo ukulele soprano",
    "tags": [
      "Cordas & Encordoamentos",
      "Ukulele",
      "Nylon"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/4/342291_1-17734961521016850.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/4/342291_1-17734961521016850.jpeg"
    ],
    "inStock": true,
    "description": "Nylon branco para o som tropical e doce do ukulele soprano.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>CLAREZA EM CADA NOTA</h2><p>O nylon de alta densidade proporciona maior consistência e projeção sonora.</p><h3>APLICAÇÃO E USO</h3><p>Ideal para estudos, apresentações e momentos de descontração.\nEntrega um som doce, brilhante e característico, perfeito para destacar o ukulele em qualquer estilo ou ambiente.</p><h3>MAIS DETALHES</h3><p>A escolha ideal para quem busca qualidade com custo-benefício.\nO timbre que faz o ukulele brilhar em qualquer roda!</p><h2>Principais características</h2><ul><li>Tipo: Encordoamento para ukulele soprano</li><li>Modelo: TNUKSNW</li><li>Calibre: .023 – .028</li><li>Material: Nylon branco (White Nylon) de alta densidade</li><li>Quantidade de cordas: 4 cordas</li></ul></section>",
    "features": [
      "Tipo: Encordoamento para ukulele soprano",
      "Modelo: TNUKSNW",
      "Calibre: .023 – .028",
      "Material: Nylon branco (White Nylon) de alta densidade",
      "Quantidade de cordas: 4 cordas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP342291"
      },
      {
        "label": "Tipo",
        "value": "Encordoamento para ukulele soprano"
      },
      {
        "label": "Modelo",
        "value": "TNUKSNW"
      },
      {
        "label": "Calibre",
        "value": ".023 – .028"
      },
      {
        "label": "Material",
        "value": "Nylon branco (White Nylon) de alta densidade"
      },
      {
        "label": "Quantidade de cordas",
        "value": "4 cordas"
      }
    ],
    "seoSlug": "encordoamento-ukulele-soprano-tonante",
    "productUrl": "https://tonante.com.br/encordoamento-ukulele-soprano-tonante"
  },
  {
    "id": 18,
    "sku": "CP342295",
    "name": "Encordoamento Viola Caipira",
    "price": "R$ 55,00",
    "priceNum": 55,
    "rating": 4.9,
    "reviews": 97,
    "category": "Cordas & Encordoamentos",
    "subcategory": "Jogo viola 10 cordas",
    "tags": [
      "Cordas & Encordoamentos",
      "Viola",
      "Níquel",
      "Viola caipira"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/4/342295_1-17734962222599730.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/4/342295_1-17734962222599730.jpeg"
    ],
    "inStock": true,
    "description": "Níquel com bolinha para a viola caipira. Brilho e tradição em cada ponteado.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>TRADIÇÃO E RESISTÊNCIA NA CONSTRUÇÃO</h2><p>O revestimento em níquel com proteção anticorrosiva oferece maior vida útil e desempenho consistente.\nA construção com bolinha proporciona fixação segura e prática, mantendo a afinação estável no uso diário.</p><h3>APLICAÇÃO E USO</h3><p>Ideal para moda de viola e estilos da raiz brasileira.</p><h3>MAIS DETALHES</h3><p>Disponível nas versões Cebolão Ré (média) e Cebolão Mi (leve), atendendo diferentes preferências de tocabilidade.\nUm encordoamento feito para quem carrega a tradição da viola, com resistência e qualidade para acompanhar o dia a dia.</p><h2>Principais características</h2><ul><li>Tipo: Encordoamento para viola caipira</li><li>Modelo: TNVNL</li><li>Afinação: Cebolão em Mi</li><li>Tensão: Leve</li><li>Material: Aço com revestimento em níquel</li><li>Fixação: Com bolinha (ball end)</li></ul></section>",
    "features": [
      "Tipo: Encordoamento para viola caipira",
      "Modelo: TNVNL",
      "Afinação: Cebolão em Mi",
      "Tensão: Leve",
      "Material: Aço com revestimento em níquel",
      "Fixação: Com bolinha (ball end)"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP342295"
      },
      {
        "label": "Tipo",
        "value": "Encordoamento para viola caipira"
      },
      {
        "label": "Modelo",
        "value": "TNVNL"
      },
      {
        "label": "Afinação",
        "value": "Cebolão em Mi"
      },
      {
        "label": "Tensão",
        "value": "Leve"
      },
      {
        "label": "Material",
        "value": "Aço com revestimento em níquel"
      },
      {
        "label": "Fixação",
        "value": "Com bolinha (ball end)"
      },
      {
        "label": "Quantidade de cordas",
        "value": "10 cordas (5 pares)"
      }
    ],
    "seoSlug": "encordoamento-viola-caipira-tonante",
    "productUrl": "https://tonante.com.br/encordoamento-viola-caipira-tonante"
  },
  {
    "id": 19,
    "sku": "CP330641",
    "name": "Banqueta para Piano Estofada",
    "price": "R$ 279,00",
    "priceNum": 279,
    "rating": 4.8,
    "reviews": 88,
    "category": "Suportes",
    "subcategory": "Banqueta",
    "tags": [
      "Suportes",
      "Banqueta",
      "Estofada",
      "Preta"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/330641-17715117116978257.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/330641-17715117116978257.jpeg"
    ],
    "inStock": true,
    "description": "Estabilidade e conforto para uma performance sem cansaço, do ensaio ao show.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>ESTRUTURA REFORÇADA E DURÁVEL</h2><p>Construída em ferro de alta resistência, a estrutura conta com tubo de maior diâmetro, proporcionando mais firmeza no uso. Possui pés com borrachas antiderrapantes que evitam movimentos indesejados, além de um design simples, resistente e fácil de montar.</p><h3>FOCO TOTAL NA SUA EXECUÇÃO</h3><p>Desenvolvida para oferecer apoio estável e postura adequada ao pianista.</p><h2>Principais características</h2><ul><li>Altura fixa: 50 cm</li><li>Material da estrutura: Ferro</li><li>Peso líquido: 4 kg</li><li>Capacidade de carga: Até 150 kg</li><li>Acabamento: Pintura eletrostática</li><li>Cor: Preta</li></ul></section>",
    "features": [
      "Altura fixa: 50 cm",
      "Material da estrutura: Ferro",
      "Peso líquido: 4 kg",
      "Capacidade de carga: Até 150 kg",
      "Acabamento: Pintura eletrostática",
      "Cor: Preta"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP330641"
      },
      {
        "label": "Altura fixa",
        "value": "50 cm"
      },
      {
        "label": "Material da estrutura",
        "value": "Ferro"
      },
      {
        "label": "Peso líquido",
        "value": "4 kg"
      },
      {
        "label": "Capacidade de carga",
        "value": "Até 150 kg"
      },
      {
        "label": "Acabamento",
        "value": "Pintura eletrostática"
      },
      {
        "label": "Cor",
        "value": "Preta"
      }
    ],
    "seoSlug": "banqueta-para-piano-estofada-tonante",
    "productUrl": "https://tonante.com.br/banqueta-para-piano-estofada-tonante"
  },
  {
    "id": 20,
    "sku": "CP330516",
    "name": "Suporte para Teclado em X",
    "price": "R$ 199,00",
    "priceNum": 199,
    "rating": 4.7,
    "reviews": 110,
    "category": "Suportes",
    "subcategory": "Suporte teclado",
    "tags": [
      "Suportes",
      "Teclado",
      "Em X",
      "Ajustável"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/330516-17715115799083421.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/330516-17715115799083421.jpeg"
    ],
    "inStock": true,
    "description": "Estabilidade, praticidade e resistência. Altura ajustável pra tocar do seu jeito.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>RESISTENTE E AJUSTÁVEL</h2><h3>PENSADO PARA A ROTINA DO MÚSICO</h3><p>Esse suporte foi desenvolvido para oferecer segurança e liberdade ao tocar.</p><h2>Principais características</h2><ul><li>Modelo: Suporte X desmontável</li><li>Altura: 24–88 cm</li><li>Material: Ferro</li><li>Tubo: 25 mm</li><li>Peso: 1,52 kg</li><li>Material: Acabamento resistente</li></ul></section>",
    "features": [
      "Modelo: Suporte X desmontável",
      "Altura: 24–88 cm",
      "Material: Ferro",
      "Tubo: 25 mm",
      "Peso: 1,52 kg",
      "Material: Acabamento resistente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP330516"
      },
      {
        "label": "Modelo",
        "value": "Suporte X desmontável"
      },
      {
        "label": "Altura",
        "value": "24–88 cm"
      },
      {
        "label": "Material",
        "value": "Ferro"
      },
      {
        "label": "Tubo",
        "value": "25 mm"
      },
      {
        "label": "Peso",
        "value": "1,52 kg"
      },
      {
        "label": "Material",
        "value": "Acabamento resistente"
      }
    ],
    "seoSlug": "suporte-para-teclado-em-x-tonante",
    "productUrl": "https://tonante.com.br/suporte-para-teclado-em-x-tonante",
    "oldPrice": "R$ 249,00",
    "oldPriceNum": 249,
    "badge": "Promoção"
  },
  {
    "id": 21,
    "sku": "CP330543",
    "name": "Suporte Tripé para Caixa de Som",
    "price": "R$ 249,00",
    "priceNum": 249,
    "rating": 4.7,
    "reviews": 76,
    "category": "Suportes",
    "subcategory": "Tripé caixa",
    "tags": [
      "Suportes",
      "Caixa de som",
      "Tripé",
      "Ajustável"
    ],
    "brand": "Tonante",
    "image": "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/330543-17715116245403064.jpeg",
    "images": [
      "https://www.oderco.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/3/3/330543-17715116245403064.jpeg"
    ],
    "inStock": true,
    "description": "Estabilidade, altura ajustável e praticidade pra levar o seu som mais alto.",
    "htmlDescription": "<section class=\"produto-descricao\"><h2>DOBRÁVEL, RESISTENTE E FÁCIL DE TRANSPORTAR</h2><p>Com design dobrável que facilita o transporte e otimiza o espaço, o suporte une praticidade e robustez em cada detalhe. Sua estrutura reforçada oferece alta capacidade de carga, enquanto a base triangular garante equilíbrio superior, proporcionando mais segurança e estabilidade durante o uso.</p><h3>MAIS SEGURANÇA PARA SUA SONORIZAÇÃO</h3><p>Desenvolvido para garantir firmeza e estabilidade na instalação de caixas de som, o suporte conta com ajuste de altura para melhor projeção do áudio, oferecendo praticidade na montagem e segurança no uso em qualquer situação.</p><h2>Principais características</h2><ul><li>Versao: DisplayPort 2.1</li><li>Comprimento: 2 metros</li><li>Altura ajustável: 99–176 cm (7 níveis)</li></ul></section>",
    "features": [
      "Versao: DisplayPort 2.1",
      "Comprimento: 2 metros",
      "Altura ajustável: 99–176 cm (7 níveis)"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "CP330543"
      },
      {
        "label": "Versao",
        "value": "DisplayPort 2.1"
      },
      {
        "label": "Comprimento",
        "value": "2 metros"
      },
      {
        "label": "Altura ajustável",
        "value": "99–176 cm (7 níveis)"
      }
    ],
    "seoSlug": "suporte-tripe-para-caixa-de-som-tonante",
    "productUrl": "https://tonante.com.br/suporte-tripe-para-caixa-de-som-tonante"
  }
];

function withSyntheticDiscount(p: Product): Product {
  if (p.oldPriceNum && p.oldPriceNum > p.priceNum) return p;
  const hash = (p.id * 17 + 23) % 100;
  let pct = 0;
  if (hash >= 78 && hash < 90) pct = 10 + (p.id % 6);
  else if (hash >= 90) pct = 15 + (p.id % 5);
  if (pct === 0) return p;
  const oldPriceNum = Math.round((p.priceNum / (1 - pct / 100)) * 100) / 100;
  const oldPrice = `R$ ${oldPriceNum.toFixed(2).replace(".", ",")}`;
  return { ...p, oldPriceNum, oldPrice };
}

export const allProducts: Product[] = rawProducts.map(withSyntheticDiscount);

export const categories = ["Violões","Guitarras","Contrabaixos","Acessórios","Cordas & Encordoamentos","Suportes"];
export const allTags = ["Violões","Nylon","Para iniciantes","Clássico","Aço","Tampo maciço","Eletroacústico","Captação ativa","Premium","Black","Natural","Guitarras","Humbucker","6 cordas","Single-coil","Tremolo","HSS","Edição limitada","Contrabaixos","4 cordas","Passivo","Split-coil","Acessórios","Capotraste","Alumínio","Mola","Suporte","Universal","Dobrável","Cordas & Encordoamentos","Violão","Guitarra","Níquel","Ukulele","Viola","Viola caipira","Suportes","Banqueta","Estofada","Preta","Teclado","Em X","Ajustável","Caixa de som","Tripé"];
export const brands = ["Tonante"];
