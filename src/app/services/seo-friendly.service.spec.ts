import { TestBed } from '@angular/core/testing';
import { SeoFriendlyService } from './seo-friendly.service';
import { Meta, Title } from '@angular/platform-browser';

const titlePage = 'Inicio';
const contentPage = 'Esta es la página de inicio.';

describe('Seofriendly Service:', () => {
  let seofriendlyService: SeoFriendlyService;
  let titleServiceSpy: jasmine.SpyObj<Title>;
  let metaServiceSpy: jasmine.SpyObj<Meta>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeoFriendlyService,
        { provide: Title, useValue: jasmine.createSpyObj('Title', ['setTitle']) },
        { provide: Meta, useValue: jasmine.createSpyObj('Meta', ['updateTag']) }
      ]
    });
  });

  beforeEach(() => {
    seofriendlyService = TestBed.inject(SeoFriendlyService);
    titleServiceSpy = TestBed.inject(Title) as jasmine.SpyObj<Title>;
    metaServiceSpy = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
  });

  it('Should create service.', () => {
    expect(seofriendlyService).toBeTruthy();
  });

  it('Should setup the title and meta tags without image.', () => {
    seofriendlyService.setMetaTags(titlePage, contentPage);
    expect(titleServiceSpy.setTitle).toHaveBeenCalled();
    expect(metaServiceSpy.updateTag).toHaveBeenCalledTimes(2);
  });

  it('Should setup the title and meta tags with image.', () => {
    const imageUrl = 'https://unsitioweb.com/imagen.jpg';
    seofriendlyService.setMetaTags(titlePage, contentPage, imageUrl);
    expect(titleServiceSpy.setTitle).toHaveBeenCalled();
    expect(metaServiceSpy.updateTag).toHaveBeenCalledTimes(3);
  });
});
