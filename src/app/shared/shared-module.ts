import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { LoginModal } from './components/login-modal/login-modal';
import { ConfirmModal } from './components/confirm-modal/confirm-modal';
import { Sidebar } from './components/sidebar/sidebar';
import { RouterModule } from '@angular/router';
import { StepIndicator } from './components/step-indicator/step-indicator';
import { ReusableForm } from './components/reusable-form/reusable-form';
import { Button } from './components/button/button';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Navbar,
    LoginModal,
    ConfirmModal,
    Sidebar,
    StepIndicator,
    ReusableForm,
    Button
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    Navbar,
    LoginModal,
    ConfirmModal,
    Sidebar,
    StepIndicator,
    ReusableForm,
    Button
  ]
})
export class SharedModule { }