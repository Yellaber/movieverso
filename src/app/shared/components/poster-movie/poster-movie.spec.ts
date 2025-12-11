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
};

const mockMovie = mockMovies[0];
const slug = mockMovie.title.replace(/\s+/g, '-').toLowerCase();
const idSlug = `${mockMovie.id}-${slug}`;

describe('PosterMovie.', () => {
  let fixture: ComponentFixture<PosterMovie>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ PosterMovie ],
      providers: [
        provideRouter([ mockRoutes[0] ]),
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(PosterMovie, {
      remove: { imports: [ TranslatePipe ] },
      add: { imports: [ MockTranslatePipe ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosterMovie);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('If the id movie is greater than 0.', () => {
    it('Should render the poster when movie contains a path.', () => {
      fixture.componentRef.setInput('movie', mockMovie);
      fixture.detectChanges();
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/movie/${idSlug}`);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockMovie.poster_path);
      expect(img).toHaveAttribute('alt', mockMovie.title);
    })

    it('Should render default image when movie contains poster path empty.', () => {
      fixture.componentRef.setInput('movie', { ...mockMovie, poster_path: '' });
      fixture.detectChanges();
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/movie/${idSlug}`);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/images/w780-no-poster.jpg');
      expect(img).toHaveAttribute('alt', 'imagen de poster no disponible');
    })
  })

  describe('If the id movie is not greater than 0.', () => {
    it('Should render the card see more.', () => {
      fixture.componentRef.setInput('movie', cardSeeMore);
      fixture.detectChanges();
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', cardSeeMore.poster_path);
    })
  })
})
