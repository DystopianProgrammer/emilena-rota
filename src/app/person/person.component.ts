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

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
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
export class PersonComponent implements OnInit, OnDestroy {

  // title - Staff Management or Client Management
  title: string;

  // model object shared between staff and client (instanceof)
  person: any;

  // list of clients or staff
  people: Person[];

  // temporary assignee
  assigneeId: number;

  // is client - for staff assignee
  isClient: boolean;

  // validation failures
  missingFields: boolean = false;
  validationPrompts: string;
  availabilityMsg: boolean = false;

  // animating 
  navigationState = true;

  // used to map to an address object
  // see https://getaddress.io/Documentation
  addresses: string[];

  // for address selection with the postcode lookup
  selectedAddress: Address;
  selectedLocation: Location;

  // our person subscriber
  private person$: Subscription;

  addressNotFound: boolean = false;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private addressService: AddressService,
    private _location: aLocation,
    private personService: PersonService) { }

  ngOnInit() {
    this.initPerson();
    this.list();
  }

  ngOnDestroy() {
    if (this.person$) { this.person$.unsubscribe() };
    this.navigationState = false;
  }

  /**
   * The main submit - submits the form and runs a validation sweep over the person object.
   */
  onSubmit() {
    validate(this.person).then(errors => {
      if (errors.length < 1) {
        this.personService.person = this.person;
        this.router.navigate(['summary']);
      } else {
        let properties = errors.map(error => {
          return error.property;
        }).join(', ');
        this.missingFields = true;
        this.validationPrompts = `Please ensure all fields are completed and valid - ${properties}`
      }
    });
  }

  alertDismissed() {
    this.missingFields = false;
  }

  /**
   * Assigns a client to staff member, if not already assigned
   */
  assignStaffToClient() {
    if (this.assigneeId) {
      let staff = this.people.find(p => p.id == this.assigneeId);
      let allocated = this.person.staff.find(s => s.id == this.assigneeId);
      if (allocated == undefined) {
        this.person.staff.push(staff);
      }
    }
  }

  backClicked() {
    this._location.back();
  }

  /**
   * Removes an assignment of staff to client
   */
  removeStaffAssignment(index: number) {
    this.person.staff.splice(index, 1);
  }

  /**
   * Assigns the single availability to the person if not a validation error.
   */
  updateAvailabilities(event: any) {
    if (event instanceof Availability) {
      this.person.availabilities.push(event);
    }
  }

  /**
   * Event handler for removing an availability from a person
   */
  removeAvailability(index: number) {
    this.person.availabilities.splice(index, 1);
  }

  addressFromPostCode() {
    if (this.person.address.postCode) {
      this.addressService.address(this.person.address.postCode).subscribe(res => {
        if (res === undefined) {
          this.addressNotFound = true;
        } else {
          this.selectedLocation = new Location();
          this.selectedLocation.longitude = res.Longitude;
          this.selectedLocation.latitude = res.Latitude;
          this.addresses = res.Addresses;
          this.addressNotFound = false;
        }
      }, err => {
        if (err.status === 404) {
          this.addressNotFound = true;
        } else {
          this.errorService.handleError(err);
        }
      });
    }
  }

  selectAddress(event) {
    let parts: string =
      event.split(',')
        .filter(p => p !== null)
        .filter(p => p !== undefined)
        .filter(p => p.trim() !== '');

    this.person.address.firstLine = parts[0];
    this.person.address.secondLine = parts[1];
    this.person.address.town = parts[2];
    this.person.address.location = this.selectedLocation;
  }

  /**
   * Lists all clients or staff depending on the context.
   */
  private list(): void {
    if (this.person instanceof Client) {
      this.person$ = this.personService.staff().subscribe(staff => this.people = staff);
    }
  }

  /**
   * Resolves the context of the person type based on the router state
   * and initialises the object into a default state
   */
  private initPerson(): void {
    if (this.router.routerState.snapshot.url === '/staff') {
      if (this.personService.person) {
        this.person = this.personService.person;
      } else {
        this.initStaff();
      }
    } else if (this.router.routerState.snapshot.url === '/client') {
      if (this.personService.person) {
        this.person = this.personService.person;
      } else {
        this.initClient();
      }
    } else if (this.router.routerState.snapshot.url.includes('person-edit')) {
      this.initEditMode();
    } else {
      this.errorService.handleError('PersonComponent: Unable to resolve context');
    }
  }

  private initStaff(): void {
    this.person = new Staff();
    this.person.address = new Address();
    this.person.availabilities = [];
    this.person.personType = PersonType.staff;
    this.title = 'Staff Management';
    this.isClient = false;
  }

  private initClient(): void {
    this.person = new Client();
    this.person.address = new Address();
    this.person.availabilities = [];
    this.person.personType = PersonType.client;
    this.person.staff = [];
    this.title = 'Client Management';
    this.isClient = true;
  }

  private initEditMode(): void {

    let type: string;
    let id: number;

    this.route.params.forEach((params: Params) => {
      type = params['type'];
      id = +params['id'];
      if (type.includes('client')) {
        this.title = 'Edit Client';
        this.personService.clientById(id).subscribe(res => {
          this.person = res;
        }, err => this.errorService.handleError(err));
      } else {
        this.title = 'Edit Staff';
        this.personService.staffById(id).subscribe(res => {
          this.person = res;
        }, err => this.errorService.handleError(err));
      }
    });
  }

}
