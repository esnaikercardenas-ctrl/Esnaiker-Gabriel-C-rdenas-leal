document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registro-form');
    const errorContainer = document.getElementById('error-messages');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        errorContainer.innerHTML = '';
        errorContainer.style.display = 'none';
        let errors = [];

        const nombre = document.getElementById('nombre').value.trim();
        const cedula = document.getElementById('cedula').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const fecha = document.getElementById('fecha').value;

        if (nombre === '') {
            errors.push('El nombre completo es obligatorio.');
        }

        if (cedula === '') {
            errors.push('La cédula o ID es obligatoria.');
        } else if (!/^[0-9]{6,10}$/.test(cedula)) {
            errors.push('La cédula debe contener solo números (entre 6 y 10 dígitos).');
        }

        if (telefono === '') {
            errors.push('El teléfono es obligatorio.');
        } else if (!/^[0-9]{10,11}$/.test(telefono)) {
            errors.push('El formato del teléfono no es válido (Ej: 04141234567).');
        }

        if (email === '') {
            errors.push('El correo electrónico es obligatorio.');
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.push('El formato del correo electrónico no es válido.');
        }

        if (origen === '') {
            errors.push('Debe seleccionar un origen.');
        }

        if (destino === '') {
            errors.push('Debe seleccionar un destino.');
        }

        if (origen !== '' && destino !== '' && origen === destino) {
            errors.push('El origen y el destino no pueden ser iguales.');
        }

        if (fecha === '') {
            errors.push('La fecha de viaje es obligatoria.');
        } else {
            const hoy = new Date();
            const fechaSeleccionada = new Date(fecha + 'T00:00:00-04:00');
            hoy.setHours(0, 0, 0, 0);

            if (fechaSeleccionada < hoy) {
                errors.push('La fecha de viaje no puede ser anterior al día de hoy.');
            }
        }

        if (errors.length > 0) {
            const ul = document.createElement('ul');
            errors.forEach(function(error) {
                const li = document.createElement('li');
                li.textContent = error;
                ul.appendChild(li);
            });
            errorContainer.appendChild(ul);
            errorContainer.style.display = 'block';
            window.scrollTo(0, 0);
        } else {
            alert('¡Registro Exitoso!\n' +
                  `Nombre: ${nombre}\n` +
                  `Cédula: ${cedula}\n` +
                  `Destino: ${destino}\n` +
                  `Fecha: ${fecha}`);
            form.reset();
        }
    });
});