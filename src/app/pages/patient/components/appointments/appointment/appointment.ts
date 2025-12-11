import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment {
  @Input() appointment: string = '';
}
