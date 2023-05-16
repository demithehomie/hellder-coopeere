import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BimestralPageRoutingModule } from './bimestral-routing.module';

import { BimestralPage } from './bimestral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BimestralPageRoutingModule
  ],
  declarations: [BimestralPage]
})
export class BimestralPageModule {}
