import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Router } from '@angular/router';

import { PersonService } from '../person.service';
import { Staff, StaffType } from '../model';
import { ErrorService } from '../error.service';

class Description {
  private _label: string;
  private _value: string;

  constructor(label: string, value: string) {
    this._label = label;
    this._value = value;
  }

  get label(): string {
    return this._label;
  }

  get value(): string {
    return this._value;
  }
}

@Component({
  selector: 'app-staff-summary',
  templateUrl: './staff-summary.component.html',
  styleUrls: ['./staff-summary.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class StaffSummaryComponent implements OnInit {

  message: string;
  descriptions: Description[];

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  constructor(private personService: PersonService,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    let staff = <Staff>this.personService.person;

    this.descriptions = [
      new Description('First name', staff.forename),
      new Description('Surname', staff.surname),
      new Description('E-mail', staff.email),
      new Description('Telephone', staff.telephoneNumber),
      new Description('Address', `${staff.address.firstLine}, ${staff.address.town}, ${staff.address.postCode}`),
    ]
  }

  update() {
    this.personService.update(this.personService.person).subscribe(s => {
      this.router.navigate(['staff/staff-success', s.id]);
      this.message = `Successfully updated staff member: ${s.id}`;
      this.personService.person = undefined;
    }, e => this.errorService.handleError(e));
  }

  previous() {
    this.router.navigate(['staff/update']);
  }
}

