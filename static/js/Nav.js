document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll("section");

  const mostrarSeccion = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeInUp");
        entry.target.classList.remove("opacity-0");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(mostrarSeccion, {
    threshold: 0.2
  });

  secciones.forEach(sec => observer.observe(sec));
});