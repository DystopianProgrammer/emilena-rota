import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { appRouting } from './app.routing';
import { AppComponent } from './app.component';
import { AuthService, AuthGuard } from './auth.service';
import { ErrorService } from './error.service';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { RotaComponent } from './rota/rota.component';
import { RotaService } from './rota.service';
import { PersonService } from './person.service';
import { AvailabilityComponent } from './availability/availability.component';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { PersonComponent } from './person/person.component';
import { PersonSummaryComponent } from './person-summary/person-summary.component';

import { AlertModule, CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { PersonListComponent } from './person-list/person-list.component';
import { NavComponent } from './nav/nav.component';
import { AddressPipe } from './address.pipe';
import { AvailabilitiesPipe } from './availabilities.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    appRouting,
    AlertModule,
    CollapseModule
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    ErrorPageComponent,
    HomeComponent,
    RotaComponent,
    AvailabilityComponent,
    CapitalizeFirstPipe,
    PersonComponent,
    PersonSummaryComponent,
    PersonListComponent,
    NavComponent,
    AddressPipe,
    AvailabilitiesPipe
  ],
  providers: [
    AuthService,
    AuthGuard,
    ErrorService,
    PersonService,
    RotaService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
