import { render, screen } from '@testing-library/angular';
import { CarouselTitle } from './carousel-title';

describe('CarouselTitle.', () => {
  it('Should render the component when the carouselTitle input is provided', async() => {
    await render(CarouselTitle, {
      inputs: {
        carouselTitle: 'Title'
      }
    });
    const headingElement = screen.getByRole('heading', { name: 'Title' });
    expect(headingElement).toBeInTheDocument();
  })

  it('Should not render the component when the carouselTitle input is an empty string', async() => {
    await render(CarouselTitle, {
      inputs: {
        carouselTitle: ''
      }
    });
    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
  })

  it('Should not render the component when the carouselTitle input is undefined', async() => {
    await render(CarouselTitle, {
      inputs: {
        carouselTitle: undefined
      }
    });
    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
  })
})
