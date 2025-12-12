import { ChangeDetectionStrategy, Component, computed, ElementRef, input, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Carousel } from '../carousel/carousel';
import { CarouselTitle } from './carousel-title/carousel-title';
import { CarouselConfig } from '@interfaces';
import { PosterMovie } from '../poster-movie/poster-movie';
import { FooterPoster } from '../footer-poster/footer-poster';

@Component({
  selector: 'carousel-movies',
  imports: [ Carousel, CarouselTitle, FontAwesomeModule, PosterMovie, FooterPoster ],
  templateUrl: './carousel-movies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-5' }
})
export class CarouselMovies {
  carouselConfig = input.required<CarouselConfig>();
  posterContainer = viewChild<ElementRef<HTMLDivElement>>('poster');
  getWidthPosterContainer = computed<number>(() => {
    const posterContainer = this.posterContainer();
    return posterContainer? posterContainer.nativeElement.offsetWidth: 0
  });
  getTotalMovies = computed<number>(() => {
    const { movies } = this.carouselConfig();
    return movies.length;
  });
  getBgControl = computed<string>(() => {
    const { bgButtons } = this.carouselConfig();
    return bgButtons?? '';
  });
}
