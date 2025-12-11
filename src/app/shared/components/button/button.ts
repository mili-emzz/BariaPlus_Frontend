import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() type: 'submit' | 'reset' | 'button' = 'button';
  @Input() name: string = '';
  @Input() text: string = 'Button';
  @Input() context: 'continue' | 'default' | 'submit' | 'previous' | 'primary longButton' = 'default';
  @Input() disabled: boolean = false;

  @Output() pressed = new EventEmitter<void>();

  onClick() {
    this.pressed.emit();
  }
}
