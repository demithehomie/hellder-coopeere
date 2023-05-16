import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemestralPageRoutingModule } from './semestral-routing.module';

import { SemestralPage } from './semestral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemestralPageRoutingModule
  ],
  declarations: [SemestralPage]
})
export class SemestralPageModule {}
