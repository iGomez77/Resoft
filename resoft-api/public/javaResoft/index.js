// 📄 public/javaResoft/index.js

// 🔹 Control SPA (Single Page Application)
document.querySelectorAll('[data-page]').forEach(link => {
  link.addEventListener('click', async e => {
    e.preventDefault();

    const page = link.getAttribute('data-page');
    const [ruta, query] = page.split('?');
    const params = new URLSearchParams(query);
    const categoria = params.get('categoria');

    try {
      const rutaCompleta = ruta.startsWith('/')
        ? ruta
        : `/htmlResoft/${ruta.replace('./htmlResoft/', '')}`;

      const response = await fetch(rutaCompleta);
      if (!response.ok) throw new Error("Error al cargar " + rutaCompleta);

      const html = await response.text();
      document.querySelector('#contenido').innerHTML = html;
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(`✅ Página cargada: ${rutaCompleta}`);

      // 🔸 Guardar categoría seleccionada
      if (ruta.includes("catalogo.html")) {
        if (categoria) {
          localStorage.setItem("categoriaSeleccionada", categoria);
        } else {
          localStorage.removeItem("categoriaSeleccionada");
        }

        // Cargar dinámicamente el script del catálogo
        setTimeout(() => {
          const script = document.createElement("script");
          script.src = "/javaResoft/catalogo.js";
          script.onload = () => {
            console.log("🛍️ catalogo.js cargado dinámicamente");
            if (typeof cargarCatalogo === "function") {
              cargarCatalogo();
            }
          };
          document.body.appendChild(script);
        }, 200);
      }

      // 🔸 Cargar carrito de compras si aplica
      if (ruta.includes("carritoCompras.html")) {
        const script = document.createElement("script");
        script.src = "/javaResoft/carritoCompras.js";
        script.onload = () => {
          console.log("🛒 carritoCompras.js cargado dinámicamente");
          setTimeout(() => {
            if (typeof mostrarCarrito === "function") mostrarCarrito();
          }, 200);
        };
        document.body.appendChild(script);
      }

      // 🔸 Reinicializar menú hamburguesa (por si cambia el DOM)
      inicializarMenuHamburguesa();

    } catch (err) {
      console.error("❌ Error SPA:", err);
      document.querySelector('#contenido').innerHTML =
        '<p class="text-center text-danger mt-5">Error al cargar la página 😢</p>';
    }
  });
});


// ⚙️ Menú hamburguesa moderno y responsivo
function inicializarMenuHamburguesa() {
  const btnMenu = document.getElementById("btn-menu");
  const menuLateral = document.getElementById("menuLateral");
  const cerrarMenu = document.getElementById("cerrarMenu");

  if (!btnMenu || !menuLateral) return; // Evita errores si no existen

  // Evita duplicar eventos al recargar secciones
  btnMenu.replaceWith(btnMenu.cloneNode(true));
  const nuevoBtnMenu = document.getElementById("btn-menu");

  nuevoBtnMenu.addEventListener("click", () => {
    menuLateral.classList.toggle("mostrar");
    document.body.style.overflow = menuLateral.classList.contains("mostrar")
      ? "hidden"
      : "auto";
  });

  // Cerrar con el botón "X"
  if (cerrarMenu) {
    cerrarMenu.addEventListener("click", () => {
      menuLateral.classList.remove("mostrar");
      document.body.style.overflow = "auto";
    });
  }

  // Cerrar al hacer clic fuera del menú
  document.addEventListener("click", (e) => {
    if (!menuLateral.contains(e.target) && !nuevoBtnMenu.contains(e.target)) {
      menuLateral.classList.remove("mostrar");
      document.body.style.overflow = "auto";
    }
  });
}

// 🧩 Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", inicializarMenuHamburguesa);
