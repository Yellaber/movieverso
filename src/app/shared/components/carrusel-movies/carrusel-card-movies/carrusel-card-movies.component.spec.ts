import { render, screen } from '@testing-library/angular';
import { CarruselCardMoviesComponent } from './carrusel-card-movies.component';
import { SlugifyService } from '@shared/services';
import { Movie } from '@shared/interfaces';
import { provideRouter } from '@angular/router';
import { mockMovies, mockRoutes, StubRatingComponent } from '@app/testing';

const mockMovie = mockMovies[0];
const slug = mockMovie.title.replace(/\s+/g, '-').toLowerCase();
const idSlug = `${mockMovie.id}-${slug}`;
const bgCardFooter = 'bg-yellow-900/50';

describe('CarruselCardMoviesComponent.', () => {
  const setup = async(inputs: { movie: Movie, bgCardFooter: string }) => {
    return render(CarruselCardMoviesComponent, {
      imports: [ StubRatingComponent ],
      providers: [
        provideRouter([ mockRoutes[0] ]),
        { provide: SlugifyService, useValue: { getSlug: jest.fn().mockImplementation(() => slug) } }
      ],
      inputs
    });
  };

  it('Should render the component when the movie contain a poster path.', async() => {
    const { container } = await setup({ movie: mockMovie, bgCardFooter });
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/movie/${idSlug}`);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockMovie.poster_path);
    expect(img).toHaveAttribute('alt', mockMovie.title);

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
    expect(link).toHaveAttribute('href', `/movie/${idSlug}`);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/no-poster.jpg');
    expect(img).toHaveAttribute('alt', 'imagen de poster no disponible');

    const ratingsComponent = container.querySelectorAll('rating');
    const footer = ratingsComponent[0].parentElement;
    expect(ratingsComponent.length).toBe(2);
    expect(footer).toHaveClass(bgCardFooter);
  });
});
