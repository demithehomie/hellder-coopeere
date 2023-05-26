import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {  CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginPageRoutingModule } from './admin-login-routing.module';

import { AdminLoginPage } from './admin-login.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdminLoginPageRoutingModule
  ],
  declarations: [AdminLoginPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthenticationService, Storage, AppStorageService, UsuarioService]
})
export class AdminLoginPageModule {}
