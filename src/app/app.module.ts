import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MoneyMaskModule } from 'ng2-money-mask';

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
import { InvoiceService } from './invoice.service';
import { ConfigurationService } from './configuration.service';
import { AddressService } from './address.service';
import { AvailabilityComponent } from './availability/availability.component';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { PersonComponent } from './person/person.component';
import { PersonSummaryComponent } from './person-summary/person-summary.component';

import { AlertModule, CollapseModule, ModalModule, TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { PersonListComponent } from './person-list/person-list.component';
import { NavComponent } from './nav/nav.component';
import { AddressPipe } from './address.pipe';
import { AvailabilitiesPipe } from './availabilities.pipe';
import { AvailabilityModalComponent } from './availability-modal/availability-modal.component';
import { DynamicClassDirective } from './dynamic-class.directive';
import { RotaItemReadComponent } from './rota-item-read/rota-item-read.component';
import { RotaItemWriteComponent } from './rota-item-write/rota-item-write.component';
import { TimeComponent } from './time/time.component';
import { HelpComponent } from './help/help.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { AllocationModalComponent } from './allocation-modal/allocation-modal.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { InvoiceItemComponent } from './invoice-item/invoice-item.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UnspecifiedPipe } from './unspecified.pipe';
import { TimePipe } from './time.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    appRouting,
    AlertModule,
    CollapseModule,
    ModalModule,
    TooltipModule,
    MoneyMaskModule
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
    AvailabilitiesPipe,
    AvailabilityModalComponent,
    DynamicClassDirective,
    RotaItemReadComponent,
    RotaItemWriteComponent,
    TimeComponent,
    HelpComponent,
    DeleteModalComponent,
    AllocationModalComponent,
    InvoiceComponent,
    SpinnerComponent,
    InvoiceItemComponent,
    FooterComponent,
    ConfigurationComponent,
    UnspecifiedPipe,
    TimePipe
  ],
  providers: [
    AuthService,
    AuthGuard,
    ErrorService,
    PersonService,
    RotaService,
    InvoiceService,
    AddressService,
    ConfigurationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
