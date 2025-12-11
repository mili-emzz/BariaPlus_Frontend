import { Component, OnInit } from '@angular/core';
import { InfoItem } from '../../core/interfaces/info-item';
import { DoctorResponse } from '../../core/interfaces/doctor';
import { Auth } from '../../core/services/auth';
// import { DoctorService } from '../../core/services/doctor-service'; // TODO: Descomentar cuando API tenga endpoint

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {

  doctor: DoctorResponse | null = null;
  personalInfo: InfoItem[] = [];
  profesionalInfo: InfoItem[] = [];
  errorMessage: string = '';

  constructor(
    private authService: Auth
    // private doctorService: DoctorService // comentar cuando API tenga endpoint
  ) { }

  ngOnInit(): void {
    this.loadDoctorInfo();
  }

  loadDoctorInfo(): void {
    // Por ahora: usar solo datos de cookies (del login/registro)
    // TODO: Cuando backend tenga GET /api/doctors/:id, descomentar la llamada a la API
    
    this.doctor = this.authService.getDoctor();

    if (!this.doctor) {
      this.errorMessage = 'No se encontró información del doctor. Por favor inicia sesión nuevamente.';
      console.error('Doctor no encontrado en cookies');
      return;
    }

    console.log('Doctor cargado desde registro o login por ahi:', this.doctor);

    // Mapear datos personales (disponibles del login)
    this.personalInfo = [
      { label: 'Nombre(s)', value: this.doctor.firstName || 'No disponible' },
      { label: 'Apellido(s)', value: this.doctor.lastName || 'No disponible' },
      { label: 'Correo electrónico', value: this.doctor.email || 'No disponible' }
    ];

    // Mapear datos profesionales (disponibles si vienen del registro)
    this.profesionalInfo = [
      { label: 'Institución de proveniencia', value: this.doctor.graduationInstitution || 'Pendiente' },
      { label: 'Fecha de Inicio laboral', value: this.doctor.employmentStart || 'Pendiente' },
      { label: 'Número de cédula profesional', value: this.doctor.professionalLicense || 'Pendiente' },
      { label: 'Lugar actual de trabajo', value: this.doctor.currentWorkplace || 'Pendiente' }
    ];

    /* TODO: Descomentar cuando el backend tenga GET /api/doctors/:id
    if (this.doctor.id) {
      this.doctorService.getDoctorById(this.doctor.id).subscribe({
        next: (response) => {
          if (response.success && response.doctor) {
            this.doctor = response.doctor;
            this.mapDoctorData(); // Actualizar con datos completos de la API
          }
        },
        error: (error) => {
          console.warn('Endpoint GET /api/doctors/:id no disponible:', error);
          // Continuar mostrando datos de cookies
        }
      });
    }
    */
  }
}
