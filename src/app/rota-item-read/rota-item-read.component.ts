import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RotaItem, Client, Staff } from '../model';
import { ItemToRemove } from '../rota/rota.component';

@Component({
  selector: 'app-rota-item-read',
  templateUrl: './rota-item-read.component.html',
  styleUrls: ['./rota-item-read.component.css']
})
export class RotaItemReadComponent implements OnInit {

  @Input() item: RotaItem;
  @Input() index: number;
  @Input() clients: Client[];
  @Input() staff: Staff[];

  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() complete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  callToDelete(): void {
    let itemToRemove = new ItemToRemove();
    itemToRemove.index = this.index;
    itemToRemove.day = this.item.dayOfWeek;
    this.remove.emit(itemToRemove);
  }

  markComplete() {
    this.item.isComplete = true;
    this.complete.emit(this.item);
  }

  editRotaItem(event: RotaItem): void {
    this.item = event;
  }  
}
