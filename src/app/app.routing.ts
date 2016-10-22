import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.service';
import { HomeComponent } from './home/home.component';
import { RotaComponent } from './rota/rota.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { StaffComponent } from './staff/staff.component';
import { STAFF_ROUTES } from './staff/staff.routes';
import { CLIENT_ROUTES } from './client/client.routes';
import { ClientComponent } from './client/client.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
    { path: 'staff', component: StaffComponent, children: STAFF_ROUTES, canActivate: [AuthGuard] },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
    { path: 'client', component: ClientComponent, children: CLIENT_ROUTES, canActivate: [AuthGuard] },
    { path: 'rota', component: RotaComponent, canActivate: [AuthGuard] },
    { path: 'error:text', component: ErrorPageComponent },
    { path: '**', component: ErrorPageComponent }
];

export const appRoutingProviders: any[] = [];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
