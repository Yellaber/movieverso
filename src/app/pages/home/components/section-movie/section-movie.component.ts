import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { BannerHeroComponent } from '../banner-hero/banner-hero.component';
import { BannerHeroSkeletonComponent } from '../banner-hero-skeleton/banner-hero-skeleton.component';
import { CarruselMoviesComponent } from '@shared/carrusel-movies/carrusel-movies.component';
import { CarruselMoviesSkeletonComponent } from '@shared/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { TmdbService } from '@services/tmdb.service';
import { SectionMovie, Movie, CarouselConfig, EndPointValid } from '@interfaces/';

@Component({
  selector: 'section-movie',
  imports: [
    BannerHeroComponent,
    BannerHeroSkeletonComponent,
    CarruselMoviesComponent,
    CarruselMoviesSkeletonComponent
  ],
  template: `
    @if(movies().length > 0) {
      <banner-hero [heroType]="section().heroType" [heroTitle]="section().heroTitle" [movie]="movies()[0]"/>
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <banner-hero-skeleton/>
      <carrusel-movies-skeleton/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionMovieComponent implements OnInit {
  private tmdbService = inject(TmdbService);
  section = input.required<SectionMovie>();
  text = signal<string>('');
  movies = signal<Movie[]>([]);
  route = computed(() => '/' + this.section().heroType);
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.section().carruselTitle,
    text: this.text(),
    movies: this.movies(),
    route: this.route(),
    bgButtons: 'from-stone-900',
    bgCardFooter: 'bg-stone-800'
  }));

  ngOnInit() {
    this.getDataSectionMovies();
  };

  getDataSectionMovies() {
    switch(this.section().heroType) {
      case 'now-playing':
        this.text.set('¡Directo desde la pantalla grande! Aquí reunimos las 20 películas que están encendiendo las salas de cine en este preciso instante. El ranking se basa en fechas de estreno recientes, disponibilidad en cartelera y, claro, en ese aroma irresistible a crispetas recién hechas.');
          this.tmdbService.getMovies(EndPointValid.nowPlaying).subscribe(movies => this.movies.set(movies));
        break;
      case 'popular':
        this.text.set('Estas son las estrellas del momento. Las 20 películas que están rompiendo internet, acumulando clics, likes y miradas curiosas. No importa si son nuevas o antiguas, ¡la popularidad no entiende de edad!');
        this.tmdbService.getMovies(EndPointValid.popular).subscribe(movies => this.movies.set(movies));
        break;
      case 'top-rated':
        this.text.set('Aquí no entran por fama, entran por mérito. Estas 20 joyas del cine llevan la puntuación por las nubes gracias a miles de votos. Si buscas calidad garantizada, este es tu asiento en primera fila.');
        this.tmdbService.getMovies(EndPointValid.topRated).subscribe(movies => this.movies.set(movies));
        break;
      case 'trending':
        this.text.set('¿Qué se está viendo, comentando o viralizando HOY? Estas 20 películas están en pleno apogeo: algunas recién salidas del horno, otras revividas por la magia del internet. Si quieres estar en la onda, empieza por aquí.');
        this.tmdbService.getMovies(EndPointValid.trending).subscribe(movies => this.movies.set(movies));
        break;
    }
  };
}
