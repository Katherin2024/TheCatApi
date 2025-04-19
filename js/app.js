// app.js

// Referencias a elementos del DOM
const listaFavoritosDiv = document.getElementById('lista-favoritos');
const gato1ComparacionSelect = document.getElementById('gato1-comparacion');
const gato2ComparacionSelect = document.getElementById('gato2-comparacion');
const resultadoComparacionDiv = document.getElementById('resultado-comparacion');


// Función para cargar los favoritos desde el almacenamiento local
function cargarFavoritos() {
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
        favoritos = JSON.parse(favoritosGuardados);
        mostrarListaFavoritos();
        cargarOpcionesComparacion();
    }
}

// Función para guardar los favoritos en el almacenamiento local
function guardarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    cargarOpcionesComparacion(); // Actualizar opciones de comparación al guardar
}

// Función para mostrar la lista de favoritos en crud.html
function mostrarListaFavoritos() {
    listaFavoritosDiv.innerHTML = '';
    if (favoritos.length === 0) {
        listaFavoritosDiv.innerHTML = '<p>No tienes ningún gatito en favoritos.</p>';
        return;
    }

    favoritos.forEach(favorito => {
        const favCard = document.createElement('div');
        favCard.classList.add('favorito-card-crud'); // Puedes añadir estilos específicos en style.css
        favCard.innerHTML = `
            <img src="${favorito.url}" alt="${favorito.name || 'Gato favorito'}" style="max-width: 100px; height: auto;">
            <div class="favorito-info-crud">
                <h4>${favorito.name || 'Gato'}</h4>
                <p>${favorito.temperament || 'Temperamento no especificado'}</p>
                <button onclick="eliminarDeFavoritos('${favorito.id}')">Eliminar</button>
            </div>
        `;
        listaFavoritosDiv.appendChild(favCard);
    });
}

// Función para eliminar un gato de favoritos
function eliminarDeFavoritos(catId) {
    favoritos = favoritos.filter(favorito => favorito.id !== catId);
    guardarFavoritos();
    mostrarListaFavoritos();
}

// Función para cargar las opciones de los select de comparación
function cargarOpcionesComparacion() {
    // Limpiar las opciones existentes
    gato1ComparacionSelect.innerHTML = '<option value="">Selecciona el primer gato</option>';
    gato2ComparacionSelect.innerHTML = '<option value="">Selecciona el segundo gato</option>';

    favoritos.forEach(favorito => {
        const option1 = document.createElement('option');
        option1.value = favorito.id;
        option1.textContent = favorito.name || 'Gato ' + favorito.id;
        gato1ComparacionSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = favorito.id;
        option2.textContent = favorito.name || 'Gato ' + favorito.id;
        gato2ComparacionSelect.appendChild(option2);
    });
}

// Funcionalidad Original: Comparar Temperamentos
function compararTemperamentos() {
    const idGato1 = gato1ComparacionSelect.value;
    const idGato2 = gato2ComparacionSelect.value;

    if (!idGato1 || !idGato2) {
        resultadoComparacionDiv.textContent = 'Por favor, selecciona dos gatos para comparar.';
        return;
    }

    if (idGato1 === idGato2) {
        resultadoComparacionDiv.textContent = 'Por favor, selecciona dos gatos diferentes para comparar.';
        return;
    }

    const gato1 = favoritos.find(gato => gato.id === idGato1);
    const gato2 = favoritos.find(gato => gato.id === idGato2);

    if (gato1 && gato2) {
        const temp1 = gato1.temperament ? gato1.temperament.toLowerCase().split(', ').map(t => t.trim()) : [];
        const temp2 = gato2.temperament ? gato2.temperament.toLowerCase().split(', ').map(t => t.trim()) : [];

        const comunes = temp1.filter(t => temp2.includes(t));
        const solo1 = temp1.filter(t => !temp2.includes(t));
        const solo2 = temp2.filter(t => !temp1.includes(t));

        let resultadoHTML = `<h3>Comparación de Temperamentos:</h3>`;
        if (comunes.length > 0) {
            resultadoHTML += `<p>Temperamentos Comunes: ${comunes.join(', ')}</p>`;
        } else {
            resultadoHTML += `<p>No tienen temperamentos en común.</p>`;
        }
        if (solo1.length > 0) {
            resultadoHTML += `<p>Temperamentos solo de ${gato1.name || 'Gato 1'}: ${solo1.join(', ')}</p>`;
        }
        if (solo2.length > 0) {
            resultadoHTML += `<p>Temperamentos solo de ${gato2.name || 'Gato 2'}: ${solo2.join(', ')}</p>`;
        }

        resultadoComparacionDiv.innerHTML = resultadoHTML;

    } else {
        resultadoComparacionDiv.textContent = 'Error al encontrar los gatos seleccionados.';
    }
}

// Cargar los favoritos al cargar la página crud.html
cargarFavoritos();
