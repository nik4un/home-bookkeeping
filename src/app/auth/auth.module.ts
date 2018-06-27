import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule, // несет базовый функционал (ngFor, ngIf, ...)
    AuthRoutingModule,
    SharedModule // именно в этом модуле (auth.module) мы будем использовать функционал работы с формами
  ]
})
export class AuthModule {}
