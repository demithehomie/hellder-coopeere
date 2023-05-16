import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagamentosPageRoutingModule } from './pagamentos-routing.module';

import { PagamentosPage } from './pagamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagamentosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PagamentosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagamentosPageModule {}
