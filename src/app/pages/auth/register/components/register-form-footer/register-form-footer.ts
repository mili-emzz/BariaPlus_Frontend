import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-register-form-footer',
  standalone: false,
  templateUrl: './register-form-footer.html',
  styleUrl: './register-form-footer.css'
})
export class RegisterFormFooter {
  @Input() step: number = 1;
  @Output() prevStep = new EventEmitter<void>();

  onPreviousStep(){
    this.prevStep.emit()
  }
}
