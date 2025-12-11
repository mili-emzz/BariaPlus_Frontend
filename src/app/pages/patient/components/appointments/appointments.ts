import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class Appointments {
 appointments: {id:string, date:string}[] = [];
}
