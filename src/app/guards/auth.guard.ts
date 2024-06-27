import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){
  }
  canActivate(){
    const isValidToken = this.tokenService.isValidRefreshToken();
    if(!isValidToken){
      this.router.navigate(['/login']);
      return false
    } 
     return true;
  }
  
}
