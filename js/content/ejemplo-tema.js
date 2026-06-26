/* ============================================================
   TEMA DE EJEMPLO — muestra todos los componentes visuales.
   Para crear un tema nuevo:
     1. Copiá este archivo (ej. js/content/mi-tema.js).
     2. Cambiá el id, el title y el contenido.
     3. Agregá su <script> en index.html (el orden = orden del menú).
   Componentes disponibles (clases de styles.css):
     .callout (key | info | tip | warn) · .card · .grid-2
     ol.steps · table.data · .pill (indigo|green|amber) · .var-def
   ============================================================ */
(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "ejemplo-tema",
    title: "Tema de ejemplo",
    tag: "📖",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">TODO Materia</div>
          <h1>Título del tema</h1>
          <p class="lead">Bajada del tema en una línea.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 Definición</div>
          <p>El recuadro <b>key</b> sirve para la definición principal del tema.</p>
        </div>

        <h2>Un subtítulo</h2>
        <p>Texto normal con <b>negrita</b>, <i>cursiva</i> y un término técnico: <span class="var-def">core_business</span>.</p>
        <ul>
          <li>Ítem de una lista.</li>
          <li>Otro ítem.</li>
        </ul>

        <h2>Tarjetas en dos columnas</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">✅ Ventajas</h3><p>Contenido de la tarjeta.</p></div>
          <div class="card"><h3 style="margin-top:0">⚠️ Desventajas</h3><p>Contenido de la tarjeta.</p></div>
        </div>

        <h2>Pasos</h2>
        <ol class="steps">
          <li><span class="step-title">Primer paso</span> Descripción.</li>
          <li><span class="step-title">Segundo paso</span> Descripción.</li>
        </ol>

        <h2>Una tabla</h2>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Concepto</th><th>Detalle</th></tr></thead>
          <tbody>
            <tr><td>Fila 1</td><td>Valor</td></tr>
            <tr><td>Fila 2</td><td>Valor</td></tr>
          </tbody>
        </table></div>

        <div class="callout info"><p>Recuadro <b>info</b> (celeste) para datos/contexto.</p></div>
        <div class="callout tip"><div class="callout-title">✅ Para el parcial</div><p>Recuadro <b>tip</b> (verde) para lo que conviene recordar.</p></div>
        <div class="callout warn"><p>Recuadro <b>warn</b> (ámbar) para advertencias.</p></div>

        <p>Para enlazar a otra sección: <a class="inline" data-go="preguntas" style="cursor:pointer">ir a Preguntas</a>.</p>
      `;
      el.querySelectorAll("[data-go]").forEach((c) => c.addEventListener("click", () => APP.go(c.dataset.go)));
    },
  });
})();
