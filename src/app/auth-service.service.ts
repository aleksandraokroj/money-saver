import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  private data: any;

  registerUser(user: {Email: string, Password: string, ConfirmPassword: string}){
    const headers = {"Access-Control-Allow-Origin": "*"};
    return this.http.post<any>('https://localhost:44330/api/account/register', { Email: user.Email,
    Password: user.Password,
    ConfirmPassword: user.ConfirmPassword }, {headers} ).subscribe(data => this.data);
  };

  loginUser(user: {Email: string, Password: string}){
    const headers = {"Access-Control-Allow-Origin": "*"};
    return this.http.post<any>('https://localhost:44330/api/account/login', {Email: user.Email, 
    Password: user.Password},
    {headers});
  }
}
