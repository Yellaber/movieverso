import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagComponent } from './tag.component';

describe('Tag component', () => {
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

  it('Should create.', () => {
    expect(component).toBeTruthy();
  });

  it('getIcon return an Icon object.', () => {
    fixture.componentRef.setInput('type', 'popularity');
    const icon = component.getIcon();
    expect(icon).toBeTruthy();
  });

  it('getIcon return an undefined value.', () => {
    fixture.componentRef.setInput('type', 'top_rated');
    const icon = component.getIcon();
    expect(icon).toBeUndefined();
  });
});
