import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoriesComponent } from '@shared/components/categories/categories.component';
import { LoadCategoryComponent } from '@shared/components/load-category/load-category.component';
import { SeoFriendlyService } from '@app/core/services';
import { EndPointValid } from '@shared/interfaces';

const menuItems = [ 'now-playing', 'popular', 'top-rated', 'trending' ];

@Component({
  selector: 'upcoming',
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
export default class UpcomingComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  private translateService = inject(TranslateService);
  titlePage = signal<string>('');
  textPage = signal<string>('');
  menuItems = signal<string[]>([]);
  endPointValid = signal<EndPointValid>(EndPointValid.upcoming);

  ngOnInit() {
    this.menuItems.set(menuItems);
    this.loadTranslations();
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.textPage());
  };

  private loadTranslations() {
    this.translateService.get('routes.upcoming')
      .subscribe((title: string) => this.titlePage.set(title));
    this.translateService.get('upcoming.paragraph')
      .subscribe((paragraph: string) => this.textPage.set(paragraph));
  };
}
