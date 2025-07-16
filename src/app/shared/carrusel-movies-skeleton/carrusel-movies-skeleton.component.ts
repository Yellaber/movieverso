import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarruselTitleSkeletonComponent } from './components/carrusel-title-skeleton/carrusel-title-skeleton.component';
import { CardMovieSkeletonComponent } from './components/card-movie-skeleton/card-movie-skeleton.component';

@Component({
  selector: 'carrusel-movies-skeleton',
  imports: [
    CarruselTitleSkeletonComponent,
    CardMovieSkeletonComponent
  ],
  templateUrl: './carrusel-movies-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-5 py-7 lg:pt-10 lg:pb-15' }
})
export class CarruselMoviesSkeletonComponent {
  cardsSkeleton = Array(10);
}
