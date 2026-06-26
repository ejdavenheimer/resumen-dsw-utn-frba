(function () {
  "use strict";
  const APP = window.APP;
  APP.register({
    id: "react",
    title: "React",
    tag: "⚛️",
    render(el) {
      el.innerHTML = `
        <div class="page-head">
          <div class="page-kicker">Desarrollo Front · React</div>
          <h1>React</h1>
          <p class="lead">Biblioteca para construir interfaces a partir de componentes reutilizables.</p>
        </div>

        <div class="callout key">
          <div class="callout-title">📌 La idea de React</div>
          <p>Construir la UI con <b>componentes</b> (funciones que devuelven la vista en <b>JSX</b>). Cuando el
          <b>estado</b> cambia, React vuelve a renderizar solo lo necesario. Es <b>declarativo</b>: describís
          <i>cómo se ve</i> según el estado, no los pasos para actualizarlo.</p>
        </div>

        <h2>Componentes y Props</h2>
        <ul>
          <li><b>Componente</b>: función que recibe datos y devuelve JSX.</li>
          <li><b>Props</b>: datos que un componente padre le pasa al hijo. Son de <b>solo lectura</b>
          (el hijo no las modifica).</li>
        </ul>
        <pre><code>function Saludo({ nombre }) {
  return &lt;h1&gt;Hola, {nombre}&lt;/h1&gt;;
}
// uso:  &lt;Saludo nombre="Emerson" /&gt;</code></pre>

        <h2>Estado e inmutabilidad</h2>
        <p>El <b>estado</b> son los datos internos que cambian con el tiempo. <b>Regla clave:</b> el estado es
        <b>inmutable</b> → no se modifica directamente, se crea uno nuevo (por eso usamos <code>map</code>,
        <code>filter</code>, spread <code>{...obj}</code> en vez de mutar).</p>

        <p>Tocá los botones y mirá cuándo la UI <b>se re-renderiza</b> y cuándo no. Ahí entendés por qué el estado
        es inmutable:</p>
        <div id="simMount"></div>

        <h2>Hooks</h2>
        <p>Funciones especiales que dan "superpoderes" a los componentes funcionales (estado, efectos, contexto…).</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Hook</th><th>Para qué</th></tr></thead>
          <tbody>
            <tr><td><code>useState</code></td><td>Manejar estado local del componente.</td></tr>
            <tr><td><code>useEffect</code></td><td>Ejecutar efectos secundarios: <b>cuando el componente se monta o cambia una dependencia</b> (ej. pedir datos a una API).</td></tr>
            <tr><td><code>useContext</code></td><td>Acceder a un contexto global sin pasar props por todos lados.</td></tr>
            <tr><td><code>useRef</code></td><td>Referencia mutable que persiste entre renders (sin re-renderizar).</td></tr>
            <tr><td><code>useCallback</code></td><td>Memoriza una función para no recrearla en cada render.</td></tr>
            <tr><td>custom hooks</td><td>Encapsular lógica reutilizable propia (tu propia "biblioteca" de hooks). Comparten la lógica, no el estado.</td></tr>
          </tbody>
        </table></div>
        <div class="callout warn"><p><b>Pregunta de parcial:</b> ¿qué hook usás para ejecutar una acción
        cuando el componente <b>se monta</b> o cambia una dependencia? → <b><code>useEffect</code></b>.</p></div>

        <pre><code>const [contador, setContador] = useState(0);

useEffect(() => {
  cargarDatos();          // efecto al montar / al cambiar 'id'
}, [id]);                 // ← array de dependencias</code></pre>

        <h2>Lifecycle, formularios y routing</h2>
        <ul>
          <li><b>Lifecycle</b>: montaje → actualización → desmontaje. Con <code>useEffect</code> se manejan
          esos momentos (y la "limpieza" devolviendo una función).</li>
          <li><b>Formularios</b>: inputs controlados por estado; se validan antes de enviar.</li>
          <li><b>Routing</b>: navegación entre "páginas" sin recargar (React Router) → base de las SPA.</li>
          <li><b>Renderizado condicional</b>: el componente muestra distinto HTML según una condición
          (ej. <code>{logueado ? &lt;Perfil/&gt; : &lt;Login/&gt;}</code>).</li>
        </ul>

        <h2>Capa de estado global</h2>
        <p>Para estado compartido por toda la app se usa <b>Context</b> o <b>Redux</b>. Permite que componentes
        lejanos lean/actualicen el mismo estado, con transformaciones y manejo de errores centralizados.</p>

      `;

      APP.reactSim(el.querySelector("#simMount"));
    },
  });
})();
