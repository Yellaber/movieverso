import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule,
         ValidationErrors, Validators } from '@angular/forms'

@Component({
  imports: [
    RouterLink,
    ReactiveFormsModule
   ],
  templateUrl: './sign-up-page.component.html',
})
export default class SignUpPageComponent {
  private formBuilder = inject(FormBuilder);
  signUpForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')
      ]
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')
      ]
    ],
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
    ],
    repeatPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],
    agree: [
      true,
      [ Validators.required ]
    ]
  }, { validators: [this.passwordsMatchValidator] });

  private passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = <string>form.get('password')?.value;
    const repeatPassword = <string>form.get('repeatPassword')?.value;

    return password === repeatPassword? null: { passwordMismatch: true };
  }

  isValidField(field: string): boolean | undefined {
    const isValid = this.signUpForm.get(field)?.invalid;
    const isTouched = this.signUpForm.get(field)?.touched;

    return isValid && isTouched;
  }

  passwordsMatch(): boolean | undefined {
    const hasError = this.signUpForm.hasError('passwordMismatch');
    const isTouched = this.signUpForm.get('repeatPassword')?.touched;

    return hasError && isTouched;
  }
}
