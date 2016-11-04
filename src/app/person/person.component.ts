import { Component, OnInit, OnDestroy, HostBinding, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
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

  private person$: Subscription;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
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

  navigateList() {
    if (this.isClient) {
      this.router.navigate(['client-list', { type: 'clients' }]);
    } else {
      this.router.navigate(['staff-list', { type: 'staff' }]);
    }
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
      console.log(event);
    } else {
      this.person.availabilities.push(event);
    }
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
      this.person = new Staff();
      this.person.address = new Address();
      this.person.availabilities = [];
      this.title = 'Staff Management';
      this.isClient = false;
    } else if (this.router.routerState.snapshot.url === '/client') {
      this.person = new Client();
      this.person.address = new Address();
      this.person.availabilities = [];
      this.person.staff = [];
      this.title = 'Client Management';
      this.isClient = true;
    } else {
      this.errorService.handleError('PersonComponent: Unable to resolve context');
    }
  }
}
