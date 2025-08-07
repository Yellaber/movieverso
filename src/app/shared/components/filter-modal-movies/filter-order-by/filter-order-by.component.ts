import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { OptionDropdown, TypeSort } from '@shared/interfaces';

@Component({
  selector: 'filter-order',
  imports: [ TranslatePipe ],
  template: `
    <span class="text-sm font-bold">{{ 'filter.sortBy.label' | translate }}</span>
    <div class="flex flex-wrap gap-3">
      @for(option of options(); track $index) {
        <button class="rounded-full text-xs lg:text-sm hover:font-bold cursor-pointer duration-300 transition-all px-3 py-2" [class.bg-yellow-600]="isSelected(option)" [class.font-bold]="isSelected(option)"
        [class.bg-stone-400]="!isSelected(option)" [class.text-stone-700]="!isSelected(option)"
        (click)="onSelect(option)">
          {{option.label}}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3'}
})
export class FilterOrderByComponent implements OnInit {
  private translateService = inject(TranslateService);
  options = signal<OptionDropdown[]>([]);
  selectedOption = signal<TypeSort | undefined>(undefined);

  ngOnInit() {
    this.initializeOptions();
    this.reset();
  };

  onSelect(option: OptionDropdown) {
    this.selectedOption.set(option.value);
  };

  isSelected(option: OptionDropdown): boolean {
    return this.selectedOption() === option.value;
  };

  reset() {
    this.selectedOption.set(this.options()[0].value);
  };

  private initializeOptions() {
    this.loadTranslations('filter.sortBy.mostPopular', 'popularity.desc');
    this.loadTranslations('filter.sortBy.leastPopular', 'popularity.asc');
    this.loadTranslations('filter.sortBy.bestRated', 'vote_average.desc');
    this.loadTranslations('filter.sortBy.worstRated', 'vote_average.asc');
    this.loadTranslations('filter.sortBy.mostVoted', 'vote_count.desc');
    this.loadTranslations('filter.sortBy.leastVoted', 'vote_count.asc');
    this.loadTranslations('filter.sortBy.newest', 'primary_release_date.desc');
    this.loadTranslations('filter.sortBy.oldest', 'primary_release_date.asc');
    this.loadTranslations('filter.sortBy.titleAsc', 'title.asc');
    this.loadTranslations('filter.sortBy.titleDesc', 'title.desc');
  };

  private loadTranslations(key: string, value: TypeSort) {
    this.translateService.get(key).subscribe((label: string) =>
      this.options.update(options => [ ...options, { label, value } ])
    );
  };
}
