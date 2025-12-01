import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { CarouselControl } from './carousel-control';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselMoviesService } from '@services';
import { Direction } from '@interfaces';

const directions: Direction[] = [
  { label: 'previous', faIcon: faAngleLeft, class: 'left-0 bg-gradient-to-r' },
  { label: 'next', faIcon: faAngleRight, class: 'right-0 bg-gradient-to-l' }
];

describe('CarouselControl.', () => {
  const user = userEvent.setup();
  const setup = async(inputs: { direction: 'previous' | 'next', bgButton: string }) => {
    return await render(CarouselControl,
      { providers: [ CarouselMoviesService ], inputs }
    );
  };

  it('Should render if direction input is "previous".', async() => {
    const { fixture, container } = await setup({ direction: 'previous', bgButton: 'from-stone-800' });
    expect(fixture.componentInstance.getDirection()).toEqual(directions[0]);
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('fa-icon')).toBeInTheDocument();
  });

  it('Should render if direction input is "next".', async() => {
    const { fixture, container } = await setup({ direction: 'next', bgButton: 'from-stone-800' });
    expect(fixture.componentInstance.getDirection()).toEqual(directions[1]);
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('fa-icon')).toBeInTheDocument();
  });

  it('Should not render if direction is not "previous" or "next".', async() => {
    const { fixture, container } = await setup({ direction: 'test' as any, bgButton: 'from-stone-800' });
    expect(fixture.componentInstance.getDirection()).toBeUndefined();
    expect(container.querySelector('button')).not.toBeInTheDocument();
  });

  describe('onClick().', () => {
    it('Should execute previous method of CarouselMoviesService if direction is "previous".', async() => {
      const { fixture } = await setup({ direction: 'previous', bgButton: 'from-stone-800' });
      jest.spyOn(fixture.componentInstance['carouselMoviesService'], 'previous');
      const button = screen.getByRole('button');
      await user.click(button);
      expect(fixture.componentInstance['carouselMoviesService'].previous).toHaveBeenCalled();
    });

    it('Should execute next method of CarouselMoviesService if direction is "next".', async() => {
      const { fixture } = await setup({ direction: 'next', bgButton: 'from-stone-800' });
      jest.spyOn(fixture.componentInstance['carouselMoviesService'], 'next');
      const button = screen.getByRole('button');
      await user.click(button);
      expect(fixture.componentInstance['carouselMoviesService'].next).toHaveBeenCalled();
    });
  });
});
