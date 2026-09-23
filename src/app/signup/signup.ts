import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

const matchingPasswordsValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password && confirmPassword && password !== confirmPassword
    ? { passwordsDoNotMatch: true }
    : null;
};

@Component({
  selector: 'app-signup',
  standalone: false,
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {
  submitted = false;
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly signupForm = this.formBuilder.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: matchingPasswordsValidator },
  );

  get fullName() {
    return this.signupForm.controls.fullName;
  }

  get phone() {
    return this.signupForm.controls.phone;
  }

  get email() {
    return this.signupForm.controls.email;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  get confirmPassword() {
    return this.signupForm.controls.confirmPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) {
      return;
    }

    const { fullName, email, password } = this.signupForm.getRawValue();
    this.authService.saveUser({
      fullName: fullName ?? '',
      email: email ?? '',
      password: password ?? '',
    });
    this.router.navigate(['/login']);
  }
}
