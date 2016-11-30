import {
  Component, OnInit, state,
  style,
  transition,
  animate,
  trigger
} from '@angular/core';
import { Location } from '@angular/common';
import { ConfigurationService } from '../configuration.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
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
export class ConfigurationComponent implements OnInit {

  navigationState = true;
  config: any;
  loading: boolean = true;

  constructor(private configurationService: ConfigurationService,
    private location: Location,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.configurationService.getConfiguration()
      .subscribe(res => {
        this.config = res;
        this.loading = false;
      }, err => this.errorService.handleError(err));
  }

  backClicked() {
    this.location.back();
  }

}
