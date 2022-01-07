import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: {
    Email: string;
    FirstName: string;
    Password: string;
    ConfirmPassword: string;
  }) {
    const headers = { 'Access-Control-Allow-Origin': '*' };
    return this.http
      .post<any>(
        'https://localhost:44330/api/account/register',
        {
          Email: user.Email,
          FirstName: user.FirstName,
          Password: user.Password,
          ConfirmPassword: user.ConfirmPassword,
        },
        { headers }
      )
      .subscribe((data) => {
        window.alert('Rejestracja przebiegła pomyślnie.');
      });
  }

  loginUser(user: { Email: string; Password: string }) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      responseType: 'text',
      contentType: 'text',
    };
    return this.http
      .post(
        'https://localhost:44330/api/account/login',
        { Email: user.Email, Password: user.Password },
        { headers }
      )
      .subscribe((data: any) => {
        this.setCookie('userId', data.id, 30);
        this.setCookie('userName', data.firstName, 30);
        this.router.navigate(['/expenses']);
      });
  }

  public setCookie(cName: string, cValue: any, expDays: any): void {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = cName + '=' + cValue + '; ' + expires + '; Secure';
  }

  public getCookie(cName: string): any {
    const name = cName + '=';
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    if (res && cName==="userId") {
      const resHelper: number = +res;
      return resHelper;
    }
    return res
  }
}
