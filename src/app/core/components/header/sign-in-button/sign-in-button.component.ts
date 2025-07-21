import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'sign-in-button',
  imports: [
    RouterLink,
    ButtonModule
  ],
  template: `
    <div [class]="layoutClass()">
      <p-button routerLink="/auth/sign-in" icon="pi pi-sign-in" [rounded]="true" styleClass="bg-stone-800 text-yellow-600 border-0 font-semibold w-8 h-8 lg:w-9 lg:h-9"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInButtonComponent {
  layoutClass = input.required<string>();
}
