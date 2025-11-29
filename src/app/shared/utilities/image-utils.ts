import { DetailMovieResponse, Movie } from '../interfaces';

const backdropImageSizes = [300, 780, 1280];
const posterImageSizes = [92, 154, 185, 342, 500, 780];

export class ImageUtils {
  private movie: Movie | DetailMovieResponse | null = null;

  setMovie(movie: Movie | DetailMovieResponse) { this.movie = movie; };

  isBackgroundImagePathAvailable(): boolean {
    if(!this.movie) return false;
    return !!this.movie.backdrop_path;
  };

  isPosterImagePathAvailable(): boolean {
    if(!this.movie) return false;
    return !!this.movie.poster_path;
  };

  getBackgroundImagePath(): string {
    return this.isBackgroundImagePathAvailable()? this.movie!.backdrop_path: '/images/no-backdrop.jpg';
  };

  getPosterImagePath(): string {
    return this.isPosterImagePathAvailable()? this.movie!.poster_path: '/images/no-poster.jpg';
  };

  getBackdropTitle(): string {
    return this.isBackgroundImagePathAvailable()? this.movie!.title: 'imagen de fondo no disponible';
  };

  getPosterTitle(): string {
    return this.isPosterImagePathAvailable()? this.movie!.title: 'imagen de poster no disponible';
  };

  getBackdropImageSrcset(): string { return backdropImageSizes.map(size => `${size}w`).join(', '); };

  getPosterImageSrcset(): string { return posterImageSizes.map(size => `${size}w`).join(', '); };
}
