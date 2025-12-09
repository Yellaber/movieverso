import { Cast, DetailMovie, Movie } from '../interfaces';

const profileImageSizes = [45, 185, 632];
const backdropImageSizes = [300, 780, 1280];
const posterImageSizes = [92, 154, 185, 342, 500, 780];

export class ImageUtils {
  private isProfileImagePathAvailable(cast: Cast | null): boolean {
    if(!cast) return false;
    return !!cast.profile_path;
  }

  private isBackgroundImagePathAvailable(movie: Movie | DetailMovie | null): boolean {
    if(!movie) return false;
    return !!movie.backdrop_path;
  }

  private isPosterImagePathAvailable(movie: Movie | DetailMovie | null): boolean {
    if(!movie) return false;
    return !!movie.poster_path;
  }

  getProfileImagePath(cast: Cast | null): string {
    return this.isProfileImagePathAvailable(cast)? cast!.profile_path!: '/images/no-profile.jpg';
  }

  getBackgroundImagePath(movie: Movie | DetailMovie | null): string {
    return this.isBackgroundImagePathAvailable(movie)? movie!.backdrop_path: '/images/w1280-no-backdrop.jpg';
  }

  getPosterImagePath(movie: Movie | DetailMovie | null): string {
    return this.isPosterImagePathAvailable(movie)? movie!.poster_path: '/images/w780-no-poster.jpg';
  }

  getProfileName(cast: Cast | null): string {
    return this.isProfileImagePathAvailable(cast)? cast!.original_name: 'imagen de perfil no disponible';
  }

  getBackdropTitle(movie: Movie | DetailMovie | null): string {
    return this.isBackgroundImagePathAvailable(movie)? movie!.title: 'imagen de fondo no disponible';
  }

  getPosterTitle(movie: Movie | DetailMovie | null): string {
    return this.isPosterImagePathAvailable(movie)? movie!.title: 'imagen de poster no disponible';
  }

  getProfileImageSrcset(cast: Cast | null): string {
    return this.isProfileImagePathAvailable(cast)? profileImageSizes.map(size => `${size}w`).join(', '): '185w';
  }

  getBackdropImageSrcset(movie: Movie | DetailMovie | null): string {
    return this.isBackgroundImagePathAvailable(movie)? backdropImageSizes.map(size => `${size}w`).join(', '): '1280w';
  }

  getPosterImageSrcset(movie: Movie | DetailMovie | null): string {
    return this.isPosterImagePathAvailable(movie)? posterImageSizes.map(size => `${size}w`).join(', '): '780w';
  }
}
