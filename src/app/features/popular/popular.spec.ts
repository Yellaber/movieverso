import { ComponentFixture, TestBed } from '@angular/core/testing';
import Popular from './popular';
import { Category } from '@components/category/category';
import { StubCategory } from '@mocks';

describe('Popular', () => {
  let fixture: ComponentFixture<Popular>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Popular ]
    })
    .overrideComponent(Popular, {
      remove: { imports: [ Category ] },
      add: { imports: [ StubCategory ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Popular);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the popular category', () => {
    fixture.detectChanges();
    const categoryElement = fixture.nativeElement.querySelector('category') as HTMLElement;
    expect(categoryElement).toBeTruthy();
    expect(categoryElement).toHaveAttribute('name', 'popular');
  })
})
