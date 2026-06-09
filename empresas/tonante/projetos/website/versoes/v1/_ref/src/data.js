/* Tonante — catálogo. Mescla dados curados + dados reais (CSV: imagens, specs, descrição). */
window.TONANTE_DATA = (function () {
  const REAL = window.TONANTE_REAL || [];
  const realBySku = {}; REAL.forEach(function (r) { realBySku[r.sku] = r; });

  const categories = [
    { id: "violoes", label: "Violões", count: 0, blurb: "A alma da Tonante desde 1954." },
    { id: "guitarras", label: "Guitarras", count: 0, blurb: "Para quem leva o palco a sério." },
    { id: "contrabaixos", label: "Contrabaixos", count: 0, blurb: "O peso certo do groove." },
    { id: "acessorios", label: "Acessórios", count: 0, blurb: "O que completa o seu som." },
    { id: "cordas", label: "Cordas & Encordoamentos", count: 0, blurb: "O toque que muda tudo." },
    { id: "suportes", label: "Suportes", count: 0, blurb: "Seu instrumento sempre seguro." },
  ];

  // tons quentes de madeira — só para placeholders (produtos sem foto)
  const tones = {
    mogno:   ["#B5793C", "#6E4220"],
    spruce:  ["#D2A86A", "#9A6A33"],
    natural: ["#C9A06A", "#8A5E2C"],
    ebony:   ["#4A3A2C", "#211711"],
    amber:   ["#D98A22", "#9A5A00"],
    bronze:  ["#A8772F", "#6A4516"],
    cherry:  ["#7E3A24", "#3E160E"],
    black:   ["#3A352F", "#16130F"],
    blue:    ["#3F6E8C", "#1E3848"],
  };

  let P = [
    // VIOLÕES (linhas Tonante — foto em breve, placeholder quente)
    { name: "Violão Lorenzzo", cat: "violoes", price: 1190, old: null, tone: "natural", badge: null, tag: "Nylon · Clássico", rating: 4.7, reviews: 488, form: "Clássico nylon", attrs: ["Nylon", "Para iniciantes"],
      desc: "O clássico que abre portas. Cordas de nylon, braço macio e timbre redondo — o primeiro violão de muita gente." },
    { name: "Violão Coral", cat: "violoes", price: 1690, old: 1990, tone: "mogno", badge: "Mais vendido", tag: "Aço · Tampo maciço", rating: 4.9, reviews: 327, form: "Folk aço", attrs: ["Aço", "Tampo maciço"],
      desc: "Folk de tampo maciço com fundo em mogno. Som encorpado e quente, que envelhece bonito com você." },
    { name: "Violão Volcano", cat: "violoes", price: 1990, old: 2290, tone: "spruce", badge: "Mais vendido", tag: "Eletroacústico · Captação ativa", rating: 4.8, reviews: 366, form: "Eletroacústico", attrs: ["Eletroacústico", "Aço"],
      desc: "Pré-amplificador ativo com afinador embutido. Feito pra sair do quarto e encarar o palco sem perder o calor da madeira." },
    { name: "Violão Etna", cat: "violoes", price: 2490, old: null, tone: "mogno", badge: "Edição especial", tag: "Eletroacústico · Premium", rating: 4.9, reviews: 142, form: "Eletroacústico premium", attrs: ["Eletroacústico", "Tampo maciço"],
      desc: "O topo da linha. Madeiras selecionadas, acabamento impecável e uma projeção que preenche o ambiente." },
    { name: "Violão Ônix", cat: "violoes", price: 1790, old: null, tone: "ebony", badge: null, tag: "Aço · Black", rating: 4.7, reviews: 173, form: "Folk black", attrs: ["Aço"],
      desc: "Folk em acabamento preto acetinado. Elegância escura pra quem quer atitude no visual e no som." },
    { name: "Violão Citrino", cat: "violoes", price: 1490, old: 1690, tone: "natural", badge: null, tag: "Nylon · Natural", rating: 4.6, reviews: 211, form: "Clássico natural", attrs: ["Nylon", "Para iniciantes"],
      desc: "O brilho jovem da Tonante. Leve, claro e fácil de tocar — combina com qualquer estilo." },

    // GUITARRAS (fotos reais)
    { sku: "CP108169", name: "Guitarra Valentine's", cat: "guitarras", price: 2390, old: 2690, tone: "ebony", badge: "Mais vendido", tag: "Humbucker · 6 cordas", rating: 4.8, reviews: 188, form: "Les Paul", attrs: ["Humbucker", "6 cordas"],
      desc: "Corpo encorpado e dois humbuckers com presença de sobra. Peso, calor e sustain pra quem leva o palco a sério." },
    { sku: "CP108173", name: "Guitarra Cecille", cat: "guitarras", price: 2790, old: 3190, tone: "cherry", badge: "Novidade", tag: "Single-coil · 6 cordas", rating: 4.8, reviews: 96, form: "Stratocaster", attrs: ["Single-coil", "Tremolo"],
      desc: "Três captadores single-coil, ponte tremolo e sustain de sobra. Versatilidade do limpo ao crocante." },
    { sku: "CP360331", name: "Guitarra 70th Anniversary", cat: "guitarras", price: 3490, old: null, tone: "ebony", badge: "Edição 70 anos", tag: "Edição limitada · HSS", rating: 4.9, reviews: 54, form: "Edição comemorativa", attrs: ["HSS", "6 cordas"],
      desc: "Edição comemorativa de 70 anos da Tonante. Acabamento exclusivo e versatilidade HSS pra todos os estilos." },

    // CONTRABAIXOS (fotos reais)
    { sku: "CP108177", name: "Contrabaixo JazzMine", cat: "contrabaixos", price: 2590, old: null, tone: "bronze", badge: "Mais vendido", tag: "4 cordas · Passivo", rating: 4.8, reviews: 64, form: "Jazz Bass", attrs: ["4 cordas", "Passivo"],
      desc: "Dois captadores single-coil estilo JB e corpo leve. O groove limpo e articulado que segura a banda inteira." },
    { sku: "CP108181", name: "Contrabaixo Theodor", cat: "contrabaixos", price: 2390, old: 2790, tone: "ebony", badge: "Promoção", tag: "4 cordas · Split-coil", rating: 4.7, reviews: 52, form: "Precision Bass", attrs: ["4 cordas", "Passivo"],
      desc: "O contrabaixo de toda gravadora. Punch grave e definição que atravessa qualquer mix." },
    { sku: "CP108180", name: "Contrabaixo JazzMine Black", cat: "contrabaixos", price: 2690, old: null, tone: "ebony", badge: null, tag: "4 cordas · Black", rating: 4.8, reviews: 41, form: "Jazz Bass", attrs: ["4 cordas", "Passivo"],
      desc: "A versão black do JazzMine. Mesmo timbre flexível, com atitude no visual." },

    // ACESSÓRIOS (fotos reais)
    { sku: "CP338667", name: "Capotraste Tonante Alumínio", cat: "acessorios", price: 89, old: null, tone: "ebony", badge: "Mais vendido", tag: "Alumínio · Mola", rating: 4.7, reviews: 274, form: "Capotraste", attrs: ["Capotraste"],
      desc: "Pressão equilibrada que não desafina. Muda o tom da música sem mudar o jeito de tocar." },
    { sku: "CP330674", name: "Suporte para Guitarra Dobrável", cat: "acessorios", price: 149, old: null, tone: "ebony", badge: null, tag: "Universal · Dobrável", rating: 4.8, reviews: 233, form: "Suporte de chão", attrs: ["Suporte"],
      desc: "Segurança, praticidade e estabilidade. Seu instrumento sempre em pé, sempre seguro." },

    // CORDAS & ENCORDOAMENTOS (fotos reais)
    { sku: "CP342288", name: "Encordoamento Violão Tonante", cat: "cordas", price: 49, old: null, tone: "bronze", badge: null, tag: "Aço · Violão", rating: 4.8, reviews: 520, form: "Jogo 6 cordas", attrs: ["Violão"],
      desc: "Timbre equilibrado, durabilidade e economia. O toque que muda tudo no seu violão." },
    { sku: "CP342290", name: "Encordoamento Guitarra .010", cat: "cordas", price: 45, old: 59, tone: "amber", badge: "Promoção", tag: "Níquel · Guitarra", rating: 4.7, reviews: 388, form: "Jogo 6 cordas", attrs: ["Guitarra"],
      desc: "Calibre .010 em níquel. Bends macios e afinação estável pro seu som." },
    { sku: "CP342291", name: "Encordoamento Ukulele Soprano", cat: "cordas", price: 39, old: null, tone: "natural", badge: null, tag: "Nylon · Ukulele", rating: 4.8, reviews: 133, form: "Jogo ukulele soprano", attrs: ["Ukulele"],
      desc: "Nylon branco para o som tropical e doce do ukulele soprano." },
    { sku: "CP342295", name: "Encordoamento Viola Caipira", cat: "cordas", price: 55, old: null, tone: "bronze", badge: null, tag: "Níquel · Viola caipira", rating: 4.9, reviews: 97, form: "Jogo viola 10 cordas", attrs: ["Viola"],
      desc: "Níquel com bolinha para a viola caipira. Brilho e tradição em cada ponteado." },

    // SUPORTES (fotos reais)
    { sku: "CP330641", name: "Banqueta para Piano Estofada", cat: "suportes", price: 279, old: null, tone: "ebony", badge: null, tag: "Estofada · Preta", rating: 4.8, reviews: 88, form: "Banqueta", attrs: ["Banqueta"],
      desc: "Estabilidade e conforto para uma performance sem cansaço, do ensaio ao show." },
    { sku: "CP330516", name: "Suporte para Teclado em X", cat: "suportes", price: 199, old: 249, tone: "ebony", badge: "Promoção", tag: "Em X · Ajustável", rating: 4.7, reviews: 110, form: "Suporte teclado", attrs: ["Teclado"],
      desc: "Estabilidade, praticidade e resistência. Altura ajustável pra tocar do seu jeito." },
    { sku: "CP330543", name: "Suporte Tripé para Caixa de Som", cat: "suportes", price: 249, old: null, tone: "ebony", badge: null, tag: "Tripé · Ajustável", rating: 4.7, reviews: 76, form: "Tripé caixa", attrs: ["Caixa de som"],
      desc: "Estabilidade, altura ajustável e praticidade pra levar o seu som mais alto." },
  ];

  P = P.map(function (p, i) {
    const install = Math.min(12, Math.max(1, Math.round(p.price / 250)));
    const real = p.sku ? realBySku[p.sku] : null;
    let images = [];
    if (real) {
      // recortes de produto (preenchem o quadrado) — evita banners horizontais
      images = [real.hero, real.specImg, real.card1 && real.card1.img, real.card2 && real.card2.img].filter(Boolean);
      if (images.length < 2) images = images.concat(real.lateral || []).concat(real.galeria || []).filter(Boolean);
      images = images.filter(function (u, k) { return images.indexOf(u) === k; }).slice(0, 4);
    }
    return Object.assign({}, p, {
      id: "t-" + (i + 1),
      tones: tones[p.tone] || tones.amber,
      installments: install,
      sku: p.sku || ("TON-" + (10000 + i * 137 % 89999)),
      stock: 3 + (i * 7) % 16,
      pix: Math.round(p.price * 0.9 * 100) / 100,
      discount: p.old ? Math.round((1 - p.price / p.old) * 100) : null,
      attrs: p.attrs || [],
      img: real ? real.hero : null,
      images: images,
      real: real || null,
    });
  });

  // atributos por categoria (filtros inteligentes)
  function attrsForCat(cat) {
    const pool = P.filter(function (p) { return cat === "all" || p.cat === cat; });
    const set = [];
    pool.forEach(function (p) { (p.attrs || []).forEach(function (a) { if (set.indexOf(a) < 0) set.push(a); }); });
    return set;
  }

  const violaoLines = [
    { name: "Coral", model: "Violão Coral", vibe: "Calor de roda de bar", tone: "mogno", desc: "Madeira escura, som encorpado. A linha que aquece qualquer roda e pede uma canção de boteco." },
    { name: "Volcano", model: "Violão Volcano", vibe: "Energia que erupciona", tone: "spruce", desc: "Eletroacústico pronto pro palco. Projeção potente pra quem toca pra ser ouvido." },
    { name: "Etna", model: "Violão Etna", vibe: "Intensidade premium", tone: "mogno", desc: "O topo da linha. Madeiras nobres e um som que preenche o ambiente do primeiro acorde." },
    { name: "Ônix", model: "Violão Ônix", vibe: "Elegância na escuridão", tone: "ebony", desc: "Preto acetinado, atitude pura. Pra quem quer presença no visual e no timbre." },
    { name: "Citrino", model: "Violão Citrino", vibe: "Brilho jovem", tone: "natural", desc: "Leve e claro, fácil de tocar. O som que combina com o primeiro show e o primeiro amor." },
    { name: "Lorenzzo", model: "Violão Lorenzzo", vibe: "Tradição clássica", tone: "natural", desc: "Nylon atemporal. O clássico que ensinou gerações inteiras a tocar." },
  ];

  const dealers = [
    { name: "Akustica Musical", city: "Caxias do Sul", uf: "RS", region: "Sul", addr: "R. Mal. Floriano, 1005 - Pio X", cep: "95020-370", phone: "(54) 3536-0228", hours: "Seg–Sáb · 9h às 18h", mx: 582, my: 918 },
    { name: "Ponto Musical", city: "Marília", uf: "SP", region: "Sudeste", addr: "Av. Tiradentes, 1131 - Fragata", cep: "17519-000", phone: "(14) 99892-9195", hours: "Seg–Dom · 9h às 19h", mx: 613, my: 733 },
    { name: "Som & Cia", city: "São Paulo", uf: "SP", region: "Sudeste", addr: "R. Teodoro Sampaio, 820 - Pinheiros", cep: "05406-000", phone: "(11) 3061-2200", hours: "Seg–Sáb · 10h às 20h", mx: 699, my: 769 },
    { name: "Casa do Violão", city: "Rio de Janeiro", uf: "RJ", region: "Sudeste", addr: "Av. Rio Branco, 156 - Centro", cep: "20040-901", phone: "(21) 2533-1100", hours: "Seg–Sáb · 9h às 19h", mx: 786, my: 752 },
    { name: "Musical Capital", city: "Brasília", uf: "DF", region: "Centro-Oeste", addr: "SCS Quadra 2, Bloco C - Asa Sul", cep: "70302-000", phone: "(61) 3225-7788", hours: "Seg–Sáb · 9h às 18h", mx: 667, my: 562 },
    { name: "Nordeste Music", city: "Recife", uf: "PE", region: "Nordeste", addr: "Av. Conde da Boa Vista, 1450", cep: "50060-002", phone: "(81) 3221-4040", hours: "Seg–Sáb · 9h às 18h", mx: 992, my: 355 },
    { name: "Bahia Sonora", city: "Salvador", uf: "BA", region: "Nordeste", addr: "Av. Sete de Setembro, 300 - Centro", cep: "40060-001", phone: "(71) 3322-9090", hours: "Seg–Sáb · 9h às 18h", mx: 905, my: 487 },
    { name: "Amazônia Instrumentos", city: "Manaus", uf: "AM", region: "Norte", addr: "Av. Eduardo Ribeiro, 520 - Centro", cep: "69010-001", phone: "(92) 3234-5050", hours: "Seg–Sáb · 9h às 17h", mx: 357, my: 224 },
    { name: "Sul Música", city: "Curitiba", uf: "PR", region: "Sul", addr: "R. XV de Novembro, 700 - Centro", cep: "80020-310", phone: "(41) 3014-6060", hours: "Seg–Sáb · 9h às 19h", mx: 631, my: 819 },
    { name: "Minas Som", city: "Belo Horizonte", uf: "MG", region: "Sudeste", addr: "Av. Afonso Pena, 1200 - Centro", cep: "30130-003", phone: "(31) 3271-3030", hours: "Seg–Sáb · 9h às 18h", mx: 768, my: 672 },
  ];

  function aboutFor(p) {
    if (p.real && p.real.ficha && p.real.ficha.length) {
      return p.real.ficha.slice(0, 6).map(function (f) { return f.k + ": " + f.v; });
    }
    return [
      p.tag.replace(/ · /g, " e "),
      "Formato " + p.form,
      "Acabamento Tonante de fábrica",
      "Garantia de 2 anos contra defeitos",
      "Pronta entrega · envio em 24h",
      "Tradição brasileira desde 1954",
    ];
  }

  function specsFor(p) {
    if (p.real && p.real.ficha && p.real.ficha.length) return p.real.ficha;
    const cat = categories.find(function (c) { return c.id === p.cat; });
    return [{ k: "Formato", v: p.form }, { k: "Categoria", v: cat ? cat.label : "—" }, { k: "Marca", v: "Tonante" }, { k: "Garantia", v: "2 anos" }, { k: "Origem", v: "Brasil · desde 1954" }];
  }

  function sectionsFor(p) {
    return [
      { title: "Feita para durar", text: p.desc + " Cada detalhe é pensado para acompanhar você por muitos anos de música." },
      { title: "Cuidado de quem entende", text: "Mais de meio século de experiência em cada instrumento. Materiais selecionados e controle de qualidade rigoroso, do galpão ao palco." },
      { title: "Pronta para o palco", text: "Sai da caixa afinada e ajustada. É só conectar (ou dedilhar) e começar a sua próxima história." },
    ];
  }

  const reviews = [
    { name: "Ricardo M.", rating: 5, date: "24 Mar 2026", verified: true, helpful: 12, text: "Simplesmente incrível. O acabamento é premium e o som superou minhas expectativas. Recomendo demais." },
    { name: "Juliana S.", rating: 5, date: "15 Mar 2026", verified: true, helpful: 8, text: "Comprei pra minha filha que está começando e ela amou. Afinação estável e muito confortável de tocar." },
    { name: "André P.", rating: 4, date: "02 Mar 2026", verified: true, helpful: 5, text: "Ótimo custo-benefício. Chegou rápido e bem embalado. Tirei uma estrela só pela embalagem." },
    { name: "Camila R.", rating: 5, date: "21 Fev 2026", verified: true, helpful: 17, text: "Toco há anos e a Tonante me surpreendeu de novo. Tradição que entrega. Já é meu instrumento principal." },
    { name: "Bruno L.", rating: 5, date: "10 Fev 2026", verified: false, helpful: 3, text: "Atendimento nota dez e produto melhor ainda. Feita de histórias mesmo. Voltarei a comprar." },
  ];

  categories.forEach(function (c) { c.count = P.filter(function (p) { return p.cat === c.id; }).length; });
  function catImage(catId) { const f = P.find(function (p) { return p.cat === catId && p.img; }); return f ? f.img : null; }
  function brl(n) { return "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  return { categories: categories, products: P, tones: tones, brl: brl, reviews: reviews, aboutFor: aboutFor, specsFor: specsFor, sectionsFor: sectionsFor, attrsForCat: attrsForCat, catImage: catImage, violaoLines: violaoLines, dealers: dealers };
})();
