import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Rating } from '../rating/rating';
import { Movie } from '@interfaces';

@Component({
  selector: 'footer-poster',
  imports: [ Rating ],
  template: `
    <div class="absolute bottom-0 w-full hidden md:flex justify-between items-center bg-stone-900/80 rounded-b-md px-3 py-2">
      <rating type="popularity" [value]="getPopularity()"/>
      <rating type="vote_average" [value]="getVoteAverage()"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterPoster {
  movie = input.required<Movie>();
  getPopularity = computed<number>(() => this.movie().popularity);
  getVoteAverage = computed<number>(() => this.movie().vote_average);
}
