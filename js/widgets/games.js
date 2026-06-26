/* =====================================================================
   APP.restGame(el, items) — constructor de endpoints REST.
   Para cada requerimiento elegís verbo HTTP + código de éxito y se revela
   la solución modelo. Usado en el Punto 5 del Simulacro de Parcial.
     items: [{ req, resource, verb, route, ok, err }]
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;

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
