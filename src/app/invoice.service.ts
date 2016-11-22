import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Invoice } from './model';
import { AuthService } from './auth.service';

export enum SortType {
  DATE
}

@Injectable()
export class InvoiceService {

  constructor(private http: Http, private authService: AuthService) { }

  produce(): Observable<any> {
    return this.http.get('/emilena-api/invoice/produce',
      this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Invoice)
      .catch(err => Observable.throw('Unable to produce invoices'));
  }

  update(invoice: Invoice): Observable<Response> {
    invoice.amount = invoice.amount.substr(1, invoice.amount.length).trim();;
    return this.http.post('/emilena-api/invoice/update',
      JSON.stringify(invoice), this.authService.requestOptionsWithJsonHeader())
      .catch(err => Observable.throw('Unable to create invoice associated to rota item: ' + invoice.rotaItem.id));
  }

  fetch(): Observable<Invoice[]> {
    return this.http.get('/emilena-api/invoice/list/all',
      this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Invoice[])
      .catch(err => Observable.throw('Unable to fetch invoices'));
  }
}
