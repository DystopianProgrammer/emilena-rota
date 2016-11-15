import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RotaService } from '../rota.service';
import * as moment from 'moment';
import { Rota, RotaItem, DayOfWeek, Staff, Client } from '../model';
import { PersonService } from '../person.service';

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
  rotas: Rota[];

  forDate: string;
  updated: string;

  monday: RotaItem[] = [];
  tuesday: RotaItem[] = [];
  wednesday: RotaItem[] = [];
  thursday: RotaItem[] = [];
  friday: RotaItem[] = [];
  saturday: RotaItem[] = [];
  sunday: RotaItem[] = [];

  saved: boolean = false;
  staff: Staff[];
  clients: Client[];

  // the selected saved rota from the dropdown 
  rotaId: string;

  constructor(private rotaService: RotaService, private personService: PersonService) { }

  ngOnInit() {
    this.updated = moment().format('hh:mm:ss');

    this.personService.staff().subscribe(res => this.staff = res);
    this.personService.clients().subscribe(res => this.clients = res);
    this.rotaService.fetchAll().subscribe(res => {
      this.rotas = res;
    });
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
    if (item.day == 'MONDAY' || item.day == 0) {
      this.remove(item.index, this.monday)
    } else if (item.day == 'TUESDAY' || item.day == 1) {
      this.remove(item.index, this.tuesday);
    } else if (item.day == 'WEDNESDAY' || item.day == 2) {
      this.remove(item.index, this.wednesday);
    } else if (item.day == 'THURSDAY' || item.day == 3) {
      this.remove(item.index, this.thursday);
    } else if (item.day == 'FRIDAY' || item.day == 4) {
      this.remove(item.index, this.friday);
    } else if (item.day == 'SATURDAY' || item.day == 5) {
      this.remove(item.index, this.saturday);
    } else if (item.day == 'SUNDAY' || item.day == 6) {
      this.remove(item.index, this.sunday);
    } else {
      console.warn('I dunno Emily');
    }
  }

  remove(index: number, rotaItem: RotaItem[]) {
    rotaItem = rotaItem.splice(index, 1);
  }

  add(item: any): void {
    if (item.dayOfWeek == 'MONDAY' || item.dayOfWeek == 0 || item.dayOfWeek == DayOfWeek.MONDAY) {
      this.monday.push(item);
    } else if (item.dayOfWeek == 'TUESDAY' || item.dayOfWeek == 1 || item.dayOfWeek == DayOfWeek.MONDAY) {
      this.tuesday.push(item);
    } else if (item.dayOfWeek == 'WEDNESDAY' || item.dayOfWeek == 2 || item.dayOfWeek == DayOfWeek.MONDAY) {
      this.wednesday.push(item);
    } else if (item.dayOfWeek == 'THURSDAY' || item.dayOfWeek == 3 || item.dayOfWeek == DayOfWeek.MONDAY) {
      this.thursday.push(item);
    } else if (item.dayOfWeek == 'FRIDAY' || item.dayOfWeek == 4 || item.dayOfWeek == DayOfWeek.MONDAY) {
      this.friday.push(item);
    } else if (item.dayOfWeek == 'SATURDAY' || item.dayOfWeek == 5 || item.dayOfWeek == DayOfWeek.MONDAY) {
      this.saturday.push(item);
    } else if (item.dayOfWeek == 'SUNDAY' || item.dayOfWeek == 6 || item.dayOfWeek == DayOfWeek.MONDAY) {
      this.sunday.push(item);
    } else {
      console.warn('I dunno Emily');
    }
  }


  save(): void {
    let items = this.monday.concat(this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday);
    let cleansed = items.map(item => this.transform(item));
    this.rota.rotaItems = cleansed;
    this.rotaService.update(this.rota).subscribe(res => {
      this.saved = true;
      this.rota = res;
      this.rotas.push(this.rota);
    });
  }

  alertDismissed(): void {
    this.saved = false;
  }

  onChange(event: any) {
    this.reset();
    this.rotaService.findbyId(event).subscribe(res => {
      this.rota = res;
      this.rota.rotaItems.forEach(item => {
        this.add(item);
      });
    });
  }

  view(): void {
    console.log('TODO unallocated');
  }

  private transform(item): any {
    if (item.dayOfWeek == DayOfWeek.MONDAY) {
      item.dayOfWeek = 'MONDAY';
    } else if (item.dayOfWeek == DayOfWeek.TUESDAY) {
      item.dayOfWeek = 'TUESDAY';
    } else if (item.dayOfWeek == DayOfWeek.WEDNESDAY) {
      item.dayOfWeek = 'WEDNESDAY';
    } else if (item.dayOfWeek == DayOfWeek.THURSDAY) {
      item.dayOfWeek = 'THURSDAY';
    } else if (item.dayOfWeek == DayOfWeek.FRIDAY) {
      item.dayOfWeek = 'FRIDAY';
    } else if (item.dayOfWeek == DayOfWeek.SATURDAY) {
      item.dayOfWeek = 'SATURDAY';
    } else if (item.dayOfWeek == DayOfWeek.SUNDAY) {
      item.dayOfWeek = 'SUNDAY';
    } else {
      console.warn('I dunno Emily');
    }
    return item;
  }

  reset() {
    this.monday = [];
    this.tuesday = [];
    this.wednesday = [];
    this.thursday = [];
    this.friday = [];
    this.saturday = [];
    this.sunday = [];
  }
}

