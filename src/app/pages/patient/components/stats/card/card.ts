import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() config!: StatCardConfig;

  get cardInfo():CardInfo {
    const configs = {
      'bmi':{
        iconPath: 'assets/iconos/bmi.png',
        title: 'IMC'
      },
      'body-mass':{
        iconPath: 'assets/iconos/bodymass.png',
        title: 'Masa muscular'
      },
      'fat':{
        iconPath: 'assets/iconos/fat.png',
        title: 'Grasa'
      },
      'visceral-fat':{
        iconPath: 'assets/iconos/viscfat.png',
        title: 'Grasa visceral'
      },
      'chf':{
        iconPath: 'assets/iconos/chf.png',
        title: 'ICC'
      }
    }
    return configs[this.config.type];
  }
}


export interface StatCardConfig {
  type: 'bmi' | 'body-mass' | 'fat' | 'visceral-fat' | 'chf';
  value?: number;
  chartData?: number[];
}

interface CardInfo {
  iconPath: string;
  title: string;
}
