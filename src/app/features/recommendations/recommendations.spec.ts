import { ComponentFixture, TestBed } from '@angular/core/testing';
import Recommendations from './recommendations';
import { RelatedMovie } from '@components/related-movie/related-movie';
import { StubRelatedMovie } from '@mocks';

describe('Recommendations', () => {
  let fixture: ComponentFixture<Recommendations>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Recommendations ]
    })
    .overrideComponent(Recommendations, {
      remove: { imports: [ RelatedMovie ] },
      add: { imports: [ StubRelatedMovie ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recommendations);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the recommendations category', () => {
    fixture.detectChanges();
    const relatedMovieElement = fixture.nativeElement.querySelector('related-movie') as HTMLElement;
    expect(relatedMovieElement).toBeTruthy();
    expect(relatedMovieElement).toHaveAttribute('type', 'recommendations');
  })
})
