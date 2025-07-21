import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesComponent } from '@shared/components/categories/categories.component';
import { LoadCategoryComponent } from '@shared/components/load-category/load-category.component';
import { SeoFriendlyService } from '@app/core/services/seo-friendly.service';
import { EndPointValid } from '@shared/interfaces';

const menuItems = ['upcoming', 'now-playing', 'popular', 'top-rated'];

@Component({
  selector: 'trending',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  titlePage = signal<string>('');
  textPage = signal<string>('');
  menuItems = signal<string[]>([]);
  endPointValid = signal<EndPointValid>(EndPointValid.trending);

  ngOnInit() {
    this.menuItems.set(menuItems);
    this.titlePage.set('En tendencia');
    this.textPage.set('Lo que está en boca de todos (hoy): Películas que explotaron en búsquedas, likes y visualizaciones. Si pestañeas, te lo pierdes.');
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.textPage());
  };
}
