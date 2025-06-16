import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sign-in-button',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './sign-in-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInButtonComponent {
  layoutClass = input.required<string>();
}
