import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {

  constructor(private router: Router){
  }

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!sessionStorage.getItem("authData")){
        this.router.navigate(['/login']);
        return false;
      }

      const usuario = JSON.parse(sessionStorage.getItem("authData")!)
      const roles = usuario.roles.split(",")      
      const agricultorRol = ['AGRICULTOR_VENTAS', 'AGRICULTOR_ENVIOS','AGRICULTOR_ADMIN']

      if(route.url[0].path.match('agricultor') && roles.some((role: string) => agricultorRol.includes(role))){
        
        return true;
      }
      

      this.router.navigate(['/login']);
       return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
   }
  
}
