import { ComponentFixture, TestBed } from '@angular/core/testing';
import Trending from './trending';
import { Category } from '@components/category/category';
import { StubCategory } from '@mocks';

describe('Trending', () => {
  let fixture: ComponentFixture<Trending>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Trending ]
    })
    .overrideComponent(Trending, {
      remove: { imports: [ Category ] },
      add: { imports: [ StubCategory ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trending);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the trending category', () => {
    fixture.detectChanges();
    const categoryElement = fixture.nativeElement.querySelector('category') as HTMLElement;
    expect(categoryElement).toBeTruthy();
    expect(categoryElement).toHaveAttribute('name', 'trending');
  })
})
