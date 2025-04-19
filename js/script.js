// script.js
// ----> ¡IMPORTANTE! REEMPLAZA 'TU_API_KEY' AQUÍ CON TU CLAVE REAL <----
// ----> Haz este cambio en ESTE archivo (script.js), NO compartas tu clave <----
const apiKey = 'live_YJVErE3B8i6XK7HMV54Hcdc4xhbDi3RVDe2ReYxq90w9z6e8AXDSOYRTjiRN0O0p'; // Reemplaza con tu API key

const limit = 15;
const urlImagenesGatos = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`;
const gatosContainer = document.getElementById('gatos-container');
const favoritosContainer = document.getElementById('favoritos-container');
const resultadosBusquedaContainer = document.getElementById('resultados-busqueda');
let favoritos = [];

function guardarFavoritos() { localStorage.setItem('favoritos', JSON.stringify(favoritos)); }
function cargarFavoritos() { const f = localStorage.getItem('favoritos'); if (f) { favoritos = JSON.parse(f); mostrarFavoritos(); } }
function mostrarMensaje(c, m, e = false) { c.innerHTML = `<p class="${e ? 'error' : 'mensaje'}">${m}</p>`; if (e) console.error(m); }
function agregarAFavoritos(id, url, name, temp) { if (!favoritos.some(f => f.id === id)) { favoritos.push({ id, url, name, temp }); guardarFavoritos(); mostrarFavoritos(); alert(`${name} añadido a favoritos.`); } else { alert(`${name} ya está en favoritos.`); } }
function eliminarDeFavoritos(id) { favoritos = favoritos.filter(f => f.id !== id); guardarFavoritos(); mostrarFavoritos(); }

function mostrarFavoritos() {
    if (!favoritosContainer) { console.error('Contenedor favoritos no encontrado.'); return; }
    favoritosContainer.innerHTML = '';
    if (favoritos.length === 0) { mostrarMensaje(favoritosContainer, 'No hay favoritos.'); return; }
    favoritos.forEach(fav => {
        const card = document.createElement('div'); card.classList.add('favorito-card');
        const img = document.createElement('img'); img.src = fav.url; img.alt = fav.name || 'Gato favorito';
        const infoDiv = document.createElement('div'); infoDiv.classList.add('favorito-info'); infoDiv.innerHTML = `<h4>${fav.name || 'Gato'}</h4>${fav.temperament ? `<p>${fav.temperament}</p>` : '<p>Sin temperamento</p>'}`;
        const btnEliminar = document.createElement('button'); btnEliminar.textContent = 'Eliminar'; btnEliminar.classList.add('eliminar-favorito'); btnEliminar.onclick = () => eliminarDeFavoritos(fav.id);
        card.appendChild(img); card.appendChild(infoDiv); card.appendChild(btnEliminar); favoritosContainer.appendChild(card);
    });
}

mostrarMensaje(gatosContainer, `Cargando gatitos...`);
fetch(urlImagenesGatos, { headers: { 'x-api-key': apiKey } })
    .then(res => { if (!res.ok) throw new Error(`Error: ${res.status}`); return res.json(); })
    .then(data => {
        gatosContainer.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(cat => {
                const card = document.createElement('div'); card.classList.add('gato-card');
                const img = document.createElement('img'); img.src = cat.url; img.alt = 'Imagen gato';
                const infoDiv = document.createElement('div'); infoDiv.classList.add('gato-info');
                let nombreRaza = 'Gato', temperamentoRaza = 'Sin temperamento';
                if (cat.breeds && cat.breeds.length > 0) {
                    const raza = cat.breeds[0];
                    nombreRaza = raza.name;
                    temperamentoRaza = raza.temperament || 'Sin temperamento';
                    img.alt = `Gato ${raza.name}`;
                    infoDiv.innerHTML = `<h4>${raza.name}</h4><p>${raza.temperament || 'Sin temperamento'}</p>`;
                } else { infoDiv.innerHTML = `<h4>Gato</h4><p>(Raza no especificada)</p>`; }
                const btnFav = document.createElement('button'); btnFav.textContent = 'Añadir a Favoritos'; btnFav.classList.add('favorito-button'); btnFav.onclick = () => agregarAFavoritos(cat.id, cat.url, nombreRaza, temperamentoRaza);
                card.appendChild(img); card.appendChild(infoDiv); card.appendChild(btnFav); gatosContainer.appendChild(card);
            });
        } else { mostrarMensaje(gatosContainer, 'No se encontraron gatitos.', true); }
    })
    .catch(err => mostrarMensaje(gatosContainer, `Error al cargar gatos: ${err.message}`, true));

cargarFavoritos();

function mostrarbusqueda() {
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('gatos-container').style.display = 'none';
    document.getElementById('favoritos-container').style.display = 'none';
    document.getElementById('registro-container').style.display = 'none';
    document.getElementById('populares-container').style.display = 'none';
    document.getElementById('breed-info-container').style.display = 'none';
    const busquedaDiv = document.getElementById('busqueda-container');
    if (busquedaDiv) { busquedaDiv.style.display = 'block'; cargarListaDeRazas(); } else { console.error('Contenedor búsqueda no encontrado.'); }
}

function cargarListaDeRazas() {
    const urlRazas = 'https://api.thecatapi.com/v1/breeds';
    const selectRaza = document.getElementById('seleccion-raza');
    selectRaza.innerHTML = '<option value="">Selecciona raza</option>';
    fetch(urlRazas, { headers: { 'x-api-key': apiKey } })
        .then(res => { if (!res.ok) throw new Error(`Error: ${res.status}`); return res.json(); })
        .then(data => { if (data && data.length > 0) { data.forEach(raza => { const opt = document.createElement('option'); opt.value = raza.id; opt.textContent = raza.name; selectRaza.appendChild(opt); }); } else { mostrarMensaje(busquedaContainer, 'No se cargaron razas.', true); } })
        .catch(err => mostrarMensaje(busquedaContainer, `Error al cargar razas: ${err.message}`, true));
}

function buscarPorRazaSeleccionada() {
    const selectRaza = document.getElementById('seleccion-raza');
    const razaId = selectRaza.value;
    if (razaId) buscarGatosPorRaza(razaId); else mostrarMensaje(resultadosBusquedaContainer, 'Selecciona una raza.');
}

function buscarGatosPorRaza(raza) {
    const urlBusquedaRaza = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${raza}`;
    mostrarMensaje(resultadosBusquedaContainer, `Buscando gatos...`);
    fetch(urlBusquedaRaza, { headers: { 'x-api-key': apiKey } })
        .then(res => { if (!res.ok) throw new Error(`Error: ${res.status}`); return res.json(); })
        .then(data => {
            resultadosBusquedaContainer.innerHTML = '';
            if (data && data.length > 0) { data.forEach(cat => { const img = document.createElement('img'); img.src = cat.url; img.alt = `Gato ${raza}`; img.classList.add('resultado-imagen'); resultadosBusquedaContainer.appendChild(img); }); } else { mostrarMensaje(resultadosBusquedaContainer, 'No se encontraron imágenes.'); }
        })
        .catch(err => mostrarMensaje(resultadosBusquedaContainer, `Error al buscar: ${err.message}`, true));
}

