// script.js
// ----> ¡IMPORTANTE! REEMPLAZA 'TU_API_KEY' AQUÍ CON TU CLAVE REAL <----
// ----> Haz este cambio en ESTE archivo (script.js), NO compartas tu clave <----
const apiKey = 'live_YJVErE3B8i6XK7HMV54Hcdc4xhbDi3RVDe2ReYxq90w9z6e8AXDSOYRTjiRN0O0p';

const limit = 15; // Número de gatos a solicitar
// Pedimos imágenes, intentando que tengan información de raza
const urlImagenesGatos = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`;

// Obtenemos la referencia al contenedor principal en el HTML
const gatosContainer = document.getElementById('gatos-container');
const favoritosContainer = document.getElementById('favoritos-container'); // Asegúrate de tener este div en tu HTML
const resultadosBusquedaContainer = document.getElementById('resultados-busqueda');

// Array para almacenar los IDs de los gatos favoritos
let favoritos = [];

// Función para guardar los favoritos en el almacenamiento local
function guardarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

// Función para cargar los favoritos desde el almacenamiento local
function cargarFavoritos() {
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
        favoritos = JSON.parse(favoritosGuardados);
        mostrarFavoritos(); // Mostrar los favoritos cargados al inicio
    }
}

// Función reutilizable para mostrar mensajes en un contenedor
function mostrarMensaje(container, mensaje, esError = false) {
    // Limpia el contenedor y muestra el mensaje
    container.innerHTML = `<p class="${esError ? 'error' : 'mensaje'}">${mensaje}</p>`;
    if (esError) {
        console.error(mensaje); // Muestra el error en la consola para depuración
    }
}

// Función para añadir un gato a favoritos
function agregarAFavoritos(catId, imageUrl, catName, catTemperament) {
    if (!favoritos.some(favorito => favorito.id === catId)) {
        favoritos.push({ id: catId, url: imageUrl, name: catName, temperament: catTemperament });
        guardarFavoritos();
        mostrarFavoritos(); // Actualizar la visualización de favoritos
        alert(`${catName} ha sido añadido a tus favoritos.`);
    } else {
        alert(`${catName} ya está en tus favoritos.`);
    }
}

// Función para eliminar un gato de favoritos
function eliminarDeFavoritos(catId) {
    favoritos = favoritos.filter(favorito => favorito.id !== catId);
    guardarFavoritos();
    mostrarFavoritos(); // Actualizar la visualización de favoritos
}

// Función para mostrar los gatos favoritos en el contenedor de favoritos
function mostrarFavoritos() {
    if (!favoritosContainer) {
        console.error('El contenedor de favoritos no se encontró en el HTML.');
        return;
    }

    favoritosContainer.innerHTML = ''; // Limpiar el contenedor de favoritos

    if (favoritos.length === 0) {
        mostrarMensaje(favoritosContainer, 'No tienes ningún gatito en favoritos.');
        return;
    }

    favoritos.forEach(favorito => {
        const favCard = document.createElement('div');
        favCard.classList.add('favorito-card');

        const img = document.createElement('img');
        img.src = favorito.url;
        img.alt = favorito.name || 'Gato favorito';

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('favorito-info');
        infoDiv.innerHTML = `
            <h4>${favorito.name || 'Gato'}</h4>
            ${favorito.temperament ? `<p>${favorito.temperament}</p>` : '<p>Temperamento no especificado</p>'}
        `;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar-favorito');
        botonEliminar.addEventListener('click', () => eliminarDeFavoritos(favorito.id));

        favCard.appendChild(img);
        favCard.appendChild(infoDiv);
        favCard.appendChild(botonEliminar);
        favoritosContainer.appendChild(favCard);
    });
}

// Muestra el mensaje inicial de carga
mostrarMensaje(gatosContainer, `Cargando ${limit} gatitos...`);

// Realizamos la llamada a la API
fetch(urlImagenesGatos, {
    headers: {
        'x-api-key': apiKey
    }
})
.then(response => {
    // Comprueba si la respuesta de la red es correcta
    if (!response.ok) {
        throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
    }
    // Convierte la respuesta a JSON
    return response.json();
})
.then(data => {
    // Una vez que tenemos los datos, limpiamos el mensaje de carga del contenedor
    gatosContainer.innerHTML = '';

    // Comprobamos si la API devolvió un array con gatos
    if (data && data.length > 0) {
        // Iteramos sobre cada objeto 'catData' en el array 'data'
        data.forEach(catData => {
            // 1. Crear la tarjeta contenedora para cada gato
            const catCard = document.createElement('div');
            catCard.classList.add('gato-card'); // Añade la clase CSS para estilos

            // 2. Crear el elemento de imagen
            const img = document.createElement('img');
            img.src = catData.url; // Establece la URL de la imagen
            img.alt = 'Imagen de gato'; // Texto alternativo por defecto

            // 3. Crear el div para la información
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('gato-info'); // Añade la clase CSS

            let razaNombre = 'Gato';
            let razaTemperamento = 'Temperamento no especificado';

            // 4. Comprobar si hay información de raza y añadirla
            if (catData.breeds && catData.breeds.length > 0) {
                const razaInfo = catData.breeds[0];
                razaNombre = razaInfo.name;
                razaTemperamento = razaInfo.temperament || 'Temperamento no especificado';
                img.alt = `Imagen de un gato ${razaInfo.name}`; // Alt más descriptivo
                // Añade el nombre y temperamento (si existe) al div de info
                infoDiv.innerHTML = `
                    <h4>${razaInfo.name}</h4>
                    ${razaInfo.temperament ? `<p>${razaInfo.temperament}</p>` : '<p>Temperamento no especificado</p>'}
                `;
            } else {
                // Si no hay info de raza, muestra un texto genérico
                infoDiv.innerHTML = `<h4>Gato</h4><p>(Raza no especificada)</p>`;
                img.alt = 'Imagen de un gato de raza no especificada';
            }

            // 5. Crear el botón de favoritos
            const botonFavorito = document.createElement('button');
            botonFavorito.textContent = 'Añadir a Favoritos';
            botonFavorito.classList.add('favorito-button');
            botonFavorito.addEventListener('click', () => agregarAFavoritos(catData.id, catData.url, razaNombre, razaTemperamento));

            // 6. Añadir la imagen, la información y el botón a la tarjeta
            catCard.appendChild(img);
            catCard.appendChild(infoDiv);
            catCard.appendChild(botonFavorito);

            // 7. Añadir la tarjeta completa al contenedor principal en el HTML
            gatosContainer.appendChild(catCard);
        });
    } else {
        // Si la API no devuelve gatos (array vacío)
        mostrarMensaje(gatosContainer, 'No se encontraron gatitos esta vez. Intenta de nuevo más tarde.', true);
    }
})
.catch(error => {
    // Captura cualquier error (de red o de procesamiento)
    mostrarMensaje(gatosContainer, `Error al cargar los gatos: ${error.message}. Verifica tu conexión o la API key.`, true);
});

// Cargar los favoritos al cargar la página
cargarFavoritos();

// busqueda


function mostrarbusqueda() {
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('gatos-container').style.display = 'none';
    document.getElementById('favoritos-container').style.display = 'none';
    document.getElementById('registro-container').style.display = 'none';
    const busquedaDiv = document.getElementById('busqueda-container');
    if (busquedaDiv) {
        busquedaDiv.style.display = 'block';
        cargarListaDeRazas();
    } else {
        console.error('El contenedor de búsqueda no se encontró en el HTML.');
    }
}

function cargarListaDeRazas() {
    const urlRazas = 'https://api.thecatapi.com/v1/breeds';
    const selectRaza = document.getElementById('seleccion-raza');

    fetch(urlRazas, {
        headers: {
            'x-api-key': apiKey
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
    const selectRaza = document.getElementById('seleccion-raza');
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
            'x-api-key': apiKey
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
