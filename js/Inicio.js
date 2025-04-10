function mostrarinicio() {
    document.getElementById('inicio-container').style.display = 'block';
    document.getElementById('gatos-container').style.display = 'none';
    document.getElementById('favoritos-container').style.display = 'none';
    document.getElementById('registro-container').style.display = 'none';
    document.getElementById('busqueda-container').style.display = 'none';

    document.getElementById('inicio-container').innerHTML = `
        <h2>¡Bienvenido a Gatitos!</h2>
        <p>Explora adorables gatos, conoce sus razas y añádelos a tus favoritos. 🐾</p>

        <h3>🐱 Datos Curiosos sobre los Gatitos</h3>
        <ul style="text-align: left; max-width: 600px; margin: 0 auto;">
            <li>Los gatos duermen entre 13 y 16 horas al día. ¡Son verdaderos maestros de la siesta!</li>
            <li>Existen más de 70 razas de gatos reconocidas en todo el mundo.</li>
            <li>Un gato puede correr hasta 48 km/h en distancias cortas.</li>
            <li>Los bigotes de los gatos les ayudan a medir si pueden pasar por espacios estrechos.</li>
            <li>Los gatos "amasan" con sus patas cuando están felices o recuerdan la lactancia de cachorros.</li>
            <li>El ronroneo de un gato no solo expresa felicidad, también puede ayudarles a sanar.</li>
        </ul>

        <p>¡Disfruta descubriendo y aprendiendo sobre estos maravillosos compañeros peludos! 😺</p>
    `;
}
