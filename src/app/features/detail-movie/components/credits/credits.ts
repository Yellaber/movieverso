import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CarouselCredits } from './carousel-credits/carousel-credits';
import { CarouselCreditSkeleton } from "@components/carousel-credit-skeleton/carousel-credit-skeleton";
import { DetailService } from '@services';

@Component({
  selector: 'credits',
  imports: [ CarouselCredits, CarouselCreditSkeleton ],
  template: `
    @if(!credit.isLoading() && credit.hasValue()) {
      <carousel-credits [credit]="credit.value()!"/>
    } @else {
      <carousel-credit-skeleton/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col rounded-md shadow-md bg-stone-800 gap-2 px-5 lg:px-10 my-5 py-6 lg:py-11' }
})
export class Credits {
  private detailService = inject(DetailService);
  idMovie = input.required<number>();
  credit = rxResource({
    params: this.idMovie,
    stream: ({ params }) => this.detailService.getMovieCredits(params)
  });
}
