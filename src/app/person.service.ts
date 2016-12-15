import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs';

import { Person, Staff, Client, PersonType, Availability } from './model';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

@Injectable()
export class PersonService {

  // shared object
  person: Person;

  constructor(private http: Http, private authService: AuthService, private errorService: ErrorService) { }

  clientById(id: number): Observable<Client> {
    return this.http.get(`/emilena-api/client/find/${id}`, this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Client).catch(this.handleError);
  }

  staffById(id: number): Observable<Staff> {
    return this.http.get(`/emilena-api/staff/find/${id}`, this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Staff).catch(this.handleError);
  }

  clients(): Observable<Client[]> {
    return this.http.get('/emilena-api/client/all', this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Client[]);
  }

  staff(): Observable<Staff[]> {
    return this.http.get('/emilena-api/staff/all', this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Staff[]);
  }

  removeClient(client: Client): Observable<Response> {
    return this.http.post('/emilena-api/client/delete', JSON.stringify(client), this.authService.requestOptionsWithJsonHeader())
      .catch(this.handleError);
  }

  removeStaff(staff: Staff): Observable<Response> {
    return this.http.post('/emilena-api/staff/delete', JSON.stringify(staff), this.authService.requestOptionsWithJsonHeader())
      .catch(this.handleError);
  }

  listForPersonType(type: string): Observable<any[]> {
    if (type == 'staff') {
      return this.staff();
    } else {
      return this.clients();
    }
  }

  updateStaff(staff: Staff): Observable<Response> {
    return this.http.post('/emilena-api/staff/update',
      JSON.stringify(staff),
      this.authService.requestOptionsWithJsonHeader()).catch(this.handleError);
  }

  updateClient(client: Client): Observable<Response> {
    return this.http.post('/emilena-api/client/update',
      JSON.stringify(client),
      this.authService.requestOptionsWithJsonHeader()).catch(this.handleError);
  }

  public sortAvailabilities = (a, b) => {
    let sorter = {
      'MONDAY': 0,
      'TUESDAY': 1,
      'WEDNESDAY': 2,
      'THURSDAY': 3,
      'FRIDAY': 4,
      'SATURDAY': 5,
      'SUNDAY': 6
    }

    let aDay = a.dayOfWeek;
    let bDay = b.dayOfWeek;
    return sorter[aDay] - sorter[bDay];
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
