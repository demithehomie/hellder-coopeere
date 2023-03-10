import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { LoginPage } from '../../login/login.page';
import { LoginPageModule } from '../../login/login.module';
import { SignupPageModule } from '../../signup/signup.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SignupPageModule
  ],
  declarations: [HomePage, ]
})
export class HomePageModule {}
