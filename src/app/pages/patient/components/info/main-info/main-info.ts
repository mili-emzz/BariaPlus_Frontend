import { Component, Input } from '@angular/core';
import { PatientResponse } from '../../../../../core/interfaces/patient';

@Component({
  selector: 'app-main-info',
  standalone: false,
  templateUrl: './main-info.html',
  styleUrl: './main-info.css'
})
export class MainInfo {
  @Input() patient!: PatientResponse;
}
