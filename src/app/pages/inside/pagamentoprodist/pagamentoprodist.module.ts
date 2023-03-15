import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagamentoprodistPageRoutingModule } from './pagamentoprodist-routing.module';

import { PagamentoprodistPage } from './pagamentoprodist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagamentoprodistPageRoutingModule
  ],
  declarations: [PagamentoprodistPage]
})
export class PagamentoprodistPageModule {}
