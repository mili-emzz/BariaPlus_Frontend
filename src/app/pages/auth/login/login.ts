import {Component, OnInit} from '@angular/core';
import {Modal} from '../../../shared/modal';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  constructor(private modalService:Modal) {
  }
  ngOnInit() {
    this.modalService.openModal()
  }
}
