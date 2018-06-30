import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      // при заходе на гланую страницу, будет происходить редирект на login
      { path: '', redirectTo: '/login', pathMatch: 'full'/*указыввает, что путь абсолютный*/  },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
      // { path: '**', redirectTo: '/login'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // регистрация дочерних модулей
  exports: [RouterModule]
})
export class AuthRoutingModule {} // этот класс надо зарегистрировать в auth модуле
