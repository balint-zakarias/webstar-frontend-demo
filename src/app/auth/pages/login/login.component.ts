import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService  } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService){}

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
        // TODO: ide jonnek meg egyeb dolgok
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
    if (err.status === 500 ) return 'Athorization failed';
    return 'Unknown error';
  }
}
