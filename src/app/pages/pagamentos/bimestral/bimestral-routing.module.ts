import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BimestralPage } from './bimestral.page';

const routes: Routes = [
  {
    path: '',
    component: BimestralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BimestralPageRoutingModule {}
