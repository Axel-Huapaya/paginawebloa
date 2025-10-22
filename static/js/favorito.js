document.addEventListener("DOMContentLoaded", () => {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  document.querySelectorAll(".favorito").forEach(icon => {
    const nombre = icon.dataset.nombre;


    //Si el producto ya esta en favorito, se mantiene el icono de color rojo
    if (favoritos.find(f => f.nombre === nombre)) {
      icon.src ="static/image/logos/favorito-rojo.png";
    }

    icon.addEventListener("click", () => {
      const producto = {
        nombre: icon.dataset.nombre,
        imagen: icon.dataset.imagen,
        precio: icon.dataset.precio
      };

      const index = favoritos.findIndex(f => f.nombre === producto.nombre);

      if (index === -1) {
        //Agregar a la sección de favoritos
        favoritos.push(producto);
        icon.src = "static/image/logos/favorito-rojo.png";
      } else {
        //Eliminar de la sección de favoritos
        favoritos.splice(index, 1);
        icon.src = "static/image/logos/favorito.png";
      }

      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    })
  });
});