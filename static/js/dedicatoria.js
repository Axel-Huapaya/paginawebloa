const dedicatorias = {
  sanvalentin: [
    "Contigo, cada día es San Valentín.",
    "Eres mi mejor regalo.",
    "Nuestro amor florece sin estación.",
    "Cada pétalo me recuerda a ti.",
    "Eres mi jardín eterno.",
    "Gracias por hacerme sentir especial."
  ],
  madre: [
    "Tu amor es el perfume que da vida a cada día.",
    "Gracias por ser mi raíz.",
    "Tu abrazo cura todo.",
    "Madre, tu amor florece en mí.",
    "Gracias por cada sacrificio silencioso."
  ],
  navidad: [
    "Que la magia de esta noche llene tu corazón de paz.",
    "Tu presencia es el mejor regalo bajo mi árbol.",
    "Navidad es más bonita cuando estás cerca.",
    "Que la esperanza florezca en tu hogar.",
    "Feliz Navidad, flor de mi vida."
  ],
  cumple: [
    "Hoy florece una nueva versión de ti: más fuerte, más brillante.",
    "Que cada año te regale pétalos de alegría.",
    "Tu vida es un regalo que merece celebrarse siempre.",
    "Tu sonrisa merece mil amaneceres.",
    "Feliz vuelta al sol, alma hermosa."
  ],
  aniversario: [
    "Cada día contigo es una flor que nunca se cierra.",
    "Nuestro amor florece con cada año compartido.",
    "Gracias por caminar a mi lado con ternura.",
    "Tu amor es mi raíz más fuerte.",
    "Gracias por hacerme florecer cada día contigo."
  ],
  amistad: [
    "Tu amistad es el sol que ilumina mis días nublados.",
    "Gracias por estar cuando nadie más lo hace.",
    "Eres el pétalo que nunca se cae de mi jardín.",
    "Tu risa es mi medicina favorita.",
    "Tu compañía es mi mejor regalo."
  ]
};

const tipoSelect = document.getElementById("tipoDedicatoria");
const listaSelect = document.getElementById("listaDedicatorias");

tipoSelect.addEventListener("change", () => {
  const tipo = tipoSelect.value;
  listaSelect.innerHTML = '<option value="">Selecciona una dedicatoria...</option>';

  if (dedicatorias[tipo]) {
    dedicatorias[tipo].forEach(texto => {
      const option = document.createElement("option");
      option.value = texto;
      option.textContent = texto;
      listaSelect.appendChild(option);
    });
  }
});
