import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarruselTitleSkeletonComponent } from './carrusel-title-skeleton/carrusel-title-skeleton.component';
import { CardMovieSkeletonComponent } from './card-movie-skeleton/card-movie-skeleton.component';

@Component({
  selector: 'carrusel-movies-skeleton',
  imports: [
    CarruselTitleSkeletonComponent,
    CardMovieSkeletonComponent
  ],
  templateUrl: './carusel-movies-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col animate-pulse gap-5 py-7 lg:pt-10 lg:pb-15' }
})
export class CarruselMoviesSkeletonComponent {
  cardsSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
