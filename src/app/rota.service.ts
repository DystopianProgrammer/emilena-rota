import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { Person, Staff, Client, Rota } from './model';
import { AuthService } from './auth.service';


@Injectable()
export class RotaService {

  constructor(private http: Http, private authService: AuthService) { }

  create(date: string): Observable<Rota> {
    return this.http.get(`/emilena-api/rota/${date}`, this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Rota).catch(err => Observable.throw('rota for this date already exists'));
  }

  update(rota: Rota): Observable<Rota> {
    return this.http.post('/emilena-api/rota/update', JSON.stringify(rota), this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Rota);
  }

  delete(rota: Rota): Observable<Response> {
    return this.http.post('/emilena-api/rota/delete',
      JSON.stringify(rota), this.authService.requestOptionsWithJsonHeader())
      .catch(err => Observable.throw('Could not delete rota. Invoices have already been' +
        ' issued for this rota. Please consider modifying the rota if changes are necessary.'));
  }

  fetchAll(): Observable<Rota[]> {
    return this.http.get('/emilena-api/rota/all', this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Rota[]);
  }

  findbyId(id: number): Observable<Rota> {
    return this.http.get(`/emilena-api/rota/find/${id}`, this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Rota);
  }

  findUnallocated(id: number): Observable<any> {
    return this.http.get(`/emilena-api/rota/unallocated/${id}`, this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json()).catch(error => Observable.throw('No unallocations'));
  }

  weeks(): Observable<any> {
    return this.http.get('/emilena-api/rota/weeks', this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json()).catch(error => Observable.throw('Could not resolve dates for Rota Generation'));
  }
}
