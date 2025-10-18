document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('success-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('animate-fade-in');
        // Redirigir después de 2.5 segundos
        setTimeout(() => {
            window.location.href = "/";
        }, 2500);
    }
});