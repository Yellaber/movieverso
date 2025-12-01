import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoutesService } from '@services';

@Component({
  selector: 'navigation',
  imports: [ RouterLink ],
  template: `
    <ul class="flex flex-wrap">
      @for(route of routesCategories(); track $index) {
        <li class="pr-5">
          <a [routerLink]="route.path" class="text-xs lg:text-sm text-yellow-600 font-bold">
            {{ route.title }}
          </a>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navigation implements OnInit {
  private routesService = inject(RoutesService);
  private translateService = inject(TranslateService);
  menuItems = input.required<string[]>();
  routesCategories = signal<Route[]>([]);

  ngOnInit() {
    this.getRoutesCategories();
  };

  private getRoutesCategories() {
    const routes = this.routesService.getRoutes();
    this.menuItems().forEach(path => {
      if(routes.find(route => route.path === path)) {
        this.saveTranslationRouteCategory(path);
      }
    });
  };

  private saveTranslationRouteCategory(path: string) {
    this.translateService.get(`routes.${this.transformPath(path)}`).subscribe((category: string) =>
      this.routesCategories.update(routes => [ ...routes, { title: category, path: `/${path}` } ]));
  };

  private transformPath(path: string): string {
    if(path.includes('-')) {
      const words = path.split('-');
      words.forEach((word, index) => {
        if(index > 0) {
          words[index] = `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
        }
      });
      return words.toString().replaceAll(',', '');
    }
    return path;
  };
}
