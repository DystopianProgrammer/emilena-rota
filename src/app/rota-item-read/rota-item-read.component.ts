import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RotaItem } from '../model';
import { ItemToRemove } from '../rota/rota.component';

@Component({
  selector: 'app-rota-item-read',
  templateUrl: './rota-item-read.component.html',
  styleUrls: ['./rota-item-read.component.css']
})
export class RotaItemReadComponent implements OnInit {

  @Input() item: RotaItem;
  @Input() index: number;

  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  callToDelete(): void {
    let itemToRemove = new ItemToRemove();
    itemToRemove.index = this.index;
    itemToRemove.day = this.item.dayOfWeek;
    this.remove.emit(itemToRemove);
  }
}
