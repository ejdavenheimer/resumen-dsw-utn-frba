/* =====================================================================
   Apuntes — núcleo
   Registro global de secciones + helpers de DOM.
   Sin módulos ES ni fetch: funciona abriendo index.html con doble clic.
   ===================================================================== */
(function () {
  "use strict";

  const APP = (window.APP = window.APP || {});
  APP.sections = APP.sections || [];   // [{id, title, tag, render(el)}]

  /* Registrar una sección de contenido */
  APP.register = function (section) {
    APP.sections.push(section);
  };

  /* h('div.clase#id', {attr:val}, [hijos | string]) */
  function h(tag, attrs, children) {
    let id = null;
    const classes = [];
    const parts = tag.match(/[.#][\w-]+/g) || [];
    const name = (tag.match(/^[a-zA-Z0-9]+/) || ["div"])[0];
    parts.forEach((p) => {
      if (p[0] === ".") classes.push(p.slice(1));
      else id = p.slice(1);
    });
    const el = document.createElement(name);
    if (id) el.id = id;
    if (classes.length) el.className = classes.join(" ");
    if (attrs && typeof attrs === "object" && !Array.isArray(attrs) && !(attrs instanceof Node)) {
      Object.keys(attrs).forEach((k) => {
        if (k === "html") el.innerHTML = attrs[k];
        else if (k === "text") el.textContent = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function") el.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] != null) el.setAttribute(k, attrs[k]);
      });
    } else {
      children = attrs;
    }
    appendChildren(el, children);
    return el;
  }
  function appendChildren(el, children) {
    if (children == null) return;
    if (!Array.isArray(children)) children = [children];
    children.forEach((c) => {
      if (c == null || c === false) return;
      if (typeof c === "string" || typeof c === "number") el.appendChild(document.createTextNode(String(c)));
      else el.appendChild(c);
    });
  }
  APP.h = h;
})();
