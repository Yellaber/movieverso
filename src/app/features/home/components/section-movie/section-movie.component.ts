import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { BannerHeroComponent } from '../banner-hero/banner-hero.component';
import { BannerHeroSkeletonComponent } from '../banner-hero-skeleton/banner-hero-skeleton.component';
import { CarruselMoviesComponent } from '@shared/components/carrusel-movies/carrusel-movies.component';
import { CarruselMoviesSkeletonComponent } from '@shared/components/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { HomeService } from '../../services/home.service';
import { SectionMovie, Movie, CarouselConfig, EndPointValid } from '@shared/interfaces';

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
export class SectionMovieComponent {
  private translateService = inject(TranslateService);
  private homeService = inject(HomeService);
  section = input.required<SectionMovie>();
  private sectionData = rxResource({
    request: this.section,
    loader: ({ request }) => {
      let endpoint: EndPointValid;
      let textKey: string;
      switch(request.heroType) {
        case 'now-playing':
          endpoint = EndPointValid.nowPlaying;
          textKey = 'home.nowPlayingSection.paragraph';
          break;
        case 'popular':
          endpoint = EndPointValid.popular;
          textKey = 'home.popularSection.paragraph';
          break;
        case 'top-rated':
          endpoint = EndPointValid.topRated;
          textKey = 'home.topRatedSection.paragraph';
          break;
        default:
          endpoint = EndPointValid.trending;
          textKey = 'home.trendingSection.paragraph';
          break;
      }
      return forkJoin({
        movies: this.homeService.getMovies(endpoint),
        text: this.translateService.get(textKey)
      });
    }
  });
  movies = computed<Movie[]>(() => this.sectionData.hasValue()? this.sectionData.value().movies: []);
  text = computed<string>(() => this.sectionData.hasValue()? this.sectionData.value().text: '');
  route = computed(() => `/${this.section().heroType}`);
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.section().carruselTitle,
    text: this.text(),
    movies: this.movies(),
    route: this.route(),
    bgButtons: 'from-stone-900',
    bgCardFooter: 'bg-stone-800'
  }));
};
