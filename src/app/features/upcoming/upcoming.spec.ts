import { ComponentFixture, TestBed } from '@angular/core/testing';
import Upcoming from './upcoming';
import { Category } from '@components/category/category';
import { StubCategory } from '@mocks';

describe('Upcoming', () => {
  let fixture: ComponentFixture<Upcoming>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Upcoming ]
    })
    .overrideComponent(Upcoming, {
      remove: { imports: [ Category ] },
      add: { imports: [ StubCategory ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Upcoming);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the upcoming category', () => {
    fixture.detectChanges();
    const categoryElement = fixture.nativeElement.querySelector('category') as HTMLElement;
    expect(categoryElement).toBeTruthy();
    expect(categoryElement).toHaveAttribute('name', 'upcoming');
  })
})
