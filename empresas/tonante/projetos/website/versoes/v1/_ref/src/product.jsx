/* =========================================================
   TONANTE — Página de Produto v2
   3 colunas: galeria | título/sobre/descrição/avaliações | preço (sticky)
   ========================================================= */

/* contagem regressiva da oferta */
function Countdown() {
  const end = useRef(Date.now() + 12 * 3600e3 + 34 * 60e3 + 50e3);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  let s = Math.max(0, Math.floor((end.current - now) / 1000));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0"); s %= 3600;
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  const cell = { background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: 8, padding: "5px 9px", fontWeight: 700, minWidth: 34, textAlign: "center" };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 14px",
      background: "rgba(179,54,31,.07)", border: "1px solid rgba(179,54,31,.22)", borderRadius: "var(--r-md)" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#b3361f", fontWeight: 600, fontSize: 13.5 }}>
        <Icon name="timer" size={17} /> Oferta encerra em
      </span>
      <div className="num" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 14 }}>
        <span style={cell}>{hh}</span>:<span style={cell}>{mm}</span>:<span style={cell}>{ss}</span>
      </div>
    </div>
  );
}

/* galeria: miniaturas verticais + imagem principal */
function Gallery({ p }) {
  const [active, setActive] = useState(0);
  const n = (p.images && p.images.length) ? Math.min(p.images.length, 4) : 4;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "66px 1fr", gap: 14, alignItems: "start" }} className="pdp-gallery-inner">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="pdp-thumbs">
        {Array.from({ length: n }).map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ padding: 0, border: "2px solid " + (active === i ? "var(--amber)" : "var(--hairline)"),
            borderRadius: "var(--r-md)", overflow: "hidden", background: "none", cursor: "pointer", aspectRatio: "1/1" }}>
            <div style={{ width: "100%", height: "100%", opacity: active === i ? 1 : .68 }}>
              <ProductMedia p={p} ratio="1 / 1" hoverZoom={false} label={false} showBadge={false} view={i} fit="contain" />
            </div>
          </button>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <ProductMedia p={p} ratio="1 / 1" hoverZoom={false} label={false} showBadge={false} view={active} fit="contain" />
        <div style={{ position: "absolute", left: 16, top: 16, display: "flex", gap: 8 }}>
          {p.discount && <span className="num" style={{ background: "#b3361f", color: "#fff", fontWeight: 700, fontSize: 13, padding: "5px 11px", borderRadius: 99 }}>-{p.discount}%</span>}
          {p.badge && <Tag tone="ondark">{p.badge}</Tag>}
        </div>
      </div>
    </div>
  );
}

/* sobre o produto (bullets) */
function About({ p }) {
  const all = D.aboutFor(p);
  const [open, setOpen] = useState(false);
  const shown = open ? all : all.slice(0, 4);
  return (
    <div>
      <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ color: "var(--faint)" }}>//</span> Sobre o produto
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
        {shown.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 15.5, color: "var(--ink-soft)" }}>
            <span style={{ flexShrink: 0, width: 21, height: 21, borderRadius: "50%", background: "rgba(200,120,0,.14)", display: "grid", placeItems: "center", marginTop: 1 }}>
              <Icon name="check" weight="bold" size={12} style={{ color: "var(--amber-deep)" }} />
            </span>
            {b}
          </li>
        ))}
      </ul>
      {all.length > 4 && <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "var(--amber-deep)", fontFamily: "var(--sans)",
        fontWeight: 600, fontSize: 14.5, padding: "14px 0 0", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
        {open ? "Ver menos" : "Ver mais"} <Icon name={open ? "caret-up" : "caret-down"} size={14} />
      </button>}
    </div>
  );
}

/* imagem de bloco (foto real ou placeholder), com overlay opcional */
function Blk({ p, src, ratio, overlay, children, contain }) {
  return (
    <div style={{ position: "relative", aspectRatio: ratio, borderRadius: "var(--r-lg)", overflow: "hidden", background: "linear-gradient(160deg,#faf7f0,#efe9dc)", border: "1px solid var(--hairline)" }}>
      {src ? <img src={src} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: contain ? "contain" : "cover", padding: contain ? "6%" : 0 }} />
           : <ProductMedia p={p} ratio={ratio} hoverZoom={false} label={false} showBadge={false} />}
      {overlay && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 38%, rgba(20,16,12,.78))" }} />}
      {children && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 26px", color: "#fff", zIndex: 2 }}>{children}</div>}
    </div>
  );
}

