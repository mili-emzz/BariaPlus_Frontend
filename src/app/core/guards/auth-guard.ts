import {CanActivateFn, Router} from '@angular/router';
import {CookiesStorage} from '../services/cookies-storage';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookiesStorage)
  const router = inject(Router);

  const token = cookies.getValueKey('access_token');

  if(token){
    return true;
  } else {
    return router.navigate(['login']);
  }

  return true;
};
