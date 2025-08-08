import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TagComponent } from './tag.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar, faCalendarCheck, faArrowTrendUp, faFilm } from '@fortawesome/free-solid-svg-icons';

describe('TagComponent.', () => {
  let fixture: ComponentFixture<TagComponent>;
  let tagComponent: TagComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ TagComponent, FontAwesomeModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    tagComponent = fixture.componentInstance;
  });

  it('Should create the Tag component.', () => {
    expect(tagComponent).toBeTruthy();
  });

  it('getIcon() should return the correct icon for a valid type "now-playing".', fakeAsync(() => {
    fixture.componentRef.setInput('text', 'En cartelera');
    fixture.componentRef.setInput('type', 'now-playing');
    fixture.detectChanges();
    tick();
    expect(tagComponent.getIcon()?.faIcon).toBe(faFilm);
  }));

  it('getIcon() should return the correct icon for a valid type "top-rated".', fakeAsync(() => {
    fixture.componentRef.setInput('text', 'Mejor valoradas');
    fixture.componentRef.setInput('type', 'top-rated');
    fixture.detectChanges();
    tick();
    expect(tagComponent.getIcon()?.faIcon).toBe(faStar);
  }));

  it('getIcon() should return the correct icon for a valid type "trending".', fakeAsync(() => {
    fixture.componentRef.setInput('text', 'En tendencia');
    fixture.componentRef.setInput('type', 'trending');
    fixture.detectChanges();
    tick();
    expect(tagComponent.getIcon()?.faIcon).toBe(faArrowTrendUp);
  }));

  it('getIcon() should return the correct icon for a valid type "popular".', fakeAsync(() => {
    fixture.componentRef.setInput('text', 'Más populares');
    fixture.componentRef.setInput('type', 'popular');
    fixture.detectChanges();
    tick();
    expect(tagComponent.getIcon()?.faIcon).toBe(faFire);
  }));

  it('getIcon() should return the correct icon for a valid type "calendar".', fakeAsync(() => {
    fixture.componentRef.setInput('text', 'Próximamente');
    fixture.componentRef.setInput('type', 'calendar');
    fixture.detectChanges();
    tick();
    expect(tagComponent.getIcon()?.faIcon).toBe(faCalendarCheck);
  }));

  it('getIcon() should be undefined when type input is not provided.', fakeAsync(() => {
    fixture.componentRef.setInput('text', 'En cartelera');
    fixture.detectChanges();
    tick();
    expect(tagComponent.getIcon()).toBeUndefined();
  }));

  it('getIcon() should be undefined when type input is invalid.', fakeAsync(() => {
    fixture.componentRef.setInput('text', 'Tipo inválido');
    fixture.componentRef.setInput('type', 'invalid-type');
    fixture.detectChanges();
    tick();
    expect(tagComponent.getIcon()).toBeUndefined();
  }));
});
