import { ComponentFixture, TestBed } from '@angular/core/testing';
import NowPlaying from './now-playing';
import { Category } from '@components/category/category';
import { StubCategory } from '@mocks';

describe('NowPlaying', () => {
  let fixture: ComponentFixture<NowPlaying>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NowPlaying ]
    })
    .overrideComponent(NowPlaying, {
      remove: { imports: [ Category ] },
      add: { imports: [ StubCategory ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowPlaying);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the now-playing category', () => {
    fixture.detectChanges();
    const categoryElement = fixture.nativeElement.querySelector('category') as HTMLElement;
    expect(categoryElement).toBeTruthy();
    expect(categoryElement).toHaveAttribute('name', 'now-playing');
  })
})
