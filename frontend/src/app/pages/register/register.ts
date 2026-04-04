import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    this.registerForm.valueChanges.subscribe(() => {
      if (this.error) {
         this.error = '';
         this.cdr.markForCheck();
      }
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const val = this.registerForm.value;
    this.authService.register(val.username, val.email, val.password)
      .subscribe({
        next: () => {
          this.authService.login(val.username, val.password).subscribe(() => {
             this.router.navigate(['/']);
             this.cdr.markForCheck();
          });
        },
        error: error => {
          this.error = error.error?.message || 'Registration failed';
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }
  
  hasError(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
