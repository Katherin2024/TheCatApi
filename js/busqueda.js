function mostrarbusqueda() {
    // Ocultar otros contenedores
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('gatos-container').style.display = 'none';
    document.getElementById('favoritos-container').style.display = 'none';
    document.getElementById('registro-container').style.display = 'none';

    // Mostrar el contenedor de búsqueda
    const busquedaDiv = document.getElementById('busqueda-container');
    if (busquedaDiv) {
        busquedaDiv.style.display = 'block';
        cargarListaDeRazas(); // <---- ¡Asegúrate de que esta línea esté aquí!
    } else {
        console.error('El contenedor de búsqueda no se encontró en el HTML.');
    }
}