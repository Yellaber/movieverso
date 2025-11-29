import { DetailMovieResponse, Movie } from '../interfaces';

const backdropImageSizes = [300, 780, 1280];
const posterImageSizes = [92, 154, 185, 342, 500, 780];

export class ImageUtils {
  private isBackgroundImagePathAvailable(movie: Movie | DetailMovieResponse | null): boolean {
    if(!movie) return false;
    return !!movie.backdrop_path;
  };

  private isPosterImagePathAvailable(movie: Movie | DetailMovieResponse | null): boolean {
    if(!movie) return false;
    return !!movie.poster_path;
  };

  getBackgroundImagePath(movie: Movie | DetailMovieResponse | null): string {
    return this.isBackgroundImagePathAvailable(movie)? movie!.backdrop_path: '/images/no-backdrop.jpg';
  };

  getPosterImagePath(movie: Movie | DetailMovieResponse | null): string {
    return this.isPosterImagePathAvailable(movie)? movie!.poster_path: '/images/no-poster.jpg';
  };

  getBackdropTitle(movie: Movie | DetailMovieResponse | null): string {
    return this.isBackgroundImagePathAvailable(movie)? movie!.title: 'imagen de fondo no disponible';
  };

  getPosterTitle(movie: Movie | DetailMovieResponse | null): string {
    return this.isPosterImagePathAvailable(movie)? movie!.title: 'imagen de poster no disponible';
  };

  getBackdropImageSrcset(movie: Movie | DetailMovieResponse | null): string {
    return this.isBackgroundImagePathAvailable(movie)? backdropImageSizes.map(size => `${size}w`).join(', '): '0w';
  };

  getPosterImageSrcset(movie: Movie | DetailMovieResponse | null): string {
    return this.isPosterImagePathAvailable(movie)? posterImageSizes.map(size => `${size}w`).join(', '): '0w';
  };
}
