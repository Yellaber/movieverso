import { ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { InfiniteScroll } from '../infinite-scroll/infinite-scroll';
import { TmdbService } from '@services';

@Component({
  selector: 'load-related',
  imports: [ InfiniteScroll ],
  template: `<infinite-scroll [paginatedMovies]="paginatedMovies"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadRelated {
  private tmdbService = inject(TmdbService);
  private infiniteScroll = viewChild(InfiniteScroll);
  private currentPage = computed(() => this.infiniteScroll()?.getPage()?? 1);
  movieId = input.required<number>();
  type = input.required<'recommendations' | 'similar'>();
  paginatedMovies = rxResource({
    params: () => ({
      type: this.type(),
      movieId: this.movieId(),
      page: this.currentPage()
    }),
    stream: ({ params }) => {
      const { type, movieId, page } = params;
      return this.tmdbService.getPaginatedMoviesBasedIn(type, movieId, page);
    }
  });
}
