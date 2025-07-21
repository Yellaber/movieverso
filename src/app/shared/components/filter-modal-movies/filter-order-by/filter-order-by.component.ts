import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, signal, viewChildren } from '@angular/core';
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
        <button #buttonRef class="rounded-full text-xs lg:text-sm bg-stone-400 text-stone-700 hover:font-bold cursor-pointer duration-300 transition-all px-3 py-2"
        (click)="onSelect(option)">{{option.label}}</button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3'}
})
export class FilterOrderByComponent implements OnInit, AfterViewInit {
  options = signal<OptionDropdown[]>([]);
  selectedOption = signal<TypeSort | undefined>(undefined);
  private buttonRef = viewChildren<ElementRef<HTMLButtonElement>>('buttonRef');

  ngOnInit() {
    this.options.set(optionsOrderBy);
  };

  ngAfterViewInit() {
    this.reset();
  };

  onSelect(option: OptionDropdown) {
    this.buttonRef().map(button => {
      const textButton = button.nativeElement.innerText;
      if(textButton === option.label) {
        button.nativeElement.classList.replace('bg-stone-400', 'bg-yellow-600');
        button.nativeElement.classList.replace('text-stone-700', 'font-bold');
        this.selectedOption.set(option.value);
        return button;
      }
      button.nativeElement.classList.replace('bg-yellow-600', 'bg-stone-400');
      button.nativeElement.classList.replace('font-bold', 'text-stone-700');
      return button;
    });
  };

  reset() {
    const firstOption = this.options()[0];
    if(!this.buttonRef().find(button => {
      const textButton = button.nativeElement.innerText;
      return textButton === firstOption.label && button.nativeElement.classList.contains('bg-yellow-600')
    })) {
      this.onSelect(firstOption);
    }
  };
}
