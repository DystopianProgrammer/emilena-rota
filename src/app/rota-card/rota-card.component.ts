import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Days } from '../model';

@Component({
  selector: 'app-rota-card',
  templateUrl: './rota-card.component.html',
  styleUrls: ['./rota-card.component.scss']
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

  date: string;

  constructor() { }

  ngOnInit() {
    if (this.rota && this.dayOfWeek) {
      let pattern = 'DD-MM-YYYY';
      this.date = moment(this.rota.weekStarting, pattern).add(Days.numericValue(this.dayOfWeek), 'd')
        .format(pattern);
    }
  }

  createNewRotaItem(item) {
    this.items.push(item);
    this.requestSave.emit(true);
  }

  removeRotaItem(item) {
    this.requestDelete.emit(item);
  }

}
