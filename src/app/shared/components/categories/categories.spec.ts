import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Categories } from './categories';
import { MockTranslatePipe, MockTranslateService, StubNavigation } from '@mocks';
import { Navigation } from './navigation/navigation';

describe('Categories.', () => {
  let fixture: ComponentFixture<Categories>;
  let component: Categories;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Categories ],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(Categories, {
      remove: { imports: [ TranslatePipe, Navigation ] },
      add: { imports: [ MockTranslatePipe, StubNavigation ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categories);
    component = fixture.componentInstance;
  })

  it('Should render the categories correctly.', () => {
    fixture.componentRef.setInput('menuItems', [ 'category-1', 'category-2', 'category-3' ]);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span');
    const navigationElement = fixture.nativeElement.querySelector('navigation');
    expect(component.menuItems().length).toBe(3);
    expect(spanElement).toBeTruthy();
    expect(navigationElement).toBeTruthy();
  })

  it('Should render the categories if menuItems is empty.', () => {
    fixture.componentRef.setInput('menuItems', []);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span');
    const navigationElement = fixture.nativeElement.querySelector('navigation');
    expect(component.menuItems().length).toBe(0);
    expect(spanElement).toBeTruthy();
    expect(navigationElement).toBeTruthy();
  })
})
