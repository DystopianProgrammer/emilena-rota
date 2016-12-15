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
import { Subscription } from 'rxjs/Subscription';
import { validate, ValidationError } from 'class-validator';
import { Person, Client, Staff, Address, Availability, PersonType, Location } from '../model';
import { PersonService } from '../person.service';
import { ErrorService } from '../error.service';
import { AddressService } from '../address.service';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-person-availability',
  templateUrl: './person-availability.component.html',
  styleUrls: ['./person-availability.component.css'],
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
export class PersonAvailabilityComponent implements OnInit {

  navigationState = true;
  availabilityCollapse: boolean = true;
  person: Person;
  title: string = 'Availability';
  duplicateAvailabilityMsg: boolean;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private addressService: AddressService,
    private timeService: TimeService,
    private _location: aLocation,
    private personService: PersonService) { }

  ngOnInit() {
    this.person = this.personService.person;
  }

  /**
   * Assigns the single availability to the person if not a validation error.
   */
  public updateAvailabilities(event: any) {
    if (event instanceof Availability) {
      let validationContainer = this.person.availabilities.slice(0);
      validationContainer.push(event);
      let isValid = this.timeService.isValid(validationContainer);
      if (isValid) {
        this.duplicateAvailabilityMsg = false;
        this.person.availabilities.push(event);
        this.person.availabilities.sort(this.personService.sortAvailabilities);
      } else {
        this.duplicateAvailabilityMsg = true;
      }
    }
  }

  public removeAvailability(index: number) {
    this.person.availabilities.splice(index, 1);
  }

  public next(): void {
    this.router.navigate(['summary']);
  }

  public backClicked() {
    this._location.back();
  }

  public cancel() {
    this.personService.person = undefined;
    this.router.navigate(['person']);
  }

}
