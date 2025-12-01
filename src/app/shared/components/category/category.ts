import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { ContentCategory } from './content-category/content-category';
import { Categories } from '../categories/categories';
import { LoadCategory } from '../load-category/load-category';
import { SeoFriendlyService } from '@services';
import { CategoryUtils } from '@utils';
import { CategoryTranslations } from '@interfaces';

type item = 'upcoming' | 'now-playing' | 'popular' | 'top-rated' | 'trending';
const menuItems: item[] = [ 'upcoming', 'now-playing', 'popular', 'top-rated', 'trending' ];

@Component({
  selector: 'category',
  imports: [ ContentCategory, Categories, LoadCategory ],
  template: `
    <content-category [title]="categoryTranslations().title" [paragraph]="categoryTranslations().paragraph"/>
    <categories [menuItems]="menuItems()"/>
    <load-category [endPoint]="categoryTranslations().endPoint"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Category implements AfterViewInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  private contentCategory = viewChild(ContentCategory);
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
  }
}
