import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tag } from '@components/tag/tag';
import { BadgeList } from '@components/badge-list/badge-list';
import { Rating } from '@components/rating/rating';
import { ShortDetail } from './short-detail';
import { mockDetailMovie, StubBadgeList, StubRating, StubTag } from '@mocks';

describe('ShortDetail', () => {
  let component: ShortDetail;
  let fixture: ComponentFixture<ShortDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ShortDetail ]
    })
    .overrideComponent(ShortDetail, {
      remove: { imports: [ Tag, BadgeList, Rating ] },
      add: { imports: [ StubTag, StubBadgeList, StubRating] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortDetail);
    component = fixture.componentInstance;
  })

  it('Should render the ShortDetail component', () => {
    fixture.componentRef.setInput('movieDetail', mockDetailMovie);
    fixture.detectChanges();
    const tagElement = fixture.nativeElement.querySelector('tag') as HTMLElement;
    const headerElement = fixture.nativeElement.querySelector('h2') as HTMLHeadingElement;
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLParagraphElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const ratingElements = fixture.nativeElement.querySelectorAll('rating') as NodeListOf<HTMLElement>;
    expect(component.movieDetail().release_date).toBe(mockDetailMovie.release_date);
    expect(tagElement).toBeInTheDocument();
    expect(component.movieDetail().title).toBe(mockDetailMovie.title);
    expect(headerElement).toBeInTheDocument();
    expect(component.movieDetail().tagline).toBe(mockDetailMovie.tagline);
    expect(spanElement).toBeInTheDocument();
    expect(component.movieDetail().overview).toBe(mockDetailMovie.overview);
    expect(paragraphElement).toBeInTheDocument();
    expect(component.movieDetail().genres).toBe(mockDetailMovie.genres);
    expect(badgeListElement).toBeInTheDocument();
    expect(component.movieDetail().popularity).toBe(mockDetailMovie.popularity);
    expect(component.movieDetail().vote_average).toBe(mockDetailMovie.vote_average);
    expect(component.movieDetail().vote_count).toBe(mockDetailMovie.vote_count);
    expect(ratingElements.length).toBe(3);
  })
})
