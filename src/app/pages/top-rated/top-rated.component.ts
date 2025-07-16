import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesComponent } from '@shared/categories/categories.component';
import { LoadCategoryComponent } from '@shared/load-category/load-category.component';
import { SeoFriendlyService } from '@services/seo-friendly.service';
import { EndPointValid } from '@interfaces/';

const menuItems = ['upcoming', 'now-playing', 'popular', 'trending'];

@Component({
  selector: 'top-rated',
  imports: [
    CategoriesComponent,
    LoadCategoryComponent
  ],
  template: `
    <div class="flex flex-col gap-5 mt-10 lg:mt-15">
      <h3 class="text-sm lg:text-xl font-bold rounded-full text-yellow-600 gap-2">
        {{ titlePage() }}
      </h3>
      <p class="text-xs lg:text-sm text-stone-300 leading-relaxed">
        {{ textPage() }}
      </p>
    </div>
    <categories [menuItems]="menuItems()"/>
    <load-category [endPoint]="endPointValid()"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TopRatedComponent implements OnInit {
  titlePage = signal<string>('');
  textPage = signal<string>('');
  menuItems = signal<string[]>([]);
  endPointValid = signal<EndPointValid>(EndPointValid.topRated);
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.menuItems.set(menuItems);
    this.titlePage.set('Mejor valoradas');
    this.textPage.set('Alta puntuación, alto impacto: Si buscas calidad garantizada, este es tu universo seguro. Películas que se ganaron un 10… o casi.');
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.textPage());
  }
}
