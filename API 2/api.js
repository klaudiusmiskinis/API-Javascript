//VARIABLES
var movie;
const api_key = '?api_key=3722f898852e455ea5d23c3285d3ab75'

//INICIALIZACION DE PARAMETROS EN ELEMENTOS
document.getElementById('busqueda').classList.add('marcado')
document.title = "API Peliculas"

//FUNCIONES
document.getElementById('busqueda').onclick = function() {
    document.getElementById('busqueda').classList.add('marcado')
    document.getElementById('novedades').classList.remove('marcado')
    document.getElementById('recientes').classList.remove('marcado')
}

document.getElementById('novedades').onclick = function() {
    document.getElementById('novedades').classList.add('marcado')
    document.getElementById('busqueda').classList.remove('marcado')
    document.getElementById('recientes').classList.remove('marcado')
    var novedades = 'https://api.themoviedb.org/3/movie/top_rated' + api_key
    fetch(novedades)
    .then((resp) => resp.json())
    .then(function(novedades) {
        for (var i = 0; i < novedades.length; i++){
            if (novedades.results[i].poster_path == null) {
                novedades.results[i].imagen = 'image-not-found.png'
            } else {
                novedades.results[i].imagen = 'https://image.tmdb.org/t/p/original' + novedades.results[i].poster_path;
            } try {
                document.getElementById('movie').insertAdjacentHTML('beforeend', generateMovie(novedades.results[i]))
            } catch {
                document.getElementById('general').insertAdjacentHTML('beforeend', '<div class="row justify-content-center mt-5" id="movie"></div>')
                document.getElementById('movie').insertAdjacentHTML('beforeend', generateMovie(novedades.results[i]))
            }
        }
    })
    .catch(function(error) {
        console.log(error);
    })
}

document.getElementById('recientes').onclick = function() {
    document.getElementById('recientes').classList.add('marcado')
    document.getElementById('busqueda').classList.remove('marcado')
    document.getElementById('novedades').classList.remove('marcado')
    var reciente = 'https://api.themoviedb.org/3/trending/movie/week' + api_key
    fetch(reciente)
    .then((resp) => resp.json())
    .then(function(reciente) {
        for (var i = 0; i < reciente.length; i++){
            if (reciente.results[i].poster_path == null) {
                reciente.results[i].imagen = 'image-not-found.png'
            } else {
                reciente.results[i].imagen = 'https://image.tmdb.org/t/p/original' + reciente.results[i].poster_path;
            }
                document.getElementById('general').insertAdjacentHTML('beforeend', '<div class="row justify-content-center mt-5" id="movie"></div>')
                document.getElementById('movie').insertAdjacentHTML('beforeend', generateMovie(reciente.results[i]))
        }
    })
    .catch(function(error) {
        console.log(error);
    })
}



function generateMovie(movie){
    return '<div class="card shadow m-2 peli" style="width: 22rem;" id=' + movie.id + '>' +
           '<img src=' + movie.imagen + ' class="card-img-top mt-2 shadow-sm rounded" alt="80">' +
                '<div class="card-body">' +
                '<h6 class="card-title">' + movie.title + '</h6>' +
                '<p class="card-text">' + movie.overview + '</p>' +
            '</div>' +
            '</div>'
}

document.getElementById('buscar').onclick = function buscar(){
    if(document.getElementById('pelicula').value != "") {
    var buscador = 'https://api.themoviedb.org/3/search/movie' +  api_key + '&query=' + document.getElementById('pelicula').value.replaceAll(' ', '%20');
    fetch(buscador)
    .then((resp) => resp.json())
    .then(function(data) {
            movie = data;
            if (movie.results.length > 0) {
                document.getElementById('movie').remove()
            for (var i = 0; i < movie.results.length; i++){
                if (movie.results[i].poster_path == null) {
                    movie.results[i].imagen = 'image-not-found.png'
                } else {
                    movie.results[i].imagen = 'https://image.tmdb.org/t/p/original' + movie.results[i].poster_path;
                } try {
                    document.getElementById('movie').insertAdjacentHTML('beforeend', generateMovie(movie.results[i]))
                } catch {
                    document.getElementById('general').insertAdjacentHTML('beforeend', '<div class="row justify-content-center mt-5" id="movie"></div>')
                    document.getElementById('movie').insertAdjacentHTML('beforeend', generateMovie(movie.results[i]))
                }
            }
            } else {
                var notFound = '<div class="container-sm"><div class="text-center alert alert-danger" role="alert" id="alert-not-found">Movie not found</div></div>'
                try {
                    document.getElementById('movie').insertAdjacentHTML('beforeend', notFound)
                } catch {
                    document.getElementById('general').insertAdjacentHTML('beforeend', '<div class="row justify-content-center mt-5" id="movie"></div>')
                    document.getElementById('movie').insertAdjacentHTML('beforeend',  notFound)
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}
