import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './modules/componentes-comunes/util/error.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AgregarCuentaComponent } from './modules/agregar-cuenta/agregar-cuenta.component';
import { AgregarTransportistaComponent } from './modules/agregar-transportista/agregar-transportista.component';
import { AgregarVehiculoComponent } from './modules/agregar-vehiculo/agregar-vehiculo.component';
import { GestionParcialidadesComponent } from './modules/gestion-parcialidades/gestion-parcialidades.component';
import { HomeComponent } from './modules/componentes-comunes/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { NavbarComponent } from './modules/navbar/navbar.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AgregarCuentaComponent,
    AgregarTransportistaComponent,
    AgregarVehiculoComponent,
    GestionParcialidadesComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
   FormsModule,
   MatSelectModule,
   MatOptionModule,
   MatRadioModule,
   NgxSpinnerModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide:LocationStrategy, 
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
