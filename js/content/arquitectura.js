(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "arquitectura",
    title: "Arquitectura de Software",
    tag: "🏛️",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Introducción a la asignatura</div>
          <h1>Arquitectura de Software</h1>
          <p class="lead">Cómo se estructura un sistema: sus componentes, sus relaciones y la separación de responsabilidades.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 Definición</div>
          <p>La <b>arquitectura de software</b> define la estructura de un sistema: sus
          <b>componentes</b>, sus propiedades visibles y las <b>relaciones</b> entre ellos.</p>
        </div>

        <ul>
          <li><b>Componente de software</b>: pieza con una interfaz definida y su propio ciclo de vida
          (código fuente, biblioteca, ejecutable).</li>
          <li><b>Interfaz del componente</b>: las operaciones que expone al exterior (métodos públicos de
          una clase, o una API REST).</li>
        </ul>

        <h2>Arquitectura Cliente-Servidor</h2>
        <p>Se basa en dos componentes que se comunican con un esquema de
        <b>Petición (Request)</b> y <b>Respuesta (Response)</b>, generalmente por HTTP.</p>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🖥️ Servidor</h3><p>Provee uno o más servicios a través de una interfaz.</p></div>
          <div class="card"><h3 style="margin-top:0">📱 Cliente</h3><p>Consume los servicios que ofrece el servidor.</p></div>
        </div>

        <h3>Clasificación según responsabilidades (dónde vive la lógica)</h3>
        <p>Según las responsabilidades asignadas a cada componente, una arquitectura cliente-servidor se
        clasifica en <b>4 casos</b>:</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Modelo</th><th>Lógica de negocio</th><th>Detalle</th></tr></thead>
          <tbody>
            <tr><td><b>Cliente Pasivo · Servidor Activo</b><br><span class="pill green">"Cliente liviano"</span></td><td>Mayor en el <b>servidor</b></td><td>El cliente solo se limita a <b>presentar los datos</b>.</td></tr>
            <tr><td><b>Cliente Activo · Servidor Activo</b><br><span class="pill amber">"Cliente pesado"</span></td><td><b>Distribuida</b> en ambos</td><td>El cliente posee la lógica de presentación de los datos.</td></tr>
            <tr><td><b>Cliente Activo · Servidor Pasivo</b></td><td>Mayor en el <b>cliente</b></td><td>El servidor limita su funcionalidad a la <b>persistencia</b>.</td></tr>
            <tr><td><b>Cliente Pasivo · Servidor Pasivo</b></td><td>Baja en <b>ambos</b></td><td>Son "componentes intermedios" de algo más grande.</td></tr>
          </tbody>
        </table></div>

        <div class="callout info"><p><b>Ventajas y desventajas del modelo "Cliente liviano" (Cliente Pasivo · Servidor Activo):</b></p>
        <ul>
          <li>✅ <b>Mantenibilidad</b>: los cambios de funcionalidad están centralizados.</li>
          <li>✅ <b>Seguridad</b>: el control de acceso a los recursos está centralizado.</li>
          <li>⚠️ <b>Eficiencia</b>: con un único servidor, puede ser un <b>cuello de botella</b>.</li>
          <li>⚠️ <b>Disponibilidad</b>: con un único servidor, es un <b>único punto de falla</b>.</li>
        </ul></div>

        <div class="callout tip"><p><b>🔗 Conexión clave (entra al parcial):</b> esta clasificación se traslada
        al frontend. Una web <b>SSR</b> (Server Side Rendering) es un <b>"cliente liviano"</b>; una web
        <b>CSR</b> (Client Side Rendering) es un <b>"cliente pesado"</b> → más carga de procesamiento en el lado
        del cliente. Lo ves en <a class="inline" data-go="patrones" style="cursor:pointer">Patrones y renderizado</a>.</p></div>

        <div class="callout warn"><p><b>Ojo, pregunta de parcial:</b> aunque el frontend (cliente pesado) valide,
        <b>el backend SIEMPRE debe revalidar</b>. Nunca confíes en datos que vienen del cliente.</p></div>

        <p>Repartí vos la lógica entre cliente y servidor y mirá en qué caso caés (y su equivalente en render):</p>
        <div id="simMount"></div>

        <h2>Modelo de Capas</h2>
        <p>Técnica de diseño que divide el sistema en capas, cada una con una responsabilidad clara
        (<b>alta cohesión</b>). Las capas superiores usan servicios de las inferiores, <b>nunca al revés</b>.</p>
        <ol class="steps">
          <li><span class="step-title">Presentación</span> La interfaz de usuario (UI).</li>
          <li><span class="step-title">Dominio / Negocio</span> La lógica y reglas de negocio.</li>
          <li><span class="step-title">Datos / Persistencia</span> Acceso y almacenamiento de los datos.</li>
        </ol>
        <div class="callout key"><div class="callout-title">📌 Del modelo conceptual a la implementación</div>
        <p>Ese modelo de 3 capas es la idea <b>conceptual</b>. En la práctica, la cátedra organiza el
        <b>backend</b> en <b>4 capas</b>: <b>Controladores → Services → Dominio → Repositorios</b>.
        Cada una con su responsabilidad y dependiendo solo de la de abajo. Lo desarrollamos en detalle (con su
        juego) en la unidad <a class="inline" data-go="backend-capas" style="cursor:pointer">Backend en capas</a>.</p></div>

        <h2>Backend y Frontend</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">⚙️ Backend (servidor)</h3>
          <p>Lógica de negocio, procesamiento de datos y comunicación con la BD. Suele exponer su funcionalidad mediante una <b>API</b>.</p></div>
          <div class="card"><h3 style="margin-top:0">🖌️ Frontend (cliente)</h3>
          <p>La capa de presentación con la que el usuario interactúa. Corre en el navegador. Su foco es la <b>experiencia de usuario (UX)</b>.</p></div>
        </div>

        <h2>Biblioteca vs. Framework</h2>
        <div class="table-wrap"><table class="data">
          <thead><tr><th></th><th>Biblioteca (Library)</th><th>Framework</th></tr></thead>
          <tbody>
            <tr><td><b>Flujo de control</b></td><td><i>Yo</i> llamo a la biblioteca (control directo).</td><td>El framework <i>me</i> llama a mí (<b>inversión de control</b>).</td></tr>
            <tr><td><b>Diseño</b></td><td>Funcionalidad que integro a mi diseño.</td><td>Define una estructura que debo seguir; condiciona mi diseño.</td></tr>
            <tr><td><b>Ejemplo</b></td><td>Lodash, Axios</td><td>Express, Angular</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><p>Frase para recordar: <b>"You call a library, a framework calls you."</b></p></div>

      `;

      APP.clientServerSlider(el.querySelector("#simMount"));
      el.querySelectorAll("[data-go]").forEach((c) => c.addEventListener("click", () => APP.go(c.dataset.go)));
    },
  });
})();
