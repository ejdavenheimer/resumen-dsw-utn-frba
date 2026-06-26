/* =====================================================================
   Widgets de juegos interactivos (vanilla JS).
   Pensados para "aprender jugando" dentro de cada unidad.

   APP.flashcards(el, cards)
     cards: [{ front, back }]  · tarjetas que se dan vuelta al clic.

   APP.sortGame(el, cfg)
     cfg: { intro?, buckets:[{id,label}], items:[{q, bucket, why?}] }
     Muestra un ítem a la vez con botones (un botón por bucket).
     Corrige al instante, explica y lleva el puntaje. Botón "De nuevo".

   APP.restGame(el, items)
     items: [{ req, resource, verb, route, ok, err }]
     Para cada requerimiento: elegís verbo HTTP y código de éxito, y se
     revela la solución modelo (estilo Punto 5 del parcial).
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;

  /* ---------- Flashcards ---------- */
  APP.flashcards = function (el, cards) {
    const grid = document.createElement("div");
    grid.className = "flashgrid";
    cards.forEach((c) => {
      const card = document.createElement("button");
      card.className = "flashcard";
      card.type = "button";
      card.innerHTML =
        '<div class="flash-inner">' +
          '<div class="flash-face flash-front">' + c.front + '</div>' +
          '<div class="flash-face flash-back">' + c.back + '</div>' +
        '</div>';
      card.addEventListener("click", () => card.classList.toggle("flipped"));
      grid.appendChild(card);
    });
    el.appendChild(grid);
  };

  /* ---------- Juego de clasificación (un ítem a la vez) ---------- */
  APP.sortGame = function (el, cfg) {
    const items = cfg.items.slice();
    const state = { i: 0, correct: 0, answered: 0 };

    const wrap = document.createElement("div");
    wrap.className = "game";
    el.appendChild(wrap);

    function render() {
      wrap.innerHTML = "";

      const bar = document.createElement("div");
      bar.className = "game-bar";
      bar.innerHTML =
        '<span class="game-progress">Ítem <b>' + Math.min(state.i + 1, items.length) +
        '</b> / ' + items.length + '</span>' +
        '<span class="game-score">✅ ' + state.correct + ' / ' + state.answered + '</span>';
      wrap.appendChild(bar);

      if (state.i >= items.length) {
        const done = document.createElement("div");
        done.className = "callout key";
        const pct = items.length ? Math.round((state.correct / items.length) * 100) : 0;
        done.innerHTML =
          '<div class="callout-title">🎉 ¡Terminaste!</div><p>Acertaste <b>' +
          state.correct + " de " + items.length + "</b> (" + pct + "%).</p>";
        wrap.appendChild(done);
        const again = mkBtn("🔄 Jugar de nuevo", "");
        again.addEventListener("click", () => { state.i = 0; state.correct = 0; state.answered = 0; render(); });
        wrap.appendChild(again);
        return;
      }

      const it = items[state.i];
      const q = document.createElement("div");
      q.className = "game-q";
      q.innerHTML = it.q;
      wrap.appendChild(q);

      const opts = document.createElement("div");
      opts.className = "game-opts";
      let resolved = false;
      cfg.buckets.forEach((b) => {
        const btn = document.createElement("button");
        btn.className = "game-opt";
        btn.type = "button";
        btn.innerHTML = b.label;
        btn.addEventListener("click", () => {
          if (resolved) return;
          resolved = true;
          state.answered++;
          const right = b.id === it.bucket;
          if (right) state.correct++;
          Array.from(opts.children).forEach((x) => (x.disabled = true));
          btn.classList.add(right ? "correct" : "wrong");
          if (!right) {
            const okBtn = Array.from(opts.children).find((x) => x.dataset.id === it.bucket);
            if (okBtn) okBtn.classList.add("correct");
          }
          const fb = document.createElement("div");
          fb.className = "game-feedback " + (right ? "ok" : "bad");
          const label = (cfg.buckets.find((x) => x.id === it.bucket) || {}).label || it.bucket;
          fb.innerHTML = (right ? "✅ ¡Correcto! " : "❌ Era <b>" + label + "</b>. ") + (it.why || "");
          wrap.appendChild(fb);
          const next = mkBtn(state.i + 1 >= items.length ? "Ver resultado →" : "Siguiente →", "");
          next.addEventListener("click", () => { state.i++; render(); });
          wrap.appendChild(next);
        });
        btn.dataset.id = b.id;
        opts.appendChild(btn);
      });
      wrap.appendChild(opts);
    }
    render();
  };

  /* ---------- Constructor de endpoints REST ---------- */
  APP.restGame = function (el, items) {
    const VERBS = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    const CODES = ["200", "201", "204"];
    items.forEach((it) => {
      const card = document.createElement("div");
      card.className = "rest-card";
      card.innerHTML = '<p class="rest-req">📋 ' + it.req + "</p>";

      const row = document.createElement("div");
      row.className = "rest-row";
      row.innerHTML =
        '<label>Verbo HTTP: <select class="rest-verb">' +
          '<option value="">—</option>' + VERBS.map((v) => '<option>' + v + '</option>').join("") +
        '</select></label>' +
        '<label>Código éxito: <select class="rest-code">' +
          '<option value="">—</option>' + CODES.map((c) => '<option>' + c + '</option>').join("") +
        '</select></label>';
      card.appendChild(row);

      const btn = mkBtn("Comprobar", "sm");
      const sol = document.createElement("div");
      sol.className = "q-reveal"; sol.style.display = "none";
      btn.addEventListener("click", () => {
        const v = row.querySelector(".rest-verb").value;
        const c = row.querySelector(".rest-code").value;
        const vOk = v === it.verb;
        const cOk = c === it.ok;
        sol.style.display = "block";
        sol.innerHTML =
          "<p>" + (vOk ? "✅" : "❌") + " <b>Verbo:</b> " + it.verb +
          " &nbsp; " + (cOk ? "✅" : "❌") + " <b>Éxito:</b> " + it.ok +
          " &nbsp; <b>Error posible:</b> " + it.err + "</p>" +
          "<p><b>Recurso:</b> <span class='var-def'>" + it.resource + "</span> &nbsp; " +
          "<b>Ruta:</b> <code>" + it.verb + " " + it.route + "</code></p>";
      });
      card.appendChild(btn);
      card.appendChild(sol);
      el.appendChild(card);
    });
  };

  function mkBtn(label, cls) {
    const b = document.createElement("button");
    b.className = "btn " + (cls || "");
    b.type = "button";
    b.textContent = label;
    return b;
  }
})();
