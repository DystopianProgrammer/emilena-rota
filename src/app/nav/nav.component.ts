import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isCollapsed: boolean = true;

  constructor(private authService: AuthService, private personService: PersonService) { }

  ngOnInit() { }

  logOut(): void {
    this.isCollapsed = !this.isCollapsed;
    this.authService.logOut();
  }

  reset() {
    this.isCollapsed = !this.isCollapsed;
    this.personService.person = undefined;
  }
}
