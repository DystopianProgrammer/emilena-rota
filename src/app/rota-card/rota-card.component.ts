import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rota-card',
  templateUrl: './rota-card.component.html',
  styleUrls: ['./rota-card.component.css']
})
export class RotaCardComponent implements OnInit {

  @Input() dayTitle;
  @Input() items;
  @Input() clients;
  @Input() staff;
  @Input() rota;
  @Input() dayOfWeek;

  constructor() { }

  ngOnInit() {
  }

  createNewRotaItem(item) {
    console.log(item);
    this.items.push(item);
  }

}
