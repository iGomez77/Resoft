// --- Inicialización del carrito --- //
document.addEventListener("DOMContentLoaded", mostrarCarrito);

// --- Mostrar productos en el carrito --- //
function mostrarCarrito() {
  const cuerpoTabla = document.getElementById("carritoBody");
  if (!cuerpoTabla) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  cuerpoTabla.innerHTML = "";

  if (carrito.length === 0) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">🛒 No hay productos en el carrito</td>
      </tr>`;
    actualizarTotales();
    actualizarContador();
    return;
  }

  carrito.forEach((producto, index) => {
    const cantidad = producto.cantidad || 1;
    const precio = Number(producto.precio) || 0;
    const subtotal = precio * cantidad;

    const fila = document.createElement("tr");
    fila.classList.add("carrito-item");
    fila.dataset.precio = precio;       // 👈 precio unitario
    fila.dataset.nombre = producto.nombre; // 👈 nombre para identificar
    fila.innerHTML = `
      <td><input type="checkbox" class="seleccion-item" checked data-index="${index}"></td>
      <td class="d-flex align-items-center gap-3">
        <img src="${producto.imagen}" alt="${producto.nombre}" width="80">
        <p class="mb-0">${producto.nombre}</p>
      </td>
      <td class="precio-unitario">COP ${precio.toLocaleString("es-CO")}</td>
      <td>
        <button class="btn btn-outline-dark btn-sm btn-menos">-</button>
        <span class="cantidad mx-2">${cantidad}</span>
        <button class="btn btn-outline-dark btn-sm btn-mas">+</button>
      </td>
      <td class="subtotal">COP ${subtotal.toLocaleString("es-CO")}</td>
      <td>
        <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      </td>`;
    cuerpoTabla.appendChild(fila);
  });

  actualizarTotales();
  actualizarContador();
}

// --- Eventos globales del carrito --- //
document.addEventListener("click", (e) => {
  const target = e.target;

  // 🔼 Aumentar o disminuir cantidad
  if (target.classList.contains("btn-mas") || target.classList.contains("btn-menos")) {
    const fila = target.closest(".carrito-item");
    const cantidadEl = fila.querySelector(".cantidad");
    const precioUnitario = parseInt(fila.dataset.precio);
    const nombre = fila.dataset.nombre;

    let cantidad = parseInt(cantidadEl.textContent);
    if (target.classList.contains("btn-mas")) cantidad++;
    if (target.classList.contains("btn-menos") && cantidad > 1) cantidad--;

    cantidadEl.textContent = cantidad;

    // 🔁 Actualiza subtotal visible
    const nuevoSubtotal = precioUnitario * cantidad;
    fila.querySelector(".subtotal").textContent = `COP ${nuevoSubtotal.toLocaleString("es-CO")}`;

    // 🔁 Actualiza localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.map(p => p.nombre === nombre ? { ...p, cantidad } : p);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarTotales();
  }

  // 🗑️ Eliminar producto
  if (target.closest(".btn-eliminar")) {
    const index = Number(target.closest(".btn-eliminar").dataset.index);
    eliminarProducto(index);
  }

  // ✅ Checkbox de selección
  if (target.classList.contains("seleccion-item")) {
    actualizarTotales();
  }
});

// --- Eliminar producto individual --- //
function eliminarProducto(index) {
  if (!confirm("¿Deseas eliminar este producto del carrito?")) return;
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// --- Calcular totales con envío del 7% --- //
function actualizarTotales() {
  const filas = document.querySelectorAll(".carrito-item");
  let subtotal = 0;
  let haySeleccionados = false;

  filas.forEach(fila => {
    const checkbox = fila.querySelector(".seleccion-item");
    const precioTexto = fila.querySelector(".subtotal")?.textContent || "";
    const valor = parseInt(precioTexto.replace(/[^\d]/g, "")) || 0;

    if (checkbox?.checked) {
      subtotal += valor;
      haySeleccionados = true;
    }
  });

  const envio = haySeleccionados ? Math.round(subtotal * 0.07) : 0;
  const totalFinal = haySeleccionados ? subtotal + envio : 0;

  const formatCOP = num => `COP ${num.toLocaleString("es-CO")}`;
  document.getElementById("subtotal").textContent = formatCOP(subtotal);
  document.getElementById("envio").textContent = formatCOP(envio);
  document.getElementById("total").textContent = formatCOP(totalFinal);
}

// --- Contador del icono del carrito --- //
function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (!contador) return;

  if (carrito.length > 0) {
    contador.textContent = carrito.length;
    contador.style.display = "inline";
  } else {
    contador.textContent = "";
    contador.style.display = "none";
  }
}

// --- Vaciar carrito --- //
document.getElementById("vaciarCarrito")?.addEventListener("click", () => {
  if (confirm("¿Deseas vaciar todo el carrito?")) {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  }
});
