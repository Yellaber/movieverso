import { SlugifyUtils } from './slugify-utils';

describe('SlugifyUtils', () => {
  let title: string;

  it('Should convert a simple title to a slug.', () => {
    title = 'The Lord of the Rings';
    expect(SlugifyUtils.getSlug(title)).toBe('the-lord-of-the-rings');
  })

  it('Should remove accents and special characters.', () => {
    title = 'Película de Acción: Éxito';
    expect(SlugifyUtils.getSlug(title)).toBe('pelicula-de-accion-exito');
  })

  it('Should handle multiple non-alphanumeric characters together.', () => {
    title = 'Star Wars -- The Force Awakens';
    expect(SlugifyUtils.getSlug(title)).toBe('star-wars-the-force-awakens');
  })

  it('Should handle numbers in the title.', () => {
    title = '2001: A Space Odyssey';
    expect(SlugifyUtils.getSlug(title)).toBe('2001-a-space-odyssey');
  })

  it('Should handle leading and trailing special characters.', () => {
    title = '---A Movie---';
    expect(SlugifyUtils.getSlug(title)).toBe('-a-movie-');
  })

  it('Should handle an empty string.', () => {
    title = '';
    expect(SlugifyUtils.getSlug(title)).toBe('');
  })
})
