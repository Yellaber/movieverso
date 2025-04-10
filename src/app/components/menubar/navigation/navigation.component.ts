import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../../app.routes';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'navigation-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    TitleCasePipe
  ],
  template: `
    <ul [ngClass]="layoutClass()">
      @for (route of routes; track $index) {
        <li>
          <a [routerLink]="[route.path]" routerLinkActive="yellow-color" class="text-xs lg:text-sm transition-colors duration-300">{{ route.path | titlecase }}</a>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  layoutClass = input.required<string>();
  routes: Route[] = [];

  constructor() {
    this.routes = routes.filter(route =>
      route.path === 'nuevo' || route.path === 'popular' || route.path === 'listado'
    );
  };
}
