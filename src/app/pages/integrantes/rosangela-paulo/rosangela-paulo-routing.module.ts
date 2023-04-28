import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RosangelaPauloPage } from './rosangela-paulo.page';

const routes: Routes = [
  {
    path: '',
    component: RosangelaPauloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RosangelaPauloPageRoutingModule {}
