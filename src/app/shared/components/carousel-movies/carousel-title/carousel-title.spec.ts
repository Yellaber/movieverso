import { screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselTitle } from './carousel-title';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { mockRoutes, MockTranslatePipe, MockTranslateService } from '@app/shared/mocks';

describe('CarouselTitle.', () => {
  let fixture: ComponentFixture<CarouselTitle>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarouselTitle ],
      providers: [
        provideRouter([ mockRoutes[0] ]),
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(CarouselTitle, {
      remove: { imports: [ TranslatePipe ] },
      add: { imports: [ MockTranslatePipe ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselTitle);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the title correctly.', () => {
    fixture.componentRef.setInput('carouselTitle', 'Title');
    fixture.detectChanges();
    const heading = screen.getByRole('heading', { name: 'Title' });
    expect(heading).toBeInTheDocument();
  });

  it('Should render the title and route correctly.', () => {
    fixture.componentRef.setInput('carouselTitle', 'Title');
    fixture.componentRef.setInput('route', 'test');
    fixture.detectChanges();
    const heading = screen.getByRole('heading', { name: 'Title' });
    expect(heading).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'carouselLink' });
    expect(link).toBeInTheDocument();
  });

  it('Should render the title, but not the route if it is empty.', () => {
    fixture.componentRef.setInput('carouselTitle', 'Title');
    fixture.componentRef.setInput('route', '');
    fixture.detectChanges();
    const heading = screen.getByRole('heading', { name: 'Title' });
    expect(heading).toBeInTheDocument();
    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
  });

  it('Should not render the title if it is empty.', () => {
    fixture.componentRef.setInput('carouselTitle', '');
    fixture.detectChanges();
    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
  });

  it('Should not render the title and route if they are empty.', () => {
    fixture.componentRef.setInput('carouselTitle', '');
    fixture.componentRef.setInput('route', '');
    fixture.detectChanges();
    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
  });
});
