import { ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { InfiniteScrollComponent } from '../infinite-scroll/infinite-scroll.component';
import { TmdbService } from '@shared/services';

@Component({
  selector: 'load-category',
  imports: [ InfiniteScrollComponent ],
  template: `<infinite-scroll [moviesResponse]="MoviesResponse"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadCategoryComponent {
  private tmdbService = inject(TmdbService);
  private infiniteScroll = viewChild(InfiniteScrollComponent);
  private currentPage = computed(() => this.infiniteScroll()?.getPage());
  endPoint = input.required<string>();
  MoviesResponse = rxResource({
    params: () => ({
      endPoint: this.endPoint(),
      page: this.currentPage()
    }),
    stream: ({ params }) => {
      const { endPoint, page } = params;
      return (endPoint && page)? this.tmdbService.getMoviesFilteredByCategory(endPoint, page): of(undefined);
    }
  });
};
