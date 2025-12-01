import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Navigation } from './navigation';
import { MockRoutesService, mockRoutes, MockTranslateService } from '@mocks';
import { RoutesService } from '@services';

describe('Navigation.', () => {
  const setup = async(inputs: { menuItems: string[] }) => {
    return await render(Navigation, {
      imports: [ Navigation ],
      providers: [
        provideRouter(mockRoutes),
        { provide: RoutesService, useClass: MockRoutesService },
        { provide: TranslateService, useClass: MockTranslateService }
      ],
      inputs
    });
  };

  it('Should render all routes correctly.', async() => {
    const { fixture } = await setup({ menuItems: [ 'upcoming', 'now-playing', 'popular', 'top-rated' ] });
    const routesCategories = fixture.componentInstance.routesCategories();
    expect(routesCategories.length).toBe(4);
    expect(screen.getAllByRole('link').length).toBe(4);
  })

  it('Should render 3 routes correctly.', async() => {
    const { fixture } = await setup({ menuItems: [ 'upcoming', 'now-playing', 'popular' ] });
    const routesCategories = fixture.componentInstance.routesCategories();
    expect(routesCategories.length).toBe(3);
    expect(screen.getAllByRole('link').length).toBe(3);
  })

  it('Should render valid routes but not invalid route.', async() => {
    const { fixture } = await setup({ menuItems: [ 'upcoming', 'now-playing', 'invalid-route-1', 'invalid-route-2' ] });
    const routesCategories = fixture.componentInstance.routesCategories();
    expect(routesCategories.length).toBe(2);
    expect(screen.getAllByRole('link').length).toBe(2);
  })

  it('Should not render routes if menuItems contains invalid routes.', async() => {
    const { fixture } = await setup({ menuItems: [ 'invalid-route-1', 'invalid-route-2' ] });
    const routesCategories = fixture.componentInstance.routesCategories();
    expect(routesCategories.length).toBe(0);
  })

  it('Should not render routes if menuItems is empty.', async() => {
    const { fixture } = await setup({ menuItems: [] });
    const routesCategories = fixture.componentInstance.routesCategories();
    expect(routesCategories.length).toBe(0);
  })
})
