 
   document.addEventListener('click', async function (e) {
  const enlace = e.target.closest('a[data-page]');
  if (enlace) {
    e.preventDefault();
    const pagina = enlace.dataset.page; 
    const respuesta = await fetch(pagina); 
    const html = await respuesta.text(); 
    contenido.innerHTML = html; 
  }
});
 

 // ABRIL MODAL //
  function abrirModal() {
    document.getElementById('modalBusqueda').style.display = 'block';
    document.getElementById('inputBusqueda').focus();
  }
  function cerrarModal() {
    document.getElementById('modalBusqueda').style.display = 'none';
  }
  function buscarProducto() {
    const texto = document.getElementById('inputBusqueda').value.trim().toLowerCase();
    if (texto) {
      cerrarModal();
      // Aquí puedes redirigir o filtrar productos //
    } else {
      alert("Escribe algo para buscar");
    }
  }

  // CERRAR CONTENIDO//
  window.onclick = function (event) {
    const modal = document.getElementById('modalBusqueda');
    if (event.target == modal) {
      cerrarModal();
    }
  }


 // MENU LATERAL//
    const btnMenu = document.getElementById("btn-menu");
    const menuLateral = document.getElementById("menuLateral");
    const cerrarMenu = document.getElementById("cerrarMenu");
    btnMenu.addEventListener("click", () => {
      menuLateral.classList.add("mostrar");
    });
    cerrarMenu.addEventListener("click", () => {
      menuLateral.classList.remove("mostrar");
    });


    // RELOJ
    function actualizarReloj() {
      const ahora = new Date();
      const horas = ahora.getHours().toString().padStart(2, '0');
      const minutos = ahora.getMinutes().toString().padStart(2, '0');
      const segundos = ahora.getSeconds().toString().padStart(2, '0');
    document.getElementById('reloj').textContent = `${horas}:${minutos}:${segundos}`;}setInterval(actualizarReloj, 1000);actualizarReloj();


    // ACCESIBILIDAD
    document.getElementById('btn-accesibilidad').addEventListener('click', () => {
      document.getElementById('opciones-accesibilidad').classList.toggle('oculto');
    });
    document.getElementById('contraste').addEventListener('click', () => {
      document.body.style.backgroundColor = "blue";
      document.body.style.color = "yellow";
      document.querySelectorAll('button').forEach(btn => {
        btn.style.backgroundColor = 'yellow';
        btn.style.color = 'black';
      });
    });
    document.getElementById('aumentar').addEventListener('click', () => {
      document.body.style.fontSize = "20px";
      document.querySelectorAll('.reloj').forEach(el => el.style.fontSize = "100px");
    });
    document.getElementById('restablecer').addEventListener('click', () => {
      document.body.style = "";
      document.querySelectorAll('.reloj').forEach(el => el.style.fontSize = "35px");
      document.querySelectorAll('button').forEach(btn => btn.style = "");
    });
  

