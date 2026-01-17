import { BackdropImage } from './backdrop-image';
import { render } from '@testing-library/angular';

const inputs = {
  title: 'Backdrop title',
  backdropImagePath: '/images/no-backdrop.jpg',
  backdropImageSrcset: '300w, 780w, 1280w'
}

describe('BackdropImage', () => {
  it('Should render the backdrop image when all inputs are provided correctly', async() => {
    const srcSetAttribute = '/images/no-backdrop.jpg 300w, /images/no-backdrop.jpg 780w, /images/no-backdrop.jpg 1280w';
    const { fixture, container } = await render(BackdropImage, { inputs });
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement).toHaveAttribute('src', fixture.componentInstance.backdropImagePath());
    expect(imgElement).toHaveAttribute('srcset', srcSetAttribute);
    expect(imgElement).toHaveAttribute('alt', fixture.componentInstance.title());
  })

  it('Should not render the backdrop image when title input is empty', async() => {
    const { container } = await render(BackdropImage, {
      inputs: { ...inputs, title: '' }
    });
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeFalsy();
  })

  it('Should not render the backdrop image when backdropImagePath input is empty', async() => {
    const { container } = await render(BackdropImage, {
      inputs: { ...inputs, backdropImagePath: '' },
    });
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeFalsy();
  })

  it('Should not render the backdrop image when backdropImageSrcset input is empty', async() => {
    const { container } = await render(BackdropImage, {
      inputs: { ...inputs, backdropImageSrcset: '' }
    });
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeFalsy();
  })
})
