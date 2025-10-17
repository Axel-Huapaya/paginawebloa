document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");
  const productos = document.querySelectorAll(".producto");

  buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    productos.forEach((producto) => {
      const nombre = producto.querySelector("h4").textContent.toLowerCase();
      if (nombre.includes(texto)) {
        producto.style.display = "block"; // se muestra si coincide
      } else {
        producto.style.display = "none"; // se oculta si no coincide
      }
    });
  });
});
