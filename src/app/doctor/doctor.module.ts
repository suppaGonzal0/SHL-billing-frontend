import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import {InputMaskModule} from 'primeng/inputmask';

import {CardModule} from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
@NgModule({
  declarations: [
    DoctorRegistrationComponent,
    DoctorListComponent,
    DoctorProfileComponent
  ],
  exports: [
    DoctorRegistrationComponent,
    DoctorListComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ChipsModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ]
})
export class DoctorModule { }
