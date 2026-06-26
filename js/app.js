/* =====================================================================
   Apuntes — arranque, navegación y routing
   La navegación es una lista plana, en el mismo orden en que se incluyen
   los <script> de js/content/ en index.html.
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;
  const SITE = APP.title || "Apuntes";
  const navEl = document.getElementById("nav");
  const contentEl = document.getElementById("content");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("backdrop");
  const progress = document.getElementById("progressTop");

  function buildNav() {
    navEl.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "nav-group";
    APP.sections.forEach((s) => {
      const a = document.createElement("a");
      a.className = "nav-link";
      a.href = "#" + s.id;
      a.dataset.id = s.id;
      a.innerHTML =
        "<span>" + s.title + "</span>" +
        (s.tag ? '<span class="tag">' + s.tag + "</span>" : "");
      wrap.appendChild(a);
    });
    navEl.appendChild(wrap);
  }

  function renderSection(id) {
    const section = APP.sections.find((s) => s.id === id) || APP.sections[0];
    if (!section) return;

    contentEl.innerHTML = "";
    const container = document.createElement("div");
    container.className = "section-body";
    try {
      section.render(container);
    } catch (e) {
      container.innerHTML =
        '<div class="callout warn"><b>Error al renderizar esta sección.</b><br>' +
        (e && e.message) + "</div>";
      console.error(e);
    }
    contentEl.appendChild(container);

    document.querySelectorAll(".nav-link").forEach((a) => {
      const isActive = a.dataset.id === section.id;
      a.classList.toggle("active", isActive);
      if (isActive) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    window.scrollTo(0, 0);
    contentEl.scrollTop = 0;
    sidebar.classList.remove("open");
    backdrop.classList.remove("show");

    document.title = section.title + " · " + SITE;
  }

  function route() {
    const id = location.hash.replace(/^#/, "") || (APP.sections[0] && APP.sections[0].id);
    renderSection(id);
  }
  window.addEventListener("hashchange", route);
  APP.go = function (id) { location.hash = "#" + id; };

  const menuBtn = document.getElementById("menuBtn");
  menuBtn.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    backdrop.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  backdrop.addEventListener("click", () => {
    sidebar.classList.remove("open");
    backdrop.classList.remove("show");
  });

  window.addEventListener("scroll", () => {
    const d = document.documentElement;
    const scrolled = (d.scrollTop) / (d.scrollHeight - d.clientHeight || 1);
    progress.style.width = Math.min(100, scrolled * 100) + "%";
  });

  buildNav();
  route();
})();
