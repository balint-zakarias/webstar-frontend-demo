import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

interface CharacterResponse {
  characters: Character[];
}

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = `${environment.apiUrl}/rest/frontend-felveteli/v2/characters/`;

  constructor(private http: HttpClient) {}

  getCharacters(token: string): Observable<CharacterResponse> {
    if (environment.useMockData) {
        // return this.http.get<CharacterResponse>('assets/mocks/characters.json');

        return this.http.get<CharacterResponse>('assets/mock/characters.json').pipe(
            tap(data => console.log('Mock karakterek betöltve:', data))
          );
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Applicant-Id': environment.applicantId,
      'Application-Authorization': `Bearer ${token}`,
    });

    return this.http.get<CharacterResponse>(this.apiUrl, { headers });
  }
}