import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('Rating Component:', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RatingComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
  });

  it('Should create component.', () => {
    expect(component).toBeTruthy();
  });

  it('getRating return an undefined value.', () => {
    fixture.componentRef.setInput('type', '');
    expect(component.getRating()).toBeUndefined();
  });

  it('getRating return a Rating object about popularity.', () => {
    fixture.componentRef.setInput('type', 'popularity');
    expect(component.getRating()).toBeTruthy();
  });

  it('getRating return a Rating object about vote.', () => {
    fixture.componentRef.setInput('type', 'vote');
    expect(component.getRating()).toBeTruthy();
  });
});
