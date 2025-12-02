import { Component, OnInit } from '@angular/core';
import {
  ConsultationDetailResponse,
  IndicatorDisplay,
  MetricDisplay,
  OriginalNote,
} from '../../core/interfaces/api/consultation-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../core/services/consultation-service';

@Component({
  selector: 'app-analysis',
  standalone: false,
  templateUrl: './analysis.html',
  styleUrl: './analysis.css',
})
export class Analysis implements OnInit {
  // datos base de la consulta
  consultationId!: number;
  date = '';
  reason = '';
  selectedIndicator?: IndicatorDisplay;
  genderId?: number;
  firstName?: string;
  lastName?: string;
  fromAppointments: boolean = false;

  // indicadores y métricas ya mapeados para la vista
  indicators: IndicatorDisplay[] = [];
  basicMetrics: MetricDisplay[] = [];
  circumferenceMetrics: MetricDisplay[] = [];
  foldsMetrics: MetricDisplay[] = [];
  bioimpedanceMetrics: MetricDisplay[] = [];

  // notas
  notes: OriginalNote[] = [];

  // gasto energético + slider
  baseEnergy = 0;
  energyDelta = 0;

  get adjustedEnergy(): number {
    return this.baseEnergy * (1 + this.energyDelta / 100);
  }

  constructor(
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1) si vienes desde la lista/detalle: /analysis/:id
    this.consultationId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParamMap.subscribe((queryparams) => {
      
      this.fromAppointments = queryparams.get('fromAppointments') === 'true';
      console.log('Viene de citas (fromAppointments):', this.fromAppointments);
    })



    // 2) podrías recibir también la respuesta de create() via state:
    const navState = history.state as { createdConsultation?: ConsultationDetailResponse };

