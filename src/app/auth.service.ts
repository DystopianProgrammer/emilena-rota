import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { SystemUser, Traffic } from './model';

/**
 * AuthService is responsible for accessing the application using Basic Credentials. It holds the credentials in session storage
 * and provides means for logging into the web app, as well as logging out. It also provides a few simple utilty methods for making
 * any requests to the backend.
 */
@Injectable()
export class AuthService {
  _systemUser: SystemUser;
  _systemUserSubject = new Subject<SystemUser>();

  constructor(private _http: Http, private router: Router, private jsonp: Jsonp) { }

  /**
   * The login method accepts an optional SystemUser argument. If this is not supplied, the method attempts to restore the
   * credentials from sessionStorage.
   *
   * @param systemUser? - optional parameter for supplying an object representing the user of the application
   * @return - returns an observable of SystemUser
   */
  login(systemUser?: SystemUser): Observable<SystemUser> {
    let headers = undefined;
    if (systemUser) {
      let user = systemUser.userName.trim();
      let password = systemUser.password.trim();
      headers = this.headers(user, password);
    } else {
      this._systemUser = JSON.parse(window.sessionStorage.getItem('system_user'));
      headers = this.headers(this._systemUser.userName, this._systemUser.password);
    }

    let options = new RequestOptions({ 'headers': headers });

    return this._http.get('/emilena-api/user/login', options)
      .map(res => {
        window.sessionStorage.setItem('system_user', JSON.stringify(res.json()));
        return this._systemUser = res.json();
      });
  }

  /**
   * The logOut method removes the sessionStorage item and simply sets the SystemUser to undefined. The template navigates to
   * the auth component with routerLink
   */
  logOut(): void {
    window.sessionStorage.removeItem('system_user');
    this._systemUser = undefined;
  }

  /**
   * Accessor for the SystemUser. Note, no mutator is supplied intentionally.
   */
  get systemUser(): SystemUser {
    return this._systemUser;
  }

  /**
   * Convenience method containing the required headers for most requests to emilena-api.
   */
  requestOptionsWithJsonHeader(): RequestOptions {
    let headers = this.headers(this._systemUser.userName, this._systemUser.password);
    headers.append('Content-Type', 'application/JSON');
    let options = new RequestOptions({ 'headers': headers });
    return options;
  }

  /**
   * Sets the Authorization headers with the SystemUser and returns the Headers
   * @param systemUser - the system user
   * @return - returns an instance of Headers
   */
  private headers(username: string, password: string): Headers {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return headers;
  }

  /**
   * Used for capturing traffic IPs
   */
  public logClient() {
    let jsonip = 'https://jsonip.com';
    let params = new URLSearchParams();
    params.append('callback', 'JSONP_CALLBACK');
    return this.jsonp
      .get(jsonip, { search: params })
      .map(response => <string>response.json().ip);
  }

  /**
   * call to store captured IPs to the backend.
   */
  public postClient(ip: string) {
    let traffic = new Traffic();
    traffic.ipAddress = ip;
    let headers = new Headers();
    headers.append('Content-Type', 'application/JSON');
    let options = new RequestOptions({ 'headers': headers });
    return this._http.post('/emilena-api/traffic/update', JSON.stringify(traffic), options);
  }



}


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._authService.systemUser) {
      this._router.navigate(['/auth']);
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
