import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { CarruselButtonComponent } from './carrusel-button.component';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '@shared/interfaces';

const directions: Direction[] = [
  { label: 'previous', faIcon: faAngleLeft, class: 'left-0 bg-gradient-to-r' },
  { label: 'next', faIcon: faAngleRight, class: 'right-0 bg-gradient-to-l' }
];

describe('CarruselButtonComponent.', () => {
  const user = userEvent.setup();
  const emitDirection = jest.fn();

  it('Should render if direction input is "previous" and emit "previous" when clicking the button.', async() => {
    const { fixture, container } = await render(CarruselButtonComponent,
      {
        inputs: { direction: 'previous', bgButton: 'from-stone-800' },
        on: { emitDirection }
      }
    );
    expect(fixture.componentInstance.getDirection()).toEqual(directions[0]);
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('fa-icon')).toBeInTheDocument();
    const button = screen.getByRole('button');
    await user.click(button);
    expect(emitDirection).toHaveBeenCalledWith(directions[0].label);
  });

  it('Should render if direction input is "next" and emit "next" when clicking the button.', async() => {
    const { fixture, container } = await render(CarruselButtonComponent,
      {
        inputs: { direction: 'next', bgButton: 'from-stone-800' },
        on: { emitDirection }
      }
    );
    expect(fixture.componentInstance.getDirection()).toEqual(directions[1]);
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('fa-icon')).toBeInTheDocument();
    const button = screen.getByRole('button');
    await user.click(button);
    expect(emitDirection).toHaveBeenCalledWith(directions[1].label);
  });
});
