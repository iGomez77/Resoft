document.addEventListener("DOMContentLoaded", () => {
  const envioFijo = 35000;
  actualizarTotales();

  // Delegación de eventos para botones +
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-mas")) {
      const fila = e.target.closest(".carrito-item");
      modificarCantidad(fila, 1);
    }

    if (e.target.classList.contains("btn-menos")) {
      const fila = e.target.closest(".carrito-item");
      modificarCantidad(fila, -1);
    }

    if (e.target.classList.contains("seleccion-item")) {
      actualizarTotales();
    }
  });
});

function modificarCantidad(fila, cambio) {
  const cantidadElemento = fila.querySelector(".cantidad");
  let cantidad = parseInt(cantidadElemento.textContent);
  cantidad = Math.max(0, cantidad + cambio); 
  cantidadElemento.textContent = cantidad;

  actualizarSubtotal(fila);
  actualizarTotales();
}

function actualizarSubtotal(fila) {
  const precioTexto = fila.querySelector(".precio-unitario").textContent;
  const precio = parseInt(precioTexto.replace(/\D/g, ""));
  const cantidad = parseInt(fila.querySelector(".cantidad").textContent);
  const subtotal = precio * cantidad;

  fila.querySelector(".subtotal").textContent = `$${subtotal.toLocaleString("es-CO")}`;
}

function actualizarTotales() {
  const carritoItems = document.querySelectorAll(".carrito-item");
  let subtotal = 0;

  carritoItems.forEach(item => {
    const checkbox = item.querySelector(".seleccion-item");
    if (checkbox.checked) {
      const precio = parseInt(item.querySelector(".precio-unitario").textContent.replace(/\D/g, ""));
      const cantidad = parseInt(item.querySelector(".cantidad").textContent);
      const subtotalItem = precio * cantidad;
      item.querySelector(".subtotal").textContent = `$${subtotalItem.toLocaleString("es-CO")}`;
      subtotal += subtotalItem;
    }
  });

  const subtotalElemento = document.getElementById("subtotal");
  const envioElemento = document.getElementById("envio");
  const totalElemento = document.getElementById("total");

  if (subtotalElemento && envioElemento && totalElemento) {
    subtotalElemento.textContent = `$${subtotal.toLocaleString("es-CO")}`;
    envioElemento.textContent = `$${subtotal.toLocaleString("es-CO")}`;
    totalElemento.textContent = `$${(subtotal  ).toLocaleString("es-CO")}`;
  }
}
