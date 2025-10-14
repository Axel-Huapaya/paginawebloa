let canvas, ctx; // Lienzo del juego y su contexto 2D
let player, obstacles, flowers; // Objetos principales: jugador, obstáculos y flores
let score, lives, discount; // Variables para puntaje, vidas y descuento
let playerImage, flowerImage, obstacleImage, backgroundImage; // Imágenes del juego

const groundLevel = 80; // Define la altura del suelo

function startGame(characterSrc) { // Inicia el juego con el personaje seleccionado
  canvas = document.getElementById("gameCanvas"); // Obtiene el canvas del HTML
  ctx = canvas.getContext("2d"); // Crea el contexto 2D para dibujar

  backgroundImage = new Image(); // Crea imagen de fondo
  backgroundImage.src = "static/image/fondos/fondo-juego.png"; // Ruta del fondo

  playerImage = new Image(); // Crea imagen del jugador
  playerImage.src = characterSrc; // Usa el personaje elegido

  flowerImage = new Image(); // Crea imagen de flor
  flowerImage.src = "static/image/logos/flor.png"; // Ruta de flor

  obstacleImage = new Image(); // Crea imagen de obstáculo
  obstacleImage.src = "static/image/logos/tijera.png"; // Ruta de obstáculo

  let loaded = 0; // Contador de imágenes cargadas
  const total = 4; // Total de imágenes a cargar
  [backgroundImage, playerImage, flowerImage, obstacleImage].forEach(img => { // Recorre todas las imágenes
    img.onload = () => { // Cuando cada imagen carga
      loaded++; // Suma 1
      if (loaded === total) { // Si ya se cargaron todas
        resetGame(); // Reinicia variables
        requestAnimationFrame(updateGame); // Inicia el bucle principal
      }
    };
  });

  document.addEventListener("keydown", handleKey); // Detecta teclas presionadas
  document.addEventListener("keyup", handleKey); // Detecta teclas soltadas

  document.getElementById("restartBtn").addEventListener("click", () => { // Botón volver a jugar
    document.getElementById("message").style.display = "none"; // Oculta mensaje final
    document.getElementById("characterSelect").style.display = "block"; // Muestra selección de personaje
    document.getElementById("gameArea").style.display = "none"; // Oculta área de juego
  });
}

function resetGame() { // Reinicia variables del juego
  player = { // Define propiedades del jugador
    x: 50, // Posición horizontal
    y: canvas.height - groundLevel - 60, // Posición vertical
    width: 50, // Ancho del jugador
    height: 60, // Alto del jugador
    dy: 0, // Velocidad vertical
    dx: 0, // Velocidad horizontal
    gravity: 1.5, // Gravedad
    jumpPower: -18, // Fuerza del salto
    grounded: true, // Está en el suelo
    speed: 5 // Velocidad de movimiento lateral
  };

  obstacles = []; // Limpia los obstáculos
  flowers = []; // Limpia las flores
  score = 0; // Reinicia el puntaje
  lives = 2; // Reinicia las vidas
  discount = 0; // Reinicia el descuento
  gamePaused = false; // Quita la pausa

  updateHUD(); // Actualiza los datos en pantalla
}

function updateHUD() { // Muestra valores en pantalla
  document.getElementById("flowers").innerText = score; // Puntaje
  document.getElementById("lives").innerText = lives; // Vidas
  document.getElementById("percent").innerText = discount + "%"; // Descuento
}

function handleKey(e) { // Controla el teclado
  if (e.type === "keydown") { // Si se presiona una tecla
    if (e.code === "ArrowRight") player.dx = player.speed; // Mover derecha
    if (e.code === "ArrowLeft") player.dx = -player.speed; // Mover izquierda
    if ((e.code === "Space" || e.code === "ArrowUp") && player.grounded) { // Saltar
      player.dy = player.jumpPower; // Aplica salto
      player.grounded = false; // Ya no está en suelo
    }
  }
  if (e.type === "keyup") { // Si se suelta tecla
    if (e.code === "ArrowRight" || e.code === "ArrowLeft") player.dx = 0; // Detener movimiento
  }
}

function updateGame() { // Bucle principal del juego
  if (gamePaused) return; // Si está pausado, no ejecuta

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Dibuja el fondo

  player.x += player.dx; // Mueve horizontalmente
  if (player.x < 0) player.x = 0; // Evita salir del borde izquierdo
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width; // Evita salir del derecho

  player.y += player.dy; // Mueve verticalmente
  player.dy += player.gravity; // Aplica gravedad

  if (player.y + player.height >= canvas.height - groundLevel) { // Si toca el suelo
    player.y = canvas.height - groundLevel - player.height; // Ajusta posición
    player.dy = 0; // Detiene caída
    player.grounded = true; // Marca que está en el suelo
  }

  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height); // Dibuja jugador

  if (Math.random() < 0.02) { // Probabilidad de crear obstáculo
    obstacles.push({ // Crea obstáculo
      x: canvas.width, // Posición inicial derecha
      y: canvas.height - groundLevel - 40, // Altura sobre el suelo
      width: 40, // Ancho
      height: 40 // Alto
    });
  }

  obstacles.forEach((obs, i) => { // Recorre obstáculos
    obs.x -= 5; // Mueve hacia la izquierda
    ctx.drawImage(obstacleImage, obs.x, obs.y, obs.width, obs.height); // Dibuja obstáculo

    if ( // Detecta colisión jugador-obstáculo
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      lives--; // Resta una vida
      obstacles.splice(i, 1); // Elimina obstáculo
      updateHUD(); // Actualiza pantalla
      if (lives <= 0) endGame(); // Si no hay vidas, termina
    }
  });

  if (Math.random() < 0.02) { // Probabilidad de crear flor
    flowers.push({ // Crea flor
      x: canvas.width, // Posición derecha
      y: canvas.height - groundLevel - 60, // Altura
      width: 30, // Ancho
      height: 30 // Alto
    });
  }

  flowers.forEach((fl, i) => { // Recorre flores
    fl.x -= 5; // Mueve hacia la izquierda
    ctx.drawImage(flowerImage, fl.x, fl.y, fl.width, fl.height); // Dibuja flor

    if ( // Detecta colisión jugador-flor
      player.x < fl.x + fl.width &&
      player.x + player.width > fl.x &&
      player.y < fl.y + fl.height &&
      player.y + player.height > fl.y
    ) {
      score++; // Suma puntaje
      discount = score; // Descuento igual a flores
      flowers.splice(i, 1); // Elimina flor
      updateHUD(); // Actualiza pantalla
    }
  });

  requestAnimationFrame(updateGame); // Llama de nuevo al bucle
}

function endGame() { // Termina el juego
  gamePaused = true; // Pausa el juego
  document.getElementById("message").style.display = "flex"; // Muestra mensaje final
  document.getElementById("finalText").innerText = // Texto con resultados
    `Agarraste ${score} flores y obtuviste ${discount}% de descuento.`; // Resultado final
}
