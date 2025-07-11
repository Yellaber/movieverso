import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
import { RatingComponent } from '@shared/rating/rating.component';

@Component({
  selector: 'filter-vote-average',
  imports: [RatingComponent],
  template: `
    <div class="flex justify-between items-center gap-4">
      <h3 class="text-sm font-bold">Calificación mínima:</h3>
      <div class="rounded-md bg-stone-700 px-3 py-1">
        <rating type="vote_average" [value]="rangeValue()"/>
      </div>
    </div>
    <input (input)="onChangeValue($event)" type="range" min="0" max="10" step="0" [value]="rangeValue()" class="w-full h-2 bg-stone-400 rounded-md appearance-none cursor-pointer accent-yellow-600">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class FilterVoteAverageComponent implements OnInit {
  rangeValue = signal<number>(0);
  voteAverageSelected = input.required<number>();
  emitVoteAverage = output<number>();
  totalSteps = Array(11);

  ngOnInit() {
    this.loadGenreMovieList();
  }

  loadGenreMovieList() {
    this.rangeValue.set(this.voteAverageSelected());
  };

  onChangeValue(event: Event) {
    const element = <HTMLInputElement>event.target;
    const value = +element.value;
    this.rangeValue.set(value);
    this.emitVoteAverage.emit(value);
  };
}
