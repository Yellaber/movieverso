import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'card-movie-skeleton',
  imports: [],
  template: `
    <div class="w-full h-72 bg-stone-700 rounded-t-md"></div>
    <div class="flex justify-between items-center bg-stone-800 rounded-b-md p-3">
      <div class="w-6 h-6 bg-stone-600 rounded-full"></div>
      <div class="flex gap-3">
        <div class="w-10 h-6 bg-stone-600 rounded"></div>
        <div class="w-10 h-6 bg-stone-600 rounded"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col min-w-[200px] max-w-[200px] rounded-md shadow-md' }
})
export class CardMovieSkeletonComponent { }
