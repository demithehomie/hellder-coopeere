import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailPageRoutingModule } from './email-routing.module';

import { EmailPage } from './email.page';
import { UsuarioService } from 'src/app/services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [EmailPage],
  providers: [UsuarioService],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmailPageModule {}
