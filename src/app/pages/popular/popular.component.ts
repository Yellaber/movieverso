import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesComponent } from '@shared/categories/categories.component';
import { LoadCategoryComponent } from '@shared/load-category/load-category.component';
import { SeoFriendlyService } from '@services/';
import { EndPointValid } from '@interfaces/';

const menuItems = ['upcoming', 'now-playing', 'top-rated', 'trending'];

@Component({
  selector: 'popular',
  imports: [
    CategoriesComponent,
    LoadCategoryComponent,
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
export default class PopularComponent implements OnInit {
  titlePage = signal<string>('');
  textPage = signal<string>('');
  menuItems = signal<string[]>([]);
  endPointValid = signal<EndPointValid>(EndPointValid.popular);
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit(): void {
    this.menuItems.set(menuItems);
    this.titlePage.set('Populares');
    this.textPage.set('Las favoritas del momento: Estas películas están rompiendo el internet… y la taquilla. ¿Ya viste por qué todos hablan de ellas?');
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.textPage());
  };
}
