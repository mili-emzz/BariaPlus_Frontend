import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../../../core/services/reviews';
import { AddReviewRequest } from '../../../core/interfaces/review';

@Component({
  selector: 'app-review-register',
  standalone: false,
  templateUrl: './review-register.html',
  styleUrl: './review-register.css'
})
export class ReviewRegister implements OnInit {
  rating: number = 0;
  comment: string = '';
  consultationId: number = 0;
  isSubmitting: boolean = false;

  showModal = false;
  modalType: 'success' | 'warning' | 'error' | 'info' | 'confirm' = 'success';
  modalTitle = '';
  modalMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewsService: ReviewsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.consultationId = params['consultationId'] ? +params['consultationId'] : 0;

      if (!this.consultationId) {
        console.error('No se proporcionó ID de consulta');
      }
    });
  }

  onRatingChange(newRating: number): void {
    this.rating = newRating;
  }

  onSave(): void {
    if (this.rating < 1 || this.rating > 5) {
      alert('La calificación debe estar entre 1 y 5');
      return;
    }

    if (!this.comment.trim()) {
      alert('Por favor ingrese un comentario');
      return;
    }

    if (!this.consultationId) {
      alert('No se puede guardar la valoración sin una consulta asociada');
      return;
    }

    this.isSubmitting = true;

    // La BD acepta del 1 al 5, guardar directamente
    const request: AddReviewRequest = {
      puntuation: this.rating,
      comments: this.comment.trim()
    };

    this.reviewsService.addReview(this.consultationId, request).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccessModal(
            '¡Valoración realizada!',
            'Las valoraciones han sido guardadas exitosamente.'
          );
          this.rating = 0;
          this.comment = '';
          this.router.navigate(['/reviews/promedio']);
        } else {
          alert(response.message || 'Error al guardar la valoración');
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        this.showErrorModal('Error en la valoración', error.error?.message || 'Error al guardar la valoración');
        this.isSubmitting = false;
      }
    });
  }

  showSuccessModal(title: string, message: string): void {
    this.modalType = 'success';
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
  }

  showErrorModal(title: string, message: string): void {
    this.modalType = 'error';
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleModalConfirm(): void {
    if (this.modalType === 'success') {
      this.router.navigate(['/reviews/promedio']);
    }
    this.closeModal();
  }

  handleModalCancel(): void {
    this.closeModal();
  }

}