/* =========================================================
   TONANTE — Página de Produtos (Catálogo) v2
   Filtro lateral rico + chips + ordenação + grid/lista + paginação
   ========================================================= */

const SORTS = [
  { id: "rel", label: "Relevância" },
  { id: "price-asc", label: "Menor preço" },
  { id: "price-desc", label: "Maior preço" },
  { id: "rating", label: "Mais bem avaliados" },
  { id: "discount", label: "Maior desconto" },
];

function useCatalog(initialCat) {
  const [cat, setCat] = useState(initialCat || "all");
  const [sort, setSort] = useState("rel");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [promo, setPromo] = useState(false);
  const [promo10, setPromo10] = useState(false);
  const [attrs, setAttrs] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  useEffect(() => { setCat(initialCat || "all"); setPage(1); }, [initialCat]);
  useEffect(() => { setAttrs([]); }, [cat]);
  useEffect(() => { setPage(1); }, [cat, sort, minPrice, maxPrice, promo, promo10, attrs, perPage]);

  const toggleAttr = (a) => setAttrs(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  function clearAll() { setCat("all"); setMinPrice(0); setMaxPrice(3500); setPromo(false); setPromo10(false); setAttrs([]); setSort("rel"); }

  let list = D.products.filter(p =>
    (cat === "all" || p.cat === cat) &&
    p.price >= minPrice && p.price <= maxPrice &&
    (!promo || p.old) &&
    (!promo10 || (p.discount && p.discount >= 10)) &&
    (attrs.length === 0 || attrs.some(a => p.attrs.includes(a)))
  );
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  if (sort === "discount") list = [...list].sort((a, b) => (b.discount || 0) - (a.discount || 0));

  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const paged = list.slice((page - 1) * perPage, page * perPage);

  return { cat, setCat, sort, setSort, minPrice, setMinPrice, maxPrice, setMaxPrice, promo, setPromo, promo10, setPromo10,
    attrs, toggleAttr, clearAll, list, paged, total, page, setPage, pages, perPage, setPerPage };
}

/* grupo de filtro recolhível */
function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid var(--hairline)", paddingBottom: open ? 18 : 0 }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 0", background: "none", border: "none", cursor: "pointer" }}>
        <span className="label" style={{ color: "var(--ink)" }}>{title}</span>
        <Icon name={open ? "caret-up" : "caret-down"} size={14} style={{ color: "var(--muted)" }} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function CheckRow({ checked, onChange, label, count }) {
  return (
    <label onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", cursor: "pointer", fontSize: 14.5 }}>
      <span style={{ width: 19, height: 19, borderRadius: 6, border: "1.5px solid " + (checked ? "var(--amber)" : "var(--hairline-strong)"),
        background: checked ? "var(--amber)" : "transparent", display: "grid", placeItems: "center", flexShrink: 0, transition: "all .15s" }}>
        {checked && <Icon name="check" weight="bold" size={12} style={{ color: "#fff" }} />}
      </span>
      <span style={{ flex: 1, color: "var(--ink-soft)" }}>{label}</span>
      {count != null && <span className="num" style={{ fontSize: 12, color: "var(--faint)" }}>({count})</span>}
    </label>
  );
}

function SortSelect({ value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={selStyle}>
        {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>
      <Icon name="caret-down" size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)" }} />
    </div>
  );
}
const selStyle = { appearance: "none", WebkitAppearance: "none", background: "var(--surface)", border: "1px solid var(--hairline-strong)",
  borderRadius: "var(--r-pill)", padding: "10px 36px 10px 16px", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, color: "var(--ink)", cursor: "pointer" };

