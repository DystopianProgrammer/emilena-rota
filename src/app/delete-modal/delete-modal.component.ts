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

  @ViewChild('lgModal') public childModal: ModalDirective;

  @Input() person;
  @Output() closedNotification: EventEmitter<any> = new EventEmitter<any>();

  constructor(private personService: PersonService, private errorService: ErrorService) { }

  ngOnInit() {
    if (this.person) {
      setTimeout(() => this.childModal.show(), 100);
    }
  }

  deactivate(): void {
    this.person.active = false;
    if (this.person.personType === 'CLIENT') {
      this.personService.updateClient(this.person).subscribe(res => {
        this.hideChildModal();
      }, err => this.errorService.handleError(err));
    } else if (this.person.personType === 'STAFF') {
      this.personService.updateStaff(this.person).subscribe(res => {
        this.hideChildModal();
      }, err => this.errorService.handleError(err));
    }
  }

  cancel(): void {
    this.hideChildModal();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.person = undefined;
    this.childModal.hide();
    this.closedNotification.emit(false);
  }
}
