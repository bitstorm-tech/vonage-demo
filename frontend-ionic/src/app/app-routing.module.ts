import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'get-code',
        pathMatch: 'full'
    },
    {
        path: 'check-code',
        loadChildren: () => import('./check-code/check-code.module').then(m => m.CheckCodePageModule)
    },
    {
        path: 'get-code',
        loadChildren: () => import('./get-code/get-code.module').then(m => m.GetCodePageModule)
    },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
