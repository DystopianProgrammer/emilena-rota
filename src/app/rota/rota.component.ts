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
    switch (item.day) {
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
    switch (rotaItem.dayOfWeek) {
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

  addStupidTypeScript(rotaItem): void {
    switch (rotaItem.dayOfWeek) {
      case 'MONDAY': this.doesContain(rotaItem, this.monday); break;
      case 'TUESDAY': this.doesContain(rotaItem, this.tuesday); break;
      case 'WEDNESDAY': this.doesContain(rotaItem, this.wednesday); break;
      case 'THURSDAY': this.doesContain(rotaItem, this.thursday); break;
      case 'FRIDAY': this.doesContain(rotaItem, this.friday); break;
      case 'SATURDAY': this.doesContain(rotaItem, this.saturday); break;
      case 'SUNDAY': this.doesContain(rotaItem, this.sunday); break;
      default: console.warn('I dunno Emily'); // a little easter egg we'll probably never see. :-)
    }
  }

  private doesContain(rotaItem, collection): void {
    let found = collection.find(item => item.id == rotaItem.id);
    if(!found) {
      collection.push(rotaItem);
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
      console.warn('I dunno Emily'); // a little easter egg we'll probably never see. :-)
    }
    return item;
  }

  alertDismissed(): void {
    this.saved = false;
  }

  onChange(event: any) {
    this.rotas.forEach(r => {
      if (r.id == event) {
        this.rota = r;
        this.rota.rotaItems.forEach(item => {
          this.addStupidTypeScript(item);
        });
      }
    });
  }

  view(): void {
    console.log('TODO unallocated');
  }
}

