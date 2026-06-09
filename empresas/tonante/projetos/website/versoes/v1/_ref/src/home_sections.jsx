/* =========================================================
   TONANTE — Seções comerciais da Home (inspiradas no padrão do grupo)
   Adaptadas à marca: claro, quente, âmbar, instrumentos.
   ========================================================= */

/* cabeçalho de seção comercial reutilizável */
function ComHead({ kicker, title, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 26, flexWrap: "wrap" }}>
      <div>
        <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--faint)" }}>//</span> {kicker}
        </div>
        <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px,3.6vw,46px)", fontWeight: 700, lineHeight: 1 }}>{title}</h2>
      </div>
      {action && <Btn variant="ghost" iconRight="arrow-right" onClick={onAction}>{action}</Btn>}
    </div>
  );
}

/* seção carrossel: cabeçalho (com setas inline) + trilho horizontal */
function CarouselSection({ kicker, title, action, onAction, itemW = 268, band, dark, clock, children }) {
  const ref = useRef(null);
  const by = (d) => ref.current && ref.current.scrollBy({ left: d * (itemW + 20) * 2, behavior: "smooth" });
  const arrowStyle = dark ? { ...comArrow, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.2)", color: "#f3ebde" } : comArrow;
  const header = (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 26, flexWrap: "wrap" }}>
      <div>
        <div className="label" style={{ color: "var(--amber)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: dark ? "rgba(255,255,255,.4)" : "var(--faint)" }}>//</span> {kicker}</div>
        <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px,3.6vw,46px)", fontWeight: 700, lineHeight: 1, color: dark ? "#f6efe2" : "var(--ink)" }}>{title}</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {clock}
        {action && <Btn variant={dark ? "ondark" : "ghost"} iconRight="arrow-right" onClick={onAction}>{action}</Btn>}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => by(-1)} aria-label="Anterior" style={arrowStyle}><Icon name="caret-left" size={18} /></button>
          <button onClick={() => by(1)} aria-label="Próximo" style={arrowStyle}><Icon name="caret-right" size={18} /></button>
        </div>
      </div>
    </div>
  );
  const row = (
    <div ref={ref} className="no-bar" style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory", padding: "0 4px 8px", margin: "0 -4px" }}>
      {React.Children.map(children, (ch) => <div style={{ flex: `0 0 ${itemW}px`, scrollSnapAlign: "start" }}>{ch}</div>)}
    </div>
  );
  if (dark) return (
    <section className="grain" style={{ position: "relative", marginTop: 90, background: "radial-gradient(120% 120% at 85% 0%, #2a2118, var(--stage))", color: "#f3ebde", padding: "64px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-5%", top: "-20%", width: 460, height: 460, background: "radial-gradient(circle, rgba(200,120,0,.20), transparent 70%)", pointerEvents: "none" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>{header}{row}</div>
    </section>
  );
  return band
    ? <section style={{ marginTop: 90, background: "var(--paper-2)", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)", padding: "60px 0" }}><div className="wrap">{header}{row}</div></section>
    : <section className="wrap" style={{ marginTop: 90 }}>{header}{row}</section>;
}
const comArrow = { width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--hairline-strong)", background: "var(--surface)", color: "var(--ink)", display: "grid", placeItems: "center", cursor: "pointer" };

/* contagem regressiva em pílula */
function DealClock() {
  const end = useRef(Date.now() + 36 * 3600e3 + 12 * 60e3 + 26e3);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  let s = Math.max(0, Math.floor((end.current - now) / 1000));
  const d = Math.floor(s / 86400); s %= 86400;
  const h = String(Math.floor(s / 3600)).padStart(2, "0"); s %= 3600;
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  const Cell = ({ v, l }) => <span style={{ display: "inline-flex", alignItems: "baseline", gap: 3 }}>
    <strong className="num" style={{ fontSize: 16, fontWeight: 700 }}>{v}</strong><span className="label" style={{ fontSize: 8.5 }}>{l}</span></span>;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "10px 16px", borderRadius: "var(--r-pill)",
      border: "1px solid rgba(179,54,31,.3)", background: "rgba(179,54,31,.07)", color: "#b3361f" }}>
      <Icon name="timer" weight="fill" size={16} />
      <Cell v={d} l="D" /> : <Cell v={h} l="H" /> : <Cell v={m} l="M" /> : <Cell v={sec} l="S" />
    </div>
  );
}

