// js/favoritos.js
function mostrarfavoritos() {
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('gatos-container').style.display = 'none';
    document.getElementById('favoritos-container').style.display = 'block';
    document.getElementById('registro-container').style.display = 'none';
    document.getElementById('busqueda-container').style.display = 'none';
    // El contenido de favoritos se carga dinámicamente en script.js

    // Mostrar el contenedor de favoritos
    const favoritosDiv = document.getElementById('favoritos-container');
    if (favoritosDiv) {
        favoritosDiv.style.display = 'block';
        // La lógica para mostrar los favoritos ya está en script.js (función mostrarFavoritos())
        // No es necesario duplicarla aquí, script.js se encarga de actualizar la vista.
        // Si necesitas alguna lógica adicional *específica* para cuando se muestra la
        // sección de favoritos, puedes añadirla aquí.
        mostrarFavoritos(); // Asegúrate de que la función global mostrarFavoritos se llame
    } else {
        console.error('El contenedor de favoritos no se encontró en el HTML.');
    }
}