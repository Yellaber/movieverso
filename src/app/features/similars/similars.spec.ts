import { ComponentFixture, TestBed } from '@angular/core/testing';
import Similars from './similars';
import { RelatedMovie } from '@components/related-movie/related-movie';
import { StubRelatedMovie } from '@mocks';

describe('Similars', () => {
  let fixture: ComponentFixture<Similars>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Similars ]
    })
    .overrideComponent(Similars, {
      remove: { imports: [ RelatedMovie ] },
      add: { imports: [ StubRelatedMovie ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Similars);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the similars category', () => {
    fixture.detectChanges();
    const relatedMovieElement = fixture.nativeElement.querySelector('related-movie') as HTMLElement;
    expect(relatedMovieElement).toBeTruthy();
    expect(relatedMovieElement).toHaveAttribute('type', 'similar');
  })
})
