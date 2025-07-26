import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/rest/frontend-felveteli/v2/authentication/';

  private readonly basicAuthUser = 'frontend';
  private readonly basicAuthPassword = 'frontendwebstar2025';
  private readonly applicantId = 'zakariasbalint';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    if (environment.useMockAuth) {
      console.warn('Mock login activated');
      return this.http.get<LoginResponse>('assets/mock/auth-response.json');
    }

    const authToken = btoa(`${this.basicAuthUser}:${this.basicAuthPassword}`);

    const body = { username, password };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Applicant-Id': this.applicantId,
      'Authorization': `Basic ${authToken}`,
    });

    return this.http.post<LoginResponse>(this.apiUrl, body, { headers });
  }
}