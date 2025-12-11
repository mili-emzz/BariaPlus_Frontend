import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {CookiesStorage} from '../services/cookies-storage';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookiesStorage)
  const token = cookieService.getValueKey('access_token');

  if (!token){
    return next(req)
  }

  if(req.url.includes('/login')){
    return next(req)
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(authReq);
};
