import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, PatientResponse } from '../interfaces/patient';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  // El interceptor agregará automáticamente el token, no lo hagas manualmente
  constructor(private http: HttpClient) {
    if (environment.enableDebugMode) {
      console.log('🔧 PatientService inicializado');
    }
  }

  // /api para que funcione con el proxy
  createPatient(patient: Patient): Observable<PatientResponse> {
    if (environment.enableDebugMode) {
      console.log('Creando paciente con datos:', patient);
    }    return this.http.post<PatientResponse>('/api/patient', patient);
  }

  getPatients(): Observable<PatientResponse> {
    if (environment.enableDebugMode) {
      console.log('Obteniendo lista de pacientes');
    }
    return this.http.get<PatientResponse>('/api/patient');
  }

  getPatientById(id: number): Observable<PatientResponse> {
    if (environment.enableDebugMode) {
      console.log('Obteniendo paciente con ID:', id);
    }
    return this.http.get<PatientResponse>(`/api/patient/${id}`);
  }

  deletePatient(id: number): Observable<any> {
    if (environment.enableDebugMode) {
      console.log('Eliminando paciente con ID:', id);
    }
    return this.http.patch(`/api/patient/${id}/status`, { statusId: 2 });
  }

}

