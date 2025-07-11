import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesComponent } from '@shared/categories/categories.component';
import { LoadMoviesFilteredComponent } from '@shared/load-movies-filtered/load-movies-filtered.component';
import { SeoFriendlyService } from '@services/';
import { EndPointValid } from '@interfaces/';

const menuItems = ['now-playing', 'popular', 'top-rated', 'trending'];

@Component({
  selector: 'upcoming',
  imports: [
    CategoriesComponent,
    LoadMoviesFilteredComponent,
  ],
  template: `
    <div class="flex flex-col gap-5 pt-12 lg:pt-15">
      <h3 class="text-sm lg:text-xl font-bold rounded-full text-yellow-600 gap-2">
        {{ titlePage() }}
      </h3>
      <p class="text-xs lg:text-sm text-stone-300 leading-relaxed">
        {{ textPage() }}
      </p>
    </div>
    <categories [menuItems]="menuItems()"/>
    <load-movies-filtered [endPoint]="endPointValid()"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UpcomingComponent implements OnInit {
  titlePage = signal<string>('');
  textPage = signal<string>('');
  menuItems = signal<string[]>([]);
  endPointValid = signal<EndPointValid>(EndPointValid.upcoming);
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.menuItems.set(menuItems);
    this.titlePage.set('Próximos estrenos');
    this.textPage.set('¿Te gusta adelantarte a la función? Aquí encontrarás los próximos estrenos antes de que lleguen a la gran pantalla. ¡No dejes que nadie te spoilee lo que está por venir!');
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.textPage());
  };
}
