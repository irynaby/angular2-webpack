import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'about',
  pipes: [],
  providers: [],
  directives: [],
  //styleUrls: ['./about.css'], /*Error to reference component-relative paths*/
  //templateUrl: './about.html' /*Error to reference component-relative paths*/
  template: require('./about.html')
})

export class About {
  title = 'About Component';
  items = ['About 1', 'About 2', 'About 3', 'About 4'];
  myItem = this.items[0];

  constructor(http: Http) {}

  ngOnInit() {}
}