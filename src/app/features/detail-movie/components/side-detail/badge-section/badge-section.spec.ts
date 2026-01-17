import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeSection } from './badge-section';
import { BadgeList } from '@components/badge-list/badge-list';
import { mockKeywords, mockProductionCompanies, mockSpokenLanguages, StubBadgeList } from '@mocks';

describe('BadgeSection', () => {
  let component: BadgeSection;
  let fixture: ComponentFixture<BadgeSection>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BadgeSection ]
    })
    .overrideComponent(BadgeSection, {
      remove: { imports: [ BadgeList ] },
      add: { imports: [ StubBadgeList ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeSection);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component when titleSection input contain a string value and badges input is a Keyword array', () => {
    fixture.componentRef.setInput('titleSection', 'Title Section');
    fixture.componentRef.setInput('badges', mockKeywords);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(component.badges().length).toBe(mockKeywords.length);
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.textContent).toBe('Title Section');
    expect(badgeListElement).toBeInTheDocument();
    expect(hrElement).toBeInTheDocument();
  })

  it('Should render the component when titleSection input contain a string value and badges input is a SpokenLanguage array', () => {
    fixture.componentRef.setInput('titleSection', 'Title Section');
    fixture.componentRef.setInput('badges', mockSpokenLanguages);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(component.badges().length).toBe(mockSpokenLanguages.length);
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.textContent).toBe('Title Section');
    expect(badgeListElement).toBeInTheDocument();
    expect(hrElement).toBeInTheDocument();
  })

  it('Should render the component when titleSection input contain a string value and badges input is a ProductionCompany array', () => {
    fixture.componentRef.setInput('titleSection', 'Title Section');
    fixture.componentRef.setInput('badges', mockProductionCompanies);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(component.badges().length).toBe(mockProductionCompanies.length);
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.textContent).toBe('Title Section');
    expect(badgeListElement).toBeInTheDocument();
    expect(hrElement).toBeInTheDocument();
  })

  it('Should not render the component when titleSection input contain a string value and baddges input is an empty array', () => {
    fixture.componentRef.setInput('titleSection', 'Title Section');
    fixture.componentRef.setInput('badges', []);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(component.badges().length).toBe(0);
    expect(spanElement).not.toBeInTheDocument();
    expect(badgeListElement).not.toBeInTheDocument();
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when titleSection input is an empty string and badges input is an empty array', () => {
    fixture.componentRef.setInput('titleSection', '');
    fixture.componentRef.setInput('badges', []);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(component.badges().length).toBe(0);
    expect(spanElement).not.toBeInTheDocument();
    expect(badgeListElement).not.toBeInTheDocument();
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when titleSection input is undefined and badges input is a Keyword array', () => {
    fixture.componentRef.setInput('titleSection', undefined);
    fixture.componentRef.setInput('badges', mockKeywords);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(component.badges().length).toBeGreaterThan(0);
    expect(spanElement).not.toBeInTheDocument();
    expect(badgeListElement).not.toBeInTheDocument();
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when titleSection input is undefined and badges input is a SpokenLanguage array', () => {
    fixture.componentRef.setInput('titleSection', undefined);
    fixture.componentRef.setInput('badges', mockSpokenLanguages);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(component.badges().length).toBeGreaterThan(0);
    expect(spanElement).not.toBeInTheDocument();
    expect(badgeListElement).not.toBeInTheDocument();
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when titleSection input is undefined and badges input is a ProductionCompany array', () => {
    fixture.componentRef.setInput('titleSection', undefined);
    fixture.componentRef.setInput('badges', mockProductionCompanies);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(component.badges().length).toBeGreaterThan(0);
    expect(spanElement).not.toBeInTheDocument();
    expect(badgeListElement).not.toBeInTheDocument();
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when titleSection input containt a string value and badges input is undefined', () => {
    fixture.componentRef.setInput('titleSection', 'Title Section');
    fixture.componentRef.setInput('badges', undefined);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(spanElement).not.toBeInTheDocument();
    expect(badgeListElement).not.toBeInTheDocument();
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when titleSection and badges inputs are undefined', () => {
    fixture.componentRef.setInput('titleSection', undefined);
    fixture.componentRef.setInput('badges', undefined);
    fixture.detectChanges();
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    const badgeListElement = fixture.nativeElement.querySelector('badge-list') as HTMLElement;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLElement;
    expect(spanElement).not.toBeInTheDocument();
    expect(badgeListElement).not.toBeInTheDocument();
    expect(hrElement).not.toBeInTheDocument();
  })
})
