/* =====================================================================
   Simuladores — tanda 2 (backend / arquitectura / práctica).
   jsConsole · clientServerSlider · couplingSim · testRunner ·
   mongoModeler · ciPipeline
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  /* ---------- Consola JS en vivo (Fundamentos) ---------- */
  APP.jsConsole = function (el) {
    const SNIPPETS = {
      "const reasignado": 'const pi = 3.14;\npi = 3.1416; // ¿qué pasa?',
      "map vs forEach": 'const n = [1,2,3];\nconst dobles = n.map(x => x*2);\nconsole.log("map devuelve:", dobles);\nconst r = n.forEach(x => x*2);\nconsole.log("forEach devuelve:", r);',
      "== vs ===": 'console.log(0 == "");    // conversión rara\nconsole.log(0 === "");   // estricto\nconsole.log(1 == "1");\nconsole.log(1 === "1");',
      "filter": 'const edades = [12, 18, 25, 7, 40];\nconst adultos = edades.filter(e => e >= 18);\nconsole.log("adultos:", adultos);\nconsole.log("original intacto:", edades);',
    };
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">💻 Consola JS real</span>' +
      '<p>Esto ejecuta JavaScript de verdad en tu navegador. Cargá un ejemplo, <b>predecí qué va a imprimir</b> y corré. Los errores también se muestran (probá reasignar un <code>const</code>).</p></div>' +
      '<div class="jc-snips">' + Object.keys(SNIPPETS).map((k) => '<button class="sim-chip sm" data-s="' + esc(k) + '">' + esc(k) + '</button>').join("") + '</div>' +
      '<textarea class="jc-code" spellcheck="false">' + esc(SNIPPETS["map vs forEach"]) + '</textarea>' +
      '<div class="sim-ctrls"><button class="btn sm" id="jc-run">▸ Ejecutar</button><span class="sim-step">Salida ↓</span></div>' +
      '<pre class="jc-out" id="jc-out"></pre>';
    el.appendChild(wrap);
    const code = wrap.querySelector(".jc-code");
    const out = wrap.querySelector("#jc-out");
    wrap.querySelectorAll("[data-s]").forEach((b) => b.addEventListener("click", () => { code.value = SNIPPETS[b.dataset.s]; out.innerHTML = ""; }));
    wrap.querySelector("#jc-run").addEventListener("click", () => {
      const logs = [];
      const fakeConsole = { log: (...a) => logs.push(a.map(fmt).join(" ")) };
      try {
        new Function("console", '"use strict";\n' + code.value)(fakeConsole);
        out.className = "jc-out";
        out.innerHTML = logs.length ? logs.map((l) => "▸ " + esc(l)).join("\n") : "(sin salida)";
      } catch (e) {
        out.className = "jc-out err";
        out.innerHTML = (logs.length ? logs.map((l) => "▸ " + esc(l)).join("\n") + "\n" : "") + "💥 " + esc(e.name + ": " + e.message);
      }
    });
    function fmt(v){ return typeof v === "object" ? JSON.stringify(v) : String(v); }
  };

  /* ---------- Cliente/Servidor: ¿dónde vive la lógica? (Arquitectura) ---------- */
  APP.clientServerSlider = function (el) {
    const ZONES = [
      { max: 20, name: "Cliente Pasivo · Servidor Activo", alias: "Cliente liviano", render: "≈ SSR",
        pro: "Lógica centralizada → mantenibilidad y seguridad.", con: "El servidor puede ser cuello de botella y único punto de falla." },
      { max: 45, name: "Cliente Pasivo · Servidor Activo", alias: "Cliente liviano", render: "≈ SSR",
        pro: "El cliente solo presenta; el server manda.", con: "Cada interacción depende del servidor." },
      { max: 70, name: "Cliente Activo · Servidor Activo", alias: "Cliente pesado", render: "≈ CSR",
        pro: "Lógica distribuida, UX más fluida.", con: "Coordinación más compleja entre ambos." },
      { max: 101, name: "Cliente Activo · Servidor Pasivo", alias: "Cliente pesado", render: "≈ CSR puro",
        pro: "Máxima interactividad en el cliente.", con: "El servidor casi solo persiste; menor control central." },
    ];
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">⚖️ ¿Dónde vive la lógica?</span>' +
      '<p>Movés el deslizador para repartir la <b>lógica de negocio</b> entre cliente y servidor y ves en qué caso caés, su alias (liviano/pesado) y el equivalente en renderizado.</p></div>' +
      '<input type="range" min="0" max="100" value="15" class="cs-range" id="cs-range">' +
      '<div class="cs-bars"><div class="cs-bar"><span>🖥️ Servidor</span><div class="cs-track"><div class="cs-fill srv" id="cs-srv"></div></div></div>' +
      '<div class="cs-bar"><span>📱 Cliente</span><div class="cs-track"><div class="cs-fill cli" id="cs-cli"></div></div></div></div>' +
      '<div class="cs-card" id="cs-card"></div>';
    el.appendChild(wrap);
    const range = wrap.querySelector("#cs-range");
    function render() {
      const v = Number(range.value);
      wrap.querySelector("#cs-cli").style.width = v + "%";
      wrap.querySelector("#cs-srv").style.width = (100 - v) + "%";
      const z = ZONES.find((z) => v < z.max);
      wrap.querySelector("#cs-card").innerHTML =
        '<div class="cs-name">' + z.name + ' <span class="pill ' + (z.alias === "Cliente liviano" ? "green" : "amber") + '">' + z.alias + '</span> <span class="cs-render">' + z.render + '</span></div>' +
        '<p>✅ ' + z.pro + '</p><p>⚠️ ' + z.con + '</p>';
    }
    range.addEventListener("input", render); render();
  };

  /* ---------- Acoplamiento (Diseño/SOLID) ---------- */
  APP.couplingSim = function (el) {
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🕸️ Acoplamiento en acción</span>' +
      '<p>Tocá un módulo para "modificarlo" y mirá <b>cuántos otros se rompen</b>. Cambiá entre alto y bajo acoplamiento y compará el impacto. Ese es el costo de mantener el código.</p></div>' +
      '<div class="tabs"><button class="tab active" data-mode="high">Alto acoplamiento 😬</button><button class="tab" data-mode="low">Bajo acoplamiento 😌</button></div>' +
      '<div class="cp-board" id="cp-board"></div>' +
      '<div class="sim-insight"><div class="sim-insight-card" id="cp-msg">Tocá un módulo para modificarlo.</div></div>';
    el.appendChild(wrap);
    // high: todos dependen de "Pagos" (God) y entre sí. low: dependen de una abstracción.
    const MODELS = {
      high: { nodes: ["Pedidos", "Pagos", "Stock", "Mails", "Reportes"], deps: { "Pagos": ["Pedidos","Stock","Mails","Reportes"], "Pedidos": ["Stock"], "Stock": ["Reportes"] } },
      low:  { nodes: ["Pedidos", "IPago", "Stock", "Mails", "Reportes"], deps: { } },
    };
    let mode = "high";
    function affected(node) {
      // quién depende (directa o transitivamente) del nodo modificado
      const deps = MODELS[mode].deps;
      const hit = new Set();
      function dfs(n){ Object.keys(deps).forEach((k)=>{ if(deps[k].includes(n) && !hit.has(k)){ hit.add(k); dfs(k);} }); }
      dfs(node); return hit;
    }
    function board() {
      const b = wrap.querySelector("#cp-board");
      b.innerHTML = MODELS[mode].nodes.map((n) => '<button class="cp-node" data-n="' + n + '">' + n + '</button>').join("");
      b.querySelectorAll(".cp-node").forEach((btn) => btn.addEventListener("click", () => {
        b.querySelectorAll(".cp-node").forEach((x)=>x.classList.remove("changed","broken"));
        btn.classList.add("changed");
        const hit = affected(btn.dataset.n);
        hit.forEach((h)=>{ const e=b.querySelector('[data-n="'+h+'"]'); if(e) e.classList.add("broken"); });
        const msg = wrap.querySelector("#cp-msg");
        if (mode === "high") msg.innerHTML = "💥 Modificaste <b>" + btn.dataset.n + "</b> y se rompieron <b>" + hit.size + "</b> módulos. Con alto acoplamiento, un cambio se propaga por todos lados.";
        else msg.innerHTML = "✅ Modificaste <b>" + btn.dataset.n + "</b> y NO se rompió nadie (" + hit.size + "). Dependen de una <b>abstracción</b> (IPago), no de implementaciones concretas → <b>DIP</b>.";
      }));
    }
    wrap.querySelectorAll(".tab").forEach((t)=>t.addEventListener("click",()=>{
      wrap.querySelectorAll(".tab").forEach((x)=>x.classList.toggle("active",x===t));
      mode = t.dataset.mode; board();
      wrap.querySelector("#cp-msg").innerHTML = "Tocá un módulo para modificarlo.";
    }));
    board();
  };

  /* ---------- Test runner (Testing) ---------- */
  APP.testRunner = function (el) {
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🧪 Corré los tests</span>' +
      '<p>Esta es la función bajo prueba y sus asserts (estructura <b>Arrange-Act-Assert</b>). Metele un bug y corré: mirá cómo el test <b>encuentra la falla</b> (que es su trabajo).</p></div>' +
      '<div class="tabs"><button class="tab active" data-bug="0">Implementación correcta</button><button class="tab" data-bug="1">Meter un bug 🐛</button></div>' +
      '<pre class="sim-code" id="tr-code"></pre>' +
      '<div class="sim-ctrls"><button class="btn sm" id="tr-run">▸ Correr tests</button><span class="sim-step" id="tr-sum"></span></div>' +
      '<div class="tr-results" id="tr-res"></div>';
    el.appendChild(wrap);
    let bug = 0;
    const impl = (b) => (precio, pct) => b ? precio - pct : precio - (precio * pct / 100);
    const CASES = [
      { name: "10% de 100 = 90", a: [100, 10], exp: 90 },
      { name: "0% de 50 = 50", a: [50, 0], exp: 50 },
      { name: "50% de 80 = 40", a: [80, 50], exp: 40 },
    ];
    function code() {
      wrap.querySelector("#tr-code").innerHTML = esc(
        "function aplicarDescuento(precio, pct) {\n  return " +
        (bug ? "precio - pct;            // 🐛 resta el % como si fueran pesos" : "precio - (precio * pct / 100);") +
        "\n}\n\n// Arrange-Act-Assert\ntest('descuentos', () => {\n  expect(aplicarDescuento(100, 10)).toBe(90);\n  // ...\n});");
    }
    wrap.querySelectorAll(".tab").forEach((t)=>t.addEventListener("click",()=>{
      wrap.querySelectorAll(".tab").forEach((x)=>x.classList.toggle("active",x===t));
      bug = Number(t.dataset.bug); code(); wrap.querySelector("#tr-res").innerHTML=""; wrap.querySelector("#tr-sum").textContent="";
    }));
    wrap.querySelector("#tr-run").addEventListener("click", () => {
      const fn = impl(bug); const res = wrap.querySelector("#tr-res"); res.innerHTML = "";
      let pass = 0;
      CASES.forEach((c) => {
        const got = fn(c.a[0], c.a[1]); const ok = got === c.exp; if (ok) pass++;
        const row = document.createElement("div");
        row.className = "tr-row " + (ok ? "pass" : "fail");
        row.innerHTML = (ok ? "✅ PASS" : "❌ FAIL") + " · " + c.name + (ok ? "" : " → esperaba " + c.exp + ", obtuvo " + got);
        res.appendChild(row);
      });
      wrap.querySelector("#tr-sum").textContent = pass + " / " + CASES.length + " tests OK";
    });
    code();
  };

  /* ---------- Mongo: embebido vs referenciado (Persistencia) ---------- */
  APP.mongoModeler = function (el) {
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🗄️ Modelá el documento</span>' +
      '<p>Un <b>autor</b> con sus <b>libros</b>. Cambiá entre embebido y referenciado, agregá libros y mirá cómo queda guardado y <b>cuánto cuesta leerlo</b>.</p></div>' +
      '<div class="tabs"><button class="tab active" data-m="emb">Embebido</button><button class="tab" data-m="ref">Referenciado</button></div>' +
      '<div class="sim-ctrls"><button class="btn sm" id="mm-add">+ Agregar libro</button><button class="btn sm ghost" id="mm-del">– Quitar</button></div>' +
      '<div class="rp-grid"><div><div class="mm-label">Cómo se guarda</div><pre class="rp-json" id="mm-json"></pre></div>' +
      '<div><div class="mm-label">Costo de lectura</div><div class="mm-cost" id="mm-cost"></div></div></div>' +
      '<div class="sim-insight"><div class="sim-insight-card" id="mm-msg"></div></div>';
    el.appendChild(wrap);
    let mode = "emb", n = 2;
    function render() {
      const libros = Array.from({length:n}, (_,i)=>({ title: "Libro " + (i+1) }));
      let json, cost, msg;
      if (mode === "emb") {
        json = JSON.stringify({ _id: 1, nombre: "Borges", libros }, null, 2);
        cost = "📖 <b>1 lectura</b>: el autor y sus libros vienen juntos.";
        msg = n > 6
          ? "⚠️ Con muchos libros el documento crece y se vuelve pesado de mover. Para <b>uno-a-muchos grande</b> conviene <b>referenciar</b>."
          : "✅ Pocos libros que se leen junto al autor → <b>embebido</b> es ideal (uno-a-pocos).";
      } else {
        json = JSON.stringify({ _id: 1, nombre: "Borges", libros: libros.map((_,i)=>i+101) }, null, 2) +
          "\n// colección libros aparte:\n" + JSON.stringify(libros.map((l,i)=>({_id:i+101, autor:1, ...l})), null, 2);
        cost = "📖 <b>2 lecturas</b> (o <code>$lookup</code>): primero el autor, después sus libros.";
        msg = "✅ Guardás solo los <b>_id</b>. Bueno para <b>uno-a-muchos grande</b> o <b>muchos-a-muchos</b>, y cuando se consultan por separado.";
      }
      wrap.querySelector("#mm-json").innerHTML = esc(json);
      wrap.querySelector("#mm-cost").innerHTML = cost;
      wrap.querySelector("#mm-msg").innerHTML = msg;
    }
    wrap.querySelectorAll(".tab").forEach((t)=>t.addEventListener("click",()=>{ wrap.querySelectorAll(".tab").forEach((x)=>x.classList.toggle("active",x===t)); mode=t.dataset.m; render(); }));
    wrap.querySelector("#mm-add").addEventListener("click",()=>{ if(n<10){n++;render();} });
    wrap.querySelector("#mm-del").addEventListener("click",()=>{ if(n>1){n--;render();} });
    render();
  };

  /* ---------- CI/CD pipeline (Despliegue) ---------- */
  APP.ciPipeline = function (el) {
    const STAGES = ["📥 Commit", "🔍 Lint", "🧪 Tests", "🏗️ Build", "🚀 Deploy"];
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🔁 Pipeline de CI/CD</span>' +
      '<p>La integración continua corre pasos automáticos antes de desplegar. Mirá qué pasa con código sano… y qué pasa cuando los <b>tests fallan</b>.</p></div>' +
      '<div class="tabs"><button class="tab active" data-bug="0">Código sano ✅</button><button class="tab" data-bug="1">Con un test roto 🐛</button></div>' +
      '<div class="ci-track" id="ci-track">' + STAGES.map((s,i)=>'<div class="ci-stage" data-i="'+i+'">'+s+'</div>'+(i<STAGES.length-1?'<span class="ci-arrow">→</span>':'')).join("") + '</div>' +
      '<div class="sim-ctrls"><button class="btn sm" id="ci-run">▸ Correr pipeline</button></div>' +
      '<div class="sim-insight"><div class="sim-insight-card" id="ci-msg">Ejecutá el pipeline.</div></div>';
    el.appendChild(wrap);
    let bug = 0;
    wrap.querySelectorAll(".tab").forEach((t)=>t.addEventListener("click",()=>{ wrap.querySelectorAll(".tab").forEach((x)=>x.classList.toggle("active",x===t)); bug=Number(t.dataset.bug); reset(); }));
    function reset(){ wrap.querySelectorAll(".ci-stage").forEach((s)=>s.className="ci-stage"); wrap.querySelector("#ci-msg").innerHTML="Ejecutá el pipeline."; }
    wrap.querySelector("#ci-run").addEventListener("click", () => {
      reset();
      const stages = wrap.querySelectorAll(".ci-stage");
      const failAt = bug ? 2 : -1; // tests
      let i = 0;
      const timer = setInterval(() => {
        if (i > 0) stages[i-1].classList.remove("running");
        if (i >= stages.length) { clearInterval(timer); return; }
        if (i === failAt) {
          stages[i].classList.add("failed"); clearInterval(timer);
          wrap.querySelector("#ci-msg").innerHTML = "🛑 <b>Los tests fallaron → el pipeline se detiene.</b> El código roto NUNCA llega a Deploy. <i>Eso</i> es lo que aporta la CI: automatiza tests y builds antes del deploy.";
          return;
        }
        stages[i].classList.add("running","done");
        if (i === stages.length-1) { clearInterval(timer); wrap.querySelector("#ci-msg").innerHTML = "✅ Todos los pasos pasaron → <b>deploy exitoso</b>."; }
        i++;
      }, 600);
    });
  };
})();
