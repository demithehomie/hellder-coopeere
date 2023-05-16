import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnualPageRoutingModule } from './anual-routing.module';

import { AnualPage } from './anual.page';
import { AppStorageService } from 'src/app/services/app-storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnualPageRoutingModule
  ],
  declarations: [AnualPage],
  providers: [AppStorageService]
})
export class AnualPageModule {}
