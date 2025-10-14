// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los campos
    const registroForm = document.getElementById('registroForm');
    const nombreCompletoInput = document.getElementById('nombreCompleto');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const contrasenaInput = document.getElementById('contrasena');
    const confirmarContrasenaInput = document.getElementById('confirmarContrasena');
    const terminosCheckbox = document.getElementById('terminos');

    // Mostrar mensajes simples en pantalla
    function mostrarMensaje(mensaje, tipo = 'info') {
        const div = document.createElement('div');
        div.className = `fixed top-4 right-4 p-3 rounded text-white z-50 ${
            tipo === 'error' ? 'bg-red-500' :
            tipo === 'success' ? 'bg-green-500' : 'bg-blue-500'
        }`;
        div.textContent = mensaje;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 2500);
    }

    // Validar email
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Validar teléfono
    function validarTelefono(tel) {
        return /^[\+]?[0-9]{6,15}$/.test(tel);
    }

    // Validar todo el formulario
    function validarFormulario() {
        const nombre = nombreCompletoInput.value.trim();
        const email = emailInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const contrasena = contrasenaInput.value.trim();
        const confirmar = confirmarContrasenaInput.value.trim();

        if (!nombre) return mostrarMensaje('Ingresa tu nombre completo', 'error'), false;
        if (nombre.length < 2) return mostrarMensaje('El nombre es muy corto', 'error'), false;
        if (!email || !validarEmail(email)) return mostrarMensaje('Email inválido', 'error'), false;
        if (!telefono || !validarTelefono(telefono)) return mostrarMensaje('Teléfono inválido', 'error'), false;
        if (contrasena.length < 8) return mostrarMensaje('La contraseña debe tener al menos 8 caracteres', 'error'), false;
        if (contrasena !== confirmar) return mostrarMensaje('Las contraseñas no coinciden', 'error'), false;
        if (!terminosCheckbox.checked) return mostrarMensaje('Debes aceptar los términos y condiciones', 'error'), false;
        return true;
    }

    // Envío del formulario
    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validarFormulario()) return;
        mostrarMensaje('Creando cuenta...', 'info');
        setTimeout(() => {
            mostrarMensaje('¡Registro exitoso! Bienvenido a Florería Manu', 'success');
            registroForm.reset();
        }, 1500);
    });

    // Validación en tiempo real (sin movimientos)
    function validacionTiempoReal() {
        const validarBorde = (input, condicion) => {
            input.classList.toggle('border-green-500', condicion);
            input.classList.toggle('border-red-500', !condicion && input.value.trim() !== '');
        };

        nombreCompletoInput.addEventListener('input', () =>
            validarBorde(nombreCompletoInput, nombreCompletoInput.value.length >= 2)
        );
        emailInput.addEventListener('input', () =>
            validarBorde(emailInput, validarEmail(emailInput.value))
        );
        telefonoInput.addEventListener('input', () =>
            validarBorde(telefonoInput, validarTelefono(telefonoInput.value))
        );
        contrasenaInput.addEventListener('input', () =>
            validarBorde(contrasenaInput, contrasenaInput.value.length >= 8)
        );
        confirmarContrasenaInput.addEventListener('input', () =>
            validarBorde(confirmarContrasenaInput, confirmarContrasenaInput.value === contrasenaInput.value)
        );
    }

    validacionTiempoReal();

    console.log('🌸 Sistema de registro cargado sin animaciones');
});

