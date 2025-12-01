import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { ActiveActionService, QueryParamsService } from '@services';
import { FilterModalMovies } from '@components/filter-modal-movies/filter-modal-movies';

@Component({
  selector: 'search-bar',
  imports: [ ReactiveFormsModule, FontAwesomeModule, FilterModalMovies, TranslatePipe ],
  templateUrl: './search-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center bg-stone-800 rounded-full gap-3 p-1.5' }
})
export class SearchBar {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private queryParamsService = inject(QueryParamsService);
  private activeActionService = inject(ActiveActionService);
  activeAction = this.activeActionService.getActiveAction;
  faMagnifyingGlass = faMagnifyingGlass;
  faSliders = faSliders;
  searchingForm = this.formBuilder.group({
    search: [ '', [ Validators.required ] ]
  });

  private getSearchValue(): string {
    return this.searchingForm.get('search')?.value || '';
  };

  navigateToSearch() {
    if(!this.searchingForm.invalid) {
      this.queryParamsService.set({
        ...this.queryParamsService.getQueryParams(),
        query: this.getSearchValue()
      });
      this.activeActionService.set('search');
      this.router.navigate(['/search'], { queryParams: { query: this.queryParamsService.getQueryParams().query } });
    }
  };

  onOpenFilter() {
    this.activeActionService.set('filter');
  };
}
