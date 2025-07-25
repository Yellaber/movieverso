import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { OptionDropdown, TypeSort } from '@shared/interfaces';

const optionsOrderBy: OptionDropdown[] = [
  {label: 'Más populares', value: 'popularity.desc'},
  {label: 'Menos populares', value: 'popularity.asc'},
  {label: 'Mejor valoradas', value: 'vote_average.desc'},
  {label: 'Peor valoradas', value: 'vote_average.asc'},
  {label: 'Más votadas', value: 'vote_count.desc'},
  {label: 'Menos votadas', value: 'vote_count.asc'},
  {label: 'Estrenos más recientes', value: 'primary_release_date.desc'},
  {label: 'Estrenos más antiguos', value: 'primary_release_date.asc'},
  {label: 'Título (A-Z)', value: 'title.asc'},
  {label: 'Título (Z-A)', value: 'title.desc'}
];

@Component({
  selector: 'filter-order',
  imports: [],
  template: `
    <span class="text-sm font-bold">Ordenar resultados por:</span>
    <div class="flex flex-wrap gap-3">
      @for(option of options(); track $index) {
        <button class="rounded-full text-xs lg:text-sm hover:font-bold cursor-pointer duration-300 transition-all px-3 py-2"
        [class.bg-yellow-600]="isSelected(option)"
        [class.font-bold]="isSelected(option)"
        [class.bg-stone-400]="!isSelected(option)"
        [class.text-stone-700]="!isSelected(option)"
        (click)="onSelect(option)">{{option.label}}</button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3'}
})
export class FilterOrderByComponent implements OnInit {
  options = signal<OptionDropdown[]>([]);
  selectedOption = signal<TypeSort | undefined>(undefined);

  ngOnInit() {
    this.options.set(optionsOrderBy);
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
}
