import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormItem } from '../../../core/interfaces/form-item';

@Component({
  selector: 'app-reusable-form',
  standalone: false,
  templateUrl: './reusable-form.html',
  styleUrls: ['./reusable-form.css']
})
export class ReusableForm {

  @Input() formGroup!: FormGroup;
  @Input() title: string = '';
  @Input() formItems: FormItem[] = [];
  @Input() classHelper: string = '';

  formData: { [key: string]: any } = {};

  constructor() {
    this.formItems.forEach(item => {
      this.formData[item.name] = null;
    });
  }

  //helper para control de lista

  getControl(name: string) {
    return this.formGroup.get(name) || null;
  }

  trackByName(_: number, item: FormItem) {
    return item.name;
  }

  onInputChange(name: string, value: any) {
    this.formData[name] = value;
    console.log('Form data', this.formData)
  }

  protected readonly event = event;
}
