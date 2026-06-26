(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "patrones",
    title: "Patrones y renderizado",
    tag: "🧩",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Frontend · Parte II</div>
          <h1>Patrones de interacción y renderizado</h1>
          <p class="lead">Cómo se organiza la presentación y dónde se arma el HTML.</p>
        </div>

        <h2>Patrones de presentación</h2>
        <p>Organizan la interacción entre datos, lógica y presentación para separar responsabilidades.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Patrón</th><th>Idea</th><th>Típico de</th></tr></thead>
          <tbody>
            <tr><td><b>MVC</b><br>Modelo-Vista-Controlador</td><td>Modelo (datos/lógica) · Vista (UI) · Controlador (recibe input, actúa sobre el modelo y elige la vista).</td><td>Frameworks server: Django, Rails.</td></tr>
            <tr><td><b>MVP</b><br>Modelo-Vista-Presentador</td><td>El <b>Presentador</b> tiene toda la lógica de presentación; la Vista es <b>pasiva</b>. Facilita el testing de la UI.</td><td>Apps con UI testeable.</td></tr>
            <tr><td><b>MVVM</b><br>Modelo-Vista-VistaModelo</td><td>El <b>ViewModel</b> expone datos y comandos a la vista con <b>data binding</b> (sincronización automática UI↔datos).</td><td>Frameworks declarativos: Angular, Vue.</td></tr>
          </tbody>
        </table></div>

        <h2>Tipos de renderizado</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🖥️ Server-Side Rendering (SSR)</h3>
          <p>El HTML completo se genera <b>en el servidor</b> en cada solicitud. Bueno para <b>SEO</b> y carga
          inicial rápida, pero cada cambio puede requerir una nueva petición al servidor.</p>
          <p><span class="pill green">"Cliente liviano"</span> Ventajas: simplicidad y SEO. Desventajas: menor
          interactividad y más carga en el servidor.</p></div>
          <div class="card"><h3 style="margin-top:0">💻 Client-Side Rendering (CSR)</h3>
          <p>El servidor manda un HTML mínimo y es el <b>JavaScript del navegador</b> quien renderiza la UI y
          pide los datos a las APIs. Experiencias muy fluidas e interactivas.</p>
          <p><span class="pill amber">"Cliente pesado"</span> Ventajas: UX tipo app y menor carga del servidor.
          Desventajas: peor SEO (sin prerendering) y más complejidad. Implica <b>más procesamiento en el cliente</b>.</p></div>
        </div>

        <div class="callout warn"><p><b>Pregunta de parcial:</b> ¿qué caracteriza a un <b>cliente pesado</b>
        (client side render)? → <b>Mayor carga de procesamiento en el lado del cliente</b>.</p></div>

        <p>Cambiá entre SSR y CSR y mirá <b>qué llega del servidor</b> en cada caso y cuándo aparece el contenido:</p>
        <div id="simMount"></div>

        <h2>SPA — Single Page Application</h2>
        <div class="callout key"><div class="callout-title">📌 SPA</div>
        <p>Aplicación web que funciona dentro de <b>una única página HTML</b>, cargando dinámicamente el
        contenido de las distintas "vistas" <b>sin recargar la página</b>. Da una experiencia rápida y fluida.
        React es ideal para construir SPAs.</p></div>
        <p>Enfoques mixtos (ej. Next.js) combinan SSR y CSR para aprovechar lo mejor de cada uno.</p>

      `;

      APP.renderSim(el.querySelector("#simMount"));
    },
  });
})();
