
  const carousel = document.querySelector('.carousel-track');
  const container = document.querySelector('.carousel-container');
  const images = carousel.querySelectorAll('img');
  const totalSlides = images.length;
  let currentIndex = 0;
  let autoSlide;

  function updateCarousel() {
    const imageWidth = images[0].clientWidth;
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function startCarousel() {
    stopCarousel(); // evita múltiples intervalos
    autoSlide = setInterval(nextSlide, 3000);
  }

  function stopCarousel() {
    clearInterval(autoSlide);
  }

  // Inicia el carrusel
  startCarousel();

  // Pausa al pasar el mouse sobre el contenedor
  container.addEventListener('mouseenter', stopCarousel);
  container.addEventListener('mouseleave', startCarousel);

  // Ajusta el carrusel si cambia el tamaño de la ventana
  window.addEventListener('resize', updateCarousel);
