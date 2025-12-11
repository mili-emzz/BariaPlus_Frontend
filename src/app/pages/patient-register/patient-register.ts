import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormItem } from '../../core/interfaces/form-item';
import { PatientService } from '../../core/services/patient-service';
import { Router } from '@angular/router';
import { Patient } from '../../core/interfaces/patient';

@Component({
  selector: 'app-patient-register',
  standalone: false,
  templateUrl: './patient-register.html',
  styleUrl: './patient-register.css',
})
export class PatientRegister implements OnInit {

  currentStep: number = 1;
  totalSteps: number = 4;
  isSubmitted: boolean = false;

  // FormGroup principal (PADRE)
  patientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // inicializar TODOS los controles en un solo FormGroup
  initForm(): void {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      genderId: ['', Validators.required],
      emergencyNumber: ['', Validators.required],

      allergies: this.fb.array([this.createAllergyGroup()]),
      diseases: this.fb.array([this.createDiseaseGroup()]),
      medicalHistories: this.fb.array([this.createMedicalHistoryGroup()])
    });
  }

  //agregar con el botoncito uno por uno waaa noo
  createAllergyGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      allergicReaction: ['', Validators.required]
    });
  }
  addAllergy(): void {
    this.allergies.push(this.createAllergyGroup())
  }
  removeAllergy(index: number): void {
    if (this.allergies.length > 1) {
      this.allergies.removeAt(index);
    } else {
      alert('Debe haber al menos una alergia registrada');
    }
  }

  createDiseaseGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      actualStateId: ['', Validators.required]
    })
  }
  addDisease(): void {
    this.diseases.push(this.createDiseaseGroup())
  }
  removeDisease(index: number): void {
    if (this.diseases.length > 1) {
      this.diseases.removeAt(index);
    } else {
      alert('Debe haber al menos una enfermedad registrada');
    }
  }
  createMedicalHistoryGroup(): FormGroup {
    return this.fb.group({
      historyTypeId: ['', Validators.required],
      name: ['', Validators.required],
      detectionDate: ['', Validators.required]
    });
  }
  addMedicalHistory(): void {
    this.medicalHistories.push(this.createMedicalHistoryGroup());
  }
  removeMedicalHistory(index: number): void {
    if (this.medicalHistories.length > 1) {
      this.medicalHistories.removeAt(index);
    } else {
      alert('Debe haber al menos un antecedente registrado');
    }
  }

  // getters para acceder a los sub-grupos en forma de arreglo
  get allergies(): FormArray {
    return this.patientForm.get('allergies') as FormArray;
  }

  get diseases(): FormArray {
    return this.patientForm.get('diseases') as FormArray;
  }

  get medicalHistories(): FormArray {
    return this.patientForm.get('medicalHistories') as FormArray;
  }

  // define qué campos mostrar en cada paso
  personalInfo: FormItem[] = [
    { type: 'text', placeholder: 'Nombre', name: 'firstName', required: true },
    { type: 'text', placeholder: 'Apellidos', name: 'lastName', required: true },
    { type: 'date', placeholder: 'Fecha de nacimiento', name: 'dateOfBirth', required: true },
    { type: 'select', placeholder: 'Sexo', name: 'genderId', options: ['Masculino', 'Femenino'], required: true },
    { type: 'tel', placeholder: 'Número de emergencia', name: 'emergencyNumber', required: true }
  ];

  allergiesItems: FormItem[] = [
    { type: 'text', placeholder: 'Nombre de la alergia', name: 'name', required: true },
    { type: 'text', placeholder: 'Describa los síntomas', name: 'allergicReaction', required: true }
  ];

  diseasesItems: FormItem[] = [
    { type: 'text', placeholder: 'Nombre de la enfermedad', name: 'name', required: true },
    { type: 'select', label: "Estado actual", placeholder: 'Estado actual', name: 'actualStateId', options: ['Controlada', 'En tratamiento', 'Aguda'], required: true }
  ];

  medicalHistoriesItems: FormItem[] = [
    { type: 'select', label: 'Tipo de antecedente', placeholder: 'Tipo de antecedente', name: 'historyTypeId', options: ['Heredorfamiliares', 'Patológicos', 'No patológicos', 'Ginecobstétricos', 'Tratamientos de obesidad', 'Psicológico/Social'], required: true },
    { type: 'text', placeholder: 'Nombre del antecedente', name: 'name', required: true },
    { type: 'date', label: 'Fecha de detección', placeholder: 'Fecha de detección', name: 'detectionDate', required: true }
  ];

  // Navegación
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }

  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  // Enviar datos (el padre lee del FormGroup)
  submitAllData(): void {
    if (this.patientForm.invalid) {
      alert('⚠️ Por favor completa todos los campos requeridos');
      this.patientForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;

    const formValue = this.patientForm.value;

    // mapeos
    const genderMap: { [key: string]: number } = {
      'Masculino': 1,
      'Femenino': 2
    };

    const stateMap: { [key: string]: number } = {
      'Controlada': 1,
      'En tratamiento': 2,
      'Aguda': 3
    };

    const historyTypeMap: { [key: string]: number } = {
      'Heredorfamiliares': 1,
      'Patológicos': 2,
      'No patológicos': 3,
      'Ginecobstétricos': 4,
      'Tratamientos de obesidad': 5,
      'Psicológico/Social': 6
    };

    const patientData: Patient = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      dateOfBirth: formValue.dateOfBirth,
      entryDate: new Date().toISOString().split('T')[0], // fecha de entrada en formato YYYY-MM-DD
      emergencyNumber: String(formValue.emergencyNumber), // asegurar que sea string
      genderId: genderMap[formValue.genderId] || 1,
      statusId: 1,

      allergies: formValue.allergies.map((allergy: any) => ({
        name: allergy.name || null,
        allergicReaction: allergy.allergicReaction || null
      })),

      diseases: formValue.diseases.map((disease: any) => ({
        name: disease.name || null,
        actualStateId: stateMap[disease.actualStateId] || 1
      })),

      medicalHistories: formValue.medicalHistories.map((history: any) => ({
        name: history.name || null,
        detectionDate: history.detectionDate || null,
        historyTypesId: historyTypeMap[history.historyTypeId] || 1
      }))
    };

    this.patientService.createPatient(patientData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          alert(`${response.message}\nPaciente: ${response.patient.firstName} ${response.patient.lastName}`);
          this.patientForm.reset();
          this.initForm(); // reiniciar el formulario con valores por defecto
          this.currentStep = 1; // Volver al primer paso
          this.router.navigate(['/dashboard']);
        }
        this.isSubmitted = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isSubmitted = false;
        alert(`Error al crear paciente: ${error.message || 'Error desconocido'}`);
      }
    });
  }
}