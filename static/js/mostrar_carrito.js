document.addEventListener("DOMContentLoaded", () => {
  const listaCarrito = document.getElementById("listaCarrito");
  const template = document.getElementById("templateCarrito");
  const totalGeneral = document.getElementById("totalGeneral");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Mostrar mensaje si el carrito está vacío
  if (carrito.length === 0) {
    listaCarrito.innerHTML = `<p class="text-center text-gray-500 italic">No hay pedidos en proceso aún.</p>`;
    totalGeneral.textContent = "S/ 0.00";
    return;
  }

  // Mostrar los pedidos
  carrito.forEach((pedido, index) => {
    const clone = template.content.cloneNode(true);
    const imagen = clone.querySelector(".imagen");
    const nombre = clone.querySelector(".nombre");
    const precio = clone.querySelector(".precio");
    const estado = clone.querySelector(".estado");
    const fecha = clone.querySelector(".fecha");
    const btnEliminar = clone.querySelector(".eliminar");

    imagen.src = pedido.imagen;
    nombre.textContent = pedido.nombre;
    precio.textContent = `S/ ${pedido.precio.toFixed(2)}`;
    estado.textContent = `Estado: ${pedido.estado}`;
    estado.classList.add(
      pedido.estado === "En proceso" ? "text-yellow-600" : "text-green-600"
    );
    fecha.textContent = `Fecha: ${pedido.fecha} - ${pedido.hora}`;

    // Eliminar pedido del carrito
    btnEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      location.reload();
    });

    listaCarrito.appendChild(clone);
  });

  // Calcular total general
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  totalGeneral.textContent = `S/ ${total.toFixed(2)}`;
});
