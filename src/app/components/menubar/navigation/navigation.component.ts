import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../../app.routes';
import { NgClass, TitleCasePipe } from '@angular/common';

const menuItems = [ 'proximamente', 'estrenos', 'populares', 'valoradas', 'tendencia', 'listado' ];

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
      @for(route of routes; track $index) {
        <li>
          <a [routerLink]="[route.path]" routerLinkActive="text-yellow-500" class="text-xs lg:text-sm text-stone-300 hover:text-yellow-500 transition-colors duration-300">{{ route.path | titlecase }}</a>
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
    this.routes = routes.filter(route => menuItems.includes(route.path!));
  };
}
