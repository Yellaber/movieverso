import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'search-bar',
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center bg-stone-800 rounded-full gap-3 p-1.5' }
})
export class SearchBarComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  faMagnifyingGlass = faMagnifyingGlass;
  faSliders = faSliders;
  emmitClick = output<boolean>();
  searchingForm = this.formBuilder.group({
    search: [
      '',
      [Validators.required, Validators.minLength(1)]
    ]
  });

  navigateToSearch() {
    if(!this.searchingForm.invalid) {
      this.router.navigateByUrl('/search');
    }
  };

  onClick() {
    this.emmitClick.emit(true);
  };
}
