(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "integracion",
    title: "Integración y Seguridad",
    tag: "🔗",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Integración Frontend-Backend</div>
          <h1>Integración y Seguridad</h1>
          <p class="lead">Cómo se comunican front y back, el sincronismo, y cómo proteger los recursos.</p>
        </div>

        <h2>Integración Frontend ↔ Backend</h2>
        <p>La comunicación se dispara por eventos (carga de página, clics, cambios de estado). El frontend
        consume la API del backend.</p>
        <ul>
          <li><b>Organización del código</b>: centralizar las llamadas a la API en módulos (<code>services</code>/<code>api</code>)
          para mantener alta cohesión y bajo acoplamiento, y facilitar el mocking.</li>
          <li><b>Mocking de requests</b>: simular respuestas del backend (JSON local, librería <code>msw</code>,
          funciones que devuelven promesas) para que front y back trabajen en paralelo.</li>
          <li><b>UX de carga</b>: avisar al usuario cuando algo está en curso con <b>spinners</b> o <b>skeletons</b>,
          para que no piense que se tildó y repita la acción (evita inconsistencias).</li>
        </ul>

        <h2>Sincronismo</h2>
        <p>No todos los endpoints responden al instante (sobrecarga, procesamiento pesado, tareas async).</p>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🔁 Polling</h3>
          <p>Si el backend procesará más tarde, devuelve un <b>ID de operación</b>; el front consulta
          periódicamente un endpoint de estado hasta que termina.</p></div>
          <div class="card"><h3 style="margin-top:0">⏱️ Latencia y timeouts</h3>
          <p>Con mucha latencia una petición puede fallar por <b>timeout</b>. Se implementan
          <b>reintentos</b> (automáticos o manuales).</p></div>
        </div>

        <h2>Gestión de usuarios</h2>
        <div class="callout key"><div class="callout-title">📌 No confundir</div>
        <p><b>Autenticación</b>: verifica <i>quién es</i> el usuario (login). &nbsp;·&nbsp;
        <b>Autorización</b>: determina <i>qué puede hacer</i> (permisos/roles).</p></div>

        <h3>Autenticación en APIs</h3>
        <p>Como HTTP es <b>stateless</b>, las credenciales deben viajar en <b>cada petición</b>.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th></th><th>HTTP Basic Auth</th><th>Token Bearer (JWT)</th></tr></thead>
          <tbody>
            <tr><td><b>Cómo</b></td><td>Usuario:contraseña en Base64 en el header <code>Authorization</code> de cada request.</td><td>Login una vez → el server devuelve un <b>token firmado</b> que se manda en <code>Authorization</code>.</td></tr>
            <tr><td><b>Pros</b></td><td>Simple.</td><td>Stateless, flexible, fácil de escalar.</td></tr>
            <tr><td><b>Contras</b></td><td>Poco seguro sin HTTPS; las credenciales viajan siempre.</td><td>Un token robado da acceso hasta que expira.</td></tr>
          </tbody>
        </table></div>
        <p><b>JWT</b> (JSON Web Token) tiene 3 partes: <b>header</b>, <b>payload</b> (datos como id y rol) y
        <b>firma</b> (garantiza integridad).</p>
        <div class="callout tip"><p><b>Buenas prácticas:</b> HTTPS siempre · no guardar passwords en el front
        (solo el token) · expiración corta + refresh tokens · validar firma y expiración en cada request ·
        no poner datos sensibles en el payload · no mandar tokens en la URL (quedan en el historial).</p></div>

        <p>Armá un JWT, firmalo y después intentá <b>manipularlo</b> como un atacante: vas a ver por qué el
        servidor lo detecta y por qué es <i>stateless</i>.</p>
        <div id="simMount"></div>

        <h2>Seguridad: la tríada CIA</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🔒 Confidencialidad</h3><p>Solo accede quien está autorizado.</p></div>
          <div class="card"><h3 style="margin-top:0">✅ Integridad</h3><p>Los datos no se alteran sin autorización.</p></div>
          <div class="card"><h3 style="margin-top:0">🟢 Disponibilidad</h3><p>Los sistemas/datos están disponibles cuando se necesitan.</p></div>
          <div class="card"><h3 style="margin-top:0">🔑 Criptografía</h3>
          <p><b>Hash</b> (una vía, irreversible: passwords) · <b>simétrica</b> (misma clave) ·
          <b>asimétrica</b> (clave pública + privada, base de HTTPS).</p></div>
        </div>
        <p><b>OAuth</b>: protocolo para que un usuario conceda acceso a sus recursos en un tercero
        (ej. "Iniciar sesión con Google") <b>sin compartir credenciales</b>.</p>

        <h3>Vulnerabilidades comunes y mitigación</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Vulnerabilidad</th><th>Mitigación</th></tr></thead>
          <tbody>
            <tr><td><b>Inyección (SQL / comandos)</b></td><td>Validar/sanitizar inputs, queries parametrizadas.</td></tr>
            <tr><td><b>Broken Access Control</b></td><td>Verificar permisos en el backend en cada acción.</td></tr>
            <tr><td><b>XSS (Cross-Site Scripting)</b></td><td>Escapar/sanitizar lo que se renderiza.</td></tr>
          </tbody>
        </table></div>
        <div class="callout warn"><p><b>Pregunta de parcial:</b> ¿qué mejora la seguridad de una API REST? →
        <b>Validar los inputs del usuario en el backend</b> (NO: usar GET para contraseñas, dejar CORS abierto,
        ni exponer claves en el frontend).</p></div>

      `;

      APP.jwtInspector(el.querySelector("#simMount"));
    },
  });
})();
