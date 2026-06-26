(function () {
  "use strict";
  const APP = window.APP;

  function vf(correct) {
    return [{ t: "Verdadero", ok: correct === "V" }, { t: "Falso", ok: correct === "F" }];
  }

  // Parcial real Desarrollo de Software — 1C 2025 (puntos 1 a 4).
  const PREGUNTAS = [
    { n: 1, topic: "Punto 1 · Backend", type: "mc",
      q: "¿Qué responsabilidad corresponde típicamente a la capa de servicios (services) en una arquitectura en capas?",
      options: [
        { t: "Ejecutar consultas (queries) directamente sobre la base de datos", ok: false },
        { t: "Mostrar mensajes al usuario final", ok: false },
        { t: "Orquestar la lógica de negocio e implementar los casos de uso", ok: true },
        { t: "Definir rutas HTTP", ok: false },
      ],
      explain: "Las queries son del repositorio, los mensajes de la UI y las rutas del controlador. El service orquesta los casos de uso." },

    { n: 2, topic: "Punto 1 · Backend", type: "vf",
      q: "«Una Promise permite manejar operaciones asincrónicas, como llamadas a una API, evitando el uso de callbacks anidados.»",
      options: vf("V"),
      explain: "Verdadero: las Promises (y async/await) resuelven el 'callback hell'." },

    { n: 3, topic: "Punto 1 · Backend", type: "vf",
      q: "«Dado que en una arquitectura cliente pesado el frontend será responsable de realizar validaciones, no es necesario que repitamos esta lógica en el backend.»",
      options: vf("F"),
      explain: "Falso: el backend SIEMPRE debe revalidar. Nunca se confía en datos que vienen del cliente." },

    { n: 4, topic: "Punto 2 · Frontend", type: "open",
      q: "¿Qué etiquetas o atributos se pueden aplicar para mejorar la accesibilidad del código HTML?",
      answer: "HTML semántico (&lt;nav&gt;, &lt;header&gt;, &lt;main&gt;, &lt;button&gt;), atributo alt en imágenes, atributos ARIA (aria-label, aria-expanded) y role, &lt;label&gt; asociado a inputs, buen contraste y navegación por teclado." },

    { n: 5, topic: "Punto 2 · Frontend", type: "mc",
      q: "¿Cuál de las siguientes características define a un cliente pesado (\"client side render\")?",
      options: [
        { t: "Procesamiento y lógica delegada al servidor", ok: false },
        { t: "Interfaz que se renderiza por completo en cada cambio", ok: false },
        { t: "Mayor carga de procesamiento en el lado del cliente", ok: true },
        { t: "Requiere conexión constante con el backend para funcionar", ok: false },
      ],
      explain: "En CSR el navegador (cliente) renderiza la UI: más carga del lado del cliente." },

    { n: 6, topic: "Punto 2 · Frontend", type: "mc",
      q: "¿Qué hook usarías en React si querés ejecutar una acción cuando un componente se monta o cuando cambia una dependencia?",
      options: [
        { t: "useContext", ok: false },
        { t: "useState", ok: false },
        { t: "useEffect", ok: true },
        { t: "useRef", ok: false },
      ],
      explain: "useEffect ejecuta efectos al montar y cuando cambia algo del array de dependencias." },

    { n: 7, topic: "Punto 3 · Testing", type: "mc",
      q: "¿Cuál es el objetivo principal de un test unitario?",
      options: [
        { t: "Verificar la interacción de distintos componentes del sistema", ok: false },
        { t: "Comprobar que una función aislada se comporta como se espera", ok: true },
        { t: "Probar la aplicación completa desde el navegador", ok: false },
        { t: "Simular una carga pesada sobre el servidor", ok: false },
      ],
      explain: "La interacción entre componentes es integración; el navegador completo es E2E." },

    { n: 8, topic: "Punto 3 · Testing", type: "mc",
      q: "¿Cuál es el propósito de un test end-to-end (E2E)?",
      options: [
        { t: "Simular interacciones reales del usuario desde el frontend hasta la base de datos", ok: true },
        { t: "Validar funciones puras de forma aislada", ok: false },
        { t: "Reemplazar el testing manual de código", ok: false },
        { t: "Validar únicamente la capa de servicios", ok: false },
      ],
      explain: "E2E recorre el flujo completo como un usuario real." },

    { n: 9, topic: "Punto 3 · Testing", type: "vf",
      q: "«En una aplicación Web, implementar pruebas automatizadas de integración o E2E hace innecesario realizar pruebas manuales.»",
      options: vf("F"),
      explain: "Falso: las pruebas manuales (exploratorias, UX) siguen aportando valor." },

    { n: 10, topic: "Punto 4 · Despliegue y Seguridad", type: "mc",
      q: "¿Cuál de las siguientes prácticas mejora la seguridad de una API REST?",
      options: [
        { t: "Usar GET para enviar contraseñas", ok: false },
        { t: "Dejar habilitado el CORS sin restricciones", ok: false },
        { t: "Validar inputs del usuario en el backend", ok: true },
        { t: "Exponer claves en el frontend", ok: false },
      ],
      explain: "Validar/sanitizar inputs en el backend mitiga inyecciones y datos maliciosos." },

    { n: 11, topic: "Punto 4 · Despliegue y Seguridad", type: "vf",
      q: "«Docker permite contener y ejecutar aplicaciones en entornos aislados, facilitando el despliegue.»",
      options: vf("V"),
      explain: "Verdadero: empaqueta app + dependencias en una imagen que corre como contenedor aislado." },

    { n: 12, topic: "Punto 4 · Despliegue y Seguridad", type: "vf",
      q: "«El uso de herramientas de integración continua (CI) permite automatizar pasos como tests y builds antes de hacer un deploy.»",
      options: vf("V"),
      explain: "Verdadero: ese es justamente el propósito de la CI." },
  ];

  APP.register({
    id: "parcial",
    title: "Simulacro de Parcial",
    tag: "📝",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Parcial · Desarrollo de Software</div>
          <h1>Simulacro de Parcial (1C 2025)</h1>
          <p class="lead">El parcial real, resuelto e interactivo. Respondé y corregí al instante.</p>
        </div>

        <div class="callout warn">
          <div class="callout-title">📋 Condiciones de aprobación</div>
          <ul>
            <li>Aprobar: sumar <b>mínimo 60 puntos</b> y <b>no menos del 50% en cada sección</b>.</li>
            <li>Aprobación directa (promoción): <b>mínimo 80 puntos</b> y no menos del 50% en cada sección.</li>
            <li>En recuperatorio (por desaprobación o promoción) se rehace el parcial completo.</li>
            <li>En los multiple choice puede haber <b>una o más</b> opciones correctas.</li>
            <li><b>Todas las respuestas deben llevar una breve justificación.</b></li>
          </ul>
        </div>

        <div class="callout info"><p><b>Puntaje por sección:</b> Punto 1 Backend (25) · Punto 2 Frontend (25) ·
        Punto 3 Testing (12,5) · Punto 4 Despliegue y Seguridad (12,5) · Punto 5 Integración (25).</p></div>

        <h2>Puntos 1 a 4 — Multiple choice / Verdadero-Falso</h2>
        <p>Usá el filtro por punto si querés practicar una sección a la vez.</p>
        <div id="quizMount"></div>

        <h2>Punto 5 — Integración (25 pts)</h2>
        <p>Construyendo una API REST, para cada requerimiento indicá: recurso manipulado, ruta + método HTTP,
        un código de éxito y uno posible de error. Elegí y comprobá con la solución modelo.</p>
        <div id="restMount"></div>

        <div class="callout tip"><p><b>¿No te cierra alguna respuesta? Demostralo.</b> Acá tenés la misma API
        corriendo en vivo: probá el verbo y la ruta que elegiste y mirá el status real que devuelve.</p></div>
        <div id="rpMount"></div>

        <div class="callout tip"><p>¿Querés más práctica de este estilo? Pasá por el
        <a class="inline" data-go="preguntas" style="cursor:pointer">Banco de preguntas</a>.</p></div>
      `;

      APP.quiz(el.querySelector("#quizMount"), PREGUNTAS);

      APP.restGame(el.querySelector("#restMount"), [
        { req: "Como administrador, deseo dar de alta nuevos libros.", resource: "libros", verb: "POST", route: "/libros", ok: "201", err: "400 (datos inválidos) / 401 (no autenticado)" },
        { req: "Como cliente, deseo obtener la lista de locales (puntos de venta).", resource: "locales", verb: "GET", route: "/locales", ok: "200", err: "500 (error del servidor)" },
        { req: "Como cliente, deseo consultar los libros de un determinado género.", resource: "libros", verb: "GET", route: "/libros?genero=terror", ok: "200", err: "404 / 400 (género inválido)" },
        { req: "Como cliente, deseo realizar una compra en la plataforma.", resource: "compras (orden)", verb: "POST", route: "/compras", ok: "201", err: "409 (sin stock) / 400 (carrito vacío)" },
        { req: "Como cliente, deseo eliminar un ítem del carrito de compras.", resource: "ítem del carrito", verb: "DELETE", route: "/carrito/items/:id", ok: "204", err: "404 (ítem no encontrado)" },
      ]);

      APP.restPlayground(el.querySelector("#rpMount"));

      el.querySelectorAll("[data-go]").forEach((c) => c.addEventListener("click", () => APP.go(c.dataset.go)));
    },
  });
})();
