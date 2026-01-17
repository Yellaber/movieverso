import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { SideDetail } from './side-detail';
import { DetailService } from '@services';
import { ProductionCountries } from './production-countries/production-countries';
import { BadgeSection } from './badge-section/badge-section';
import { InfoItem } from './info-item/info-item';
import { mockDetailMovie, MockDetailService, MockTranslatePipe, StubBadgeSection, StubInfoItem, StubProductionCountries } from '@mocks';

describe('SideDetail', () => {
  let component: SideDetail;
  let fixture: ComponentFixture<SideDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SideDetail ],
      providers: [{ provide: DetailService, useClass: MockDetailService }]
    })
    .overrideComponent(SideDetail, {
      remove: { imports: [ ProductionCountries, BadgeSection, InfoItem, TranslatePipe ] },
      add: { imports: [ StubProductionCountries, StubBadgeSection, StubInfoItem, MockTranslatePipe ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideDetail);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component when movieDetail is provided', fakeAsync(() => {
    fixture.componentRef.setInput('movieDetail', mockDetailMovie);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const productionCountriesElement = fixture.nativeElement.querySelector('production-countries') as HTMLElement;
    const badgeSectionElements = fixture.nativeElement.querySelectorAll('badge-section') as NodeListOf<HTMLElement>;
    const infoItemElement = fixture.nativeElement.querySelector('info-item') as HTMLElement;
    expect(component.movieKeywords.hasValue()).toBe(true);
    expect(productionCountriesElement).toBeInTheDocument();
    expect(badgeSectionElements.length).toBe(3);
    expect(infoItemElement).toBeInTheDocument();
  }))

  it('Should render the component when movieDetail is undefined', fakeAsync(() => {
    fixture.componentRef.setInput('movieDetail', undefined);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const productionCountriesElement = fixture.nativeElement.querySelector('production-countries') as HTMLElement;
    const badgeSectionElements = fixture.nativeElement.querySelectorAll('badge-section') as NodeListOf<HTMLElement>;
    const infoItemElement = fixture.nativeElement.querySelector('info-item') as HTMLElement;
    expect(component.movieKeywords.hasValue()).toBe(false);
    expect(productionCountriesElement).not.toBeInTheDocument();
    expect(badgeSectionElements.length).toBe(0);
    expect(infoItemElement).not.toBeInTheDocument();
  }))
})
