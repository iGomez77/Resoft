document.getElementById('btn-carrito').addEventListener('click', () => {
  fetch('/htmlResoft/carritoCompras.html')
    .then(res => {
      if (!res.ok) throw new Error('No se pudo cargar el carrito');
      return res.text();
    })
    .then(html => {
      document.querySelector('main').innerHTML = html;
    })
    .catch(err => {
      console.error(' Error cargando carrito:', err);
      document.querySelector('main').innerHTML = '<p>Error al cargar el carrito </p>';
    });
});
