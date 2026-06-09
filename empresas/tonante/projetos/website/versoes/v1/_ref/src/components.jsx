/* =========================================================
   TONANTE — componentes compartilhados
   exporta para window no final
   ========================================================= */
const { useState, useEffect, useRef, useContext, createContext } = React;

/* Contexto global da loja (cart, navegação, tweaks) */
const StoreCtx = createContext({});
const useStore = () => useContext(StoreCtx);

const D = window.TONANTE_DATA;
const brl = D.brl;

/* ---------- ícone Phosphor ---------- */
function Icon({ name, size = 20, weight = "regular", style, className = "" }) {
  return <i className={`ph${weight === "bold" ? "-bold" : weight === "fill" ? "-fill" : ""} ph-${name} ${className}`}
            style={{ fontSize: size, lineHeight: 1, display: "inline-flex", ...style }} aria-hidden="true" />;
}

/* ---------- logo / símbolo ---------- */
function Logo({ kind = "wordmark", color = "dark", h = 30, onClick, style }) {
  const map = {
    wordmark: { dark: "tonante-wordmark-dark.png", white: "tonante-wordmark-white.png", amber: "tonante-wordmark-amber.png" },
    symbol:   { dark: "tonante-symbol-black.png", white: "tonante-symbol-white.png", amber: "tonante-symbol-amber.png" },
  };
  const src = "assets/logos/" + (map[kind][color] || map[kind].dark);
  return <img src={src} alt="Tonante" onClick={onClick}
              style={{ height: h, width: "auto", cursor: onClick ? "pointer" : "default", ...style }} />;
}

/* ---------- botão ---------- */
function Btn({ children, variant = "primary", size = "md", iconLeft, iconRight, full, onClick, type, style }) {
  const sizes = {
    sm: { padding: "9px 16px", fontSize: 13.5 },
    md: { padding: "13px 24px", fontSize: 15 },
    lg: { padding: "17px 34px", fontSize: 16.5 },
  };
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
    fontFamily: "var(--sans)", fontWeight: 600, borderRadius: "var(--r-pill)",
    border: "1.5px solid transparent", width: full ? "100%" : "auto",
    transition: "transform .25s var(--ease), background .25s var(--ease), color .2s, border-color .2s",
    letterSpacing: "-.01em", lineHeight: 1, whiteSpace: "nowrap", ...sizes[size], ...style,
  };
  const variants = {
    primary: { background: "var(--accent)", color: "#fff" },
    ink:     { background: "var(--ink)", color: "var(--paper)" },
    outline: { background: "transparent", color: "var(--ink)", borderColor: "var(--hairline-strong)" },
    ghost:   { background: "transparent", color: "var(--ink)" },
    ondark:  { background: "rgba(255,255,255,.10)", color: "#fff", borderColor: "rgba(255,255,255,.25)", backdropFilter: "blur(6px)" },
  };
  const [hover, setHover] = useState(false);
  const hv = hover ? {
    primary: { background: "var(--accent-deep)", transform: "translateY(-2px)" },
    ink: { transform: "translateY(-2px)", background: "#000" },
    outline: { borderColor: "var(--ink)", transform: "translateY(-2px)" },
    ghost: { background: "rgba(0,0,0,.05)" },
    ondark: { background: "rgba(255,255,255,.18)", transform: "translateY(-2px)" },
  }[variant] : {};
  return (
    <button type={type || "button"} onClick={onClick} style={{ ...base, ...variants[variant], ...hv }}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            onMouseDown={e => e.currentTarget.style.transform = "translateY(0)"}
            onMouseUp={e => e.currentTarget.style.transform = hover ? "translateY(-2px)" : "none"}>
      {iconLeft && <Icon name={iconLeft} size={size === "lg" ? 20 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 20 : 18} />}
    </button>
  );
}

/* ---------- tag / label mono ---------- */
function Tag({ children, tone = "neutral", style }) {
  const tones = {
    neutral: { background: "var(--paper-2)", color: "var(--ink-soft)", border: "1px solid var(--hairline)" },
    amber:   { background: "rgba(200,120,0,.12)", color: "var(--amber-deep)", border: "1px solid rgba(200,120,0,.28)" },
    ink:     { background: "var(--ink)", color: "var(--paper)" },
    sale:    { background: "#b3361f", color: "#fff" },
    ondark:  { background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.2)" },
  };
  return <span className="label" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px",
    borderRadius: "var(--r-pill)", fontSize: 10.5, ...tones[tone], color: tones[tone].color, ...style }}>{children}</span>;
}

