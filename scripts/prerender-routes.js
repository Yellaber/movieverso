
(async() => {
  require('dotenv').config();

  const API_URL_TMDB = process.env.API_URL_TMDB;
  const API_KEY_TMDB = process.env.API_KEY_TMDB;
  const API_URL_IPGEOLOCATION = process.env.API_URL_IPGEOLOCATION;
  const API_KEY_IPGEOLOCATION = process.env.API_KEY_IPGEOLOCATION;

  if(!API_URL_TMDB || !API_KEY_TMDB) {
    throw new Error('API TMDB environment variables not found.');
  }

  if(!API_URL_IPGEOLOCATION || !API_KEY_IPGEOLOCATION) {
    throw new Error('API IPGEOLOCATION environment variables not found.');
  }

  const fs = require( 'fs' );
  let countryCode = '';
  let language = '';

  const getUserLocation = async() => {
    const userLocation = await fetch(`${API_URL_IPGEOLOCATION}?apiKey=${API_KEY_IPGEOLOCATION}`)
    .then(response => response.json());
    const { location, country_metadata } = userLocation;
    countryCode = location.country_code2;
    language = (country_metadata.languages[0].includes('es'))? country_metadata.languages[0]: 'en-US';
  };

  const getUpcoming = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/movie/upcoming?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}&page=1`).then(response => response.json());
    const totalData = moviesResponse['results'].length;
    return moviesResponse['results'].slice(0, totalData);
  }

  const getTopNowPlaying = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/movie/now_playing?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}&page=1`).then(response => response.json());
    const totalData = moviesResponse['results'].length;
    return moviesResponse['results'].slice(0, totalData);
  }

  const getTopPopular = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/movie/popular?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}&page=1`).then(response => response.json());
    const totalData = moviesResponse['results'].length;
    return moviesResponse['results'].slice(0,totalData);
  }

  const getTopRated = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/movie/top_rated?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}&page=1`).then(response => response.json());
    const totalData = moviesResponse['results'].length;
    return moviesResponse['results'].slice(0, totalData);
  }

  const getTopTrending = async() => {
    const moviesResponse = await fetch(`${API_URL_TMDB}/trending/movie/day?api_key=${API_KEY_TMDB}&region=${countryCode}&language=${language}&page=1`).then(response => response.json());
    const totalData = moviesResponse['results'].length;
    return moviesResponse['results'].slice(0, totalData);
  }

  const slugify = title =>
    title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g, '-');

  await getUserLocation();
  const moviesUpcoming = await getUpcoming();
  const moviesTopNowPlaying = await getTopNowPlaying();
  const moviesTopPopular = await getTopPopular();
  const moviesTopRated = await getTopRated();
  const moviesTopTrending = await getTopTrending();
  let movies = [ ...moviesUpcoming, ...moviesTopNowPlaying, ...moviesTopPopular,
                 ...moviesTopRated, ...moviesTopTrending ];
  movies = movies.filter((movie, index, selfArray) =>
              index === selfArray.findIndex(selfMovie => selfMovie.id === movie.id));
  let fileContent = movies.map(movie =>
    `/movie/${movie['id']}-${slugify(movie['title'])}`).join('\n');
  fs.writeFileSync('routes.txt', fileContent);
  console.log('routes.txt file generated.');
})();
