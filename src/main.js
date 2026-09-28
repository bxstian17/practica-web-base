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
// EJERCICIO 5 
const formCliente = document.getElementById('form-cliente')

const nombre = document.getElementById('nombre')
const telefono = document.getElementById('telefono')
const correo = document.getElementById('correo')

const errorNombre = document.getElementById('error-nombre')
const errorTelefono = document.getElementById('error-telefono')
const errorCorreo = document.getElementById('error-correo')
const errorPedido = document.getElementById('error-pedido')

// Función para mostrar un error
function mostrarError(campo, error, mensaje) {
  error.textContent = mensaje
  error.classList.remove('hidden')
  campo.classList.add('border-red-500')
}

// Función para limpiar un error
function limpiarError(campo, error) {
  error.textContent = ''
  error.classList.add('hidden')
  campo.classList.remove('border-red-500')
}

// Escuchar el envío del formulario
formCliente.addEventListener('submit', (evento) => {
  evento.preventDefault()

  // Limpiar errores anteriores
  limpiarError(nombre, errorNombre)
  limpiarError(telefono, errorTelefono)
  limpiarError(correo, errorCorreo)

  errorPedido.textContent = ''
  errorPedido.classList.add('hidden')

  // Obtener los datos
  const nombreValor = nombre.value.trim()
  const telefonoValor = telefono.value.trim()
  const correoValor = correo.value.trim()

  let valido = true

  // Validar nombre
  if (!nombreValor) {
    mostrarError(
      nombre,
      errorNombre,
      'El nombre es obligatorio.'
    )
    valido = false
  }

  // Validar teléfono
  if (!/^\d{10}$/.test(telefonoValor)) {
    mostrarError(
      telefono,
      errorTelefono,
      'El teléfono debe tener exactamente 10 dígitos.'
    )
    valido = false
  }

  // Validar correo
  if (!/^\S+@\S+\.\S+$/.test(correoValor)) {
    mostrarError(
      correo,
      errorCorreo,
      'Ingresa un correo válido.'
    )
    valido = false
  }

  // Validar que exista un pedido
  if (pedido.length === 0) {
    errorPedido.textContent = 'Debes agregar al menos un producto al pedido.'
    errorPedido.classList.remove('hidden')
    valido = false
  }

  // Si hay algún error, no continuar
  if (!valido) return

  // Si todo es correcto
  alert('¡Pedido confirmado correctamente!')
})