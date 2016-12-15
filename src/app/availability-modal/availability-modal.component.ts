import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Person, Days } from '../model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-availability-modal',
  templateUrl: './availability-modal.component.html',
  styleUrls: ['./availability-modal.component.css']
})
export class AvailabilityModalComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;

  @Input() person: Person;

  constructor(private personService: PersonService) { }

  ngOnInit() {

    let sorter = {
      'MONDAY': 0,
      'TUESDAY': 1,
      'WEDNESDAY': 2,
      'THURSDAY': 3,
      'FRIDAY': 4,
      'SATURDAY': 5,
      'SUNDAY': 6
    }

    this.person.availabilities = this.person.availabilities.slice().sort(this.personService.sortAvailabilities)
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

}
