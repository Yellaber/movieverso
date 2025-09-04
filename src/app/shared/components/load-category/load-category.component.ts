import { ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { InfiniteScrollComponent } from '../infinite-scroll/infinite-scroll.component';
import { TmdbService } from '@shared/services';
import { of } from 'rxjs';

@Component({
  selector: 'load-category',
  imports: [ InfiniteScrollComponent ],
  template: `
    <infinite-scroll [moviesResponse]="MoviesResponse"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadCategoryComponent {
  private tmdbService = inject(TmdbService);
  private infiniteScroll = viewChild(InfiniteScrollComponent);
  private currentPage = computed(() => this.infiniteScroll()?.getPage());
  endPoint = input.required<string>();
  MoviesResponse = rxResource({
    request: () => ({
      endPoint: this.endPoint(),
      page: this.currentPage()
    }),
    loader: ({ request }) => {
      const endPoint = request.endPoint;
      const page = request.page;
      return (endPoint && page)? this.tmdbService.getMoviesFilteredByCategory(endPoint, page): of(undefined);
    }
  });
};
