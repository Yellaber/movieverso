import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerHero } from './banner-hero';
import { BackgroundImage } from '@components/background-image/background-image';
import { ShortInformation } from './short-information/short-information';
import { BackdropImage } from './backdrop-image/backdrop-image';
import { ImageService } from '@services';
import { mockMovies, StubBackdropImage, StubBackgroundImage, StubShortInformation } from '@mocks';

const mockMovie = mockMovies[0];

describe('BannerHero', () => {
  let component: BannerHero;
  let fixture: ComponentFixture<BannerHero>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BannerHero ],
      providers: [{ provide: ImageService }]
    })
    .overrideComponent(BannerHero, {
      remove: { imports: [ BackgroundImage, ShortInformation, BackdropImage ] },
      add: { imports: [ StubBackgroundImage, StubShortInformation, StubBackdropImage] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerHero);
    component = fixture.componentInstance;
  })

  it('Should render the BannerHero component', () => {
    fixture.componentRef.setInput('heroType', 'movie');
    fixture.componentRef.setInput('heroTitle', 'Mock Movie Title');
    fixture.componentRef.setInput('movie', mockMovie);
    fixture.detectChanges();
    const backgroundImageElement = fixture.nativeElement.querySelector('background-image') as HTMLElement;
    const shortInformationElement = fixture.nativeElement.querySelector('short-information') as HTMLElement;
    const backdropImageElement = fixture.nativeElement.querySelector('backdrop-image') as HTMLElement;
    expect(component.movie()).toBe(mockMovie);
    expect(component.getBackdropImagePath()).toBe(mockMovie.backdrop_path);
    expect(component.getBackdropImageSrcset()).toBe('300w, 780w, 1280w');
    expect(component.getBackdropTitle()).toBe(mockMovie.title);
    expect(backgroundImageElement).toBeInTheDocument();
    expect(shortInformationElement).toBeInTheDocument();
    expect(backdropImageElement).toBeInTheDocument();
  })
})
