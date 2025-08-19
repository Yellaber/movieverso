import { screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarruselTitleComponent } from './carrusel-title.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslatePipe, MockTranslateService } from '@app/testing/mock-translate';
import { mockRoute } from '@app/testing/mock-route';

describe('CarruselTitleComponent.', () => {
  let fixture: ComponentFixture<CarruselTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarruselTitleComponent ],
      providers: [
        provideRouter([ mockRoute ]),
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(CarruselTitleComponent, {
      remove: { imports: [ TranslatePipe ] },
      add: { imports: [ MockTranslatePipe ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselTitleComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the title correctly.', () => {
    fixture.componentRef.setInput('carruselTitle', 'Title');
    fixture.detectChanges();
    const heading = screen.getByRole('heading', { name: 'Title' });
    expect(heading).toBeInTheDocument();
  });

  it('Should render the title and route correctly.', () => {
    fixture.componentRef.setInput('carruselTitle', 'Title');
    fixture.componentRef.setInput('route', 'test');
    fixture.detectChanges();
    const heading = screen.getByRole('heading', { name: 'Title' });
    expect(heading).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'carouselLink' });
    expect(link).toBeInTheDocument();
  });

  it('Should render the title, but not the route if it is empty.', () => {
    fixture.componentRef.setInput('carruselTitle', 'Title');
    fixture.componentRef.setInput('route', '');
    fixture.detectChanges();
    const heading = screen.getByRole('heading', { name: 'Title' });
    expect(heading).toBeInTheDocument();
    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
  });

  it('Should not render the title if it is empty.', () => {
    fixture.componentRef.setInput('carruselTitle', '');
    fixture.detectChanges();
    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
  });

  it('Should not render the title and route if they are empty.', () => {
    fixture.componentRef.setInput('carruselTitle', '');
    fixture.componentRef.setInput('route', '');
    fixture.detectChanges();
    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
  });
});
