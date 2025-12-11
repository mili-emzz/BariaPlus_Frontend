import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesStorage {
  constructor(private _cookieService: CookieService) {}

  setKey(key:string, value:string, expires:number | Date) {
    this._cookieService.set(key, value, expires);
  }

  getValueKey(key:string){
    return this._cookieService.get(key);
  }

  exists(key:string){
    return this._cookieService.check(key);
  }

  isCookieValid(key:string):boolean {
    return this._cookieService.get(key) !== '';
  }

  deleteKeyValue(key:string):void {
    this._cookieService.delete(key);
  }
}
