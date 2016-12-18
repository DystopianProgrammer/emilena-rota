import {
  Component, OnInit, state,
  style,
  transition,
  animate,
  trigger
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SystemUser } from '../model';
import { ErrorService } from '../../app/error.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
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
export class AuthComponent implements OnInit {

  systemUser: SystemUser;
  attempts: number = 0;
  navigationState = true;
  loading: boolean = false;

  constructor(private _authService: AuthService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit() {
    this.systemUser = new SystemUser();
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

    setTimeout(() => {
      if (this.systemUser.userName && this.systemUser.password) {
        this.attempts = 0;
        this._authService.login(this.systemUser).subscribe(loginAction, errorHandler);
      } else {
        this.attempts = this.attempts++;
      }
      this.loading = false;
    }, 5000);
    this.loading = true;
  }
}
