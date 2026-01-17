import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, OnInit, signal } from '@angular/core';
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
    <content-category [(title)]="titlePage" [(paragraph)]="paragraphPage"/>
    <categories [menuItems]="menuItems()"/>
    <load-category [endPoint]="endPoint()"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Category implements OnInit, AfterViewInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  name = input.required<item>();
  categoryTranslations = signal<CategoryTranslations | undefined>(undefined);
  titlePage = linkedSignal<string>(() => this.categoryTranslations()?.title?? '');
  paragraphPage = linkedSignal<string>(() => this.categoryTranslations()?.paragraph?? '');
  endPoint = computed<string>(() => this.categoryTranslations()?.endPoint?? '');
  menuItems = computed<item[]>(() => menuItems.filter(item => item !== this.name()));

  ngOnInit() {
    this.categoryTranslations.set(CategoryUtils.getCategoryTranslations(this.name()));
  }

  ngAfterViewInit() {
    this.seoFriendlyService.setMetaTags(this.titlePage(), this.paragraphPage());
  }
}
