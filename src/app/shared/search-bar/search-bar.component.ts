import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
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
