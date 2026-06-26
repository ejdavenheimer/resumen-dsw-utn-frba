(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "async",
    title: "Asincronismo",
    tag: "⏳",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Desarrollo Backend · Parte III</div>
          <h1>Procesamiento asincrónico</h1>
          <p class="lead">Cómo maneja JavaScript las tareas que tardan sin congelar todo lo demás.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 El problema</div>
          <p>JavaScript es <b>single-thread</b>: una sola línea de ejecución. Si una operación lenta (leer la BD,
          llamar a una API) bloqueara ese hilo, la app entera se congelaría. La solución es el <b>event loop</b>:
          lo lento se delega y se retoma cuando termina. Lo vas a entender mejor jugando que leyéndolo 👇</p>
        </div>

        <div id="elMount"></div>

        <div class="callout info"><p>Lo que acabás de ver tiene nombre: las <b>microtareas</b> (Promises) tienen
        <b>prioridad</b> sobre las <b>macrotareas</b> (setTimeout). Por eso una Promise imprime antes que un
        <code>setTimeout(…, 0)</code>. Ahora sí, los conceptos formales:</p></div>

        <h2>Callbacks → Promises → async/await</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">📞 Callbacks</h3>
          <p>Funciones que se ejecutan cuando algo termina. Anidar muchos lleva al <b>"callback hell"</b>
          (pirámide ilegible).</p></div>
          <div class="card"><h3 style="margin-top:0">🤝 Promises</h3>
          <p>Objeto que representa un valor que estará <b>ahora, en el futuro o nunca</b>. Estados:
          <i>pending</i> → <i>fulfilled</i> / <i>rejected</i>. Se encadena con <code>.then()</code> y
          <code>.catch()</code>.</p></div>
        </div>
        <div class="callout warn"><p><b>V/F de parcial:</b> "Una Promise permite manejar operaciones asincrónicas,
        como llamadas a una API, evitando callbacks anidados." → <b>VERDADERO</b>.</p></div>

        <h3>async / await</h3>
        <p>Azúcar sintáctico sobre las promises: hace que el código async se lea como sincrónico.</p>
        <ul>
          <li><b>async</b> antes de una función → esa función devuelve una Promise.</li>
          <li><b>await</b> dentro de una async → "pausa" hasta que la promise se resuelva.</li>
        </ul>
        <pre><code>async function cargarLibros() {
  try {
    const res = await fetch("/api/libros");
    const libros = await res.json();
    mostrar(libros);
  } catch (err) {        // catch corre SOLO si algo falló
    manejarError(err);
  }
}</code></pre>

        <h2>Asincronismo fuera del código</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">⏰ Cron job</h3>
          <p>Tarea programada que corre sola cada cierto tiempo (ej. limpiar datos a medianoche). Vive fuera del
          flujo de las peticiones.</p></div>
          <div class="card"><h3 style="margin-top:0">🔁 Polling</h3>
          <p>Si el backend procesa algo más tarde, devuelve un <b>ID de operación</b>; el frontend consulta
          periódicamente un endpoint de estado hasta que termina.</p></div>
        </div>
      `;

      APP.eventLoopSim(el.querySelector("#elMount"));
    },
  });
})();
