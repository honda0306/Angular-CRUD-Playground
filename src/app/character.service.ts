import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Character } from './character';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private charactersUrl = 'api/characters';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  private log(message: string) {
    this.messageService.add(`CharacterService: ${message}`);
  }

  private handleError<T> (operation = 'operation ', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.charactersUrl)
      .pipe(
        tap(_ => this.log('fetched characters')),
        catchError(this.handleError<Character[]>('getCharacters', []))
      );
  } 

  getCharacter(id: number): Observable<Character> {
    const url = `${this.charactersUrl}/${id}`;
    return this.http.get<Character>(url).pipe(
      tap(_ => this.log(`fetched character id=${id}`)),
      catchError(this.handleError<Character>(`getCharacter id=${id}`))
    );
  }

  addCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(this.charactersUrl, character, this.httpOptions).pipe(
      tap((newCharacter: Character) => this.log(`added character with id=${newCharacter.id}`)),
      catchError(this.handleError<Character>('addCharacter'))
    );
  }

  updateCharacter(character: Character): Observable<any> {
    return this.http.put(this.charactersUrl, character, this.httpOptions).pipe(
      tap(_ => this.log(`updated character id id=${character.id}`)),
      catchError(this.handleError<any>('updateCharacter'))
    );
  }

  deleteCharacter(character: Character | number): Observable<Character> {
    const id = typeof character === 'number' ? character: character.id;
    const url = `${this.charactersUrl}/${id}`;

    return this.http.delete<Character>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted character id=${id}`)),
      catchError(this.handleError<Character>('deleteCharacter'))
    );
  }

}