/* descrição rica (estrutura aprovada · cores Tonante) */
function Description({ p }) {
  const r = p.real;
  const specs = D.specsFor(p);
  const focusTitle = (r && r.focusTitle) || p.name;
  const focusText = (r && r.focusText) || p.desc;
  const secs = D.sectionsFor(p);
  const hasVisual = r && (r.blocoImg || r.blocoTitle);
  const hasCards = r && (r.card1.img || r.card2.img);
  const hasBanner = r && r.bannerImg;

  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
        {/* foco / mensagem central */}
        <div style={{ padding: "clamp(32px,4vw,52px)", textAlign: "center", borderBottom: "1px solid var(--hairline)" }}>
          <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 14 }}>// {(D.categories.find(c => c.id === p.cat) || {}).label || "Produto"}</div>
          <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px,3.8vw,46px)", fontWeight: 700, lineHeight: 1.02 }}>{focusTitle}</h2>
          <p style={{ margin: "16px auto 0", maxWidth: 720, fontSize: 17.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{focusText}</p>
        </div>

        {/* grade de features (real) OU descrição genérica */}
        {(hasVisual || hasCards) ? (
          <div style={{ padding: "clamp(24px,3vw,40px)", display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 22, borderBottom: "1px solid var(--hairline)" }} className="desc-feat">
            <Blk p={p} src={r.blocoImg} ratio="3 / 4" overlay>
              {r.blocoTitle && <><h3 className="display" style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{r.blocoTitle}</h3>
              {r.blocoText && <p style={{ margin: "8px 0 0", fontSize: 14, color: "rgba(255,255,255,.85)", lineHeight: 1.5 }}>{r.blocoText}</p>}</>}
            </Blk>
            <div style={{ display: "grid", gap: 22 }}>
              {[r.card1, r.card2].filter(c => c && (c.img || c.t)).map((c, i) => (
                <Blk key={i} p={p} src={c.img} ratio="16 / 10" overlay={!!(c.t || c.x)}>
                  {c.t && <><h3 className="display" style={{ margin: 0, fontSize: 21, fontWeight: 700 }}>{c.t}</h3>
                  {c.x && <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "rgba(255,255,255,.85)", lineHeight: 1.5 }}>{c.x}</p>}</>}
                </Blk>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: 26, borderBottom: "1px solid var(--hairline)" }}>
            {secs.map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: i % 2 ? "1fr 300px" : "300px 1fr", gap: 28, alignItems: "center" }} className="desc-row">
                {i % 2 === 0 && <Blk p={p} ratio="4 / 3" contain />}
                <div>
                  <h3 className="display" style={{ fontSize: 23, fontWeight: 600, margin: "0 0 10px" }}>{s.title}</h3>
                  <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>{s.text}</p>
                </div>
                {i % 2 === 1 && <Blk p={p} ratio="4 / 3" contain />}
              </div>
            ))}
          </div>
        )}

        {/* banner largo */}
        {hasBanner && (
          <div style={{ padding: "clamp(24px,3vw,40px)", borderBottom: "1px solid var(--hairline)" }}>
            {r.bannerTitle && <div style={{ textAlign: "center", marginBottom: 22 }}>
              <h3 className="display" style={{ margin: 0, fontSize: "clamp(24px,3vw,38px)", fontWeight: 700 }}>{r.bannerTitle}</h3>
              {r.bannerText && <p style={{ margin: "10px auto 0", maxWidth: 640, fontSize: 16, color: "var(--ink-soft)" }}>{r.bannerText}</p>}
            </div>}
            <Blk p={p} src={r.bannerImg} ratio="16 / 6" />
          </div>
        )}

        {/* ficha técnica — raio-x */}
        <div style={{ display: "grid", gridTemplateColumns: (r && r.specImg) ? "1.1fr .9fr" : "1fr", gap: 0 }} className="desc-tech">
          <div style={{ padding: "clamp(28px,3.5vw,46px)" }}>
            <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 10 }}>// Raio-X do produto</div>
            <h3 className="display" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 22px" }}>Especificações técnicas</h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 2 }}>
              {specs.map((s, i) => (
                <li key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 14, padding: "9px 0", borderBottom: "1px solid var(--hairline)" }} className="spec-li">
                  <span className="label" style={{ fontSize: 10, color: "var(--muted)" }}>{s.k}</span>
                  <span style={{ fontSize: 15.5, fontWeight: 600, color: "var(--ink)" }}>{s.v}</span>
                </li>
              ))}
            </ul>
          </div>
          {r && r.specImg && <div style={{ position: "relative", background: "linear-gradient(160deg,#241d14,var(--stage))", minHeight: 320 }}>
            <img src={r.specImg} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: "8%" }} />
          </div>}
        </div>
      </div>
    </div>
  );
}