/* ============ 1. OFERTAS DO DIA (3 cards premium) ============ */
function OffersOfDay({ onOpen }) {
  const { go, addToCart } = useStore();
  const deals = [...D.products].filter(p => p.old).sort((a, b) => b.discount - a.discount).slice(0, 3);
  return (
    <section className="wrap" style={{ marginTop: 80 }}>
      <ComHead kicker="Drop do dia" title="Ofertas selecionadas pra hoje" action="Ver todas" onAction={() => go("products")} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} className="cat-grid">
        {deals.map(p => (
          <article key={p.id} style={{ background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => onOpen(p)}>
              <ProductMedia p={p} ratio="4 / 3" hoverZoom={false} label={false} showBadge={false} />
              <span className="num" style={{ position: "absolute", left: 12, top: 12, background: "#b3361f", color: "#fff", fontWeight: 700, fontSize: 13, padding: "5px 11px", borderRadius: 99 }}>-{p.discount}%</span>
              <span style={{ position: "absolute", right: 12, top: 12 }}><Tag tone="amber" style={{ background: "rgba(255,255,255,.92)", border: "none" }}><Icon name="fire" weight="fill" size={11} /> Oferta do dia</Tag></span>
            </div>
            <h3 onClick={() => onOpen(p)} className="display" style={{ margin: 0, fontSize: 20, fontWeight: 600, cursor: "pointer", lineHeight: 1.1 }}>{p.name}</h3>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
                <span className="num" style={{ fontSize: 14, color: "var(--faint)", textDecoration: "line-through" }}>{brl(p.old)}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
                <span className="num display" style={{ fontSize: 30, fontWeight: 700, color: "var(--amber-deep)" }}>{brl(p.pix)}</span>
                <span className="label" style={{ fontSize: 9 }}>no Pix</span>
              </div>
              <div className="num" style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>ou {p.installments}x de {brl(p.price / p.installments)}</div>
            </div>
            <span style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(31,138,77,.12)", color: "#1f8a4d", fontWeight: 700, fontSize: 12.5, padding: "5px 11px", borderRadius: 99 }}>
              <Icon name="trend-down" size={13} /> Economize {brl(p.old - p.pix)}
            </span>
            <Btn variant="primary" full iconLeft="handbag" onClick={() => addToCart(p)}>Comprar</Btn>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============ 2. PROMOÇÕES DA SEMANA (carrossel + relógio) ============ */
function WeekDeals({ onOpen }) {
  const deals = D.products.filter(p => p.old);
  return (
    <CarouselSection band kicker="Promoções da semana" title="Os preços que estão voando" clock={<DealClock />} itemW={268}>
      {deals.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
    </CarouselSection>
  );
}

/* ============ 3. TOP DA SEMANA (ranqueado) ============ */
function RankedTop({ onOpen }) {
  const { go } = useStore();
  const list = [...D.products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  return (
    <CarouselSection dark kicker="Mais vendidos" title="Top da semana" action="Ver a loja" onAction={() => go("products")} itemW={268}>
      {list.map((p, i) => <ProductCard key={p.id} p={p} onOpen={onOpen} rank={i + 1} />)}
    </CarouselSection>
  );
}

/* ============ 4. PAINEL DE PROMOÇÃO + GRID ============ */
function PromoPanel({ onOpen }) {
  const { go } = useStore();
  const grid = D.products.filter(p => p.old).slice(0, 4);
  const promoCount = D.products.filter(p => p.old).length;
  const thumbs = D.products.filter(p => p.old).slice(0, 5);
  return (
    <section className="wrap" style={{ marginTop: 90 }}>
      <ComHead kicker="Hall das ofertas" title="Tudo que está em promoção" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(224px, 1fr))", gap: 22 }}>
        {grid.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
      </div>
      {/* faixa horizontal de promoção */}
      <div className="grain" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-lg)", color: "#fff", marginTop: 22,
        background: "radial-gradient(120% 160% at 85% 10%, var(--amber-bright), var(--amber-deep))", padding: "clamp(26px,3vw,40px)" }}>
        <img src="assets/logos/tonante-symbol-white.png" alt="" style={{ position: "absolute", left: "-3%", bottom: "-40%", width: 220, opacity: .14 }} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }} className="promo-banner">
          <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="display num" style={{ fontSize: "clamp(48px,6vw,76px)", fontWeight: 800, lineHeight: .85 }}>+{promoCount}</span>
            </div>
            <div style={{ maxWidth: 360 }}>
              <Tag tone="ondark" style={{ background: "rgba(255,255,255,.22)", marginBottom: 8 }}>Ofertas da semana</Tag>
              <h3 className="display" style={{ fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 700, lineHeight: 1.02, margin: 0 }}>Itens em promoção, num só lugar</h3>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.9)", margin: "8px 0 0" }}>Descontos de verdade em violões, guitarras e acessórios — atualizados toda semana.</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {thumbs.map((p, i) => (
                <div key={p.id} title={p.name} style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--amber-deep)", marginLeft: i ? -16 : 0, background: "#fffdf8", boxShadow: "0 4px 10px rgba(0,0,0,.2)" }}>
                  <ProductMedia p={p} ratio="1/1" hoverZoom={false} label={false} showBadge={false} watermark={false} />
                </div>
              ))}
            </div>
            <button onClick={() => go("products")} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "var(--amber-deep)",
              border: "none", borderRadius: "var(--r-pill)", padding: "15px 28px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 15.5, cursor: "pointer", whiteSpace: "nowrap" }}>
              Ver todas as ofertas <Icon name="arrow-right" weight="bold" size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ 5. MONTE SEU KIT (combo builder) ============ */
