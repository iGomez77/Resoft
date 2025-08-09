// VALIDACION DE DATOS INGRESADOS INICIO SESION
const usuariosValidos = [
  { usuario: "admin@outlook.com", contraseña: "1234" },
  { usuario: "ivan@outlook.com", contraseña: "0000" }
];


document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("contenido");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    // VALORES DEL FORMULARIO
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // COMPARACION DE COINCIDENCIAS
    const usuarioValido = usuariosValidos.find(
      u => u.usuario === email && u.contraseña === password
    );

    if (usuarioValido) {
      fetch("./htmlResoft/perfil.html")
        .then(res => res.text())
        .then(html => {
          document.getElementById("contenido").innerHTML = html;

          // OCULTA MENU
          const menu = document.getElementById("menuLateral");
          if (menu) menu.classList.add("oculto");

          
          window.scrollTo(0, 0);
        })
        .catch(err => {
          console.error("Error al cargar perfil.html:", err);
        });
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
});
