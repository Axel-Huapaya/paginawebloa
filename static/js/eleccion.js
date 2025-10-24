window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('popupOverlay');
    const btnSi = document.getElementById('btnSi');
    const btnNo = document.getElementById('btnNo');

    // Mostrar popup al cargar
    overlay.classList.remove('hidden');

    // Acción al hacer clic en "Sí"
    btnSi.addEventListener('click', () => {
        const script = document.createElement('script');
        script.src = 'sonido.js'; // archivo de audio
        document.body.appendChild(script);
        
        // Redirigir a la ruta deseada
        window.location.href = '/Sitio_Inclusivo';
    });

    // Acción al hacer clic en "No"
    btnNo.addEventListener('click', () => {
        window.location.href = 'normal'; // lo llevará a la sección normal
    });
});
