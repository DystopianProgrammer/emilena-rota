import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { RotaItem, DayOfWeek, Client, Staff } from '../model';
import { PersonService } from '../person.service';
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
  @Output() addRotaItem: EventEmitter<any> = new EventEmitter();

  isEditMode: boolean = false;
  title: string;
  fromTime: Date;
  toTime: Date;
  clients: Client[];
  staff: Staff[];
  selectedClient: Client;
  selectedStaff: Staff;


  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.title = DayOfWeek[this.day];
    if (this.item) {
      this.isEditMode = true;
    } else {
    }

    this.personService.staff().subscribe(res => this.staff = res);
    this.personService.clients().subscribe(res => this.clients = res);
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  create(): void {
    if (this.fromTime && this.toTime && this.selectedClient && this.selectedStaff) {
      let clientId = +this.selectedClient;
      let staffId = +this.selectedStaff;

      let entry = new RotaItem();
      entry.start = moment(this.fromTime).format('hh:mm');
      entry.finish = moment(this.toTime).format('hh:mm');
      entry.dayOfWeek = this.day;

      this.clients.forEach(c => {
        if (c.id == clientId) {
          entry.client = c;
        }
      });

      this.staff.forEach(s => {
        if (s.id == staffId) {
          entry.staff = s;
        }
      });

      this.addRotaItem.emit(entry);
      this.hideChildModal();
    }
  }

}
