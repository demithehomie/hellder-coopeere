import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrimestralPage } from './trimestral.page';

const routes: Routes = [
  {
    path: '',
    component: TrimestralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrimestralPageRoutingModule {}
