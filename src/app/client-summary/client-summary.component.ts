import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { Client } from '../model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-client-summary',
  templateUrl: './client-summary.component.html',
  styleUrls: ['./client-summary.component.css'],
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
export class ClientSummaryComponent implements OnInit {

  client: Client;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.client = <Client>this.personService.person;
  }

}
