/* ============================================================
   PREGUNTAS — ejemplo de uso del widget APP.quiz.
   Editá el array QUESTIONS. Tipos: vf, mc, multi, open, match.
   El campo `topic` (opcional) habilita el filtro por tema.
   ============================================================ */
(function () {
  "use strict";
  const APP = window.APP;

  // Helper para Verdadero/Falso: vf("V") o vf("F")
  function vf(correct) {
    return [{ t: "Verdadero", ok: correct === "V" }, { t: "Falso", ok: correct === "F" }];
  }

  const QUESTIONS = [
    { n: 1, topic: "Tema A", type: "vf",
      q: "Ejemplo de Verdadero/Falso: esta afirmación es verdadera.",
      options: vf("V"),
      explain: "El campo explain (opcional) se muestra al responder." },

    { n: 2, topic: "Tema A", type: "mc",
      q: "Ejemplo de opción única: ¿cuál es la correcta?",
      options: [
        { t: "Opción incorrecta", ok: false },
        { t: "Opción correcta", ok: true },
        { t: "Otra incorrecta", ok: false },
      ] },

    { n: 3, topic: "Tema B", type: "multi",
      q: "Ejemplo de selección múltiple: marcá todas las correctas y tocá Comprobar.",
      options: [
        { t: "Correcta 1", ok: true },
        { t: "Incorrecta", ok: false },
        { t: "Correcta 2", ok: true },
      ] },

    { n: 4, topic: "Tema B", type: "open",
      q: "Ejemplo de pregunta a desarrollar: ¿qué es X?",
      answer: "Acá va la respuesta modelo que se revela con el botón." },

    { n: 5, topic: "Tema B", type: "match",
      q: "Ejemplo de unir conceptos.",
      pairs: [
        { l: "Concepto 1", r: "Su definición." },
        { l: "Concepto 2", r: "Su definición." },
      ] },
  ];

  APP.register({
    id: "preguntas",
    title: "Preguntas",
    tag: "📝",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Práctica</div>
          <h1>Preguntas</h1>
          <p class="lead">Cuestionario interactivo con corrección al instante. Filtrable por tema.</p>
        </div>
        <div id="quizMount"></div>
      `;
      APP.quiz(el.querySelector("#quizMount"), QUESTIONS);
    },
  });
})();
