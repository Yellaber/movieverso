import { mockMovies, mockDetailMovie } from '@mocks';
import { ImageUtils } from './image-utils';

const backgroundImageSrcset = '300w, 780w, 1280w';
const posterImageSrcset = '92w, 154w, 185w, 342w, 500w, 780w';
const defaultBackdropPath = '/images/w1280-no-backdrop.jpg';
const defaultPosterPath = '/images/w780-no-poster.jpg';
const defaultBackdropTitle = 'imagen de fondo no disponible';
const defaultPosterTitle = 'imagen de poster no disponible';
const mockMovie = mockMovies[0];

describe('ImageUtils.', () => {
  let imageUtils: ImageUtils;

  beforeEach(() => {
    imageUtils = new ImageUtils();
  });

  describe('When movie is not set.', () => {
    it('Should return default background image path.', () => {
      expect(imageUtils.getBackgroundImagePath(null)).toBe(defaultBackdropPath);
    });

    it('Should return default poster image path.', () => {
      expect(imageUtils.getPosterImagePath(null)).toBe(defaultPosterPath);
    });

    it('Should return default backdrop title.', () => {
      expect(imageUtils.getBackdropTitle(null)).toBe(defaultBackdropTitle);
    });

    it('Should return default poster title.', () => {
      expect(imageUtils.getPosterTitle(null)).toBe(defaultPosterTitle);
    });

    it('Should return empty backdrop image srcset.', () => {
      expect(imageUtils.getBackdropImageSrcset(null)).toBe('1280w');
    });

    it('Should return empty poster image srcset.', () => {
      expect(imageUtils.getPosterImageSrcset(null)).toBe('780w');
    });
  });

  describe('When movie is an object of type Movie.', () => {
    describe('Background Image Path.', () => {
      it('Should set and get background image path correctly if backdrop_path is available.', () => {
        expect(imageUtils.getBackgroundImagePath(mockMovie)).toBe(mockMovie.backdrop_path);
      });

      it('Should return a backdrop title if backdrop_path is available.', () => {
        expect(imageUtils.getBackdropTitle(mockMovie)).toBe(mockMovie.title);
      });

      it('Should get default background image path if backdrop_path is empty.', () => {
        const movieWithEmptyBackdrop = { ...mockMovie, backdrop_path: '' };
        expect(imageUtils.getBackgroundImagePath(movieWithEmptyBackdrop)).toBe(defaultBackdropPath);
      });

      it('Should return default backdrop title if backdrop_path is empty.', () => {
        const movieWithEmptyBackdrop = { ...mockMovie, backdrop_path: '' };
        expect(imageUtils.getBackdropTitle(movieWithEmptyBackdrop)).toBe(defaultBackdropTitle);
      });

      it('Should return correct backdrop image srcset.', () => {
        expect(imageUtils.getBackdropImageSrcset(mockMovie)).toBe(backgroundImageSrcset);
      });

      it('Should return empty backdrop image srcset.', () => {
        const movieWithEmptyBackdrop = { ...mockMovie, backdrop_path: '' };
        expect(imageUtils.getBackdropImageSrcset(movieWithEmptyBackdrop)).toBe('1280w');
      });
    });

    describe('Poster Image Path.', () => {
      it('Should set and get poster image path correctly if poster_path is available.', () => {
        expect(imageUtils.getPosterImagePath(mockMovie)).toBe(mockMovie.poster_path);
      });

      it('Should return a poster title if poster_path is available.', () => {
        expect(imageUtils.getPosterTitle(mockMovie)).toBe(mockMovie.title);
      });

      it('Should get default poster image path if poster_path is empty.', () => {
        const movieWithEmptyPoster = { ...mockMovie, poster_path: '' };
        expect(imageUtils.getPosterImagePath(movieWithEmptyPoster)).toBe(defaultPosterPath);
      });

      it('Should return default poster title if poster_path is empty.', () => {
        const movieWithEmptyPoster = { ...mockMovie, poster_path: '' };
        expect(imageUtils.getPosterTitle(movieWithEmptyPoster)).toBe(defaultPosterTitle);
      });

      it('Should return correct poster image srcset.', () => {
        expect(imageUtils.getPosterImageSrcset(mockMovie)).toBe(posterImageSrcset);
      });

      it('Should return empty poster image srcset.', () => {
        const movieWithEmptyPoster = { ...mockMovie, poster_path: '' };
        expect(imageUtils.getPosterImageSrcset(movieWithEmptyPoster)).toBe('780w');
      });
    });
  });

  describe('When movie is an object of type DetailMovieResponse.', () => {
    describe('Background Image Path.', () => {
      it('Should set and get background image path correctly if backdrop_path is available.', () => {
        expect(imageUtils.getBackgroundImagePath(mockDetailMovie)).toBe(mockDetailMovie.backdrop_path);
      });

      it('Should return a backdrop title if backdrop_path is available.', () => {
        expect(imageUtils.getBackdropTitle(mockDetailMovie)).toBe(mockDetailMovie.title);
      });

      it('Should get default background image path if backdrop_path is empty.', () => {
        const movieWithEmptyBackdrop = { ...mockDetailMovie, backdrop_path: '' };
        expect(imageUtils.getBackgroundImagePath(movieWithEmptyBackdrop)).toBe(defaultBackdropPath);
      });

      it('Should return default backdrop title if backdrop_path is empty.', () => {
        const movieWithEmptyBackdrop = { ...mockDetailMovie, backdrop_path: '' };
        expect(imageUtils.getBackdropTitle(movieWithEmptyBackdrop)).toBe(defaultBackdropTitle);
      });

      it('Should return correct backdrop image srcset.', () => {
        expect(imageUtils.getBackdropImageSrcset(mockDetailMovie)).toBe(backgroundImageSrcset);
      });

      it('Should return empty backdrop image srcset.', () => {
        const movieWithEmptyBackdrop = { ...mockDetailMovie, backdrop_path: '' };
        expect(imageUtils.getBackdropImageSrcset(movieWithEmptyBackdrop)).toBe('1280w');
      });
    });

    describe('Poster Image Path.', () => {
      it('Should set and get poster image path correctly if poster_path is available.', () => {
        expect(imageUtils.getPosterImagePath(mockDetailMovie)).toBe(mockDetailMovie.poster_path);
      });

      it('Should return a poster title if poster_path is available.', () => {
        expect(imageUtils.getPosterTitle(mockDetailMovie)).toBe(mockDetailMovie.title);
      });

      it('Should get default poster image path if poster_path is empty.', () => {
        const movieWithEmptyPoster = { ...mockDetailMovie, poster_path: '' };
        expect(imageUtils.getPosterImagePath(movieWithEmptyPoster)).toBe(defaultPosterPath);
      });

      it('Should return default poster title if poster_path is empty.', () => {
        const movieWithEmptyPoster = { ...mockDetailMovie, poster_path: '' };
        expect(imageUtils.getPosterTitle(movieWithEmptyPoster)).toBe(defaultPosterTitle);
      });

      it('Should return correct poster image srcset.', () => {
        expect(imageUtils.getPosterImageSrcset(mockDetailMovie)).toBe(posterImageSrcset);
      });

      it('Should return empty poster image srcset.', () => {
        const movieWithEmptyPoster = { ...mockDetailMovie, poster_path: '' };
        expect(imageUtils.getPosterImageSrcset(movieWithEmptyPoster)).toBe('780w');
      });
    });
  });
});
