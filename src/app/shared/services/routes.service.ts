import { computed, Injectable, signal } from '@angular/core';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private routes = signal<Route[]>([]);
  getRoutes = computed(() => this.routes());

  setRoutes(routes: Route[]) {
    this.routes.set(routes);
  };
};
