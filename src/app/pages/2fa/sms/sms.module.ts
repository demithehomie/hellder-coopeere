import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsPageRoutingModule } from './sms-routing.module';

import { SmsPage } from './sms.page';
import { UsuarioService } from 'src/app/services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SmsPage],
  providers: [UsuarioService]
})
export class SmsPageModule {}
