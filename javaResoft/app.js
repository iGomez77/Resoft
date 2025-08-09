document.getElementById('btn-carrito').addEventListener('click', () => {
  fetch('carritoCompras.html')
    .then(res => res.text())
    .then(html => {
      document.querySelector('main').innerHTML = html;
      
    });
});
