import { ChangeDetectionStrategy, Component, inject, input, signal, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LoadResultsComponent } from '../load-results/load-results.component';
import { TmdbService } from '@services/';

@Component({
  selector: 'load-category',
  imports: [LoadResultsComponent],
  template: `
    <load-results [movies]="movies"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadCategoryComponent {
  private tmdbService = inject(TmdbService);
  endPoint = input.required<string>();
  loadResultsRef = viewChild(LoadResultsComponent);
  movies = rxResource({
    request: () => ({endPoint: this.endPoint(), page: this.loadResultsRef()?.page()!}),
    loader: ({request}) => {
      const endPoint = request.endPoint;
      const page = request.page;
      return this.tmdbService.getMoviesFilteredByCategory(endPoint, page);
    }
  });
}
