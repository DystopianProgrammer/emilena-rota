import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Router } from '@angular/router';

import { validate } from 'class-validator';

import { Staff, Availability, Address, Client } from '../model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-staff-update',
  templateUrl: './staff-update.component.html',
  styleUrls: ['./staff-update.component.css'],
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
export class StaffUpdateComponent implements OnInit {

  staff: Staff;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    if (!this.personService.person || this.personService.person instanceof Client) {
      this.staff = new Staff();
      this.staff.availabilities = [];
      this.staff.address = new Address();
      this.personService.person = this.staff;
    } else {
      this.staff = <Staff>this.personService.person;
    }
  }

  next() {
    validate(this.staff).then(errors => {
      if (errors.length > 0) {
        console.warn(errors);
      } else {
        this.router.navigate(['staff/staff-summary']);
      }
    });
  }

  updateAvailability(event: any) {
    if (event instanceof Availability) {
      this.staff.availabilities.push(event);
    }
  }

  removeAvailability(index: number) {
    this.staff.availabilities.splice(index, 1);
  }
}
