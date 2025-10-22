document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaFavoritos");
  const template = document.getElementById("templateFavorito");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    lista.innerHTML = '<p class="text-center text-gray-500">No tienes productos en favoritos</p>';
    return;
  }

  favoritos.forEach(producto => {
    // Clonamos el template
    const clone = template.content.cloneNode(true);

    // Rellenamos los datos
    clone.querySelector(".imagen").src = producto.imagen;
    clone.querySelector(".imagen").alt = producto.nombre;
    clone.querySelector(".nombre").textContent = producto.nombre;
    clone.querySelector(".precio").textContent = producto.precio;

    // Agregamos evento para eliminar
    clone.querySelector(".eliminar").addEventListener("click", (e) => {
      const nuevosFavoritos = favoritos.filter(f => f.nombre !== producto.nombre);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      e.target.closest(".producto-favorito").remove();

      if (nuevosFavoritos.length === 0) {
        lista.innerHTML = '<p class="text-center text-gray-500">No tienes productos en favoritos 💔</p>';
      }
    });

    // Añadimos el clon a la lista
    lista.appendChild(clone);
  });
});
