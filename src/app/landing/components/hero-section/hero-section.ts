import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: false,
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {

  constructor(private router: Router){}

  navigateToRegister() {
    this.router.navigate(['/user-register']);
    console.log('Navegando a user-register');
  }
}
