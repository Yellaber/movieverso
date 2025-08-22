import { render, screen } from '@testing-library/angular';
import { CarruselCardMoviesComponent } from './carrusel-card-movies.component';
import { SlugifyService } from '@shared/services';
import { mockRoutes } from '@app/testing/mock-route';
import { Movie } from '@shared/interfaces';
import { provideRouter } from '@angular/router';
import { environment } from '@app/environments/environment.developments';
import { Component } from '@angular/core';

const mockMovie: Movie = {
  adult: false,
  backdrop_path: '/backdrop.jpg',
  genre_ids: [1, 2],
  id: 1,
  original_language: 'es',
  original_title: 'Pelicula',
  overview: 'Resumen',
  popularity: 10,
  poster_path: '/poster.jpg',
  release_date: new Date( '2024-01-01' ),
  title: 'Pelicula',
  video: false,
  vote_average: 8.5,
  vote_count: 100
};

const bgCardFooter = 'bg-yellow-900/50';

@Component({
  selector: 'rating',
  template: '<li>StubRatingComponent</li>'
})
class StubRatingComponent {};

describe('CarruselCardMoviesComponent.', () => {
  const setup = async(inputs: { movie: Movie, bgCardFooter: string }) => {
    return render(CarruselCardMoviesComponent, {
      imports: [ StubRatingComponent ],
      providers: [
        provideRouter([ mockRoutes[0] ]),
        { provide: SlugifyService, useValue: { getSlug: jest.fn().mockImplementation(() => mockMovie.title) } }
      ],
      inputs
    });
  };

  it('Should render the component when the movie contain a poster path.', async() => {
    const { container } = await setup({ movie: mockMovie, bgCardFooter });
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/movie/${mockMovie.id}-${mockMovie.title}`);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', `${environment.imageUrl}${mockMovie.poster_path}`);

    const ratingsComponent = container.querySelectorAll('rating');
    const footer = ratingsComponent[0].parentElement;
    expect(ratingsComponent.length).toBe(2);
    expect(footer).toHaveClass(bgCardFooter);
  });

  it('Should render the component when the movie not contain a poster path.', async() => {
    const { container } = await setup({
      movie: { ...mockMovie, poster_path: '' },
      bgCardFooter
    });
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/movie/${mockMovie.id}-${mockMovie.title}`);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/no-poster.jpg');

    const ratingsComponent = container.querySelectorAll('rating');
    const footer = ratingsComponent[0].parentElement;
    expect(ratingsComponent.length).toBe(2);
    expect(footer).toHaveClass(bgCardFooter);
  });
});
