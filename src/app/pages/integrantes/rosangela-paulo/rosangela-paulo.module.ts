import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RosangelaPauloPageRoutingModule } from './rosangela-paulo-routing.module';

import { RosangelaPauloPage } from './rosangela-paulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RosangelaPauloPageRoutingModule
  ],
  declarations: [RosangelaPauloPage]
})
export class RosangelaPauloPageModule {}
