import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {

   menuOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation(); // Evita que el click se propague
    this.menuOpen = !this.menuOpen;
  }

  // Cierra el menú cuando haces click fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.menuOpen = false;
  }
}
