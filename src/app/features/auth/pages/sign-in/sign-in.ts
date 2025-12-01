import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoFriendlyService } from '@app/shared/services/seo-friendly-service';

@Component({
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './sign-in.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SignInComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private seoFriendlyService = inject(SeoFriendlyService);
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

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Iniciar sesión', 'Esta es la página para iniciar sesión');
  };

  isValidField(field: string): boolean | undefined {
    const isValid = this.signInForm.get(field)?.invalid;
    const isTouched = this.signInForm.get(field)?.touched;
    return isValid && isTouched;
  };
}
