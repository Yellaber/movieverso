import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit, output,
         signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FilterService, TmdbService } from '@services/';
import { Genre } from '@interfaces/';

const CLASS_MODAL = 'fixed inset-0 bg-stone-900/80 items-center justify-center z-50 hidden';
const CLASS_MODAL_CONTENT = 'w-full max-w-md bg-stone-300 text-stone-700 rounded-md shadow-md transform transition-all duration-300 translate-y-full opacity-0 p-6';

@Component({
  selector: 'filter-modal-upcoming-movies',
  imports: [ FontAwesomeModule ],
  templateUrl: './filter-modal-upcoming-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalUpcomingMoviesComponent implements OnInit {
  faCircleXmark = faCircleXmark;
  isOpen = input.required<boolean>();
  emmitClose = output<boolean>();
  classListModal = signal<string>('');
  classListModalContent = signal<string>('');
  genresMovies = signal<Genre[]>([]);
  genresSelected: Genre[] = [];
  private filterService = inject(FilterService);
  private tmdbService = inject(TmdbService);

  openFilterModal = effect(() => {
    this.isOpen() && this.onShow();
  });

  ngOnInit() {
    this.classListModal.set(CLASS_MODAL);
    this.classListModalContent.set(CLASS_MODAL_CONTENT);
    this.getGenreMovieList();
  };

  getGenreMovieList() {
    this.tmdbService.getGenreMovieList().subscribe(genres => this.genresMovies.set(genres));
    if(this.filterService.getGenresUpcomingMoviesFiltered().length > 0) {
      this.genresSelected = this.filterService.getGenresUpcomingMoviesFiltered();
    }
  };

  onShow() {
    const classModal = this.classListModal().replace('hidden', 'flex');
    this.classListModal.set(classModal);
    setTimeout(() => {
      const classModalContent = this.classListModalContent().replace('translate-y-full', 'translate-y-0').replace('opacity-0', 'opacity-100');
      this.classListModalContent.set(classModalContent);
    }, 10);
  };

  onClose() {
    const classModalContent = this.classListModalContent().replace('translate-y-0', 'translate-y-full').replace('opacity-100', 'opacity-0');
      this.classListModalContent.set(classModalContent);
    setTimeout(() => {
      const classModal = this.classListModal().replace('flex', 'hidden');
      this.classListModal.set(classModal);
      this.emmitClose.emit(false);
    }, 200);
  };

  getGenresSelected(genreSelected: Genre) {
    if(this.genresSelected.find(genre => genre.id === genreSelected.id)) {
      this.genresSelected = this.genresSelected.filter(genre => genre.id !== genreSelected.id);
    } else {
      this.genresSelected = [ ...this.genresSelected, genreSelected ];
    }
    this.filterService.setGenresUpcomingMoviesFiltered(this.genresSelected);
  };

  getGenresUpcomingMoviesFiltered(): Genre[] {
    return this.filterService.getGenresUpcomingMoviesFiltered();
  };
}
