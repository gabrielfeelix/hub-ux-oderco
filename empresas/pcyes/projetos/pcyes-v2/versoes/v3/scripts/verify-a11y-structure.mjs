// Fase 6: check estrutural pós-mudanças — 1 <h1> por página, <main> único
// presente. Não substitui axe completo, mas pega regressão de landmark/heading
// introduzida pelas Fases 1-5 (que não deveriam mexer nisso).
import http from "node:http";
const PORT = 9222;
const APP = "http://127.0.0.1:8099";
const req = (path, method = "GET") =>
  new Promise((resolve, reject) => {
    const r = http.request({ host: "127.0.0.1", port: PORT, path, method }, (res) => {
      let d = ""; res.on("data", (c) => (d += c)); res.on("end", () => { try { resolve(JSON.parse(d)); } catch { resolve(d); } });
    });
    r.on("error", reject); r.end();
  });
async function check(route) {
  const t = await req(`/json/new?${encodeURIComponent(APP + route)}`, "PUT");
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const send = (m, p = {}) => new Promise((resolve) => {
    const mid = ++id;
    const onMsg = (ev) => { const msg = JSON.parse(ev.data); if (msg.id === mid) { ws.removeEventListener("message", onMsg); resolve(msg.result); } };
    ws.addEventListener("message", onMsg); ws.send(JSON.stringify({ id: mid, method: m, params: p }));
  });
  await send("Runtime.enable");
  await new Promise((r) => setTimeout(r, 3500));
  const expr = `(() => ({
    h1: document.querySelectorAll('#root h1').length,
    main: document.querySelectorAll('#root main').length,
    seoBlock: !!document.getElementById('seo-prerender')
  }))()`;
  const { result } = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  ws.close(); await req(`/json/close/${t.id}`, "GET");
  return result.value;
}
const routes = ["/", "/perifericos/", "/perifericos/cabo-hdmi/pcyes/cabo-hdmi-2-0-4k-2m-pcyes-cobre-puro/", "/checkout", "/faq"];
const out = {};
for (const r of routes) out[r] = await check(r);
console.log(JSON.stringify(out, null, 2));
const ok = Object.values(out).every((v) => v.h1 === 1 && v.main <= 1 && v.seoBlock === false);
console.log(ok ? "\nOK: 1 h1 + <=1 main por pagina, bloco SEO removido" : "\nATENCAO: revisar acima");
process.exit(ok ? 0 : 1);
