import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PatientService } from '../../../../../../core/services/patient-service';
import { PatientResponse } from '../../../../../../core/interfaces/patient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-info',
  standalone: false,
  templateUrl: './top-info.html',
  styleUrl: './top-info.css'
})
export class TopInfo implements OnChanges {
  patientName: string = '';
  patientLastName: string = '';
  avatarUrl: string = ''; // Default

  @Input() patient!: PatientResponse;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient?.patient) {
      this.patientName = this.patient.patient.firstName || 'Sin nombre';
      this.patientLastName = this.patient.patient.lastName || 'Sin apellido';

      this.avatarUrl = this.getAvatarUrl(this.patient.patient.genderId);

      console.log('👤 Datos recibidos en TopInfo:', this.patientName, this.patientLastName, 'Género:', this.patient.patient.genderId);
    }
  }

  getAvatarUrl(genderId: number): string {
    if (genderId === 1) {
      return 'assets/otros/men-avatar.png';
    } else {
      return'assets/otros/women-avatar.png';
    }
  }
}
