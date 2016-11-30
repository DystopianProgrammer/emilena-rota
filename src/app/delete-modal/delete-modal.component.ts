import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { PersonService } from '../person.service';
import { ErrorService } from '../error.service';
import { Client, Staff } from '../model';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  deletable: any;

  @ViewChild('lgModal') public childModal:ModalDirective;

  @Input() set person(person: any) {
    this.deletable = person;
  }

  @Output() closedNotification: EventEmitter<any> = new EventEmitter<any>();

  constructor(private personService: PersonService, private errorService: ErrorService) { }

  ngOnInit() {}

  deactivate(): void {
    this.deletable.active = false;
    if (this.deletable.personType === 'CLIENT') {
      this.personService.updateClient(this.deletable).subscribe(res => {
        this.hideChildModal();
      }, err => this.errorService.handleError(err));
    } else if (this.deletable.personType === 'STAFF') {
      this.personService.updateStaff(this.deletable).subscribe(res => {
        this.hideChildModal();
      }, err => this.errorService.handleError(err));
    }
  }

  hideChildModal(): void {
    this.childModal.hide();
    this.closedNotification.emit(false);
  }
}
