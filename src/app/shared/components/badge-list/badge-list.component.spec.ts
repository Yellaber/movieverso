import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeListComponent } from './bandge-list.component';
import { Genre, Keyword, SpokenLanguage } from '@shared/interfaces';

const genres: Genre[] = [
  { id: 1, name: 'Genre 1' }, { id: 2, name: 'Genre 2' }
];

const keywords: Keyword[] = [
  { id: 1, name: 'Keyword 1' }, { id: 2, name: 'Keyword 2' }
];

const spokenLanguages: SpokenLanguage[] = [
  { english_name: 'English', iso_639_1: 'en', name: 'English' },
  { english_name: 'Spanish', iso_639_1: 'es', name: 'Spanish' }
];

describe('BadgeListComponent.', () => {
  let fixture: ComponentFixture<BadgeListComponent>;
  let badgeListComponent: BadgeListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BadgeListComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeListComponent);
    badgeListComponent = fixture.componentInstance;
  });

  it('Should create the component.', () => {
    expect(badgeListComponent).toBeTruthy();
  });

  it('Should display a list of genres correctly.', () => {
    fixture.componentRef.setInput('badgeList', genres);
    fixture.detectChanges();
    const smallElements: HTMLElement[] = fixture.nativeElement.querySelectorAll('small');
    expect(smallElements.length).toBe(genres.length);
    expect(smallElements[0].textContent).toBe(genres[0].name);
    expect(smallElements[1].textContent).toBe(genres[1].name);
  });

  it('Should display a list of keywords correctly.', () => {
    fixture.componentRef.setInput('badgeList', keywords);
    fixture.detectChanges();
    const smallElements: HTMLElement[] = fixture.nativeElement.querySelectorAll('small');
    expect(smallElements.length).toBe(keywords.length);
    expect(smallElements[0].textContent).toBe(keywords[0].name);
    expect(smallElements[1].textContent).toBe(keywords[1].name);
  });

  it('Should display a list of spoken languages correctly.', () => {
    fixture.componentRef.setInput('badgeList', spokenLanguages);
    fixture.detectChanges();
    const smallElements: HTMLElement[] = fixture.nativeElement.querySelectorAll('small');
    expect(smallElements.length).toBe(spokenLanguages.length);
    expect(smallElements[0].textContent).toBe(spokenLanguages[0].name);
    expect(smallElements[1].textContent).toBe(spokenLanguages[1].name);
  });
});
