(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "http-rest",
    title: "HTTP y API REST",
    tag: "🌐",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Desarrollo Backend · Parte I</div>
          <h1>HTTP y API REST</h1>
          <p class="lead">El protocolo de la web y el estilo más usado para diseñar APIs.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 HTTP</div>
          <p><b>HTTP</b> es el protocolo cliente-servidor de la web. Es <b>sincrónico</b> y <b>sin estado
          (stateless)</b>: cada petición es independiente. <b>HTTPS</b> es la versión cifrada (TLS/SSL).</p>
        </div>

        <h2>Verbos, status codes e idempotencia</h2>
        <p>En vez de memorizar tablas, <b>jugá con una API de verdad</b>: cambiá el verbo, mirá el código que
        devuelve y cómo cambia la base. Vas a <i>ver</i> por qué POST crea, PUT es idempotente y un recurso que
        no existe da 404.</p>

        <div id="rpMount"></div>

        <div class="callout tip"><div class="callout-title">✅ Lo que el playground te deja claro</div>
        <ul>
          <li><b>Idempotencia:</b> repetir un <b>PUT/DELETE/GET</b> deja el sistema igual; repetir un <b>POST</b>
          crea recursos nuevos cada vez. <i>(GET, PUT y DELETE son idempotentes; POST no.)</i></li>
          <li><b>Familias de status:</b> <b>2xx</b> éxito (200, 201, 204) · <b>4xx</b> error del cliente
          (400, 404) · <b>5xx</b> error del servidor.</li>
          <li><b>204 No Content</b> en un DELETE: borró bien, por eso no hay body.</li>
        </ul></div>

        <h3>Las 5 familias de status (referencia)</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Familia</th><th>Significado</th><th>Ejemplos</th></tr></thead>
          <tbody>
            <tr><td><b>1xx</b></td><td>Informativa: recibida, en proceso</td><td>100 Continue</td></tr>
            <tr><td><b>2xx</b></td><td>Éxito</td><td>200 OK · 201 Created · 204 No Content</td></tr>
            <tr><td><b>3xx</b></td><td>Redirección (falta una acción más)</td><td>301 Moved · 304 Not Modified</td></tr>
            <tr><td><b>4xx</b></td><td>Error del cliente</td><td>400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found · 409 Conflict</td></tr>
            <tr><td><b>5xx</b></td><td>Error del servidor</td><td>500 Internal Server Error · 503 Service Unavailable</td></tr>
          </tbody>
        </table></div>
        <div class="callout info"><p><b>401 vs 403:</b> 401 = <i>no sé quién sos</i> (falta autenticarse).
        403 = <i>sé quién sos pero no podés</i> (sin permisos). &nbsp; <b>409 Conflict:</b> choca con el estado
        actual (ej. registrar un email que ya existe, o comprar sin stock).</p></div>

        <h2>API REST · los principios</h2>
        <p>Una <b>API</b> (Application Programming Interface) es el conjunto de protocolos que permite que dos
        servicios se comuniquen <b>sin conocer cómo está implementado el otro por dentro</b>. La <b>arquitectura
        web</b> son los principios que definen cómo se organizan y comunican esos componentes. <b>REST</b> es un
        estilo para diseñar esas APIs sobre HTTP:</p>
        <ul>
          <li><b>Recursos</b>: todo es un recurso con una <b>URI única</b>. Rutas con <b>sustantivos en plural</b>
          (<code>/libros</code>), <b>nunca verbos</b> (mal: <code>/getLibros</code>). Lo viste en el playground:
          el verbo lo pone el método HTTP, no la ruta.</li>
          <li><b>Operaciones = CRUD</b> con verbos: <code>GET</code> leer · <code>POST</code> crear ·
          <code>PUT</code> actualizar · <code>DELETE</code> borrar.</li>
          <li><b>Formato</b>: JSON, liviano y legible.</li>
          <li><b>Stateless</b>: cada request es autocontenida.</li>
        </ul>

        <h2>Anatomía de una URL</h2>
        <p>Una URL tiene 3 partes: <b>dominio</b> / <b>base</b> (el recurso) / <b>query string</b> (opcional).</p>
        <pre><code>GET https://amazon.com / books / ?genero=terror&price_lt=100
        └── dominio ──┘  └─base─┘ └──── query string (filtros) ────┘</code></pre>
        <ul>
          <li><b>Query string</b>: pares <code>clave=valor</code> tras <code>?</code> (unidos con <code>&</code>),
          se usan sobre todo para <b>filtrar</b>: <code>/libros?genero=terror</code>.</li>
          <li><b>Paginación</b>: si la lista es enorme, se parte en páginas vía query
          (<code>/libros?page=2&psize=50</code>). Mejor rendimiento, menos red y navegación más cómoda.</li>
        </ul>

        <h2>Una petición HTTP por dentro</h2>
        <pre><code>POST /libros HTTP/1.1            ← método + ruta
Host: api.libreria.com
Content-Type: application/json   ← headers
Authorization: Bearer eyJ...

{ "title": "Rayuela" }           ← body (payload)</code></pre>
        <p>La respuesta trae el status (ej. <code>201 Created</code>), headers y un body JSON.</p>

        <div class="callout info"><p><b>🔗 Esto es justo el Punto 5 del parcial:</b> dado un requerimiento, hay
        que elegir recurso, ruta + verbo y status. Practicalo en el
        <a class="inline" data-go="parcial" style="cursor:pointer">Simulacro de Parcial</a> con la consigna real.</p></div>
      `;

      APP.restPlayground(el.querySelector("#rpMount"));
      el.querySelectorAll("[data-go]").forEach((c) => c.addEventListener("click", () => APP.go(c.dataset.go)));
    },
  });
})();
