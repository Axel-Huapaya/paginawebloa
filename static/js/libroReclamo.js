    const form = document.getElementById('formReclamo');
    const historialDiv = document.getElementById('historial');
    const borrarBtn = document.getElementById('borrarHistorial');

    // Función para mostrar reclamos en pantalla
    function mostrarReclamo(r) {
      const div = document.createElement('div');
      div.className = 'p-4 border border-gray-300 rounded-2xl bg-gray-50';
      div.innerHTML = `
        <p><strong> Fecha:</strong> ${r.fecha}</p>
        <p><strong> Nombre:</strong> ${r.nombre}</p>
        <p><strong> Correo:</strong> ${r.correo}</p>
        <p><strong> Motivo:</strong> ${r.motivo}</p>
        <p><strong> Descripción:</strong> ${r.descripcion}</p>
      `;
      historialDiv.prepend(div);
    }

    // Cargar reclamos guardados al iniciar
    document.addEventListener('DOMContentLoaded', () => {
      const reclamos = JSON.parse(localStorage.getItem('reclamos')) || [];
      reclamos.forEach(r => mostrarReclamo(r));
    });

    // Guardar reclamo al enviar
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const reclamo = {
        nombre: document.getElementById('nombre').value.trim(),
        correo: document.getElementById('correo').value.trim(),
        motivo: document.getElementById('motivo').value,
        descripcion: document.getElementById('descripcion').value.trim(),
        fecha: new Date().toLocaleString()
      };

      if (reclamo.nombre && reclamo.correo && reclamo.descripcion) {
        mostrarReclamo(reclamo);

        // Guardar en localStorage
        const reclamos = JSON.parse(localStorage.getItem('reclamos')) || [];
        reclamos.push(reclamo);
        localStorage.setItem('reclamos', JSON.stringify(reclamos));

        form.reset();
      }
    });

    // Borrar historial
    borrarBtn.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres borrar todos los reclamos?')) {
        localStorage.removeItem('reclamos');
        historialDiv.innerHTML = '';
      }
    });