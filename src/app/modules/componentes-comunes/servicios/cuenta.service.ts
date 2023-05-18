import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AutenticationInterface } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { BandejaCuentas, CuentaInterface, ParamCrearCuenta, RespuestaCreacion } from '../interfaces/cuenta.interface';

@Injectable({
    providedIn: 'root'
  })
  export class CuentaService {

    authDataString = sessionStorage.getItem('authData');
    authData: AutenticationInterface = JSON.parse(this.authDataString!);
    token = this.authData.token;

    constructor(private http: HttpClient) { }
    iswebserviceactive(): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get(environment.BASE_WS_LOCAL + '/isWebServiceActive', { headers });
    }/* 

    getCuentasPorAprobar(estado: number): Observable<CuentaInterface[]> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<CuentaInterface[]>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/estado/${estado}`, { headers });
    }

    crearCuenta(param: ParamCrearCuenta): Observable<RespuestaCreacion> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.post<RespuestaCreacion>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/crear`,param, { headers });
    } */

    getCuentasPorAprobarCorregirRechazadas(): Observable<any> {
        //obtenemos el token del localStorage
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
        return this.http.get(environment.BASE_WS_LOCAL + '/agricultor/cuenta/estado', { headers });
      }
  
      getCuentasGeneral(): Observable<BandejaCuentas[]> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
        return this.http.get<BandejaCuentas[]>(environment.BASE_WS_LOCAL + '/agricultor/cuenta/general', { headers });
      }

      crearVenta(param: CuentaInterface): Observable<any>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
        return this.http.post(environment.BASE_WS_LOCAL +  `/agricultor/cuenta/crear`, param, { headers });
      }


  }