/* avaliações */
function Reviews({ p }) {
  const [tab, setTab] = useState("Recentes");
  const list = D.reviews;
  const dist = [85, 12, 1, 1, 1];
  return (
    <div style={{ marginTop: 56, borderTop: "1px solid var(--hairline)", paddingTop: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 44, alignItems: "start" }} className="reviews-grid">
        {/* resumo */}
        <div>
          <h2 className="display" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 18px", lineHeight: 1 }}>Avaliações<br />de clientes</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span className="display num" style={{ fontSize: 54, fontWeight: 700, lineHeight: 1 }}>{p.rating.toFixed(1)}</span>
            <div><Stars value={p.rating} size={17} /><div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{p.reviews} avaliações</div></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 20 }}>
            {dist.map((pct, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5 }}>
                <span className="num" style={{ width: 10, color: "var(--muted)" }}>{5 - i}</span>
                <div style={{ flex: 1, height: 6, borderRadius: 99, background: "var(--hairline)" }}>
                  <div style={{ width: pct + "%", height: "100%", borderRadius: 99, background: "var(--amber)" }} />
                </div>
                <span className="num" style={{ width: 32, textAlign: "right", color: "var(--muted)" }}>{pct}%</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22 }}><Btn variant="outline" full iconLeft="pencil-simple">Escrever avaliação</Btn></div>
        </div>
        {/* lista */}
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
            {["Recentes", "Mais relevantes", "Com fotos"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 16px", borderRadius: "var(--r-pill)", border: "1.5px solid " + (tab === t ? "var(--ink)" : "var(--hairline-strong)"),
                background: tab === t ? "var(--ink)" : "transparent", color: tab === t ? "var(--paper)" : "var(--ink)", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>{t}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {list.map((r, i) => (
              <div key={i} style={{ padding: "20px 0", borderTop: i ? "1px solid var(--hairline)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--paper-2)", display: "grid", placeItems: "center", fontWeight: 700, color: "var(--amber-deep)" }}>{r.name[0]}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 600, fontSize: 14.5 }}>
                      {r.name} {r.verified && <Icon name="seal-check" weight="fill" size={15} style={{ color: "var(--amber-deep)" }} />}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Stars value={r.rating} size={12} /><span style={{ fontSize: 12, color: "var(--muted)" }}>{r.date}</span></div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6 }}>{r.text}</p>
                <button style={{ marginTop: 10, background: "none", border: "none", color: "var(--muted)", fontSize: 13, padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Icon name="thumbs-up" size={14} /> Útil ({r.helpful})
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* coluna de preço (sticky) */
function PriceRail({ p }) {
  const { addToCart, buyNow } = useStore();
  const [qty, setQty] = useState(1);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [added, setAdded] = useState(false);
  function calcFrete(e) { e.preventDefault(); if (cep.replace(/\D/g, "").length >= 8) setFrete({ price: p.price >= 299 ? 0 : 24.9, days: "3 a 6 dias úteis" }); }
  function add() { addToCart(p, qty); setAdded(true); setTimeout(() => setAdded(false), 1700); }
  return (
    <aside style={{ position: "sticky", top: 132 }} className="pdp-rail">
      <div style={{ background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)", padding: 22, display: "flex", flexDirection: "column", gap: 16, boxShadow: "var(--sh-card)" }}>
        {p.discount && <Countdown />}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            {p.old && <span className="num" style={{ fontSize: 16, color: "var(--faint)", textDecoration: "line-through" }}>{brl(p.old)}</span>}
            <span className="num display" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, letterSpacing: "-.02em" }}>{brl(p.pix)}</span>
          </div>
          <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6 }}>no <strong style={{ color: "var(--amber-deep)" }}>PIX</strong> com <strong style={{ color: "var(--amber-deep)" }}>10% de desconto</strong></div>
          <div className="num" style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 4 }}>ou {brl(p.price)} em até <strong>{p.installments}x {brl(p.price / p.installments)}</strong> sem juros</div>
        </div>
        {/* estoque */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--ink-soft)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1f8a4d" }} />
          <strong className="num" style={{ color: "var(--ink)" }}>{p.stock} unidades</strong> restantes · envio em 24h
        </div>
        {/* qty */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span className="label" style={{ fontSize: 9.5 }}>Quantidade</span>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--hairline-strong)", borderRadius: "var(--r-pill)" }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={railQty}><Icon name="minus" size={15} /></button>
            <span className="num" style={{ minWidth: 32, textAlign: "center", fontWeight: 700 }}>{qty}</span>
            <button onClick={() => setQty(Math.min(p.stock, qty + 1))} style={railQty}><Icon name="plus" size={15} /></button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn variant="primary" size="lg" full iconLeft="lightning" onClick={() => addToCart(p, qty)}>Comprar agora</Btn>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 12.5, color: "var(--muted)" }}>
            <Icon name="lightning" weight="fill" size={13} style={{ color: "var(--amber-deep)" }} /> Vai direto pra sua sacola
          </div>
        </div>
        {/* frete */}
        <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 16 }}>
          <div className="label" style={{ fontSize: 9.5, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Icon name="map-pin" size={14} /> Consultar frete</div>
          <form onSubmit={calcFrete} style={{ display: "flex", gap: 8 }}>
            <input value={cep} onChange={e => setCep(e.target.value)} placeholder="Digite seu CEP" maxLength={9}
              style={{ flex: 1, padding: "11px 14px", borderRadius: "var(--r-md)", border: "1.5px solid var(--hairline-strong)", background: "var(--paper)", fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink)" }} />
            <Btn variant="ink" size="sm" type="submit">Calcular</Btn>
          </form>
          {frete && <div style={{ marginTop: 12, fontSize: 13.5, display: "flex", justifyContent: "space-between", color: "var(--ink-soft)" }}>
            <span><Icon name="truck" size={15} style={{ verticalAlign: "-2px" }} /> {frete.days}</span>
            <strong className="num" style={{ color: frete.price === 0 ? "var(--amber-deep)" : "var(--ink)" }}>{frete.price === 0 ? "Grátis" : brl(frete.price)}</strong>
          </div>}
        </div>
        {/* trust mini */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 6, borderTop: "1px solid var(--hairline)", paddingTop: 14 }}>
          {[["shield-check", "Garantia 2 anos"], ["arrows-counter-clockwise", "Troca em 30 dias"], ["lock-simple", "Compra segura"]].map(([ic, t], i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, textAlign: "center", flex: 1 }}>
              <Icon name={ic} size={20} style={{ color: "var(--amber-deep)" }} />
              <span style={{ fontSize: 10.5, color: "var(--muted)", lineHeight: 1.2 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
const railQty = { width: 38, height: 42, border: "none", background: "transparent", color: "var(--ink)", display: "grid", placeItems: "center", cursor: "pointer" };

/* ---------- página ---------- */
function ProductPage({ p, onOpen }) {
  const { go } = useStore();
  useEffect(() => { window.scrollTo(0, 0); }, [p && p.id]);
  if (!p) return null;
  const cat = D.categories.find(c => c.id === p.cat);
  const related = D.products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 5);

  return (
    <div className="wrap" style={{ paddingTop: 24, maxWidth: 1360 }}>
      {/* breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)", marginBottom: 24, flexWrap: "wrap" }}>
        <button onClick={() => go("home")} style={brc}>Início</button><Icon name="caret-right" size={12} />
        <button onClick={() => go("products", p.cat)} style={brc}>{cat ? cat.label : "Loja"}</button><Icon name="caret-right" size={12} />
        <span style={{ color: "var(--ink)" }}>{p.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 348px", gap: 40, alignItems: "start" }} className="pdp-grid">
        {/* LADO ESQUERDO (galeria + info + descrição + avaliações) */}
        <div className="pdp-left reveal">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(300px, 400px) minmax(0,1fr)", gap: 36, alignItems: "start" }} className="pdp-top">
            <Gallery p={p} />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <span className="label" style={{ color: "var(--amber-deep)" }}>Tonante · {cat ? cat.label : ""}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={iconChip} title="Favoritar"><Icon name="heart" size={17} /></button>
                  <button style={iconChip} title="Compartilhar"><Icon name="share-network" size={17} /></button>
                </div>
              </div>
              <h1 className="display" style={{ margin: "12px 0 0", fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.0 }}>{p.name}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "14px 0 22px", flexWrap: "wrap" }}>
                <Stars value={p.rating} reviews={p.reviews + " avaliações"} size={16} />
                <span className="num label" style={{ fontSize: 10, color: "var(--faint)" }}>SKU {p.sku}</span>
              </div>
              <p style={{ fontSize: 16.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: "0 0 26px" }}>{p.desc}</p>
              <About p={p} />
            </div>
          </div>
          <Description p={p} />
          <Reviews p={p} />
        </div>
        {/* LADO DIREITO (sticky) */}
        <PriceRail p={p} />
      </div>

      {/* relacionados (largura total) */}
      {related.length > 0 && (
        <div style={{ marginTop: 90 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            <div>
              <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 12 }}>// Você também vai gostar</div>
              <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700 }}>Produtos relacionados</h2>
            </div>
            <Btn variant="ghost" iconRight="arrow-right" onClick={() => go("products", p.cat)}>Ver categoria</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 20 }}>
            {related.map(r => <ProductCard key={r.id} p={r} onOpen={onOpen} />)}
          </div>
        </div>
      )}
    </div>
  );
}
const brc = { background: "none", border: "none", color: "var(--muted)", fontFamily: "var(--sans)", fontSize: 13, padding: 0, cursor: "pointer" };
const iconChip = { width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--hairline)", background: "var(--surface)", color: "var(--ink-soft)", display: "grid", placeItems: "center", cursor: "pointer" };

Object.assign(window, { ProductPage });
