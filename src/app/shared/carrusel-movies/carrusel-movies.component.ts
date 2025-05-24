import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef,
         input, signal, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarruselTitleComponent } from './carrusel-title/carrusel-title.component';
import { CarruselCardMoviesComponent } from './carrusel-card-movies/carrusel-card-movies.component';
import { CarruselButtonComponent } from './carrusel-button/carrusel-button.component';
import { CarouselConfig } from '@interfaces/';

const CARD_MOVIE_SIZE = 176; //200px(card size movie) + gap-4(16px)

@Component({
  selector: 'carrusel-movies',
  imports: [
    FontAwesomeModule,
    CarruselTitleComponent,
    CarruselCardMoviesComponent,
    CarruselButtonComponent
  ],
  templateUrl: './carrusel-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-5' }
})
export class CarruselMoviesComponent implements AfterViewInit {
  carouselContainer = viewChild<ElementRef<HTMLDivElement>>('carouselContainer');
  carouselConfig = input.required<CarouselConfig>();
  carruselContainerWidth = signal<number>(0);
  scrollStep = signal<number>(0);
  totalScrollStep = signal<number>(0);
  visibleMovies = computed<number>(() => this.carruselContainerWidth() / CARD_MOVIE_SIZE);
  scrollVisibleMovies = computed<number>(() => Math.floor(this.visibleMovies()) * CARD_MOVIE_SIZE);
  getPartNotVisible = computed<number>(() =>
    (this.visibleMovies() - Math.floor(this.visibleMovies())) * CARD_MOVIE_SIZE + 16);

  ngAfterViewInit() {
    const { movies } = this.carouselConfig();
    this.carruselContainerWidth.set(this.carouselContainer()!.nativeElement.offsetWidth);
    this.totalScrollStep.set(movies.length * CARD_MOVIE_SIZE - this.scrollVisibleMovies());
  }

  next() {
    (this.scrollStep() + this.scrollVisibleMovies() < this.totalScrollStep())?
    this.scrollStep.update(value => value + this.scrollVisibleMovies()):
    this.scrollStep.set(this.totalScrollStep() - this.getPartNotVisible());
  }

  previous() {
    (this.scrollStep() - this.scrollVisibleMovies() > 0)?
    this.scrollStep.update(value => value - this.scrollVisibleMovies()): this.scrollStep.set(0);
  }

  onClick(direction: string) {
    (direction === 'next') && this.next();
    (direction === 'previous') && this.previous();
  }
}
