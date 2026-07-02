// Verificação Fase 3: garante que o app renderiza no #root e que o bloco
// #seo-prerender é removido após o JS — ou seja, ZERO mudança de UI para o
// usuário. Usa CDP puro (sem playwright). Requer server estático em dist.
import http from "node:http";

const PORT = process.env.CDP_PORT || 9222;
const APP = process.env.APP_URL || "http://127.0.0.1:8099";

const req = (path, method = "GET") =>
  new Promise((resolve, reject) => {
    const r = http.request(
      { host: "127.0.0.1", port: PORT, path, method },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(d));
          } catch {
            resolve(d);
          }
        });
      },
    );
    r.on("error", reject);
    r.end();
  });
const getJSON = (path) => req(path, "GET");

async function evalOnPage(routes) {
  const results = {};
  for (const route of routes) {
    const target = await req(`/json/new?${encodeURIComponent(APP + route)}`, "PUT");
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));
    let id = 0;
    const send = (method, params = {}) =>
      new Promise((resolve) => {
        const mid = ++id;
        const onMsg = (ev) => {
          const m = JSON.parse(ev.data);
          if (m.id === mid) {
            ws.removeEventListener("message", onMsg);
            resolve(m.result);
          }
        };
        ws.addEventListener("message", onMsg);
        ws.send(JSON.stringify({ id: mid, method, params }));
      });

    await send("Page.enable");
    await send("Runtime.enable");
    // espera render do app (#root com filhos) até ~6s
    await new Promise((r) => setTimeout(r, 3500));
    const expr = `(() => ({
      seoBlock: !!document.getElementById('seo-prerender'),
      rootChildren: document.getElementById('root')?.children.length || 0,
      h1: document.querySelector('#root h1')?.textContent?.slice(0,60) || document.querySelector('h1')?.textContent?.slice(0,60) || null,
      title: document.title
    }))()`;
    const { result } = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
    results[route] = result.value;
    ws.close();
    await getJSON(`/json/close/${target.id}`);
  }
  return results;
}

const routes = ["/", "/perifericos/", "/perifericos/cabo-hdmi/pcyes/cabo-hdmi-2-0-4k-2m-pcyes-cobre-puro/"];
evalOnPage(routes)
  .then((r) => {
    console.log(JSON.stringify(r, null, 2));
    const ok = Object.values(r).every((v) => v.seoBlock === false && v.rootChildren > 0);
    console.log(ok ? "\nOK: bloco removido + app renderizado em todas" : "\nFALHA: ver acima");
    process.exit(ok ? 0 : 1);
  })
  .catch((e) => {
    console.error("erro:", e.message);
    process.exit(2);
  });
