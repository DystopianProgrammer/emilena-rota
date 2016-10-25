import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { validate } from 'class-validator';

import { Person, Client, Staff, Address } from '../model';
import { PersonService } from '../person.service';
import { animations } from '../shared/index';
import { ErrorService } from '../error.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  animations
})
export class PersonComponent implements OnInit, OnDestroy {

  // title - Staff Management or Client Management
  title: string;

  // model object shared between staff and client (instanceof)
  person: any;

  // holds any validation errors - this needs to be reset before each submit
  errors: string[] = [];

  // list of clients or staff
  people: Person[];

  // temporary assignee
  assigneeId: number;

  // is client - for staff assignee
  isClient: boolean;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  private person$: Subscription;

  constructor(
    private router: Router,
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
    this.router.navigate(['summary']);
  }

  addAssignee() {
    if (this.assigneeId) {
      let staff = this.people.find(p => p.id == this.assigneeId);
      this.person.staff.push(staff);
    }
  }

  /**
   * Lists all clients or staff depending on the context.
   */
  private list(): void {
    if (this.person instanceof Staff) {
      this.person$ = this.personService.clients().subscribe(clients => this.people = clients);
    } else {
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

  /**
   * Validates
   */
  private sanitize(): void {
    validate(this.person).then(errors => {
      errors.forEach(validationError => this.errors.push(validationError.property));
    });

    validate(this.person.address).then(errors => {
      errors.forEach(validationError => this.errors.push(validationError.property));
    });

    validate(this.person.availabilities).then(errors => {
      errors.forEach(validationError => this.errors.push(validationError.property));
    });
  }

}
