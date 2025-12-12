import { screen } from '@testing-library/angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselTitle } from './carousel-title';

describe('CarouselTitle.', () => {
  let fixture: ComponentFixture<CarouselTitle>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarouselTitle ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselTitle);
  })

  it('Should render the title correctly.', () => {
    fixture.componentRef.setInput('carouselTitle', 'Title');
    fixture.detectChanges();
    const heading = screen.getByRole('heading', { name: 'Title' });
    expect(heading).toBeInTheDocument();
  })

  it('Should not render the title if it is empty.', () => {
    fixture.componentRef.setInput('carouselTitle', '');
    fixture.detectChanges();
    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
  })
})
