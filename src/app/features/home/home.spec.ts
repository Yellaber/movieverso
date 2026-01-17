import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import Home from './home';
import { SectionMovie } from './components/section-movie/section-movie';
import { SeoFriendlyService } from '@services';
import { MockSeoFriendlyService, MockTranslatePipe, MockTranslateService, StubSectionMovie } from '@mocks';
import { after } from 'node:test';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Home ],
      providers: [
        { provide: SeoFriendlyService, useClass: MockSeoFriendlyService },
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(Home, {
      remove: { imports: [ SectionMovie, TranslatePipe ] },
      add: { imports: [ StubSectionMovie, MockTranslatePipe ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  after(() => {
    jest.clearAllMocks();
  })

  it('Should render the Home component', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    const totalSections = component.sections().length;
    const sectionMovieElements = fixture.nativeElement.querySelectorAll('section-movie') as NodeListOf<HTMLElement>;
    const titleElement = fixture.nativeElement.querySelector('h2') as HTMLElement;
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLElement;
    expect(totalSections).toBeGreaterThan(0);
    expect(sectionMovieElements.length).toBe(totalSections);
    expect(titleElement.textContent).toBe('home.title');
    expect(paragraphElement.textContent.trim()).toBe('home.paragraph');
  }))
})
