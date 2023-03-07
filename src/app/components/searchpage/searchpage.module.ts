import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchpageComponent } from './searchpage.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { SearchresultsComponent } from '../searchresults/searchresults.component';
import { SearchresultsModule } from '../searchresults/searchresults.module';
import { SearchbarModule } from '../searchbar/seacrhbar.module';
// ...

@NgModule({
  imports: [SearchbarModule, SearchresultsModule],
  declarations: [SearchpageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SearchpageComponent]
  // ...
})
export class SearchpageModule { }
