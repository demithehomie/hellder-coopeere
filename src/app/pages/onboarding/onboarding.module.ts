import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { ResultadosPageModule } from '../resultados/resultados.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    ReactiveFormsModule,
    //ResultadosPageModule
  ],
  declarations: [OnboardingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingPageModule {}
