import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { SectionMovie } from './section-movie';
import { BannerHero } from '../banner-hero/banner-hero';
import { CarouselMovies } from '@components/carousel-movies/carousel-movies';
import { HomeService } from '@services';
import { MockHomeService, MockTranslateService, StubBannerHero, StubCarouselMovies } from '@mocks';
import { DataSectionMovie } from '@interfaces';

describe('SectionMovie', () => {
  let component: SectionMovie;
  let fixture: ComponentFixture<SectionMovie>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SectionMovie ],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: HomeService, useClass: MockHomeService }
      ]
    })
    .overrideComponent(SectionMovie, {
      remove: { imports: [ BannerHero, CarouselMovies ] },
      add: { imports: [ StubBannerHero, StubCarouselMovies ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionMovie);
    component = fixture.componentInstance;
  })

  it('Should render the SectionMovie component when heroType is now-playing', fakeAsync(() => {
    const mockSection: DataSectionMovie = {
      heroType: 'now-playing',
      heroTitle: 'Now Playing',
      carouselTitle: 'Now Playing Movies'
    };
    fixture.componentRef.setInput('section', mockSection);
    fixture.detectChanges();
    const bannerHeroSkeletonElement = fixture.nativeElement.querySelector('banner-hero-skeleton') as HTMLElement;
    const carouselMoviesSkeletonElement = fixture.nativeElement.querySelector('carousel-movies-skeleton') as HTMLElement;
    expect(bannerHeroSkeletonElement).toBeInTheDocument();
    expect(carouselMoviesSkeletonElement).toBeInTheDocument();
    tick();
    fixture.detectChanges();
    const bannerHeroElement = fixture.nativeElement.querySelector('banner-hero') as HTMLElement;
    const carouselMoviesElement = fixture.nativeElement.querySelector('carousel-movies') as HTMLElement;
    expect(component.movies().length).toBeGreaterThan(0);
    expect(bannerHeroElement).toBeInTheDocument();
    expect(carouselMoviesElement).toBeInTheDocument();
    expect(component.carouselConfig().carouselTitle).toBe('Now Playing Movies');
  }))

  it('Should render the SectionMovie component when heroType is popular', fakeAsync(() => {
    const mockSection: DataSectionMovie = {
      heroType: 'popular',
      heroTitle: 'More Populars',
      carouselTitle: 'Popular Movies'
    };
    fixture.componentRef.setInput('section', mockSection);
    fixture.detectChanges();
    const bannerHeroSkeletonElement = fixture.nativeElement.querySelector('banner-hero-skeleton') as HTMLElement;
    const carouselMoviesSkeletonElement = fixture.nativeElement.querySelector('carousel-movies-skeleton') as HTMLElement;
    expect(bannerHeroSkeletonElement).toBeInTheDocument();
    expect(carouselMoviesSkeletonElement).toBeInTheDocument();
    tick();
    fixture.detectChanges();
    const bannerHeroElement = fixture.nativeElement.querySelector('banner-hero') as HTMLElement;
    const carouselMoviesElement = fixture.nativeElement.querySelector('carousel-movies') as HTMLElement;
    expect(component.movies().length).toBeGreaterThan(0);
    expect(bannerHeroElement).toBeInTheDocument();
    expect(carouselMoviesElement).toBeInTheDocument();
    expect(component.carouselConfig().carouselTitle).toBe('Popular Movies');
  }))

  it('Should render the SectionMovie component when heroType is top-rated', fakeAsync(() => {
    const mockSection: DataSectionMovie = {
      heroType: 'top-rated',
      heroTitle: 'Top Rated',
      carouselTitle: 'Top Rated Movies'
    };
    fixture.componentRef.setInput('section', mockSection);
    fixture.detectChanges();
    const bannerHeroSkeletonElement = fixture.nativeElement.querySelector('banner-hero-skeleton') as HTMLElement;
    const carouselMoviesSkeletonElement = fixture.nativeElement.querySelector('carousel-movies-skeleton') as HTMLElement;
    expect(bannerHeroSkeletonElement).toBeInTheDocument();
    expect(carouselMoviesSkeletonElement).toBeInTheDocument();
    tick();
    fixture.detectChanges();
    const bannerHeroElement = fixture.nativeElement.querySelector('banner-hero') as HTMLElement;
    const carouselMoviesElement = fixture.nativeElement.querySelector('carousel-movies') as HTMLElement;
    expect(component.movies().length).toBeGreaterThan(0);
    expect(bannerHeroElement).toBeInTheDocument();
    expect(carouselMoviesElement).toBeInTheDocument();
    expect(component.carouselConfig().carouselTitle).toBe('Top Rated Movies');
  }))

  it('Should render the SectionMovie component when heroType is trending', fakeAsync(() => {
    const mockSection: DataSectionMovie = {
      heroType: 'trending',
      heroTitle: 'Trending',
      carouselTitle: 'Trending Movies'
    };
    fixture.componentRef.setInput('section', mockSection);
    fixture.detectChanges();
    const bannerHeroSkeletonElement = fixture.nativeElement.querySelector('banner-hero-skeleton') as HTMLElement;
    const carouselMoviesSkeletonElement = fixture.nativeElement.querySelector('carousel-movies-skeleton') as HTMLElement;
    expect(bannerHeroSkeletonElement).toBeInTheDocument();
    expect(carouselMoviesSkeletonElement).toBeInTheDocument();
    tick();
    fixture.detectChanges();
    const bannerHeroElement = fixture.nativeElement.querySelector('banner-hero') as HTMLElement;
    const carouselMoviesElement = fixture.nativeElement.querySelector('carousel-movies') as HTMLElement;
    expect(component.movies().length).toBeGreaterThan(0);
    expect(bannerHeroElement).toBeInTheDocument();
    expect(carouselMoviesElement).toBeInTheDocument();
    expect(component.carouselConfig().carouselTitle).toBe('Trending Movies');
  }))
})
