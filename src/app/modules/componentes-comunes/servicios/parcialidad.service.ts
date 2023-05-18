import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map} from 'rxjs';
import { AutenticationInterface } from '../interfaces/usuario.interface';
import { EnvioParcialidadInterface, ParcialidadInterface } from '../interfaces/parcialidad.interface';
import { MensajeInterface, RespuestaInterface } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ParcialidadService {   
  
  authDataString = sessionStorage.getItem('authData');
  authData: AutenticationInterface = JSON.parse(this.authDataString!);
  token = this.authData.token;

  constructor(private http: HttpClient) { }

    iswebserviceactive(): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

        return this.http.get(environment.BASE_WS_LOCAL + '/isWebServiceActive', { headers });
    }

    
    getParcialidadesCuenta(idCuenta: number): Observable<ParcialidadInterface[]> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<ParcialidadInterface[]>(environment.BASE_WS_LOCAL +  `/agricultor/parcialidades/${idCuenta}`, { headers });
    }

    envioParcialidad(param: EnvioParcialidadInterface): Observable<EnvioParcialidadInterface>{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<EnvioParcialidadInterface>(environment.BASE_WS_LOCAL +  `/agricultor/parcialidades/enviar/parcialidad`, param, { headers });
    }

}