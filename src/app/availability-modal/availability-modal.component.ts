import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-availability-modal',
  templateUrl: './availability-modal.component.html',
  styleUrls: ['./availability-modal.component.css']
})
export class AvailabilityModalComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;

  @Input() person;
  
  constructor() { }

  ngOnInit() {
    let a = this.person.availabilities.sort();
    console.log(a);
    this.person.availabilities = a;
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

}
