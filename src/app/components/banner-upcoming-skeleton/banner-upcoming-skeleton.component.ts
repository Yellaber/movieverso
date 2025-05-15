import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarruselTitleSkeletonComponent } from '../carrusel-movies-skeleton/carrusel-title-skeleton/carrusel-title-skeleton.component';
import { CardMovieSkeletonComponent } from '../carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';
import { CarruselMoviesSkeletonComponent } from '../carrusel-movies-skeleton/carrusel-movies-skeleton.component';

@Component({
  selector: 'banner-upcoming-skeleton',
  imports: [
    CarruselTitleSkeletonComponent,
    CardMovieSkeletonComponent,
    CarruselMoviesSkeletonComponent
  ],
  templateUrl: './banner-upcoming-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col animate-pulse gap-5 py-7 lg:pt-10 lg:pb-15' }
})
export class BannerUpcomingSkeletonComponent { }
