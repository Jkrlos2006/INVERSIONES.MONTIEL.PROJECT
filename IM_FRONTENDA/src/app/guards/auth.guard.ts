import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let esCorrecto: boolean = false;

    let token = sessionStorage.getItem("token");

    if (token) {
      return true;
    }

    /*
      si cumple validación ==> retorna un true
        ==> entonces te da permiso de acceder a la url correspondiente
    */

    /*
    si NOOOOOOOOOOOOOO cumple validación ==> retorna un false
      ==> entonces te deniega el permiso de acceder a la url correspondiente
  */

    //alert("no tienes permitido el acceso");

    return esCorrecto;
  }

}
