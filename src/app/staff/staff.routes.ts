import { Routes } from '@angular/router';

import { StaffUpdateComponent } from '../staff-update/staff-update.component';
import { StaffSummaryComponent } from '../staff-summary/staff-summary.component';
import { StaffSuccessComponent } from '../staff-success/staff-success.component';
import { StaffListComponent } from '../staff-list/staff-list.component';

export const STAFF_ROUTES: Routes = [
    { path: 'update', component: StaffUpdateComponent },
    { path: 'list', component: StaffListComponent },
    { path: 'staff-summary', component: StaffSummaryComponent },
    { path: 'staff-success/:id', component: StaffSuccessComponent }
];
