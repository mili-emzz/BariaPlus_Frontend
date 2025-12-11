import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSection } from './components/hero-section/hero-section';
import { TrackSection } from './components/track-section/track-section';
import { FeaturesSection } from './components/features-section/features-section';
import { Footer } from './components/footer/footer';
import { LandingPage } from './landing-page/landing-page';
import { SharedModule } from '../shared/shared-module';
import { AppRoutingModule } from "../app-routing-module";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LandingPage,
    HeroSection,
    TrackSection,
    FeaturesSection,
    Footer
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    RouterModule
],
  exports: [
    LandingPage
  ]
})
export class LandingModule { }
