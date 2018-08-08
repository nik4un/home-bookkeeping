import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

// необходимо создать массив роутов, которве будут корневыми для всего приложения
const routes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'system', loadChildren: './system/system.module#SystemModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*регисрация корневых модулей*/, {
    preloadingStrategy: PreloadAllModules/*предзагрузка всех модулей*/
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {} // этот класс надо зарегистрировать в корневом модуле