function FeaturedEssentials({ onOpen }) {
  const { addToCart } = useStore();
  const base = D.products.find(p => p.name.includes("Cecille")) || D.products.find(p => p.cat === "guitarras") || D.products[0];
  const addonNames = ["Capotraste", "Suporte para Guitarra", "Encordoamento Guitarra", "Afinador"];
  const addons = D.products.filter(p => addonNames.some(n => p.name.includes(n))).slice(0, 3);
  const [sel, setSel] = useState(addons.map(a => a.id));
  const chosen = addons.filter(a => sel.includes(a.id));
  const toggle = (id) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const full = base.price + chosen.reduce((s, a) => s + a.price, 0);
  const combo = Math.round(full * 0.92 * 100) / 100;
  const save = Math.round((full - combo) * 100) / 100;
  function addKit() { addToCart(base); chosen.forEach(a => addToCart(a)); }
  return (
    <section style={{ marginTop: 90, background: "var(--paper-2)", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)", padding: "60px 0" }}>
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <div>
            <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 12 }}>// Combo Tonante</div>
            <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px,3.8vw,48px)", fontWeight: 700, lineHeight: 1 }}>Monte seu <span style={{ fontStyle: "italic", color: "var(--amber)" }}>kit</span></h2>
            <p style={{ margin: "10px 0 0", fontSize: 16, color: "var(--ink-soft)", maxWidth: 460 }}>Comece com o instrumento e adicione os essenciais. Levando junto, <strong style={{ color: "var(--amber-deep)" }}>8% off</strong> no kit.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,420px) auto 1fr", gap: 24, alignItems: "center" }} className="combo-grid">
          {/* base */}
          <article style={{ background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="label" style={{ color: "var(--amber-deep)" }}>Instrumento base</span>
            <div style={{ cursor: "pointer" }} onClick={() => onOpen(base)}><ProductMedia p={base} ratio="4 / 3" hoverZoom={false} label={false} showBadge={false} /></div>
            <div>
              <h3 onClick={() => onOpen(base)} className="display" style={{ margin: 0, fontSize: 22, fontWeight: 600, cursor: "pointer" }}>{base.name}</h3>
              <div className="num display" style={{ fontSize: 22, fontWeight: 700, color: "var(--amber-deep)", marginTop: 4 }}>{brl(base.pix)}</div>
            </div>
          </article>
          {/* plus */}
          <div className="combo-plus" style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", justifySelf: "center" }}><Icon name="plus" weight="bold" size={20} /></div>
          {/* add-ons + resumo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {addons.map(a => {
              const on = sel.includes(a.id);
              return (
                <div key={a.id} onClick={() => toggle(a.id)} style={{ display: "grid", gridTemplateColumns: "58px 1fr auto", gap: 14, alignItems: "center", cursor: "pointer",
                  background: "var(--surface)", border: "1.5px solid " + (on ? "var(--amber)" : "var(--hairline)"), borderRadius: "var(--r-md)", padding: 12, transition: "border-color .2s" }}>
                  <div style={{ width: 58 }}><ProductMedia p={a} ratio="1/1" hoverZoom={false} label={false} showBadge={false} /></div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.15 }}>{a.name}</div>
                    <div className="num" style={{ fontSize: 13, color: "var(--amber-deep)", marginTop: 2 }}>+ {brl(a.pix)}</div>
                  </div>
                  <span style={{ width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", background: on ? "var(--amber)" : "transparent", border: "1.5px solid " + (on ? "var(--amber)" : "var(--hairline-strong)"), color: on ? "#fff" : "var(--muted)" }}>
                    <Icon name={on ? "check" : "plus"} weight="bold" size={15} />
                  </span>
                </div>
              );
            })}
            {/* resumo do kit */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 4, padding: "16px 18px", background: "var(--ink)", color: "var(--paper)", borderRadius: "var(--r-md)" }}>
              <div>
                <div style={{ fontSize: 12.5, opacity: .7, textDecoration: "line-through" }} className="num">{brl(full)}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span className="num display" style={{ fontSize: 26, fontWeight: 700 }}>{brl(combo)}</span>
                  <span style={{ fontSize: 11.5, color: "var(--amber)", fontWeight: 700 }}>economize {brl(save)}</span>
                </div>
              </div>
              <Btn variant="primary" iconLeft="handbag" onClick={addKit}>Adicionar kit</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ 6. POR ESTILO (abas de categoria + grid) ============ */
function ShopByStyle({ onOpen }) {
  const [cat, setCat] = useState(D.categories[0].id);
  const list = D.products.filter(p => p.cat === cat).slice(0, 4);
  return (
    <section className="wrap" style={{ marginTop: 90, textAlign: "center" }}>
      <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 14 }}>// Feito pra você</div>
      <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px,3.8vw,48px)", fontWeight: 700 }}>Pra cada jeito de <span style={{ fontStyle: "italic", color: "var(--amber)" }}>tocar</span></h2>
      <div className="no-bar" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", margin: "34px 0 36px" }}>
        {D.categories.map(c => {
          const sample = D.products.find(p => p.cat === c.id);
          const photo = D.catImage(c.id);
          const active = cat === c.id;
          return (
            <button key={c.id} onClick={() => setCat(c.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", width: 96 }}>
              <span style={{ width: 76, height: 76, borderRadius: "50%", display: "grid", placeItems: "center", overflow: "hidden", position: "relative",
                border: "2px solid " + (active ? "var(--amber)" : "var(--hairline)"), background: photo ? "linear-gradient(160deg,#faf7f0,#efe9dc)" : `radial-gradient(circle at 35% 25%, ${sample.tones[0]}, ${sample.tones[1]})`,
                transform: active ? "scale(1.06)" : "scale(1)", transition: "all .25s var(--ease)", filter: active ? "none" : "saturate(.85)" }}>
                {photo ? <img src={photo} alt={c.label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                       : <img src="assets/logos/tonante-symbol-white.png" alt="" style={{ width: "58%", opacity: .92 }} />}
              </span>
              <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? "var(--ink)" : "var(--muted)", maxWidth: 96, lineHeight: 1.15 }}>{c.label}</span>
            </button>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, textAlign: "left" }} className="cat-grid">
        {list.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

/* ============ 7. RECÉM-CHEGADOS (carrossel) ============ */
function NewArrivals({ onOpen }) {
  const { go } = useStore();
  const list = D.products.filter(p => (p.badge || "").toLowerCase().includes("novidade") || (p.badge || "").toLowerCase().includes("aniver"));
  const fill = list.length < 4 ? [...list, ...D.products.filter(p => !list.includes(p)).slice(0, 6 - list.length)] : list;
  return (
    <CarouselSection kicker="Lançamentos" title="Recém-chegados" action="Ver novidades" onAction={() => go("products")} itemW={268}>
      {fill.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
    </CarouselSection>
  );
}

/* ============ 8. MÚSICOS DE VERDADE (UGC / institucional) ============ */
function RealMusicians() {
  const shots = [
    { h: 360, tone: D.tones.mogno, handle: "@joaoviolao" },
    { h: 300, tone: D.tones.cherry, handle: "@bandadaesquina" },
    { h: 400, tone: D.tones.black, handle: "@luiza.strings" },
    { h: 320, tone: D.tones.bronze, handle: "@studio.norte" },
    { h: 370, tone: D.tones.spruce, handle: "@pedro.live" },
  ];
  return (
    <section className="wrap" style={{ marginTop: 90 }}>
      <ComHead kicker="Tonante por aí" title="Músicos de verdade, palcos de verdade" />
      <div className="no-bar" style={{ display: "flex", gap: 18, overflowX: "auto", padding: "0 4px 8px", alignItems: "flex-end", margin: "0 -4px" }}>
        {shots.map((s, i) => (
          <div key={i} style={{ flex: `0 0 280px`, position: "relative", height: s.h, borderRadius: "var(--r-lg)", overflow: "hidden",
            background: `radial-gradient(120% 120% at 40% 20%, ${s.tone[0]}, ${s.tone[1]})` }} className="grain">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,.5))" }} />
            <img src="assets/logos/tonante-symbol-white.png" alt="" style={{ position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-50%)", width: "44%", opacity: .8 }} />
            <div style={{ position: "absolute", left: 16, bottom: 14, zIndex: 2, display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
              <Icon name="instagram-logo" size={16} /><span style={{ fontWeight: 600, fontSize: 13.5 }}>{s.handle}</span>
            </div>
            <span className="label" style={{ position: "absolute", right: 14, top: 14, color: "rgba(255,255,255,.7)", fontSize: 8.5, zIndex: 2 }}>Foto real aqui</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ 9. PILARES (institucional) ============ */
function Pillars() {
  const items = [
    ["medal", "Desde 1954", "Mais de 70 anos fazendo instrumentos que viram história."],
    ["seal-check", "Garantia de 2 anos", "Qualidade que a gente assina embaixo, em cada produto."],
    ["heart", "Música pra todos", "Do primeiro acorde ao palco — preço justo e suporte de verdade."],
  ];
  return (
    <section className="wrap" style={{ marginTop: 90 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="cat-grid">
        {items.map(([ic, t, s], i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "26px 24px", background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)" }}>
            <span style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(200,120,0,.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Icon name={ic} size={24} style={{ color: "var(--amber-deep)" }} />
            </span>
            <div>
              <h3 className="display" style={{ margin: 0, fontSize: 21, fontWeight: 600 }}>{t}</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ 10. LINHAS DE VIOLÃO (experiencial / institucional) ============ */
function LinhasDeViolao() {
  const { go, openQuickView } = useStore();
  const lines = D.violaoLines;
  const [sel, setSel] = useState(0);
  const L = lines[sel];
  const [a, b] = D.tones[L.tone];
  const prod = D.products.find(p => p.name === L.model);
  return (
    <section style={{ marginTop: 100 }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 12 }}>// Conheça as linhas</div>
          <h2 className="display" style={{ margin: 0, fontSize: "clamp(30px,4.2vw,52px)", fontWeight: 700 }}>Cada violão, uma <span style={{ fontStyle: "italic", color: "var(--amber)" }}>experiência</span></h2>
          <p style={{ fontSize: 16.5, color: "var(--ink-soft)", maxWidth: 520, margin: "12px auto 0" }}>As linhas de violão da Tonante têm nome, personalidade e som próprio. Escolha a sua vibe.</p>
        </div>
        {/* palco imersivo */}
        <div className="grain" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-lg)", minHeight: 440,
          background: `radial-gradient(120% 130% at 80% 15%, ${a}, ${b})`, color: "#fff", transition: "background .6s var(--ease)", display: "grid", gridTemplateColumns: "1.2fr .8fr", alignItems: "center" }} className="linha-stage">
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.45), transparent 60%)" }} />
          <img src="assets/logos/tonante-symbol-white.png" alt="" style={{ position: "absolute", right: "4%", bottom: "-18%", width: "42%", opacity: .12 }} />
          <div style={{ position: "relative", zIndex: 2, padding: "clamp(34px,5vw,64px)" }}>
            <span className="label" style={{ color: "rgba(255,255,255,.85)" }}>Linha {L.name} · {L.vibe}</span>
            <h3 className="display" style={{ margin: "14px 0 0", fontSize: "clamp(52px,8vw,104px)", fontWeight: 800, lineHeight: .86 }}>{L.name}</h3>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,.92)", maxWidth: 420, margin: "18px 0 0", lineHeight: 1.55 }}>{L.desc}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              {prod && <button onClick={() => go("product", prod)} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "var(--ink)", border: "none", borderRadius: "var(--r-pill)", padding: "14px 26px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 15.5, cursor: "pointer" }}>Conhecer a {L.name} <Icon name="arrow-right" weight="bold" size={17} style={{ color: "var(--amber-deep)" }} /></button>}
              {prod && <button onClick={() => openQuickView(prod)} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.14)", color: "#fff", border: "1px solid rgba(255,255,255,.3)", borderRadius: "var(--r-pill)", padding: "14px 22px", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 15, cursor: "pointer" }}><Icon name="eye" size={17} /> Espiar</button>}
            </div>
          </div>
          {/* produto */}
          <div style={{ position: "relative", zIndex: 2, display: "grid", placeItems: "center", padding: 30 }}>
            {prod && <div style={{ width: "min(80%, 240px)", transform: "rotate(-4deg)", filter: "drop-shadow(0 30px 50px rgba(0,0,0,.5))" }}><ProductMedia p={prod} ratio="3 / 4" hoverZoom={false} label={false} showBadge={false} /></div>}
          </div>
        </div>
        {/* seletor de linhas */}
        <div className="no-bar" style={{ display: "flex", gap: 10, overflowX: "auto", marginTop: 18, paddingBottom: 4 }}>
          {lines.map((l, i) => {
            const on = i === sel;
            const [la, lb] = D.tones[l.tone];
            return (
              <button key={i} onClick={() => setSel(i)} style={{ flex: "1 0 auto", display: "flex", alignItems: "center", gap: 11, padding: "12px 16px", borderRadius: "var(--r-md)", cursor: "pointer",
                border: "1.5px solid " + (on ? "var(--ink)" : "var(--hairline)"), background: on ? "var(--ink)" : "var(--surface)", color: on ? "var(--paper)" : "var(--ink)", transition: "all .2s", minWidth: 150 }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 35% 25%, ${la}, ${lb})` }} />
                <span style={{ textAlign: "left" }}>
                  <span className="display" style={{ display: "block", fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{l.name}</span>
                  <span style={{ fontSize: 11.5, opacity: .7 }}>{l.vibe}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { OffersOfDay, WeekDeals, RankedTop, PromoPanel, FeaturedEssentials, ShopByStyle, NewArrivals, RealMusicians, Pillars, LinhasDeViolao });
