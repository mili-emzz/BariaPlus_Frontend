import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing/landing-page/landing-page';
import { ViewsLayout } from './layout/views-layout/views-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { PatientRegister } from './pages/patient-register/patient-register';
import { UserProfile } from './pages/user-profile/user-profile';
import { Reviews } from './pages/reviews/reviews';
import {Register} from './pages/auth/register/register';
import {Patient} from './pages/patient/patient';
import {Login} from './pages/auth/login/login';
import {authGuard} from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'user-register',
    component: Register
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: ViewsLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'patient-register',
        component: PatientRegister
      },
      {
        path: 'user-profile',
        component: UserProfile
      },
      {
        path: 'reviews',
        component: Reviews
      },
      {
        path: 'patient/:id',
        component: Patient
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
