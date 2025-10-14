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
        overlay.remove();
    });

    // Acción al hacer clic en "No"
    btnNo.addEventListener('click', () => {
        window.location.href = 'normal'; // lo llevara a la sección donde interactua de una forma normal
    });
});
