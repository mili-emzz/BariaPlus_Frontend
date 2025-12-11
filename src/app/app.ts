import {Component, OnInit, signal} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CookiesStorage} from './core/services/cookies-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lp-baria-plus');

  //constructor(private _loginService: LoginService,
   //           private _cookieService: CookiesStorage) {}

  //ngOnInit() {
  //  if(!this._cookieService.exists('acces"token') || this._cookieService.isCookieValid('access_token')) {
  //    this._loginService.getAccessToken().subscribe();
  //  }
  //}
}
