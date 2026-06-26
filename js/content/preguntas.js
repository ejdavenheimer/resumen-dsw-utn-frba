/* ============================================================
   Banco de preguntas de Desarrollo de Software (UTN.BA).
   Filtrable por tema. Tipos: vf, mc, multi, open, match.
   ============================================================ */
(function () {
  "use strict";
  const APP = window.APP;

  function vf(correct) {
    return [{ t: "Verdadero", ok: correct === "V" }, { t: "Falso", ok: correct === "F" }];
  }

  const QUESTIONS = [
    /* ---------- Arquitectura ---------- */
    { n: 1, topic: "Arquitectura", type: "mc",
      q: "¿Qué describe la arquitectura de software?",
      options: [
        { t: "Solo el código fuente de la aplicación", ok: false },
        { t: "La estructura del sistema: componentes, sus propiedades y relaciones", ok: true },
        { t: "El diseño gráfico de la interfaz", ok: false },
      ] },
    { n: 2, topic: "Arquitectura", type: "mc",
      q: "En el modelo de capas, ¿qué relación está permitida?",
      options: [
        { t: "Las capas inferiores usan servicios de las superiores", ok: false },
        { t: "Las capas superiores usan servicios de las inferiores", ok: true },
        { t: "Cualquier capa usa cualquier otra libremente", ok: false },
      ],
      explain: "Las superiores dependen de las inferiores, nunca al revés." },
    { n: 3, topic: "Arquitectura", type: "match",
      q: "Relacioná cada capa con su responsabilidad.",
      pairs: [
        { l: "Presentación", r: "La interfaz de usuario (UI)." },
        { l: "Dominio", r: "La lógica y reglas de negocio." },
        { l: "Datos", r: "Acceso y almacenamiento de datos." },
      ] },
    { n: 4, topic: "Arquitectura", type: "vf",
      q: "«En un framework, el desarrollador llama a la herramienta cuando la necesita (control directo).»",
      options: vf("F"),
      explain: "Eso describe una biblioteca. El framework te llama a vos (inversión de control)." },

    /* ---------- HTTP y REST ---------- */
    { n: 5, topic: "HTTP y REST", type: "multi",
      q: "¿Cuáles de estos verbos HTTP son idempotentes?",
      options: [
        { t: "GET", ok: true },
        { t: "POST", ok: false },
        { t: "PUT", ok: true },
        { t: "DELETE", ok: true },
      ],
      explain: "GET, PUT y DELETE son idempotentes; POST no." },
    { n: 6, topic: "HTTP y REST", type: "mc",
      q: "Para crear un recurso, ¿qué combinación es correcta en REST?",
      options: [
        { t: "GET /crearLibro → 200", ok: false },
        { t: "POST /libros → 201", ok: true },
        { t: "PUT /libros/:id → 204", ok: false },
      ],
      explain: "Crear = POST sobre el recurso en plural, éxito 201 Created." },
    { n: 7, topic: "HTTP y REST", type: "match",
      q: "Relacioná familia de status code con su significado.",
      pairs: [
        { l: "2xx", r: "Éxito (200, 201, 204)." },
        { l: "4xx", r: "Error del cliente (400, 401, 404)." },
        { l: "5xx", r: "Error del servidor (500, 503)." },
      ] },
    { n: 8, topic: "HTTP y REST", type: "vf",
      q: "«HTTP es un protocolo con estado (stateful): el servidor recuerda las peticiones anteriores.»",
      options: vf("F"),
      explain: "HTTP es stateless: cada petición es independiente." },
    { n: 9, topic: "HTTP y REST", type: "mc",
      q: "En REST, ¿cómo deberían nombrarse las rutas?",
      options: [
        { t: "Con verbos: /getUsuarios, /crearUsuario", ok: false },
        { t: "Con sustantivos en plural: /usuarios", ok: true },
      ] },

    /* ---------- Backend en capas ---------- */
    { n: 10, topic: "Backend en capas", type: "mc",
      q: "¿Cuál es la 'regla de oro' de la capa de controladores?",
      options: [
        { t: "Debe contener toda la lógica de negocio", ok: false },
        { t: "Nunca debe contener lógica de negocio", ok: true },
        { t: "Debe ejecutar las queries a la BD", ok: false },
      ] },
    { n: 11, topic: "Backend en capas", type: "mc",
      q: "¿Qué capa encapsula el acceso a la base de datos?",
      options: [
        { t: "Servicios", ok: false },
        { t: "Repositorios", ok: true },
        { t: "Controladores", ok: false },
      ] },
    { n: 12, topic: "Backend en capas", type: "vf",
      q: "«Un middleware global de errores permite centralizar el manejo de excepciones y convertirlas en respuestas HTTP.»",
      options: vf("V") },
    { n: 13, topic: "Backend en capas", type: "open",
      q: "¿Qué es el 'Anemic Domain Model' y por qué se busca evitarlo?",
      answer: "Un modelo de dominio 'anémico' es aquel donde las entidades solo tienen datos y la lógica vive afuera (en servicios). Se evita centralizando la lógica de negocio en las propias entidades del dominio." },

    /* ---------- Asincronismo ---------- */
    { n: 14, topic: "Asincronismo", type: "mc",
      q: "¿Qué hace 'await' dentro de una función async?",
      options: [
        { t: "Convierte la función en sincrónica para siempre", ok: false },
        { t: "Pausa la ejecución hasta que la promise se resuelva", ok: true },
        { t: "Crea un nuevo hilo de ejecución", ok: false },
      ] },
    { n: 15, topic: "Asincronismo", type: "vf",
      q: "«Una función marcada con async siempre devuelve una Promise.»",
      options: vf("V") },
    { n: 16, topic: "Asincronismo", type: "mc",
      q: "El frontend recibe un ID de operación y consulta periódicamente un endpoint de estado. ¿Cómo se llama?",
      options: [
        { t: "Polling", ok: true },
        { t: "Cron job", ok: false },
        { t: "Callback hell", ok: false },
      ] },
    { n: 17, topic: "Asincronismo", type: "open",
      q: "¿Para qué sirve el bloque try/catch?",
      answer: "try contiene el código que podría fallar; catch se ejecuta solo si ocurre un error y recibe el objeto del error, evitando que se rompa toda la aplicación." },

    /* ---------- Diseño y SOLID ---------- */
    { n: 18, topic: "Diseño y SOLID", type: "match",
      q: "Relacioná cada letra de SOLID con su principio.",
      pairs: [
        { l: "S", r: "Responsabilidad Única." },
        { l: "O", r: "Abierto/Cerrado." },
        { l: "L", r: "Sustitución de Liskov." },
        { l: "I", r: "Segregación de Interfaces." },
        { l: "D", r: "Inversión de Dependencias." },
      ] },
    { n: 19, topic: "Diseño y SOLID", type: "multi",
      q: "¿Cuáles son cualidades de diseño deseables?",
      options: [
        { t: "Bajo acoplamiento", ok: true },
        { t: "Alta cohesión", ok: true },
        { t: "Alto acoplamiento", ok: false },
        { t: "Mantenibilidad", ok: true },
      ] },
    { n: 20, topic: "Diseño y SOLID", type: "mc",
      q: "Una clase que concentra demasiadas responsabilidades es un code smell llamado…",
      options: [
        { t: "Código duplicado", ok: false },
        { t: "God Class", ok: true },
        { t: "Herencia rechazada", ok: false },
      ] },
    { n: 21, topic: "Diseño y SOLID", type: "match",
      q: "Relacioná el acrónimo con su idea.",
      pairs: [
        { l: "KISS", r: "Mantenelo simple, evitá complejidad innecesaria." },
        { l: "YAGNI", r: "No agregues lo que no necesitás ahora." },
        { l: "DRY", r: "No te repitas (evitá código duplicado)." },
      ] },

    /* ---------- Testing ---------- */
    { n: 22, topic: "Testing", type: "match",
      q: "Relacioná las etapas del patrón Triple A.",
      pairs: [
        { l: "Arrange", r: "Preparar datos y condiciones iniciales." },
        { l: "Act", r: "Ejecutar la función bajo prueba." },
        { l: "Assert", r: "Verificar que el resultado es el esperado." },
      ] },
    { n: 23, topic: "Testing", type: "mc",
      q: "¿Cuál es el objetivo del mocking?",
      options: [
        { t: "Hacer los tests más lentos pero más realistas", ok: false },
        { t: "Aislar la unidad bajo prueba simulando sus dependencias", ok: true },
        { t: "Reemplazar al equipo de QA", ok: false },
      ] },
    { n: 24, topic: "Testing", type: "vf",
      q: "«Los tests E2E son rápidos y por eso conviene hacer muchísimos.»",
      options: vf("F"),
      explain: "Los E2E son lentos y costosos: se hacen pocos y al final." },
    { n: 25, topic: "Testing", type: "multi",
      q: "¿Qué ventajas aporta el mocking?",
      options: [
        { t: "Aísla la prueba", ok: true },
        { t: "Mejora el rendimiento (evita llamadas lentas)", ok: true },
        { t: "Protege datos reales (no toca la BD real)", ok: true },
        { t: "Garantiza que no haya bugs", ok: false },
      ] },

    /* ---------- Persistencia ---------- */
    { n: 26, topic: "Persistencia", type: "mc",
      q: "En MongoDB, una colección es equivalente a…",
      options: [
        { t: "Una fila", ok: false },
        { t: "Una tabla (sin esquema fijo)", ok: true },
        { t: "Una base de datos completa", ok: false },
      ] },
    { n: 27, topic: "Persistencia", type: "mc",
      q: "Para una relación 'uno a muchos grande', ¿qué conviene en MongoDB?",
      options: [
        { t: "Embeber todo en un solo documento", ok: false },
        { t: "Referenciar (guardar el _id) y unir con $lookup", ok: true },
      ] },
    { n: 28, topic: "Persistencia", type: "vf",
      q: "«Mongoose es un ODM que permite definir schemas y trabajar con objetos JS en lugar de queries a mano.»",
      options: vf("V") },
    { n: 29, topic: "Persistencia", type: "open",
      q: "¿Qué dice el teorema CAP?",
      answer: "En un sistema distribuido es imposible garantizar simultáneamente Consistencia, Disponibilidad (Availability) y Tolerancia a particiones; hay que resignar una de las tres." },
    { n: 30, topic: "Persistencia", type: "match",
      q: "Relacioná tipo de NoSQL con un ejemplo.",
      pairs: [
        { l: "Documental", r: "MongoDB." },
        { l: "Clave-Valor", r: "Redis." },
        { l: "Grafos", r: "Neo4j." },
      ] },

    /* ---------- Frontend ---------- */
    { n: 31, topic: "Frontend", type: "mc",
      q: "¿Qué es el DOM?",
      options: [
        { t: "Un lenguaje de estilos", ok: false },
        { t: "Una representación en árbol del HTML manipulable por JS", ok: true },
        { t: "Un framework de JavaScript", ok: false },
      ] },
    { n: 32, topic: "Frontend", type: "vf",
      q: "«La UI es una parte de la UX.»",
      options: vf("V") },
    { n: 33, topic: "Frontend", type: "open",
      q: "Nombrá tres formas de mejorar la accesibilidad de una página HTML.",
      answer: "HTML semántico (nav, header, main, button), atributo alt en imágenes, atributos ARIA y role, labels asociados a inputs, buen contraste y navegación por teclado." },

    /* ---------- React ---------- */
    { n: 34, topic: "React", type: "mc",
      q: "Las props en React son…",
      options: [
        { t: "Datos de solo lectura que el padre pasa al hijo", ok: true },
        { t: "El estado interno que el componente modifica", ok: false },
        { t: "Funciones del ciclo de vida", ok: false },
      ] },
    { n: 35, topic: "React", type: "mc",
      q: "¿Qué hook manejás para guardar el estado local de un componente?",
      options: [
        { t: "useEffect", ok: false },
        { t: "useState", ok: true },
        { t: "useRef", ok: false },
      ] },
    { n: 36, topic: "React", type: "vf",
      q: "«En React el estado es inmutable: en vez de mutarlo, se crea uno nuevo.»",
      options: vf("V") },

    /* ---------- Patrones y render ---------- */
    { n: 37, topic: "Patrones y render", type: "mc",
      q: "Una SPA (Single Page Application)…",
      options: [
        { t: "Recarga la página completa en cada navegación", ok: false },
        { t: "Funciona en una única página y cambia de vista sin recargar", ok: true },
      ] },
    { n: 38, topic: "Patrones y render", type: "match",
      q: "Relacioná el patrón con su característica.",
      pairs: [
        { l: "MVC", r: "Controlador recibe input y elige la vista (Django, Rails)." },
        { l: "MVVM", r: "ViewModel con data binding (Angular, Vue)." },
        { l: "MVP", r: "Vista pasiva; el Presentador tiene la lógica." },
      ] },
    { n: 39, topic: "Patrones y render", type: "mc",
      q: "¿Qué ventaja tiene el SSR?",
      options: [
        { t: "Mejor SEO y carga inicial rápida", ok: true },
        { t: "Nunca necesita servidor", ok: false },
      ] },

    /* ---------- Integración y Seguridad ---------- */
    { n: 40, topic: "Integración y Seguridad", type: "mc",
      q: "La autenticación responde a…",
      options: [
        { t: "¿Quién es el usuario?", ok: true },
        { t: "¿Qué puede hacer el usuario?", ok: false },
      ],
      explain: "Quién es = autenticación; qué puede = autorización." },
    { n: 41, topic: "Integración y Seguridad", type: "multi",
      q: "¿Qué partes tiene un JWT?",
      options: [
        { t: "Header", ok: true },
        { t: "Payload", ok: true },
        { t: "Firma", ok: true },
        { t: "Cookie de sesión del servidor", ok: false },
      ] },
    { n: 42, topic: "Integración y Seguridad", type: "match",
      q: "Relacioná el pilar CIA con su definición.",
      pairs: [
        { l: "Confidencialidad", r: "Solo accede quien está autorizado." },
        { l: "Integridad", r: "Los datos no se alteran sin autorización." },
        { l: "Disponibilidad", r: "Los sistemas están disponibles cuando se necesitan." },
      ] },
    { n: 43, topic: "Integración y Seguridad", type: "mc",
      q: "¿Qué buena práctica conviene con los tokens?",
      options: [
        { t: "Mandarlos en la URL para que queden en el historial", ok: false },
        { t: "Usar expiración corta y validar firma/expiración en cada request", ok: true },
      ] },
    { n: 44, topic: "Integración y Seguridad", type: "open",
      q: "¿Qué es un ataque de inyección SQL y cómo se mitiga?",
      answer: "Es la introducción de código malicioso (SQL) que el sistema ejecuta. Se mitiga validando/sanitizando los inputs y usando consultas parametrizadas." },

    /* ---------- Despliegue ---------- */
    { n: 45, topic: "Despliegue", type: "match",
      q: "Relacioná el modelo de servicio con su ejemplo.",
      pairs: [
        { l: "IaaS", r: "Máquina virtual en AWS EC2." },
        { l: "PaaS", r: "Desplegar en Vercel/Heroku." },
        { l: "SaaS", r: "Usar Gmail u Office 365." },
      ] },
    { n: 46, topic: "Despliegue", type: "vf",
      q: "«Los contenedores (Docker) son más livianos que las máquinas virtuales porque comparten el kernel del SO.»",
      options: vf("V") },
    { n: 47, topic: "Despliegue", type: "mc",
      q: "¿Qué automatiza la Integración Continua (CI)?",
      options: [
        { t: "El diseño gráfico de la app", ok: false },
        { t: "Tests y builds antes de un deploy", ok: true },
      ] },

    /* ---------- IA ---------- */
    { n: 48, topic: "IA", type: "mc",
      q: "Una temperatura baja en un modelo de IA produce respuestas…",
      options: [
        { t: "Más creativas y variadas", ok: false },
        { t: "Más predecibles y conservadoras", ok: true },
      ] },
    { n: 49, topic: "IA", type: "vf",
      q: "«La recomendación es usar la IA como asistente y siempre revisar el código generado.»",
      options: vf("V") },
  ];

  APP.register({
    id: "preguntas",
    title: "Preguntas",
    tag: "🎮",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Práctica</div>
          <h1>Banco de preguntas</h1>
          <p class="lead">Cuestionario interactivo con corrección al instante. Filtrá por tema con los chips.</p>
        </div>
        <div id="quizMount"></div>
      `;
      APP.quiz(el.querySelector("#quizMount"), QUESTIONS);
    },
  });
})();
