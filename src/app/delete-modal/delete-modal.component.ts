import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @ViewChild('lgModal') public childModal: ModalDirective;

  @Input() person;
  @Output() closedNotification: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    if(this.person) {
      setTimeout(() => this.childModal.show(), 100);
    }
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.person = undefined;
    this.childModal.hide();
    this.closedNotification.emit(false);  
  }
}
