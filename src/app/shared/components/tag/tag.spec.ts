import { Tag } from './tag';
import { faFire, faStar, faCalendarCheck, faArrowTrendUp, faFilm } from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '@testing-library/angular';

describe('Tag.', () => {
  it('Should display the correct icon and text for type "now-playing."', async() => {
    const { fixture } = await render(Tag, {
      inputs: {
        text: 'En cartelera',
        type: 'now-playing'
      }
    });
    expect(screen.getByText('En cartelera')).toBeInTheDocument();
    expect(fixture.componentInstance.getIcon()?.faIcon).toBe(faFilm);
  })

  it('Should display the correct icon and text for type "top-rated".', async() => {
    const { fixture } = await render(Tag, {
      inputs: {
        text: 'Mejor valoradas',
        type: 'top-rated'
      }
    });
    expect(screen.getByText('Mejor valoradas')).toBeInTheDocument();
    expect(fixture.componentInstance.getIcon()?.faIcon).toBe(faStar);
  })

  it('Should display the correct icon and text for type "trending".', async() => {
    const { fixture } = await render(Tag, {
      inputs: {
        text: 'En tendencia',
        type: 'trending'
      }
    });
    expect(screen.getByText('En tendencia')).toBeInTheDocument();
    expect(fixture.componentInstance.getIcon()?.faIcon).toBe(faArrowTrendUp);
  })

  it('Should display the correct icon and text for type "popular".', async() => {
    const { fixture } = await render(Tag, {
      inputs: {
        text: 'Más populares',
        type: 'popular'
      }
    });
    expect(screen.getByText('Más populares')).toBeInTheDocument();
    expect(fixture.componentInstance.getIcon()?.faIcon).toBe(faFire);
  })

  it('Should display the correct icon and text for type "calendar".', async() => {
    const { fixture } = await render(Tag, {
      inputs: {
        text: '2025-08-01',
        type: 'calendar'
      }
    });
    expect(screen.getByText('2025-08-01')).toBeInTheDocument();
    expect(fixture.componentInstance.getIcon()?.faIcon).toBe(faCalendarCheck);
  })

  it('Should not render when type input is not provided.', async() => {
    const { container } = await render(Tag, {
      inputs: {
        text: 'En cartelera',
      }
    });
    expect(container.querySelector('div')).toBeNull();
  })

  it('Should not render when type input is invalid.', async() => {
    const { container } = await render(Tag, {
      inputs: {
        text: 'Tipo inválido',
        type: 'invalid-type'
      }
    });
    expect(container.querySelector('div')).toBeNull();
  })
})
