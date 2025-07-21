import { TestBed } from '@angular/core/testing';
import { SeoFriendlyService } from './seo-friendly.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@app/environments/environment.developments';

const titlePage = 'Inicio';
const contentPage = 'Esta es la página de inicio.';

describe('Seofriendly Service:', () => {
  let seofriendlyService: SeoFriendlyService;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeoFriendlyService,
        { provide: Title,
          useValue: { setTitle: jest.fn() }
        },
        { provide: Meta,
          useValue: { updateTag: jest.fn() }
        }
      ]
    });
  });

  beforeEach(() => {
    seofriendlyService = TestBed.inject(SeoFriendlyService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('Should create service.', () => {
    expect(seofriendlyService).toBeTruthy();
  });

  it('Should setup the title and meta tags without image.', () => {
    seofriendlyService.setMetaTags(titlePage, contentPage);
    expect(titleService.setTitle).toHaveBeenCalledWith(`${environment.appName} - ${titlePage}`);
    expect(metaService.updateTag).toHaveBeenCalledWith({ name:'description', content: contentPage });
    expect(metaService.updateTag).toHaveBeenCalledWith({ name:'og:title', content: titlePage });
  });

  it('Should setup the title and meta tags with image.', () => {
    const imageUrl = 'https://unsitioweb.com/imagen.jpg';
    seofriendlyService.setMetaTags(titlePage, contentPage, imageUrl);
    expect(metaService.updateTag).toHaveBeenCalledWith({ name:'og:image', content: imageUrl });
  });
});