/* ---------- estrelas ---------- */
function Stars({ value = 5, reviews, size = 14, color = "var(--amber)" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
      <span style={{ display: "inline-flex", gap: 1, color }}>
        {[0,1,2,3,4].map(i => <Icon key={i} name="star" weight={value - i >= .5 ? "fill" : "regular"} size={size} />)}
      </span>
      {reviews != null && <span className="num" style={{ fontSize: 12.5, color: "var(--muted)" }}>{value.toFixed(1)} · {reviews}</span>}
    </span>
  );
}

/* ---------- preço ---------- */
function Price({ p, size = "md", showInstall = true }) {
  const sizes = { sm: 17, md: 22, lg: 34 };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
        {p.old && <span className="num" style={{ fontSize: sizes[size] * .6, color: "var(--faint)", textDecoration: "line-through" }}>{brl(p.old)}</span>}
        <span className="num display" style={{ fontWeight: 600, fontSize: sizes[size], letterSpacing: "-.02em", color: p.old ? "var(--amber-deep)" : "var(--ink)" }}>{brl(p.price)}</span>
      </div>
      {showInstall && <div className="num" style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
        {p.installments}x de {brl(p.price / p.installments)} sem juros
      </div>}
    </div>
  );
}

/* ---------- placeholder de imagem do produto ---------- */
function ProductMedia({ p, ratio = "1 / 1", radius = "var(--r-lg)", hoverZoom = true, watermark = true, showBadge = true, label = true, view = 0, src, fit = "cover" }) {
  const [hover, setHover] = useState(false);
  const [autoFit, setAutoFit] = useState(null);
  const [a, b] = p.tones;
  const photo = src || (p.images && p.images.length ? p.images[((view % p.images.length) + p.images.length) % p.images.length] : p.img);
  const effFit = autoFit || fit;
  // produto COM foto real
  if (photo) {
    return (
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ position: "relative", aspectRatio: ratio, borderRadius: radius, overflow: "hidden",
          background: "linear-gradient(160deg, #faf7f0, #efe9dc)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.05)" }}>
        <img src={photo} alt={p.name} loading="lazy"
          onLoad={(e) => { const im = e.target; if (im.naturalWidth / im.naturalHeight > 1.3) setAutoFit("contain"); else setAutoFit(null); }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: effFit, objectPosition: "center", padding: effFit === "contain" ? "7%" : 0,
            transform: hover && hoverZoom ? "scale(1.05)" : "scale(1)", transition: "transform .55s var(--ease)" }} />
        {showBadge && p.badge && <span style={{ position: "absolute", left: 14, top: 14, zIndex: 2 }}>
          <Tag tone={p.badge.toLowerCase().includes("promo") ? "sale" : "ondark"}>{p.badge}</Tag>
        </span>}
      </div>
    );
  }
  // placeholder (foto em breve)
  const views = [
    { pos: "30% 18%", rot: 0, sc: 1 },
    { pos: "62% 30%", rot: -8, sc: 1.08 },
    { pos: "44% 62%", rot: 7, sc: 0.95 },
  ];
  const v = views[((view % 3) + 3) % 3];
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", aspectRatio: ratio, borderRadius: radius, overflow: "hidden",
        background: `radial-gradient(120% 120% at ${v.pos}, ${a} 0%, ${b} 78%)`, transition: "background .5s var(--ease)",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)" }}>
      <div className="grain" style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 60% at 28% 22%, rgba(255,255,255,.20), transparent 60%)" }} />
      {watermark && <img src="assets/logos/tonante-symbol-white.png" alt=""
        style={{ position: "absolute", width: "62%", left: "50%", top: "52%", transform: `translate(-50%,-50%) rotate(${v.rot}deg) scale(${(hover && hoverZoom ? 1.06 : 1) * v.sc})`,
          opacity: .9, filter: "drop-shadow(0 12px 30px rgba(0,0,0,.35))", transition: "transform .6s var(--ease)" }} />}
      {label && <span className="label" style={{ position: "absolute", left: 14, bottom: 13, color: "rgba(255,255,255,.85)", fontSize: 9.5, zIndex: 2 }}>
        Foto em breve
      </span>}
      {showBadge && p.badge && <span style={{ position: "absolute", left: 14, top: 14, zIndex: 2 }}>
        <Tag tone={p.badge.toLowerCase().includes("promo") ? "sale" : "ondark"}>{p.badge}</Tag>
      </span>}
    </div>
  );
}

