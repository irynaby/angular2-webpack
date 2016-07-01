import {bootstrap} from '@angular/platform-browser-dynamic'
//import {AppComponent} from './app/app.component'
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {APP_ROUTER_PROVIDERS} from './app/app.routes';
import {App} from './app/app'

//bootstrap(AppComponent);

bootstrap(App, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
])
  .catch(err => console.error(err));