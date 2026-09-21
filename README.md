54# Práctica web — HTML, Tailwind y JavaScript

**Informática III. Análisis y Diseño de Sistemas I · Grupo 1301 · FES Cuautitlán, UNAM**

## Qué vas a hacer

Vas a construir, paso a paso, una página de **catálogo y pedido** para el negocio de tu equipo: primero la maquetas con HTML y Tailwind, después la conviertes en una página que se dibuja sola a partir de datos con JavaScript. Es una pieza del producto común del semestre (Sistema de Pedidos y Clientes), sin frameworks todavía.

Todo se hace en un **Codespace** (un VS Code en tu navegador): no instalas nada en tu computadora. Trabajas en tu propia copia del repo (un *fork*) y subes tus cambios desde la **terminal de Git**.

**Qué entregas** (en Classroom):

1. El enlace a tu fork, con todos tus cambios subidos (`git push`).
2. El documento de respuestas (plantilla) con tus capturas, tus explicaciones y tu declaración de uso de IA.

> Tu fork será **público**. No subas datos personales, contraseñas ni claves.

---

## Parte A — Prepara tu entorno (todos, en este orden)

### A1. Haz un fork de este repo

En la página de este repo, botón **Fork** (arriba a la derecha) → *Owner*: tu cuenta → **Create fork**. A partir de aquí trabajas **en tu fork**, que vive en `github.com/<tu-usuario>/...`.

### A2. Abre un Codespace en tu fork

En **tu fork** (revisa que en la URL aparezca tu usuario): botón verde **Code** → pestaña **Codespaces** → **Create codespace on main**. La primera vez tarda entre 1 y 3 minutos porque construye el entorno. Se abre un VS Code en el navegador.

### A3. Verifica el entorno

Abre la terminal (menú ☰ → Terminal → New Terminal) y ejecuta:

```bash
node -v
npm -v
git remote -v
```

- `node -v` debe mostrar una versión **v22.x**.
- `git remote -v` debe mostrar **tu usuario** en la URL (`github.com/<tu-usuario>/...`). Si aparece el usuario del docente, abriste el Codespace en el repo equivocado: bórralo y créalo desde tu fork.

### A4. Instala Vite y Tailwind

Este repo trae los archivos de configuración, pero **las herramientas las instalas tú**:

```bash
npm install -D vite tailwindcss @tailwindcss/vite
```

Qué instala cada cosa:

| Paquete | Para qué sirve |
|---|---|
| `vite` | Servidor de desarrollo: muestra tu página y la actualiza al guardar |
| `tailwindcss` | Las clases de estilo (`p-4`, `flex`, `bg-blue-600`...) |
| `@tailwindcss/vite` | Conecta Tailwind con Vite (ya está configurado en `vite.config.js`) |

Cuando termine, abre `package.json`: ahora debe tener una sección `devDependencies` con los tres paquetes. También aparecieron la carpeta `node_modules` (no se sube a GitHub) y el archivo `package-lock.json` (sí se sube).

### A5. Enciende la página

```bash
npm run dev
```

Verás algo como `Local: http://localhost:5173/`. Codespaces avisa que el puerto 5173 está disponible: haz clic en **Open in Browser**. Si se te pasó el aviso, abre la pestaña **PORTS** (junto a la terminal), busca el puerto 5173 y haz clic en el ícono del globo.

**Deja esa terminal encendida.** Para escribir comandos de Git abre otra terminal con el botón **+** de la terminal.

### A6. Comprueba que Tailwind funciona

Si ves una **barra azul con texto blanco** arriba de la página, Tailwind funciona. Si la página se ve sin estilos, revisa la sección *Si algo falla* al final.

### A7. Tu primer commit y push

En la segunda terminal:

```bash
git status
git add .
git commit -m "chore: instala Vite y Tailwind"
git push
```

`git status` debe mostrar `package.json` (modificado) y `package-lock.json` (nuevo). **No** debe aparecer `node_modules`.

📸 **Captura A** (ver la plantilla de respuestas).

---

## El ciclo de Git que usarás en cada ejercicio

```bash
git status                      # ¿qué cambió?
git add .                       # prepara todos los cambios
git commit -m "feat: mensaje"   # los guarda con un mensaje que diga QUÉ hiciste
git push                        # los sube a tu fork
git log --oneline               # historial de commits
```

