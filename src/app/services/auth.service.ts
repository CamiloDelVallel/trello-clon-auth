import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { AuthModule } from '@auth/auth.module';
import { ResponseLogin } from '@models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.API_URL

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    
  ) { 
    
  }

  login(email: string, password: string){
    return this.http.post<ResponseLogin>(`${this.apiURL}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token)
      })
    )
  }

  register(name: string, email: string, password: string){
    return this.http.post(`${this.apiURL}/api/v1/auth/register`, {
      password,
      name,
      email,
    })
  }

  registerAndLogin(name: string, email: string, password: string){
    return this.register(name, email, password)
    .pipe(
      switchMap(() => this.login(email, password))
    )
  }

  isAvailable(email: string){
    return this.http.post<{isAvailable: boolean}>(`${this.apiURL}/api/v1/auth/is-available`, {
      email,
    })
  }

  recovery(email: string){
    return this.http.post(`${this.apiURL}/api/v1/auth/recovery`, {
      email,
    })
  }

  changePassword(newPassword: string, token: string){
    return this.http.post(`${this.apiURL}/api/v1/auth/change-password`, {
      token, newPassword
    })
  }

  logout(){
    this.tokenService.removeToken();
  }
}
