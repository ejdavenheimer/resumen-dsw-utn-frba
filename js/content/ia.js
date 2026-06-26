(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "ia",
    title: "IA en el desarrollo",
    tag: "🤖",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">IA en desarrollo · Cierre</div>
          <h1>Herramientas de IA en el desarrollo</h1>
          <p class="lead">La IA generativa como asistente del desarrollador: potencia y riesgos.</p>
        </div>

        <div class="callout key"><div class="callout-title">📌 IA Generativa</div>
        <p>Rama de la IA capaz de <b>crear contenido nuevo</b> (texto, imágenes, código) a partir de los datos
        con los que fue entrenada.</p></div>

        <h2>Clasificaciones de IA</h2>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Criterio</th><th>Tipos</th></tr></thead>
          <tbody>
            <tr><td><b>Autonomía</b></td><td><b>Débil</b>: especializada en tareas concretas (Siri). · <b>Fuerte</b>: imita al humano (no existe).</td></tr>
            <tr><td><b>Técnica</b></td><td>Simbólica (reglas) · Machine Learning (patrones) · Deep Learning (redes neuronales) · Algoritmos evolutivos.</td></tr>
            <tr><td><b>Tipo de tarea</b></td><td><b>Discriminativa</b>: clasifica/predice/decide (diagnóstico). · <b>Generativa</b>: crea contenido (ChatGPT).</td></tr>
          </tbody>
        </table></div>
        <div class="callout info"><p><b>Modelo:</b> representación matemática del conocimiento aprendido. Se
        entrena con ejemplos y tiene <b>parámetros</b> (números ajustados en el entrenamiento) y una
        <b>arquitectura</b> (cómo procesa la información).</p></div>

        <h2>Control de la generación</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">🌡️ Temperatura</h3>
          <p>Controla la <b>aleatoriedad</b> de las respuestas. <b>Baja</b> = más predecible/conservadora;
          <b>alta</b> = más creativa/variada.</p></div>
          <div class="card"><h3 style="margin-top:0">🎲 Semilla (seed)</h3>
          <p>Valor numérico que permite obtener <b>resultados reproducibles</b> (misma semilla → misma salida).</p></div>
        </div>

        <p>Movés la temperatura, activás la seed y generás: vas a <i>ver</i> la diferencia entre predecible y creativo.</p>
        <div id="simMount"></div>

        <h2>Prompt</h2>
        <p>Es la instrucción o pregunta que se le da al modelo. La <b>calidad del prompt</b> (claridad, contexto,
        ejemplos) determina la calidad de la respuesta.</p>

        <h2>Aplicación y riesgos</h2>
        <div class="grid-2">
          <div class="card"><h3 style="margin-top:0">✅ Ventajas</h3>
          <p>Herramientas como GitHub Copilot aceleran el código repetitivo y el prototipado.</p></div>
          <div class="card"><h3 style="margin-top:0">⚠️ Riesgos</h3>
          <p>Puede generar código <b>incorrecto o inseguro</b>, y dificultar el aprendizaje si se depende demasiado.</p></div>
        </div>
        <div class="callout tip"><p><b>Recomendación:</b> usar la IA como un <b>asistente de apoyo</b> y
        <b>siempre revisar y comprender</b> el código generado.</p></div>

      `;

      APP.tempSim(el.querySelector("#simMount"));
    },
  });
})();
