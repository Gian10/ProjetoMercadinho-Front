import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // buscando item token
    const token = window.localStorage.getItem("token")
    if(token){
      return true
    }else{
      // se não tiver token ele da um redirection pra tela de login
      this.router.navigate(["login"])
      return false
    }
  }
  
}
