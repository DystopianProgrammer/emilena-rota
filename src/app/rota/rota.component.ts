import { Component, OnInit, HostBinding } from '@angular/core';
import { animations } from '../shared/index';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css'],
  animations
})
export class RotaComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  constructor() { }

  ngOnInit() {
  }

}
