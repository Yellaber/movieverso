import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'search-bar',
  imports: [
    NgClass,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  layoutClass = input.required<string>();
  private formBuilder = inject(FormBuilder);
  searchingForm = this.formBuilder.group({
    search: [
      '',
      [
        Validators.required,
        Validators.minLength(1)
      ]
    ]
  });

  constructor(private router: Router) {}

  navigateToSearch() {
    if(!this.searchingForm.invalid) {
      this.router.navigateByUrl('/buscar');
    }
  }
}
