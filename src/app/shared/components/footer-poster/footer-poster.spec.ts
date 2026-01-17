import { FooterPoster } from './footer-poster';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rating } from '../rating/rating';
import { mockMovies, StubRating } from '@mocks';

describe('FooterPoster', () => {
  let component: FooterPoster;
  let fixture: ComponentFixture<FooterPoster>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FooterPoster ]
    })
    .overrideComponent(FooterPoster, {
      remove: { imports: [ Rating ] },
      add: { imports: [ StubRating ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPoster);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', mockMovies[0]);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should display the component correctly', () => {
    const ratingElements = fixture.nativeElement.querySelectorAll('rating') as NodeListOf<HTMLElement>;
    expect(ratingElements.length).toBe(2);
    expect(ratingElements[0].getAttribute('type')).toBe('popularity');
    expect(ratingElements[1].getAttribute('type')).toBe('vote_average');
  })
})
