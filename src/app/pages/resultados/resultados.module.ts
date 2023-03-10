import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadosPageRoutingModule } from './resultados-routing.module';

import { ResultadosPage } from './resultados.page';
import { FilterPipe } from 'src/app/pipes/filter.pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadosPageRoutingModule,
   
  ],
  declarations: [ResultadosPage,  FilterPipe]
})
export class ResultadosPageModule {}
