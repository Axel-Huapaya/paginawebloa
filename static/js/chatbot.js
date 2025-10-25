const chat = document.getElementById("chat");

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.className = "mb-2";
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById("userInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (userText === "") return;

  appendMessage("Tú", userText);
  input.value = "";

  setTimeout(() => {
    let botResponse = "Lo siento, no entendí tu pregunta.";
    const lower = userText.toLowerCase();

    if (lower.includes("descuentos")) botResponse = "Esta semana tenemos un 30% de descuento con el código 'SoyChatBot'" ;
    else if (lower.includes("ubicados")) botResponse = "Estamos en la Provincia de Cañete, en San Vicente, como referencia en el paradero de la A en el ovalo ";
    else if (lower.includes("dejar")) botResponse = "Puedes llegar a hacer un pedido un dia cualquiera y recogerlo en la fecha que desees, siempre y cuando nos avises con anticipación.";
    else if (lower.includes("rebajas")) botResponse ="Puedes llegar a revisar las rebajas y descuentos que tenemos en la pagina principal, ahi encontraras tambien los codigos de descuento.";
    else if (lower.includes("descripción de productos")) botResponse = "Claro, ¿sobre qué producto te gustaría saber más? tenemos diferentes productos dime su nombre y te dare la descripción.";
    // información de las flores
    else if (lower.includes("alma de bosque", "Alma de Bosque", "ALMA DE BOSQUE")) botResponse ="El ramo 'Alma de Bosque' es una encantadora propuesta de opción, este ramo contiene flores de Gladiolo de color blanco lo cual tiene como precio de S/45.00.";
    else if (lower.includes("aurora moderna", "Aurora Moderna", "AURORA MODERNA")) botResponse=" El ramo 'Aurora Moderna' es una encantadora propuesta de opción, este ramo contiene flores Margaritas de color rosa lavanda o lila con centros amarillos, tambien contiene Paniculata o Gypsophila de flores blancas, lo cual tiene como precio de S/37.00.";
    else if (lower.includes("atetish", "Atetish", "ATETISH")) botResponse="El ramo 'Atetish' es una encantadora propuesta de opción, este ramo contiene flores Girasol de color amarillo y Estatice de color morado o lila, lo cual tiene como precio de S/40.00.";
    appendMessage("FloriBot", botResponse);
  }, 600);
}

function quickReply(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}
