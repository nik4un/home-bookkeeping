import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

// необходимо создать массив роутов, которве будут корневыми для всего приложения
const routes: Routes = [
  { path: '', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // регисрация корневых модулей
  exports: [RouterModule]
})
export class AppRoutingModule {} // этот класс надо зарегистрировать в корневом модуле

// создаем роутинг модуль в auth