Mensajes de commit: empiezan con `feat:` (algo nuevo), `fix:` (corregir), `docs:` (documentación) o `chore:` (configuración), seguido de una descripción clara. **No** uses mensajes como `update` o `cambios`.

Haz **al menos un commit por ejercicio terminado**.

---

## Ejercicio 1 — HTML y Tailwind: maqueta el catálogo *(núcleo)*

**Archivo:** `index.html`

Construye la página de tu negocio con estas piezas:

1. Un `<header>` con el nombre de tu negocio en un `<h1>` y una frase corta debajo.
2. Un `<main>` con un contenedor `<div id="catalogo">` que tenga **3 tarjetas** estáticas. Cada tarjeta muestra nombre, precio y un botón **Agregar**.
3. `#catalogo` debe ser una cuadrícula: **1 columna en celular, 2 en pantallas `sm` y 3 en `md` o más**. Pista: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`.
4. Las tarjetas con fondo blanco, esquinas redondeadas, sombra y espacio interno (`bg-white rounded-lg shadow p-4`), y el botón con un cambio de color al pasar el cursor (`hover:`).
5. Un `<footer>` con el nombre de tu equipo.

Debes usar al menos: `flex` o `grid`, `p-*`, `rounded-*`, `shadow`, `text-*`, `font-*`, `hover:` y un prefijo responsivo (`sm:` o `md:`).

**Cómo probar la versión de celular:** abre la vista previa en una pestaña nueva, pulsa `F12` y activa el modo dispositivo (`Ctrl + Shift + M`), o simplemente achica la ventana.

📸 **Captura 1a** (computadora) y **1b** (celular) · Commit sugerido: `feat: maqueta catálogo con Tailwind`

> Tip: el autocompletado de Tailwind te sugiere clases mientras escribes dentro de `class="..."`. La referencia completa está en tailwindcss.com/docs.

---

## Ejercicio 2 — JavaScript: dibuja las tarjetas desde datos *(núcleo)*

**Archivos:** `src/datos.js`, `src/main.js`, `index.html`

1. En `src/datos.js` **reemplaza** los productos de ejemplo por **al menos 6 productos o servicios de tu negocio**, con **mínimo 2 categorías** distintas.
2. En `src/main.js` completa la función `mostrarProductos(lista)`: usa `lista.map(...)` para convertir cada producto en el HTML de una tarjeta (con **las mismas clases** de tu Ejercicio 1) y ponlo en `catalogo.innerHTML`. Recuerda `.join('')` al final.
3. Cada botón **Agregar** debe llevar el id de su producto: `<button data-id="${p.id}" ...>`. Lo usarás en el Ejercicio 3.
4. **Borra las 3 tarjetas estáticas** del `index.html` (deja `<div id="catalogo" class="..."></div>` vacío). Ahora las tarjetas las genera JavaScript.

**Debe verse:** todos tus productos en la cuadrícula, con el mismo diseño del Ejercicio 1.

Tip: dentro de un texto con acentos graves, `$${p.precio}` imprime el signo `$` seguido del precio.

📸 **Captura 2a** (página) y **2b** (tu función `mostrarProductos`) + explicación con tus palabras · Commit sugerido: `feat: genera catálogo desde datos con map`

---

## Ejercicio 3 — Eventos: arma el pedido *(continuación)*

**Archivos:** `index.html`, `src/main.js`

1. En `index.html` agrega un `<aside>` con el título **Mi pedido**, una lista `<ul id="lista-pedido">`, un párrafo `<p id="total">` y un botón **Vaciar pedido** con `id="btn-vaciar"`. Dales estilo con Tailwind.
2. En `main.js` (ya existe `const pedido = []`) escucha los clics **en el contenedor** del catálogo:

   ```js
   catalogo.addEventListener('click', (evento) => {
     const boton = evento.target.closest('button[data-id]')
     if (!boton) return
     const id = Number(boton.dataset.id)
     // 1. busca el producto con productos.find(...)
     // 2. agrégalo a pedido con push
     // 3. llama a mostrarPedido()
   })
   ```

3. Escribe `mostrarPedido()`: dibuja cada producto del pedido con `map` dentro de `#lista-pedido` y calcula el total con `reduce`:

   ```js
   const total = pedido.reduce((suma, p) => suma + p.precio, 0)
   ```

