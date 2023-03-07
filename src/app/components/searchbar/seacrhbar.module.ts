import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchbarComponent } from './searchbar.component';
// ...

@NgModule({
  declarations: [SearchbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SearchbarComponent]
  // ...
})
export class SearchbarModule { }
