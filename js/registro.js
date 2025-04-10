function mostrarregistro() {
    const registroContainer = document.getElementById('registro-container');
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('gatos-container').style.display = 'none';
    document.getElementById('favoritos-container').style.display = 'none';
    document.getElementById('registro-container').style.display = 'block';
    document.getElementById('busqueda-container').style.display = 'none';
    document.getElementById('registro-container').innerHTML = '<h2>Formulario de Registro</h2><p>Aquí podrías añadir campos para el registro de usuarios.</p>';

    // Limpiar el contenedor de registro si ya tiene contenido
    registroContainer.innerHTML = '';

    // Crear el formulario de ingreso
    const formularioIngreso = document.createElement('form');
    formularioIngreso.id = 'formulario-ingreso';

    // Crear el título del formulario
    const titulo = document.createElement('h2');
    titulo.textContent = 'Registrate!!';
    formularioIngreso.appendChild(titulo);

    // Crear el campo de nombre completo
    const labelNombre = document.createElement('label');
    labelNombre.textContent = 'Nombre Completo:';
    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.name = 'nombre';
    inputNombre.required = true;
    formularioIngreso.appendChild(labelNombre);
    formularioIngreso.appendChild(inputNombre);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el campo de correo electrónico
    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'Correo Electrónico:';
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.required = true;
    formularioIngreso.appendChild(labelEmail);
    formularioIngreso.appendChild(inputEmail);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el campo de teléfono
    const labelTelefono = document.createElement('label');
    labelTelefono.textContent = 'Teléfono:';
    const inputTelefono = document.createElement('input');
    inputTelefono.type = 'tel';
    inputTelefono.name = 'telefono';
    inputTelefono.required = true;
    formularioIngreso.appendChild(labelTelefono);
    formularioIngreso.appendChild(inputTelefono);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el campo de fecha de nacimiento
    const labelFechaNacimiento = document.createElement('label');
    labelFechaNacimiento.textContent = 'Fecha de Nacimiento:';
    const inputFechaNacimiento = document.createElement('input');
    inputFechaNacimiento.type = 'date';
    inputFechaNacimiento.name = 'fecha_nacimiento';
    inputFechaNacimiento.required = true;
    formularioIngreso.appendChild(labelFechaNacimiento);
    formularioIngreso.appendChild(inputFechaNacimiento);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el campo de dirección
    const labelDireccion = document.createElement('label');
    labelDireccion.textContent = 'Dirección:';
    const inputDireccion = document.createElement('input');
    inputDireccion.type = 'text';
    inputDireccion.name = 'direccion';
    inputDireccion.required = true;
    formularioIngreso.appendChild(labelDireccion);
    formularioIngreso.appendChild(inputDireccion);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el campo de ciudad
    const labelCiudad = document.createElement('label');
    labelCiudad.textContent = 'Ciudad:';
    const inputCiudad = document.createElement('input');
    inputCiudad.type = 'text';
    inputCiudad.name = 'ciudad';
    inputCiudad.required = true;
    formularioIngreso.appendChild(labelCiudad);
    formularioIngreso.appendChild(inputCiudad);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el campo de código postal
    const labelCodigoPostal = document.createElement('label');
    labelCodigoPostal.textContent = 'Código Postal:';
    const inputCodigoPostal = document.createElement('input');
    inputCodigoPostal.type = 'text';
    inputCodigoPostal.name = 'codigo_postal';
    inputCodigoPostal.required = true;
    formularioIngreso.appendChild(labelCodigoPostal);
    formularioIngreso.appendChild(inputCodigoPostal);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el campo de género
    const labelGenero = document.createElement('label');
    labelGenero.textContent = 'Género:';
    const selectGenero = document.createElement('select');
    selectGenero.name = 'genero';
    const optionMasculino = document.createElement('option');
    optionMasculino.value = 'masculino';
    optionMasculino.textContent = 'Masculino';
    const optionFemenino = document.createElement('option');
    optionFemenino.value = 'femenino';
    optionFemenino.textContent = 'Femenino';
    const optionOtro = document.createElement('option');
    optionOtro.value = 'otro';
    optionOtro.textContent = 'Otro';
    selectGenero.appendChild(optionMasculino);
    selectGenero.appendChild(optionFemenino);
    selectGenero.appendChild(optionOtro);
    formularioIngreso.appendChild(labelGenero);
    formularioIngreso.appendChild(selectGenero);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el campo de contraseña
    const labelPassword = document.createElement('label');
    labelPassword.textContent = 'Contraseña:';
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.name = 'password';
    inputPassword.required = true;
    formularioIngreso.appendChild(labelPassword);
    formularioIngreso.appendChild(inputPassword);
    formularioIngreso.appendChild(document.createElement('br')); // Salto de línea

    // Crear el botón de enviar
    const botonIngresar = document.createElement('button');
    botonIngresar.type = 'submit';
    botonIngresar.textContent = 'Ingresar';
    formularioIngreso.appendChild(botonIngresar);

    // Añadir el formulario al contenedor de registro
    registroContainer.appendChild(formularioIngreso);

    // Opcional: Añadir un event listener para manejar el envío del formulario
    formularioIngreso.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar la recarga de la página

        const nombre = inputNombre.value;
        const email = inputEmail.value;
        const telefono = inputTelefono.value;
        const fechaNacimiento = inputFechaNacimiento.value;
        const direccion = inputDireccion.value;
        const ciudad = inputCiudad.value;
        const codigoPostal = inputCodigoPostal.value;
        const genero = selectGenero.value;
        const password = inputPassword.value;

        // Aquí puedes añadir la lógica para verificar el ingreso
        console.log('Registro con los siguientes datos:', { nombre, email, telefono, fechaNacimiento, direccion, ciudad, codigoPostal, genero, password });
        // Por ejemplo, podrías enviar estos datos a un servidor para almacenamiento.
        alert(`Registro exitoso con correo: ${email}`); // Simulación
    });
}

// Elimina o comenta la llamada inicial a mostrarregistro() si no quieres que el formulario aparezca al cargar la página.
mostrarregistro();
