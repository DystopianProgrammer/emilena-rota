import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { Person, Staff, Client } from './model';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

@Injectable()
export class PersonService {

  // shared object
  person: Person;

  constructor(private http: Http, private authService: AuthService, private errorService: ErrorService) { }

  update(person: Person): Observable<Response> {
    if (person.personType == 'STAFF') {
      return this.updateStaff(<Staff>person);
    } else if (person.personType == 'CLIENT') {
      return this.updateClient(<Client>person);
    }
    Observable.onErrorResumeNext(e => this.errorService.handleError(e));
  }

  personById(id: number): Observable<Person> {
    return this.http.get(`/emilena-api/person/find/${id}`, this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Person);
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
    return this.http.post('/emilena-api/client/delete', JSON.stringify(client), this.authService.requestOptionsWithJsonHeader());
  }

  removeStaff(staff: Staff): Observable<Response> {
    return this.http.post('/emilena-api/staff/delete', JSON.stringify(staff), this.authService.requestOptionsWithJsonHeader());
  }

  listForPersonType(type: string): Observable<any[]> {
    if (type == 'clients') {
      return this.clients();
    } else {
      return this.staff();
    }
  }

  private updateStaff(staff: Staff): Observable<Response> {
    return this.http.post('/emilena-api/staff/update', JSON.stringify(staff), this.authService.requestOptionsWithJsonHeader());
  }

  private updateClient(client: Client): Observable<Response> {
    return this.http.post('/emilena-api/client/update', JSON.stringify(client), this.authService.requestOptionsWithJsonHeader());
  }
}
