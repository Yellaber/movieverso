import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentCategory } from './content-category';
import { TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '@mocks';

describe('ContentCategory', () => {
  let component: ContentCategory;
  let fixture: ComponentFixture<ContentCategory>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ContentCategory ],
      providers: [{ provide: TranslateService, useClass: MockTranslateService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentCategory);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'TEST_TITLE_KEY');
    fixture.componentRef.setInput('paragraph', 'TEST_PARAGRAPH_KEY');
    fixture.detectChanges();
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the translated title and paragraph', () => {
    const headerElement = fixture.nativeElement.querySelector('h3') as HTMLElement;
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLElement;
    expect(headerElement).toBeTruthy();
    expect(paragraphElement).toBeTruthy();
    expect(headerElement.textContent?.trim()).toBe('translated:TEST_TITLE_KEY');
    expect(paragraphElement.textContent?.trim()).toBe('translated:TEST_PARAGRAPH_KEY');
  })
})
