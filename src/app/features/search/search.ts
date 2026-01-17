import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { InfiniteScroll } from '@components/infinite-scroll/infinite-scroll';
import { QueryParamsService, ScrollService, SearchService, SeoFriendlyService } from '@services';
import { PaginatedMovies, QueryParams } from '@interfaces';

@Component({
  selector: 'search',
  imports: [ InfiniteScroll, TranslatePipe ],
  template: `
    @if(queryParams().query) {
      <div class="flex flex-wrap text-xs lg:text-sm items-center font-bold text-yellow-600 gap-3">
        <h3>{{ 'search.title' | translate }}</h3>
        <span class="rounded-full bg-yellow-900/50 text-yellow-600 px-3 py-2">{{ queryParams().query }}</span>
      </div>
    }
    <infinite-scroll [paginatedMovies]="paginatedMovies"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 mt-10 lg:mt-15' }
})
export default class Search implements OnInit {
  private searchService = inject(SearchService);
  private seoFriendlyService = inject(SeoFriendlyService);
  private queryParamsService = inject(QueryParamsService);
  private scrollService = inject(ScrollService);
  private infiniteScroll = viewChild(InfiniteScroll);
  private currentPage = computed(() => this.infiniteScroll()?.getPage()?? 1);
  queryParams = computed(() => this.queryParamsService.getQueryParams());
  paginatedMovies = rxResource({
    params: () => ({
      queryParams: this.queryParams(),
      page: this.currentPage()
    }),
    stream: ({ params }) => {
      const { queryParams, page } = params;
      return this.getPaginatedMovies(queryParams, page);
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
  }

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Search', '');
  }

  private getPaginatedMovies(queryParams: QueryParams, page: number): Observable<PaginatedMovies[]> {
    const query = queryParams.query;
    return (query !== '')? this.searchService.getMovieByTitle(query, page): this.searchService.getMoviesFiltered(queryParams, page);
  }
}
