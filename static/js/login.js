// 🌸 Script principal del Login de Florería Manu
document.addEventListener('DOMContentLoaded', function () {

  // --- Referencias ---
  const loginForm = document.getElementById('loginForm');
  const usuarioInput = document.getElementById('usuario');
  const contrasenaInput = document.getElementById('contrasena');
  const recordarmeCheckbox = document.getElementById('recordarme');
  const invitadoBtn = document.getElementById('invitadoBtn');

  // --- Mostrar mensajes flotantes ---
  function mostrarMensaje(mensaje, tipo = 'info') {
    const div = document.createElement('div');
    div.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 ${
      tipo === 'error' ? 'bg-red-500' :
      tipo === 'success' ? 'bg-green-500' :
      'bg-blue-500'
    }`;
    div.textContent = mensaje;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }

  // --- Validar formulario ---
  function validarFormulario() {
    const usuario = usuarioInput.value.trim();
    const contrasena = contrasenaInput.value.trim();

    if (!usuario) {
      mostrarMensaje('Ingresa tu usuario o email', 'error');
      usuarioInput.focus();
      return false;
    }
    if (!contrasena) {
      mostrarMensaje('Ingresa tu contraseña', 'error');
      contrasenaInput.focus();
      return false;
    }
    if (contrasena.length < 6) {
      mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
      contrasenaInput.focus();
      return false;
    }
    return true;
  }

  // --- Login ---
  function manejarLogin(e) {
    if (!validarFormulario()) {
      e.preventDefault(); // Solo evita envío si hay error
      return;
    }

    // Mostrar mensaje de carga antes de enviar
    mostrarMensaje('Iniciando sesión...', 'info');

    // El formulario se envía normalmente a Flask
    // No usamos e.preventDefault() aquí para que Flask lo reciba
  }

  // --- Ingreso como invitado ---
  function manejarInvitado() {
    mostrarMensaje('Ingresando como invitado...', 'info');
    setTimeout(() => {
      mostrarMensaje('¡Bienvenido como invitado!', 'success');
      window.location.href = '/'; // Redirige al home
    }, 1000);
  }

  // --- Validación en tiempo real ---
  function validacionTiempoReal() {
    usuarioInput.addEventListener('input', function () {
      this.classList.toggle('border-green-600', this.value.trim().length >= 3);
      this.classList.toggle('border-red-500', this.value.trim().length > 0 && this.value.trim().length < 3);
    });

    contrasenaInput.addEventListener('input', function () {
      this.classList.toggle('border-green-600', this.value.trim().length >= 6);
      this.classList.toggle('border-red-500', this.value.trim().length > 0 && this.value.trim().length < 6);
    });
  }

  // --- Eventos ---
  loginForm.addEventListener('submit', manejarLogin);
  invitadoBtn.addEventListener('click', manejarInvitado);

  // --- Inicializar ---
  validacionTiempoReal();

  console.log('🌸 Login de Florería Manu cargado correctamente');
});
