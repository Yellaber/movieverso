import { ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { InfiniteScrollComponent } from '../infinite-scroll/infinite-scroll.component';
import { TmdbService } from '@shared/services';

@Component({
  selector: 'load-related',
  imports: [ InfiniteScrollComponent ],
  template: `<infinite-scroll [moviesResponse]="moviesResponse"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadRelatedComponent {
  private tmdbService = inject(TmdbService);
  private infiniteScroll = viewChild(InfiniteScrollComponent);
  private currentPage = computed(() => this.infiniteScroll()?.getPage());
  movieId = input.required<number>();
  type = input.required<'recommendations' | 'similar'>();
  moviesResponse = rxResource({
    params: () => ({
      type: this.type(),
      movieId: this.movieId(),
      page: this.currentPage()
    }),
    stream: ({ params }) => {
      const { type, movieId, page } = params;
      return (type && movieId && page)? this.tmdbService.getMoviesBasedIn(type, movieId, page): of(undefined);
    }
  });
};
