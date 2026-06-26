(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "despliegue",
    title: "Despliegue",
    tag: "🚀",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Despliegue & Infraestructura</div>
          <h1>Despliegue e Infraestructura</h1>
          <p class="lead">Poner la aplicación en funcionamiento en una infraestructura real.</p>
        </div>

        <div class="callout key"><div class="callout-title">📌 Despliegue</div>
        <p>Proceso de poner en funcionamiento una aplicación en una infraestructura específica.
        ¿Qué necesito? <b>Software</b>, <b>Nodos</b> (backing services, ej. la BD) y <b>Red</b>.</p></div>

        <h2>Cloud Computing</h2>
        <p>Modelo de acceso bajo demanda a recursos informáticos compartidos (servidores, almacenamiento) a
        través de la red.</p>
        <h3>Modelos de despliegue</h3>
        <ul>
          <li><b>Bare metal</b>: hardware propio, bajo mi mantenimiento.</li>
          <li><b>Nube privada</b>: virtualizo mi propia infraestructura.</li>
          <li><b>Nube pública</b>: contrato infraestructura de un tercero (AWS, GCP, Azure).</li>
          <li><b>Nube híbrida</b>: combinación de privada y pública.</li>
        </ul>

        <h3>Tipos de servicio (cuánto gestiona el proveedor)</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Modelo</th><th>Qué ofrece</th><th>Ejemplo</th></tr></thead>
          <tbody>
            <tr><td><b>IaaS</b></td><td>Infraestructura básica (VMs, almacenamiento, redes); control total del cliente.</td><td>AWS EC2</td></tr>
            <tr><td><b>PaaS</b></td><td>Plataforma para desarrollar y ejecutar apps sin gestionar la infraestructura.</td><td>Vercel, Heroku</td></tr>
            <tr><td><b>SaaS</b></td><td>Aplicaciones listas para usar por internet.</td><td>Gmail, Office 365</td></tr>
          </tbody>
        </table></div>

        <h2>Ambientes (entornos)</h2>
        <p>Distintas infraestructuras para las fases del ciclo de vida:</p>
        <ol class="steps">
          <li><span class="step-title">Desarrollo (dev)</span> donde se programa.</li>
          <li><span class="step-title">Staging</span> ambiente de pruebas, parecido a producción.</li>
          <li><span class="step-title">Producción (prod)</span> el que usan los usuarios reales.</li>
        </ol>

        <h2>Virtualización y contenedores</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🖥️ Máquinas Virtuales (VMs)</h3>
          <p>Virtualizan un <b>hardware completo</b>, incluyendo su propio sistema operativo. Más pesadas.</p></div>
          <div class="card"><h3 style="margin-top:0">📦 Contenedores (Docker)</h3>
          <p>Virtualizan el <b>sistema operativo</b>: múltiples apps aisladas comparten el mismo kernel.
          Mucho más livianos y rápidos que las VMs.</p></div>
        </div>
        <div class="callout info"><p><b>Docker:</b> empaqueta una app y sus dependencias en una <b>imagen</b>,
        que luego se ejecuta como un <b>contenedor</b>. Facilita el despliegue ("anda en mi máquina" deja de ser
        problema). <b>V/F de parcial:</b> "Docker permite contener y ejecutar aplicaciones en entornos aislados,
        facilitando el despliegue" → <b>VERDADERO</b>.</p></div>

        <h2>Integración y Entrega Continua (CI/CD)</h2>
        <ul>
          <li><b>CI (Continuous Integration)</b>: automatiza pasos como correr <b>tests</b> y <b>builds</b> antes
          de integrar/desplegar. <b>V/F de parcial:</b> "CI permite automatizar pasos como tests y builds antes
          de un deploy" → <b>VERDADERO</b>.</li>
          <li><b>CD (Continuous Delivery/Deployment)</b>: automatiza la entrega/despliegue a los ambientes.</li>
        </ul>
        <p>Mirá el pipeline en acción — y qué pasa cuando un test falla:</p>
        <div id="simMount"></div>
      `;

      APP.ciPipeline(el.querySelector("#simMount"));
    },
  });
})();
