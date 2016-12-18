import {
  Component, OnInit, state,
  style,
  transition,
  animate,
  trigger
} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
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
export class HelpComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  public backClicked() {
    this.location.back();
  }
}
