import { Component, OnInit, Input } from '@angular/core';
import { RotaItem } from '../model';

@Component({
  selector: 'app-rota-item-read',
  templateUrl: './rota-item-read.component.html',
  styleUrls: ['./rota-item-read.component.css']
})
export class RotaItemReadComponent implements OnInit {

  @Input() item: RotaItem;


  constructor() { }

  ngOnInit() {
  }

}
