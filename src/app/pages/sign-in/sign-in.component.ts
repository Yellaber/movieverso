import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'sign-in',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SignInComponent {
  private formBuilder = inject(FormBuilder);
  signInForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]
    ]
  });

  isValidField(field: string): boolean | undefined {
    const isValid = this.signInForm.get(field)?.invalid;
    const isTouched = this.signInForm.get(field)?.touched;
    return isValid && isTouched;
  }
}
