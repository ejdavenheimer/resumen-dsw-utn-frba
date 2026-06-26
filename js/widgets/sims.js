/* =====================================================================
   Simuladores interactivos — "aprender haciendo".
   No son quizzes: son modelos vivos del sistema. Manipulás / predecís y
   ves cómo se comporta el concepto en tiempo real.

   APP.eventLoopSim(el)   · visualiza el event loop (stack / colas / consola)
   APP.restPlayground(el) · una API REST real en memoria para experimentar
   APP.layerTracer(el)    · sigue una request a través de las 4 capas
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;

  /* ============================================================
     1) EVENT LOOP — predecí el orden y mirá por qué
     ============================================================ */
  APP.eventLoopSim = function (el) {
    // Programa canónico. order = orden real de impresión.
    const LINES = [
      { id: "a", code: 'console.log("A: Inicio")', kind: "sync" },
      { id: "b", code: 'setTimeout(() => console.log("B: setTimeout 0ms"))', kind: "macro" },
      { id: "c", code: 'Promise.resolve().then(() => console.log("C: Promise"))', kind: "micro" },
      { id: "d", code: 'console.log("D: Fin")', kind: "sync" },
    ];
    const REAL_ORDER = ["A: Inicio", "D: Fin", "C: Promise", "B: setTimeout 0ms"];
    const LABEL = { "A: Inicio": "a", "D: Fin": "d", "C: Promise": "c", "B: setTimeout 0ms": "b" };

    // Estados paso a paso (lo "invisible" hecho visible).
    const STEPS = [
      { note: "Arranca el script. Se ejecuta línea por línea (la pila de llamadas trabaja de a una).", stack: ["main()"], web: [], macro: [], micro: [], out: [] },
      { note: "Línea 1: console.log es sincrónico → imprime YA.", stack: ["main()", "console.log"], web: [], macro: [], micro: [], out: ["A: Inicio"] },
      { note: "Línea 2: setTimeout NO espera. Su callback se va a las Web APIs (el navegador cuenta el tiempo).", stack: ["main()"], web: ["⏱️ cb B"], macro: [], micro: [], out: ["A: Inicio"] },
      { note: "El timer (0ms) ya venció → el callback B pasa a la cola de MACROtareas. Pero todavía no corre: la pila está ocupada.", stack: ["main()"], web: [], macro: ["cb B"], micro: [], out: ["A: Inicio"] },
      { note: "Línea 3: la Promise ya está resuelta → su .then se encola en MICROtareas (cola prioritaria).", stack: ["main()"], web: [], macro: ["cb B"], micro: ["cb C"], out: ["A: Inicio"] },
      { note: "Línea 4: otro console.log sincrónico → imprime YA.", stack: ["main()", "console.log"], web: [], macro: ["cb B"], micro: ["cb C"], out: ["A: Inicio", "D: Fin"] },
      { note: "Termina el código sincrónico. La pila queda VACÍA → el event loop entra en acción.", stack: [], web: [], macro: ["cb B"], micro: ["cb C"], out: ["A: Inicio", "D: Fin"] },
      { note: "REGLA DE ORO: primero se vacían TODAS las microtareas. Corre cb C (la Promise).", stack: ["cb C"], web: [], macro: ["cb B"], micro: [], out: ["A: Inicio", "D: Fin", "C: Promise"] },
      { note: "Microtareas vacías. Recién ahora el event loop toma UNA macrotarea: corre cb B (setTimeout).", stack: ["cb B"], web: [], macro: [], micro: [], out: ["A: Inicio", "D: Fin", "C: Promise", "B: setTimeout 0ms"] },
      { note: "Todo vacío. Fijate: aunque setTimeout era 0ms, la Promise imprimió ANTES. Las microtareas siempre ganan.", stack: [], web: [], macro: [], micro: [], out: ["A: Inicio", "D: Fin", "C: Promise", "B: setTimeout 0ms"] },
    ];

    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🔮 Predecí primero</span>' +
      '<p>Este código tiene 4 <code>console.log</code>. <b>¿En qué orden van a imprimirse?</b> Tocá las salidas en el orden que creas.</p></div>' +
      '<pre class="sim-code">' + LINES.map((l, i) => '<span>' + (i + 1) + '. ' + escapeHtml(l.code) + '</span>').join("\n") + '</pre>' +
      '<div class="sim-predict"><div class="sim-pred-pool" id="pool"></div>' +
      '<div class="sim-pred-target">Tu predicción: <span id="guess" class="sim-guess"></span> ' +
      '<button class="btn sm ghost" id="reset">↺</button> <button class="btn sm" id="check" disabled>Ver qué pasa realmente →</button></div>' +
      '<div id="verdict"></div></div>' +
      '<div class="sim-stage" id="stage" style="display:none"></div>';
    el.appendChild(wrap);

    const pool = wrap.querySelector("#pool");
    const guessEl = wrap.querySelector("#guess");
    const checkBtn = wrap.querySelector("#check");
    const verdict = wrap.querySelector("#verdict");
    let guess = [];

    // pool en orden de aparición en el código (para que sea tentador equivocarse)
    ["A: Inicio", "B: setTimeout 0ms", "C: Promise", "D: Fin"].forEach((t) => {
      const b = document.createElement("button");
      b.className = "sim-chip"; b.textContent = t; b.dataset.t = t;
      b.addEventListener("click", () => {
        if (guess.includes(t)) return;
        guess.push(t); b.disabled = true; renderGuess();
      });
      pool.appendChild(b);
    });
    function renderGuess() {
      guessEl.innerHTML = guess.map((g, i) => '<span class="sim-guess-item">' + (i + 1) + '. ' + g + '</span>').join(" ");
      checkBtn.disabled = guess.length !== 4;
    }
    wrap.querySelector("#reset").addEventListener("click", () => {
      guess = []; renderGuess();
      pool.querySelectorAll("button").forEach((b) => (b.disabled = false));
    });

    checkBtn.addEventListener("click", () => {
      const ok = guess.join("|") === REAL_ORDER.join("|");
      verdict.innerHTML = '<div class="sim-verdict ' + (ok ? "ok" : "bad") + '">' +
        (ok ? "✅ ¡Exacto! " : "❌ Casi. ") + "El orden real es <b>" + REAL_ORDER.join(" → ") + "</b>. " +
        "Mirá el motor paso a paso para entender <i>por qué</i>:</div>";
      checkBtn.disabled = true;
      startStage();
    });

    function startStage() {
      const stage = wrap.querySelector("#stage");
      stage.style.display = "block";
      let i = 0;
      stage.innerHTML =
        '<div class="el-grid">' +
          box("🧱 Call Stack", "stack", "Ejecuta de a una. Mientras tenga algo, lo async espera.") +
          box("🌐 Web APIs", "web", "El navegador maneja timers/fetch fuera del hilo.") +
          box("⚡ Microtareas", "micro", "Promises. PRIORIDAD: se vacían enteras primero.") +
          box("📥 Macrotareas", "macro", "setTimeout, eventos. Se toma UNA por vuelta.") +
        '</div>' +
        '<div class="el-console" id="elcon"><div class="el-con-title">🖥️ Consola</div><div id="elout"></div></div>' +
        '<div class="el-note" id="elnote"></div>' +
        '<div class="sim-ctrls"><button class="btn sm ghost" id="prev">← Atrás</button>' +
        '<span id="elstep" class="sim-step"></span>' +
        '<button class="btn sm" id="next">Siguiente paso →</button></div>';

      function render() {
        const s = STEPS[i];
        fill(stage, "stack", s.stack); fill(stage, "web", s.web);
        fill(stage, "micro", s.micro); fill(stage, "macro", s.macro);
        stage.querySelector("#elout").innerHTML = s.out.map((o) => '<div class="el-line">▸ ' + o + '</div>').join("");
        stage.querySelector("#elnote").innerHTML = "💡 " + s.note;
        stage.querySelector("#elstep").textContent = "Paso " + (i + 1) + " / " + STEPS.length;
        stage.querySelector("#prev").disabled = i === 0;
        stage.querySelector("#next").disabled = i === STEPS.length - 1;
      }
      stage.querySelector("#next").addEventListener("click", () => { if (i < STEPS.length - 1) { i++; render(); } });
      stage.querySelector("#prev").addEventListener("click", () => { if (i > 0) { i--; render(); } });
      render();
      stage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function box(title, key, sub) {
      return '<div class="el-box"><div class="el-box-h">' + title + '</div>' +
        '<div class="el-box-sub">' + sub + '</div><div class="el-box-body" data-k="' + key + '"></div></div>';
    }
    function fill(root, key, arr) {
      const body = root.querySelector('[data-k="' + key + '"]');
      body.innerHTML = arr.map((x) => '<div class="el-token">' + x + '</div>').join("");
    }
  };

  /* ============================================================
     2) REST PLAYGROUND — una API de verdad, en memoria
     ============================================================ */
  APP.restPlayground = function (el) {
    let books = [{ id: 1, title: "El Aleph", genre: "cuento" }];
    let nextId = 2;

    // "Servidor" REST en memoria.
    function handle(method, path, bodyStr) {
      const m = path.match(/^\/libros(?:\/(\d+))?$/);
      if (!m) return { status: 404, body: { error: "Ruta no encontrada. Probá /libros o /libros/:id" } };
      const id = m[1] ? Number(m[1]) : null;
      let body = null;
      if (bodyStr && bodyStr.trim()) { try { body = JSON.parse(bodyStr); } catch (e) { return { status: 400, body: { error: "JSON inválido en el body" } }; } }

      if (method === "GET" && id === null) return { status: 200, body: books };
      if (method === "GET" && id !== null) {
        const b = books.find((x) => x.id === id);
        return b ? { status: 200, body: b } : { status: 404, body: { error: "Libro " + id + " no existe" } };
      }
      if (method === "POST" && id === null) {
        if (!body || !body.title) return { status: 400, body: { error: "Falta 'title' en el body" } };
        const nuevo = { id: nextId++, title: body.title, genre: body.genre || "sin género" };
        books.push(nuevo);
        return { status: 201, body: nuevo };
      }
      if (method === "PUT" && id !== null) {
        if (!body || !body.title) return { status: 400, body: { error: "Falta 'title' en el body" } };
        const b = books.find((x) => x.id === id);
        if (!b) return { status: 404, body: { error: "Libro " + id + " no existe" } };
        b.title = body.title; if (body.genre) b.genre = body.genre;
        return { status: 200, body: b };
      }
      if (method === "DELETE" && id !== null) {
        const idx = books.findIndex((x) => x.id === id);
        if (idx === -1) return { status: 404, body: { error: "Libro " + id + " no existe" } };
        books.splice(idx, 1);
        return { status: 204, body: null };
      }
      if (method === "POST" && id !== null) return { status: 404, body: { error: "POST va sobre la colección (/libros), no sobre un id" } };
      return { status: 405, body: { error: "Método no permitido en esa ruta" } };
    }

    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🛰️ API REST en vivo</span>' +
      '<p>Es una API real corriendo en tu navegador. Hacé pedidos y mirá el <b>status code</b>, la respuesta y cómo cambia la <b>base de datos</b>. No hay respuestas correctas: experimentá.</p></div>' +
      '<div class="rp-grid">' +
        '<div class="rp-builder">' +
          '<div class="rp-row">' +
            '<select id="rp-method">' + ["GET", "POST", "PUT", "DELETE"].map((v) => '<option>' + v + '</option>').join("") + '</select>' +
            '<input id="rp-path" list="rp-paths" value="/libros" spellcheck="false">' +
            '<datalist id="rp-paths"><option>/libros</option><option>/libros/1</option><option>/libros/2</option><option>/libros/99</option></datalist>' +
            '<button class="btn sm" id="rp-send">Enviar ▸</button>' +
          '</div>' +
          '<textarea id="rp-body" placeholder=\'Body (JSON) — para POST/PUT. Ej: { "title": "Rayuela", "genre": "novela" }\'></textarea>' +
          '<div class="rp-quick">Misiones rápidas: ' +
            '<button class="sim-chip sm" data-m="GET|/libros|">Listar</button>' +
            '<button class="sim-chip sm" data-m=\'POST|/libros|{"title":"Rayuela","genre":"novela"}\'>Crear</button>' +
            '<button class="sim-chip sm" data-m="GET|/libros/1|">Ver #1</button>' +
            '<button class="sim-chip sm" data-m="DELETE|/libros/1|">Borrar #1</button>' +
            '<button class="sim-chip sm" data-m="GET|/libros/99|">Pedir inexistente</button>' +
          '</div>' +
          '<div class="rp-resp" id="rp-resp"><div class="rp-resp-empty">La respuesta del servidor va a aparecer acá.</div></div>' +
        '</div>' +
        '<div class="rp-db"><div class="rp-db-title">🗄️ Base de datos · colección <code>libros</code></div><div id="rp-dbbody"></div></div>' +
      '</div>' +
      '<div class="sim-insight" id="rp-insight"></div>';
    el.appendChild(wrap);

    const methodEl = wrap.querySelector("#rp-method");
    const pathEl = wrap.querySelector("#rp-path");
    const bodyEl = wrap.querySelector("#rp-body");
    const lastPost = { sig: null, count: 0 };

    function renderDB() {
      const b = wrap.querySelector("#rp-dbbody");
      b.innerHTML = books.length
        ? books.map((x) => '<div class="rp-doc">{ "id": ' + x.id + ', "title": "' + esc(x.title) + '", "genre": "' + esc(x.genre) + '" }</div>').join("")
        : '<div class="rp-doc empty">// colección vacía</div>';
    }
    function send() {
      const method = methodEl.value, path = pathEl.value.trim(), body = bodyEl.value;
      const res = handle(method, path, body);
      const fam = String(res.status)[0];
      const famClass = fam === "2" ? "ok" : fam === "4" ? "warn" : fam === "5" ? "bad" : "info";
      wrap.querySelector("#rp-resp").innerHTML =
        '<div class="rp-status ' + famClass + '">' + res.status + ' ' + statusText(res.status) + '</div>' +
        '<pre class="rp-json">' + esc(res.body === null ? "(sin contenido)" : JSON.stringify(res.body, null, 2)) + '</pre>';
      renderDB();
      insight(method, path, res);
    }
    function insight(method, path, res) {
      const box = wrap.querySelector("#rp-insight");
      let msg = "";
      if (method === "POST" && res.status === 201) {
        const sig = bodyEl.value.trim();
        if (sig && sig === lastPost.sig) { lastPost.count++; msg = "🔁 <b>POST no es idempotente:</b> mandaste el mismo body otra vez y se creó <b>otro</b> libro (ya van " + lastPost.count + "). Cada POST crea un recurso nuevo."; }
        else { lastPost.sig = sig; lastPost.count = 1; msg = "✅ <b>201 Created:</b> se creó un recurso nuevo y la base creció. Volvé a enviar el mismo POST y mirá qué pasa con la idempotencia."; }
      } else if (method === "PUT" && res.status === 200) {
        msg = "♻️ <b>PUT es idempotente:</b> repetí este mismo PUT las veces que quieras → el estado final no cambia. Eso lo diferencia de POST.";
      } else if (method === "DELETE" && res.status === 204) {
        msg = "🗑️ <b>204 No Content:</b> se borró, por eso no hay body. Probá borrar el MISMO id otra vez → vas a ver un 404 (ya no existe).";
      } else if (res.status === 404) {
        msg = "🔎 <b>404 Not Found:</b> el recurso no existe. El cliente pidió algo que no está; no es un error del servidor (eso sería 5xx).";
      } else if (res.status === 400) {
        msg = "⚠️ <b>400 Bad Request:</b> el pedido está mal armado (faltó un dato o el JSON es inválido). El servidor lo rechaza por culpa del cliente.";
      } else if (method === "GET" && res.status === 200) {
        msg = "📖 <b>GET 200:</b> lectura exitosa y <b>sin efectos secundarios</b> (no cambió nada en la base). GET es seguro e idempotente.";
      }
      box.innerHTML = msg ? '<div class="sim-insight-card">' + msg + "</div>" : "";
    }

    wrap.querySelector("#rp-send").addEventListener("click", send);
    wrap.querySelectorAll("[data-m]").forEach((b) => b.addEventListener("click", () => {
      const [mth, pth, bd] = b.dataset.m.split("|");
      methodEl.value = mth; pathEl.value = pth; bodyEl.value = bd || "";
      send();
    }));
    renderDB();

    function statusText(s) {
      return { 200: "OK", 201: "Created", 204: "No Content", 400: "Bad Request", 404: "Not Found", 405: "Method Not Allowed" }[s] || "";
    }
  };

  /* ============================================================
     3) LAYER TRACER — seguí una request por las 4 capas
     ============================================================ */
  APP.layerTracer = function (el) {
    const LAYERS = [
      { k: "ctrl", name: "🚪 Controlador", job: "Recibe POST /libros. Valida la ESTRUCTURA (¿vino el campo title?) y delega. No tiene lógica de negocio." },
      { k: "svc", name: "⚙️ Service", job: "Orquesta el caso de uso 'crear libro': decide el orden de los pasos y coordina dominio + repositorio." },
      { k: "dom", name: "🎯 Dominio", job: "Aplica las REGLAS DE NEGOCIO: el precio debe ser > 0, el título no puede estar repetido. Crea la entidad Libro válida." },
      { k: "repo", name: "🗃️ Repositorio", job: "Traduce la entidad y la PERSISTE en la base. Es el único que habla con la BD." },
      { k: "db", name: "💾 Base de datos", job: "Guarda el registro y devuelve el id generado." },
    ];
    // Ida (0..4) y vuelta (5..8) con la respuesta.
    const FLOW = [
      { at: 0, dir: "▼", txt: "Llega la request HTTP: POST /libros { title: 'Rayuela' }" },
      { at: 1, dir: "▼", txt: "El Service arma el caso de uso y pide validar al Dominio." },
      { at: 2, dir: "▼", txt: "El Dominio valida las reglas y crea la entidad Libro." },
      { at: 3, dir: "▼", txt: "El Repositorio recibe la entidad lista para guardar." },
      { at: 4, dir: "▼", txt: "La BD inserta el registro y devuelve id: 7." },
      { at: 3, dir: "▲", txt: "El Repositorio devuelve la entidad ya persistida (con id)." },
      { at: 1, dir: "▲", txt: "El Service devuelve el resultado del caso de uso." },
      { at: 0, dir: "▲", txt: "El Controlador formatea la respuesta HTTP: 201 Created." },
    ];

    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🧭 Seguí la request</span>' +
      '<p>Una petición no toca la base directo: <b>baja</b> capa por capa y la respuesta <b>sube</b>. Avanzá paso a paso y mirá de qué se encarga cada una.</p></div>' +
      '<div class="lt-stack" id="lt-stack">' +
        LAYERS.map((l) => '<div class="lt-layer" data-k="' + l.k + '"><div class="lt-name">' + l.name + '</div><div class="lt-job">' + l.job + '</div></div>').join("") +
      '</div>' +
      '<div class="lt-msg" id="lt-msg"></div>' +
      '<div class="sim-ctrls"><button class="btn sm ghost" id="lt-prev">← Atrás</button>' +
      '<span class="sim-step" id="lt-step"></span>' +
      '<button class="btn sm" id="lt-next">Siguiente →</button></div>' +
      '<div class="sim-insight"><div class="sim-insight-card">🔒 <b>La regla que entra al parcial:</b> las <b>reglas de negocio</b> viven en el <b>Dominio</b>, nunca en el Controlador. Si la validación de "título repetido" estuviera en el Controlador, romperías la separación de capas (y la responsabilidad única).</div></div>';
    el.appendChild(wrap);

    let i = 0;
    const layers = wrap.querySelectorAll(".lt-layer");
    function render() {
      const f = FLOW[i];
      layers.forEach((L) => { L.classList.remove("active", "down", "up"); });
      const active = wrap.querySelector('.lt-layer[data-k="' + LAYERS[f.at].k + '"]');
      active.classList.add("active", f.dir === "▼" ? "down" : "up");
      wrap.querySelector("#lt-msg").innerHTML = '<span class="lt-dir">' + f.dir + '</span> ' + f.txt;
      wrap.querySelector("#lt-step").textContent = "Paso " + (i + 1) + " / " + FLOW.length;
      wrap.querySelector("#lt-prev").disabled = i === 0;
      wrap.querySelector("#lt-next").disabled = i === FLOW.length - 1;
    }
    wrap.querySelector("#lt-next").addEventListener("click", () => { if (i < FLOW.length - 1) { i++; render(); } });
    wrap.querySelector("#lt-prev").addEventListener("click", () => { if (i > 0) { i--; render(); } });
    render();
  };

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function escapeHtml(s) { return esc(s); }
})();
