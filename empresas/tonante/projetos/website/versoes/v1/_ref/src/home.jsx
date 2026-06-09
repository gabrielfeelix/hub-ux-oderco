/* =========================================================
   TONANTE — Home (seções) + tira de valores
   ========================================================= */
function ValueStrip() {
  const items = [
    ["truck", "Frete grátis", "acima de R$ 299"],
    ["credit-card", "Até 12x", "sem juros"],
    ["seal-check", "Garantia", "2 anos Tonante"],
    ["arrows-counter-clockwise", "Troca fácil", "até 30 dias"],
  ];
  return (
    <div className="wrap" style={{ marginTop: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, background: "var(--hairline)", border: "1px solid var(--hairline)",
        borderRadius: "var(--r-lg)", overflow: "hidden" }} className="value-strip">
        {items.map(([ic, t, s], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "20px 22px", background: "var(--surface)" }}>
            <Icon name={ic} size={26} style={{ color: "var(--amber-deep)" }} />
            <div><div style={{ fontWeight: 700, fontSize: 15 }}>{t}</div><div style={{ fontSize: 12.5, color: "var(--muted)" }}>{s}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ c, big, onClick }) {
  const [hover, setHover] = useState(false);
  const sample = D.products.find(p => p.cat === c.id);
  const [a, b] = sample ? sample.tones : ["#c87800", "#6e4220"];
  const photo = D.catImage(c.id);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", overflow: "hidden", border: "none", borderRadius: "var(--r-lg)", cursor: "pointer", textAlign: "left",
        minHeight: big ? 320 : 200, padding: 24, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end",
        background: `radial-gradient(120% 120% at 75% 10%, ${a}, ${b})`, gridColumn: big ? "span 2" : "auto",
        transition: "transform .35s var(--ease)", transform: hover ? "translateY(-4px)" : "none" }}>
      {photo && <img src={photo} alt={c.label} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        transform: hover ? "scale(1.06)" : "scale(1)", transition: "transform .6s var(--ease)" }} />}
      <div className="grain" style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: photo ? "linear-gradient(180deg, rgba(20,16,12,.15) 0%, rgba(20,16,12,.35) 45%, rgba(20,16,12,.82) 100%)" : "transparent" }} />
      {!photo && <img src="assets/logos/tonante-symbol-white.png" alt="" style={{ position: "absolute", right: -20, top: -20, width: big ? 200 : 130, opacity: .18,
        transform: hover ? "rotate(8deg) scale(1.05)" : "rotate(0)", transition: "transform .5s var(--ease)" }} />}
      <div style={{ position: "relative", zIndex: 2 }}>
        <span className="label" style={{ color: "rgba(255,255,255,.82)", fontSize: 9.5 }}>{c.count} produtos</span>
        <div className="display" style={{ fontSize: big ? 40 : 27, fontWeight: 700, lineHeight: 1, margin: "8px 0 6px" }}>{c.label}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,.88)", display: "flex", alignItems: "center", gap: 8 }}>
          {c.blurb} <Icon name="arrow-right" size={16} style={{ transform: hover ? "translateX(4px)" : "none", transition: "transform .3s" }} />
        </div>
      </div>
    </button>
  );
}

function Categories() {
  const { go } = useStore();
  return (
    <section className="wrap" style={{ marginTop: 96 }}>
      <SectionHead kicker="Navegue por família" title="O que você toca hoje?">
        <Btn variant="ghost" iconRight="arrow-right" onClick={() => go("products")}>Ver tudo</Btn>
      </SectionHead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="cat-grid">
        {D.categories.map((c, i) => (
          <CategoryCard key={c.id} c={c} big={i === 0} onClick={() => go("products", c.id)} />
        ))}
      </div>
    </section>
  );
}

