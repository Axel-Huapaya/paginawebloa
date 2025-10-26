document.addEventListener('DOMContentLoaded', () => {
  const btnEditarPerfil = document.getElementById('btnEditarPerfil');
  const infoControls = document.getElementById('infoControls');
  const btnCancelInfo = document.getElementById('btnCancelInfo');

  const campos = ['nombre','apellido','telefono','direccion'].map(id => document.getElementById(id));
  let original = {};

  function enableEdit(enable) {
    campos.forEach(input => input.readOnly = !enable);
    infoControls.classList.toggle('hidden', !enable);
  }

  btnEditarPerfil.addEventListener('click', (e) => {
    e.preventDefault();
    campos.forEach(input => original[input.id] = input.value);
    enableEdit(true);
    campos[0].focus();
  });

  btnCancelInfo.addEventListener('click', () => {
    campos.forEach(input => input.value = original[input.id]);
    enableEdit(false);
  });
});
