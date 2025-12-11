import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {CookiesStorage} from '../services/cookies-storage';
import {tap} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {isLoginResponse} from '../guards/is-login-response';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookiesStorage);

  return next(req).pipe(
    tap(event => {
      if (!req.url.includes(environment.AUTH_API_URL + '/login')){
        return
      }

      if (event instanceof HttpResponse && event.status === 200) {
        const body = event.body as any;

        if(isLoginResponse(body)){
          const expirationMS = 3_600_000 * 24;
          const expirationDate = new Date(Date.now() + expirationMS);
          cookieService.setKey('access_token', body.token, expirationDate)
        }
      }
    })
  )
};
