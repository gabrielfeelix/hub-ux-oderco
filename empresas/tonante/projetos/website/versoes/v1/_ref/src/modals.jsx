/* =========================================================
   TONANTE — Modais: Quick View + Login
   ========================================================= */

/* ---------- Quick View ---------- */
function QuickView() {
  const { quickView, closeQuickView, addToCart, go, favorites, toggleFav } = useStore();
  const [view, setView] = useState(0);
  useEffect(() => { setView(0); }, [quickView && quickView.id]);
  const open = !!quickView;
  const p = quickView;
  const fav = p && favorites && favorites.includes(p.id);
  const cat = p && D.categories.find(c => c.id === p.cat);
  return (
    <div aria-hidden={!open} style={{ position: "fixed", inset: 0, zIndex: 70, display: "grid", placeItems: "center", padding: 20,
      background: "rgba(20,16,12,.5)", backdropFilter: "blur(3px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .3s var(--ease)" }}
      onClick={closeQuickView}>
      {p && (
        <div onClick={e => e.stopPropagation()} className="qv-card" style={{ width: "min(1000px, 96vw)", maxHeight: "90vh", overfl: "hidden", background: "var(--surface)",
          borderRadius: "var(--r-lg)", boxShadow: "var(--sh-float)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          transform: open ? "scale(1)" : "scale(.96)", transition: "transform .3s var(--ease)", overflow: "hidden" }}>
          {/* galeria */}
          <div style={{ padding: 22, display: "grid", gridTemplateColumns: "56px 1fr", gap: 12, background: "var(--paper-2)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[0, 1, 2].map(i => (
                <button key={i} onClick={() => setView(i)} style={{ padding: 0, border: "2px solid " + (view === i ? "var(--amber)" : "var(--hairline)"), borderRadius: "var(--r-md)", overflow: "hidden", background: "none", cursor: "pointer", aspectRatio: "1/1" }}>
                  <ProductMedia p={p} ratio="1/1" hoverZoom={false} label={false} showBadge={false} view={i} />
                </button>
              ))}
            </div>
            <ProductMedia p={p} ratio="1/1" hoverZoom={false} label={false} showBadge={false} view={view} />
          </div>
          {/* info */}
          <div className="scroll-thin" style={{ padding: "26px 28px", overflowY: "auto", position: "relative", display: "flex", flexDirection: "column" }}>
            <button onClick={closeQuickView} aria-label="Fechar" style={{ position: "absolute", top: 18, right: 18, width: 38, height: 38, borderRadius: "50%", border: "none", background: "var(--paper-2)", display: "grid", placeItems: "center", cursor: "pointer" }}><Icon name="x" size={18} /></button>
            <span className="label" style={{ color: "var(--amber-deep)" }}>{cat ? cat.label : ""}</span>
            <h2 className="display" style={{ margin: "10px 0 0", fontSize: 28, fontWeight: 700, lineHeight: 1.02, paddingRight: 40 }}>{p.name}</h2>
            <div style={{ margin: "12px 0 16px" }}><Stars value={p.rating} reviews={p.reviews + " avaliações"} size={15} /></div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              {p.old && <span className="num" style={{ fontSize: 15, color: "var(--faint)", textDecoration: "line-through" }}>{brl(p.old)}</span>}
              <span className="num display" style={{ fontSize: 34, fontWeight: 700, color: p.old ? "var(--amber-deep)" : "var(--ink)" }}>{brl(p.pix)}</span>
              <span className="label" style={{ fontSize: 9 }}>no Pix</span>
            </div>
            <div className="num" style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>ou {p.installments}x de {brl(p.price / p.installments)} sem juros</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--ink-soft)", margin: "16px 0" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1f8a4d" }} /><strong className="num">{p.stock} em estoque</strong> · envio em 24h
            </div>
            <div className="label" style={{ color: "var(--amber-deep)", margin: "4px 0 12px", display: "flex", gap: 7 }}><span style={{ color: "var(--faint)" }}>//</span> Sobre o produto</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              {D.aboutFor(p).slice(0, 5).map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5, color: "var(--ink-soft)" }}>
                  <Icon name="check-circle" weight="fill" size={17} style={{ color: "var(--amber-deep)", flexShrink: 0, marginTop: 1 }} /> {b}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "auto", paddingTop: 22, display: "flex", gap: 10 }}>
              <Btn variant="primary" size="lg" full iconLeft="handbag" onClick={() => { addToCart(p); closeQuickView(); }}>Comprar</Btn>
              <button onClick={() => toggleFav(p.id)} title="Favoritar" style={{ width: 54, flexShrink: 0, borderRadius: "var(--r-pill)", border: "1.5px solid var(--hairline-strong)", background: "var(--surface)", display: "grid", placeItems: "center", cursor: "pointer" }}>
                <Icon name="heart" weight={fav ? "fill" : "regular"} size={20} style={{ color: fav ? "#b3361f" : "var(--ink)" }} />
              </button>
            </div>
            <button onClick={() => { go("product", p); closeQuickView(); }} style={{ marginTop: 12, background: "none", border: "none", color: "var(--amber-deep)", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              Ver página completa <Icon name="arrow-right" size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Login ---------- */
function LoginModal() {
  const { loginOpen, closeLogin } = useStore();
  const [mode, setMode] = useState("login");
  const open = loginOpen;
  return (
    <div aria-hidden={!open} onClick={closeLogin} style={{ position: "fixed", inset: 0, zIndex: 75, display: "grid", placeItems: "center", padding: 20,
      background: "rgba(20,16,12,.55)", backdropFilter: "blur(3px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .3s var(--ease)" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "min(420px, 96vw)", background: "var(--surface)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-float)",
        padding: 32, position: "relative", transform: open ? "translateY(0)" : "translateY(10px)", transition: "transform .3s var(--ease)" }}>
        <button onClick={closeLogin} aria-label="Fechar" style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", border: "none", background: "var(--paper-2)", display: "grid", placeItems: "center", cursor: "pointer" }}><Icon name="x" size={17} /></button>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Logo kind="wordmark" color="dark" h={34} style={{ margin: "0 auto" }} />
          <h2 className="display" style={{ fontSize: 24, fontWeight: 700, margin: "18px 0 4px" }}>{mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}</h2>
          <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>{mode === "login" ? "Entre pra acompanhar pedidos e juntar Tonante Points." : "Junte-se à Tonante e comece a juntar pontos."}</p>
        </div>
        {/* sociais */}
        <button style={socialBtn}><Icon name="google-logo" weight="bold" size={19} style={{ color: "#ea4335" }} /> Continuar com Google</button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <button style={socialBtn}><Icon name="facebook-logo" weight="fill" size={19} style={{ color: "#1877f2" }} /> Facebook</button>
          <button style={socialBtn}><Icon name="apple-logo" weight="fill" size={19} /> Apple</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0", color: "var(--faint)", fontSize: 12.5 }}>
          <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} /> ou <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
        </div>
        <form onSubmit={(e) => { e.preventDefault(); closeLogin(); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={loginField}><Icon name="envelope-simple" size={18} style={{ color: "var(--muted)" }} /><input type="email" required placeholder="Seu e-mail" style={loginInput} /></div>
          {mode === "signup" && <div style={loginField}><Icon name="user" size={18} style={{ color: "var(--muted)" }} /><input type="text" required placeholder="Seu nome" style={loginInput} /></div>}
          <div style={loginField}><Icon name="lock-simple" size={18} style={{ color: "var(--muted)" }} /><input type="password" required placeholder="Senha" style={loginInput} /></div>
          {mode === "login" && <a href="#" onClick={e => e.preventDefault()} style={{ alignSelf: "flex-end", fontSize: 13, color: "var(--amber-deep)", fontWeight: 600 }}>Esqueceu a senha?</a>}
          <Btn type="submit" variant="primary" size="lg" full iconRight="arrow-right">{mode === "login" ? "Entrar" : "Criar conta"}</Btn>
        </form>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 14, color: "var(--muted)" }}>
          {mode === "login" ? "Não tem conta? " : "Já tem conta? "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} style={{ background: "none", border: "none", color: "var(--amber-deep)", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            {mode === "login" ? "Cadastre-se" : "Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}
const socialBtn = { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "13px 16px", borderRadius: "var(--r-pill)",
  border: "1.5px solid var(--hairline-strong)", background: "var(--surface)", color: "var(--ink)", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14.5, cursor: "pointer" };
const loginField = { display: "flex", alignItems: "center", gap: 10, padding: "0 15px", borderRadius: "var(--r-md)", border: "1.5px solid var(--hairline-strong)", background: "var(--paper)" };
const loginInput = { flex: 1, border: "none", outline: "none", background: "transparent", padding: "13px 0", fontFamily: "var(--sans)", fontSize: 15, color: "var(--ink)" };

Object.assign(window, { QuickView, LoginModal });
