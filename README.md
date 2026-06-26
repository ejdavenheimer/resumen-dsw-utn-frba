# Template de apuntes interactivos (UTN.BA)

Esqueleto reutilizable para hacer el resumen interactivo de **cualquier materia**.
Todos los apuntes hechos con este template **se ven igual** (mismo diseño y navegación);
lo único que cambia por materia es el **contenido** en `js/content/`.

> Sin instalación, sin build, sin dependencias: HTML + CSS + JavaScript vanilla.

## 🚀 Crear una materia nueva

1. En GitHub, **Use this template** → nuevo repo (ej. `analisis-matematico`).
   (O cloná este repo y vaciá el contenido.)
2. Personalizá en `index.html` los `TODO`: título, nombre de la materia, iniciales del logo y la URL del repo.
3. Cambiá las iniciales del `favicon.svg`.
4. Escribí el contenido en `js/content/` (ver abajo).
5. Subí a GitHub y conectalo a Vercel (framework: **Other**, sin build). Listo.

## ✍️ Agregar un tema

1. Copiá `js/content/ejemplo-tema.js` a `js/content/mi-tema.js`.
2. Cambiá `id`, `title` y el HTML del `render`.
3. Sumá su `<script>` en `index.html`. **El orden de los `<script>` = el orden del menú.**

Cada sección se registra así:

```js
APP.register({
  id: "mi-tema",        // único, va en la URL (#mi-tema)
  title: "Mi Tema",     // texto del menú
  tag: "📖",            // opcional, chip a la derecha
  render(el) { el.innerHTML = `... HTML ...`; }
});
```

## 📝 Preguntas

Editá el array `QUESTIONS` en `js/content/preguntas.js`. Tipos disponibles:
`vf` (verdadero/falso), `mc` (opción única), `multi` (selección múltiple),
`open` (a desarrollar) y `match` (unir). El campo `topic` habilita el filtro por tema.

## 🎨 Qué hace que todos "se vean iguales"

El **diseño** vive en estos archivos (no los toques por materia, mantenelos idénticos):

```
styles.css           · todo el estilo visual
index.html           · el esqueleto (sidebar + contenido)
js/core.js           · registro de secciones + helpers
js/app.js            · navegación y routing
js/widgets/quiz.js   · cuestionario interactivo
```

El **contenido** (lo que cambia por materia) vive solo en:

```
js/content/*.js      · una sección por tema + las preguntas
favicon.svg          · iniciales/color de la materia
```

> Si más adelante mejorás el diseño, actualizá `styles.css` (y el motor `js/`) en cada
> repo para que sigan viéndose iguales. Si te cansás de copiar, podés hostear esos
> archivos compartidos en un solo lugar y enlazarlos por URL desde cada materia.

## 📄 Licencia

[MIT](LICENSE)

## 👤 Autor

**ejdavenheimer** — GitHub: https://github.com/ejdavenheimer