function displayBreedDetails(breed) {
    console.log("Datos recibidos en displayBreedDetails:", breed); // AGREGAR ESTA LÍNEA
    const container = document.getElementById('breed-details');
    container.innerHTML = `
        <h3>${breed.name}</h3>
        ${breed.description ? `<p><strong>Descripción:</strong> ${breed.description}</p>` : ''}
        ${breed.temperament ? `<p><strong>Temperamento:</strong> ${breed.temperament}</p>` : ''}
        ${breed.origin ? `<p><strong>Origen:</strong> ${breed.origin}</p>` : ''}
        ${breed.life_span ? `<p><strong>Esperanza de vida:</strong> ${breed.life_span} años</p>` : ''}
        ${breed.weight && breed.weight.metric ? `<p><strong>Peso:</strong> ${breed.weight.metric} kg</p>` : ''}
        ${breed.affection_level ? `<p><strong>Nivel de afecto:</strong> ${'💖'.repeat(breed.affection_level)}</p>` : ''}
        ${breed.grooming ? `<p><strong>Aseo:</strong> ${groomingText(breed.grooming)}</p>` : ''}
        ${breed.energy_level ? `<p><strong>Nivel de energía:</strong> ${'⚡'.repeat(breed.energy_level)}</p>` : ''}
        ${breed.intelligence ? `<p><strong>Inteligencia:</strong> ${'🧠'.repeat(breed.intelligence)}</p>` : ''}
        ${breed.vocalisation ? `<p><strong>Vocalización:</strong> ${'🗣️'.repeat(breed.vocalisation)}</p>` : ''}
        ${breed.image && breed.image.url ? `<img src="${breed.image.url}" alt="${breed.name}" style="max-width: 300px;">` : ''}
        ${breed.wikipedia_url ? `<p><a href="${breed.wikipedia_url}" target="_blank">Más en Wikipedia</a></p>` : ''}
    `;
}

function groomingText(level) {
    switch (level) { case 1: return 'Bajo'; case 2: return 'Moderado'; case 3: return 'Alto'; default: return 'No especificado'; }
}

document.addEventListener('DOMContentLoaded', function() {
    const mostrarPopularesInicioButton = document.getElementById('mostrar-populares-inicio');
    const popularesContainerInicio = document.getElementById('populares-container');
    if (mostrarPopularesInicioButton && popularesContainerInicio) {
        mostrarPopularesInicioButton.addEventListener('click', function() {
            popularesContainerInicio.style.display = popularesContainerInicio.style.display === 'none' ? 'block' : 'none';
        });
    } else {
        console.error('No se encontraron botón o contenedor de populares en Inicio.');
    }
});