/* ---------- card de produto ---------- */
function ProductCard({ p, onOpen, compact, rank }) {
  const { addToCart, openQuickView, favorites, toggleFav } = useStore();
  const [hover, setHover] = useState(false);
  const [img, setImg] = useState(0);
  const fav = favorites && favorites.includes(p.id);
  const nImg = (p.images && p.images.length) ? Math.min(p.images.length, 4) : 3;
  const cycle = (e, d) => { e.stopPropagation(); setImg(i => (i + d + nImg) % nImg); };
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)",
        overflow: "hidden", display: "flex", flexDirection: "column", height: "100%", transition: "transform .35s var(--ease), box-shadow .35s var(--ease), border-color .3s",
        transform: hover ? "translateY(-5px)" : "none", boxShadow: hover ? "var(--sh-card)" : "none",
        borderColor: hover ? "var(--hairline-strong)" : "var(--hairline)" }}>
      <div style={{ position: "relative", cursor: "pointer", padding: 12 }} onClick={() => onOpen(p)}>
        <ProductMedia p={p} showBadge={false} label={false} view={img} />
        {/* badge desconto / destaque / ranking (topo-esq) */}
        <div style={{ position: "absolute", left: 22, top: 22, zIndex: 3, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
          {rank != null && <span className="num display" style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", fontWeight: 700, fontSize: 16, display: "grid", placeItems: "center" }}>{rank}</span>}
          {rank == null && p.discount && <span className="num" style={{ background: "#b3361f", color: "#fff", fontWeight: 700, fontSize: 13, padding: "5px 10px", borderRadius: "var(--r-pill)" }}>-{p.discount}%</span>}
          {rank == null && !p.discount && p.badge && <Tag tone="ondark">{p.badge}</Tag>}
        </div>
        {/* ações topo-dir: favoritar + quick view */}
        <div style={{ position: "absolute", right: 22, top: 22, zIndex: 3, display: "flex", flexDirection: "column", gap: 8,
          opacity: hover || fav ? 1 : 0, transform: hover || fav ? "translateX(0)" : "translateX(6px)", transition: "all .25s var(--ease)" }}>
          <button onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }} title="Favoritar" style={cardIconBtn}>
            <Icon name="heart" weight={fav ? "fill" : "regular"} size={17} style={{ color: fav ? "#b3361f" : "var(--ink)" }} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); openQuickView(p); }} title="Espiar" style={cardIconBtn}>
            <Icon name="eye" size={17} />
          </button>
        </div>
        {/* setas de imagem */}
        <button onClick={(e) => cycle(e, -1)} aria-label="Imagem anterior" style={{ ...cardImgArrow, left: 20, opacity: hover ? 1 : 0 }}><Icon name="caret-left" size={15} /></button>
        <button onClick={(e) => cycle(e, 1)} aria-label="Próxima imagem" style={{ ...cardImgArrow, right: 20, opacity: hover ? 1 : 0 }}><Icon name="caret-right" size={15} /></button>
        {/* dots */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 24, display: "flex", justifyContent: "center", gap: 5, zIndex: 3 }}>
          {Array.from({ length: nImg }).map((_, i) => <span key={i} style={{ width: img === i ? 14 : 5, height: 5, borderRadius: 99, background: img === i ? "#fff" : "rgba(255,255,255,.55)", transition: "all .25s" }} />)}
        </div>
        {/* comprar (hover, base) */}
        <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, zIndex: 4,
          transform: hover ? "translateY(0)" : "translateY(10px)", opacity: hover ? 1 : 0, transition: "all .3s var(--ease)" }}>
          <button onClick={(e) => { e.stopPropagation(); addToCart(p); }}
            style={{ width: "100%", border: "none", background: "var(--accent)", color: "#fff", borderRadius: "var(--r-pill)",
              padding: "12px 16px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14.5, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
            <Icon name="handbag" size={17} /> Comprar
          </button>
        </div>
      </div>
      <div style={{ padding: compact ? "4px 16px 18px" : "6px 18px 20px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span className="label" style={{ fontSize: 9.5, color: "var(--amber-deep)" }}>{p.tag}</span>
        <h3 onClick={() => onOpen(p)} className="display" style={{ margin: 0, fontSize: 20, fontWeight: 600, cursor: "pointer", letterSpacing: "-.01em", lineHeight: 1.05 }}>{p.name}</h3>
        <Stars value={p.rating} reviews={p.reviews} />
        <div style={{ marginTop: "auto", paddingTop: 8 }}>
          <Price p={p} size="md" showInstall={false} />
          <div className="num" style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 3 }}>
            No PIX <strong style={{ color: "var(--amber-deep)" }}>{brl(p.pix)}</strong> · ou {p.installments}x de {brl(p.price / p.installments)}
          </div>
        </div>
      </div>
    </article>
  );
}
const cardIconBtn = { width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.92)", color: "var(--ink)", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.12)" };
const cardImgArrow = { position: "absolute", top: "44%", zIndex: 3, width: 30, height: 30, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.85)", color: "var(--ink)", display: "grid", placeItems: "center", cursor: "pointer", transition: "opacity .25s" };