4. El botón **Vaciar pedido** deja el arreglo vacío (`pedido.length = 0`) y redibuja.

**¿Por qué escuchar en el contenedor y no en cada botón?** Las tarjetas se crean con JavaScript *después* de cargar la página; escuchando en el contenedor un solo `addEventListener` sirve para todas, incluso las que se dibujen más tarde. Tampoco uses `onclick="..."` dentro del HTML generado: en un módulo de JavaScript las funciones no son globales y no lo encontraría.

📸 **Captura 3a** (pedido con al menos 3 productos y su total) y **3b** (tu código del listener) + explicación de `reduce` · Commit sugerido: `feat: agrega pedido con total`

---

## Ejercicio 4 — Filtra por categoría *(continuación)*

**Archivos:** `index.html`, `src/main.js`

1. Arriba del catálogo agrega botones de categoría: **Todos** más uno por cada categoría de tus datos. Cada botón lleva `data-categoria="..."`.
2. Al hacer clic, llama a `mostrarProductos(...)` con la lista filtrada (`productos.filter(p => p.categoria === categoria)`). **Todos** muestra la lista completa.
3. Resalta el botón activo con clases de Tailwind (por ejemplo, fondo azul y texto blanco para el activo y fondo blanco para los demás).

**Debe verse:** al elegir una categoría solo aparecen sus productos, y agregar al pedido **sigue funcionando** con las tarjetas filtradas.

📸 **Captura 4** (un filtro activo) · Commit sugerido: `feat: filtra catálogo por categoría`

---

## Extras (para Destacado; elige uno o más)

- Guarda el pedido en `localStorage` para que sobreviva al recargar la página (`JSON.stringify` y `JSON.parse`).
- Si agregan el mismo producto dos veces, sube su **cantidad** en lugar de duplicar la línea.
- Un buscador por nombre con `filter` e `includes`.
- Modo oscuro con las clases `dark:` de Tailwind y un botón para cambiarlo.

📸 Captura de tu extra + un commit propio.

---

## Antes de entregar

1. Haz `git status`: no debe haber cambios sin subir.
2. Haz `git push` y comprueba en GitHub, en **tu fork**, que aparecen tus commits.
3. Completa la plantilla de respuestas y entrégala en Classroom junto con el enlace a tu fork.
4. **Detén tu Codespace** (`Ctrl + Shift + P` → *Codespaces: Stop Current Codespace*) para no gastar tu cuota mensual gratuita. Tu trabajo está a salvo en el fork.

**Uso de IA:** puedes usarla, declarando qué herramienta usaste, para qué y qué verificaste. Eres responsable de todo lo que entregas: si no puedes explicar tu código, no lo entregaste tú.

---

## Si algo falla

| Síntoma | Qué revisar |
|---|---|
| `vite: command not found` o `Cannot find package 'vite'` | Falta el paso A4. Ejecuta `npm install -D vite tailwindcss @tailwindcss/vite` |
| La página se ve **sin estilos** | 1) ¿Instalaste `@tailwindcss/vite`? 2) `src/style.css` debe contener `@import "tailwindcss";` 3) `main.js` debe empezar con `import './style.css'` 4) Detén el servidor (`Ctrl + C`) y vuelve a correr `npm run dev` |
| Una clase de Tailwind no hace nada | Revisa que esté bien escrita. No armes clases por pedazos (`'bg-' + color` no funciona; escribe la clase completa) |
| El navegador no abre la página | Pestaña **PORTS** → puerto 5173 → ícono del globo. Confirma que `npm run dev` siga corriendo |
| `git push` dice *Permission denied* | Abriste el Codespace en el repo del docente, no en tu fork. Revisa `git remote -v`, borra ese Codespace y crea uno desde tu fork |
| Nada pasa al hacer clic | Abre la consola del navegador (`F12` → Console). Casi siempre es un `id` mal escrito o un error de sintaxis |
| Sale `undefined` en una tarjeta | El nombre de la propiedad no coincide con `datos.js` (por ejemplo `p.precios` en lugar de `p.precio`) |
| Al recargar se pierde el pedido | Es normal: los datos viven en memoria. Por eso existe el extra de `localStorage` (y, más adelante, una base de datos) |
