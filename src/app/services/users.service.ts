import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL = environment.API_URL

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getUsers(){
    const token = this.tokenService .getToken();
    return this.http.get<User[]>(`${this.apiURL}/api/v1/users`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }

}