/* ---------- chip de categoria ---------- */
function CategoryChip({ active, children, onClick, count }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: "var(--r-pill)",
      border: "1.5px solid " + (active ? "var(--ink)" : "var(--hairline-strong)"),
      background: active ? "var(--ink)" : "transparent", color: active ? "var(--paper)" : "var(--ink)",
      fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, transition: "all .25s var(--ease)", whiteSpace: "nowrap",
    }}>
      {children}
      {count != null && <span className="num" style={{ fontSize: 11.5, opacity: .6 }}>{count}</span>}
    </button>
  );
}

/* ---------- announce bar ---------- */
function AnnounceBar() {
  const items = ["Feita de Histórias desde 1954", "Frete grátis acima de R$ 299", "Até 12x sem juros", "Garantia Tonante de 2 anos"];
  return (
    <div style={{ background: "var(--ink)", color: "var(--paper)", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", gap: 52, padding: "9px 0", animation: "ticker 28s linear infinite" }}>
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="label" style={{ fontSize: 10.5, color: "var(--paper)", display: "inline-flex", alignItems: "center", gap: 52 }}>
            {t} <Icon name="lightning" weight="fill" size={11} style={{ color: "var(--amber)" }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}`}</style>
    </div>
  );
}

/* ---------- busca (sempre aberta) ---------- */
function SearchBar() {
  const { go, runSearch } = useStore();
  const [q, setQ] = useState("");
  const [scope, setScope] = useState("all");
  const [scopeOpen, setScopeOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) { setOpen(false); setScopeOpen(false); } };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const scopeLabel = scope === "all" ? "Todas as categorias" : (D.categories.find(c => c.id === scope) || {}).label;
  const matches = D.products.filter(p => (scope === "all" || p.cat === scope) &&
    (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.tag.toLowerCase().includes(q.toLowerCase()))).slice(0, 6);
  const popular = [...D.products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  function submit(e) { e && e.preventDefault(); runSearch(q, scope === "all" ? null : scope); setOpen(false); }
  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", maxWidth: 640, justifySelf: "center" }} className="search-wrap">
      <form onSubmit={submit} style={{ display: "flex", alignItems: "center", background: "var(--surface)", border: "1.5px solid " + (open ? "var(--amber)" : "var(--hairline-strong)"),
        borderRadius: "var(--r-pill)", height: 48, overflow: "hidden", transition: "border-color .2s" }}>
        <button type="button" onClick={() => setScopeOpen(!scopeOpen)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "0 14px", height: "100%",
          background: "transparent", border: "none", color: "var(--ink-soft)", fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer" }}>
          {scopeLabel} <Icon name="caret-down" size={13} />
        </button>
        <span style={{ width: 1, height: 24, background: "var(--hairline)" }} />
        <input value={q} onChange={e => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder="O que você procura?"
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", padding: "0 14px", fontFamily: "var(--sans)", fontSize: 15, color: "var(--ink)" }} />
        <button type="submit" aria-label="Buscar" style={{ width: 44, height: "100%", border: "none", background: "transparent", color: "var(--ink)", display: "grid", placeItems: "center", cursor: "pointer" }}>
          <Icon name="magnifying-glass" size={19} />
        </button>
      </form>
      {/* dropdown de escopo */}
      {scopeOpen && (
        <div style={{ ...searchPanel, padding: 8, maxWidth: 260 }}>
          {[{ id: "all", label: "Todas as categorias" }, ...D.categories].map(c => (
            <button key={c.id} onClick={() => { setScope(c.id); setScopeOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: "var(--r-md)",
              border: "none", background: scope === c.id ? "var(--paper-2)" : "transparent", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 14, fontWeight: scope === c.id ? 700 : 500, cursor: "pointer" }}>{c.label}</button>
          ))}
        </div>
      )}
      {/* painel de resultados / sugestões */}
      {open && !scopeOpen && (
        <div style={searchPanel}>
          {q ? (
            <div style={{ padding: 12 }}>
              <div className="label" style={{ padding: "4px 8px 10px", color: "var(--muted)" }}>{matches.length} resultado{matches.length !== 1 ? "s" : ""} para "{q}"</div>
              {matches.map(p => (
                <button key={p.id} onClick={() => { go("product", p); setOpen(false); }} style={resultRow}>
                  <div style={{ width: 46, flexShrink: 0 }}><ProductMedia p={p} ratio="1/1" hoverZoom={false} label={false} showBadge={false} /></div>
                  <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>{p.name}</div>
                    <div className="num" style={{ fontSize: 12.5, color: "var(--amber-deep)", marginTop: 2 }}>{brl(p.pix)} no Pix</div>
                  </div>
                  <Icon name="arrow-up-right" size={15} style={{ color: "var(--faint)" }} />
                </button>
              ))}
              {matches.length === 0 && <div style={{ padding: "18px 8px", color: "var(--muted)", fontSize: 14 }}>Nada encontrado. Tente outro termo.</div>}
              {matches.length > 0 && <button onClick={submit} style={{ ...resultRow, justifyContent: "center", color: "var(--amber-deep)", fontWeight: 700, marginTop: 4 }}>Ver todos os resultados <Icon name="arrow-right" size={14} /></button>}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 0 }} className="search-suggest">
              <div style={{ padding: 16, borderRight: "1px solid var(--hairline)" }}>
                <div className="label" style={{ marginBottom: 12 }}>Em alta</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {popular.map(p => (
                    <button key={p.id} onClick={() => { go("product", p); setOpen(false); }} style={{ display: "flex", gap: 9, alignItems: "center", padding: 8, borderRadius: "var(--r-md)", border: "none", background: "var(--paper-2)", cursor: "pointer", textAlign: "left" }}>
                      <div style={{ width: 40, flexShrink: 0 }}><ProductMedia p={p} ratio="1/1" hoverZoom={false} label={false} showBadge={false} /></div>
                      <span style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.15 }}>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div className="label" style={{ marginBottom: 12 }}>Mais buscados</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {D.categories.map(c => (
                    <button key={c.id} onClick={() => { go("products", c.id); setOpen(false); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", border: "none", background: "none", color: "var(--ink-soft)", fontFamily: "var(--sans)", fontSize: 14, cursor: "pointer" }}>
                      {c.label} <Icon name="arrow-up-right" size={13} style={{ color: "var(--faint)" }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const searchPanel = { position: "absolute", top: "calc(100% + 10px)", left: 0, right: 0, background: "var(--surface)", border: "1px solid var(--hairline)",
  borderRadius: "var(--r-lg)", boxShadow: "var(--sh-pop)", zIndex: 60, overflow: "hidden" };
const resultRow = { display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "8px", borderRadius: "var(--r-md)", border: "none", background: "transparent", cursor: "pointer" };

/* ---------- megamenu de categoria ---------- */
function MegaMenu({ cat, onOpenProduct, onClose }) {
  const { go } = useStore();
  const prods = D.products.filter(p => p.cat === cat.id).slice(0, 4);
  return (
    <div onMouseLeave={onClose} style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: "min(880px, 92vw)",
      background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-pop)", zIndex: 55, padding: 22, marginTop: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div><span className="label" style={{ color: "var(--amber-deep)" }}>{cat.label}</span>
          <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{cat.blurb}</div></div>
        <button onClick={() => { go("products", cat.id); onClose(); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--amber-deep)", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Ver todos ({cat.count}) <Icon name="arrow-right" size={14} /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {prods.map(p => (
          <button key={p.id} onClick={() => { onOpenProduct(p); onClose(); }} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}>
            <div style={{ borderRadius: "var(--r-md)", overflow: "hidden" }}><ProductMedia p={p} ratio="1/1" hoverZoom={false} label={false} showBadge={false} /></div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8, lineHeight: 1.2 }}>{p.name}</div>
            <div className="num" style={{ fontSize: 12.5, color: "var(--amber-deep)", marginTop: 2 }}>{brl(p.pix)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- navbar ---------- */
function NavBar() {
  const { go, cartCount, openCart, openLogin } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const closeT = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const openProduct = (p) => go("product", p);
  const navItems = [{ label: "Início", id: "home" }, { label: "Loja", id: "all" }, ...D.categories.map(c => ({ label: c.label, id: c.id, cat: c })), { label: "Onde encontrar", id: "dealers" }];
  const enter = (it) => { clearTimeout(closeT.current); setHovered(it.cat ? it.id : null); };
  const leave = () => { closeT.current = setTimeout(() => setHovered(null), 120); };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40,
      background: scrolled ? "color-mix(in srgb, var(--paper) 92%, transparent)" : "var(--paper)",
      backdropFilter: scrolled ? "blur(12px) saturate(1.2)" : "none",
      borderBottom: "1px solid " + (scrolled ? "var(--hairline)" : "transparent"), transition: "all .35s var(--ease)" }}>
      {/* linha 1: logo + busca + ícones */}
      <div className="wrap header-top" style={{ display: "grid", gridTemplateColumns: "1fr minmax(280px, 640px) 1fr", alignItems: "center", gap: 24, height: 76 }}>
        <Logo kind="wordmark" color="dark" h={30} onClick={() => go("home")} style={{ flexShrink: 0, justifySelf: "start" }} />
        <SearchBar />
        <div style={{ display: "flex", alignItems: "center", gap: 4, justifySelf: "end" }}>
          <button onClick={() => go("dealers")} title="Onde encontrar" style={navIconStyle} className="nav-icon-hide"><Icon name="map-pin" size={20} /></button>
          <button title="Favoritos" style={navIconStyle} className="nav-icon-hide"><Icon name="heart" size={20} /></button>
          <button onClick={openLogin} title="Conta" style={navIconStyle} className="nav-icon-hide"><Icon name="user" size={20} /></button>
          <button onClick={openCart} title="Sacola" style={{ ...navIconStyle, position: "relative" }}>
            <Icon name="handbag" size={20} />
            {cartCount > 0 && <span className="num" style={{ position: "absolute", top: 1, right: 1, minWidth: 18, height: 18, padding: "0 4px",
              borderRadius: 9, background: "var(--accent)", color: "#fff", fontSize: 11, fontWeight: 700, display: "grid", placeItems: "center" }}>{cartCount}</span>}
          </button>
        </div>
      </div>
      {/* linha 2: navegação com megamenu */}
      <nav style={{ position: "relative", borderTop: "1px solid var(--hairline)" }} className="nav-links">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, height: 48 }}>
          {navItems.map((it, i) => (
            <div key={i} onMouseEnter={() => enter(it)} onMouseLeave={leave} style={{ position: "static" }}>
              <button onClick={() => it.id === "home" ? go("home") : it.id === "dealers" ? go("dealers") : go("products", it.id === "all" ? null : it.id)} style={{
                display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", color: hovered === it.id ? "var(--amber-deep)" : "var(--ink)",
                fontFamily: "var(--sans)", fontWeight: 500, fontSize: 14.5, padding: "6px 12px", borderRadius: "var(--r-pill)", cursor: "pointer", transition: "color .2s" }}>
                {it.label}{it.cat && <Icon name="caret-down" size={12} style={{ opacity: .6 }} />}
              </button>
            </div>
          ))}
        </div>
        {hovered && (() => { const c = D.categories.find(x => x.id === hovered); return c ? (
          <div onMouseEnter={() => clearTimeout(closeT.current)} onMouseLeave={leave}><MegaMenu cat={c} onOpenProduct={openProduct} onClose={() => setHovered(null)} /></div>
        ) : null; })()}
      </nav>
    </header>
  );
}
const navIconStyle = { width: 44, height: 44, borderRadius: "50%", border: "none", background: "transparent",
  color: "var(--ink)", display: "grid", placeItems: "center", transition: "background .2s", cursor: "pointer" };

/* ---------- section head editorial ---------- */
function SectionHead({ kicker, title, children, align = "left" }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 34, textAlign: align }}>
      <div>
        {kicker && <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 14 }}>{kicker}</div>}
        <h2 className="display" style={{ margin: 0, fontSize: "clamp(30px, 4.4vw, 52px)", fontWeight: 700 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const { go } = useStore();
  const cols = [
    { h: "Loja", items: D.categories.map(c => c.label) },
    { h: "Ajuda", items: ["Rastrear pedido", "Trocas e devoluções", "Garantia", "Fale conosco"] },
    { h: "A Tonante", items: ["Nossa história", "Feita de Histórias", "Lojistas", "Trabalhe conosco"] },
  ];
  return (
    <footer className="grain" style={{ position: "relative", background: "var(--stage)", color: "#e9e1d4", marginTop: 100, overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-6%", top: "-30%", width: 520, height: 520, background: "radial-gradient(circle, rgba(200,120,0,.20), transparent 70%)", pointerEvents: "none" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2, paddingTop: 72, paddingBottom: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }} className="footer-grid">
          <div>
            <Logo kind="wordmark" color="white" h={40} />
            <p className="serif" style={{ fontSize: 22, lineHeight: 1.3, marginTop: 22, maxWidth: 280, color: "#f4ecdf" }}>
              Feita de Histórias.<br />Desde 1954.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {["instagram-logo", "youtube-logo", "tiktok-logo", "spotify-logo"].map(s => (
                <a key={s} href="#" style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,.18)",
                  display: "grid", placeItems: "center", color: "#e9e1d4" }}><Icon name={s} size={19} /></a>
              ))}
            </div>
          </div>
          {cols.map((c, i) => (
            <div key={i}>
              <div className="label" style={{ color: "var(--amber)", marginBottom: 18 }}>{c.h}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {c.items.map((it, j) => <li key={j}><a href="#" onClick={(e)=>{e.preventDefault(); i===0 && go("products");}} style={{ color: "#cabfae", fontSize: 14.5, opacity: .82 }}>{it}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap",
          marginTop: 56, paddingTop: 26, borderTop: "1px solid rgba(255,255,255,.12)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span className="label" style={{ color: "var(--amber)", fontSize: 9, marginRight: 4 }}>Pague com</span>
            {[["Visa", "credit-card"], ["Master", "credit-card"], ["Pix", "lightning"], ["Boleto", "barcode"]].map(([t, ic], i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", fontSize: 12.5, fontWeight: 600 }}>
                <Icon name={ic} size={15} style={{ color: "var(--amber)" }} /> {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", opacity: .7 }}>
            {["shield-check", "lock-simple", "seal-check"].map(s => <Icon key={s} name={s} size={18} />)}
            <span style={{ fontSize: 13 }}>Site 100% seguro</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 22, fontSize: 12.5, opacity: .55 }}>
          <span>Oderço Distribuidora de Eletrônicos LTDA · CNPJ 09.301.845/0001-91 · © 2026 Tonante Instrumentos Musicais</span>
          <span>Feita de Histórias · Desde 1954</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  StoreCtx, useStore, Icon, Logo, Btn, Tag, Stars, Price, ProductMedia, ProductCard,
  CategoryChip, AnnounceBar, NavBar, SectionHead, Footer, D, brl,
});
