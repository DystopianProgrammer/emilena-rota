import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddressService {

  constructor(private http: Http) { }

  address(postCode: string): Observable<any> {
    let trimmed = postCode.replace(/ /g, '')
    return this.http.get(`/emilena-api/external/address/${trimmed}`)
      .map(res => {
        if(res.status === 404) {
          throw new Error(res.status.toString());
        }
        res.json();
      })
      .catch(err => Observable.throw(err));
  }

}
