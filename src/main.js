import './style.css'
import { productos } from './datos.js'

// Elemento donde se dibujan las tarjetas (lo creas en el Ejercicio 1)
const catalogo = document.getElementById('catalogo')

// ------------------------------------------------------------
// EJERCICIO 2 — mostrarProductos(lista)
// Convierte una lista de productos en tarjetas HTML y las pone en la página.
// Forma general:
//   catalogo.innerHTML = lista.map(p => `
//     <article class="...las mismas clases de tu Ejercicio 1...">
//       <h3>${p.nombre}</h3>
//       ...
//       <button data-id="${p.id}">Agregar</button>
//     </article>
//   `).join('')
// ------------------------------------------------------------
function mostrarProductos(lista) {
  // Escribe aquí tu código
catalogo.innerHTML = lista.map(p => `
        <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-xl font-bold">${p.nombre}</h2>
            <p class="text-gray-600">$${p.precio}</p>

            <button
                data-id="${p.id}"
                class="mt-4 bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-700">
                Agregar
            </button>
        </div>
    `).join('');

}

mostrarProductos(productos)

// ------------------------------------------------------------
// EJERCICIO 3 — Armar el pedido
// El pedido es un arreglo con los productos que la persona va agregando.
// Pasos (detalle en el README):
//   1. Escucha el clic en el contenedor #catalogo (delegación de eventos).
//   2. Busca el producto por id con .find() y agrégalo con .push().
//   3. Dibuja el pedido con mostrarPedido() y calcula el total con .reduce().
//   4. Botón "Vaciar pedido".
// ------------------------------------------------------------
const pedido = []

// Escribe aquí tu código del Ejercicio 3

const listaPedido = document.getElementById('lista-pedido')
const total = document.getElementById('total')
const btnVaciar = document.getElementById('btn-vaciar')

function mostrarPedido() {
  listaPedido.innerHTML = pedido.map(p => `
    <li class="p-2 border-b">
      ${p.nombre} - $${p.precio}
    </li>
  `).join('')

  const sumaTotal = pedido.reduce((suma, p) => suma + p.precio, 0)

  total.textContent = `Total: $${sumaTotal}`
}


catalogo.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-id]');

    if (!boton) return;

    const id = Number(boton.dataset.id);

    const producto = productos.find(p => p.id === id);

    pedido.push(producto);

    mostrarPedido();
});

btnVaciar.addEventListener('click', () => {
  pedido.length = 0
  mostrarPedido()
})


// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// Botones de categoría que llamen a mostrarProductos() con
// productos.filter(...). El botón "Todos" muestra la lista completa.
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4
