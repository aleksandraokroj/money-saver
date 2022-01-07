import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from  '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authService: AuthServiceService,
    private http: HttpClient) { }
  
  public newUser= {
    Email: '',
    Password: '',
    ConfirmPassword: ''
  };
  public user= {
    Email: '',
    Password: ''
  }
  public data: any;
  private configUrl = "https://localhost:44330/api/account/login";

  ngOnInit(): void {
  }

  public animateSignIn(): void {
    const selectors = this.getSelectors();
    selectors[2].classList.remove("sign-up-mode");
  }
  
  public animateSignUp(): void{
    const selectors = this.getSelectors();
    selectors[2].classList.add("sign-up-mode");
  }

  public registerUser(): void{
    this.authService.registerUser(this.newUser);
  }

  public loginUser(): any{
    return this.authService.loginUser(this.user);
  }
  
  private getSelectors(): any{
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sing-up-button");
    const container= document.querySelector(".container");
    return [signInBtn, signUpBtn, container]
  }

}
