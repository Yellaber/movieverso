import { mockMovies, mockDetailMovieResponse } from '@app/testing/mock-tmdb-service';
import { ImageUtils } from './image-utils';

const backgroundImageSrcset = '300w, 780w, 1280w';
const posterImageSrcset = '92w, 154w, 185w, 342w, 500w, 780w';
const mockMovie = mockMovies[0];
const detailMovie = mockDetailMovieResponse;

describe('ImageUtils', () => {
  let imageUtils: ImageUtils;

  beforeEach(() => {
    imageUtils = new ImageUtils();
  });

  describe('When movie is not set', () => {
    it('Should return false for background image path availability', () => {
      expect(imageUtils.isBackgroundImagePathAvailable()).toBe(false);
    });

    it('Should return false for poster image path availability', () => {
      expect(imageUtils.isPosterImagePathAvailable()).toBe(false);
    });

    it('Should return default background image path', () => {
      expect(imageUtils.getBackgroundImagePath()).toBe('/images/no-backdrop.jpg');
    });

    it('Should return default poster image path', () => {
      expect(imageUtils.getPosterImagePath()).toBe('/images/no-poster.jpg');
    });
  });

  describe('When movie is an object of type Movie', () => {
    describe('Background Image Path', () => {
      it('Should set and get background image path correctly', () => {
        imageUtils.setMovie(mockMovie);
        expect(imageUtils.getBackgroundImagePath()).toBe(mockMovie.backdrop_path);
      });

      it('Should get empty background image path', () => {
        const movieWithEmptyBackdrop = { ...mockMovie, backdrop_path: '' };
        imageUtils.setMovie(movieWithEmptyBackdrop);
        expect(imageUtils.getBackgroundImagePath()).toBe('/images/no-backdrop.jpg');
      });

      it('Should correctly identify if background image path is available', () => {
        expect(imageUtils.isBackgroundImagePathAvailable()).toBe(false);
        imageUtils.setMovie(mockMovie);
        expect(imageUtils.isBackgroundImagePathAvailable()).toBe(true);
      });

      it('Should return correct backdrop image srcset', () => {
        expect(imageUtils.getBackdropImageSrcset()).toBe(backgroundImageSrcset);
      });
    });

    describe('Poster Image Path', () => {
      it('Should set and get poster image path correctly', () => {
        imageUtils.setMovie(mockMovie);
        expect(imageUtils.getPosterImagePath()).toBe(mockMovie.poster_path);
      });

      it('Should get empty poster image path', () => {
        const movieWithEmptyPoster = { ...mockMovie, poster_path: '' };
        imageUtils.setMovie(movieWithEmptyPoster);
        expect(imageUtils.getPosterImagePath()).toBe('/images/no-poster.jpg');
      });

      it('Should correctly identify if poster image path is available', () => {
        expect(imageUtils.isPosterImagePathAvailable()).toBe(false);
        imageUtils.setMovie(mockMovie);
        expect(imageUtils.isPosterImagePathAvailable()).toBe(true);
      });

      it('Should return correct poster image srcset', () => {
        expect(imageUtils.getPosterImageSrcset()).toBe(posterImageSrcset);
      });
    });
  });

  describe('When movie is an object of type DetailMovieResponse', () => {
    describe('Background Image Path', () => {
      it('Should set and get background image path correctly', () => {
        imageUtils.setMovie(detailMovie);
        expect(imageUtils.getBackgroundImagePath()).toBe(detailMovie.backdrop_path);
      });

      it('Should get empty background image path', () => {
        const movieWithEmptyBackdrop = { ...detailMovie, backdrop_path: '' };
        imageUtils.setMovie(movieWithEmptyBackdrop);
        expect(imageUtils.getBackgroundImagePath()).toBe('/images/no-backdrop.jpg');
      });

      it('Should correctly identify if background image path is available', () => {
        expect(imageUtils.isBackgroundImagePathAvailable()).toBe(false);
        imageUtils.setMovie(detailMovie);
        expect(imageUtils.isBackgroundImagePathAvailable()).toBe(true);
      });

      it('Should return correct backdrop image srcset', () => {
        expect(imageUtils.getBackdropImageSrcset()).toBe(backgroundImageSrcset);
      });
    });

    describe('Poster Image Path', () => {
      it('Should set and get poster image path correctly', () => {
        imageUtils.setMovie(detailMovie);
        expect(imageUtils.getPosterImagePath()).toBe(detailMovie.poster_path);
      });

      it('Should get empty poster image path', () => {
        const movieWithEmptyPoster = { ...detailMovie, poster_path: '' };
        imageUtils.setMovie(movieWithEmptyPoster);
        expect(imageUtils.getPosterImagePath()).toBe('/images/no-poster.jpg');
      });

      it('Should correctly identify if poster image path is available', () => {
        expect(imageUtils.isPosterImagePathAvailable()).toBe(false);
        imageUtils.setMovie(detailMovie);
        expect(imageUtils.isPosterImagePathAvailable()).toBe(true);
      });

      it('Should return correct poster image srcset', () => {
        expect(imageUtils.getPosterImageSrcset()).toBe(posterImageSrcset);
      });
    });
  });
});
