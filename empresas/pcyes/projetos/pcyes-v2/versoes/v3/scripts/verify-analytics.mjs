// Verificação Fase 5: dataLayer recebe consent default + eventos de funil,
// e SEM VITE_GTM_ID nenhum script do googletagmanager é injetado (protótipo limpo).
import http from "node:http";
const PORT = 9222;
const APP = "http://127.0.0.1:8099";
const req = (path, method = "GET") =>
  new Promise((resolve, reject) => {
    const r = http.request({ host: "127.0.0.1", port: PORT, path, method }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch { resolve(d); } });
    });
    r.on("error", reject); r.end();
  });

async function check(route) {
  const t = await req(`/json/new?${encodeURIComponent(APP + route)}`, "PUT");
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const mid = ++id;
      const onMsg = (ev) => { const m = JSON.parse(ev.data); if (m.id === mid) { ws.removeEventListener("message", onMsg); resolve(m.result); } };
      ws.addEventListener("message", onMsg);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  await send("Runtime.enable");
  await new Promise((r) => setTimeout(r, 3500));
  const expr = `(() => {
    const dl = window.dataLayer || [];
    const events = dl.map(e => Array.isArray(e) ? e[0]+':'+e[1] : e.event).filter(Boolean);
    const gtmScript = !!document.querySelector('script[src*="googletagmanager"]');
    return { events, gtmScript, dlLen: dl.length };
  })()`;
  const { result } = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  ws.close();
  await req(`/json/close/${t.id}`, "GET");
  return result.value;
}

const home = await check("/");
const pdp = await check("/perifericos/cabo-hdmi/pcyes/cabo-hdmi-2-0-4k-2m-pcyes-cobre-puro/");
console.log("HOME:", JSON.stringify(home));
console.log("PDP :", JSON.stringify(pdp));
const ok =
  home.events.some((e) => e.startsWith("consent:default")) &&
  pdp.events.includes("view_item") &&
  !home.gtmScript && !pdp.gtmScript;
console.log(ok ? "\nOK: consent default + view_item no dataLayer, GTM nao injetado (sem ID)" : "\nFALHA: ver acima");
process.exit(ok ? 0 : 1);
