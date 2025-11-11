window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');

  if (window.scrollY > 50) {
    header.classList.add('scrolled'); // se vuelve translúcido
  } else {
    header.classList.remove('scrolled'); // vuelve al azul sólido
  }
});



