import { CardDetail } from './card-detail';
import { render } from '@testing-library/angular';

const inputs = {
  title: 'Poster title',
  posterImagePath: '/images/no-poster.jpg',
  posterImageSrcset: '92w, 154w, 185w, 342w, 500w, 780w'
}

describe('CardDetail', () => {
  it('Should render the card when all inputs are provided correctly', async() => {
    const srcSetAttribute = '/images/no-poster.jpg 92w, /images/no-poster.jpg 154w, /images/no-poster.jpg 185w, /images/no-poster.jpg 342w, /images/no-poster.jpg 500w, /images/no-poster.jpg 780w';
    const { fixture, container } = await render(CardDetail, { inputs });
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', fixture.componentInstance.posterImagePath());
    expect(imgElement).toHaveAttribute('srcset', srcSetAttribute);
    expect(imgElement).toHaveAttribute('alt', fixture.componentInstance.title());
    expect(container.querySelector('div')).toBeInTheDocument();
  })

  it('Should not render the card when title input is empty', async() => {
    const { container } = await render(CardDetail, {
      inputs: { ...inputs, title: '' }
    });
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('div')).not.toBeInTheDocument();
  })

  it('Should not render the card when posterImagePath input is empty', async() => {
    const { container } = await render(CardDetail, {
      inputs: { ...inputs, posterImagePath: '' }
    });
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('div')).not.toBeInTheDocument();
  })

  it('Should not render the card when posterImageSrcset input is empty', async() => {
    const { container } = await render(CardDetail, {
      inputs: { ...inputs, posterImageSrcset: '' }
    });
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('div')).not.toBeInTheDocument();
  })
})
