import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensalPage } from './mensal.page';

const routes: Routes = [
  {
    path: '',
    component: MensalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensalPageRoutingModule {}
