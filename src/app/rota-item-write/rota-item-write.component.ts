import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { RotaItem, DayOfWeek, Client, Staff } from '../model';
import { PersonService } from '../person.service';
import { Time } from '../time/time.component';
import * as moment from 'moment';

@Component({
  selector: 'app-rota-item-write',
  templateUrl: './rota-item-write.component.html',
  styleUrls: ['./rota-item-write.component.css']
})
export class RotaItemWriteComponent implements OnInit {

  @ViewChild('lgModal') public childModal: ModalDirective;
  @Input() item: RotaItem;
  @Input() day: DayOfWeek;
  @Input() clients: Client[];
  @Input() staff: Staff[];
  @Input() weekStarting: string;
  @Output() addRotaItem: EventEmitter<any> = new EventEmitter();

  isEditMode: boolean = false;
  title: string;
  fromTime: string;
  toTime: string;
  selectedClient: number;
  selectedStaff: number;
  isValid: boolean = true;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    if (this.item) {
      this.isEditMode = true;
      this.fromTime = this.item.start;
      this.toTime = this.item.finish;
      this.title = this.item.dayOfWeek.toLocaleString();
      this.selectedClient = this.item.client.id;
      this.selectedStaff = this.item.staff.id;
    } else {
      // new mode
      this.title = DayOfWeek[this.day];
    }
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  create(): void {
    if (!this.isEditMode) {
      if (this.fromTime && this.toTime && this.selectedClient && this.selectedStaff) {
        let clientId = +this.selectedClient;
        let staffId = +this.selectedStaff;
        
        let entry = new RotaItem();
        entry.start = this.fromTime;
        entry.finish = this.toTime;
        entry.dayOfWeek = this.day;
        entry.supportDate = this.determineDate();

        this.clients.forEach(c => {
          if (c.id == clientId) { entry.client = c; }
        });

        this.staff.forEach(s => {
          if (s.id == staffId) {
            entry.staff = s;
          }
        });

        this.addRotaItem.emit(entry);
        this.hideChildModal();
      } 
    } else {
      this.item.start = this.fromTime;
      this.item.finish = this.toTime;
      this.item.client = this.clients.find(c => c.id == this.selectedClient);
      this.item.staff = this.staff.find(s => s.id == this.selectedStaff);
      this.addRotaItem.emit(this.item);
      this.hideChildModal();
    }
  }

  updateTime(time: Time): void {
    this.fromTime = time.start;
    this.toTime = time.finish;
  }

  private determineDate(): string {
    let pattern = 'YYYY-MM-DD';
    return moment(this.weekStarting, pattern).add(this.day, 'd').format(pattern);
  }
}
