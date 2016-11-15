import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

import {Ng2BootstrapConfig, Ng2BootstrapTheme} from 'ng2-bootstrap/ng2-bootstrap';

if (environment.production) {
  enableProdMode();
}

Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;

platformBrowserDynamic().bootstrapModule(AppModule);
