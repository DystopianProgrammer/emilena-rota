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
import { PersonService } from './person.service';
import { AvailabilityComponent } from './availability/availability.component';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { PersonComponent } from './person/person.component';
import { PersonSummaryComponent } from './person-summary/person-summary.component';

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
    AvailabilityComponent,
    CapitalizeFirstPipe,
    PersonComponent,
    PersonSummaryComponent
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
