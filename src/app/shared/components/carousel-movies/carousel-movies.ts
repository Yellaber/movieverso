import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, input, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselTitle } from './carousel-title/carousel-title';
import { CarouselCardMovies } from './carousel-card-movies/carousel-card-movies';
import { CarouselControl } from './carousel-control/carousel-control';
import { CarouselMoviesService } from '@services';
import { CarouselConfig } from '@interfaces';

@Component({
  selector: 'carousel-movies',
  imports: [ FontAwesomeModule, CarouselTitle, CarouselCardMovies, CarouselControl ],
  providers: [ CarouselMoviesService ],
  templateUrl: './carousel-movies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-5' }
})
export class CarouselMovies implements AfterViewInit {
  private carouselMoviesService = inject(CarouselMoviesService);
  carouselContainer = viewChild<ElementRef<HTMLDivElement>>('carouselContainer');
  carouselConfig = input.required<CarouselConfig>();

  @HostListener('window:resize')
  onResize() {
    this.initializer();
  };

  ngAfterViewInit() {
    this.initializer();
  };

  private initializer() {
    const container = this.carouselContainer();
    if(container) {
      const { movies } = this.carouselConfig();
      this.carouselMoviesService.initializer(container.nativeElement.offsetWidth, movies.length);
    }
  };

  getScrollStep(): number {
    return this.carouselMoviesService.getScrollStep();
  };

  isPrevious(): boolean {
    return this.carouselMoviesService.isPrevious();
  };

  isNext(): boolean {
    return this.carouselMoviesService.isNext();
  };
}
