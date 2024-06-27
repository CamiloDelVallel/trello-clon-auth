import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ){
  }
  canActivate(){
    const isValidToken = this.tokenService.isValidToken();
    if(isValidToken){
      this.router.navigate(['/app']);
    } 
     return true;
  }
  
}

