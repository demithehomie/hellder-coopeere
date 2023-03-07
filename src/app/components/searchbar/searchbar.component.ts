import { Component, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {

 // value: string = '';
  @Output() search = new EventEmitter<string>();
  query: string = '';

  
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search.emit(this.query);
    }
  }
}
