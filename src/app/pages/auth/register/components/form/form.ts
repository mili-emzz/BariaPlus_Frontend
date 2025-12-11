import {Component, OnInit} from '@angular/core';
import {Auth} from '../../../../../core/services/auth';
import {RegisterRequest} from '../../../../../core/interfaces/api/register-request';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FormItem} from '../../../../../core/interfaces/form-item';
import {Router} from '@angular/router';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const form = control as FormGroup;
  const password = form.get('password')?.value;
  const checkPassword = form.get('checkPassword')?.value;

  if (!password || !checkPassword){
    return null;
  }

  return password === checkPassword? null : {passwordMismatch: true};
}

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit {

  constructor(private authService: Auth, private fb: FormBuilder, private router: Router) {}

  currentStep: number = 1;
  totalSteps: number = 2;


  userForm!: FormGroup;

  ngOnInit() {
    this.initForm()
    console.log('PADRE partOne:', this.userForm);
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      checkPassword: ['', [Validators.required, Validators.minLength(8)]],

      gender: ['', [Validators.required]],
      professionalLicense: ['', [Validators.required]],
      graduationInstitution: ['', [Validators.required]],
      employmentStart: ['', [Validators.required]],
      currentWorkplace: ['', [Validators.required]]
    },
      {
        validators: [passwordMatchValidator]
      })
  }

  registerPartOne:FormItem[] = [
    {
      type: 'text',
      label: 'Nombre (s) *',
      placeholder: 'Ingrese su nombre',
      name: 'firstName',
      required: true,
    },
    {
      type: 'text',
      label: 'Apellido (s) *',
      placeholder: 'Ingrese sus apellidos',
      name: 'lastName',
      required: true,
    },
    {
      type: 'email',
      label: 'Email @ *',
      placeholder: 'Ingrese su correo electronico. Ej: correo@gmail.com',
      name: 'email',
      required: true,
    },
    {
      type: 'password',
      label: 'Contraseña *',
      placeholder: 'Minimo 8 caracteres',
      name: 'password',
      required: true,
    },
    {
      type: 'password',
      label: 'Confirme su contraseña *',
      placeholder: 'Minimo 8 caracteres',
      name: 'checkPassword',
      required: true,
    }
  ]

  registerPartTwo:FormItem[] = [
    {
      type: 'select',
      label: 'Genero *',
      placeholder: 'Seleccione su genero',
      name: 'gender',
      required: true,
      options: ['Femenino', 'Masculino']
    },
    {
      type: 'text',
      label: 'Cedula profesional *',
      placeholder: 'Ingrese el numero de su cedula profesional',
      name: 'professionalLicense',
      required: true,
    },
    {
      type: 'text',
      label: 'Institucion de porvenciencia *',
      placeholder: 'Ingrese su institucion de porvenciencia *',
      name: 'graduationInstitution',
      required: true,
    },
    {
      type: 'date',
      label: 'Fecha de inicio laboral  *',
      placeholder: 'Ingrese la fecha de inicio laboral',
      name: 'employmentStart',
      required: true,
    },
    {
      type: 'text',
      label: 'Lugar de trabajo actual *',
      placeholder: 'Ingrese su lugar de trabajo actual',
      name: 'currentWorkplace',
      required: true,
    }
  ]



  onPartOneNext() {
    console.log('PASO 1 userForm value:', this.userForm.value);
    console.log('PASO 1 userForm valid:', this.userForm.valid);
    const controls = ['firstName', 'lastName', 'email', 'password', 'checkPassword'];
    const stepOneGroupValid = controls.every(c => this.userForm.get(c)?.valid);
    const passwordsOk = !this.userForm.errors?.['passwordMismatch'];
    console.log('Paso 1 controls valid:', stepOneGroupValid, 'passwordsOk:', passwordsOk);
    if (!stepOneGroupValid || !passwordsOk) {
      controls.forEach(c => this.userForm.get(c)?.markAsTouched());
      this.userForm.markAsTouched()
      return;
    }
    this.nextStep();
  }

  onPartTwoRegister(){
    console.log('PASO 2 userForm value:', this.userForm.value);
    const controls = ['gender', 'professionalLicense', 'graduationInstitution', 'employmentStart', 'currentWorkplace'];
    const stepTwoValid = controls.every(c => this.userForm.get(c)?.valid);

    if (!stepTwoValid) {
      controls.forEach(c => this.userForm.get(c)?.markAsTouched());
      return;
    }
    this.register();
  }

  nextStep(){
    this.currentStep++;
    console.log('paso actual next: ',this.currentStep);
  }

  previousStep(){
    this.currentStep--;
    console.log('paso actual previous: ',this.currentStep);
  }

  evaluateGender(gender: string):number{
    switch (gender) {
      case 'Femenino': return 1;
      case 'Masculino': return 2;
    }
    return 0;
  }

  register(){
    console.log('PADRE register() ejecutado');

    const value = this.userForm.getRawValue();

    const payload:RegisterRequest = {
      firstName: value.firstName,
      lastName: value.lastName,
      professionalLicense: value.professionalLicense,
      employmentStart: value.employmentStart,
      graduationInstitution: value.graduationInstitution,
      currentWorkplace: value.currentWorkplace,
      gender: this.evaluateGender(value.gender),
      email: value.email,
      password: value.password
    }

    console.log('payload: ', payload);
    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log('Registro hecho',res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('Error al registrar',err);
      }
    })
  }
}
