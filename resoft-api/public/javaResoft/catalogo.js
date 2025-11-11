// public/javaResoft/catalogo.js

async function cargarCatalogo() {
  const contenedor = document.getElementById("catalogoProductos");
  const titulo = document.getElementById("tituloCategoria");

  if (!contenedor || !titulo) {
    console.warn(" Esperando a que se cargue el contenedor del catálogo...");
    setTimeout(cargarCatalogo, 300); // Espera un poco y reintenta
    return;
  }

  contenedor.innerHTML = `<p class="text-center text-muted mt-4">
    Cargando productos... estoy dentro
  </p>`;

  // Detectar categoría
  let categoriaSeleccionada = localStorage.getItem("categoriaSeleccionada");

  const params = new URLSearchParams(window.location.search);
  if (params.has("categoria")) {
    categoriaSeleccionada = params.get("categoria");
    localStorage.setItem("categoriaSeleccionada", categoriaSeleccionada);
  }

  titulo.textContent = categoriaSeleccionada
    ? `Productos - ${categoriaSeleccionada}`
    : "Productos";

  try {
    const response = await fetch("http://localhost:4000/api/products");
    if (!response.ok) throw new Error("Error al obtener productos");

    const productos = await response.json();
    contenedor.innerHTML = "";

    //  Filtrar productos por categoría
    const productosFiltrados = categoriaSeleccionada
      ? productos.filter(
          (p) =>
            p.categoria &&
            p.categoria.nombre
              .toLowerCase()
              .includes(categoriaSeleccionada.toLowerCase())
        )
      : productos;

    if (productosFiltrados.length === 0) {
      contenedor.innerHTML = `
        <p class="text-center text-muted mt-4">
          No hay productos disponibles en esta categoría.
        </p>`;
      return;
    }

    //  Crear tarjetas
    productosFiltrados.forEach((prod) => {
      const rutaImagen = prod.imagen
        ? `http://localhost:4000/img/${prod.imagen}`
        : `http://localhost:4000/img/no-image.png`;

      const card = document.createElement("div");
      card.className = "col-md-4 col-lg-3 col-sm-6 producto mb-4";

      card.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <img 
            src="${rutaImagen}" 
            class="card-img-top rounded-top" 
            alt="${prod.nombre}"
            onerror="this.src='http://localhost:4000/img/no-image.png';"
          >
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">${prod.nombre}</h5>
            <p class="card-text text-muted">${prod.descripcion}</p>
            <p class="fw-bold text-success mb-2">
              COP ${parseInt(prod.precio).toLocaleString("es-CO")}
            </p>
            <button class="btn btn-dark btn-sm agregar-carrito" 
              data-nombre="${prod.nombre}" 
              data-precio="${prod.precio}" 
              data-imagen="${rutaImagen}">
              Agregar al carrito
            </button>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("❌ Error al cargar catálogo:", error);
    contenedor.innerHTML = `
      <p class="text-center text-danger mt-4">
        Error al cargar productos 
      </p>`;
  }
}

// Si se abre directamente el catalogo.html, ejecuta automáticamente
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", cargarCatalogo);
} else {
  cargarCatalogo();
}

// --- AGREGAR AL CARRITO ---
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar-carrito")) {
    const precioLimpio = Number(
      String(e.target.dataset.precio).replace(/[^\d]/g, "")
    );

    const producto = {
      nombre: e.target.dataset.nombre,
      precio: precioLimpio,
      imagen: e.target.dataset.imagen,
      cantidad: 1,
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carrito.find((p) => p.nombre === producto.nombre);

    if (existe) {
      alert(" Este producto ya está en el carrito");
      return;
    }

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const contador = document.getElementById("contador-carrito");
    if (contador) {
      contador.textContent = carrito.length;
      contador.style.display = "inline";
    }

    alert(`🛒 ${producto.nombre} agregado al carrito`);
  }
});
