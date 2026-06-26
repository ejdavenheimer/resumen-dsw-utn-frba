(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "persistencia",
    title: "Persistencia y MongoDB",
    tag: "🗄️",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Desarrollo Backend · Parte V</div>
          <h1>Persistencia de datos y MongoDB</h1>
          <p class="lead">Que el estado del sistema sobreviva al apagar la app, guardándolo en un medio persistente.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 Persistencia</div>
          <p>Capacidad de que los datos <b>no se pierdan</b> al apagar o reiniciar la aplicación, almacenándolos
          en un medio persistente.</p>
        </div>

        <h2>Estrategias de persistencia</h2>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Estrategia</th><th>Descripción</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td><b>En memoria</b></td><td>En variables (RAM). Se pierde al terminar la ejecución.</td><td>Cachés, tests.</td></tr>
            <tr><td><b>En archivos</b></td><td>TXT, JSON, CSV. Simple, pero difícil de escalar y manejar concurrencia.</td><td>Configs, casos chicos.</td></tr>
            <tr><td><b>Base de datos</b></td><td>Almacenamiento estructurado gestionado por un motor (DBMS).</td><td>Aplicaciones reales.</td></tr>
          </tbody>
        </table></div>

        <h2>SQL vs NoSQL</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🧮 Relacionales (SQL)</h3>
          <p>Datos en <b>tablas</b> con <b>esquema rígido</b>. Ideal para relaciones complejas e integridad
          fuerte. Ej: MySQL, PostgreSQL.</p></div>
          <div class="card"><h3 style="margin-top:0">📄 No relacionales (NoSQL)</h3>
          <p>Más flexibles, para grandes volúmenes y estructuras no tabulares. Priorizan <b>escalabilidad y
          velocidad</b>.</p></div>
        </div>
        <p>Tipos de NoSQL: <b>Documentales</b> (MongoDB), <b>Clave-Valor</b> (Redis/DynamoDB), <b>Columnares</b>
        (Cassandra), <b>Grafos</b> (Neo4j) y <b>Orientadas a objetos</b> (persisten el objeto tal cual, con
        herencia y encapsulamiento). MongoDB es <b>escalable horizontalmente</b>.</p>

        <div class="callout info"><p><b>Teorema CAP:</b> en un sistema distribuido es imposible garantizar a la vez
        <b>Consistencia</b>, <b>Disponibilidad</b> (Availability) y <b>Tolerancia a particiones</b>. Hay que resignar
        una. (MongoDB se inclina por CP: consistencia + tolerancia a particiones).</p></div>

        <h2>MongoDB</h2>
        <p>La base de datos documental más popular. Terminología:</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>MongoDB</th><th>Equivalente relacional</th></tr></thead>
          <tbody>
            <tr><td>Base de datos</td><td>conjunto de colecciones</td></tr>
            <tr><td>Colección</td><td>≈ tabla (sin esquema fijo)</td></tr>
            <tr><td>Documento</td><td>≈ fila (estructura flexible tipo JSON)</td></tr>
            <tr><td><code>_id</code></td><td>clave primaria (tipo ObjectId, automática)</td></tr>
          </tbody>
        </table></div>
        <p><b>Operaciones:</b> <code>insertOne/insertMany</code>, <code>find/findOne</code>
        (con operadores <code>$gt</code>, <code>$lt</code>, <code>$eq</code>, <code>$or</code>, <code>$and</code>),
        <code>updateOne/updateMany</code>, <code>deleteOne/deleteMany</code>.
        <b>Agregaciones</b>: pipeline por etapas (<code>$match</code>, <code>$group</code>, <code>$sort</code>).</p>

        <h2>Relaciones: Embebido vs Referenciado</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">📦 Embebido (embedding)</h3>
          <p>Se incluye un documento <b>dentro de otro</b>. Ideal para relaciones <b>"uno a pocos"</b> y cuando
          los datos se consultan <b>siempre juntos</b>.</p></div>
          <div class="card"><h3 style="margin-top:0">🔗 Referenciado (referencing)</h3>
          <p>Se guarda solo el <code>_id</code> del documento relacionado. Útil para <b>"uno a muchos grandes"</b>
          o <b>"muchos a muchos"</b>, y cuando se consultan por separado. Se unen con <code>$lookup</code>.</p></div>
        </div>

        <p>Modelá un autor con sus libros: cambiá entre embebido y referenciado, agregá libros y mirá cómo
        queda guardado y cuánto cuesta leerlo.</p>
        <div id="simMount"></div>

        <h2>Mongoose (ODM)</h2>
        <p><b>ODM (Object Document Mapper)</b> para Node.js: permite trabajar con objetos JS en lugar de escribir
        consultas de MongoDB a mano, y validar datos.</p>
        <ul>
          <li><b>Schema</b>: define la estructura de los documentos (tipos y validaciones).</li>
          <li><b>Model</b>: constructor basado en un schema; crea y lee documentos (maneja las operaciones).</li>
          <li><b>Referencias</b>: campo con <code>type: ObjectId</code> y <code>ref: 'Modelo'</code>; para traer
          los datos referenciados se usa <code>.populate()</code>.</li>
        </ul>

      `;

      APP.mongoModeler(el.querySelector("#simMount"));
    },
  });
})();
