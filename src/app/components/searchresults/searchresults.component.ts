import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss'],
})
export class SearchresultsComponent {
  @Input() results: SearchResult[] = []

}


interface SearchResult {
  title: string;
  link: string;
}