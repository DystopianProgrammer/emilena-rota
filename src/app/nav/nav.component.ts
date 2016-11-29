import {
  Component, OnInit, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { AuthService } from '../auth.service';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('collapseChanged', [
      state('true', style({ height: '0px', border: 0 })),
      state('false', style({ height: '*', border: 0 })),
      transition('1 => 0', animate('100ms ease-in'))
    ])
  ]
})
export class NavComponent implements OnInit {

  public isMenuCollapsed: boolean = true;
  public isDropDown: boolean = false;

  constructor(private authService: AuthService, private personService: PersonService) { }

  ngOnInit() { }

  logOut(): void {
    this.isMenuCollapsed = true;
    this.personService.person = undefined;
    this.authService.logOut();
  }

  toggleDropDown() {
    this.isDropDown = !this.isDropDown;
  }
}
