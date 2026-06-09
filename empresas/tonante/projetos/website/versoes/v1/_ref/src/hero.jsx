/* =========================================================
   TONANTE — Hero (2 variantes: editorial / cinematográfico)
   ========================================================= */

/* disco de vinil decorativo com texto curvo + símbolo */
function VinylDisc({ size = 460, dark = false }) {
  const id = "vp" + Math.round(size);
  return (
    <div style={{ position: "relative", width: size, height: size, maxWidth: "100%" }}>
      {/* disco */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: dark
          ? "repeating-radial-gradient(circle at 50% 50%, #1b1813 0 2px, #232019 2px 4px), radial-gradient(circle, #2a251d, #0d0b08)"
          : "repeating-radial-gradient(circle at 50% 50%, #221d16 0 2px, #2c261d 2px 4px)",
        boxShadow: "var(--sh-float), inset 0 0 60px rgba(0,0,0,.5)",
        animation: "spin 26s linear infinite" }}>
        {/* label central */}
        <div style={{ position: "absolute", inset: "33%", borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, var(--amber-bright), var(--amber-deep))",
          display: "grid", placeItems: "center", boxShadow: "inset 0 0 0 6px rgba(0,0,0,.15)" }}>
          <img src="assets/logos/tonante-symbol-white.png" alt="" style={{ width: "56%", opacity: .96 }} />
          <span style={{ position: "absolute", width: 12, height: 12, borderRadius: "50%", background: "#0d0b08", boxShadow: "0 0 0 4px rgba(255,255,255,.15)" }} />
        </div>
      </div>
      {/* texto curvo girando (contra) */}
      <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: "-3%", width: "106%", height: "106%", animation: "spin 40s linear infinite reverse" }}>
        <defs><path id={id} d="M200,200 m-168,0 a168,168 0 1,1 336,0 a168,168 0 1,1 -336,0" /></defs>
        <text fill={dark ? "rgba(255,255,255,.5)" : "var(--amber-deep)"} style={{ fontFamily: "var(--sans)", fontSize: 17, fontWeight: 700, letterSpacing: "6px", textTransform: "uppercase" }}>
          <textPath href={"#" + id} startOffset="0%">TONANTE · FEITA DE HISTÓRIAS · DESDE 1954 · REI DOS VIOLÕES · </textPath>
        </text>
      </svg>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* HERO A — editorial claro */
