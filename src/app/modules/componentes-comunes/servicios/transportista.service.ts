import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map} from 'rxjs';
import { TransportistaDto, TransportistaInterface } from '../interfaces/transportista.interface';
import { AutenticationInterface } from '../interfaces/usuario.interface';
import { RespuestaInterface } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {    

  authDataString = sessionStorage.getItem('authData');
  authData: AutenticationInterface = JSON.parse(this.authDataString!);
  token = this.authData.token;

  constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
            //obtenemos el token del localStorage
        //const token = sessionStorage.getItem('authData.token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

        return this.http.get(environment.BASE_WS_LOCAL + '/agricultor/transportistas/all', { headers });
    }

    registrar(param: TransportistaDto): Observable<RespuestaInterface> {
          //obtenemos el token del localStorage
      //const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<RespuestaInterface>(environment.BASE_WS_LOCAL + '/agricultor/transportistas/registrar', param,{ headers});
    }

    editar(param: TransportistaInterface): Observable<RespuestaInterface> {
          //obtenemos el token del localStorage
      //const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.put<RespuestaInterface>(environment.BASE_WS_LOCAL + '/agricultor/transportistas/editar',param, { headers});
    }

    transportistaAutorizadoBeneficio(): Observable<any> {      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.get(environment.BASE_WS_LOCAL + '/cafetito/transportistas/autorizados',{ headers});
    }

    transportistaDisponibleAutorizados(idCuenta: number): Observable<TransportistaInterface[]> {      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.get<TransportistaInterface[]>(environment.BASE_WS_LOCAL + `/agricultor/transportistas/disponible/${idCuenta}`,{ headers});
    }

    autorizarTransportista(licencia: string): Observable<RespuestaInterface> {      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.post<RespuestaInterface>(environment.BASE_WS_LOCAL + `/cafetito/transportistas/autorizar/${licencia}`,null, { headers});
    }

    rechazarTransportista(licencia: string): Observable<RespuestaInterface> {      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.post<RespuestaInterface>(environment.BASE_WS_LOCAL + `/cafetito/transportistas/rechazar/${licencia}`, null, { headers});
    }

    transportistasCreados(): Observable<TransportistaInterface[]> {      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.get<TransportistaInterface[]>(environment.BASE_WS_LOCAL + `/cafetito/transportistas/creados`,{ headers});
    }


}