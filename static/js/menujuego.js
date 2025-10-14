document.addEventListener("DOMContentLoaded", () => {
  const characters = document.querySelectorAll(".character");
  const gameArea = document.getElementById("gameArea");
  const characterSelect = document.getElementById("characterSelect");
  const messageBox = document.getElementById("message");

  characters.forEach((char) => {
    char.addEventListener("click", () => {
      const selectedCharacter = char.getAttribute("data-character");

      // Oculta selección y muestra juego
      characterSelect.style.display = "none";
      gameArea.style.display = "block";
      messageBox.style.display = "none";

      // Inicia el juego con el personaje elegido
      startGame(selectedCharacter);
    });
  });
});
