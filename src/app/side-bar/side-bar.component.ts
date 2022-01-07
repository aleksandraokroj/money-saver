import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  public userName: any = '';

  ngOnInit(): void {
    this.userName = this.authService.getCookie('userName');
    if(!!this.userName) this.userName = "Użytkowniku"
  }

  public logOut(): void {
    this.deleteAllCookies();
    this.router.navigate(['/auth']);
  }

  public deleteAllCookies() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
}
