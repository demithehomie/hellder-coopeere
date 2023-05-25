import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './login.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthenticationService, Storage, AppStorageService, UsuarioService]
})
export class LoginPageModule {}
