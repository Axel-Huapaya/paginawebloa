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