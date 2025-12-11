import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PatientResponse } from '../../../../../core/interfaces/patient';

@Component({
  selector: 'app-side-info',
  standalone: false,
  templateUrl: './side-info.html',
  styleUrl: './side-info.css'
})
export class SideInfo implements OnChanges {
  @Input() patient!: PatientResponse;
  
  medicalHistoriesText: string = 'Ninguno';
  allergiesText: string = 'Ninguna';
  diseasesText: string = 'Ninguna';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient?.patient) {
      // ✅ Extraer nombres de los arrays
      const medHis = this.patient.patient.medicalHistories || [];
      const allergies = this.patient.patient.allergies || [];
      const diseases = this.patient.patient.diseases || [];

      this.medicalHistoriesText = medHis.length > 0 
        ? medHis.map(m => m.name).join(', ') 
        : 'Ninguno';

      this.allergiesText = allergies.length > 0 
        ? allergies.map(a => a.name).join(', ') 
        : 'Ninguna';

      this.diseasesText = diseases.length > 0 
        ? diseases.map(d => d.name).join(', ') 
        : 'Ninguna';

      console.log('📋 Side-Info cargado:', {
        antecedentes: this.medicalHistoriesText,
        alergias: this.allergiesText,
        enfermedades: this.diseasesText
      });
    }
  }
}
