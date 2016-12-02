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
    //TODO remove this eventually. But for the purposes of trialling and demo'ing.
    this.systemUser.userName = 'superuser';
    this.systemUser.password = 'superuser';
    try {
      this.login();
    } catch (error) {
      // do nothing, let the service handle any login failure
    }

    this._authService.logClient().subscribe(ip => {
      this._authService.postClient(ip).subscribe(() => {
      })
    })
  }

  onChangeUsername(event) {
    this.systemUser.userName = event.toLowerCase();
  }

  onChangePassword(event) {
    this.systemUser.password = event.toLowerCase();
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
      if (error.status == '418') {
        this.attempts++;
      } else {
        this.errorService.handleError(error.status);
      }
    };

    if (this.systemUser.userName && this.systemUser.password) {
      this.attempts = 0;
      this._authService.login(this.systemUser).subscribe(loginAction, errorHandler);
    } else {
      this._authService.login().subscribe(loginAction);
    }
  }
}
