import { TestBed } from '@angular/core/testing';
import { SlugifyService } from './slugify.service';

describe('Slugify Service:', () => {
  let slugifyService: SlugifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SlugifyService ]
    });
  });

  beforeEach(() => {
    slugifyService = TestBed.inject(SlugifyService);
  });

  it('Should create service.', () => {
    expect(slugifyService).toBeTruthy();
  });

  it('Should return a slug text.', () => {
    const text = 'titulo de prueba';
    const slugExpected = 'titulo-de-prueba';
    const slugReturnedByService = slugifyService.getSlug(text);
    expect(slugReturnedByService).toEqual(slugExpected);
  });
});
