import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorResponse } from '../interfaces/doctor';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

apiUrl = environment.AUTH_API_URL + '/doctor';

  constructor(private http: HttpClient) { }
  getDoctorById(id: number): Observable<{ success: boolean; doctor: DoctorResponse }> {
    return this.http.get<{ success: boolean; doctor: DoctorResponse }>(`${this.apiUrl}/${id}`);
  }

  //avisarle a toño de q no tiene get doctor XDDD
}
