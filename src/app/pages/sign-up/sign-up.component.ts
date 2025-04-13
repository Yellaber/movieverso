import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors,
         Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoFriendlyService } from '../../services/seo-friendly/seo-friendly.service';

enum typeInput {
  Password = 'password',
  Text = 'text'
}

@Component({
  selector: 'sign-up',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SignUpComponent implements OnInit {
  isHiddenPassword = signal<boolean>(true);
  isHiddenRepeatPassword = signal<boolean>(true);
  typeInPassword = computed<string>(() =>
    this.isHiddenPassword()? typeInput.Password: typeInput.Text
  );
  typeInRepeatPassword = computed<string>(() =>
    this.isHiddenRepeatPassword()? typeInput.Password: typeInput.Text
  );
  private seoFriendlyService = inject(SeoFriendlyService);
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

  ngOnInit(): void {
    this.seoFriendlyService.setMetaTags('Sign up', 'Esta es la página para el registro de usuarios');
  }

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

  onHideField(field: string) {
    switch(field) {
      case 'password':
        this.isHiddenPassword.set(!this.isHiddenPassword());
        break;
      case 'repeatPassword':
        this.isHiddenRepeatPassword.set(!this.isHiddenRepeatPassword());
    }
  }
}
