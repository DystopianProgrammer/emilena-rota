import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../model';

@Component({
  selector: 'app-person-summary',
  templateUrl: './person-summary.component.html',
  styleUrls: ['./person-summary.component.css']
})
export class PersonSummaryComponent implements OnInit {

  person: Person;
  isCollapsed: boolean = true;
  
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.person = this.personService.person;
  }

  submit() {
    this.personService.update(this.person).subscribe(res => {
      console.log(res);
    });
  }
}

