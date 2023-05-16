import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrimestralPageRoutingModule } from './trimestral-routing.module';

import { TrimestralPage } from './trimestral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrimestralPageRoutingModule
  ],
  declarations: [TrimestralPage]
})
export class TrimestralPageModule {}
