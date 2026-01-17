import { ComponentFixture, TestBed } from '@angular/core/testing';
import TopRated from './top-rated';
import { Category } from '@components/category/category';
import { StubCategory } from '@mocks';

describe('TopRated', () => {
  let fixture: ComponentFixture<TopRated>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TopRated ]
    })
    .overrideComponent(TopRated, {
      remove: { imports: [ Category ] },
      add: { imports: [ StubCategory ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRated);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the top-rated category', () => {
    fixture.detectChanges();
    const categoryElement = fixture.nativeElement.querySelector('category') as HTMLElement;
    expect(categoryElement).toBeTruthy();
    expect(categoryElement).toHaveAttribute('name', 'top-rated');
  })
})
