import { Routes } from '@angular/router';

import { ClientUpdateComponent } from '../client-update/client-update.component';
import { ClientSummaryComponent } from '../client-summary/client-summary.component';

export const CLIENT_ROUTES: Routes = [
    { path: 'update', component: ClientUpdateComponent },
    { path: 'summary', component: ClientSummaryComponent }
];
