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

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
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

  staff: string = 'Staff';
  client: string = 'Client';
  title: string = 'Add New Entry';
  selection: boolean;

  constructor(private router: Router) { }

  ngOnInit() { }

  public selectAction(): void {
    if (this.selection) {
      this.router.navigate(['person-staff']);
    } else {
      this.router.navigate(['person-client']);
    }
  }
}
