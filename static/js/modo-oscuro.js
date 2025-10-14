document.addEventListener('DOMContentLoaded', function () {
  const STORAGE_KEY = 'floriamanu-dark';
    const toggle = document.getElementById('toggle');
  const body = document.body;
    const themedImages = Array.from(document.querySelectorAll('img[data-light][data-dark]'));
  const themeIcon = document.getElementById('themeIcon')

  // 🔹 Aplicar inmediatamente si el modo oscuro está activado en localStorage
  if (localStorage.getItem(STORAGE_KEY) === 'enabled') {
    body.classList.add('dark-mode');
  }



  // Añade clase "auto-invert" a imágenes de navegación que no tengan data
  document.querySelectorAll('img.nav-logo').forEach(img => {
    if (!img.dataset.light || !img.dataset.dark) {
      img.classList.add('auto-invert');
    }
  });

  function applyMode(enabled, save = true) {
    if (enabled) {
      body.classList.add('dark-mode');
      if (toggle) toggle.checked = true;
      // Cambia src de las imágenes con data-*
      themedImages.forEach(img => {
        if (img.dataset.dark) img.src = img.dataset.dark;
      });
      // icono del switch (si existe)
      if (themeIcon && themeIcon.dataset.dark) themeIcon.src = themeIcon.dataset.dark;
      if (save) localStorage.setItem(STORAGE_KEY, 'enabled');
    } else {
      body.classList.remove('dark-mode');
      if (toggle) toggle.checked = false;
      themedImages.forEach(img => {
        if (img.dataset.light) img.src = img.dataset.light;
      });
      if (themeIcon && themeIcon.dataset.light) themeIcon.src = themeIcon.dataset.light;
      if (save) localStorage.setItem(STORAGE_KEY, 'disabled');
    }
  }

  // Estado inicial: localStorage -> preferencia del sistema -> por defecto off
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'enabled') applyMode(true, false);
  else if (stored === 'disabled') applyMode(false, false);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyMode(prefersDark, false);
  }

  // Listener para el checkbox (si existe)
  if (toggle) {
    toggle.addEventListener('change', () => {
      applyMode(toggle.checked, true);
    });
  } else {
    // Fallback: si no hay checkbox, clic sobre el icono alterna el tema
    if (themeIcon) {
      themeIcon.style.cursor = 'pointer';
      themeIcon.addEventListener('click', () => {
        applyMode(!body.classList.contains('dark-mode'), true);
      });
    } else {
      console.warn('Modo oscuro: no se encontró ni #toggle ni #themeIcon.');
    }
  }

  // (Opcional) Observador para cuando aparezcan imágenes dinámicamente
  const mo = new MutationObserver(() => {
    // actualizar themedImages si se agregaron nuevas imágenes con data-*
    // (no necesario en la mayoría de proyectos estáticos)
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
});



