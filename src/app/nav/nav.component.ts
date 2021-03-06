import {
  Component,
  OnInit,
  OnDestroy,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { AuthService } from '../auth.service';
import { PersonService } from '../person.service';
import { SystemUser } from '../model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  isMenuCollapsed: boolean = true;
  isDropDown: boolean = false;
  systemUser: SystemUser;

  private systemUserSubject: Subscription;

  constructor(private authService: AuthService, private personService: PersonService) { }

  ngOnInit() {
    this.systemUserSubject =
      this.authService.systemUser$.subscribe(su => this.systemUser = su);
  }

  ngOnDestroy() {
    if (this.systemUserSubject) {
      this.systemUserSubject.unsubscribe();
    }
  }

  public logOut(): void {
    this.isMenuCollapsed = true;
    this.personService.person = undefined;
    this.systemUser = undefined;
    this.authService.logOut();
  }

  public toggleDropDown() {
    this.isDropDown = !this.isDropDown;
  }
}
