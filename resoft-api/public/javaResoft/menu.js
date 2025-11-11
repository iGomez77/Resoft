
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const page = link.getAttribute("data-page");
      window.location.href = page; // Redirige al catálogo con la categoría seleccionada
    });
  });
});
