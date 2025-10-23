document.addEventListener('DOMContentLoaded', () => {
  // elementos foto
  const btnCambiarFoto = document.getElementById('btnCambiarFoto');
  const inputFoto = document.getElementById('inputFoto');
  const fotoPerfil = document.getElementById('fotoPerfil');

  if (btnCambiarFoto && inputFoto) {
    btnCambiarFoto.addEventListener('click', () => inputFoto.click());
  }

  let currentObjectUrl = null;
  if (inputFoto && fotoPerfil) {
    inputFoto.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = URL.createObjectURL(file);
      fotoPerfil.src = currentObjectUrl;
    });
  }

  // elementos info
  const btnEditarPerfil = document.getElementById('btnEditarPerfil');
  const infoControls = document.getElementById('infoControls');
  const btnSaveInfo = document.getElementById('btnSaveInfo');
  const btnCancelInfo = document.getElementById('btnCancelInfo');

  const campos = {
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    telefono: document.getElementById('telefono'),
    direccion: document.getElementById('direccion')
  };

  // Guardar copia original para cancelar
  let original = {};

  function enableEdit(enable) {
    Object.values(campos).forEach(input => {
      if (!input) return;
      input.readOnly = !enable;
      input.classList.toggle('bg-white', enable);
      input.classList.toggle('bg-white', !enable);
    });
    if (infoControls) infoControls.classList.toggle('hidden', !enable);
  }

  function saveOriginal() {
    Object.keys(campos).forEach(k => {
      const el = campos[k];
      original[k] = el ? el.value : '';
    });
  }

  function restoreOriginal() {
    Object.keys(campos).forEach(k => {
      const el = campos[k];
      if (el) el.value = original[k] ?? el.value;
    });
  }

  // Manejo clic en "Editar perfil" tarjeta: activa edición inline
  if (btnEditarPerfil) {
    btnEditarPerfil.addEventListener('click', (e) => {
      e.preventDefault();
      // si ya está en edición, no navegar; activamos edición
      saveOriginal();
      enableEdit(true);
      // poner foco en primer campo
      campos.nombre?.focus();
    });
  }

  // Guardar cambios inline
  if (btnSaveInfo) {
    btnSaveInfo.addEventListener('click', () => {
      enableEdit(false);
      // aquí puedes enviar los datos al servidor con fetch si quieres
      alert('✅ Cambios guardados.');
    });
  }

  // Cancelar edición
  if (btnCancelInfo) {
    btnCancelInfo.addEventListener('click', () => {
      restoreOriginal();
      enableEdit(false);
    });
  }

  // Action-cards navegación (usar data-url)
  document.querySelectorAll('.mi-cuenta-actions .action-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const url = card.dataset.url;
      if (!url) return;
      // si es editar perfil, ya manejado por btnEditarPerfil; si se desea también permitir, detectamos:
      if (url === '/mi_datos') {
        btnEditarPerfil?.click();
        return;
      }
      // navegar a la url (relativa)
      window.location.href = url;
    });
  });
});