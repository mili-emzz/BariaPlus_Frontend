import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  standalone: false,
  templateUrl: './step-indicator.html',
  styleUrl: './step-indicator.css'
})
export class StepIndicator {

  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 4; // puede ser cualquiera

  get steps(): number[] {
    return Array(this.totalSteps).fill(0);
  }
}
