import { Component, OnInit, HostBinding } from '@angular/core';
import { animations } from '../shared/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations
})
export class HomeComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  constructor() { }

  ngOnInit() {
  }

}
