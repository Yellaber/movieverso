import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('Rating component', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RatingComponent ]
    }).compileComponents;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
  });

  it('Should create component.', () => {
    expect(component).toBeTruthy();
  });

  it('getRating return a Rating object.', () => {
    fixture.componentRef.setInput('type', 'popularity');
    const rating = component.getRating();
    expect(rating).toBeTruthy();
  });

  it('getRating return an undefined value.', () => {
    fixture.componentRef.setInput('type', 'rated');
    const rating = component.getRating();
    expect(rating).toBeUndefined();
  });
});
