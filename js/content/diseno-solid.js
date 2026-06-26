(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "diseno-solid",
    title: "Diseño y SOLID",
    tag: "✨",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Desarrollo Backend · Parte IV</div>
          <h1>Cualidades de diseño, SOLID y Code Smells</h1>
          <p class="lead">Criterios para escribir software entendible, flexible y mantenible.</p>
        </div>

        <h2>Cualidades de diseño <span class="pill green">FRASCo</span></h2>
        <p>Truco para acordártelas: <b>F</b>lexibilidad · <b>R</b>obustez · <b>A</b>coplamiento ·
        <b>S</b>implicidad · <b>Co</b>hesión.</p>
        <div class="callout key"><div class="callout-title">📌 Las dos estrella</div>
        <p><b>Bajo acoplamiento</b> (poca dependencia entre componentes) + <b>alta cohesión</b>
        (cada componente enfocado en una sola tarea). Es el objetivo de casi todas las decisiones de diseño.</p></div>
        <ul>
          <li><b>Acoplamiento</b>: grado de dependencia entre componentes. Se busca <b>bajo</b>.</li>
          <li><b>Cohesión</b>: qué tan relacionadas están las responsabilidades de un componente. Se busca <b>alta</b>.</li>
          <li><b>Simplicidad</b>: evitar complejidad innecesaria (<b>KISS</b>) y no agregar lo que no se necesita ahora (<b>YAGNI</b>).</li>
          <li><b>Robustez</b>: manejar errores e imprevistos sin generar inconsistencias.</li>
          <li><b>Flexibilidad</b>: adaptarse a cambios. Incluye <b>extensibilidad</b> (agregar funciones) y
          <b>mantenibilidad</b> (modificar las existentes).</li>
        </ul>

        <p>¿Por qué importa tanto el <b>bajo acoplamiento</b>? Tocá un módulo y mirá cuántos se rompen según
        cómo esté diseñado el sistema:</p>
        <div id="simMount"></div>

        <h2>Principios SOLID</h2>
        <div class="table-wrap"><table class="data">
          <thead><tr><th></th><th>Principio</th><th>En una frase</th></tr></thead>
          <tbody>
            <tr><td><b>S</b></td><td>Responsabilidad Única (SRP)</td><td>Una clase, una sola razón para cambiar.</td></tr>
            <tr><td><b>O</b></td><td>Abierto/Cerrado (OCP)</td><td>Abierto a extensión, cerrado a modificación.</td></tr>
            <tr><td><b>L</b></td><td>Sustitución de Liskov (LSP)</td><td>Una subclase debe poder reemplazar a su clase base sin romper nada.</td></tr>
            <tr><td><b>I</b></td><td>Segregación de Interfaces (ISP)</td><td>Mejor muchas interfaces específicas que una general. No forzar a depender de métodos que no se usan.</td></tr>
            <tr><td><b>D</b></td><td>Inversión de Dependencias (DIP)</td><td>Depender de abstracciones, no de implementaciones concretas.</td></tr>
          </tbody>
        </table></div>

        <h2>Code Smells (olores de código)</h2>
        <p>Señales de que puede haber un problema de diseño (no son bugs, pero avisan):</p>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">📋 Código duplicado</h3><p>El mismo código repetido en varios lugares (rompe DRY).</p></div>
          <div class="card"><h3 style="margin-top:0">📏 Métodos/parámetros largos</h3><p>Funciones con demasiados parámetros o que hacen demasiadas cosas.</p></div>
          <div class="card"><h3 style="margin-top:0">😈 God Class</h3><p>Una clase que concentra demasiadas responsabilidades (viola SRP).</p></div>
          <div class="card"><h3 style="margin-top:0">🚫 Herencia rechazada</h3><p>Una subclase que no usa o redefine mal lo que hereda (huele a violar LSP).</p></div>
          <div class="card"><h3 style="margin-top:0">📍 Métodos fuera de lugar</h3><p>Un método que está en la clase equivocada o que solo redirige llamados → genera acoplamiento. Solución: moverlo a donde pertenece.</p></div>
        </div>

      `;

      APP.couplingSim(el.querySelector("#simMount"));
    },
  });
})();
