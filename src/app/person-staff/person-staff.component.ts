import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ViewContainerRef,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Location as aLocation } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { validate, ValidationError } from 'class-validator';

import { Person, Client, Staff, Address, Availability, PersonType, Location } from '../model';
import { PersonService } from '../person.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-person-staff',
  templateUrl: './person-staff.component.html',
  styleUrls: ['./person-staff.component.scss'],
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
export class PersonStaffComponent implements OnInit {

  personDetailsForm: FormGroup;
  navigationState = true;
  person: Staff;
  title: string = 'Staff Management';

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private _location: aLocation,
    private formBuilder: FormBuilder,
    private personService: PersonService) { }

  ngOnInit() {
    if (this.personService.person) {
      this.person = <Staff>this.personService.person;
    } else {
      this.person = new Staff();
      this.person.address = new Address();
      this.person.availabilities = [];
      this.person.personType = PersonType.staff;
      this.personService.person = this.person;
    }
    this.buildForm();
  }

  public next(personDetailsForm: FormGroup): void {
    this.person.forename = personDetailsForm.controls['forename'].value;
    this.person.surname = personDetailsForm.controls['surname'].value;
    this.person.email = personDetailsForm.controls['email'].value;
    this.person.telephoneNumber = personDetailsForm.controls['phone'].value;
    this.person.preferences = personDetailsForm.controls['preferences'].value;
    this.router.navigate(['address']);
  }

  public backClicked() {
    this._location.back();
  }

  public cancel() {
    this.personService.person = undefined;
    this.router.navigate(['person']);
  }

  private buildForm(): void {
    this.personDetailsForm = this.formBuilder.group({
      forename: [this.person.forename, [Validators.required, Validators.minLength(2)]],
      surname: [this.person.surname, [Validators.required, Validators.minLength(2)]],
      email: [this.person.email, [Validators.required]],
      phone: [this.person.telephoneNumber, 
        [
          Validators.required, 
          Validators.minLength(10), 
          Validators.maxLength(11), 
          Validators.pattern('^[0-9]*$')
        ]
      ],
      preferences: [this.person.preferences, []]
    });
  }

}