function CatHeader({ cat }) {
  const c = D.categories.find(x => x.id === cat);
  const title = cat === "all" ? "Toda a loja" : (c ? c.label : "Loja");
  const blurb = cat === "all" ? "Tudo que conecta gente à música, num só lugar — com garantia oficial, frete grátis acima de R$ 299 e até 12x sem juros." : (c ? c.blurb : "");
  return (
    <div style={{ marginBottom: 26 }}>
      <h1 className="display" style={{ margin: 0, fontSize: "clamp(32px,4.4vw,54px)", fontWeight: 700 }}>{title}</h1>
      <p style={{ margin: "10px 0 0", fontSize: 16, color: "var(--ink-soft)", maxWidth: 560 }}>{blurb}</p>
    </div>
  );
}

/* chips de filtros ativos */
function ActiveChips({ c }) {
  const chips = [];
  const catObj = D.categories.find(x => x.id === c.cat);
  if (c.cat !== "all" && catObj) chips.push({ label: catObj.label, clear: () => c.setCat("all") });
  if (c.promo) chips.push({ label: "Em promoção", clear: () => c.setPromo(false) });
  if (c.promo10) chips.push({ label: "10%+ OFF", clear: () => c.setPromo10(false) });
  c.attrs.forEach(a => chips.push({ label: a, clear: () => c.toggleAttr(a) }));
  if (c.minPrice > 0 || c.maxPrice < 3500) chips.push({ label: brl(c.minPrice) + " – " + brl(c.maxPrice), clear: () => { c.setMinPrice(0); c.setMaxPrice(3500); } });
  if (chips.length === 0) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
      {chips.map((ch, i) => (
        <button key={i} onClick={ch.clear} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: "var(--r-pill)",
          border: "1px solid var(--hairline-strong)", background: "var(--surface)", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          {ch.label} <Icon name="x" size={12} style={{ color: "var(--muted)" }} />
        </button>
      ))}
      <button onClick={c.clearAll} style={{ background: "none", border: "none", color: "var(--amber-deep)", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13.5, cursor: "pointer", textDecoration: "underline" }}>Limpar tudo</button>
    </div>
  );
}

