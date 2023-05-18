import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map} from 'rxjs';
import { VehiculoDto, VehiculoInterface } from '../interfaces/vehiculo.interface';
import { AutenticationInterface } from '../interfaces/usuario.interface';
import { RespuestaInterface } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {    

  authDataString = sessionStorage.getItem('authData');
  authData: AutenticationInterface = JSON.parse(this.authDataString!);
  token = this.authData.token;

  constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
            //obtenemos el token del localStorage
        //const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

        return this.http.get(environment.BASE_WS_LOCAL + '/agricultor/vehiculos/all', { headers });
    }

    registrar(param: VehiculoDto): Observable<any> {
      //obtenemos el token del localStorage
      //const token = localStorage.getItem('token');
      console.log("TOKEN PARA EL SERVICIO ", this.token );
      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post(environment.BASE_WS_LOCAL + '/agricultor/vehiculos/registrar', param, { headers});
    }

    editar(param: VehiculoInterface): Observable<any> {
          //obtenemos el token del localStorage
      //const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post(environment.BASE_WS_LOCAL + '/agricultor/vehiculos/editar', param, { headers});
    }

    vehculosAutorizadosBeneficio(): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get(environment.BASE_WS_LOCAL + '/cafetito/vehiculos/autorizados', { headers});
    }

    vehculosDisponiblesAutorizados(idCuenta: number): Observable<VehiculoInterface[]> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<VehiculoInterface[]>(environment.BASE_WS_LOCAL + `/agricultor/vehiculos/disponible/${idCuenta}`, { headers});
    }

    findvehculoByPlaca(placa: string): Observable<VehiculoInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<VehiculoInterface>(environment.BASE_WS_LOCAL + `/cafetito/vehiculos/${placa}`, { headers});
    }

    autorizarVehiculo(placa: string): Observable<RespuestaInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<RespuestaInterface>(environment.BASE_WS_LOCAL + `/cafetito/vehiculos/autorizar/${placa}`, null,{ headers});
    }

    rechazarVehiculo(placa: string): Observable<RespuestaInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<RespuestaInterface>(environment.BASE_WS_LOCAL + `/cafetito/vehiculos/rechazar/${placa}`,null, { headers});
    }

    vehculosCreados(): Observable<VehiculoInterface[]> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<VehiculoInterface[]>(environment.BASE_WS_LOCAL + `/cafetito/vehiculos/creados`, { headers});
    }
}