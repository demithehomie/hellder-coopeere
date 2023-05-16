import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensalPageRoutingModule } from './mensal-routing.module';

import { MensalPage } from './mensal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MensalPage]
})
export class MensalPageModule {}
