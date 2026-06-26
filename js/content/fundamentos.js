(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "fundamentos",
    title: "Fundamentos: JS, Node y Git",
    tag: "💻",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Cuestiones de Desarrollo fundamentales</div>
          <h1>Fundamentos: JavaScript, Node y Git</h1>
          <p class="lead">El lenguaje y las herramientas con las que vamos a construir todo lo demás.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 La base</div>
          <p><b>JavaScript</b> es el lenguaje. <b>Node.js</b> es el entorno que lo ejecuta fuera del navegador
          (en el servidor). <b>NPM</b> es el gestor de paquetes/dependencias. <b>Git</b> es el control de versiones.</p>
        </div>

        <h2>JavaScript: lo esencial</h2>
        <h3>Variables</h3>
        <ul>
          <li><span class="var-def">const</span>: valor que no se reasigna (preferida por defecto).</li>
          <li><span class="var-def">let</span>: variable que sí cambia. Tiene <b>scope de bloque</b>.</li>
          <li><span class="var-def">var</span>: antigua, scope de función. <b>Evitar</b>.</li>
        </ul>
        <h3>Tipos</h3>
        <p>Primitivos: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>,
        <code>undefined</code>. Y objetos: <code>{ }</code>, arrays <code>[ ]</code> y funciones.
        Es <b>tipado dinámico</b> (el tipo lo define el valor, no la declaración).</p>
        <div class="callout warn"><p><b>== vs ===</b>: usá siempre <code>===</code> (igualdad estricta, compara
        valor <i>y</i> tipo). <code>==</code> hace conversiones raras (<code>0 == "" </code> es <code>true</code>).</p></div>

        <h3>Funciones</h3>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">Tradicional</h3>
          <pre><code>function suma(a, b) {
  return a + b;
}</code></pre></div>
          <div class="card"><h3 style="margin-top:0">Arrow function</h3>
          <pre><code>const suma = (a, b) => a + b;</code></pre></div>
        </div>

        <h3>Iteración sobre arrays</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Método</th><th>Para qué</th><th>Devuelve</th></tr></thead>
          <tbody>
            <tr><td><code>forEach</code></td><td>Recorrer y ejecutar algo en cada elemento</td><td>nada</td></tr>
            <tr><td><code>map</code></td><td>Transformar cada elemento</td><td>nuevo array</td></tr>
            <tr><td><code>filter</code></td><td>Quedarse con los que cumplen una condición</td><td>nuevo array</td></tr>
            <tr><td><code>find</code></td><td>El primer elemento que cumple</td><td>un elemento</td></tr>
            <tr><td><code>reduce</code></td><td>Acumular en un solo valor (sumar, etc.)</td><td>un valor</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><p><code>map</code> y <code>filter</code> no modifican el array original:
        devuelven uno nuevo. Esto se relaciona con la <b>inmutabilidad</b> que veremos en React.</p></div>

        <p>No te lo creas: <b>probalo</b>. Cargá los ejemplos, predecí qué imprime y ejecutá (sí, los errores también salen).</p>
        <div id="simMount"></div>

        <h2>Node.js y NPM</h2>
        <ul>
          <li><b>Node.js</b>: ejecuta JS en el servidor. Permite hacer backend con JavaScript.</li>
          <li><b>NPM</b> (Node Package Manager): instala y administra dependencias.
          <code>npm init</code> crea el proyecto, <code>npm install paquete</code> agrega una librería.</li>
          <li><b>package.json</b>: el "DNI" del proyecto. Lista dependencias y scripts (<code>npm run dev</code>).</li>
          <li><b>Express</b>: el framework más usado en Node para construir APIs.</li>
        </ul>

        <h2>Git avanzado</h2>
        <p>Control de versiones distribuido: guarda la historia del proyecto y permite trabajar en equipo.</p>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🌿 Branching</h3>
          <p>Cada feature/fix se hace en una <b>rama</b> separada (<code>git branch</code>, <code>git checkout -b</code>),
          sin romper la rama principal (<code>main</code>).</p></div>
          <div class="card"><h3 style="margin-top:0">🔀 Pull Request (PR)</h3>
          <p>Propuesta para integrar una rama a otra. Permite <b>code review</b>, comentarios y correr
          tests antes de hacer <code>merge</code>.</p></div>
        </div>
        <ol class="steps">
          <li><span class="step-title">Crear rama</span> <code>git checkout -b feature/login</code></li>
          <li><span class="step-title">Commitear</span> <code>git add .</code> → <code>git commit -m "..."</code></li>
          <li><span class="step-title">Subir</span> <code>git push origin feature/login</code></li>
          <li><span class="step-title">Abrir PR</span> revisión del equipo → merge a <code>main</code></li>
        </ol>

      `;

      APP.jsConsole(el.querySelector("#simMount"));
      el.querySelectorAll("[data-go]").forEach((c) => c.addEventListener("click", () => APP.go(c.dataset.go)));
    },
  });
})();
