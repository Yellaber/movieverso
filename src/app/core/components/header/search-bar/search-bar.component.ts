import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { ActiveActionService, QueryParamsService } from '@shared/services';

@Component({
  selector: 'search-bar',
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslatePipe
  ],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center bg-stone-800 rounded-full gap-3 p-1.5' }
})
export class SearchBarComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private queryParamsService = inject(QueryParamsService);
  private activeActionService = inject(ActiveActionService);
  faMagnifyingGlass = faMagnifyingGlass;
  faSliders = faSliders;
  isOpenedFilter = signal<boolean>(false);
  searchingForm = this.formBuilder.group({
    search: [
      '',
      [Validators.required]
    ]
  });

  private getSearchValue(): string {
    return this.searchingForm.get('search')?.value || '';
  }

  navigateToSearch() {
    if(!this.searchingForm.invalid) {
      this.queryParamsService.set({ query: this.getSearchValue() });
      this.activeActionService.set('search');
      this.router.navigateByUrl('/search');
    }
  };

  onOpenFilter() {
    this.isOpenedFilter.set(true);
  };
}
