import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ViewContainerRef,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Location as aLocation } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
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
export class PersonComponent implements OnInit {

  title: string = 'Add New Entry';

  constructor(private router: Router, private personService: PersonService) { }

  ngOnInit() {
    if (this.personService.person) {
      if (this.personService.person.personType === 'STAFF') {
        this.router.navigate(['person-staff']);
      } else {
        this.router.navigate(['person-client']);
      }
    }
  }

  public staffSelect() {
    this.router.navigate(['person-staff']);
  }

  public clientSelect() {
    this.router.navigate(['person-client']);
  }

}
