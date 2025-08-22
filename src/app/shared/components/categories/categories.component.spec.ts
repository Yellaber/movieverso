import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CategoriesComponent } from './categories.component';
import { MockTranslatePipe, MockTranslateService, StubNavigationComponent } from '@app/testing';
import { NavigationComponent } from './navigation/navigation.component';

describe('CategoriesComponent.', () => {
  let fixture: ComponentFixture<CategoriesComponent>;
  let component: CategoriesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CategoriesComponent ],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(CategoriesComponent, {
      remove: { imports: [ TranslatePipe, NavigationComponent ] },
      add: { imports: [ MockTranslatePipe, StubNavigationComponent ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
  });

  it('Should render the categories correctly.', () => {
    fixture.componentRef.setInput('menuItems', [ 'category-1', 'category-2', 'category-3' ]);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span');
    const navigationElement = fixture.nativeElement.querySelector('navigation');
    expect(component.menuItems().length).toBe(3);
    expect(spanElement).toBeTruthy();
    expect(navigationElement).toBeTruthy();
  });

  it('Should render the categories if menuItems is empty.', () => {
    fixture.componentRef.setInput('menuItems', []);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span');
    const navigationElement = fixture.nativeElement.querySelector('navigation');
    expect(component.menuItems().length).toBe(0);
    expect(spanElement).toBeTruthy();
    expect(navigationElement).toBeTruthy();
  });
});
