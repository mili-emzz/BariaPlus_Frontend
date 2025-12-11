import { Component, OnInit } from '@angular/core';
import { Patient } from '../../core/interfaces/patient';
import { PatientService } from '../../core/services/patient-service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.patientService.getPatients().subscribe({
      next: (response) => {
        if (response.success) {
          // Ajusta según respuesta de API - puede ser response.patients o response.data
          this.patients = response.patients || []; 
          this.filteredPatients = [...this.patients];
          console.log('Pacientes cargados:', this.patients);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
        this.errorMessage = 'No se pudieron cargar los pacientes. Intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase();

    if(!this.searchTerm){
      this.filteredPatients = [...this.patients];
      return;
    }

    this.filteredPatients = this.patients.filter(patient =>
      patient.firstName.toLowerCase().includes(this.searchTerm) ||
      patient.lastName.toLowerCase().includes(this.searchTerm)
    );
  }

  onFilter(filterCriteria: any): void {
    console.log('Filtrar con:', filterCriteria);
    
  }

  onPatientDeleted(patientId: number): void {
    this.patients = this.patients.filter(p => p.id !== patientId);
    this.filteredPatients = this.filteredPatients.filter(p => p.id !== patientId);
  }

  //cachar solo el id del paciente y no meterme en más pedo con eliminar XD
  trackByPatientId(index: number, patient: Patient): number {
    return patient.id || index;
  }

  refreshPatients(): void {
    this.loadPatients();
  }
}
