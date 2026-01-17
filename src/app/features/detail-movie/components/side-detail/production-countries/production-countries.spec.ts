import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionCountries } from './production-countries';
import { mockProductionCountries, MockTranslatePipe } from '@mocks';

describe('ProductionCountries', () => {
  let component: ProductionCountries;
  let fixture: ComponentFixture<ProductionCountries>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ProductionCountries ]
    })
    .overrideComponent(ProductionCountries, {
      remove: { imports: [TranslatePipe] },
      add: { imports: [ MockTranslatePipe ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionCountries);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component when productionCountries input is an array of ProductionCountry objects and getFlagCountry is an array of FlagCountry objects', () => {
    fixture.componentRef.setInput('productionCountries', mockProductionCountries);
    fixture.detectChanges();
    const flagCountries = component.getFlagCountries();
    const spanElements = fixture.nativeElement.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
    const imgElements = fixture.nativeElement.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLHRElement;
    expect(flagCountries.length).toBeGreaterThan(0);
    expect(spanElements.length).toBe(flagCountries.length + 1);
    expect(imgElements.length).toBe(flagCountries.length);
    expect(hrElement).toBeInTheDocument();
  })

  it('Should not render the component when productionCountries input and getFlagCountry are empty arrays', () => {
    fixture.componentRef.setInput('productionCountries', []);
    fixture.detectChanges();
    const flagCountries = component.getFlagCountries();
    const spanElements = fixture.nativeElement.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
    const imgElements = fixture.nativeElement.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLHRElement;
    expect(flagCountries.length).toBe(0);
    expect(spanElements.length).toBe(0);
    expect(imgElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when productionCountries input is undefined and getFlagCountry is an empty array', () => {
    fixture.componentRef.setInput('productionCountries', undefined);
    fixture.detectChanges();
    const flagCountries = component.getFlagCountries();
    const spanElements = fixture.nativeElement.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
    const imgElements = fixture.nativeElement.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    const hrElement = fixture.nativeElement.querySelector('hr') as HTMLHRElement;
    expect(flagCountries.length).toBe(0);
    expect(spanElements.length).toBe(0);
    expect(imgElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })
})
