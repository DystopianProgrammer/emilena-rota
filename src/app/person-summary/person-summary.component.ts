import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person, Staff } from '../model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-summary',
  templateUrl: './person-summary.component.html',
  styleUrls: ['./person-summary.component.css']
})
export class PersonSummaryComponent implements OnInit {

  person: Person;
  isCollapsed: boolean = true;
  disableBtn: boolean = false;
  notification: boolean = false;

  constructor(private personService: PersonService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.person = this.personService.person;
  }

  submit() {
    this.disableBtn = true;
    this.personService.update(this.person).subscribe(res => {
      this.personService.person = undefined;
      this.notification = true;
    });

    setTimeout(() => {
      console.log(this.person);
      if (this.person instanceof Staff) {
        console.log('navd to staff');
        this.router.navigate(['staff-list', { type: 'staff' }]);
      } else {
        this.router.navigate(['client-list', { type: 'client' }]);
        console.log('navd to client');
      }
    }, 2000)

  }

  back(): void {
    this.location.back();
  }
}

