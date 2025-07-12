import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { RoutesService } from '@services/';

@Component({
  selector: 'navigation',
  imports: [RouterLink],
  template: `
    <ul class="flex flex-wrap">
      @for(route of mainRoutes(); track $index) {
        <li class="pr-5">
          <a [routerLink]="getAbsouteRoute(route.path!)" class="text-xs lg:text-sm text-yellow-600 font-bold">
            {{ route.title }}
          </a>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  private routesService = inject(RoutesService);
  menuItems = input.required<string[]>();
  menubarRoutes = signal<Route[]>([]);
  mainRoutes = computed(() =>
    this.menubarRoutes().filter(route => this.menuItems()?.includes(route.path!))
  );

  ngOnInit() {
    this.menubarRoutes.set(this.routesService.getRoutes());
  };

  getAbsouteRoute(route: string) {
    return `/${route}`;
  };
}