function BestSellers({ onOpen }) {
  const { go } = useStore();
  const list = [...D.products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  return (
    <section className="wrap" style={{ marginTop: 100 }}>
      <SectionHead kicker="Os favoritos da galera" title="Mais vendidos">
        <Btn variant="ghost" iconRight="arrow-right" onClick={() => go("products")}>Ver a loja</Btn>
      </SectionHead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }} className="cat-grid">
        {list.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

function StoryBand() {
  const { go } = useStore();
  return (
    <section className="wrap" style={{ marginTop: 110 }}>
      <div className="grain" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-lg)", background: "linear-gradient(120deg, var(--stage), #241d14)",
        color: "#f3ebde", padding: "clamp(38px,6vw,72px)" }}>
        <div style={{ position: "absolute", right: "-4%", bottom: "-30%", width: 480, height: 480, background: "radial-gradient(circle, rgba(200,120,0,.3), transparent 65%)" }} />
        <img src="assets/logos/tonante-symbol-amber.png" alt="" style={{ position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)", width: 220, opacity: .35 }} className="story-symbol" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 600 }}>
          <div className="label" style={{ color: "var(--amber)", marginBottom: 20 }}>Nossa história · 1954</div>
          <h2 className="display" style={{ fontSize: "clamp(32px,4.6vw,56px)", fontWeight: 700, lineHeight: 1, margin: 0 }}>
            Dois irmãos, um plano:<br /><span style={{ fontStyle: "italic", color: "var(--amber)" }}>música para todos.</span>
          </h2>
          <p style={{ fontSize: 17.5, lineHeight: 1.65, color: "#d8cdba", margin: "22px 0 0", maxWidth: 500 }}>
            Numa época em que a música chegava a muitos, mas os instrumentos a poucos, a Tonante nasceu para mudar isso.
            Mais de meio século depois, seguimos com o mesmo desejo — agora com muito mais experiência.
          </p>
          <div style={{ marginTop: 32 }}>
            <Btn variant="primary" size="lg" iconRight="arrow-right" onClick={() => go("products")}>Faça parte da história</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="wrap" style={{ marginTop: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", borderTop: "1px solid var(--hairline)", paddingTop: 56 }} className="news-grid">
        <div>
          <h2 className="display" style={{ fontSize: "clamp(28px,3.4vw,40px)", fontWeight: 700, margin: 0 }}>Entre na roda.</h2>
          <p style={{ fontSize: 16.5, color: "var(--ink-soft)", marginTop: 12, maxWidth: 380 }}>Novidades, lançamentos e ofertas — sem encher sua caixa de entrada. Prometemos.</p>
        </div>
        {sent ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--amber-deep)", fontWeight: 600, fontSize: 17 }}>
            <Icon name="check-circle" weight="fill" size={26} /> Pronto! Você está na lista.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input type="email" required placeholder="seu melhor e-mail" style={{ flex: 1, minWidth: 200, padding: "16px 20px", borderRadius: "var(--r-pill)",
              border: "1.5px solid var(--hairline-strong)", background: "var(--surface)", fontFamily: "var(--sans)", fontSize: 15.5, color: "var(--ink)" }} />
            <Btn type="submit" variant="ink" size="lg" iconRight="arrow-right">Quero receber</Btn>
          </form>
        )}
      </div>
    </section>
  );
}

function DealsCarousel({ onOpen }) {
  const { go } = useStore();
  const ref = useRef(null);
  const deals = D.products.filter(p => p.old).slice(0, 8);
  const scrollBy = (dir) => ref.current && ref.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section className="wrap" style={{ marginTop: 70 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 26, flexWrap: "wrap" }}>
        <div>
          <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="lightning" weight="fill" size={13} /> Drop do dia
          </div>
          <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 700 }}>Ofertas selecionadas pra hoje</h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => scrollBy(-1)} aria-label="Anterior" style={dealArrow}><Icon name="caret-left" size={18} /></button>
          <button onClick={() => scrollBy(1)} aria-label="Próximo" style={dealArrow}><Icon name="caret-right" size={18} /></button>
        </div>
      </div>
      <div ref={ref} className="no-bar" style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 6, margin: "0 -4px", padding: "0 4px 6px" }}>
        {deals.map(p => (
          <div key={p.id} style={{ flex: "0 0 270px", scrollSnapAlign: "start" }}>
            <ProductCard p={p} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  );
}
const dealArrow = { width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--hairline-strong)", background: "var(--surface)", color: "var(--ink)", display: "grid", placeItems: "center", cursor: "pointer" };

function HomePage({ heroVariant, onOpen }) {
  return (
    <>
      <Hero variant={heroVariant} />
      <ValueStrip />
      <OffersOfDay onOpen={onOpen} />
      <WeekDeals onOpen={onOpen} />
      <Categories />
      <RankedTop onOpen={onOpen} />
      <PromoPanel onOpen={onOpen} />
      <FeaturedEssentials onOpen={onOpen} />
      <ShopByStyle onOpen={onOpen} />
      <LinhasDeViolao />
      <StoryBand />
      <NewArrivals onOpen={onOpen} />
      <RealMusicians />
      <Pillars />
      <Newsletter />
    </>
  );
}

Object.assign(window, { HomePage, ValueStrip, DealsCarousel, Categories, BestSellers, StoryBand, Newsletter });
