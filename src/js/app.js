document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

// Fijar la barra de navegación al scrollear hacia abajo

function navegacionFija() {
    const barra = document.querySelector('.header');    // Barra de navegacion que vamos a fijar
    const sobreFestival = document.querySelector('.sobre-festival'); // Seleccion el punto en el cual aparece la barra
    const body = document.querySelector('body');    // Selecciona el body. esto lo usamos para que no sea tan brusco el entre de la barra

    window.addEventListener('scroll', function () {
        // console.log(sobreFestival.getBoundingClientRect()); // getBoundingClientRect() // Brinda info de un elemento, ubicacion, etc
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');    // si es menor a 0, agrega la clase 'fijo' al header
            body.classList.add('body-scroll'); // si es menor a 0, agrega la clase 'body-scroll' al body
        } else {
            barra.classList.remove('fijo'); // si es mayor a 0, remueve la clase 'fijo' al header
            body.classList.remove('body-scroll'); // si es mayor a 0, remueve la clase 'body-scroll' al body 
        }
    });
}


// Para hacer el efecto de scroll

function scrollNav(params) {
    const enlaces = document.querySelectorAll('.navegacion-principal a');   // Seleccion todos los links de navegacion-principal

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault(); // Previene la accion por default de moverse rapidamene a cada seccion

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset = "build/img/thumb/${i}.avif" type = "image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
            alt="Imagen Galeria"></img>
        `;
        // ${i} es por donde esta iterando

        imagen.onclick = function () {
            mostrarImagen(i);
        }

        function mostrarImagen(id) {
            const imagen = document.createElement('picture');
            imagen.innerHTML = `
            <source srcset = "build/img/grande/${id}.avif" type = "image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
            alt="Imagen Galeria"></img>
        `;
            // ${i} es por donde esta iterando

            // Crea el Overlay con la imagen
            const overlay = document.createElement('DIV');
            overlay.appendChild(imagen);
            overlay.classList.add('overlay');
            overlay.onclick = function () {  // Cierra la imagen
                const body = document.querySelector('body');
                body.classList.remove('fijar-body');
                overlay.remove();
            }

            // Boton para cerrar el Modal
            const cerrarModal = document.createElement('P');
            cerrarModal.textContent = 'X';
            cerrarModal.classList.add('btn-cerrar');
            cerrarModal.onclick = function () {
                const body = document.querySelector('body');
                body.classList.remove('fijar-body');
                overlay.remove();
            }
            overlay.appendChild(cerrarModal);

            // Añadirlo al HTML 
            const body = document.querySelector('body'); // Agrega la imagen cuando se da el click
            body.appendChild(overlay);
            body.classList.add('fijar-body'); // Cuando abrimos una imagen no se puede dar scroll
        }


        galeria.appendChild(imagen); // Inyecta las imagenes en galeria
    }
}