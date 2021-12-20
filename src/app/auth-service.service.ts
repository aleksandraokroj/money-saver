import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  private data: any;

  registerUser(user: {Email: string, Password: string, ConfirmPassword: string}){
    const headers = {"Access-Control-Allow-Origin": "*"};
    return this.http.post<any>('https://localhost:44330/api/account/register', { Email: user.Email,
    Password: user.Password,
    ConfirmPassword: user.ConfirmPassword }, {headers} ).subscribe(data => this.data);
  };

  loginUser(user: {Email: string, Password: string}){
    const headers = {"Access-Control-Allow-Origin": "*",
    responseType: 'text',
    contentType: 'text'};
    return this.http.post('https://localhost:44330/api/account/login', {Email: user.Email, 
    Password: user.Password},
    {headers}).subscribe(data => {
      this.data;
      this.router.navigate(['/expenses']);
    });
  };


}
