import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }
  
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

  public loginUser(): void{
  this.authService.loginUser(this.user).subscribe(response => console.log(response.text()));
  }
  
  private getSelectors(): any{
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sing-up-button");
    const container= document.querySelector(".container");
    return [signInBtn, signUpBtn, container]
  }

}
