import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'search-bar',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  layoutClass = input.required<string>();
}
