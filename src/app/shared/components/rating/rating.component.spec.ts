import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { RatingComponent } from "./rating.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faFire, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

describe('RatingComponent.', () => {
  let fixture: ComponentFixture<RatingComponent>;
  let ratingComponent: RatingComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ RatingComponent, FontAwesomeModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    ratingComponent = fixture.componentInstance;
  });

  it('Should create the Rating component.', () => {
    expect(ratingComponent).toBeTruthy();
  });

  it('Should display the correct icon and format for type "popularity".', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'popularity');
    fixture.componentRef.setInput('value', 50);
    fixture.detectChanges();
    tick();
    const smallElement = fixture.nativeElement.querySelector('small');
    expect(ratingComponent.getIcon()?.faIcon).toBe(faFire);
    expect(smallElement.textContent).toContain('50');
  }));

  it('Should display the correct icon and format for type "vote_average".', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'vote_average');
    fixture.componentRef.setInput('value', 4.6);
    fixture.detectChanges();
    tick();
    const smallElement = fixture.nativeElement.querySelector('small');
    expect(ratingComponent.getIcon()?.faIcon).toBe(faStar);
    expect(smallElement.textContent).toContain('4.6/10');
  }));

  it('Should display the correct icon and format for type "vote_count".', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'vote_count');
    fixture.componentRef.setInput('value', 681);
    fixture.detectChanges();
    tick();
    const smallElement = fixture.nativeElement.querySelector('small');
    expect(ratingComponent.getIcon()?.faIcon).toBe(faThumbsUp);
    expect(smallElement.textContent).toContain('681');
  }));

  it('Should not render if the type is invalid.', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'invalid-type');
    fixture.componentRef.setInput('value', 10);
    fixture.detectChanges();
    tick();
    expect(ratingComponent.getIcon()).toBeUndefined();
    const anchorElement = fixture.nativeElement.querySelector('a');
    expect(anchorElement).toBeNull();
  }));

  it('Should not render if the value is negative.', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'popularity');
    fixture.componentRef.setInput('value', -10);
    fixture.detectChanges();
    tick();
    const anchorElement = fixture.nativeElement.querySelector('a');
    expect(anchorElement).toBeNull();
  }));
});
