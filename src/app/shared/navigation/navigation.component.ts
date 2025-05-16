import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../app.routes';

@Component({
  selector: 'navigation',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    FontAwesomeModule
  ],
  template: `
    <ul [ngClass]="layoutClass()">
      @for(route of routes; track $index) {
        <li>
          <a [routerLink]="[route.path]" routerLinkActive="text-yellow-500" class="text-xs lg:text-sm text-stone-300 hover:text-yellow-500 transition-colors duration-300">{{ route.title }}</a>
        </li>
      }
      <button class="text-xs lg:text-sm font-medium h-full text-yellow-600 bg-stone-800 rounded-full focus:outline-none hover:cursor-pointer ml-10 py-2 px-3">
        <fa-icon class="w-3 md:w-4 lg:w-5" [icon]="faMagnifyingGlass"></fa-icon>
      </button>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  menuItems = input.required<string[]>();
  layoutClass = input.required<string>();
  routes: Route[] = [];

  ngOnInit() {
    this.routes = routes.filter(route => this.menuItems()?.includes(route.path!));
  }
}
