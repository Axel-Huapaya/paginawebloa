const chat = document.getElementById("chat");

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.className = "mb-2";
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (userText === "") return;

  appendMessage("Tú", userText);
  input.value = "";

  setTimeout(() => {
    let botResponse = "Lo siento, no entendí tu pregunta.";
    const lower = userText.toLowerCase();

    if (lower.includes("descuentos esta semana")) botResponse = "Esta semana tenemos un 30% de descuento con el código 'SoyChatBot'" ;
    else if (lower.includes("ubicados")) botResponse = "Estamos en la Provincia de Cañete, en San Vicente, para ser especifico en el paradero de la A en el ovalo ";
    else if (lower.includes("más pedidos")) botResponse = "El arreglo floral más pedido hasta el momento es el 'corazón de jardin'";
    else if (lower.includes("en espera")) botResponse = "Puedes llegar a hacer un pedido en un dia cualquiera y tu mismo programar el dia de entrega";
    else if (lower.includes("descuentos")) botResponse = "Al adquirir muchos ramos en nuestra tienda, el cliente podra tener un descuento depende de cuantos ramos compre";
    else if (lower.includes("fotografía")) botResponse = "Sí, ofrecemos servicio de fotografía profesional.";
    else if (lower.includes("premium")) botResponse = "El paquete premium incluye todo lo básico más DJ, luces y video.";
    else if (lower.includes("cuotas")) botResponse = "Sí, puedes pagar en 2 o 3 cuotas sin intereses.";

    appendMessage("ParaBot", botResponse);
  }, 600);
}

function quickReply(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}
