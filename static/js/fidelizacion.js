function toggleSello(id) {
  const cuadro = document.getElementById(id);
  const svg = cuadro.querySelector('svg');

  if (svg) {
    // Si tiene el check, lo quita
    cuadro.removeChild(svg);
    cuadro.classList.remove('text-green-600', 'font-bold'); // Elimina clases de Tailwind
  } else {
    // Si no tiene el check, lo añade
    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("class", "h-6 w-6");
    newSvg.setAttribute("fill", "none");
    newSvg.setAttribute("viewBox", "0 0 24 24");
    newSvg.setAttribute("stroke", "currentColor");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", "M5 13l4 4L19 7");

    newSvg.appendChild(path);
    cuadro.appendChild(newSvg);
    cuadro.classList.add('text-green-600', 'font-bold'); // Añade clases de Tailwind
  }
}