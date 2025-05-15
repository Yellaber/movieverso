
(async() => {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'c6eb6487500a7727c7f8fec7a57eb1ab';
  const fs = require( 'fs' );

  const getUpComing = async() => {
    const moviesResponse = await fetch( `${ API_URL }/movie/upcoming?api_key=${ API_KEY }&language=es-ES` ).then( response => response.json() );
    const moviesResponseSliced = moviesResponse[ 'results' ].slice(0, 10);
    const moviesResponseOrdered = moviesResponseSliced.sort(( movie1, movie2 ) => {
      const dateMovie1 = new Date( movie1.release_date );
      const dateMovie2 = new Date( movie2.release_date );
      return dateMovie1.getTime() - dateMovie2.getTime()
    });
    return moviesResponseOrdered.filter( movie => {
      const dateMovie = new Date( movie.release_date );
      return ( currentDate < dateMovie ) && movie;
    } );
  }

  const getTopNowPlaying = async() => {
    const moviesResponse = await fetch( `${ API_URL }/movie/now_playing?api_key=${ API_KEY }&language=es-ES` ).then( response => response.json() );
    return moviesResponse[ 'results' ].slice(0, 10).sort(( movie1, movie2 ) => {
      const dateMovie1 = new Date( movie1.release_date );
      const dateMovie2 = new Date( movie2.release_date );
      return dateMovie2.getTime() - dateMovie1.getTime()
    });
  }

  const getTopPopular = async() => {
    const moviesResponse = await fetch( `${ API_URL }/movie/popular?api_key=${ API_KEY }&language=es-ES` ).then( response => response.json() );
    return moviesResponse[ 'results' ].slice(0, 10);
  }

  const getTopRated = async() => {
    const moviesResponse = await fetch( `${ API_URL }/movie/top_rated?api_key=${ API_KEY }&language=es-ES` ).then( response => response.json() );
    return moviesResponse[ 'results' ].slice(0, 10);
  }

  const getTopTrending = async() => {
    const moviesResponse = await fetch( `${ API_URL }/trending/movie/day?api_key=${ API_KEY }&language=es-ES` ).then( response => response.json() );
    return moviesResponse[ 'results' ].slice(0, 10);
  }

  const slugify = title => {
    return title.toLowerCase().normalize( 'NFD' )
            .replace( /[\u0300-\u036f]/g,'' ).replace( /[^a-z0-9]+/g, '-' );
  }

  const moviesUpcoming = await getUpComing();
  const moviesTopNowPlaying = await getTopNowPlaying();
  const moviesTopPopular = await getTopPopular();
  const moviesTopRated = await getTopRated();
  const moviesTopTrending = await getTopTrending();
  let movies = [ ...moviesTopNowPlaying, ...moviesTopPopular,
                 ...moviesTopRated, ...moviesTopTrending, ...moviesUpcoming ];
  movies = movies.filter( (movie, index, selfArray) =>
              index === selfArray.findIndex( selfMovie => selfMovie.id === movie.id ) );
  let fileContent = movies.map( movie =>
    `/pelicula/${ movie[ 'id' ] }-${ slugify( movie[ 'title' ] ) }`).join( '\n' );
  fs.writeFileSync( 'routes.txt', fileContent );
  console.log( 'routes.txt file generated.' );
})();
