import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { InfoMovie } from './info-movie';
import { Categories } from '@components/categories/categories';
import { BannerDetail } from '../banner-detail/banner-detail';
import { Credits } from '../credits/credits';
import { SideDetail } from '../side-detail/side-detail';
import { MovieList } from '../movie-list/movie-list';
import { Notification } from '@components/notification/notification';
import { Trailer } from '../trailer/trailer';
import { mockDetailMovie, MockTranslatePipe, StubBannerDetail, StubCategories, StubCredits, StubMovieList, StubNotification, StubSideDetail, StubTrailer } from '@mocks';

describe('InfoMovie', () => {
  let component: InfoMovie;
  let fixture: ComponentFixture<InfoMovie>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ InfoMovie ]
    })
    .overrideComponent(InfoMovie, {
      remove: { imports: [ Categories, BannerDetail, Credits, SideDetail, MovieList, Notification, TranslatePipe, Trailer ] },
      add: { imports: [ StubCategories, StubBannerDetail, StubCredits, StubSideDetail, StubMovieList, StubNotification, MockTranslatePipe, StubTrailer ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoMovie);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should display the detail movie information when movieSelected input is provided', () => {
    fixture.componentRef.setInput('movieSelected', mockDetailMovie);
    fixture.detectChanges();
    const categoriesElement = fixture.nativeElement.querySelector('categories') as HTMLElement;
    const bannerDetailElement = fixture.nativeElement.querySelector('banner-detail') as HTMLElement;
    const creditsElement = fixture.nativeElement.querySelector('credits') as HTMLElement;
    const sideDetailElement = fixture.nativeElement.querySelector('side-detail') as HTMLElement;
    const trailerElement = fixture.nativeElement.querySelector('trailer') as HTMLElement;
    const movieListElements = fixture.nativeElement.querySelectorAll('movie-list') as NodeListOf<HTMLElement>;
    expect(component.idCollection()).toBe(mockDetailMovie.belongs_to_collection?.id);
    expect(categoriesElement).toBeInTheDocument();
    expect(bannerDetailElement).toBeInTheDocument();
    expect(creditsElement).toBeInTheDocument();
    expect(sideDetailElement).toBeInTheDocument();
    expect(trailerElement).toBeInTheDocument();
    expect(movieListElements.length).toBe(3);
  })

  it('Should display the detail movie information when movieSelected input is undefined', () => {
    fixture.componentRef.setInput('movieSelected', undefined);
    fixture.detectChanges();
    const notificationElement = fixture.nativeElement.querySelector('notification') as HTMLElement;
    expect(component.idCollection()).toBeUndefined();
    expect(notificationElement).toBeInTheDocument();
  })
})
