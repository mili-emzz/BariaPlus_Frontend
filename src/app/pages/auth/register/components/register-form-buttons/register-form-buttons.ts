import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form-buttons',
  standalone: false,
  templateUrl: './register-form-buttons.html',
  styleUrl: './register-form-buttons.css'
})
export class RegisterFormButtons {
  @Input() step: number = 1;
  @Output() nextStep = new EventEmitter<void>();
  @Output() register = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();


  constructor(private router: Router) { }

  onContinue(){
    this.nextStep.emit()
  }

  onCancel(){
    this.router.navigate(['']);
  }

  onRegister(){
    this.register.emit()
    console.log('BOTONES onRegister ejecutado');
  }
}
