import { ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { InfiniteScrollComponent } from '../infinite-scroll/infinite-scroll.component';
import { TmdbService } from '@shared/services';
import { of } from 'rxjs';

type TypeResults = 'recommendations' | 'similar';

@Component({
  selector: 'load-relationed',
  imports: [ InfiniteScrollComponent ],
  template: `
    <infinite-scroll [moviesResponse]="moviesResponse"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadRelationedComponent {
  private tmdbService = inject(TmdbService);
  private infiniteScroll = viewChild(InfiniteScrollComponent);
  private currentPage = computed(() => this.infiniteScroll()?.getPage());
  movieId = input.required<number>();
  typeResult = input.required<TypeResults>();
  moviesResponse = rxResource({
    request: () => ({
      typeResult: this.typeResult(),
      movieId: this.movieId(),
      page: this.currentPage()
    }),
    loader: ({ request }) => {
      const typeResult = request.typeResult;
      const movieId = request.movieId;
      const page = request.page;
      return (typeResult && movieId && page)? this.tmdbService.getMoviesBasedIn(typeResult, movieId, page): of(undefined);
    }
  });
};
