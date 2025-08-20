import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, input, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarruselTitleComponent } from './carrusel-title/carrusel-title.component';
import { CarruselCardMoviesComponent } from './carrusel-card-movies/carrusel-card-movies.component';
import { CarruselControlComponent } from './carrusel-control/carrusel-control.component';
import { CarouselMoviesService } from './services/carousel-movies.service';
import { CarouselConfig } from '@shared/interfaces';

@Component({
  selector: 'carrusel-movies',
  imports: [
    FontAwesomeModule,
    CarruselTitleComponent,
    CarruselCardMoviesComponent,
    CarruselControlComponent
  ],
  providers: [ CarouselMoviesService ],
  templateUrl: './carrusel-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-5' }
})
export class CarruselMoviesComponent implements AfterViewInit {
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
};
