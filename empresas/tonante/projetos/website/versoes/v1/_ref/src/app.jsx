/* =========================================================
   TONANTE — App (router + estado + tweaks)
   ========================================================= */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "carousel",
  "productsLayout": "sidebar",
  "accent": "#c87800",
  "theme": "light",
  "fontScale": 1
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = useState("home");
  const [cat, setCat] = useState(null);
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [quickView, setQuickView] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  /* aplica tweaks ao :root */
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme);
    r.style.setProperty("--accent", t.accent);
    // deriva um tom mais escuro para hover
    r.style.setProperty("--accent-deep", shade(t.accent, -18));
    r.style.setProperty("--type-scale", t.fontScale);
  }, [t.theme, t.accent, t.fontScale]);

  /* navegação */
  function go(p, arg) {
    if (p === "products") { setCat(arg || null); setQuery(""); }
    if (p === "product") { setProduct(arg); }
    setPage(p);
    if (p !== "product") window.scrollTo({ top: 0, behavior: "auto" });
  }
  const openProduct = (p) => go("product", p);
  function runSearch(q, cat) { setCat(cat || null); setQuery(q || ""); setProduct(null); setPage("products"); window.scrollTo({ top: 0, behavior: "auto" }); }

  /* carrinho */
  function addToCart(p, qty = 1) {
    setCart(prev => {
      const ex = prev.find(i => i.p.id === p.id);
      if (ex) return prev.map(i => i.p.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { p, qty }];
    });
    setCartOpen(true);
  }
  const updateQty = (id, qty) => setCart(prev => qty <= 0 ? prev.filter(i => i.p.id !== id) : prev.map(i => i.p.id === id ? { ...i, qty } : i));
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.p.id !== id));
  const clearCart = () => setCart([]);
  const buyNow = (p, qty = 1) => { addToCart(p, qty); setCartOpen(false); go("checkout"); };

  const subtotal = cart.reduce((s, i) => s + i.p.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const points = 480 + Math.round(subtotal / 5);
  const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const store = {
    go, page, addToCart, updateQty, removeFromCart, clearCart, buyNow,
    cart, subtotal, cartCount, cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false),
    query, setQuery, runSearch,
    quickView, openQuickView: setQuickView, closeQuickView: () => setQuickView(null),
    loginOpen, openLogin: () => setLoginOpen(true), closeLogin: () => setLoginOpen(false),
    favorites, toggleFav, points,
  };

  return (
    <StoreCtx.Provider value={store}>
      <AnnounceBar />
      <NavBar />
      <main style={{ minHeight: "60vh" }}>
        {page === "home" && <HomePage heroVariant={t.heroVariant} onOpen={openProduct} />}
        {page === "products" && <CatalogPage initialCategory={cat} layout={t.productsLayout} onOpen={openProduct} query={query} />}
        {page === "product" && <ProductPage p={product} onOpen={openProduct} />}
        {page === "checkout" && <CheckoutPage />}
        {page === "dealers" && <DealersPage />}
      </main>
      <Footer />
      <SideCart />
      <QuickView />
      <LoginModal />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout" />
        <TweakRadio label="Hero" value={t.heroVariant} options={[{ value: "carousel", label: "Carrossel" }, { value: "editorial", label: "Editorial" }, { value: "cinematic", label: "Cinema" }]}
          onChange={v => setTweak("heroVariant", v)} />
        <TweakRadio label="Página de produtos" value={t.productsLayout} options={[{ value: "sidebar", label: "Sidebar" }, { value: "topbar", label: "Barra" }]}
          onChange={v => setTweak("productsLayout", v)} />
        <TweakSection label="Marca" />
        <TweakColor label="Cor de destaque" value={t.accent}
          options={["#c87800", "#9a5a00", "#e08c12", "#b3361f"]} onChange={v => setTweak("accent", v)} />
        <TweakRadio label="Tema" value={t.theme} options={[{ value: "light", label: "Claro" }, { value: "dark", label: "Escuro" }]}
          onChange={v => setTweak("theme", v)} />
        <TweakSection label="Tipografia" />
        <TweakSlider label="Escala do texto" value={t.fontScale} min={0.9} max={1.12} step={0.01} unit="x" onChange={v => setTweak("fontScale", v)} />
      </TweaksPanel>
    </StoreCtx.Provider>
  );
}

/* escurece/clareia um hex */
function shade(hex, pct) {
  const n = parseInt(hex.replace("#", ""), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = pct / 100;
  r = Math.round(r + (f < 0 ? r : 255 - r) * f);
  g = Math.round(g + (f < 0 ? g : 255 - g) * f);
  b = Math.round(b + (f < 0 ? b : 255 - b) * f);
  const c = x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, "0");
  return "#" + c(r) + c(g) + c(b);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
