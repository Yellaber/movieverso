import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagComponent } from './tag.component';

describe('Tag Component:', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TagComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
  });

  it('Should create component.', () => {
    expect(component).toBeTruthy();
  });

  it('getIcon return an undefined value.', () => {
    fixture.componentRef.setInput('type', '');
    expect(component.getIcon()).toBeUndefined();
  });

  it('getIcon return an Icon object about now playing.', () => {
    fixture.componentRef.setInput('type', 'now_playing');
    expect(component.getIcon()).toBeTruthy();
  });

  it('getIcon return an Icon object about popularity.', () => {
    fixture.componentRef.setInput('type', 'popularity');
    expect(component.getIcon()).toBeTruthy();
  });

  it('getIcon return an Icon object about rated.', () => {
    fixture.componentRef.setInput('type', 'rated');
    expect(component.getIcon()).toBeTruthy();
  });

  it('getIcon return an Icon object about calendar.', () => {
    fixture.componentRef.setInput('type', 'calendar');
    expect(component.getIcon()).toBeTruthy();
  });

  it('getIcon return an Icon object about trending.', () => {
    fixture.componentRef.setInput('type', 'trending');
    expect(component.getIcon()).toBeTruthy();
  });
});
