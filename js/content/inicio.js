/* Portada / bienvenida. Duplicá este patrón para crear más secciones.
   APP.register({ id, title, tag, render(el){ ... } }) */
(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "inicio",
    title: "Bienvenida",
    tag: "★",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">TODO Materia · UTN.BA</div>
          <h1>Resumen de la materia</h1>
          <p class="lead">TODO: una frase que explique de qué va este resumen y para qué sirve.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">🎯 Cómo está armado</div>
          <p>Cada tema tiene su definición, ideas clave y ejemplos. Al final, una sección de
          <a class="inline" data-go="preguntas" style="cursor:pointer">preguntas</a> interactivas para practicar.</p>
        </div>

        <div class="grid-2">
          <div class="card" style="cursor:pointer" data-go="ejemplo-tema">
            <h3 style="margin-top:0">📖 Tema de ejemplo</h3>
            <p>Mirá cómo se ve un tema y copiá ese archivo para crear los tuyos.</p>
            <span class="pill indigo">empezá acá</span>
          </div>
          <div class="card" style="cursor:pointer" data-go="preguntas">
            <h3 style="margin-top:0">📝 Preguntas</h3>
            <p>Cuestionario interactivo con corrección al instante.</p>
            <span class="pill green">práctica</span>
          </div>
        </div>
      `;
      el.querySelectorAll("[data-go]").forEach((c) =>
        c.addEventListener("click", () => APP.go(c.dataset.go))
      );
    },
  });
})();
