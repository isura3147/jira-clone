import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent {
  user: any = null;
  pwdForm: FormGroup;
  pwdLoading = false;
  pwdSuccess = '';
  pwdError = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.user = this.authService.currentUserValue;
    this.pwdForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  changePassword() {
    if (this.pwdForm.invalid) return;
    
    this.pwdLoading = true;
    this.pwdSuccess = '';
    this.pwdError = '';
    this.cdr.markForCheck();

    const val = this.pwdForm.value;
    this.authService.changePassword(val.oldPassword, val.newPassword).subscribe({
      next: () => {
        this.pwdSuccess = 'Password updated successfully!';
        this.pwdLoading = false;
        this.pwdForm.reset();
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.pwdError = err.error?.message || 'Failed to update password.';
        this.pwdLoading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
