/* =========================================================
   TONANTE — Side-cart + Checkout
   ========================================================= */
const FREE_SHIP = 299;

function CartLine({ item, dark }) {
  const { updateQty, removeFromCart } = useStore();
  const { p, qty } = item;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "72px 1fr auto", gap: 14, alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--hairline)" }}>
      <div style={{ width: 72 }}><ProductMedia p={p} ratio="1/1" hoverZoom={false} watermark /></div>
      <div style={{ minWidth: 0 }}>
        <div className="display" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.1 }}>{p.name}</div>
        <div className="label" style={{ fontSize: 9, marginTop: 4 }}>{p.form}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--hairline-strong)", borderRadius: 99 }}>
            <button onClick={() => updateQty(p.id, qty - 1)} style={miniQty}><Icon name="minus" size={13} /></button>
            <span className="num" style={{ minWidth: 24, textAlign: "center", fontSize: 13.5, fontWeight: 600 }}>{qty}</span>
            <button onClick={() => updateQty(p.id, qty + 1)} style={miniQty}><Icon name="plus" size={13} /></button>
          </div>
          <button onClick={() => removeFromCart(p.id)} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12.5, padding: 0, cursor: "pointer", textDecoration: "underline" }}>Remover</button>
        </div>
      </div>
      <div className="num display" style={{ fontWeight: 600, fontSize: 16, whiteSpace: "nowrap" }}>{brl(p.price * qty)}</div>
    </div>
  );
}
const miniQty = { width: 30, height: 30, border: "none", background: "transparent", color: "var(--ink)", display: "grid", placeItems: "center", cursor: "pointer" };

function RewardTrack({ subtotal }) {
  const tiers = [
    { at: FREE_SHIP, icon: "truck", label: "Frete grátis" },
    { at: 950, icon: "gift", label: "Brinde: kit de palhetas" },
  ];
  const max = tiers[tiers.length - 1].at;
  const pct = Math.min(100, (subtotal / max) * 100);
  const next = tiers.find(t => subtotal < t.at);
  return (
    <div style={{ padding: "16px 16px", background: "var(--paper-2)", border: "1px solid var(--hairline)", borderRadius: "var(--r-md)", margin: "16px 0 6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 16 }}>
        <Icon name="sparkle" weight="fill" size={15} style={{ color: "var(--amber-deep)" }} />
        {next ? <span>Faltam <strong className="num" style={{ color: "var(--amber-deep)" }}>{brl(next.at - subtotal)}</strong> para <strong>{next.label.toLowerCase()}</strong></span>
              : <span><strong>Tudo desbloqueado!</strong> Frete grátis + brinde garantidos.</span>}
      </div>
      <div style={{ position: "relative", height: 6, borderRadius: 99, background: "var(--hairline)", margin: "0 4px" }}>
        <div style={{ width: pct + "%", height: "100%", borderRadius: 99, background: "linear-gradient(90deg, var(--amber), var(--amber-bright))", transition: "width .5s var(--ease)" }} />
        {tiers.map((t, i) => {
          const left = (t.at / max) * 100;
          const done = subtotal >= t.at;
          return (
            <div key={i} style={{ position: "absolute", left: left + "%", top: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <span style={{ display: "grid", placeItems: "center", width: 26, height: 26, borderRadius: "50%", border: "2px solid " + (done ? "var(--amber)" : "var(--hairline-strong)"),
                background: done ? "var(--amber)" : "var(--surface)", color: done ? "#fff" : "var(--muted)" }}>
                <Icon name={done ? "check" : t.icon} weight={done ? "bold" : "regular"} size={13} />
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, padding: "0 2px" }}>
        {tiers.map((t, i) => (
          <span key={i} className="label" style={{ fontSize: 8.5, color: subtotal >= t.at ? "var(--amber-deep)" : "var(--faint)" }}>{t.label}</span>
        ))}
      </div>
    </div>
  );
}

function SideCart() {
  const { cart, cartOpen, closeCart, subtotal, go, clearCart, points } = useStore();
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  return (
    <>
      {/* overlay */}
      <div onClick={closeCart} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(20,16,12,.45)",
        backdropFilter: "blur(2px)", opacity: cartOpen ? 1 : 0, pointerEvents: cartOpen ? "auto" : "none", transition: "opacity .35s var(--ease)" }} />
      {/* drawer */}
      <aside className="scroll-thin" style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(440px, 92vw)", zIndex: 61,
        background: "var(--paper)", boxShadow: "var(--sh-float)", transform: cartOpen ? "translateX(0)" : "translateX(102%)",
        transition: "transform .42s var(--ease)", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid var(--hairline)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="handbag" size={21} /><span className="display" style={{ fontSize: 21, fontWeight: 700 }}>Sacola</span>
            <span className="num" style={{ color: "var(--muted)" }}>({cart.reduce((s, i) => s + i.qty, 0)})</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(200,120,0,.12)", color: "var(--amber-deep)", padding: "4px 10px", borderRadius: 99, fontWeight: 700, fontSize: 12.5 }}>
              <Icon name="coins" weight="fill" size={14} /> <span className="num">{points}</span> pts
            </span>
          </div>
          <button onClick={closeCart} style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: "var(--paper-2)", display: "grid", placeItems: "center", cursor: "pointer" }}><Icon name="x" size={18} /></button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 40, textAlign: "center" }}>
            <div>
              <img src="assets/logos/tonante-symbol-black.png" alt="" style={{ width: 84, opacity: .12, margin: "0 auto 18px" }} />
              <div className="display" style={{ fontSize: 24, fontWeight: 700 }}>Sua sacola está vazia</div>
              <p style={{ color: "var(--muted)", margin: "8px 0 22px" }}>Que tal começar uma nova história?</p>
              <Btn variant="primary" iconRight="arrow-right" onClick={() => { closeCart(); go("products"); }}>Explorar a loja</Btn>
            </div>
          </div>
        ) : (
          <>
            <div className="scroll-thin" style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
              <RewardTrack subtotal={subtotal} />
              {cart.map(item => <CartLine key={item.p.id} item={item} />)}
            </div>
            <div style={{ padding: "18px 24px 22px", borderTop: "1px solid var(--hairline)", background: "var(--surface)" }}>
              {/* cupom */}
              <button onClick={() => setCouponOpen(!couponOpen)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: "4px 0 12px", cursor: "pointer", color: "var(--ink)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}><Icon name="tag" size={16} style={{ color: "var(--amber-deep)" }} /> Cupom de desconto</span>
                <Icon name={couponOpen ? "caret-up" : "caret-down"} size={14} style={{ color: "var(--muted)" }} />
              </button>
              {couponOpen && <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Digite seu cupom" style={{ flex: 1, padding: "11px 14px", borderRadius: "var(--r-md)", border: "1.5px solid var(--hairline-strong)", background: "var(--paper)", fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink)" }} />
                <Btn variant="ink" size="sm" onClick={() => setApplied(!!coupon)}>{applied ? "Aplicado" : "Aplicar"}</Btn>
              </div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4, paddingTop: 4 }}>
                <span style={{ fontSize: 15, color: "var(--ink-soft)" }}>Subtotal</span>
                <span className="num display" style={{ fontSize: 27, fontWeight: 700 }}>{brl(subtotal)}</span>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 14 }}>Frete e impostos calculados no checkout.</div>
              <Btn variant="primary" size="lg" full iconRight="arrow-right" onClick={() => { closeCart(); go("checkout"); }}>Finalizar pedido</Btn>
              <button onClick={closeCart} style={{ width: "100%", marginTop: 10, padding: "12px", borderRadius: "var(--r-pill)", border: "1.5px solid var(--hairline-strong)", background: "transparent", color: "var(--ink)", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14.5, cursor: "pointer" }}>Continuar comprando</button>
              <button onClick={clearCart} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Icon name="trash" size={14} /> Limpar carrinho
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
/* ---------- Checkout ---------- */
function Field({ label, span, ...rest }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7, gridColumn: span ? "1 / -1" : "auto" }}>
      <span className="label" style={{ fontSize: 9.5 }}>{label}</span>
      <input {...rest} style={{ padding: "13px 15px", borderRadius: "var(--r-md)", border: "1.5px solid var(--hairline-strong)",
        background: "var(--surface)", fontFamily: "var(--sans)", fontSize: 15, color: "var(--ink)", outlineColor: "var(--amber)" }} />
    </label>
  );
}

