import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  state,
  style,
  transition,
  animate,
  trigger
} from '@angular/core';
import { Location } from '@angular/common';
import { RotaService } from '../rota.service';
import * as moment from 'moment';
import { Rota, RotaItem, Staff, Client, Days } from '../model';
import { PersonService } from '../person.service';
import { ErrorService } from '../error.service';
import { Subscription } from 'rxjs/Subscription';

export class ItemToRemove {
  day: string;
  index: number;
}

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.scss'],
  animations: [
    trigger('navigationState', [
      state('*',
        style({
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class RotaComponent implements OnInit, OnDestroy {

  rota: Rota;
  unallocated: any[];

  forDate: string;
  version: number;
  updated: string;
  selectedDate: string;
  isCollapsed: boolean = true;

  monday: RotaItem[] = [];
  tuesday: RotaItem[] = [];
  wednesday: RotaItem[] = [];
  thursday: RotaItem[] = [];
  friday: RotaItem[] = [];
  saturday: RotaItem[] = [];
  sunday: RotaItem[] = [];

  saved: boolean = false;
  staff: Staff[] = [];
  clients: Client[] = [];
  rotaId: string;

  loading: boolean = false;
  alreadyExists = false;

  navigationState = true;

  private _staffSubscription: Subscription;
  private _clientSubscription: Subscription;
  private _rotaWeeksSubscription: Subscription;
  private _rotaFetchAllSubscription: Subscription;
  private _rotaCreateSubscription: Subscription;
  private _rotaUpdateSubscription: Subscription;
  private _rotaDeleteSubscription: Subscription;
  private _errorSubscription: Subscription;
  private _rotaFindByWeekSubscription: Subscription;


  constructor(private rotaService: RotaService,
    private location: Location,
    private errorService: ErrorService,
    private personService: PersonService) { }

  ngOnInit() {

    let initRota = () => {
      this.updated = moment().format('HH:mm:ss');
      this._staffSubscription = this.personService.staff().subscribe(res => this.staff = res);
      this._clientSubscription = this.personService.clients().subscribe(res => this.clients = res);
      this._rotaFindByWeekSubscription =
        this.rotaService.findForCurrentWeek(moment().format('D-MM-YYYY')).subscribe(rota => {
          this.rota = rota;
          this.rota.rotaItems.forEach(item => {
            this.add(item);
          });
      });
      this.loading = false;
    }

    setTimeout(initRota, 500);

    this.loading = true;
  }

  ngOnDestroy() {
    if (this._staffSubscription) { this._staffSubscription.unsubscribe(); }
    if (this._clientSubscription) { this._clientSubscription.unsubscribe(); }
    if (this._rotaWeeksSubscription) { this._rotaWeeksSubscription.unsubscribe(); }
    if (this._rotaFetchAllSubscription) { this._rotaFetchAllSubscription.unsubscribe(); }
    if (this._rotaCreateSubscription) { this._rotaCreateSubscription.unsubscribe(); }
    if (this._rotaUpdateSubscription) { this._rotaUpdateSubscription.unsubscribe(); }
    if (this._rotaDeleteSubscription) { this._rotaDeleteSubscription.unsubscribe(); }
    if (this._errorSubscription) { this._errorSubscription.unsubscribe(); }
    if (this._rotaFindByWeekSubscription) { this._rotaFindByWeekSubscription.unsubscribe(); }
  }

  deleteRotaItem(item: any): void {
    if (item.day === Days.monday) {
      this.remove(item.index, this.monday)
    } else if (item.day === Days.tuesday) {
      this.remove(item.index, this.tuesday)
    } else if (item.day === Days.wednesday) {
      this.remove(item.index, this.wednesday)
    } else if (item.day === Days.thursday) {
      this.remove(item.index, this.thursday)
    } else if (item.day === Days.friday) {
      this.remove(item.index, this.friday)
    } else if (item.day === Days.saturday) {
      this.remove(item.index, this.saturday)
    } else if (item.day === Days.sunday) {
      this.remove(item.index, this.sunday)
    } else {
      console.warn('I dunno Emily...');
    }
    this.isCollapsed = false;
  }

  remove(index: number, rotaItem: RotaItem[]) {
    rotaItem.splice(index, 1);
  }

  add(item: any): void {
    if (item.dayOfWeek === Days.monday) {
      this.monday.push(item);
    } else if (item.dayOfWeek === Days.tuesday) {
      this.tuesday.push(item);
    } else if (item.dayOfWeek === Days.wednesday) {
      this.wednesday.push(item);
    } else if (item.dayOfWeek === Days.thursday) {
      this.thursday.push(item);
    } else if (item.dayOfWeek === Days.friday) {
      this.friday.push(item);
    } else if (item.dayOfWeek === Days.saturday) {
      this.saturday.push(item);
    } else if (item.dayOfWeek === Days.sunday) {
      this.sunday.push(item);
    } else {
      console.warn('I dunno Emily...');
    }
  }

  save(): void {
    let items = this.monday.concat(this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday);
    this.rota.rotaItems = items;
    this._rotaUpdateSubscription = this.rotaService.update(this.rota).subscribe(res => {
      this.isCollapsed = false;
      this.saved = true;
      this.rota = res;
    }, err => this.errorService.handleError(err));
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
    }, err => this.errorService.handleError(err));
  }

  newRota() {
    this.loading = true
    let currentWeek = moment().format('D-MM-YYYY');
    this._rotaCreateSubscription = this.rotaService.create(currentWeek).subscribe(res => {
      this.updated = moment().format('HH:mm:ss');
      this.forDate = currentWeek;
      this.reset();
      this.rota = res;
      this.rota.rotaItems.forEach(item => this.add(item));
      this.loading = false;
    }, err => {
      this.loading = false;
      this.alreadyExists = true;
    });
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

  backClicked() {
    this.location.back();
  }

}

