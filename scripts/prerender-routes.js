
(async() => {
  const API_URL_TMDB = 'https://api.themoviedb.org/3';
  const API_KEY_TMDB = 'c6eb6487500a7727c7f8fec7a57eb1ab';
  const API_URL_IPGEOLOCATION = 'https://api.ipgeolocation.io/v2/ipgeo';
  const API_KEY_IPGEOLOCATION = '65139d689b9a48b2b125c9365c130b1f';
  let countryCode = '';
  let language = '';
  const fs = require( 'fs' );

  const getUserLocation = async() => {
    const userLocation = await fetch(`${API_URL_IPGEOLOCATION}?apiKey=${API_KEY_IPGEOLOCATION}`)
    .then(response => response.json());
    const { location, country_metadata } = userLocation;
    countryCode = location.country_code2;
    language = (country_metadata.languages[0].includes('es'))? country_metadata.languages[0]: 'en-US';
  };

  const getTopNowPlaying = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/movie/now_playing?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}`).then(response => response.json());
    return moviesResponse['results'].slice(0, 10).sort((movie1, movie2) => {
      const dateMovie1 = new Date(movie1.release_date);
      const dateMovie2 = new Date(movie2.release_date);
      return dateMovie2.getTime() - dateMovie1.getTime()
    });
  }

  const getTopPopular = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/movie/popular?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}`).then(response => response.json());
    return moviesResponse['results'].slice(0, 10);
  }

  const getTopRated = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/movie/top_rated?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}`).then(response => response.json());
    return moviesResponse['results'].slice(0, 10);
  }

  const getTopTrending = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/trending/movie/day?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}`).then(response => response.json());
    return moviesResponse['results'].slice(0, 10);
  }

  const slugify = title =>
    title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g, '-');

  //const moviesUpcoming = await getUpComing();
  getUserLocation();
  const moviesTopNowPlaying = await getTopNowPlaying();
  const moviesTopPopular = await getTopPopular();
  const moviesTopRated = await getTopRated();
  const moviesTopTrending = await getTopTrending();
  let movies = [ ...moviesTopNowPlaying, ...moviesTopPopular,
                 ...moviesTopRated, ...moviesTopTrending ];
  movies = movies.filter((movie, index, selfArray) =>
              index === selfArray.findIndex(selfMovie => selfMovie.id === movie.id));
  let fileContent = movies.map(movie =>
    `/pelicula/${movie['id']}-${slugify(movie['title'])}`).join('\n');
  fs.writeFileSync('routes.txt', fileContent);
  console.log('routes.txt file generated.');
})();
