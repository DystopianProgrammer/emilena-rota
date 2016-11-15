import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RotaService } from '../rota.service';
import * as moment from 'moment';
import { Rota, RotaItem, DayOfWeek } from '../model';

export class ItemToRemove {
  day: DayOfWeek;
  index: number;
}

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit {

  rota: Rota;

  forDate: string;
  updated: string;

  monday: RotaItem[] = [];
  tuesday: RotaItem[] = [];
  wednesday: RotaItem[] = [];
  thursday: RotaItem[] = [];
  friday: RotaItem[] = [];
  saturday: RotaItem[] = [];
  sunday: RotaItem[] = [];

  constructor(private rotaService: RotaService) { }

  ngOnInit() {
    this.updated = moment().format('hh:mm:ss');
  }

  create(): void {
    this.updated = moment().format('hh:mm:ss');
    this.forDate = moment().format('D-M-YYYY');
    this.monday = [];
    this.tuesday = [];
    this.wednesday = [];
    this.thursday = [];
    this.friday = [];
    this.saturday = [];
    this.sunday = [];

    this.rotaService.create(this.forDate).subscribe(res => {
      this.rota = res;
      this.rota.rotaItems.forEach(item => {
        if (item.dayOfWeek.toString() == DayOfWeek[0]) {
          this.monday.push(item);
        } else if (item.dayOfWeek.toString() == DayOfWeek[1]) {
          this.tuesday.push(item);
        } else if (item.dayOfWeek.toString() == DayOfWeek[2]) {
          this.wednesday.push(item);
        } else if (item.dayOfWeek.toString() == DayOfWeek[3]) {
          this.thursday.push(item);
        } else if (item.dayOfWeek.toString() == DayOfWeek[4]) {
          this.friday.push(item);
        } else if (item.dayOfWeek.toString() == DayOfWeek[5]) {
          this.saturday.push(item);
        } else {
          this.sunday.push(item);
        }
      })
    });
  }

  deleteRotaItem(item: any): void {
    switch(item.day) {
      case 'MONDAY': this.remove(item.index, this.monday); break;
      case 'TUESDAY': this.remove(item.index, this.tuesday); break;
      case 'WEDNESDAY': this.remove(item.index, this.wednesday); break;
      case 'THURSDAY': this.remove(item.index, this.thursday); break;
      case 'FRIDAY': this.remove(item.index, this.friday); break;
      case 'SATURDAY': this.remove(item.index, this.saturday); break;
      case 'SUNDAY': this.remove(item.index, this.sunday); break;
      default: console.warn('I dunno Emily'); // a little easter egg we'll probably never see. :-)
    }
  }

  remove(index: number, rotaItem: RotaItem[]) {
    rotaItem = rotaItem.splice(index, 1);
  }

  add(rotaItem: RotaItem): void {
    switch(rotaItem.dayOfWeek) {
      case DayOfWeek.MONDAY: this.monday.push(rotaItem); break;
      case DayOfWeek.TUESDAY: this.tuesday.push(rotaItem); break;
      case DayOfWeek.WEDNESDAY: this.wednesday.push(rotaItem); break;
      case DayOfWeek.THURSDAY: this.thursday.push(rotaItem); break;
      case DayOfWeek.FRIDAY: this.friday.push(rotaItem); break;
      case DayOfWeek.SATURDAY: this.saturday.push(rotaItem); break;
      case DayOfWeek.SUNDAY: this.sunday.push(rotaItem); break;
      default: console.warn('I dunno Emily'); // a little easter egg we'll probably never see. :-)
    }
  }
}

