import { Component, OnInit, OnDestroy, HostBinding, ViewContainerRef } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { validate, ValidationError } from 'class-validator';

import { Person, Client, Staff, Address, Availability } from '../model';
import { PersonService } from '../person.service';
import { ErrorService } from '../error.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
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
  // our person subscriber
  private person$: Subscription;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private personService: PersonService) { }

  ngOnInit() {
    this.initPerson();
    this.list();
  }

  ngOnDestroy() {
    if (this.person$) { this.person$.unsubscribe() };
  }

  next() {
    validate(this.person).then(errors => {
      if (errors.length < 1) {
        this.personService.person = this.person;
        this.router.navigate(['summary']);
      } else {
        let properties = errors.map(error => {
          return error.property;
        }).join(', ');
        console.log(properties);
      }
    });
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
    if (event instanceof Array) {
      console.warn(event); // some validation fixes to do.
    } else {
      this.person.availabilities.push(event);
    }
  }

  removeAvailability(index: number) {
    this.person.availabilities.splice(index, 1);
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

  initStaff(): void {
    this.person = new Staff();
    this.person.address = new Address();
    this.person.availabilities = [];
    this.person.personType = 'STAFF';
    this.title = 'Staff Management';
    this.isClient = false;
  }

  initClient(): void {
    this.person = new Client();
    this.person.address = new Address();
    this.person.availabilities = [];
    this.person.personType = 'CLIENT';
    this.person.staff = [];
    this.title = 'Client Management';
    this.isClient = true;
  }

  initEditMode(): void {
    let type: string;
    let id: number;

    this.route.params.forEach((params: Params) => {
      type = params['type'];
      id = +params['id'];
      if(type.includes('client')) {
        this.title = 'Edit Client';
      } else {
        this.title = 'Edit Staff';
      }
    });

    this.personService.personById(id).subscribe(res => {
      this.person = res;
    });
  }

}
