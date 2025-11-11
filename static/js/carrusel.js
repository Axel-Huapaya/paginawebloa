document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.getElementById("slider-container");
  const slides = sliderContainer.children;
  const totalSlides = slides.length;
  let currentIndex = 0;

  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  // Función para mostrar el slide actual
  function showSlide(index) {
    const offset = -index * 100;
    sliderContainer.style.transform = `translateX(${offset}%)`;
  }

  // Botón siguiente
  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  });

  // Botón anterior
  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  });

  // Auto-cambio cada 5 segundos
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }, 5000);
});
