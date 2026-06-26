/* Portada / bienvenida de Desarrollo de Software (UTN.BA). */
(function () {
  "use strict";
  const APP = window.APP;

  const UNIDADES = [
    ["fundamentos", "💻", "Fundamentos", "JS, Node, NPM y Git avanzado."],
    ["arquitectura", "🏛️", "Arquitectura", "Componentes, cliente-servidor y capas."],
    ["http-rest", "🌐", "HTTP y REST", "Verbos, status codes y API REST."],
    ["backend-capas", "🧱", "Backend en capas", "Dominio, services, controllers y repos."],
    ["async", "⏳", "Asincronismo", "Promises, async/await, try/catch y cron."],
    ["diseno-solid", "✨", "Diseño y SOLID", "Cualidades, SOLID y code smells."],
    ["testing", "🧪", "Testing", "Unit, integración, E2E, Jest y mocking."],
    ["persistencia", "🗄️", "Persistencia", "SQL/NoSQL, MongoDB y Mongoose (ODM)."],
    ["frontend", "🎨", "Frontend y UI", "HTML, CSS, DOM, eventos y accesibilidad."],
    ["react", "⚛️", "React", "Componentes, props, hooks, estado y forms."],
    ["patrones", "🧩", "Patrones y render", "MVC/MVP/MVVM, SSR/CSR y SPA."],
    ["integracion", "🔗", "Integración y seguridad", "Sincronismo, JWT, OAuth y vulnerabilidades."],
    ["despliegue", "🚀", "Despliegue", "Cloud, Docker, CI/CD y ambientes."],
    ["ia", "🤖", "IA en desarrollo", "IA generativa, prompts y riesgos."],
  ];

  APP.register({
    id: "inicio",
    title: "Bienvenida",
    tag: "★",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Desarrollo de Software · UTN.BA</div>
          <h1>Resumen interactivo de la materia</h1>
          <p class="lead">Todo lo que entra al parcial, unidad por unidad: teoría clara, ejemplos
          y mini-juegos para fijar los conceptos. Al final, un simulacro de parcial y un banco de preguntas.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">🎯 Cómo está armado</div>
          <p>Cada unidad sigue el <b>cronograma de la cátedra</b> y, donde hay un concepto, trae un
          <b>simulador del sistema</b> embebido para <b>aprender haciendo</b>: un event loop que corre paso a paso,
          una API REST en vivo, un JWT que podés manipular, la reactividad de React, el pipeline de CI… No leés y
          después jugás: entendés mientras manipulás. Cerrá con el
          <a class="inline" data-go="parcial" style="cursor:pointer">Simulacro de Parcial</a> y las
          <a class="inline" data-go="preguntas" style="cursor:pointer">Preguntas</a>.</p>
        </div>

        <h2>Unidades</h2>
        <div class="unit-grid" id="unitGrid"></div>

        <div class="grid-2" style="margin-top:1.4rem">
          <div class="card" style="cursor:pointer" data-go="parcial">
            <h3 style="margin-top:0">📝 Simulacro de Parcial</h3>
            <p>El parcial real del 1C 2025, resuelto e interactivo, con sus 5 puntos y condiciones de aprobación.</p>
            <span class="pill amber">examen</span>
          </div>
          <div class="card" style="cursor:pointer" data-go="preguntas">
            <h3 style="margin-top:0">🎮 Banco de preguntas</h3>
            <p>Decenas de preguntas (V/F, opción múltiple, unir) filtrables por tema, con corrección al instante.</p>
            <span class="pill green">práctica</span>
          </div>
        </div>
      `;

      const grid = el.querySelector("#unitGrid");
      UNIDADES.forEach(([id, ico, title, desc]) => {
        const card = document.createElement("div");
        card.className = "card unit-card";
        card.style.cursor = "pointer";
        card.dataset.go = id;
        card.innerHTML =
          '<div class="unit-ico">' + ico + '</div>' +
          '<h3>' + title + '</h3><p>' + desc + '</p>';
        grid.appendChild(card);
      });

      el.querySelectorAll("[data-go]").forEach((c) =>
        c.addEventListener("click", () => APP.go(c.dataset.go))
      );
    },
  });
})();
