import { ComponentFixture, TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/angular';
import { PosterMovie } from './poster-movie';
import { Movie } from '@interfaces';
import { provideRouter } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { mockMovies, mockRoutes, MockTranslatePipe, MockTranslateService } from '@mocks';

const cardSeeMore: Movie = {
  adult: false,
  backdrop_path: '',
  genre_ids: [],
  id: -1,
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '/see-more',
  release_date: new Date(),
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
}

const mockMovie = mockMovies[0];

describe('PosterMovie', () => {
  let component: PosterMovie;
  let fixture: ComponentFixture<PosterMovie>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ PosterMovie ],
      providers: [
        provideRouter(mockRoutes),
        { provide: TranslateService, useClass: MockTranslateService },
      ]
    })
    .overrideComponent(PosterMovie, {
      remove: { imports: [ TranslatePipe ] },
      add: { imports: [ MockTranslatePipe ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosterMovie);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('When id movie is greater than 0', () => {
    it('Should render the poster when movie contains a path', () => {
      fixture.componentRef.setInput('movie', mockMovie);
      fixture.detectChanges();
      const link = screen.getByRole('link');
      const img = screen.getByRole('img');
      const expectedMovieLink = `${component.getMovieLink()[0]}/${component.getMovieLink()[1]}`;
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expectedMovieLink);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockMovie.poster_path);
      expect(img).toHaveAttribute('srcset', '/images/no-poster.jpg 92w, /images/no-poster.jpg 154w, /images/no-poster.jpg 185w, /images/no-poster.jpg 342w, /images/no-poster.jpg 500w, /images/no-poster.jpg 780w');
      expect(img).toHaveAttribute('alt', mockMovie.title);
    })

    it('Should render default image when movie contains poster path empty', () => {
      fixture.componentRef.setInput('movie', { ...mockMovie, poster_path: '' });
      fixture.detectChanges();
      const link = screen.getByRole('link');
      const img = screen.getByRole('img');
      const expectedMovieLink = `${component.getMovieLink()[0]}/${component.getMovieLink()[1]}`;
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expectedMovieLink);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/images/w780-no-poster.jpg');
      expect(img).toHaveAttribute('srcset', '/images/w780-no-poster.jpg 780w');
      expect(img).toHaveAttribute('alt', 'imagen de poster no disponible');
    })
  })

  describe('When id movie is not greater than 0', () => {
    it('Should render the card see more', () => {
      fixture.componentRef.setInput('movie', cardSeeMore);
      fixture.detectChanges();
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', cardSeeMore.poster_path);
    })
  })
})
