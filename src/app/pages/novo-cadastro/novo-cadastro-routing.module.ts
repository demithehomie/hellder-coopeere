import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoCadastroPage } from './novo-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: NovoCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoCadastroPageRoutingModule {}
