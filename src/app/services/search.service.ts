import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
   searchTerm: string = '';

  get _searchTerm(): string {
    return this.searchTerm;
  }

  set _searchTerm(term: string) {
    this.searchTerm = term;
  }
}
