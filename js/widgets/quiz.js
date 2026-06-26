/* =====================================================================
   Widget de cuestionario interactivo — APP.quiz(container, questions)
   Cada pregunta es uno de estos formatos:
     {n, topic, type:'vf'|'mc'|'multi', q, options:[{t, ok}], explain?}
     {n, topic, type:'open',  q, answer}
     {n, topic, type:'match', q, pairs:[{l, r}]}
   - vf/mc: una sola respuesta correcta (clic y se corrige al instante).
   - multi: varias correctas (marcás y tocás "Comprobar").
   - open:  pregunta a desarrollar (botón "Ver respuesta").
   - match: unir conceptos (botón "Ver relaciones").
   El campo `topic` habilita el filtro por tema (poné el mismo en varias).
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;

  APP.quiz = function (container, questions) {
    const topics = [];
    questions.forEach((q) => { if (q.topic && topics.indexOf(q.topic) === -1) topics.push(q.topic); });

    const state = { filter: "Todos", answered: 0, correct: 0, total: questions.filter(scoreable).length };

    const toolbar = document.createElement("div");
    toolbar.className = "quiz-toolbar";
    const filter = document.createElement("div");
    filter.className = "quiz-filter";
    if (topics.length > 1) {
      ["Todos"].concat(topics).forEach((t) => {
        const b = document.createElement("button");
        b.className = "chip-btn" + (t === "Todos" ? " active" : "");
        b.textContent = t;
        b.addEventListener("click", () => {
          state.filter = t;
          filter.querySelectorAll(".chip-btn").forEach((x) => x.classList.toggle("active", x === b));
          renderList();
        });
        filter.appendChild(b);
      });
    }
    const score = document.createElement("div");
    score.className = "quiz-score";
    toolbar.appendChild(filter);
    toolbar.appendChild(score);
    container.appendChild(toolbar);

    const list = document.createElement("div");
    container.appendChild(list);

    function scoreable(q) { return q.type === "vf" || q.type === "mc" || q.type === "multi"; }

    function updateScore() {
      score.innerHTML = "Aciertos: <b>" + state.correct + "</b> / " + state.answered +
        " respondidas · " + state.total + " preguntas";
    }

    function renderList() {
      list.innerHTML = "";
      questions
        .filter((q) => state.filter === "Todos" || q.topic === state.filter)
        .forEach((q) => list.appendChild(card(q)));
    }

    function card(q) {
      const c = document.createElement("div");
      c.className = "q-card";
      const head = document.createElement("div");
      head.className = "q-head";
      head.innerHTML =
        '<div class="q-num">' + q.n + '</div>' +
        '<div><p class="q-text">' + q.q + '</p>' + (q.topic ? '<div class="q-topic">' + q.topic + '</div>' : '') + '</div>';
      c.appendChild(head);

      if (q.type === "open") {
        const btn = mkBtn("Ver respuesta", "ghost sm");
        const rev = document.createElement("div");
        rev.className = "q-reveal"; rev.style.display = "none";
        rev.innerHTML = '<div class="ans"><b>Respuesta:</b> ' + q.answer + '</div>';
        btn.addEventListener("click", () => { rev.style.display = "block"; btn.style.display = "none"; });
        c.appendChild(btn); c.appendChild(rev);
        return c;
      }

      if (q.type === "match") {
        const btn = mkBtn("Ver relaciones correctas", "ghost sm");
        const ul = document.createElement("ul");
        ul.className = "q-match"; ul.style.display = "none";
        q.pairs.forEach((p) => {
          const li = document.createElement("li");
          li.innerHTML = "<b>" + p.l + "</b> → " + p.r;
          ul.appendChild(li);
        });
        btn.addEventListener("click", () => { ul.style.display = "flex"; btn.style.display = "none"; });
        c.appendChild(btn); c.appendChild(ul);
        return c;
      }

      // vf / mc / multi
      const opts = document.createElement("div");
      opts.className = "q-opts";
      const isMulti = q.type === "multi";
      let resolved = false;
      const chosen = new Set();

      q.options.forEach((o, i) => {
        const b = document.createElement("button");
        b.className = "q-opt";
        b.innerHTML = '<span class="mk">' + (o.ok ? "✓" : "✗") + '</span><span>' + o.t + '</span>';
        b.addEventListener("click", () => {
          if (resolved) return;
          if (isMulti) {
            if (chosen.has(i)) { chosen.delete(i); b.style.borderColor = ""; b.style.background = ""; }
            else { chosen.add(i); b.style.borderColor = "var(--brand)"; b.style.background = "var(--brand-soft)"; }
          } else {
            resolve([i]);
          }
        });
        opts.appendChild(b);
      });
      c.appendChild(opts);

      if (isMulti) {
        const check = mkBtn("Comprobar selección", "sm");
        check.addEventListener("click", () => { if (!resolved) resolve(Array.from(chosen)); });
        c.appendChild(check);
      }

      function resolve(selected) {
        resolved = true;
        const buttons = Array.from(opts.children);
        let allRight = true;
        q.options.forEach((o, i) => {
          const picked = selected.indexOf(i) !== -1;
          if (o.ok) buttons[i].classList.add("correct");
          if (picked && !o.ok) { buttons[i].classList.add("wrong"); allRight = false; }
          if (!picked && o.ok) allRight = false;
        });
        buttons.forEach((b) => (b.disabled = true));
        state.answered++;
        if (allRight) state.correct++;
        updateScore();
        if (q.explain) {
          const ex = document.createElement("div");
          ex.className = "q-reveal";
          ex.innerHTML = "💡 " + q.explain;
          c.appendChild(ex);
        }
      }

      return c;
    }

    function mkBtn(label, cls) {
      const b = document.createElement("button");
      b.className = "btn " + (cls || "") + " btn-reveal";
      b.textContent = label;
      return b;
    }

    updateScore();
    renderList();
  };
})();
