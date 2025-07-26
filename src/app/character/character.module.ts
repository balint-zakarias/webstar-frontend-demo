import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    CharacterComponent
  ]
})
export class CharacterModule { }
