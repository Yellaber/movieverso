import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Tag } from '@components/tag/tag';
import { Rating } from '@components/rating/rating';
import { BadgeList } from '@components/badge-list/badge-list';
import { ShortInformation } from './short-information';
import { TmdbService } from '@services';
import { mockMovies, mockRoutes, MockTmdbService, MockTranslatePipe, StubBadgeList, StubRating, StubTag } from '@mocks';

const mockMovie = mockMovies[0];

describe('ShortInformation', () => {
  let component: ShortInformation;
  let fixture: ComponentFixture<ShortInformation>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ ShortInformation ],
      providers: [
        provideRouter(mockRoutes),
        { provide: TmdbService, useClass: MockTmdbService }
      ]
    })
    .overrideComponent(ShortInformation, {
      remove: { imports: [ Tag, Rating, BadgeList, TranslatePipe ] },
      add: { imports: [ StubTag, StubRating, StubBadgeList, MockTranslatePipe ] }
    })
    .createComponent(ShortInformation);

    fixture = TestBed.createComponent(ShortInformation);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the ShortInformation component', fakeAsync(() => {
    fixture.componentRef.setInput('heroType', 'movie');
    fixture.componentRef.setInput('heroTitle', 'Mock Movie Title');
    fixture.componentRef.setInput('movie', mockMovie);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const tagElement = fixture.nativeElement.querySelector('tag') as HTMLElement;
    const headerElement = fixture.nativeElement.querySelector('h2') as HTMLHeadingElement;
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLElement;
    const badgeElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const anchorElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const ratingElements = fixture.nativeElement.querySelectorAll('rating') as NodeListOf<HTMLElement>;
    expect(component.movie()).toBe(mockMovie);
    expect(tagElement).toBeInTheDocument();
    expect(headerElement.textContent).toBe(mockMovie.title);
    expect(paragraphElement.textContent).toBe(mockMovie.overview);
    expect(badgeElement).toBeInTheDocument();
    expect(anchorElement).toHaveAttribute('href', `/movie/${mockMovie.id}-${component.getSlugify()}`);
    expect(ratingElements.length).toBe(3);
  }))
})
