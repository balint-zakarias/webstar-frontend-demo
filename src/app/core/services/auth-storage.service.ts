import { Injectable } from '@angular/core';
import { LoginResponse } from '../../auth/services/auth.service';

const TOKEN_KEY = 'webstar_token';
const USER_KEY = 'webstar_user';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  saveAuthData(data: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}