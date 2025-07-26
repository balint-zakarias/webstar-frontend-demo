import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../models/character.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  imports: [
    CommonModule
  ],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  activeCharacterIndex: number = 0;

  get activeCharacter(): Character | null {
    return this.characters[this.activeCharacterIndex] || null;
  }

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('mock-token') || '';
    this.characterService.getCharacters(token).subscribe({
      next: (res) => {
        this.characters = res.characters;
        console.log('Karakterek:', this.characters);
      },
      error: (err) => {
        console.error('Hiba karakterlekérés közben:', err);
      },
    });
  }

  prevCharacter(): void {
    if (this.characters.length > 0) {
      this.activeCharacterIndex =
        (this.activeCharacterIndex - 1 + this.characters.length) % this.characters.length;
    }
  }

  nextCharacter(): void {
    if (this.characters.length > 0) {
      this.activeCharacterIndex = (this.activeCharacterIndex + 1) % this.characters.length;
    }
  }

  setCharacter(index: number): void {
    this.activeCharacterIndex = index;
  }

  get sanitizedCharacterName(): string {
    const name = this.activeCharacter?.name || '';
    return name.replace(/<br\s*\/?>/gi, ' ');
  }

  getTranslatedSide(): string {
    const side = this.activeCharacter?.side;
    if (side === 'DARK') return 'Sötét';
    if (side === 'LIGHT') return 'Világos';
    return '';
  }
}
