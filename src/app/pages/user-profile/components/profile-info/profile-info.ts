import { Component, Input } from '@angular/core';
import { InfoItem } from '../../../../core/interfaces/info-item';

@Component({
  selector: 'app-profile-info',
  standalone: false,
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.css'
})
export class ProfileInfo {

  @Input() title: string = '';
  @Input() data: InfoItem[]= [];

}
