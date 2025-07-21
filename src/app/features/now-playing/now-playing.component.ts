import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesComponent } from '@shared/components/categories/categories.component';
import { LoadCategoryComponent } from '@shared/components/load-category/load-category.component';
import { SeoFriendlyService } from '@app/core/services';
import { EndPointValid } from '@shared/interfaces';

const menuItems = ['upcoming', 'popular', 'top-rated', 'trending'];

@Component({
  selector: 'now-playing',
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
export default class NowPlayingComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  titlePage = signal<string>('');
  textPage = signal<string>('');
  menuItems = signal<string[]>([]);
  endPointValid = signal<EndPointValid>(EndPointValid.nowPlaying);

  ngOnInit() {
    this.menuItems.set(menuItems);
    this.titlePage.set('En cartelera');
    this.textPage.set('Cine en tiempo real: ¿Quieres saber qué está moviendo las taquillas ahora mismo? Esta lista te pone al día con lo que puedes ver hoy mismo en pantalla grande.');
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.textPage());
  };
}
