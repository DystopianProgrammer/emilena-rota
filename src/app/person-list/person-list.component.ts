import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PersonService } from '../person.service';
import { Person, Client, Staff } from '../model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
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

  constructor(private route: ActivatedRoute, private personService: PersonService) { }

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
      });
    });
  }

  ngOnDestroy() {
    this.people = undefined;
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

  onChange(event): void {

    if (this.filterContainer.length < 1) {
      this.filterContainer = this.people.slice();
    }
    if (this.filterText.length > 3) {
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
