import { computed, Injectable, signal } from '@angular/core';
import { Route } from '@angular/router';
import { routes } from '@app/app.routes';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private routes = signal<Route[]>([]);
  getRoutes = computed(() => this.routes());

  constructor() {
    this.setRoutes(routes);
  };

  setRoutes(routes: Route[]) {
    this.routes.set(routes);
  };
};
