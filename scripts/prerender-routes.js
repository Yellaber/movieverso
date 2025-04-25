
(async() => {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'c6eb6487500a7727c7f8fec7a57eb1ab';

  const fs = require('fs');

  const getTopPopular = async() => {
    const moviesResponse = await fetch(`${ API_URL }/movie/popular?api_key=${ API_KEY }&language=es-ES`).then(response => response.json());
    return moviesResponse['results'].slice(0, 10);
  }

  const getTopRated = async() => {
    const moviesResponse = await fetch(`${ API_URL }/movie/top_rated?api_key=${ API_KEY }&language=es-ES`).then(response => response.json());
    return moviesResponse['results'].slice(0, 10);
  }

  const getTopReleased = async() => {
    const moviesResponse = await fetch(`${ API_URL }/movie/upcoming?api_key=${ API_KEY }&language=es-ES`).then(response => response.json());
    return moviesResponse['results'].slice(0, 10);
  }

  const slugify = (title) => {
    return title.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
  }

  const moviesTopPopular = await getTopPopular();
  const moviesTopRated = await getTopRated();
  const moviesTopReleased = await getTopReleased();
  let movies = [...moviesTopPopular, ...moviesTopRated, ...moviesTopReleased];
  movies = movies.filter((movie, index, selfArray) =>
              index === selfArray.findIndex(selfMovie => selfMovie.id === movie.id)
           );
  let fileContent = movies.map(movie => `/pelicula/${ movie['id'] }-${ slugify(movie['title']) }`).join('\n');
  fs.writeFileSync('routes.txt', fileContent);
  console.log('routes.txt file generated.');
})();
