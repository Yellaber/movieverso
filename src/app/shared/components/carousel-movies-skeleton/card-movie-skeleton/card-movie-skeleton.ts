import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'card-movie-skeleton',
  imports: [],
  template: `
    <div class="w-[92px] h-[130px] md:w-[154px] md:h-[223px] bg-stone-700 rounded-t-md"></div>
    <div class="flex justify-between items-center bg-stone-800 rounded-b-md px-3 py-2">
      <div class="w-5 h-4 md:w-10 md:h-6 bg-stone-600 rounded"></div>
      <div class="w-5 h-4 md:w-10 md:h-6 bg-stone-600 rounded"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col rounded-md shadow-md' }
})
export class CardMovieSkeleton { }
