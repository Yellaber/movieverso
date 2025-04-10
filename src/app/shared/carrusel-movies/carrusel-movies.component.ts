import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef,
         input, signal, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../interfaces/movie-response.interface';
import { CarruselTitleComponent } from './carrusel-title/carrusel-title.component';
import { CarruselCardMoviesComponent } from './carrusel-card-movies/carrusel-card-movies.component';

const CARD_MOVIE_SIZE = 216; //200px(card movie size) + gap-4(16px)

@Component({
  selector: 'carrusel-movies',
  imports: [
    CarruselTitleComponent,
    CarruselCardMoviesComponent,
    FontAwesomeModule
  ],
  templateUrl: './carrusel-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselMoviesComponent implements AfterViewInit {
  @ViewChild('carouselContainer', { static: true })
  carouselContainer!: ElementRef;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  carruselTitle = input.required<string>();
  movies = input.required<Movie[]>();
  carruselContainerWidth = signal<number>(0);
  scrollStep = signal<number>(0);
  totalScrollStep = signal<number>(0);
  visibleMovies = computed(() => Math.floor(this.carruselContainerWidth() / CARD_MOVIE_SIZE));

  ngAfterViewInit(): void {
    this.updateContainerWidth();
  }

  updateContainerWidth() {
    if(this.carouselContainer?.nativeElement) {
      this.carruselContainerWidth.set(this.carouselContainer.nativeElement.offsetWidth);
      this.totalScrollStep.set(this.movies().length * CARD_MOVIE_SIZE - this.visibleMovies() * CARD_MOVIE_SIZE);
    }
  }

  next() {
    if(this.scrollStep() + this.visibleMovies() * CARD_MOVIE_SIZE < this.totalScrollStep()) {
      this.scrollStep.update(value => value + this.visibleMovies() * CARD_MOVIE_SIZE);
    } else {
      this.scrollStep.set(this.totalScrollStep());
    }
  }

  prev() {
    if(this.scrollStep() - this.visibleMovies() * CARD_MOVIE_SIZE > 0) {
      this.scrollStep.update(value => value - this.visibleMovies() * CARD_MOVIE_SIZE);
    } else {
      this.scrollStep.set(0);
    }
  }
}
