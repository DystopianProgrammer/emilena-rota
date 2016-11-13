import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RotaService } from '../rota.service';
import * as moment from 'moment';
import { Rota, RotaItem, DayOfWeek } from '../model';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit {

  rota: Rota;

  forDate: string;

  monday: RotaItem[] = [];
  tuesday: RotaItem[] = [];
  wednesday: RotaItem[] = [];
  thursday: RotaItem[] = [];
  friday: RotaItem[] = [];
  saturday: RotaItem[] = [];
  sunday: RotaItem[] = [];

  constructor(private rotaService: RotaService) { }

  ngOnInit() { }

  create(): void {

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
}

