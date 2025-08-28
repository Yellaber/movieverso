import { Component } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'stub-component',
  template: `<li>Stub Component</li>`
})
export class StubComponentTesting {};

export const mockRoutes: Route[] = [
  { path: 'upcoming', component: StubComponentTesting }, { path: 'now-playing', component: StubComponentTesting },
  { path: 'popular', component: StubComponentTesting }, { path: 'top-rated', component: StubComponentTesting }
];

export const mockUpdateRoutes: Route[] = [{ path: 'contact', title: 'Contact' }];

export class MockRoutesService {
  getRoutes = jest.fn().mockReturnValue(mockRoutes);
  setRoutes = jest.fn();
};
