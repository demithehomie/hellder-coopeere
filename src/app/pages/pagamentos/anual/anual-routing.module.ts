import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnualPage } from './anual.page';

const routes: Routes = [
  {
    path: '',
    component: AnualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnualPageRoutingModule {}
