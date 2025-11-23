import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { SeoFriendlyService } from '@app/core/services';
import { ContentCategoryComponent } from './content-category/content-category.component';
import { CategoriesComponent } from '../categories/categories.component';
import { LoadCategoryComponent } from '../load-category/load-category.component';
import { CategoryUtils } from './utils/category-utils';
import { CategoryTranslations } from '@shared/interfaces';

type item = 'upcoming' | 'now-playing' | 'popular' | 'top-rated' | 'trending';
const menuItems: item[] = [ 'upcoming', 'now-playing', 'popular', 'top-rated', 'trending' ];

@Component({
  selector: 'category',
  imports: [
    ContentCategoryComponent,
    CategoriesComponent,
    LoadCategoryComponent
  ],
  template: `
    <content-category [title]="categoryTranslations().title" [paragraph]="categoryTranslations().paragraph"/>
    <categories [menuItems]="menuItems()"/>
    <load-category [endPoint]="categoryTranslations().endPoint"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements AfterViewInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  private contentCategory = viewChild(ContentCategoryComponent);
  name = input.required<item>();
  titlePage = computed<string>(() => {
    const contentCategory = this.contentCategory();
    return contentCategory?.titlePage()?? '';
  });
  textPage = computed<string>(() => {
    const contentCategory = this.contentCategory();
    return contentCategory?.textPage()?? '';
  });
  menuItems = computed<item[]>(() => menuItems.filter(item => item !== this.name()));
  categoryTranslations = computed<CategoryTranslations>(() => CategoryUtils.getCategoryTranslations(this.name()));

  ngAfterViewInit() {
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.textPage());
  };
};
