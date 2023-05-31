import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoCadastroPageRoutingModule } from './novo-cadastro-routing.module';

import { NovoCadastroPage } from './novo-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoCadastroPageRoutingModule
  ],
  declarations: [NovoCadastroPage]
})
export class NovoCadastroPageModule {}
