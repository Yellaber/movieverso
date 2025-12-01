import { Rating } from './rating';
import { faFire, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '@testing-library/angular';

describe('Rating.', () => {
  it('Should display the correct icon and format for type "popularity".', async() => {
    const { fixture } = await render(Rating, {
      inputs: {
        type: 'popularity',
        value: 50
      }
    });
    const ratingComponent = fixture.componentInstance;
    expect(ratingComponent.getIcon()?.faIcon).toBe(faFire);
    expect(screen.getByText('50.0')).toBeInTheDocument();
  });

  it('Should display the correct icon and format for type "vote_average".', async() => {
    const { fixture } = await render(Rating, {
      inputs: {
        type: 'vote_average',
        value: 4.6
      }
    });
    const ratingComponent = fixture.componentInstance;
    expect(ratingComponent.getIcon()?.faIcon).toBe(faStar);
    expect(screen.getByText('4.6/10')).toBeInTheDocument();
  });

  it('Should display the correct icon and format for type "vote_count".', async() => {
    const { fixture } = await render(Rating, {
      inputs: {
        type: 'vote_count',
        value: 681
      }
    });
    const ratingComponent = fixture.componentInstance;
    expect(ratingComponent.getIcon()?.faIcon).toBe(faThumbsUp);
    expect(screen.getByText('681')).toBeInTheDocument();
  });

  it('should not render if the value is negative', async() => {
    const { container } = await render(Rating, {
      inputs: {
        type: 'popularity',
        value: -10
      }
    });
    expect(container.querySelector('a')).toBeNull();
  });
});
