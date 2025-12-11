import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PatientResponse } from '../../../../../../core/interfaces/patient';

@Component({
  selector: 'app-bottom-info',
  standalone: false,
  templateUrl: './bottom-info.html',
  styleUrl: './bottom-info.css'
})
export class BottomInfo implements OnChanges {
  @Input() patient!: PatientResponse;
  
  dateOfBirth: string = '';
  entryDate: string = '';
  emergencyNumber: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient?.patient) {
      this.dateOfBirth = this.formatDate(this.patient.patient.dateOfBirth);
      this.entryDate = this.formatDate(this.patient.patient.entryDate);
      this.emergencyNumber = this.patient.patient.emergencyNumber || 'No disponible';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-MX', options);
  }
}