function HeroEditorial() {
  const { go, addToCart } = useStore();
  const featured = D.products.find(p => p.name.includes("Etna")) || D.products[0];
  return (
    <section style={{ position: "relative", overflow: "hidden", paddingBottom: 40 }}>
      {/* símbolo gigante de fundo */}
      <img src="assets/logos/tonante-symbol-black.png" alt="" aria-hidden="true"
        style={{ position: "absolute", right: "-7%", top: "-12%", width: 560, opacity: .04, pointerEvents: "none", transform: "rotate(8deg)" }} />
      <div className="wrap" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.04fr .96fr", gap: 48, alignItems: "center", paddingTop: "clamp(36px,5vw,70px)" }}>
        {/* texto */}
        <div className="hero-copy">
          <div className="label reveal" style={{ color: "var(--amber-deep)", marginBottom: 22 }}>Instrumentos musicais · Desde 1954</div>
          <h1 className="display reveal" style={{ margin: 0, fontSize: "clamp(50px, 8.2vw, 112px)", lineHeight: .9, animationDelay: ".05s" }}>
            Feita de<br /><span style={{ fontStyle: "italic", color: "var(--amber)" }}>Histórias</span>.
          </h1>
          <p className="reveal" style={{ fontSize: "clamp(16px,1.4vw,19px)", color: "var(--ink-soft)", maxWidth: 480, marginTop: 26, lineHeight: 1.6, animationDelay: ".12s" }}>
            Marca brasileira tradicional, renovada. Violões, guitarras e tudo que conecta gente à música —
            com o cuidado de quem faz instrumentos há mais de meio século.
          </p>
          <div className="reveal" style={{ display: "flex", gap: 13, marginTop: 34, flexWrap: "wrap", animationDelay: ".2s" }}>
            <Btn variant="primary" size="lg" iconRight="arrow-right" onClick={() => go("products")}>Explorar a loja</Btn>
            <Btn variant="outline" size="lg" iconLeft="guitar" onClick={() => go("products", "violoes")}>Ver violões</Btn>
          </div>
          <div className="reveal" style={{ display: "flex", gap: 38, marginTop: 46, animationDelay: ".28s" }}>
            {[["70+", "anos de história"], ["6", "famílias de produto"], ["4.8", "nota dos clientes"]].map(([n, l], i) => (
              <div key={i}>
                <div className="display num" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{n}</div>
                <div className="label" style={{ fontSize: 9.5, marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* showcase */}
        <div className="hero-show reveal" style={{ position: "relative", display: "grid", placeItems: "center", minHeight: 480, animationDelay: ".18s" }}>
          <VinylDisc size={420} />
          {/* produto flutuante */}
          <div style={{ position: "absolute", width: 230, right: "6%", bottom: "4%", transform: "rotate(-4deg)", filter: "drop-shadow(0 30px 50px rgba(0,0,0,.4))" }}>
            <div style={{ width: 230 }}><ProductMedia p={featured} ratio="3 / 4" watermark={true} hoverZoom={false} /></div>
          </div>
          {/* card de preço flutuante */}
          <div onClick={() => go("product", featured)} style={{ position: "absolute", left: "0%", top: "10%", background: "var(--surface)", border: "1px solid var(--hairline)",
            borderRadius: "var(--r-lg)", padding: "16px 18px", boxShadow: "var(--sh-pop)", cursor: "pointer", maxWidth: 215, animation: "floaty 6s var(--ease) infinite" }}>
            <Tag tone="amber" style={{ marginBottom: 10 }}>Destaque</Tag>
            <div className="display" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.05 }}>{featured.name}</div>
            <div style={{ marginTop: 8 }}><Price p={featured} size="sm" showInstall={false} /></div>
          </div>
          <style>{`@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
        </div>
      </div>
    </section>
  );
}

/* HERO B — cinematográfico escuro */
function HeroCinematic() {
  const { go } = useStore();
  const featured = D.products.find(p => p.name.includes("Cecille")) || D.products[8];
  return (
    <section className="grain" style={{ position: "relative", overflow: "hidden", background: "radial-gradient(120% 90% at 50% -10%, #2a241b 0%, var(--stage) 55%, #0c0a07 100%)", color: "#f3ebde" }}>
      {/* spotlight */}
      <div style={{ position: "absolute", left: "50%", top: "-30%", width: 900, height: 900, transform: "translateX(-50%)",
        background: "radial-gradient(circle, rgba(200,120,0,.28), transparent 60%)", pointerEvents: "none" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2, paddingTop: "clamp(56px,7vw,96px)", paddingBottom: "clamp(48px,6vw,84px)", textAlign: "center" }}>
        <div className="label reveal" style={{ color: "var(--amber)", marginBottom: 26 }}>O palco é seu · Desde 1954</div>
        <h1 className="display reveal" style={{ margin: "0 auto", fontSize: "clamp(48px, 9vw, 124px)", lineHeight: .88, animationDelay: ".05s" }}>
          <span style={{ display: "block" }}>Feita de</span>
          <span style={{ display: "block", fontStyle: "italic", color: "var(--amber)" }}>Histórias</span>
        </h1>
        <p className="reveal" style={{ fontSize: 18.5, color: "#d8cdba", maxWidth: 520, margin: "26px auto 0", lineHeight: 1.6, animationDelay: ".12s" }}>
          Do quarto ao palco. Instrumentos pensados para acompanhar cada capítulo da sua música.
        </p>
        {/* produto em destaque */}
        <div className="reveal" style={{ position: "relative", display: "grid", placeItems: "center", margin: "20px auto 0", width: 300, animationDelay: ".2s" }}>
          <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,120,0,.35), transparent 65%)", filter: "blur(10px)" }} />
          <div style={{ position: "relative", width: 270, transform: "rotate(-3deg)", filter: "drop-shadow(0 40px 60px rgba(0,0,0,.6))" }}>
            <ProductMedia p={featured} ratio="3 / 4" />
          </div>
        </div>
        <div className="reveal" style={{ display: "flex", gap: 13, marginTop: 30, justifyContent: "center", flexWrap: "wrap", animationDelay: ".28s" }}>
          <Btn variant="primary" size="lg" iconRight="arrow-right" onClick={() => go("products")}>Explorar a loja</Btn>
          <Btn variant="ondark" size="lg" iconLeft="play-circle" onClick={() => go("product", featured)}>Conhecer destaque</Btn>
        </div>
      </div>
      {/* waveform */}
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ position: "relative", display: "block", width: "100%", height: 56, opacity: .5 }}>
        {Array.from({ length: 90 }).map((_, i) => {
          const h = 6 + Math.abs(Math.sin(i * 0.5)) * 42 * (0.5 + Math.random() * 0.5);
          return <rect key={i} x={i * 13.4 + 4} y={30 - h / 2} width="4" height={h} rx="2" fill="var(--amber)" />;
        })}
      </svg>
    </section>
  );
}

/* ---------- HERO C — carrossel de banners centralizado (estilo grupo) ---------- */
function BannerSlide({ s, active, onCta }) {
  const [a, b] = s.tones;
  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: "var(--r-lg)", overflow: "hidden",
      background: `radial-gradient(120% 130% at 78% 12%, ${a}, ${b})`, color: "#fff", boxShadow: active ? "var(--sh-float)" : "none" }}>
      <div className="grain" style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 90% at 18% 30%, rgba(0,0,0,.30), transparent 60%)" }} />
      {/* símbolo grande */}
      <img src="assets/logos/tonante-symbol-white.png" alt="" style={{ position: "absolute", right: "-4%", bottom: "-22%", width: "46%", opacity: .14, transform: "rotate(-8deg)" }} />
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "grid", gridTemplateColumns: "1.15fr .85fr", alignItems: "center", gap: 24, padding: "clamp(26px,4vw,60px)" }}>
        <div>
          <span className="label" style={{ color: "rgba(255,255,255,.85)" }}>{s.kicker}</span>
          <h2 className="display" style={{ margin: "14px 0 0", fontSize: "clamp(34px,5vw,72px)", lineHeight: .92 }}>
            {s.title}<br /><span style={{ fontStyle: "italic", color: "#ffd9a0" }}>{s.titleAccent}</span>
          </h2>
          <p style={{ fontSize: "clamp(14px,1.4vw,18px)", color: "rgba(255,255,255,.9)", margin: "14px 0 0", maxWidth: 380 }}>{s.sub}</p>
          <button onClick={onCta} style={{ marginTop: 26, display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "var(--ink)",
            border: "none", borderRadius: "var(--r-pill)", padding: "14px 26px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
            {s.cta} <Icon name="arrow-right" weight="bold" size={18} style={{ color: "var(--amber-deep)" }} />
          </button>
        </div>
        <div style={{ position: "relative", display: "grid", placeItems: "center", height: "100%" }}>
          <div style={{ width: "min(72%, 230px)", transform: "rotate(-4deg)", filter: "drop-shadow(0 26px 44px rgba(0,0,0,.45))" }}>
            <ProductMedia p={s.product} ratio="3 / 4" hoverZoom={false} />
          </div>
          {s.tagline && <div className="num" style={{ position: "absolute", right: 0, bottom: 8, textAlign: "right" }}>
            <div className="display" style={{ fontSize: "clamp(40px,6vw,86px)", fontWeight: 800, lineHeight: .8 }}>{s.tagline}</div>
            <div className="label" style={{ color: "rgba(255,255,255,.85)" }}>{s.taglineSub}</div>
          </div>}
        </div>
      </div>
    </div>
  );
}

function HeroCarousel() {
  const { go } = useStore();
  const slides = [
    { kicker: "Linha de violões · Rei dos Violões", title: "A alma da", titleAccent: "Tonante.", sub: "Do nylon ao eletroacústico, o violão que vira história. Em até 12x sem juros.", cta: "Comprar violões", cat: "violoes", tones: D.tones.mogno, product: D.products.find(p => p.cat === "violoes"), tagline: "12x", taglineSub: "sem juros" },
    { kicker: "Feita de Histórias · Desde 1954", title: "Música para", titleAccent: "todos.", sub: "Mais de meio século conectando gente à música. Conheça a loja completa.", cta: "Explorar a loja", cat: null, tones: ["#2a2018", "#0e0a06"], product: D.products.find(p => p.name.includes("Etna")), tagline: "70", taglineSub: "anos" },
    { kicker: "Guitarras & Contrabaixos", title: "O palco é", titleAccent: "seu.", sub: "Timbre, sustain e atitude. Para quem leva o som a sério.", cta: "Ver guitarras", cat: "guitarras", tones: D.tones.cherry, product: D.products.find(p => p.cat === "guitarras"), tagline: "NEW", taglineSub: "drop 2026" },
  ];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % n), 5200);
    return () => clearInterval(t);
  }, [paused, n]);
  const goTo = (i) => setIdx((i + n) % n);

  return (
    <section style={{ paddingTop: "clamp(18px,2.5vw,30px)" }}>
      <div className="wrap" style={{ position: "relative" }}>
        {/* palco do carrossel */}
        <div style={{ position: "relative", height: "clamp(320px, 40vw, 540px)", overflow: "hidden", borderRadius: "var(--r-lg)" }}>
          {slides.map((s, i) => {
            let off = i - idx;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const isActive = off === 0;
            return (
              <div key={i} style={{ position: "absolute", top: 8, bottom: 8, left: "11%", width: "78%",
                transform: `translateX(${off * 82}%) scale(${isActive ? 1 : 0.9})`, opacity: Math.abs(off) > 1 ? 0 : (isActive ? 1 : 0.55),
                transition: "transform .6s var(--ease), opacity .5s var(--ease)", pointerEvents: isActive ? "auto" : "none", zIndex: isActive ? 3 : 1 }}>
                <BannerSlide s={s} active={isActive} onCta={() => go("products", s.cat)} />
              </div>
            );
          })}
        </div>
        {/* setas (fora dos slides) */}
        <button onClick={() => goTo(idx - 1)} aria-label="Anterior" style={{ ...carouselArrow, left: "calc(11% - 22px)" }}><Icon name="caret-left" size={22} /></button>
        <button onClick={() => goTo(idx + 1)} aria-label="Próximo" style={{ ...carouselArrow, right: "calc(11% - 22px)" }}><Icon name="caret-right" size={22} /></button>
      </div>
      {/* dots + pause */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 30 }}>
        <button onClick={() => setPaused(p => !p)} aria-label="Pausar" style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "grid", placeItems: "center" }}>
          <Icon name={paused ? "play" : "pause"} weight="fill" size={15} />
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={"Slide " + (i + 1)} style={{ width: i === idx ? 28 : 9, height: 9, borderRadius: 99, border: "none",
              background: i === idx ? "var(--amber)" : "var(--hairline-strong)", transition: "all .3s var(--ease)", cursor: "pointer", padding: 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
const carouselArrow = { position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 5, width: 46, height: 46, borderRadius: "50%",
  border: "1px solid var(--hairline)", background: "var(--surface)", color: "var(--ink)", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "var(--sh-card)" };

function Hero({ variant }) {
  if (variant === "cinematic") return <HeroCinematic />;
  if (variant === "editorial") return <HeroEditorial />;
  return <HeroCarousel />;
}

Object.assign(window, { Hero, HeroEditorial, HeroCinematic, HeroCarousel, VinylDisc });
