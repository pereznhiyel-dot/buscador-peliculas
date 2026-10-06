// --- TU PARTE: Reemplaza las 3 líneas con '___' poniendo el ID que corresponde entre comillas ---

const inputBusqueda = document.getElementById('inputBusqueda'); // Poner id del input
const btnBuscar = document.getElementById('btnBuscar');      // Poner id del botón
const contenedorPeliculas = document.getElementById('contenedorPeliculas'); // Poner id del contenedor

// --- DE AQUÍ EN ADELANTE YA ESTÁ TODO LISTO PARA TI ---

// Escuchamos cuando le das clic al botón
btnBuscar.addEventListener('click', function() {
    const textoIngresado = inputBusqueda.value.trim();
    if (textoIngresado !== '') {
        buscarPeliculas(textoIngresado);
    } else {
        alert('Escribe el nombre de una película primero.');
    }
});

// Función que consulta a la API de películas en internet
async function buscarPeliculas(nombre) {
    try {
        const respuesta = await fetch(`https://www.omdbapi.com/?apikey=trilogy&s=${nombre}`);
        const datos = await respuesta.json();

        if (datos.Response === "True") {
            mostrarPeliculas(datos.Search);
        } else {
            contenedorPeliculas.innerHTML = '<p>No se encontraron películas.</p>';
        }
    } catch (error) {
        console.error('Error al conectar:', error);
    }
}

// Función que dibuja las tarjetas en pantalla
function mostrarPeliculas(lista) {
    contenedorPeliculas.innerHTML = '';

    lista.forEach(pelicula => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-pelicula');

        // Insertamos la imagen y el título que nos devuelve la API
        tarjeta.innerHTML = `
            <img src="${pelicula.Poster}" alt="${pelicula.Title}">
            <h3>${pelicula.Title}</h3>
            <p>Año: ${pelicula.Year}</p>
        `;

        contenedorPeliculas.appendChild(tarjeta);
    });
}