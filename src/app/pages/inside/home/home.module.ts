import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdistService} from "../../../services/prodist.service"
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { LoginPage } from '../../login/login.page';
import { LoginPageModule } from '../../login/login.module';
import { SignupPageModule } from '../../signup/signup.module';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppStorageService } from 'src/app/services/app-storage.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    SignupPageModule
  ],
  declarations: [HomePage ],
  providers: [
    ProdistService, ClienteService, UsuarioService, AuthenticationService, AppStorageService, LoginPage // add the service here
  ]
})
export class HomePageModule {}
