import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchresultsComponent } from './searchresults.component';
// ...

@NgModule({
  declarations: [SearchresultsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SearchresultsComponent]
  // ...
})
export class SearchresultsModule { }
////////////////////////