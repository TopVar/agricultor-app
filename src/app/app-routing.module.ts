import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/componentes-comunes/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AgregarVehiculoComponent } from './modules/agregar-vehiculo/agregar-vehiculo.component';
import { AgregarTransportistaComponent } from './modules/agregar-transportista/agregar-transportista.component';
import { AgregarCuentaComponent } from './modules/agregar-cuenta/agregar-cuenta.component';
import { GestionParcialidadesComponent } from './modules/gestion-parcialidades/gestion-parcialidades.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent,
    pathMatch: 'full'
  },
  { 
    path: 'agricultor', 
    component: DashboardComponent,
    pathMatch: 'prefix',
    children: [
      /* {
        path: 'profile',
        component: ProfileComponent
      }, */
      {
        path: 'vehiculos',
        component: AgregarVehiculoComponent
      },
      {
        path: 'transportistas',
        component: AgregarTransportistaComponent
      },
      {
        path: 'ventas',
        component: AgregarCuentaComponent
      },
      {
        path: 'cuentas',
        component: GestionParcialidadesComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
