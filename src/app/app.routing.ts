import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.service';
import { HomeComponent } from './home/home.component';
import { RotaComponent } from './rota/rota.component';
import { PersonComponent } from './person/person.component';
import { PersonStaffComponent } from './person-staff/person-staff.component';
import { PersonClientComponent } from './person-client/person-client.component';
import { AddressComponent } from './address/address.component';
import { PersonAvailabilityComponent } from './person-availability/person-availability.component';
import { PersonSummaryComponent } from './person-summary/person-summary.component';
import { PersonListComponent } from './person-list/person-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HelpComponent } from './help/help.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'rota', component: RotaComponent, canActivate: [AuthGuard] },
    { path: 'person', component: PersonComponent, canActivate: [AuthGuard] },
    { path: 'person-staff', component: PersonStaffComponent, canActivate: [AuthGuard] },
    { path: 'person-client', component: PersonClientComponent, canActivate: [AuthGuard] },
    { path: 'person-edit', component: PersonComponent, canActivate: [AuthGuard] },
    { path: 'address', component: AddressComponent, canActivate: [AuthGuard] },
    { path: 'person-availability', component: PersonAvailabilityComponent, canActivate: [AuthGuard] },
    { path: 'person-list', component: PersonListComponent, canActivate: [AuthGuard] },
    { path: 'summary', component: PersonSummaryComponent, canActivate: [AuthGuard] },
    { path: 'info', component: HelpComponent, canActivate: [AuthGuard] },
    { path: 'invoicing', component: InvoiceComponent, canActivate: [AuthGuard] },
    { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard] },
    { path: 'error:text', component: ErrorPageComponent },
    { path: '**', component: ErrorPageComponent }
];

export const appRoutingProviders: any[] = [];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
