import { ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { InfiniteScroll } from '../infinite-scroll/infinite-scroll';
import { TmdbService } from '@services';

@Component({
  selector: 'load-category',
  imports: [ InfiniteScroll ],
  template: `<infinite-scroll [paginatedMovies]="paginatedMovies"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadCategory {
  private tmdbService = inject(TmdbService);
  private infiniteScroll = viewChild(InfiniteScroll);
  private currentPage = computed(() => this.infiniteScroll()?.getPage());
  endPoint = input.required<string>();
  paginatedMovies = rxResource({
    params: () => ({
      endPoint: this.endPoint(),
      currentPage: this.currentPage()
    }),
    stream: ({ params }) => {
      const { endPoint, currentPage } = params;
      return (endPoint && currentPage)?
      this.tmdbService.getPaginatedMoviesByCategory(endPoint, currentPage): of(undefined);
    }
  });
}
