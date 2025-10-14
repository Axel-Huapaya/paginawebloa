const heartIcons = document.querySelectorAll('.heartIcon');

heartIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    const isFilled = icon.src.includes('favorito-rojo.png');

    icon.src = isFilled
      ? 'static/image/logos/favorito2.png'
      : 'static/image/logos/favorito-rojo.png';
  });
});
