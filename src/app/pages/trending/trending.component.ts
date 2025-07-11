import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesComponent } from '@shared/categories/categories.component';
import { LoadMoviesFilteredComponent } from '@shared/load-movies-filtered/load-movies-filtered.component';
import { SeoFriendlyService } from '@services/seo-friendly.service';
import { EndPointValid } from '@interfaces/';

const menuItems = ['upcoming', 'now-playing', 'popular', 'top-rated'];

@Component({
  selector: 'trending',
  imports: [
    CategoriesComponent,
    LoadMoviesFilteredComponent
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingComponent implements OnInit {
  titlePage = signal<string>('');
  textPage = signal<string>('');
  menuItems = signal<string[]>([]);
  endPointValid = signal<EndPointValid>(EndPointValid.trending);
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.menuItems.set(menuItems);
    this.titlePage.set('En tendencia');
    this.textPage.set('Lo que está en boca de todos (hoy): Películas que explotaron en búsquedas, likes y visualizaciones. Si pestañeas, te lo pierdes.');
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.textPage());
  };
}
