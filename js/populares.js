const popularesContainer = document.getElementById('populares-container');
const popularBreedList = document.getElementById('popularBreedList');
const popularBreedsUl = document.getElementById('popularBreeds');

const apiKeyPopulares = 'live_TU_API_KEY'; // Reemplaza con tu API key
const famousBreedNames = ["British Shorthair", "Siamese", "Persian", "Maine Coon", "Ragdoll", "Bengal"];

function mostrarPopulares() {
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('gatos-container').style.display = 'none';
    document.getElementById('favoritos-container').style.display = 'none';
    document.getElementById('registro-container').style.display = 'none';
    document.getElementById('busqueda-container').style.display = 'none';
    document.getElementById('breed-info-container').style.display = 'none';
    popularesContainer.style.display = 'block';
}

async function fetchBreedInfoPopulares(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/breeds/${breedId}`;
    try {
        const response = await fetch(apiUrl, { headers: { 'x-api-key': apiKeyPopulares } });
        const breedData = await response.json();
        if (breedData) {
            displayBreedDetails(breedData);
            document.getElementById('inicio-container').style.display = 'none';
            document.getElementById('breed-info-container').style.display = 'block';
        } else {
            alert(`Información no disponible para esta raza.`);
        }
    } catch (error) {
        console.error('Error al obtener información de la raza:', error);
        alert('Error al cargar la información de la raza.');
    }
}

async function fetchBreedsByNamePopulares(breedName) {
    const apiUrl = `https://api.thecatapi.com/v1/breeds?q=${breedName}`;
    try {
        const response = await fetch(apiUrl, { headers: { 'x-api-key': apiKeyPopulares } });
        const breedsData = await response.json();
        if (breedsData && breedsData.length > 0) {
            return breedsData[0].id;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error al buscar información de ${breedName}:`, error);
        return null;
    }
}

async function populateFamousBreedsList() {
    if (!popularBreedsUl) {
        console.error('No se encontró el elemento popularBreedsUl en el HTML.');
        return;
    }
    popularBreedsUl.innerHTML = '';
    for (const breedName of famousBreedNames) {
        const breedId = await fetchBreedsByNamePopulares(breedName);
        if (breedId) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = breedName;
            link.href = '#';
            link.addEventListener('click', function(event) {
                event.preventDefault();
                fetchBreedInfoPopulares(breedId);
            });
            listItem.appendChild(link);
            popularBreedsUl.appendChild(listItem);
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = `Información no disponible para ${breedName}`;
            popularBreedsUl.appendChild(listItem);
        }
    }
}

populateFamousBreedsList();