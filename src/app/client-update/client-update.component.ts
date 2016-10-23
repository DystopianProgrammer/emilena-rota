import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Router } from '@angular/router';

import { Client, Address, Staff } from '../model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ClientUpdateComponent implements OnInit {

  client: Client;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    if (!this.personService.person || this.personService.person instanceof Staff) {
      this.client = new Client();
      this.client.address = new Address();
      this.client.availabilities = [];
      this.personService.person = this.client;
    } else {
      this.client = <Client>this.personService.person;
    }
  }

  next() {
    this.router.navigate(['client/summary']);
  }
}