    if (navState.createdConsultation) {
      this.populateFromResponse(navState.createdConsultation);
    } else if (this.consultationId) {
      this.loadConsultation(this.consultationId);
    }
  }

  private loadConsultation(id: number): void {
    this.consultationService.getConsultationDetail(id).subscribe({
      next: (res) => this.populateFromResponse(res),
      error: (err) => {
        console.error('Error cargando consulta', err);
      },
    });
  }

  private mapRangeToColorId(rangeId: number): string {
    const COLOR_LOW = '#F9E26F'; // amarillo
    const COLOR_NORMAL = '#A0EBAE'; // verde
    const COLOR_HIGH = '#F79850'; // naranja
    const COLOR_VHIGH = '#FA4C4C'; // rojo

    switch (rangeId) {
      // Bajo / Demasiado Bajo / Insuficiencia ponderal
      case 1: // Demasiado Bajo
      case 2: // Bajo
      case 11: // Insuficiencia ponderal
        return COLOR_LOW;

      // Normal / Intervalo normal / Saludable / Aceptable / Bueno
      case 3: // Normal
      case 4: // Saludable
      case 8: // Aceptable
      case 9: // Bueno
      case 12: // Intervalo normal
        return COLOR_NORMAL;

      // Alto / Sobrepeso / Preobesidad
      case 5: // Alto
      case 6: // Sobrepeso
      case 13: // Preobesidad
        return COLOR_HIGH;

      // Obesidad y Peligroso (todas las clases)
      case 7: // Obesidad
      case 10: // Peligroso
      case 14: // Obesidad clase I
      case 15: // Obesidad clase II
      case 16: // Obesidad clase III
        return COLOR_VHIGH;

      default:
        return COLOR_NORMAL;
    }
  }

  private populateFromResponse(res: ConsultationDetailResponse): void {
    if (!res || !res.consultation) {
    console.warn('Respuesta sin consultation, no se puede poblar la vista', res);
    return;
  }
    this.date = res.consultation.date;
    this.reason = res.consultation.reason;
    this.genderId = res.consultation.genderId;
    this.firstName = res.consultation.firstName;
    this.lastName = res.consultation.lastName

    // indicadores -> IndicatorDisplay
    this.indicators = res.calculatedIndicators.map(ci => {
    const base: IndicatorDisplay = {
    typeIndicatorId: ci.typeIndicatorId,
    name: ci.nameIndicator,
    value: ci.value,
    rangeName: ci.rangeName,
    color: this.mapRangeToColorId(ci.rangeId)
  };

  return {
    ...base,
    icon: this.mapIndicatorToIcon(ci.typeIndicatorId),
    image: this.mapIndicatorToImage(ci.typeIndicatorId)
  };
});






    // métricas originales -> agrupar por sección
    const metricCatalogMap: Record<number, MetricDisplay> = {
      1: { catalogId: 1, name: 'Peso', unit: 'kg', category: 'basic', value: '' },
      2: { catalogId: 2, name: 'Talla', unit: 'cm', category: 'basic', value: '' },

      3: { catalogId: 3, name: 'Peso Brocca', unit: 'kg', category: 'basic', value: '' },
      4: { catalogId: 4, name: 'Peso Lorentz', unit: 'kg', category: 'basic', value: '' },
      5: { catalogId: 5, name: 'Peso ideal (promedio)', unit: 'kg', category: 'basic', value: '' },

      6: { catalogId: 6, name: 'Cintura', unit: 'cm', category: 'circ', value: '' },
      7: { catalogId: 7, name: 'Cadera', unit: 'cm', category: 'circ', value: '' },
      8: { catalogId: 8, name: 'Muñeca', unit: 'cm', category: 'circ', value: '' },
      9: { catalogId: 9, name: 'Brazo relajado', unit: 'cm', category: 'circ', value: '' },
      10: { catalogId: 10, name: 'Cuello', unit: 'cm', category: 'circ', value: '' },
      11: { catalogId: 11, name: 'Muslo', unit: 'cm', category: 'circ', value: '' },
      12: { catalogId: 12, name: 'Muslo contraído', unit: 'cm', category: 'circ', value: '' },

      13: { catalogId: 13, name: 'Bíceps', unit: 'mm', category: 'folds', value: '' },
      14: { catalogId: 14, name: 'Tríceps', unit: 'mm', category: 'folds', value: '' },
      15: { catalogId: 15, name: 'Subescapular', unit: 'mm', category: 'folds', value: '' },
      16: { catalogId: 16, name: 'Ileocrestal', unit: 'mm', category: 'folds', value: '' },
      17: { catalogId: 17, name: 'Suprailiaco', unit: 'mm', category: 'folds', value: '' },
      18: { catalogId: 18, name: 'Abdominal', unit: 'mm', category: 'folds', value: '' },
      19: { catalogId: 19, name: 'Axila medial', unit: 'mm', category: 'folds', value: '' },
      20: { catalogId: 20, name: 'Pectoral', unit: 'mm', category: 'folds', value: '' },
      21: { catalogId: 21, name: 'Suma de pliegues', unit: 'mm', category: 'folds', value: '' },

      22: {
        catalogId: 22,
        name: 'Porcentaje de grasa corporal',
        unit: '%',
        category: 'bio',
        value: '',
      },
      23: { catalogId: 23, name: 'Kg de músculo', unit: 'kg', category: 'bio', value: '' },
      24: { catalogId: 24, name: 'Kg masa ósea', unit: 'kg', category: 'bio', value: '' },
      25: {
        catalogId: 25,
        name: 'Porcentaje de agua corporal',
        unit: '%',
        category: 'bio',
        value: '',
      },
      26: {
        catalogId: 26,
        name: 'Ingestión diaria en calorías',
        unit: 'kcal',
        category: 'bio',
        value: '',
      },
      27: { catalogId: 27, name: 'Edad metabólica', unit: 'años', category: 'bio', value: '' },
    };

    const fromOriginal: MetricDisplay[] = res.originalMetrics.map((om) => {
      const base = metricCatalogMap[om.metricsCatalogId];
      return base
        ? { ...base, value: om.value }
        : {
            catalogId: om.metricsCatalogId,
            name: om.nameCatalog ?? '',
            value: om.value,
            unit: '',
            category: 'other',
          };
    });

    // métricas calculadas (Brocca, Lorentz, ideal, suma pliegues y bio)
    const fromCalculated: MetricDisplay[] = res.calculatedMetrics.map((cm) => {
      const base = metricCatalogMap[cm.catalogId];
      return base
        ? { ...base, value: cm.value }
        : {
            catalogId: cm.catalogId,
            name: cm.nameCatalog,
            value: cm.value,
            unit: '',
            category: 'other',
          };
    });

    // une todo
    const filledMetrics = [...fromOriginal, ...fromCalculated];

    this.basicMetrics = filledMetrics.filter((m) => m.category === 'basic');
    this.circumferenceMetrics = filledMetrics.filter((m) => m.category === 'circ');
    this.foldsMetrics = filledMetrics.filter((m) => m.category === 'folds');
    this.bioimpedanceMetrics = filledMetrics.filter((m) => m.category === 'bio');

    // notas
    this.notes = res.originalNotes ?? [];

    // gasto energético
    const energy = Number(res.energeticExpenditure.energyExpenditure);
    this.baseEnergy = isNaN(energy) ? 0 : energy;
    const reduction = Number(res.energeticExpenditure.reductionPercentage);
    this.energyDelta = isNaN(reduction) ? 0 : reduction;
  }

  private mapIndicatorToImage(typeId: number): string | undefined {
  switch (typeId) {
    case 1: return 'assets/indicadores/IMC.png';              // IMC
    case 2: return 'assets/indicadores/porcentaje-grasa.png'; // % grasa corporal
    case 3: return 'assets/indicadores/grasa-visceral.png';   // % grasa visceral
    case 4: return 'assets/indicadores/masa-muscular.png';    // % masa muscular
    case 5: return 'assets/indicadores/cintura-cadera.png';   // índice cintura‑cadera
    default: return undefined;
  }
}


  private mapRangeToColor(rangeName: string): string {
    // Puedes ajustarlo a tu escala
    const name = rangeName.toLowerCase();
    if (name.includes('normal')) return '#A0EBAE';
    if (name.includes('alto')) return '#F79850';
    if (name.includes('obesidad') || name.includes('peligroso')) return '#FA4C4C';
    return '#F9E26F';
  }

  private mapIndicatorToIcon(typeId: number): string | undefined {
    switch (typeId) {
      case 1:
        return 'assets/iconos/bmi.png';
      case 2:
        return 'assets/iconos/fat.png';
      case 3:
        return 'assets/iconos/visceral-fat.png';
      case 4:
        return 'assets/iconos/muscle.png';
      case 5:
        return 'assets/iconos/waist-hip.png';
      default:
        return undefined;
    }
  }

  getIconPath(categoryId: number): string {
    switch (categoryId) {
      case 1:
        return 'assets/iconos/emotional.png';
      case 2:
        return 'assets/iconos/sleepquality.png';
      case 3:
        return 'assets/iconos/diet.png';
      case 4:
        return 'assets/iconos/diet.png';
      case 5:
        return 'assets/iconos/progress.png';
      case 6:
        return 'assets/iconos/meds.png';
      case 7:
        return 'assets/iconos/food.png';
      case 8:
        return 'assets/iconos/24h.png';
      default:
        return 'assets/iconos/note.png';
    }
  }

  getCategory(categoryId: number): string {
    switch (categoryId) {
      case 1:
        return 'Estado emocional';
      case 2:
        return 'Calidad de sueño';
      case 3:
        return 'Dieta';
      case 4:
        return 'Opinión de dieta';
      case 5:
        return 'Evolución del paciente';
      case 6:
        return 'Terapia farmacológica';
      case 7:
        return 'Alimentos';
      case 8:
        return 'Recordatorio 24H';
      default:
        return 'Nota';
    }
  }

  onNoteClick(note: OriginalNote): void {
    // aquí decides qué hacer: navegar al detalle, abrir modal, etc.
    console.log('Nota seleccionada', note);
  }

  onFinish(): void {
    this.router.navigate(['/reviews/registro'],{
      queryParams: {consultationId: this.consultationId}
    });
  }

  onSaveEnergy(): void {
  const payload = {
    consultationId: this.consultationId,
    energyExpenditure: this.baseEnergy,
    adjustmentPercentage: this.energyDelta,
  };

  this.consultationService.updateEnergyAdjustment(payload)
    .subscribe({
      next: res => {

        // si el backend NO regresa consultation, no llames populateFromResponse
        // solo sincroniza valores locales
        this.baseEnergy = this.adjustedEnergy;
        next: () => this.loadConsultation(this.consultationId)

      },
      error: err => console.error('Error actualizando gasto energético', err),
    });
}
getAvatar(genderId?: number): string {
  if (genderId === 1) {
    return 'assets/otros/men-avatar.png';
  }
  if (genderId === 2) {
    return 'assets/otros/women-avatar.png';
  }
  return 'assets/otros/default-avatar.png';
}
}
