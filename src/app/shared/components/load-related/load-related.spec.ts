import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoadRelated } from './load-related';
import { TmdbService } from '@services';
import { InfiniteScroll } from '../infinite-scroll/infinite-scroll';
import { MockTmdbService, StubInfiniteScroll } from '@mocks';

describe('LoadRelated', () => {
  let component: LoadRelated;
  let fixture: ComponentFixture<LoadRelated>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LoadRelated ],
      providers: [{ provide: TmdbService, useClass: MockTmdbService }]
    })
    .overrideComponent(LoadRelated, {
      remove: { imports: [ InfiniteScroll ] },
      add: { imports: [ StubInfiniteScroll ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadRelated);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component when movieId input is not null and type input is recommendations', fakeAsync(() => {
    fixture.componentRef.setInput('movieId', 123);
    fixture.componentRef.setInput('type', 'recommendations');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))

  it('Should render the component when movieId input is not null and type input is similar', fakeAsync(() => {
    fixture.componentRef.setInput('movieId', 123);
    fixture.componentRef.setInput('type', 'similar');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))

  it('Should render the component when movieId input is null and type input is an empty string', fakeAsync(() => {
    fixture.componentRef.setInput('movieId', null);
    fixture.componentRef.setInput('type', '');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
    expect(component.paginatedMovies.value()?.length).toBe(0);
    expect(infiniteScrollElement).toBeTruthy();
  }))
})
