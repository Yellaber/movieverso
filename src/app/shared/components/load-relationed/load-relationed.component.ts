import { ChangeDetectionStrategy, Component, inject, input, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LoadResultsComponent } from '../load-results/load-results.component';
import { TmdbService } from '@shared/services';

type TypeResults = 'recommendations' | 'similar';

@Component({
  selector: 'load-relationed',
  imports: [ LoadResultsComponent ],
  template: `
    <load-results [movies]="movies"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadRelationedComponent {
  private tmdbService = inject(TmdbService);
  movieId = input.required<number>();
  typeResult = input.required<TypeResults>();
  loadResultsRef = viewChild(LoadResultsComponent);
  movies = rxResource({
    request: () => ({ typeResult: this.typeResult(), movieId: this.movieId(),
                     page: this.loadResultsRef()?.page()! }),
    loader: ({ request }) => {
      const typeResult = request.typeResult;
      const movieId = request.movieId;
      const page = request.page;
      return this.tmdbService.getMoviesBasedIn(typeResult, movieId, page);
    }
  });
}
