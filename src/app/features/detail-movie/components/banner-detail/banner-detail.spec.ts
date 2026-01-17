import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerDetail } from './banner-detail';
import { BackgroundImage } from '@components/background-image/background-image';
import { CardDetail } from './card-detail/card-detail';
import { ShortDetail } from './short-detail/short-detail';
import { ImageService } from '@services';
import { mockDetailMovie, StubBackgroundImage, StubCardDetail, StubShortDetail } from '@mocks';

describe('BannerDetail', () => {
  let component: BannerDetail;
  let fixture: ComponentFixture<BannerDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BannerDetail ],
      providers: [{ provide: ImageService }]
    })
    .overrideComponent(BannerDetail, {
      remove: { imports: [ BackgroundImage, CardDetail, ShortDetail ] },
      add: { imports: [ StubBackgroundImage, StubCardDetail, StubShortDetail ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerDetail);
    component = fixture.componentInstance;
  })

  it('Should render the BannerDetail component', () => {
    fixture.componentRef.setInput('movieDetail', mockDetailMovie);
    fixture.detectChanges();
    const backgroundImageElement = fixture.nativeElement.querySelector('background-image') as HTMLElement;
    const cardDetailElement = fixture.nativeElement.querySelector('card-detail') as HTMLElement;
    const shortDetailElement = fixture.nativeElement.querySelector('short-detail') as HTMLElement;
    expect(component.movieDetail()).toBe(mockDetailMovie);
    expect(component.getBackdropImagePath()).toBe(mockDetailMovie.backdrop_path);
    expect(component.getBackdropImageSrcset()).toBe('300w, 780w, 1280w');
    expect(component.getBackdropTitle()).toBe(mockDetailMovie.title);
    expect(backgroundImageElement).toBeInTheDocument();
    expect(cardDetailElement).toBeInTheDocument();
    expect(shortDetailElement).toBeInTheDocument();
  })
})
