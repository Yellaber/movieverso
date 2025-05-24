import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit,
         signal } from '@angular/core';
import { CarruselMoviesComponent } from '@shared/carrusel-movies/carrusel-movies.component';
import { MovieResponse, CarouselConfig } from '@interfaces/';
import { TmdbService } from '@services/';

type TypeMoviesDetail = 'Recomendaciones' | 'Similares';

@Component({
  selector: 'movies-detail',
  imports: [ CarruselMoviesComponent ],
  template: `
    @if(movies()) {
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesDetailComponent implements OnInit {
  private tmdbService = inject(TmdbService);
  idMovie = input.required<number>();
  typeMoviesDetail = input.required<TypeMoviesDetail>();
  movies = signal<MovieResponse | undefined>(undefined);
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: '',
    movies: this.movies()!.results,
    route: '',
    bgButtons: 'from-stone-800',
    bgCardFooter: 'bg-stone-700'
  }));

  ngOnInit() {
    this.loadMoviesDetail();
  };

  loadMoviesDetail() {
    (this.typeMoviesDetail() === 'Recomendaciones')? this.getMoviesRecommendations():
    this.getMoviesSimilars();
  };

  getMoviesRecommendations() {
    this.tmdbService.getMovieRecommendations(this.idMovie(), 1)
      .subscribe(movieResponse => this.movies.set(movieResponse));
  }

  getMoviesSimilars() {
    this.tmdbService.getMovieSimilar(this.idMovie(), 1)
      .subscribe(movieResponse => this.movies.set(movieResponse));
  }
}
