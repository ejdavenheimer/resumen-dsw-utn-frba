/* =====================================================================
   Simuladores — tanda 3 (frontend / seguridad / IA).
   reactSim · renderSim · jwtInspector · domSim · tempSim
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  /* ---------- Reactividad de React (state vs mutación) ---------- */
  APP.reactSim = function (el) {
    let count = 0, renders = 1, items = ["☕"];
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">⚛️ Reactividad en vivo</span>' +
      '<p>React vuelve a renderizar cuando cambiás el <b>estado correctamente</b> (creando uno nuevo). Si <b>mutás</b> el estado directo, el dato cambia pero la UI <b>no se entera</b>. Probá las dos formas.</p></div>' +
      '<div class="rx-screen"><div class="rx-render" id="rx-renders"></div>' +
        '<div class="rx-count" id="rx-count"></div>' +
        '<div class="rx-items" id="rx-items"></div></div>' +
      '<div class="rx-btns">' +
        '<button class="btn sm" data-a="set">setCount(count + 1) ✅</button>' +
        '<button class="btn sm ghost" data-a="mut">count++ (mutar) 🚫</button>' +
        '<button class="btn sm" data-a="push">setItems([...items, "🍪"]) ✅</button>' +
        '<button class="btn sm ghost" data-a="pushmut">items.push("🍪") 🚫</button>' +
      '</div>' +
      '<div class="sim-insight"><div class="sim-insight-card" id="rx-msg">Tocá un botón y mirá si la pantalla se actualiza (y el contador de renders).</div></div>';
    el.appendChild(wrap);
    function paint(rerendered) {
      wrap.querySelector("#rx-renders").textContent = "🔁 renders: " + renders;
      wrap.querySelector("#rx-count").textContent = "count = " + count;
      wrap.querySelector("#rx-items").textContent = "items = [ " + items.join(", ") + " ]";
      const screen = wrap.querySelector(".rx-screen");
      if (rerendered) { screen.classList.remove("flash"); void screen.offsetWidth; screen.classList.add("flash"); }
    }
    wrap.querySelectorAll("[data-a]").forEach((b)=>b.addEventListener("click",()=>{
      const a = b.dataset.a; const msg = wrap.querySelector("#rx-msg");
      if (a === "set") { count++; renders++; paint(true); msg.innerHTML = "✅ <b>setState</b> creó un nuevo valor → React re-renderiza y la UI muestra count actualizado."; }
      else if (a === "mut") { count++; msg.innerHTML = "🚫 Mutaste <code>count</code> directo. El valor interno cambió pero <b>NO hubo re-render</b>: la pantalla quedó vieja. (Apretá setCount para que se sincronice.)"; }
      else if (a === "push") { items = [...items, "🍪"]; renders++; paint(true); msg.innerHTML = "✅ Nuevo array con spread → React detecta el cambio y re-renderiza."; }
      else if (a === "pushmut") { items.push("🍪"); msg.innerHTML = "🚫 <code>push</code> mutó el mismo array (misma referencia). React compara referencias y no ve cambio → no re-renderiza. Por eso el estado es <b>inmutable</b>."; }
    }));
    paint(false);
  };

  /* ---------- SSR vs CSR ---------- */
  APP.renderSim = function (el) {
    const FLOWS = {
      ssr: { alias: "Cliente liviano", payload: '<html>\n  <body>\n    <h1>Catálogo</h1>\n    <ul><li>Libro 1</li><li>Libro 2</li></ul>  <!-- ya viene armado -->\n  </body>\n</html>',
        steps: ["El navegador pide la página.", "El SERVIDOR consulta la BD y arma el HTML completo.", "Llega HTML con el contenido ya puesto.", "El usuario VE el contenido al instante. ✅ Bueno para SEO."],
        pro: "SEO y primera carga rápida.", con: "Cada cambio = nueva petición al servidor." },
      csr: { alias: "Cliente pesado", payload: '<html>\n  <body>\n    <div id="root"></div>   <!-- vacío -->\n    <script src="app.js"></script>\n  </body>\n</html>',
        steps: ["El navegador pide la página.", "Llega un HTML casi VACÍO + un bundle JS.", "El navegador descarga y ejecuta el JS.", "El JS pide los datos a la API y recién ahí dibuja la UI. ⚡ Muy interactivo, peor SEO inicial."],
        pro: "UX tipo app, menos carga del servidor.", con: "Peor SEO sin prerender; pantalla en blanco inicial." },
    };
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🖼️ SSR vs CSR</span>' +
      '<p>¿Dónde se arma el HTML? Cambiá el modo y mirá <b>qué llega del servidor</b> y cuándo aparece el contenido.</p></div>' +
      '<div class="tabs"><button class="tab active" data-m="ssr">SSR (server)</button><button class="tab" data-m="csr">CSR (cliente)</button></div>' +
      '<div class="rp-grid"><div><div class="mm-label">Lo que llega del servidor</div><pre class="rp-json" id="rs-payload"></pre></div>' +
      '<div><div class="mm-label">Línea de tiempo</div><ol class="rs-steps" id="rs-steps"></ol></div></div>' +
      '<div class="sim-insight"><div class="sim-insight-card" id="rs-msg"></div></div>';
    el.appendChild(wrap);
    let mode = "ssr";
    function render(){
      const f = FLOWS[mode];
      wrap.querySelector("#rs-payload").innerHTML = esc(f.payload);
      wrap.querySelector("#rs-steps").innerHTML = f.steps.map((s)=>"<li>"+s+"</li>").join("");
      wrap.querySelector("#rs-msg").innerHTML = '<span class="pill '+(mode==="ssr"?"green":"amber")+'">'+f.alias+'</span> ✅ '+f.pro+' &nbsp; ⚠️ '+f.con;
    }
    wrap.querySelectorAll(".tab").forEach((t)=>t.addEventListener("click",()=>{ wrap.querySelectorAll(".tab").forEach((x)=>x.classList.toggle("active",x===t)); mode=t.dataset.m; render(); }));
    render();
  };

  /* ---------- Inspector de JWT (tamper-evident) ---------- */
  APP.jwtInspector = function (el) {
    const SECRET = "mi-clave-secreta";
    function b64(o){ return btoa(JSON.stringify(o)).replace(/=+$/,""); }
    function sign(h, p){ // "firma" didáctica (hash simple), no cripto real
      let s = h + "." + p + "." + SECRET, x = 0;
      for (let i=0;i<s.length;i++){ x = (x*31 + s.charCodeAt(i)) >>> 0; }
      return x.toString(16);
    }
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🔑 Inspector de JWT</span>' +
      '<p>Un JWT tiene 3 partes: <b>header.payload.firma</b>. Editá los datos y firmá. Después <b>manipulá el payload sin volver a firmar</b> (simulá un atacante) y mirá cómo el servidor lo detecta.</p></div>' +
      '<div class="jw-fields"><label>Usuario <input id="jw-user" value="emerson"></label>' +
      '<label>Rol <select id="jw-role"><option>user</option><option>admin</option></select></label>' +
      '<button class="btn sm" id="jw-sign">🔏 Firmar token</button></div>' +
      '<div class="jw-token" id="jw-token"></div>' +
      '<div class="sim-ctrls"><button class="btn sm ghost" id="jw-verify">🛡️ Verificar en el servidor</button>' +
      '<button class="btn sm ghost" id="jw-tamper">😈 Manipular rol → admin (sin firmar)</button></div>' +
      '<div class="sim-insight"><div class="sim-insight-card" id="jw-msg">Firmá el token para empezar.</div></div>';
    el.appendChild(wrap);
    const header = { alg: "HS256", typ: "JWT" };
    let token = null; // {h,p,sig}  sig = firma original
    function show(){
      const t = wrap.querySelector("#jw-token");
      if (!token){ t.innerHTML = "<span class='jw-empty'>(sin token)</span>"; return; }
      t.innerHTML = '<span class="jw-h">'+token.h+'</span>.<span class="jw-p">'+token.p+'</span>.<span class="jw-s">'+token.sig+'</span>';
    }
    wrap.querySelector("#jw-sign").addEventListener("click",()=>{
      const payload = { user: wrap.querySelector("#jw-user").value, role: wrap.querySelector("#jw-role").value };
      const h = b64(header), p = b64(payload);
      token = { h, p, sig: sign(h,p) };
      show();
      wrap.querySelector("#jw-msg").innerHTML = "✅ Token firmado. La <b>firma</b> depende del header+payload+clave secreta del servidor. Ahora verificalo, o intentá manipularlo.";
    });
    wrap.querySelector("#jw-tamper").addEventListener("click",()=>{
      if(!token){ wrap.querySelector("#jw-msg").innerHTML="Primero firmá un token."; return; }
      const payload = JSON.parse(atob(token.p)); payload.role = "admin";
      token.p = b64(payload); // cambiamos payload pero NO la firma (no tenemos la clave)
      show();
      wrap.querySelector("#jw-msg").innerHTML = "😈 Cambiaste el rol a <b>admin</b> pero <b>no podés recalcular la firma</b> (no tenés la clave secreta). El token quedó con firma vieja. Verificá y mirá…";
    });
    wrap.querySelector("#jw-verify").addEventListener("click",()=>{
      if(!token){ wrap.querySelector("#jw-msg").innerHTML="Primero firmá un token."; return; }
      const valid = sign(token.h, token.p) === token.sig;
      wrap.querySelector("#jw-msg").innerHTML = valid
        ? "🛡️ <b>Firma válida.</b> El servidor recalcula la firma con su clave y coincide → confía en los datos. Y es <b>stateless</b>: no guardó nada de sesión."
        : "🚫 <b>Firma INVÁLIDA.</b> El servidor recalculó la firma y no coincide → rechaza el token. Por eso un JWT es <b>a prueba de manipulación</b>.";
    });
    show();
  };

  /* ---------- DOM + eventos en vivo (Frontend) ---------- */
  APP.domSim = function (el) {
    let clicks = 0;
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🌳 DOM y eventos</span>' +
      '<p>El DOM es un <b>árbol</b> que JS puede modificar. Dispará eventos y mirá cómo cambia la vista, el árbol y el <b>objeto del evento</b>.</p></div>' +
      '<div class="rp-grid"><div><div class="mm-label">Vista</div><div class="dom-preview" id="dom-prev"><h4 id="dom-title">Hola 👋</h4><p id="dom-text">Texto inicial.</p></div>' +
      '<div class="dom-btns"><button class="btn sm" data-a="text">Cambiar texto</button><button class="btn sm" data-a="add">Agregar &lt;li&gt;</button><button class="btn sm ghost" data-a="color">Resaltar</button></div></div>' +
      '<div><div class="mm-label">Árbol (DOM)</div><pre class="rp-json" id="dom-tree"></pre>' +
      '<div class="mm-label" style="margin-top:.5rem">Último evento</div><pre class="rp-json" id="dom-evt">// hacé clic en un botón</pre></div></div>';
    el.appendChild(wrap);
    const prev = wrap.querySelector("#dom-prev");
    let lis = 0;
    function tree(){
      let t = "<div id='root'>\n  <h4 id='dom-title'>"+esc(wrap.querySelector("#dom-title").textContent)+"</h4>\n  <p id='dom-text'>"+esc(wrap.querySelector("#dom-text").textContent)+"</p>";
      if (lis>0){ t += "\n  <ul>"; for(let i=1;i<=lis;i++) t+="\n    <li>item "+i+"</li>"; t+="\n  </ul>"; }
      t += "\n</div>";
      wrap.querySelector("#dom-tree").innerHTML = esc(t);
    }
    wrap.querySelectorAll("[data-a]").forEach((b)=>b.addEventListener("click",(event)=>{
      clicks++;
      const a = b.dataset.a;
      if (a==="text") wrap.querySelector("#dom-text").textContent = "Texto cambiado por JS (" + clicks + ")";
      else if (a==="add"){ lis++; let ul = prev.querySelector("ul"); if(!ul){ ul=document.createElement("ul"); prev.appendChild(ul);} const li=document.createElement("li"); li.textContent="item "+lis; ul.appendChild(li); }
      else if (a==="color") prev.classList.toggle("hot");
      tree();
      wrap.querySelector("#dom-evt").innerHTML = esc(JSON.stringify({ type: event.type, target: "button["+a+"]", clicksTotales: clicks }, null, 2));
    }));
    tree();
  };

  /* ---------- Temperatura / seed (IA) ---------- */
  APP.tempSim = function (el) {
    const LOW = ["El gato duerme en el sofá.", "El gato duerme en el sofá.", "El gato descansa en el sillón."];
    const HIGH = ["El minino sueña galaxias de lana.", "Felino cósmico ronronea jazz.", "El gato, pirata del living, iza su cola."];
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML =
      '<div class="sim-head"><span class="sim-tag">🌡️ Temperatura de un modelo</span>' +
      '<p>Mismo prompt ("escribí sobre un gato"). Movés la temperatura y generás: baja = predecible, alta = creativa. Con <b>seed fija</b>, el resultado es reproducible.</p></div>' +
      '<label class="ts-label">Temperatura: <b id="ts-val">0.2</b></label>' +
      '<input type="range" min="0" max="100" value="20" class="cs-range" id="ts-range">' +
      '<label class="ts-seed"><input type="checkbox" id="ts-seed"> Seed fija (reproducible)</label>' +
      '<div class="sim-ctrls"><button class="btn sm" id="ts-gen">▸ Generar 3 veces</button></div>' +
      '<div class="ts-out" id="ts-out"></div>' +
      '<div class="sim-insight"><div class="sim-insight-card" id="ts-msg"></div></div>';
    el.appendChild(wrap);
    const range = wrap.querySelector("#ts-range");
    range.addEventListener("input",()=>{ wrap.querySelector("#ts-val").textContent = (range.value/100).toFixed(2); });
    wrap.querySelector("#ts-gen").addEventListener("click",()=>{
      const t = range.value/100; const seeded = wrap.querySelector("#ts-seed").checked;
      const pool = t < 0.5 ? LOW : HIGH;
      const outs = [];
      for (let i=0;i<3;i++){ outs.push(seeded ? pool[0] : pool[Math.floor(Math.random()*pool.length)]); }
      wrap.querySelector("#ts-out").innerHTML = outs.map((o)=>'<div class="ts-line">📝 '+esc(o)+'</div>').join("");
      wrap.querySelector("#ts-msg").innerHTML = seeded
        ? "🎲 Con <b>seed fija</b> las 3 salidas son idénticas: resultado <b>reproducible</b>."
        : (t < 0.5 ? "❄️ Temperatura baja → respuestas <b>predecibles</b> y parecidas entre sí." : "🔥 Temperatura alta → respuestas <b>variadas y creativas</b> (más riesgo de delirar).");
    });
  };
})();
