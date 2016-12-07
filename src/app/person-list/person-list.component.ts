import {
  Component, OnInit, OnDestroy, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PersonService } from '../person.service';
import { Person, Client, Staff } from '../model';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
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
export class PersonListComponent implements OnInit, OnDestroy {

  people: Person[] = [];
  type: string;
  isClient: boolean;
  title: string = "Directory";
  isCollapsed: boolean = true;
  deleteError: boolean = false;
  loading: boolean = false;
  navigationState: boolean = true;

  // filters
  filterText: string;
  filterContainer: Person[] = [];
  staffCount: number;
  clientCount: number;
  activeCount: number;
  inactiveCount: number;

  isStaffChecked: boolean = false;
  isClientChecked: boolean = false;
  isActiveChecked: boolean = false;
  isInactiveChecked: boolean = false;

  filterStaff: Person[] = [];
  filterClients: Person[] = [];
  filterActive: Person[] = [];
  filterInactive: Person[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private errorService: ErrorService,
    private personService: PersonService) { }

  ngOnInit() {
    this.initialiseDirectoryResults();
  }

  ngOnDestroy() {
    this.people = undefined;
    this.navigationState = false;
  }

  public remove(index: number) {
    if (this.isClient) {
      this.personService.removeClient(<Client>this.people[index])
        .subscribe(res => this.people.splice(index, 1), err => this.deleteError = true);
    } else {
      this.personService.removeStaff(<Staff>this.people[index])
        .subscribe(res => this.people.splice(index, 1), err => this.deleteError = true);
    }
  }

  public notified(event) {
    this.deleteError = event;
  }

  public back(): void {
    this.location.back();
  }

  public onChange(event): void {

    if (this.filterText.length === 0) {
      this.people = this.filterContainer.slice();
    }

    this.people = this.people.filter(p => {
      let forename = p.forename.toLowerCase();
      let surname = p.surname.toLowerCase();
      let filter = this.filterText.toLowerCase();
      return forename.includes(filter) || surname.includes(filter)
    });
  }

  public filterStaffCheck(event) {
    this.isStaffChecked = event;
    if (event) {
      this.people = this.filterStaff.slice();
    } else {
      this.people = this.filterContainer.slice();
    }
  }

  public filterClientCheck(event) {
    this.isClientChecked = event;
    if (event) {
      this.people = this.filterClients.slice();
    } else {
      this.people = this.filterContainer.slice();
    }
  }

  public filterActiveCheck(event) {
    this.isActiveChecked = event;
  }

  public filterInactiveCheck(event) {
    this.isInactiveChecked = event;
  }

  private filter() {

  }

  public edit(person: Person) {
    this.personService.person = person;
    if (person.personType === 'STAFF') {
      this.router.navigate(['person-staff']);
    } else {
      this.router.navigate(['person-client']);
    }
  }

  private initialiseDirectoryResults() {
    this.loading = true;
    this.personService.clients().subscribe(clients => {
      this.loading = false;
      this.people = this.people.concat(clients);
      this.initialiseFilters(this.people);
      this.filterContainer = this.filterContainer.concat(clients);
      console.log(this.filterContainer);
    }, error => {
      this.loading = false;
      this.errorService.handleError(error);
    });

    this.personService.staff().subscribe(staff => {
      this.loading = false;
      this.people = this.people.concat(staff);
      this.initialiseFilters(this.people);
      this.filterContainer = this.filterContainer.concat(staff);
      console.log(this.filterContainer);
    }, error => {
      this.loading = false;
      this.errorService.handleError(error);
    });
  }

  private initialiseFilters(people: Person[]) {
    this.filterStaff = people.filter(p => p.personType === 'STAFF');
    this.staffCount = this.filterStaff.length ? this.filterStaff.length : 0;

    this.filterClients = people.filter(p => p.personType === 'CLIENT');
    this.clientCount = this.filterClients.length ? this.filterClients.length : 0;

    this.filterActive = people.filter(p => p.active);
    this.activeCount = this.filterActive.length ? this.filterActive.length : 0;

    this.filterInactive = people.filter(p => !p.active);
    this.inactiveCount = this.filterInactive.length ? this.filterInactive.length : 0;
  }
}
