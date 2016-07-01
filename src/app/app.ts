import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  //templateUrl: '/src/app/app.html',
  template: require('./app.html')
})

export class App {
  constructor() {}
}