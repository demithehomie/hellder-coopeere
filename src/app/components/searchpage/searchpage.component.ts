import { Component } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
})
export class SearchpageComponent  {

  results = []

  pages = [
    { title: 'Página 1', link: '/page1' },
    { title: 'Página 2', link: '/page2' },
    { title: 'Página 3', link: '/page3' },
    { title: 'Página 4', link: '/page4' }
  ];
  searchResults: SearchResult[] = [];

  onSearch(query: string) {
    this.searchResults = this.pages.filter(page => page.title.toLowerCase().includes(query.toLowerCase()));
  }
}

interface SearchResult {
  title: string;
  link: string;
}
