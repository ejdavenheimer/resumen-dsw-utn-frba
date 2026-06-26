(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "frontend",
    title: "Frontend y UI",
    tag: "🎨",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Frontend · Parte I</div>
          <h1>Frontend y UI</h1>
          <p class="lead">La capa de presentación: HTML, CSS, el DOM, eventos y la experiencia de usuario.</p>
        </div>

        <h2>UI vs UX</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🖼️ UI (User Interface)</h3>
          <p>El conjunto de elementos visuales y de interacción que permiten la comunicación entre la persona y
          el sistema (botones, formularios, colores).</p></div>
          <div class="card"><h3 style="margin-top:0">😊 UX (User Experience)</h3>
          <p>La experiencia y sensación total del usuario: fluidez, facilidad de uso, satisfacción.
          <b>La UI es una parte de la UX.</b></p></div>
        </div>

        <p><b>Tipos de UI:</b> gráfica (sitios web), línea de comandos (terminal), táctil (celular),
        por voz (Alexa) o natural (VR/gestos).</p>

        <h2>Las tres tecnologías web</h2>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Tech</th><th>Rol</th><th>Metáfora</th></tr></thead>
          <tbody>
            <tr><td><b>HTML</b></td><td>Estructura el contenido. Usa <b>etiquetas</b> (<code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>) y <b>atributos</b> (id, class).</td><td>"El qué" (esqueleto)</td></tr>
            <tr><td><b>CSS</b></td><td>Da estilo y presentación. Reglas con un <b>selector</b> + <b>declaraciones</b>.</td><td>"El cómo se ve" (ropa)</td></tr>
            <tr><td><b>JavaScript</b></td><td>Aporta interactividad y lógica.</td><td>"El comportamiento" (músculos)</td></tr>
          </tbody>
        </table></div>

        <div class="callout info"><p><b>Etiquetas HTML básicas:</b> <code>&lt;head&gt;</code> (metadata + CSS,
        incluye el obligatorio <code>&lt;meta charset="utf-8"&gt;</code> y el <code>&lt;title&gt;</code>) ·
        <code>&lt;body&gt;</code> (lo visible) · <code>&lt;p&gt;</code> párrafos · <code>&lt;h1&gt;…&lt;h6&gt;</code>
        jerarquía de títulos · <code>&lt;strong&gt;</code> negrita · <code>&lt;br&gt;</code> salto de línea ·
        <code>&lt;img&gt;</code> imagen (con <code>alt</code>) · <code>&lt;div&gt;</code> contenedor.</p></div>

        <h2>El DOM</h2>
        <div class="callout key"><div class="callout-title">📌 DOM</div>
        <p><b>Document Object Model</b>: representación en forma de <b>árbol</b> del documento HTML, que permite a
        JavaScript acceder y manipular dinámicamente cualquier elemento de la página.</p></div>

        <h2>Interactividad: eventos y callbacks</h2>
        <ul>
          <li><b>Eventos</b>: acciones que ocurren en la UI y JS puede detectar (<code>click</code>,
          <code>keydown</code>, <code>input</code>).</li>
          <li><b>Callbacks</b>: funciones que se ejecutan en respuesta a un evento. Se "escuchan" con
          <code>addEventListener()</code>.</li>
          <li><b>Event object</b>: cuando ocurre un evento se genera un objeto (<code>event</code>) con info,
          como <code>event.target</code> (el elemento donde ocurrió).</li>
        </ul>
        <pre><code>boton.addEventListener("click", (event) => {
  console.log("Hiciste click en", event.target);
});</code></pre>

        <p>Dispará eventos y mirá cómo JS modifica el <b>árbol del DOM</b> en vivo y qué trae el objeto del evento:</p>
        <div id="simMount"></div>

        <h2>Componentización</h2>
        <p>Construir interfaces dividiéndolas en partes pequeñas, <b>reutilizables e independientes</b>
        (componentes). Ventajas: reutilización, mantenimiento, separación de responsabilidades y trabajo en equipo.</p>

        <h2>Accesibilidad (a11y)</h2>
        <p>Hacer que la web pueda ser usada por todos, incluidas personas con discapacidad. Mejora también el SEO.</p>
        <div class="callout tip"><p><b>Para mejorar la accesibilidad del HTML</b> (pregunta de parcial):</p>
        <ul>
          <li>Usar <b>HTML semántico</b>: <code>&lt;nav&gt;</code>, <code>&lt;header&gt;</code>,
          <code>&lt;main&gt;</code>, <code>&lt;button&gt;</code> (en vez de <code>&lt;div&gt;</code> para todo).</li>
          <li>Atributo <b><code>alt</code></b> en las imágenes.</li>
          <li>Atributos <b>ARIA</b> (<code>aria-label</code>, <code>aria-expanded</code>) y <code>role</code>.</li>
          <li><code>&lt;label&gt;</code> asociado a cada input del formulario.</li>
          <li>Buen <b>contraste</b> de colores y navegación por teclado.</li>
        </ul></div>

      `;

      APP.domSim(el.querySelector("#simMount"));
    },
  });
})();
