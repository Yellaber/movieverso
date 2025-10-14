import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { InfiniteScrollComponent } from '@shared/components/infinite-scroll/infinite-scroll.component';
import { SearchService } from './services/search.service';
import { SeoFriendlyService } from '@app/core/services';
import { QueryParamsService, ScrollService } from '@shared/services';
import { MovieResponse, QueryParams } from '@shared/interfaces';

@Component({
  selector: 'search',
  imports: [
    InfiniteScrollComponent,
    TranslatePipe,
  ],
  template: `
    @if(queryParams().query) {
      <div class="flex flex-wrap text-xs lg:text-sm items-center font-bold text-yellow-600 gap-3">
        <h3>{{ 'search.title' | translate }}</h3>
        <span class="rounded-full bg-yellow-900/50 text-yellow-600 px-3 py-2">
          {{ queryParams().query }}
        </span>
      </div>
    }
    <infinite-scroll [moviesResponse]="moviesResponse"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 mt-10 lg:mt-15' }
})
export default class SearchComponent implements OnInit {
  private tmdbService = inject(SearchService);
  private seoFriendlyService = inject(SeoFriendlyService);
  private queryParamsService = inject(QueryParamsService);
  private scrollService = inject(ScrollService);
  private infiniteScroll = viewChild(InfiniteScrollComponent);
  private currentPage = computed(() => this.infiniteScroll()?.getPage());
  queryParams = this.queryParamsService.getQueryParams;
  moviesResponse = rxResource({
    params: () => ({
      queryParams: this.queryParams(),
      page: this.currentPage()
    }),
    stream: ({ params }) => {
      const { queryParams, page } = params;
      return (queryParams && page)? this.getResource(queryParams, page): of(undefined);
    }
  });

  constructor() {
    effect(() => {
      const queryFilter = this.queryParams();
      if(queryFilter) {
        this.infiniteScroll()?.reset();
        this.scrollService.scrollTop();
      }
    });
  };

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Search', '');
  };

  private getResource(queryParams: QueryParams, page: number): Observable<MovieResponse[]> {
    return (queryParams.query)? this.tmdbService.getMovieByTitle(queryParams.query, page):
      this.tmdbService.getMoviesFiltered(queryParams, page);
  };
};
