import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { appRouting } from './app.routing';
import { AppComponent } from './app.component';
import { AuthService, AuthGuard } from './auth.service';
import { ErrorService } from './error.service';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { RotaComponent } from './rota/rota.component';
import { StaffComponent } from './staff/staff.component';
import { ClientComponent } from './client/client.component';
import { PersonService } from './person.service';
import { StaffUpdateComponent } from './staff-update/staff-update.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { StaffSummaryComponent } from './staff-summary/staff-summary.component';
import { StaffSuccessComponent } from './staff-success/staff-success.component';
import { AvailabilityComponent } from './availability/availability.component';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { StaffListComponent } from './staff-list/staff-list.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    appRouting,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    ErrorPageComponent,
    HomeComponent,
    RotaComponent,
    StaffComponent,
    ClientComponent,
    StaffUpdateComponent,
    ClientUpdateComponent,
    StaffSummaryComponent,
    StaffSuccessComponent,
    AvailabilityComponent,
    CapitalizeFirstPipe,
    StaffListComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    ErrorService,
    PersonService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