/* sidebar de filtros */
function FilterSidebar({ c }) {
  return (
    <aside style={{ position: "sticky", top: 132 }} className="catalog-aside">
      <FilterGroup title="Categorias">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[{ id: "all", label: "Tudo", count: D.products.length }, ...D.categories].map(cc => (
            <button key={cc.id} onClick={() => c.setCat(cc.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0",
              border: "none", background: "none", color: c.cat === cc.id ? "var(--amber-deep)" : "var(--ink-soft)", fontFamily: "var(--sans)",
              fontWeight: c.cat === cc.id ? 700 : 500, fontSize: 14.5, cursor: "pointer", textAlign: "left" }}>
              {cc.label}<span className="num" style={{ fontSize: 12, color: "var(--faint)" }}>({cc.count})</span>
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Atributos">
        {D.attrsForCat(c.cat).map(a => {
          const pool = D.products.filter(p => c.cat === "all" || p.cat === c.cat);
          const count = pool.filter(p => p.attrs.includes(a)).length;
          if (!count) return null;
          return <CheckRow key={a} checked={c.attrs.includes(a)} onChange={() => c.toggleAttr(a)} label={a} count={count} />;
        })}
        {D.attrsForCat(c.cat).length === 0 && <div style={{ fontSize: 13, color: "var(--faint)", padding: "4px 0" }}>Sem filtros para esta categoria.</div>}
      </FilterGroup>
      <FilterGroup title="Preço">
        <input type="range" min="0" max="3500" step="10" value={c.maxPrice} onChange={e => c.setMaxPrice(+e.target.value)} style={{ width: "100%", accentColor: "var(--amber)", marginTop: 6 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span className="label" style={{ fontSize: 9 }}>Mín</span>
            <input type="number" value={c.minPrice} min="0" onChange={e => c.setMinPrice(Math.max(0, +e.target.value || 0))} style={priceInput} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span className="label" style={{ fontSize: 9 }}>Máx</span>
            <input type="number" value={c.maxPrice} max="3500" onChange={e => c.setMaxPrice(+e.target.value || 0)} style={priceInput} />
          </label>
        </div>
      </FilterGroup>
      <FilterGroup title="Promoção">
        <CheckRow checked={c.promo} onChange={() => c.setPromo(!c.promo)} label="Em promoção" count={D.products.filter(p => p.old).length} />
        <CheckRow checked={c.promo10} onChange={() => c.setPromo10(!c.promo10)} label="A partir de 10% OFF" count={D.products.filter(p => p.discount && p.discount >= 10).length} />
      </FilterGroup>
    </aside>
  );
}
const priceInput = { padding: "9px 11px", borderRadius: "var(--r-md)", border: "1.5px solid var(--hairline-strong)", background: "var(--surface)", fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink)", width: "100%" };

/* linha (list view) */
function ProductRow({ p, onOpen }) {
  const { addToCart } = useStore();
  return (
    <article style={{ display: "grid", gridTemplateColumns: "140px 1fr auto", gap: 22, alignItems: "center", padding: 16,
      background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)" }} className="prod-row">
      <div style={{ width: 140, cursor: "pointer" }} onClick={() => onOpen(p)}><ProductMedia p={p} ratio="1/1" hoverZoom={false} label={false} showBadge={false} /></div>
      <div style={{ minWidth: 0 }}>
        <span className="label" style={{ fontSize: 9.5, color: "var(--amber-deep)" }}>{p.tag}</span>
        <h3 onClick={() => onOpen(p)} className="display" style={{ margin: "6px 0 8px", fontSize: 22, fontWeight: 600, cursor: "pointer" }}>{p.name}</h3>
        <Stars value={p.rating} reviews={p.reviews} />
        <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--muted)", maxWidth: 460, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
      </div>
      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", minWidth: 170 }}>
        <Price p={p} size="md" showInstall={false} />
        <div className="num" style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>No PIX <strong style={{ color: "var(--amber-deep)" }}>{brl(p.pix)}</strong></div>
        <Btn variant="primary" iconLeft="handbag" onClick={() => addToCart(p)}>Comprar</Btn>
      </div>
    </article>
  );
}

/* paginação */
function Pagination({ page, pages, setPage }) {
  if (pages <= 1) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 44 }}>
      <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ ...pgBtn, opacity: page === 1 ? .4 : 1 }}>Anterior</button>
      {Array.from({ length: pages }).map((_, i) => (
        <button key={i} onClick={() => setPage(i + 1)} style={{ ...pgBtn, minWidth: 40,
          background: page === i + 1 ? "var(--amber)" : "transparent", color: page === i + 1 ? "#fff" : "var(--ink)",
          borderColor: page === i + 1 ? "var(--amber)" : "var(--hairline-strong)", fontWeight: 700 }}>{i + 1}</button>
      ))}
      <button disabled={page === pages} onClick={() => setPage(page + 1)} style={{ ...pgBtn, opacity: page === pages ? .4 : 1 }}>Próxima</button>
    </div>
  );
}
const pgBtn = { padding: "9px 16px", borderRadius: "var(--r-pill)", border: "1.5px solid var(--hairline-strong)", background: "transparent", color: "var(--ink)", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, cursor: "pointer" };

