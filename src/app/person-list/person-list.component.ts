import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  people: Person[] = [];
  type: string;
  public isCollapsed:boolean = true;

  constructor(private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.type = params['type'];
      this.personService.listForPersonType(params['type']).subscribe(results => {
        this.people = results;
      });
    });
  }
}
