import {
  Component, OnInit, state,
  style,
  transition,
  animate,
  trigger
} from '@angular/core';
import { PersonService } from '../person.service';
import { Person, Staff, PersonType, Client } from '../model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-person-summary',
  templateUrl: './person-summary.component.html',
  styleUrls: ['./person-summary.component.css'],
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
export class PersonSummaryComponent implements OnInit {

  person: Person;
  isCollapsed: boolean = true;
  disableBtn: boolean = false;
  notification: boolean = false;

  constructor(private personService: PersonService,
    private router: Router,
    private errorService: ErrorService,
    private location: Location) { }

  ngOnInit() {
    this.person = this.personService.person;
  }

  submit() {

    let notificationCb = (personType: PersonType) => {
      setTimeout(() => {
        this.notification = false;
        if (personType === PersonType.staff) {
          this.router.navigate(['staff-list', { type: 'staff' }]);
        } else {
          this.router.navigate(['client-list', { type: 'client' }]);
        }
      }, 3000);
      this.notification = true;
      this.disableBtn = true;
    }

    this.personService.person = undefined;
    if (this.person.personType === PersonType.staff) {
      this.personService.updateStaff(<Staff>this.person).subscribe(res => {
        notificationCb(PersonType.staff);
      }, err => this.errorService.handleError(err));
    } else {
      this.personService.updateClient(<Client>this.person).subscribe(res => {
        notificationCb(PersonType.client);
      }, err => this.errorService.handleError(err));
    }
  }

  back(): void {
    this.location.back();
  }
}

