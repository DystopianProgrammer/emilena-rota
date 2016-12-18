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
  styleUrls: ['./person-list.component.scss'],
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

  people: Person[] = []; // holds the original response
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
  activeCount: number = 0;
  inActiveCount: number = 0;

  isStaffChecked: boolean = false;
  isClientChecked: boolean = false;
  isActiveChecked: boolean = false;
  isInActiveChecked: boolean = false;

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

  // track the state of the filter text
  private indexOf: number = 0

  public onChange(event?): void {

    if(this.indexOf < event.length) {
      this.indexOf = event.length;
    } else {
      this.filterContainer = this.people.slice();
    }

    this.filterContainer = this.filterContainer.filter(p => {
      let forename = p.forename.toLowerCase();
      let surname = p.surname.toLowerCase();
      let filter = event.toLowerCase();
      return forename.includes(filter) || surname.includes(filter)
    });
  }

  public filterStaffCheck(event) {
    this.isStaffChecked = event;
    this.filter();
  }

  public filterClientCheck(event) {
    this.isClientChecked = event;
    this.filter();
  }

  public filterActiveCheck(event) {
    this.isActiveChecked = event;
    this.filter();
  }

  public filterInActiveCheck(event) {
    this.isInActiveChecked = event;
    this.filter();
  }

  private filter() {
    this.filterByType(this.isActiveChecked);
  }

  private filterByType(active?) {
    if (this.isActiveChecked && !this.isInActiveChecked) {
      if (this.isClientChecked && this.isStaffChecked) {
        this.filterContainer = this.people.filter(p => p.active).slice();
      } else if (this.isClientChecked && !this.isStaffChecked) {
        this.filterContainer = this.people.filter(p => p.personType === 'CLIENT' && p.active).slice();
      } else if (!this.isClientChecked && this.isStaffChecked) {
        this.filterContainer = this.people.filter(p => p.personType === 'STAFF' && p.active).slice();
      } else {
        this.filterContainer = this.people.filter(p => p.active).slice();
      }
    } else if (!this.isActiveChecked && this.isInActiveChecked) {
      if (this.isClientChecked && this.isStaffChecked) {
        this.filterContainer = this.people.filter(p => !p.active).slice();
      } else if (this.isClientChecked && !this.isStaffChecked) {
        this.filterContainer = this.people.filter(p => p.personType === 'CLIENT' && !p.active).slice();
      } else if (!this.isClientChecked && this.isStaffChecked) {
        this.filterContainer = this.people.filter(p => p.personType === 'STAFF' && !p.active).slice();
      } else {
        this.filterContainer = this.people.filter(p => !p.active).slice();
      }
    } else {
      if (this.isClientChecked && this.isStaffChecked) {
        this.filterContainer = this.people.slice();
      } else if (this.isClientChecked && !this.isStaffChecked) {
        this.filterContainer = this.people.filter(p => p.personType === 'CLIENT').slice();
      } else if (!this.isClientChecked && this.isStaffChecked) {
        this.filterContainer = this.people.filter(p => p.personType === 'STAFF').slice();
      } else {
        this.filterContainer = this.people.slice();
      }
    }
  }

  public edit(person: Person) {
    this.personService.person = person;
    if (person.personType === 'STAFF') {
      this.router.navigate(['person-staff']);
    } else {
      this.router.navigate(['person-client']);
    }
  }

  public reset() {
    this.isStaffChecked = false;
    this.isClientChecked = false;
    this.isActiveChecked = false;
    this.isInActiveChecked = false;
    this.filterText = '';
    this.filterContainer = this.people.slice();
  }

  private initialiseDirectoryResults() {
    this.loading = true;
    this.personService.clients().subscribe(clients => {
      this.loading = false;
      this.people = this.people.concat(clients).sort((a, b) => a.surname.localeCompare(b.surname));
      this.filterContainer = this.filterContainer.concat(clients).sort((a, b) => a.surname.localeCompare(b.surname));
      this.clientCount = clients.length;
      this.activeCount = clients.filter(c => c.active).length + this.activeCount;
      this.inActiveCount = clients.filter(c => !c.active).length + this.inActiveCount;
    }, error => {
      this.loading = false;
      this.errorService.handleError(error);
    });

    this.personService.staff().subscribe(staff => {
      this.loading = false;
      this.people = this.people.concat(staff).sort((a, b) => a.surname.localeCompare(b.surname));
      this.filterContainer = this.filterContainer.concat(staff).sort((a, b) => a.surname.localeCompare(b.surname));
      this.staffCount = staff.length;
      this.activeCount = staff.filter(s => s.active).length + this.activeCount;
      this.inActiveCount = staff.filter(s => !s.active).length + this.inActiveCount;
    }, error => {
      this.loading = false;
      this.errorService.handleError(error);
    });
  }
}
