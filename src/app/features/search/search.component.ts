import { ChangeDetectionStrategy, Component, effect, inject, OnInit, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadResultsComponent } from '@shared/components/load-results/load-results.component';
import { SearchService } from './services/search.service';
import { SeoFriendlyService } from '@app/core/services';
import { ActiveActionService, QueryParamsService, ScrollService } from '@shared/services';
import { MovieResponse, QueryParams } from '@shared/interfaces';

const noMovieResponse: MovieResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0
};

@Component({
  selector: 'search',
  imports: [
    LoadResultsComponent,
    TranslatePipe
  ],
  template: `
    @if(typeSelectedOption() === 'search') {
      <div class="flex flex-wrap text-xs lg:text-sm items-center font-bold text-yellow-600 gap-3">
        <h3>{{ 'search.title' | translate }}</h3>
        <span class="rounded-full bg-yellow-900/50 text-yellow-600 px-3 py-2">
          {{ queryParams()?.query }}
        </span>
      </div>
    }
    <load-results [movies]="movies"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 mt-10 lg:mt-15' }
})
export default class SearchComponent implements OnInit {
  private tmdbService = inject(SearchService);
  private seoFriendlyService = inject(SeoFriendlyService);
  private queryParamsService = inject(QueryParamsService);
  private scrollService = inject(ScrollService);
  private activeActionService = inject(ActiveActionService);
  queryParams = this.queryParamsService.getQueryParams;
  typeSelectedOption = this.activeActionService.getActiveAction;
  loadResultsRef = viewChild(LoadResultsComponent);

  movies = rxResource({
    request: () => ({ typeSelectedOption: this.typeSelectedOption(), queryParams: this.queryParams(),
      page: this.loadResultsRef()?.page()! }),
    loader: ({ request }) => {
      const { typeSelectedOption, queryParams, page } = request;
      return (typeSelectedOption && queryParams)?
        this.getResource(typeSelectedOption!, queryParams!, page): of([ noMovieResponse ]);
    }
  });

  constructor() {
    effect(() => {
      const queryFilter = this.queryParams();
      if(queryFilter) {
        this.loadResultsRef()?.page.set(1);
        this.scrollService.scrollTop();
      }
    });
  };

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Search', '');
  };

  private getResource(typeSelectedOption: string, queryParams: QueryParams, page: number): Observable<MovieResponse[]> {
    return (typeSelectedOption === 'filter')? this.tmdbService.getMoviesFiltered(queryParams!, page):
      this.tmdbService.getMovieByTitle(queryParams?.query!, page);
  };
}
