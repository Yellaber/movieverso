import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sign-in',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  layoutClass = input.required<string>();
 }
