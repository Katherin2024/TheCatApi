const busquedaContainer = document.getElementById('busqueda-container');
const selectRaza = document.getElementById('seleccion-raza');
const resultadosBusquedaContainer = document.getElementById('resultados-busqueda');

const apiKeyBusqueda = 'live_YJVErE3B8i6XK7HMV54Hcdc4xhbDi3RVDe2ReYxq90w9z6e8AXDSOYRTjiRN0O0p';

function mostrarbusqueda() {
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('gatos-container').style.display = 'none';
    document.getElementById('favoritos-container').style.display = 'none';
    document.getElementById('registro-container').style.display = 'none';
    document.getElementById('populares-container').style.display = 'none'; // Asegurar que la sección de populares esté oculta
    busquedaContainer.style.display = 'block';
    cargarListaDeRazas();

}

function cargarListaDeRazas() {
    const urlRazas = 'https://api.thecatapi.com/v1/breeds';
    selectRaza.innerHTML = '<option value="">Selecciona una raza</option>'; // Limpiar opciones previas

    fetch(urlRazas, {
        headers: {
            'x-api-key': apiKeyBusqueda
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Error de red al cargar razas: ${response.status} - ${response.statusText}`);
        return response.json();
    })
    .then(data => {
        if (data && data.length > 0) {
            data.forEach(raza => {
                const option = document.createElement('option');
                option.value = raza.id;
                option.textContent = raza.name;
                selectRaza.appendChild(option);
            });
        } else {
            mostrarMensaje(busquedaContainer, 'No se pudieron cargar las razas de gatos.', true);
        }
    })
    .catch(error => {
        mostrarMensaje(busquedaContainer, `Error al cargar las razas: ${error.message}`, true);
    });
}

function buscarPorRazaSeleccionada() {
    const razaId = selectRaza.value;
    if (razaId) {
        buscarGatosPorRaza(razaId);
    } else {
        mostrarMensaje(resultadosBusquedaContainer, 'Por favor, selecciona una raza para buscar.');
    }
}

function buscarGatosPorRaza(raza) {
    const urlBusquedaRaza = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${raza}`;
    mostrarMensaje(resultadosBusquedaContainer, `Buscando gatos de raza...`);
    fetch(urlBusquedaRaza, {
        headers: {
            'x-api-key': apiKeyBusqueda
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        return response.json();
    })
    .then(data => {
        resultadosBusquedaContainer.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(cat => {
                const img = document.createElement('img');
                img.src = cat.url;
                img.alt = `Gato de raza ${raza}`;
                img.classList.add('resultado-imagen');
                resultadosBusquedaContainer.appendChild(img);
            });
        } else {
            mostrarMensaje(resultadosBusquedaContainer, `No se encontraron imágenes de esta raza.`);
        }
    })
    .catch(error => {
        mostrarMensaje(resultadosBusquedaContainer, `Error al buscar gatos: ${error.message}`, true);
    });
}