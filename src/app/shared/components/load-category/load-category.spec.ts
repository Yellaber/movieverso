import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoadCategory } from './load-category';
import { TmdbService } from '@services';
import { InfiniteScroll } from '../infinite-scroll/infinite-scroll';
import { MockTmdbService, StubInfiniteScroll } from '@mocks';
import { EndPointValid } from '@interfaces';

describe('LoadRelated', () => {
  let component: LoadCategory;
  let fixture: ComponentFixture<LoadCategory>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LoadCategory ],
      providers: [{ provide: TmdbService, useClass: MockTmdbService }]
    })
    .overrideComponent(LoadCategory, {
      remove: { imports: [ InfiniteScroll ] },
      add: { imports: [ StubInfiniteScroll ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadCategory);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component when endPoint input is now-playing', fakeAsync(() => {
    fixture.componentRef.setInput('endPoint', EndPointValid.nowPlaying);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))

  it('Should render the component when endPoint input is upcoming', fakeAsync(() => {
    fixture.componentRef.setInput('endPoint', EndPointValid.upcoming);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))

  it('Should render the component when endPoint input is popular', fakeAsync(() => {
    fixture.componentRef.setInput('endPoint', EndPointValid.popular);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))

  it('Should render the component when endPoint input is top-rated', fakeAsync(() => {
    fixture.componentRef.setInput('endPoint', EndPointValid.topRated);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))

  it('Should render the component when endPoint input is trending', fakeAsync(() => {
    fixture.componentRef.setInput('endPoint', EndPointValid.trending);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))

  it('Should render the component when endPoint input is a string empty', fakeAsync(() => {
    fixture.componentRef.setInput('endPoint', '');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBe(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))

  it('Should render the component when endPoint input is null', fakeAsync(() => {
    fixture.componentRef.setInput('endPoint', null);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBe(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))
})
