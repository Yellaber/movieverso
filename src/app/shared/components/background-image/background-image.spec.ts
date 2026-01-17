import { BackgroundImage } from './background-image';
import { render } from '@testing-library/angular';

const inputs = {
  title: 'Backdrop title',
  backdropImagePath: '/images/no-backdrop.jpg',
  backdropImageSrcset: '300w, 780w, 1280w'
}

describe('BackgroundImage', () => {
  it('Should render the background image when all inputs are provided correctly', async() => {
    const srcSetAttribute = '/images/no-backdrop.jpg 300w, /images/no-backdrop.jpg 780w, /images/no-backdrop.jpg 1280w';
    const { fixture, container } = await render(BackgroundImage, { inputs });
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', fixture.componentInstance.backdropImagePath());
    expect(imgElement).toHaveAttribute('srcset', srcSetAttribute);
    expect(imgElement).toHaveAttribute('alt', fixture.componentInstance.title());
    expect(container.querySelector('div')).toBeInTheDocument();
  })

  it('Should not render the background image when title input is empty', async() => {
    const { container } = await render(BackgroundImage, {
      inputs: { ...inputs, title: '' }
    });
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('div')).not.toBeInTheDocument();
  })

  it('Should not render the background image when backdropImagePath input is empty', async() => {
    const { container } = await render(BackgroundImage, {
      inputs: { ...inputs, backdropImagePath: '' }
    });
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('div')).not.toBeInTheDocument();
  })

  it('Should not render the background image when backdropImageSrcset input is empty', async() => {
    const { container } = await render(BackgroundImage, {
      inputs: { ...inputs, backdropImageSrcset: '' }
    });
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('div')).not.toBeInTheDocument();
  })
})
