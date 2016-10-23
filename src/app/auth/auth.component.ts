import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SystemUser } from '../model';
import { ErrorService } from '../../app/error.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  systemUser: SystemUser;
  attempts: number = 0;

  constructor(private _authService: AuthService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit() {
    this.systemUser = new SystemUser();
    try {
      this.login();
    } catch (error) {
      // do nothing, let the service handle any login failure
    }
  }

  login() {

    let loginAction = (isAuthorised) => {
      if (isAuthorised) {
        this.router.navigate(['home']);
      } else {
        this.attempts++;
      }
    };

    let errorHandler = (error) => {
      this.errorService.handleError(error.status);
    };

    if (this.systemUser.userName && this.systemUser.password) {
      this._authService.login(this.systemUser).subscribe(loginAction, errorHandler);
    } else {
      this._authService.login().subscribe(loginAction);
    }
  }
}
