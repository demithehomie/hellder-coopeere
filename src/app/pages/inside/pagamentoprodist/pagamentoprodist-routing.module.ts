import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagamentoprodistPage } from './pagamentoprodist.page';

const routes: Routes = [
  {
    path: '',
    component: PagamentoprodistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagamentoprodistPageRoutingModule {}
