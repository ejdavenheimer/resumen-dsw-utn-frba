(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "testing",
    title: "Testing",
    tag: "🧪",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Testing Back & Front</div>
          <h1>Testing</h1>
          <p class="lead">Ejecutar el sistema bajo condiciones específicas para validar que cumple los requisitos.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 Idea clave</div>
          <p>Testing = ejecutar el sistema para observar resultados y evaluar su adecuación a los requisitos.
          <b>Una prueba es "exitosa" cuando encuentra fallas</b> (su objetivo no es confirmar que todo anda, sino descubrir errores).</p>
        </div>

        <h2>Pirámide de testing</h2>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Tipo</th><th>Qué prueba</th><th>Velocidad / cantidad</th></tr></thead>
          <tbody>
            <tr><td><b>Unitario</b></td><td>Una unidad aislada (función / método).</td><td>Rápidos · muchos</td></tr>
            <tr><td><b>Integración</b></td><td>Varios componentes juntos (Controller + Service + BD).</td><td>Medios</td></tr>
            <tr><td><b>End-to-End (E2E)</b></td><td>El flujo completo desde el navegador como un usuario real.</td><td>Lentos · pocos</td></tr>
          </tbody>
        </table></div>

        <h3>Test unitario</h3>
        <p>Prueba una unidad de código bien definida de forma <b>aislada</b>. Objetivo (¡pregunta de parcial!):
        <b>comprobar que una función aislada se comporta como se espera</b>.</p>
        <div class="callout info"><p><b>Triple A (AAA)</b> — estructura de un test:</p>
        <ol class="steps">
          <li><span class="step-title">Arrange</span> preparar datos y condiciones iniciales.</li>
          <li><span class="step-title">Act</span> ejecutar la función bajo prueba.</li>
          <li><span class="step-title">Assert</span> verificar que el resultado es el esperado.</li>
        </ol></div>

        <h3>Integración y E2E</h3>
        <ul>
          <li><b>Integración</b>: verifica que varios componentes funcionen bien <i>juntos</i>. Más lentas que las unitarias.</li>
          <li><b>E2E</b>: simula al usuario en la UI (frontend) y valida que todo el sistema (backend + BD) responda.
          Son costosas y lentas → se hacen <b>pocas y al final</b>.</li>
        </ul>
        <div class="callout warn"><p><b>V/F de parcial:</b> "Implementar pruebas automatizadas de integración o E2E
        hace innecesarias las pruebas manuales." → <b>FALSO</b>. Las pruebas manuales (exploratorias, de UX)
        siguen aportando valor.</p></div>

        <h2>Jest</h2>
        <p>Framework de testing para JavaScript. Provee <code>test()</code>, <code>expect()</code> y
        <i>matchers</i> como <code>toBe()</code>, <code>toEqual()</code>, <code>toThrow()</code>.</p>
        <pre><code>test("suma dos números", () => {
  expect(suma(2, 3)).toBe(5);   // Assert
});</code></pre>
        <p>Acá tenés un mini-runner: metele un bug a la función y corré los tests para ver cómo
        <b>encuentran la falla</b> (su verdadero trabajo).</p>
        <div id="simMount"></div>

        <h2>Mocking</h2>
        <p>Crear objetos/funciones <b>falsos (mocks)</b> que simulan dependencias reales, para <b>aislar</b> la
        unidad bajo prueba.</p>
        <div class="callout tip"><p><b>Ventajas del mocking:</b> aísla la prueba, mejora el rendimiento (evita
        llamadas lentas), reduce costos (evita APIs pagas) y protege datos reales (no toca la BD real).</p></div>
        <p>En Jest: <code>jest.fn()</code> crea funciones mock; <code>.mockReturnValue()</code> define qué
        devuelven; <code>.toHaveBeenCalledWith()</code> verifica con qué parámetros fueron llamadas.</p>

        <h2>TDD — Test Driven Development</h2>
        <p>Primero el test, después el código. Ciclo <b>🔴 Red → 🟢 Green → 🔧 Refactor</b>:</p>
        <ol class="steps">
          <li><span class="step-title">Red</span> Escribís una prueba y falla (todavía no hay código).</li>
          <li><span class="step-title">Green</span> Codeás lo <b>mínimo</b> para que pase.</li>
          <li><span class="step-title">Refactor</span> Mejorás el código sin romper la prueba.</li>
        </ol>
        <p>No conviene en proyectos chicos, prototipos o cuando hay cambios muy rápidos.</p>

        <h2>Otros conceptos</h2>
        <ul>
          <li><b>BDD</b> (Behavior Driven Development) y patrón <b>Given-When-Then</b>:
          <b>Given</b> (estado inicial) · <b>When</b> (acción realizada) · <b>Then</b> (verificación).
          Es el primo "en lenguaje natural" del Triple A.</li>
          <li><b>Accesibilidad</b> y <b>UX</b>: también se testean (parte del frontend).</li>
        </ul>

      `;

      APP.testRunner(el.querySelector("#simMount"));
    },
  });
})();
