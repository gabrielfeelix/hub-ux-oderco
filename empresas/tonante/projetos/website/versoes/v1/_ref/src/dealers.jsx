/* =========================================================
   TONANTE — Onde Encontrar (dealers / store locator)
   Mapa estilizado da marca (sem Google Maps) + busca + cards
   ========================================================= */
function DealersPage() {
  const { go } = useStore();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("Todos");
  const [active, setActive] = useState(null);
  const regions = ["Todos", "Sul", "Sudeste", "Centro-Oeste", "Nordeste", "Norte"];
  const list = D.dealers.filter(d =>
    (region === "Todos" || d.region === region) &&
    (!q || (d.city + d.uf + d.name + d.cep).toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      {/* cabeçalho */}
      <div style={{ position: "relative", overflow: "hidden", background: "var(--paper-2)", borderBottom: "1px solid var(--hairline)" }}>
        <img src="assets/logos/tonante-symbol-black.png" alt="" aria-hidden="true" style={{ position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%) rotate(8deg)", width: 280, opacity: .05 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 2, padding: "clamp(40px,6vw,68px) 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>
            <button onClick={() => go("home")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: 0, fontSize: 13 }}>Início</button>
            <Icon name="caret-right" size={12} /><span style={{ color: "var(--ink)" }}>Onde encontrar</span>
          </div>
          <div className="label" style={{ color: "var(--amber-deep)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="map-pin" weight="fill" size={14} /> Revendedores oficiais
          </div>
          <h1 className="display" style={{ margin: 0, fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 700, lineHeight: .98 }}>
            Onde tocar a sua <span style={{ fontStyle: "italic", color: "var(--amber)" }}>próxima história</span>
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 520, marginTop: 16 }}>
            Encontre uma loja parceira da Tonante pertinho de você. Experimente o instrumento, sinta a madeira e leve pra casa.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 36, paddingBottom: 20 }}>
        {/* busca + filtros */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 260, background: "var(--surface)", border: "1.5px solid var(--hairline-strong)", borderRadius: "var(--r-pill)", height: 50, paddingLeft: 18 }}>
            <Icon name="magnifying-glass" size={19} style={{ color: "var(--muted)" }} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Busque por cidade, estado ou CEP" style={{ flex: 1, border: "none", outline: "none", background: "transparent", padding: "0 14px", fontFamily: "var(--sans)", fontSize: 15, color: "var(--ink)" }} />
            {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", padding: "0 16px", cursor: "pointer", color: "var(--muted)" }}><Icon name="x" size={16} /></button>}
          </div>
        </div>
        <div className="no-bar" style={{ display: "flex", gap: 9, overflowX: "auto", paddingBottom: 6, marginBottom: 28 }}>
          {regions.map(r => <CategoryChip key={r} active={region === r} onClick={() => { setRegion(r); setActive(null); }}>{r}</CategoryChip>)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 32, alignItems: "start" }} className="dealers-split">
          {/* lista */}
          <div>
            <div className="label" style={{ marginBottom: 16 }}>{list.length} {list.length === 1 ? "loja encontrada" : "lojas encontradas"}</div>
            <div className="scroll-thin" style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 620, overflowY: "auto", paddingRight: 4 }}>
              {list.map((d, i) => {
                const on = active === d.name;
                return (
                  <div key={i} onMouseEnter={() => setActive(d.name)} onClick={() => setActive(d.name)}
                    style={{ background: "var(--surface)", border: "1.5px solid " + (on ? "var(--amber)" : "var(--hairline)"), borderRadius: "var(--r-lg)", padding: 18, cursor: "pointer", transition: "border-color .2s, transform .2s", transform: on ? "translateY(-2px)" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ width: 38, height: 38, borderRadius: "50%", background: on ? "var(--amber)" : "var(--paper-2)", color: on ? "#fff" : "var(--amber-deep)", display: "grid", placeItems: "center", flexShrink: 0, transition: "all .2s" }}>
                          <Icon name="map-pin" weight="fill" size={18} />
                        </span>
                        <div>
                          <h3 className="display" style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>{d.name}</h3>
                          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>{d.city} · {d.uf}</div>
                        </div>
                      </div>
                      <Tag tone="neutral">{d.region}</Tag>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14, fontSize: 13.5, color: "var(--ink-soft)" }}>
                      <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="house-line" size={15} style={{ color: "var(--faint)" }} /> {d.addr} · {d.cep}</span>
                      <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="phone" size={15} style={{ color: "var(--faint)" }} /> {d.phone}</span>
                      <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="clock" size={15} style={{ color: "var(--faint)" }} /> {d.hours}</span>
                    </div>
                  </div>
                );
              })}
              {list.length === 0 && <div style={{ padding: "40px 0", textAlign: "center", color: "var(--muted)" }}>Nenhuma loja encontrada. Tente outra cidade ou região.</div>}
            </div>
          </div>

          {/* mapa estilizado */}
          <div style={{ position: "sticky", top: 132 }} className="dealers-map">
            <div className="grain" style={{ position: "relative", aspectRatio: "4 / 5", borderRadius: "var(--r-lg)", overflow: "hidden",
              background: "radial-gradient(120% 100% at 50% 0%, #241d14, var(--stage))", border: "1px solid var(--hairline)" }}>
              {/* mapa do Brasil (silhueta fiel) + pins projetados */}
              <svg viewBox="0 0 1000 1040" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <defs>
                  <pattern id="brdots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="rgba(200,120,0,.20)" /></pattern>
                  <linearGradient id="brfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgba(216,141,34,.16)" /><stop offset="1" stopColor="rgba(200,120,0,.04)" />
                  </linearGradient>
                </defs>
                <rect width="1000" height="1040" fill="url(#brdots)" />
                <path d="M352 4 L470 26 L506 18 L548 40 L590 34 L612 70 L596 104 L640 150 L676 152 L724 196 L786 206 L852 214 L905 236 L960 258 L992 300 L1000 348 L968 392 L922 430 L905 470 L928 520 L900 560 L878 612 L860 672 L820 712 L800 756 L756 772 L700 788 L660 824 L612 900 L560 1006 L516 1034 L470 988 L452 916 L436 836 L420 760 L398 700 L372 640 L344 600 L300 590 L250 560 L210 506 L170 470 L120 452 L70 430 L24 392 L4 352 L40 320 L70 280 L96 224 L120 170 L168 120 L220 86 L286 44 Z"
                  fill="url(#brfill)" stroke="rgba(216,141,34,.55)" strokeWidth="3.5" strokeLinejoin="round" />
                {D.dealers.filter(d => region === "Todos" || d.region === region).map((d, i) => {
                  const on = active === d.name;
                  return (
                    <g key={i} onMouseEnter={() => setActive(d.name)} onClick={() => setActive(d.name)} style={{ cursor: "pointer" }}>
                      {on && <circle cx={d.mx} cy={d.my} r="16" fill="var(--amber)" opacity="0.4">
                        <animate attributeName="r" values="14;46" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0" dur="1.5s" repeatCount="indefinite" />
                      </circle>}
                      <circle cx={d.mx} cy={d.my} r={on ? 18 : 11} fill={on ? "#e8a33a" : "rgba(216,141,34,.92)"} stroke="#16130f" strokeWidth="2.5" />
                      <circle cx={d.mx} cy={d.my} r={on ? 6 : 3.5} fill="#fff" />
                      {on && <g>
                        <rect x={d.mx - (d.city.length * 9.5 + 28) / 2} y={d.my - 70} width={d.city.length * 9.5 + 28} height="36" rx="9" fill="#fffdf8" />
                        <text x={d.mx} y={d.my - 46} textAnchor="middle" fontFamily="Hanken Grotesk, sans-serif" fontSize="20" fontWeight="700" fill="#1a1714">{d.city}</text>
                      </g>}
                    </g>
                  );
                })}
              </svg>
              <span className="label" style={{ position: "absolute", left: 18, top: 16, color: "rgba(255,255,255,.55)", fontSize: 9, zIndex: 2 }}>Brasil · {D.dealers.length} lojas parceiras</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, padding: "14px 18px", background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "var(--r-md)" }}>
              <Icon name="storefront" size={22} style={{ color: "var(--amber-deep)" }} />
              <div style={{ flex: 1, fontSize: 13.5, color: "var(--ink-soft)" }}>Quer revender Tonante? <strong style={{ color: "var(--ink)" }}>Seja um parceiro.</strong></div>
              <Btn variant="outline" size="sm" iconRight="arrow-right">Quero revender</Btn>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes ping{0%{transform:translate(-50%,-50%) scale(.6);opacity:.5}100%{transform:translate(-50%,-50%) scale(2.4);opacity:0}}`}</style>
    </div>
  );
}

Object.assign(window, { DealersPage });
