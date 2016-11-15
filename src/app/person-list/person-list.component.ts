import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PersonService } from '../person.service';
import { Person, Client, Staff } from '../model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  people: Person[] = [];
  type: string;
  isClient: boolean;
  title: string;
  public isCollapsed: boolean = true;

  constructor(private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.type = params['type'];
      this.isClient = (this.type == 'staff') ? false : true;
      if (this.type.includes('client')) {
        this.title = 'Client Listing';
      } else {
        this.title = 'Staff Listing';
      }
      this.personService.listForPersonType(params['type']).subscribe(results => {
        this.people = results;
      });
    });
  }

  remove(index: number) {
    if (this.isClient) {
      this.personService.removeClient(<Client>this.people[index]).subscribe(res => {
        this.people = this.people.splice[index, 1]
      });
    } else {
      this.personService.removeStaff(<Staff>this.people[index]).subscribe(res => {
        this.people = this.people.splice[index, 1]
      });
    }
  }

  filter($event): void {
    console.log($event)
  }
}
