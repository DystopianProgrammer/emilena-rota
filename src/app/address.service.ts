import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Address, Location } from './model';

@Injectable()
export class AddressService {

  constructor(private http: Http) { }

  address(postCode: string): Observable<any> {
    let trimmed = postCode.replace(/ /g, '')
    return this.http.get(`/emilena-api/external/address/${trimmed}`)
      .map(res => {
        if (res.status === 404) {
          throw new Error(res.status.toString());
        }
        return res.json();
      })
      .catch(err => Observable.throw(err));
  }

  transformToLocation(response: any): Location {
    let location = new Location();
    location.longitude = response.Longitude;
    location.latitude = response.Latitude;
    return location;
  }

  transformToAddress(responseItem: any, postCode: string): Address {
    let parts: string =
      responseItem.split(',')
        .filter(p => p !== null)
        .filter(p => p !== undefined)
        .filter(p => p.trim() !== '');

    let address = new Address();
    address.firstLine = parts[0];
    address.secondLine = parts[1];
    address.town = parts[2];
    address.postCode = postCode;

    return address;
  }

}
