import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { QueryParamsService } from '@services';
import { FilterModalMovies } from '@components/filter-modal-movies/filter-modal-movies';

@Component({
  selector: 'search-bar',
  imports: [ ReactiveFormsModule, FontAwesomeModule, FilterModalMovies, TranslatePipe ],
  templateUrl: './search-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center' }
})
export class SearchBar {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private queryParamsService = inject(QueryParamsService);
  faMagnifyingGlass = faMagnifyingGlass;
  faSliders = faSliders;
  showFilter = signal<boolean>(false);
  searchingForm = this.formBuilder.group({
    search: [ '', [ Validators.required ] ]
  });

  private getSearchValue(): string {
    return this.searchingForm.get('search')?.value || '';
  }

  navigateToSearch() {
    if(!this.searchingForm.invalid) {
      this.queryParamsService.set({
        ...this.queryParamsService.getQueryParams(),
        query: this.getSearchValue()
      });
      this.router.navigate(['/search'], { queryParams: { query: this.queryParamsService.getQueryParams().query } });
    }
  }

  onOpenFilter() {
    this.showFilter.set(true);
  }
}
