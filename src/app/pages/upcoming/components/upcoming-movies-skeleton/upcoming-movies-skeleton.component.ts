import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardMovieSkeletonComponent } from '@components/carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';

@Component({
  selector: 'upcoming-movies-skeleton',
  imports: [ CardMovieSkeletonComponent ],
  template: `
    @for(_ of cardMoviesSkeleton; track $index) {
      <card-movie-skeleton/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-wrap justify-evenly gap-5' }
})
export class UpcomingMoviesSkeletonComponent {
  cardMoviesSkeleton = Array(20);
}
