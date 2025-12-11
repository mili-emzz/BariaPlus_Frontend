import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal as ModalService } from '../../modal';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { LoginRequest } from '../../../core/interfaces/api/login-request';

@Component({
  selector: 'app-login-modal',
  standalone: false,
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css'
})
export class LoginModal implements OnInit, OnDestroy {

  isModalOpen: boolean = false; //variable local para el modal del template 
  loginForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  // Guardar referencia para poder cancerlar la suscripción
  private modalSubscription!: Subscription;
  
  constructor(
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private authService: Auth
  ) { }

  ngOnInit(): void {
    // Inicializar formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.modalSubscription = this.modalService.isModalOpen$.subscribe(isOpen => {
      this.isModalOpen = isOpen;

      // Prevenir scroll cuando el modal está abierto
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  onBackdropClick(): void {
    this.closeModal();
  }

  onModalClick(event: Event): void {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  onContinuar(): void {
    // Validar formulario
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Preparar datos de login
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log('Enviando login:', loginRequest);

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        
        if (response.success) {
          this.closeModal();
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message || 'Error al iniciar sesión';
        }
        
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.errorMessage = 'Credenciales incorrectas o error de conexión';
        this.isSubmitting = false;
      }
    });
  }

  // Getter para facilitar el acceso a los controles en el template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
