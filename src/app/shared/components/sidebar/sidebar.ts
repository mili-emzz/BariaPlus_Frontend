import { Component, EventEmitter, Output } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  constructor(private router: Router) { }

  onLogout(): void {
    this.router.navigate(['/']);
  }
}
