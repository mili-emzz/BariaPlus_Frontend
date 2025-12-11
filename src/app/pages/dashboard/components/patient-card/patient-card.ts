import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Patient } from '../../../../core/interfaces/patient';
import { PatientService } from '../../../../core/services/patient-service';
import { Router } from '@angular/router';
import { Modal } from '../../../../shared/modal';

@Component({
  selector: 'app-patient-card',
  standalone: false,
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.css'
})
export class PatientCard {

  @Input() patient!: Patient;
  @Output() patientDeleted = new EventEmitter<number>();

  menuOpen = false;
  showConfirmModal = false;
  patientToDeleteName = '';

  constructor(
    private patientService: PatientService, 
    private router: Router,
    private modalService: Modal
  ) { }

  toggleMenu(event: Event) {
    event.stopPropagation(); // Evita que el click se propague
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.menuOpen = false;
  }

  onEdit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Editar');
    this.menuOpen = false;
  }

  onDelete(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.menuOpen = false;

    // ✅ Abre el modal de confirmación
    this.patientToDeleteName = `${this.patient.firstName} ${this.patient.lastName}`;
    this.modalService.openModal();
  }

  onConfirmDelete(): void {
    if (!this.patient.id) {
      return;
    }

    this.patientService.deletePatient(this.patient.id).subscribe({
      next: (response) => {
        
        // Emite el evento al padre
        this.patientDeleted.emit(this.patient.id);
      },
      error: (error) => {
        console.error('Error al eliminar paciente:', error);
        alert('Error al eliminar el paciente. Por favor, intenta de nuevo.');
      }
    });
  }

  onCancelDelete(): void{
  }

  getAvatar(genderId: number): string {
    if (genderId === 1) {
      return 'assets/otros/men-avatar.png';
    } else {
      return 'assets/otros/women-avatar.png';
    }
  }

  viewPatientDetails(): void {
    this.router.navigate(['/patient', this.patient.id]);
  }
}