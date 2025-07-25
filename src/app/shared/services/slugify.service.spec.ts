import { TestBed } from '@angular/core/testing';
import { SlugifyService } from './slugify.service';

describe('SlugifyService', () => {
  let service: SlugifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlugifyService]
    });
    service = TestBed.inject(SlugifyService);
  });

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('Should convert a simple title to a slug.', () => {
    const title = 'The Lord of the Rings';
    expect(service.getSlug(title)).toBe('the-lord-of-the-rings');
  });

  it('Should remove accents and special characters.', () => {
    const title = 'Película de Acción: Éxito';
    expect(service.getSlug(title)).toBe('pelicula-de-accion-exito');
  });

  it('Should handle multiple non-alphanumeric characters together.', () => {
    const title = 'Star Wars -- The Force Awakens';
    expect(service.getSlug(title)).toBe('star-wars-the-force-awakens');
  });

  it('Should handle numbers in the title.', () => {
    const title = '2001: A Space Odyssey';
    expect(service.getSlug(title)).toBe('2001-a-space-odyssey');
  });

  it('Should handle leading and trailing special characters.', () => {
    const title = '---A Movie---';
    expect(service.getSlug(title)).toBe('-a-movie-');
  });

  it('Should handle an empty string.', () => {
    const title = '';
    expect(service.getSlug(title)).toBe('');
  });
});
