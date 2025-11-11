const loginForm = document.querySelector("#contenido");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await fetch("http://localhost:4000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Error en la conexión");

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (data.success) {
      // Guardar sesión en el navegador
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

     // Redirigir a la tienda principal
      window.location.href = "/";
    } else {
      alert("Correo o contraseña incorrectos");
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    alert("No se pudo conectar con el servidor. Verifica que esté encendido.");
  }
});

// Función que cambia la interfaz al iniciar sesión
function mostrarInterfazSesion(usuario) {
  const contenedor = document.querySelector("#contenido");
  contenedor.innerHTML = `
    <section class="sesion-activa">
        <div class="card-sesion">
            <h6>Bienvenido, ${usuario.nombre}</h6>
            
        </div>
    </section>
  `;

  document.body.style.backgroundColor = "#e8b9ee5d";

  // Botón para cerrar sesión
  const btnCerrarSesion = document.querySelector("#cerrarSesion");
if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.reload();
  });
}

}

// Si hay sesión guardada, cargar directamente la interfaz
document.addEventListener("DOMContentLoaded", () => {
  const usuarioGuardado = localStorage.getItem("usuario");
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    mostrarInterfazSesion(usuario);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  const menuUsuario = document.getElementById("menu-usuario");
  const header = document.querySelector("header");
  const logo = document.querySelector(".logo a");

  if (!menuUsuario || !header || !logo) return; // Evita error si no existen

  if (usuarioGuardado) {
    header.style.backgroundColor = "#6901775d";
    logo.textContent = `Resoft | Bienvenido `;
    menuUsuario.innerHTML = `
  <div class="user-menu">
    <i class="fa-solid fa-circle-user"></i>
    <span class="user-name">${usuarioGuardado.nombre}</span>
    <i class="fa-solid fa-chevron-down arrow"></i>

    <div class="dropdown-user">
      <button id="cerrarSesion" class="btn-logout">
        <i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión
      </button>
    </div>
  </div>
`;

    document.getElementById("cerrarSesion").addEventListener("click", () => {
      localStorage.removeItem("usuario");
      location.reload();
    });
  } else {
    menuUsuario.innerHTML = `
      <a href="/htmlResoft/usuarios.html" class="btn-iniciar-sesion">
        <i class="fa-solid fa-user"></i> Iniciar sesión
      </a>
    `;
  }
});

