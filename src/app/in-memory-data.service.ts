import { Injectable } from '@angular/core';
import { Character } from './character';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    const characters = [
      { id: 1, name: 'Derp' },
      { id: 2, name: 'Gerp' },
      { id: 3, name: 'Lerp' },
      { id: 4, name: 'Merp' },
      { id: 5, name: 'Ferp' },
    ];
    return { characters };
  }

  genId(characters: Character[]): number {
    return characters.length > 0 ? Math.max(...characters.map(character => character.id)) + 1 : 11;
  }

}
