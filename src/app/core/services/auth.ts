import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CookiesStorage} from './cookies-storage';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../interfaces/api/login-request';
import {Observable, tap} from 'rxjs';
import {LoginResponse} from '../interfaces/api/login-response';
import {environment} from '../../../environments/environment.development';
import {RegisterResponse} from '../interfaces/api/register-response';
import {RegisterRequest} from '../interfaces/api/register-request';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly TOKEN_KEY = 'access_token';
  private readonly DOCTOR_KEY = 'doctor_data';

  constructor(
    private http: HttpClient,
    private cookiesStorage: CookiesStorage
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', request).pipe(
      tap(response => {
        if (response.success && response.token) {
          // Guardar token en cookies (expira en 7 días)
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          
          this.cookiesStorage.setKey(this.TOKEN_KEY, response.token, expirationDate);
          this.cookiesStorage.setKey(this.DOCTOR_KEY, JSON.stringify(response.doctor), expirationDate);
        }
      })
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/auth/register', request).pipe(
      tap(response => {
        console.log('✅ Registro exitoso:', response);
      })
    );
  }

  getToken(): string | null {
    const token = this.cookiesStorage.getValueKey(this.TOKEN_KEY);
    return token || null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.cookiesStorage.deleteKeyValue(this.TOKEN_KEY);
    this.cookiesStorage.deleteKeyValue(this.DOCTOR_KEY);
  }

  getDoctor(): any {
    const doctorData = this.cookiesStorage.getValueKey(this.DOCTOR_KEY);
    return doctorData ? JSON.parse(doctorData) : null;
  }

}
