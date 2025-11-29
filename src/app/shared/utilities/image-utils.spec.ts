import { mockMovies, mockDetailMovieResponse } from '@app/testing/mock-tmdb-service';
import { ImageUtils } from './image-utils';

const backgroundImageSrcset = '300w, 780w, 1280w';
const posterImageSrcset = '92w, 154w, 185w, 342w, 500w, 780w';
const mockMovie = mockMovies[0];
const detailMovie = mockDetailMovieResponse;

describe('ImageUtils.', () => {
  let imageUtils: ImageUtils;

  beforeEach(() => {
    imageUtils = new ImageUtils();
  });

  describe('When movie is not set.', () => {
    it('Should return default background image path.', () => {
      expect(imageUtils.getBackgroundImagePath(null)).toBe('/images/no-backdrop.jpg');
    });

    it('Should return default poster image path.', () => {
      expect(imageUtils.getPosterImagePath(null)).toBe('/images/no-poster.jpg');
    });

    it('Should return default backdrop title.', () => {
      expect(imageUtils.getBackdropTitle(null)).toBe('imagen de fondo no disponible');
    });

    it('Should return default poster title.', () => {
      expect(imageUtils.getPosterTitle(null)).toBe('imagen de poster no disponible');
    });

    it('Should return empty backdrop image srcset.', () => {
      expect(imageUtils.getBackdropImageSrcset(null)).toBe('0w');
    });

    it('Should return empty poster image srcset.', () => {
      expect(imageUtils.getPosterImageSrcset(null)).toBe('0w');
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
        expect(imageUtils.getBackgroundImagePath(movieWithEmptyBackdrop)).toBe('/images/no-backdrop.jpg');
      });

      it('Should return default backdrop title if backdrop_path is empty.', () => {
        const movieWithEmptyBackdrop = { ...mockMovie, backdrop_path: '' };
        expect(imageUtils.getBackdropTitle(movieWithEmptyBackdrop)).toBe('imagen de fondo no disponible');
      });

      it('Should return correct backdrop image srcset.', () => {
        expect(imageUtils.getBackdropImageSrcset(mockMovie)).toBe(backgroundImageSrcset);
      });

      it('Should return empty backdrop image srcset.', () => {
        const movieWithEmptyBackdrop = { ...mockMovie, backdrop_path: '' };
        expect(imageUtils.getBackdropImageSrcset(movieWithEmptyBackdrop)).toBe('0w');
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
        expect(imageUtils.getPosterImagePath(movieWithEmptyPoster)).toBe('/images/no-poster.jpg');
      });

      it('Should return default poster title if poster_path is empty.', () => {
        const movieWithEmptyPoster = { ...mockMovie, poster_path: '' };
        expect(imageUtils.getPosterTitle(movieWithEmptyPoster)).toBe('imagen de poster no disponible');
      });

      it('Should return correct poster image srcset.', () => {
        expect(imageUtils.getPosterImageSrcset(mockMovie)).toBe(posterImageSrcset);
      });

      it('Should return empty poster image srcset.', () => {
        const movieWithEmptyPoster = { ...mockMovie, poster_path: '' };
        expect(imageUtils.getPosterImageSrcset(movieWithEmptyPoster)).toBe('0w');
      });
    });
  });

  describe('When movie is an object of type DetailMovieResponse.', () => {
    describe('Background Image Path.', () => {
      it('Should set and get background image path correctly if backdrop_path is available.', () => {
        expect(imageUtils.getBackgroundImagePath(detailMovie)).toBe(detailMovie.backdrop_path);
      });

      it('Should return a backdrop title if backdrop_path is available.', () => {
        expect(imageUtils.getBackdropTitle(detailMovie)).toBe(detailMovie.title);
      });

      it('Should get default background image path if backdrop_path is empty.', () => {
        const movieWithEmptyBackdrop = { ...detailMovie, backdrop_path: '' };
        expect(imageUtils.getBackgroundImagePath(movieWithEmptyBackdrop)).toBe('/images/no-backdrop.jpg');
      });

      it('Should return default backdrop title if backdrop_path is empty.', () => {
        const movieWithEmptyBackdrop = { ...detailMovie, backdrop_path: '' };
        expect(imageUtils.getBackdropTitle(movieWithEmptyBackdrop)).toBe('imagen de fondo no disponible');
      });

      it('Should return correct backdrop image srcset.', () => {
        expect(imageUtils.getBackdropImageSrcset(detailMovie)).toBe(backgroundImageSrcset);
      });

      it('Should return empty backdrop image srcset.', () => {
        const movieWithEmptyBackdrop = { ...detailMovie, backdrop_path: '' };
        expect(imageUtils.getBackdropImageSrcset(movieWithEmptyBackdrop)).toBe('0w');
      });
    });

    describe('Poster Image Path.', () => {
      it('Should set and get poster image path correctly if poster_path is available.', () => {
        expect(imageUtils.getPosterImagePath(detailMovie)).toBe(detailMovie.poster_path);
      });

      it('Should return a poster title if poster_path is available.', () => {
        expect(imageUtils.getPosterTitle(detailMovie)).toBe(detailMovie.title);
      });

      it('Should get default poster image path if poster_path is empty.', () => {
        const movieWithEmptyPoster = { ...detailMovie, poster_path: '' };
        expect(imageUtils.getPosterImagePath(movieWithEmptyPoster)).toBe('/images/no-poster.jpg');
      });

      it('Should return default poster title if poster_path is empty.', () => {
        const movieWithEmptyPoster = { ...detailMovie, poster_path: '' };
        expect(imageUtils.getPosterTitle(movieWithEmptyPoster)).toBe('imagen de poster no disponible');
      });

      it('Should return correct poster image srcset.', () => {
        expect(imageUtils.getPosterImageSrcset(detailMovie)).toBe(posterImageSrcset);
      });

      it('Should return empty poster image srcset.', () => {
        const movieWithEmptyPoster = { ...detailMovie, poster_path: '' };
        expect(imageUtils.getPosterImageSrcset(movieWithEmptyPoster)).toBe('0w');
      });
    });
  });
});
