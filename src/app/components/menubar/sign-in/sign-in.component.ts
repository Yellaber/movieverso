import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sign-in',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  layoutClass = input.required<string>();
 }
