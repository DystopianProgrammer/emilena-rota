import {
  Component, OnInit, OnDestroy, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
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
  title: string;
  isCollapsed: boolean = true;
  filterText: string;
  filterContainer: Person[] = [];
  deleteError: boolean = false;
  loading: boolean = false;
  navigationState: boolean = true;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private errorService: ErrorService,
    private personService: PersonService) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.forEach((params: Params) => {
      this.type = params['type'];
      this.isClient = (this.type == 'staff') ? false : true;
      if (this.type.includes('client')) {
        this.title = 'Client Listing';
      } else {
        this.title = 'Staff Listing';
      }
      this.personService.listForPersonType(params['type']).subscribe(results => {
        this.loading = false;
        this.people = results;
      }, err => {
        this.loading = false;
        this.errorService.handleError(err);
      });
    });
  }

  ngOnDestroy() {
    this.people = undefined;
    this.navigationState = false;
  }

  remove(index: number) {
    if (this.isClient) {
      this.personService.removeClient(<Client>this.people[index])
        .subscribe(res => this.people.splice(index, 1), err => this.deleteError = true);
    } else {
      this.personService.removeStaff(<Staff>this.people[index])
        .subscribe(res => this.people.splice(index, 1), err => this.deleteError = true);
    }
  }

  notified(event) {
    this.deleteError = event;
  }

  backClicked() {
    this.location.back();
  }

  onChange(event): void {

    if (this.filterContainer.length < 1) {
      this.filterContainer = this.people.slice();
    }
    if (this.filterText.length > 2) {
      this.people = this.people.filter(p => {
        let forename = p.forename.toLowerCase();
        let surname = p.surname.toLowerCase();
        let filter = this.filterText.toLowerCase();
        return forename.includes(filter) || surname.includes(filter)
      });
    } else {
      this.people = this.filterContainer.slice();
    }
  }
}
