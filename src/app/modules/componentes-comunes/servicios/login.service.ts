import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map} from 'rxjs';
import { AutenticationInterface, LoginParams, UsuarioInterface } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token!: string;

  constructor(private http: HttpClient) { }

  /* public tokenExist(){
    const authDataString = sessionStorage.getItem('authData');
    const authData: AutenticationInterface = JSON.parse(authDataString!);
    this.token = authData.token;
    return authData;
  } */

  login(username: string, password: string): Observable<AutenticationInterface> {
    const encodedCredentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`
    });
    return this.http.get(environment.BASE_WS_LOCAL + '/login', { headers}).pipe(
      map((response: any) => {
        // guarda el token en localStorage
        //localStorage.setItem('token', response);
        return response;
      })
    );
  }

  iswebserviceactive(): Observable<any> {
                  //obtenemos el token del localStorage
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(environment.BASE_WS_LOCAL + '/isWebServiceActive', { headers });
  }

  /* public registrarBc(user: UsuarioInterface):Observable<Boolean>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(environment.BASE_WS_LOCAL + `/cafetito/usuarios/crearUsuario`, user, {headers});
  } */


  public getRolesBc(param: LoginParams): Observable<any>{
    const token = param.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const user = param.username;

    return this.http.get(environment.BASE_WS_LOCAL + `/cafetito/usuarios/rol/${user}`, { headers, responseType: 'text' });
  }

  public postPrueba(user: any){
    return this.http.post(`${environment.BASE_WS_LOCAL}/prueba`, user);
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }
}