import fs from 'fs';
import { environment } from '../src/app/environments/environment.developments';
import { Movie, MovieResponse } from '../src/app/interfaces/movie-response.interface';

const API_KEY = environment.tmdbApiKey;


const slugify = (title: string): string => {
  return title.toLowerCase().normalize('NFD')
          .replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
}

const getTopPopular = async() => {
  const moviesResponse = await fetch(`${ environment.tmdbApiUrl }/movie/popular?api_key=${ environment.tmdbApiKey }&language=es-ES`).then(response => response.json());
  console.log(moviesResponse);
}

getTopPopular();