function CheckoutPage() {
  const { cart, subtotal, go, clearCart } = useStore();
  const [pay, setPay] = useState("pix");
  const [done, setDone] = useState(false);
  const shipping = subtotal >= FREE_SHIP || subtotal === 0 ? 0 : 29.9;
  const discount = pay === "pix" ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - discount;

  useEffect(() => { window.scrollTo(0, 0); }, [done]);

  if (done) {
    return (
      <div className="wrap" style={{ padding: "80px 0", textAlign: "center", maxWidth: 560 }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "var(--amber)", display: "grid", placeItems: "center", margin: "0 auto 26px", boxShadow: "0 20px 50px -16px var(--amber)" }}>
          <Icon name="check" weight="bold" size={42} style={{ color: "#fff" }} />
        </div>
        <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 14 }}>Pedido confirmado</div>
        <h1 className="display" style={{ fontSize: "clamp(34px,5vw,54px)", fontWeight: 700, margin: 0 }}>Sua história continua.</h1>
        <p style={{ fontSize: 17, color: "var(--ink-soft)", margin: "16px auto 0", maxWidth: 420 }}>
          Recebemos seu pedido <strong className="num">#TON-{Math.floor(1000 + Math.random() * 9000)}</strong>. Enviamos um e-mail com o rastreio. Obrigado por tocar com a Tonante.
        </p>
        <div style={{ marginTop: 30 }}><Btn variant="primary" size="lg" iconRight="arrow-right" onClick={() => go("home")}>Voltar para o início</Btn></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="wrap" style={{ padding: "90px 0", textAlign: "center" }}>
        <div className="display" style={{ fontSize: 30, fontWeight: 700 }}>Sua sacola está vazia</div>
        <p style={{ color: "var(--muted)", margin: "10px 0 22px" }}>Adicione instrumentos antes de finalizar.</p>
        <Btn variant="primary" iconRight="arrow-right" onClick={() => go("products")}>Explorar a loja</Btn>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ paddingTop: 26 }}>
      <button onClick={() => go("products")} style={{ ...brc, display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 22 }}><Icon name="arrow-left" size={15} /> Continuar comprando</button>
      <h1 className="display" style={{ fontSize: "clamp(32px,4.6vw,52px)", fontWeight: 700, margin: "0 0 34px" }}>Finalizar compra</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "start" }} className="checkout-split">
        {/* forms */}
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); clearCart(); }} style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <section>
            <h2 style={coHead}><span style={coNum}>1</span> Contato</h2>
            <div style={coGrid}>
              <Field label="E-mail" type="email" placeholder="voce@email.com" required span />
              <Field label="Nome completo" placeholder="Como no documento" required />
              <Field label="Celular" placeholder="(00) 00000-0000" required />
            </div>
          </section>
          <section>
            <h2 style={coHead}><span style={coNum}>2</span> Entrega</h2>
            <div style={coGrid}>
              <Field label="CEP" placeholder="00000-000" required />
              <Field label="Número" placeholder="123" required />
              <Field label="Endereço" placeholder="Rua, avenida..." required span />
              <Field label="Cidade" placeholder="Cidade" required />
              <Field label="Estado" placeholder="UF" required />
            </div>
          </section>
          <section>
            <h2 style={coHead}><span style={coNum}>3</span> Pagamento</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["pix", "lightning", "Pix", "5% de desconto · aprovação imediata"], ["card", "credit-card", "Cartão de crédito", "Até 12x sem juros"], ["boleto", "barcode", "Boleto bancário", "Vence em 1 dia útil"]].map(([id, ic, t, s]) => (
                <label key={id} onClick={() => setPay(id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderRadius: "var(--r-md)", cursor: "pointer",
                  border: "1.5px solid " + (pay === id ? "var(--amber)" : "var(--hairline-strong)"), background: pay === id ? "rgba(200,120,0,.06)" : "var(--surface)", transition: "all .2s" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid " + (pay === id ? "var(--amber)" : "var(--hairline-strong)"), display: "grid", placeItems: "center" }}>
                    {pay === id && <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--amber)" }} />}
                  </span>
                  <Icon name={ic} size={22} style={{ color: "var(--ink)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{t}</div>
                    <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{s}</div>
                  </div>
                </label>
              ))}
            </div>
            {pay === "card" && (
              <div style={{ ...coGrid, marginTop: 14 }}>
                <Field label="Número do cartão" placeholder="0000 0000 0000 0000" span />
                <Field label="Validade" placeholder="MM/AA" />
                <Field label="CVV" placeholder="000" />
              </div>
            )}
          </section>
          <Btn type="submit" variant="primary" size="lg" full iconRight="lock-simple">Pagar {brl(total)}</Btn>
        </form>

        {/* resumo */}
        <aside style={{ position: "sticky", top: 132, background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-lg)", padding: 26 }}>
          <div className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>Resumo</div>
          <div className="scroll-thin" style={{ maxHeight: 280, overflowY: "auto", marginBottom: 16 }}>
            {cart.map(item => (
              <div key={item.p.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0" }}>
                <div style={{ width: 52, flexShrink: 0, position: "relative" }}>
                  <ProductMedia p={item.p} ratio="1/1" hoverZoom={false} watermark />
                  <span className="num" style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", fontSize: 11, fontWeight: 700, display: "grid", placeItems: "center" }}>{item.qty}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}>{item.p.name}</div>
                <div className="num" style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>{brl(item.p.price * item.qty)}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
            <Row k="Subtotal" v={brl(subtotal)} />
            <Row k="Frete" v={shipping === 0 ? "Grátis" : brl(shipping)} accent={shipping === 0} />
            {discount > 0 && <Row k="Desconto Pix (5%)" v={"– " + brl(discount)} accent />}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 8, paddingTop: 12, borderTop: "1px solid var(--hairline)" }}>
              <span style={{ fontWeight: 700, fontSize: 17 }}>Total</span>
              <span className="num display" style={{ fontSize: 30, fontWeight: 700 }}>{brl(total)}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, color: "var(--muted)", fontSize: 12.5 }}>
            <Icon name="lock-simple" size={15} /> Ambiente seguro e criptografado
          </div>
        </aside>
      </div>
    </div>
  );
}
function Row({ k, v, accent }) {
  return <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5 }}>
    <span style={{ color: "var(--ink-soft)" }}>{k}</span>
    <span className="num" style={{ fontWeight: 600, color: accent ? "var(--amber-deep)" : "var(--ink)" }}>{v}</span>
  </div>;
}
const coHead = { display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, margin: "0 0 18px" };
const coNum = { width: 30, height: 30, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontFamily: "var(--sans)", fontSize: 15, fontWeight: 700, flexShrink: 0 };
const coGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 };

Object.assign(window, { SideCart, CheckoutPage });
