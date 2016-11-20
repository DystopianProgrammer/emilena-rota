import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.service';
import { HomeComponent } from './home/home.component';
import { RotaComponent } from './rota/rota.component';
import { PersonComponent } from './person/person.component';
import { PersonSummaryComponent } from './person-summary/person-summary.component';
import { PersonListComponent } from './person-list/person-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HelpComponent } from './help/help.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'rota', component: RotaComponent, canActivate: [AuthGuard] },
    { path: 'client', component: PersonComponent, canActivate: [AuthGuard] },
    { path: 'staff', component: PersonComponent, canActivate: [AuthGuard] },
    { path: 'person-edit', component: PersonComponent, canActivate: [AuthGuard] },
    { path: 'client-list', component: PersonListComponent, canActivate: [AuthGuard] },
    { path: 'staff-list', component: PersonListComponent, canActivate: [AuthGuard] },
    { path: 'summary', component: PersonSummaryComponent, canActivate: [AuthGuard] },
    { path: 'info', component: HelpComponent, canActivate: [AuthGuard] },
    { path: 'error:text', component: ErrorPageComponent },
    { path: '**', component: ErrorPageComponent }
];

export const appRoutingProviders: any[] = [];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
