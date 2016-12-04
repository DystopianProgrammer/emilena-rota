import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() requestSave: EventEmitter<any> = new EventEmitter;
  @Output() requestDelete: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  createNewRotaItem(item) {
    this.items.push(item);
    this.requestSave.emit(true);
  }

  removeRotaItem(item) {
    this.requestDelete.emit(item);
  }

}
