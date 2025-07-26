import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService  } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthStorageService } from '../../../core/services/auth-storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authStorage: AuthStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Sikeres bejelentkezés', response);
        this.authStorage.saveAuthData(response);
        this.router.navigate(['/character']);
      },
      error: (err) => {
        console.error('Hiba', err);
        this.errorMessage = this.extractErrorMessage(err);
      }
    })
  }

  private extractErrorMessage(err: any): string {
    if (err.status === 400) return 'No Applicant ID';
    if (err.status === 405 ) return 'Method not enabled';
    if (err.status === 500 ) return 'Authorization failed';
    return 'Unknown error';
  }
}