function CatalogSidebar({ c, onOpen }) {
  const [view, setView] = useState("grid");
  return (
    <div className="wrap" style={{ paddingTop: 22 }}>
      <CatHeader cat={c.cat} />
      <div style={{ display: "grid", gridTemplateColumns: "262px 1fr", gap: 44, alignItems: "start" }} className="catalog-split">
        <FilterSidebar c={c} />
        <div>
          {/* toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
            <span style={{ fontSize: 14.5, color: "var(--ink-soft)" }}>Mostrando <strong className="num">{c.total}</strong> produtos</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="funnel" size={15} style={{ color: "var(--muted)" }} />
                <SortSelect value={c.sort} onChange={c.setSort} />
              </div>
              <div style={{ position: "relative" }}>
                <select value={c.perPage} onChange={e => c.setPerPage(+e.target.value)} style={selStyle}>
                  {[8, 12, 16, 24].map(n => <option key={n} value={n}>Mostrar: {n}</option>)}
                </select>
                <Icon name="caret-down" size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)" }} />
              </div>
              <div style={{ display: "flex", gap: 2, border: "1px solid var(--hairline-strong)", borderRadius: "var(--r-pill)", padding: 3 }}>
                {[["grid", "squares-four"], ["list", "rows"]].map(([v, ic]) => (
                  <button key={v} onClick={() => setView(v)} style={{ width: 38, height: 34, borderRadius: 99, border: "none",
                    background: view === v ? "var(--ink)" : "transparent", color: view === v ? "var(--paper)" : "var(--muted)", display: "grid", placeItems: "center", cursor: "pointer" }}>
                    <Icon name={ic} size={17} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ActiveChips c={c} />
          {/* resultados */}
          {c.total === 0 ? <EmptyState /> : view === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(224px, 1fr))", gap: 22 }}>
              {c.paged.map((p, i) => <div key={p.id} className="reveal" style={{ animationDelay: (i % 8) * 0.04 + "s" }}><ProductCard p={p} onOpen={onOpen} /></div>)}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {c.paged.map(p => <ProductRow key={p.id} p={p} onOpen={onOpen} />)}
            </div>
          )}
          <Pagination page={c.page} pages={c.pages} setPage={c.setPage} />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--muted)" }}>
      <Icon name="magnifying-glass" size={40} style={{ color: "var(--faint)" }} />
      <p className="display" style={{ fontSize: 26, color: "var(--ink)", margin: "16px 0 4px" }}>Nada por aqui ainda</p>
      <p style={{ margin: 0 }}>Tente ajustar os filtros de preço, categoria ou promoção.</p>
    </div>
  );
}

/* variante topbar (mantida como alternativa via Tweaks) */
function CatalogTopbar({ c, onOpen }) {
  return (
    <div className="wrap" style={{ paddingTop: 22 }}>
      <CatHeader cat={c.cat} />
      <div className="no-bar" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 18 }}>
        {[{ id: "all", label: "Tudo", count: D.products.length }, ...D.categories].map(cc => (
          <CategoryChip key={cc.id} active={c.cat === cc.id} count={cc.count} onClick={() => c.setCat(cc.id)}>{cc.label}</CategoryChip>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap",
        padding: "14px 20px", background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-pill)", marginBottom: 24 }}>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14.5, fontWeight: 500 }}
          onClick={() => c.setPromo(!c.promo)}>
          <span style={{ width: 44, height: 26, borderRadius: 99, background: c.promo ? "var(--amber)" : "var(--hairline-strong)", position: "relative", transition: "background .25s", flexShrink: 0 }}>
            <span style={{ position: "absolute", top: 3, left: c.promo ? 21 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s var(--ease)", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
          </span>
          Só promoções
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="num" style={{ fontSize: 13.5, color: "var(--muted)", whiteSpace: "nowrap" }}>{c.total} itens</span>
          <SortSelect value={c.sort} onChange={c.setSort} />
        </div>
      </div>
      {c.total === 0 ? <EmptyState /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 22 }}>
          {c.paged.map((p, i) => <div key={p.id} className="reveal" style={{ animationDelay: (i % 8) * 0.04 + "s" }}><ProductCard p={p} onOpen={onOpen} /></div>)}
        </div>
      )}
      <Pagination page={c.page} pages={c.pages} setPage={c.setPage} />
    </div>
  );
}

function CatalogPage({ initialCategory, layout, onOpen }) {
  const c = useCatalog(initialCategory);
  return layout === "topbar" ? <CatalogTopbar c={c} onOpen={onOpen} /> : <CatalogSidebar c={c} onOpen={onOpen} />;
}

Object.assign(window, { CatalogPage });
