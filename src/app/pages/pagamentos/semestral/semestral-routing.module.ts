import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemestralPage } from './semestral.page';

const routes: Routes = [
  {
    path: '',
    component: SemestralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemestralPageRoutingModule {}
