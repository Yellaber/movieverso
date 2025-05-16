import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { CarruselTitleComponent } from '@shared/carrusel-movies/carrusel-title/carrusel-title.component';
import { CarruselCardMoviesComponent } from '@shared/carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { CarruselMoviesComponent } from '@shared/carrusel-movies/carrusel-movies.component';
import { BannerUpcomingSkeletonComponent } from '@components/banner-upcoming-skeleton/banner-upcoming-skeleton.component';
import { environment } from 'src/app/environments/environment.developments';
import { SlugifyService } from '@services/slugify/slugify.service';
import { TmdbService } from '@services/tmdb/tmdb.service';
import { SectionMovie } from '@interfaces/sectionMovie.interface';
import { Movie } from '@interfaces/movie-response.interface';

@Component({
  selector: 'banner-upcoming',
  imports: [
    CarruselTitleComponent,
    CarruselCardMoviesComponent,
    CarruselMoviesComponent,
    BannerUpcomingSkeletonComponent
  ],
  templateUrl: './banner-upcoming.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex flex-col gap-5 lg:pt-10 lg:pb-15' }
})
export class BannerUpcomingComponent implements OnInit {
  section = input.required<SectionMovie>();
  upcommingMovies = signal<Movie[]>([]);
  private slugifyService = inject(SlugifyService);
  private tmdbService = inject(TmdbService);

  ngOnInit(): void {
    this.getUpcommingMovies();
  }

  getBackdropImage(urlImage: string): string {
    return urlImage? environment.imageUrl + urlImage: '';
  }

  slugify(title: string): string {
    return title? this.slugifyService.getSlug(title): '';
  }

  getUpcommingMovies() {
    this.tmdbService.getUpcommingMovies(10)
      .subscribe(upcommingMovies => this.upcommingMovies.set(upcommingMovies));
  }
}
