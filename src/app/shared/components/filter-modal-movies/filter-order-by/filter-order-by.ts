import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { QueryParamsService } from '@services';
import { OptionDropdown, TypeSort } from '@interfaces';

const OPTIONS_BY_SORT: OptionDropdown[] = [
  { label: 'filter.sortBy.mostPopular', value: 'popularity.desc' },
  { label: 'filter.sortBy.leastPopular', value: 'popularity.asc' },
  { label: 'filter.sortBy.bestRated', value: 'vote_average.desc' },
  { label: 'filter.sortBy.worstRated', value: 'vote_average.asc' },
  { label: 'filter.sortBy.mostVoted', value: 'vote_count.desc' },
  { label: 'filter.sortBy.leastVoted', value: 'vote_count.asc' },
  { label: 'filter.sortBy.newest', value: 'primary_release_date.desc' },
  { label: 'filter.sortBy.oldest', value: 'primary_release_date.asc' },
  { label: 'filter.sortBy.titleAsc', value: 'title.asc' },
  { label: 'filter.sortBy.titleDesc', value: 'title.desc' }
];

@Component({
  selector: 'filter-order',
  imports: [ TranslatePipe ],
  template: `
    <span class="text-sm font-bold">{{ 'filter.sortBy.label' | translate }}</span>
    <div class="flex flex-wrap gap-3">
      @for(option of options(); track option.value) {
        <button
        class="rounded-full text-xs lg:text-sm hover:font-bold cursor-pointer duration-300 transition-all px-3 py-2" [class]="isSelected(option)? 'bg-yellow-600 font-bold': 'bg-stone-400 text-stone-700'"
        (click)="onSelect(option)">
          {{ option.label }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3'}
})
export class FilterOrderBy implements OnInit {
  private translateService = inject(TranslateService);
  private queryParamsService = inject(QueryParamsService);
  private queryParams = this.queryParamsService.getQueryParams;
  options = signal<OptionDropdown[]>([]);
  selectedOption = signal<TypeSort | undefined>(undefined);

  ngOnInit() {
    this.initializeOptions();
  };

  private initializeOptions() {
    OPTIONS_BY_SORT.forEach(option => this.loadTranslations(option.label, option.value));
    const sortBy = this.queryParams().sortBy;
    this.selectedOption.set(sortBy);
  };

  private loadTranslations(key: string, value: TypeSort) {
    this.translateService.get(key).subscribe((label: string) =>
      this.options.update(options => [ ...options, { label, value } ])
    );
  };

  onSelect(option: OptionDropdown) {
    this.selectedOption.set(option.value);
  };

  isSelected(option: OptionDropdown): boolean {
    return this.selectedOption() === option.value;
  };

  reset() {
    if(this.options().length > 0) {
      this.selectedOption.set(this.options()[0].value);
    }
  };
}
