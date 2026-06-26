(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "backend-capas",
    title: "Backend en capas",
    tag: "🧱",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Desarrollo Backend · Parte II</div>
          <h1>Arquitectura de Backend en capas</h1>
          <p class="lead">Organizar el código en capas desacopladas para que sea mantenible y testeable.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 La idea</div>
          <p>Una petición no toca la base de datos de una. <b>Baja</b> capa por capa
          (Controlador → Service → Dominio → Repositorio → BD) y la respuesta <b>sube</b>. Cada capa tiene
          <b>una sola responsabilidad</b>. Seguí una request de verdad para verlo 👇</p>
        </div>

        <div id="ltMount"></div>

        <h2>Qué hace cada capa</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🚪 Controlador</h3>
          <p>Punto de entrada (ej. HTTP). Traduce la petición, valida la <b>estructura</b>, delega al service y
          formatea la respuesta. <b>Regla de oro: NUNCA contiene lógica de negocio.</b></p></div>
          <div class="card"><h3 style="margin-top:0">⚙️ Service (casos de uso)</h3>
          <p>Orquesta la operación: coordina dominio y repositorios. Separa el <b>"qué se hace"</b> (dominio) del
          <b>"cuándo y en qué orden"</b> (service).</p></div>
          <div class="card"><h3 style="margin-top:0">🎯 Dominio</h3>
          <p>El <b>núcleo</b>: lógica de negocio pura, entidades y reglas. Independiente de la persistencia.
          Evitá el <i>Anemic Domain Model</i>: la lógica va en las entidades.</p></div>
          <div class="card"><h3 style="margin-top:0">🗃️ Repositorio</h3>
          <p>Encapsula el <b>acceso a datos</b> para que el dominio sea agnóstico a la persistencia.
          Métodos: <code>agregar</code>, <code>modificar</code>, <code>eliminar</code>, <code>buscar</code>.</p></div>
        </div>

        <div class="callout warn"><p><b>Pregunta típica de parcial:</b> ¿qué responsabilidad tiene la capa de
        <b>servicios</b>? → <i>orquestar la lógica de negocio e implementar los casos de uso</i> (no ejecutar
        queries, no mostrar mensajes, no definir rutas).</p></div>

        <div class="callout tip"><div class="callout-title">⚠️ Casos de uso vs. actores</div>
        <p>Error común: meter un <b>caso de uso</b> dentro de una clase que representa un <b>actor</b>. Regla
        práctica: si el método <i>"luce como un botón"</i> (ej. <code>usuario.verCalificaciones()</code>), probablemente
        sea un caso de uso que va en un <b>Service</b>, no en la entidad. El dominio modela el negocio; el service
        orquesta las acciones.</p></div>

        <div class="callout info"><p><b>DTO (Data Transfer Object):</b> objeto plano que el Controlador devuelve
        al cliente en vez de exponer la entidad del dominio cruda. Aísla la API de cómo está hecho el modelo por
        dentro.</p></div>

        <h2>Validaciones en capas y manejo de errores</h2>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Nivel</th><th>Qué valida</th></tr></thead>
          <tbody>
            <tr><td>Frontend / UI</td><td>Feedback rápido al usuario.</td></tr>
            <tr><td>Controlador</td><td>Estructura de la petición (campos requeridos, tipos).</td></tr>
            <tr><td>Dominio / Services</td><td>Reglas de negocio complejas.</td></tr>
            <tr><td>Persistencia</td><td>Última barrera (ej. UNIQUE en la BD).</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li><b>Errores personalizados</b>: clases propias (<code>ValidationError</code>, <code>NotFoundError</code>).</li>
          <li><b>Middleware global de errores</b>: centraliza el manejo (Express) y convierte las excepciones en
          respuestas HTTP con el código correcto (400, 404, 500).</li>
        </ul>
      `;

      APP.layerTracer(el.querySelector("#ltMount"));
    },
  });
})();
