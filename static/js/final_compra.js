document.addEventListener("DOMContentLoaded", () => {
  // ✅ Mostrar animación de éxito y redirigir
  const overlay = document.getElementById("success-overlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.classList.add("animate-fade-in");

    // Redirigir después de 2.5 segundos
    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  }

  // ✅ Establecer fecha mínima (hoy) para entrega
  const fechaInput = document.getElementById("fecha_entrega");
  if (fechaInput) {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    fechaInput.min = `${año}-${mes}-${dia}`;
  }
});

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre");
    const precio = params.get("precio");
    const imagen = params.get("imagen");

    if (nombre && precio && imagen) {
      // Mostrar la sección
      const contenedor = document.getElementById("productoSeleccionado");
      contenedor.classList.remove("hidden");


      document.getElementById("nombreProducto").textContent = nombre;
      document.getElementById("precioProducto").textContent = `S/${precio}`;
      document.getElementById("imagenProducto").src = "/" + imagen;

      document.getElementById("inputNombreProducto").value = nombre;
      document.getElementById("inputPrecioProducto").value = precio;
      document.getElementById("inputImagenProducto").value = imagen;
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
  const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));

  if (producto) {
    document.getElementById("productoSeleccionado").classList.remove("hidden");
    document.getElementById("imagenProducto").src = producto.imagen;
    document.getElementById("nombreProducto").textContent = producto.nombre;
    document.getElementById("precioProducto").textContent = "S/ " + producto.precio;

    document.getElementById("inputNombreProducto").value = producto.nombre;
    document.getElementById("inputPrecioProducto").value = producto.precio;
    document.getElementById("inputImagenProducto").value = producto.imagen;
  }
});

 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", () => {
    const nombre = document.getElementById("inputNombreProducto").value;
    const precio = parseFloat(document.getElementById("inputPrecioProducto").value);
    const imagen = document.getElementById("inputImagenProducto").value;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const nuevoPedido = {
      nombre: nombre || "Producto sin nombre",
      precio: precio || 0,
      imagen: imagen || "{{ url_for('static', filename='image/logos/logo_empresa.png') }}",
      estado: "En proceso",
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
    };

    carrito.push(nuevoPedido);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.log("✅ Pedido guardado en carrito:", nuevoPedido);
  });
});
