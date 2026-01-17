import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { InfoMovie } from './components/info-movie/info-movie';
import { BannerDetailSkeleton } from './components/banner-detail-skeleton/banner-detail-skeleton';
import { SideDetailSkeleton } from './components/side-detail-skeleton/side-detail-skeleton';
import { CarouselMoviesSkeleton } from '@components/carousel-movies-skeleton/carousel-movies-skeleton';
import DetailMovie from './detail-movie';
import { ScrollService, SeoFriendlyService, TmdbService } from '@services';
import { MockActivedRoute, MockScrollService, MockSeoFriendlyService, MockTmdbService, MockTranslateService, StubBannerDetailSkeleton, StubCarouselMoviesSkeleton, StubInfoMovie, StubSideDetailSkeleton } from '@mocks';

describe('DetailMovie', () => {
  let component: DetailMovie;
  let fixture: ComponentFixture<DetailMovie>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DetailMovie ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivedRoute },
        { provide: TmdbService, useClass: MockTmdbService },
        { provide: SeoFriendlyService, useClass: MockSeoFriendlyService },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ScrollService, useClass: MockScrollService }
      ]
    })
    .overrideComponent(DetailMovie, {
      remove: { imports: [ InfoMovie, BannerDetailSkeleton, SideDetailSkeleton, CarouselMoviesSkeleton ] },
      add: { imports: [ StubInfoMovie, StubBannerDetailSkeleton, StubSideDetailSkeleton, StubCarouselMoviesSkeleton ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should render the info movie component when the movie detail is loaded', fakeAsync(() => {
    const bannerDetailSekeleton = fixture.debugElement.nativeElement.querySelector('banner-detail-skeleton') as HTMLElement;
    const sideDetailSkeleton = fixture.debugElement.nativeElement.querySelector('side-detail-skeleton') as HTMLElement;
    const carouselMoviesSkeletons = fixture.debugElement.nativeElement.querySelectorAll('carousel-movies-skeleton') as NodeListOf<HTMLElement>;
    expect(component.movieSelected).toBeDefined();
    expect(bannerDetailSekeleton).toBeInTheDocument();
    expect(sideDetailSkeleton).toBeInTheDocument();
    expect(carouselMoviesSkeletons.length).toBe(3);
    tick();
    fixture.detectChanges();
    const infoMovie = fixture.debugElement.nativeElement.querySelector('info-movie') as HTMLElement;
    expect(infoMovie).toBeInTheDocument();
  }))
})
